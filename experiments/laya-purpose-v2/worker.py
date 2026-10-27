"""One offline Laya instance; JSONL requests run A/B/C/D sequentially."""
import contextlib
import hashlib
import importlib.metadata
import json
import os
from pathlib import Path
import socket
import sys
import time
from rules import classify

os.environ.update(HF_HUB_OFFLINE='1', TRANSFORMERS_OFFLINE='1',
                  HF_HUB_DISABLE_TELEMETRY='1', USE_TF='0', TOKENIZERS_PARALLELISM='false')
# Defense in depth: even an unexpected library path cannot open a network connection.
def deny_network(*args, **kwargs):
    raise RuntimeError('Experiment forbids network connections')
socket.socket.connect = deny_network
socket.socket.connect_ex = deny_network
socket.create_connection = deny_network
ROOT = Path(__file__).parent

def read(name):
    return json.loads((ROOT / name).read_text())

def emit(value):
    print(json.dumps(value, ensure_ascii=False), flush=True)

def sha(path):
    h = hashlib.sha256()
    with open(path, 'rb') as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b''):
            h.update(chunk)
    return h.hexdigest()

started = time.perf_counter()
with contextlib.redirect_stdout(sys.stderr):
    import laya
    import laya.common as common
    from huggingface_hub import snapshot_download
import_ms = (time.perf_counter() - started) * 1000
if importlib.metadata.version('laya') != '0.3.5':
    raise RuntimeError('Token inspection is validated for Laya 0.3.5 only')
model_id = os.environ.get('LAYA_MODEL', 'convaiinnovations/laya')
subfolder = os.environ.get('LAYA_SUBFOLDER', 'multilingual')
started = time.perf_counter()
if Path(model_id).exists():
    checkpoint = Path(model_id)
elif model_id.startswith(('/', './', '../')):
    raise FileNotFoundError(f'Missing local checkpoint: {model_id}')
else:
    prefix = f'{subfolder}/' if subfolder else ''
    checkpoint = Path(snapshot_download(model_id, local_files_only=True, allow_patterns=[
        prefix + name for name in ['rl_agent_config.json', 'model.safetensors', 'tokenizer/*', 'encoder/*']]))
if subfolder:
    checkpoint /= subfolder
if not checkpoint.is_dir():
    raise FileNotFoundError(f'Missing offline checkpoint: {checkpoint}')
checkpoint_files = {str(p.relative_to(checkpoint)): sha(p) for p in sorted(checkpoint.rglob('*')) if p.is_file()}
resolve_hash_ms = (time.perf_counter() - started) * 1000
started = time.perf_counter()
with contextlib.redirect_stdout(sys.stderr):
    agent = laya.load(str(checkpoint), device=os.environ.get('LAYA_DEVICE') or 'cpu')
load_ms = (time.perf_counter() - started) * 1000
A, B, GATE = read('questions-a.json'), read('questions-b.json'), read('questions-c-gate.json')
MAP = read('labels.json')
emit({'ready': True, 'pid': os.getpid(), 'model_load_count': 1,
      'import_ms': import_ms, 'resolve_hash_ms': resolve_hash_ms, 'load_ms': load_ms,
      'model': model_id, 'subfolder': subfolder, 'resolved_checkpoint': str(checkpoint),
      'checkpoint_sha256': checkpoint_files, 'device': str(agent.device),
      'python': sys.version, 'libraries': {x: importlib.metadata.version(x) for x in
      ['laya', 'torch', 'transformers', 'tokenizers', 'huggingface-hub', 'safetensors']},
      'common_py_sha256': sha(common.__file__), 'max_tokens': agent.cfg.get('max_len', 512),
      'head_max_tokens': agent.cfg.get('head_max_len', 192), 'offline': True})


def token_audit(text, questions):
    """Mirror inspected 0.3.5 builder and compare exact token IDs to detect drift.

    Record head/option truncation (including frozen A); reject truncated user text.
    """
    q = agent._to_internal(next(iter(questions.values())))
    tok = agent.tok
    encode = lambda s: tok(s.replace(tok.mask_token, ' '), add_special_tokens=False)['input_ids']
    head = encode(f"{q['t']} question: {q['ins']}")
    options = [[tok.mask_token_id] + encode(' ' + x) for x in common.render_options(q)]
    cropped = [o[:49] for o in options]
    budget = agent.cfg.get('head_max_len', 192)
    if budget - sum(map(len, cropped)) < 16:
        per = max(4, (budget - 16) // max(1, len(cropped)))
        cropped = [o[:per] for o in cropped]
    head_kept = head[:max(8, budget - sum(map(len, cropped)))]
    prefix = [tok.cls_token_id] + head_kept + [tok.sep_token_id]
    for o in cropped:
        prefix += o
    prefix += [tok.sep_token_id]
    state = encode(text)
    max_len = agent.cfg.get('max_len', 512)
    room = max(0, max_len - len(prefix) - 1)
    predicted_seq = (prefix + state[:room] + [tok.sep_token_id])[:max_len]
    actual_seq, _ = common.build_sequence(tok, text, q, max_len, budget)
    if actual_seq != predicted_seq:
        raise RuntimeError('Token builder changed; cannot guarantee truncation inspection')
    audit = {'input_tokens_raw': len(state), 'input_tokens_kept': min(room, len(state)),
             'input_truncated': len(state) > room, 'instruction_tokens_raw': len(head),
             'instruction_tokens_kept': len(head_kept),
             'option_tokens_raw': list(map(len, options)), 'option_tokens_kept': list(map(len, cropped)),
             'sequence_tokens': len(actual_seq)}
    if audit['input_truncated']:
        raise ValueError('User text would be token-truncated; request rejected')
    return audit


def infer(text, questions, name):
    started = time.perf_counter()
    audit = token_audit(text, questions)
    inference_started = time.perf_counter()
    with contextlib.redirect_stdout(sys.stderr):
        raw = agent.predict(text, questions)
    inference_ms = (time.perf_counter() - inference_started) * 1000
    answer = raw['answers'][next(iter(questions))]
    # Explicit allowlist: action and act_probability never leave this worker.
    return {'stage': name, 'choice': answer['choice'], 'probabilities': answer['probabilities'],
            'confidence': answer.get('confidence'), 'inference_ms': inference_ms,
            'total_ms': (time.perf_counter() - started) * 1000,
            'input_tokens': raw['usage']['input_tokens'], 'token_audit': audit}

request_count = 0
for line in sys.stdin:
    try:
        request = json.loads(line)
        text = request['text']
        if not isinstance(text, str) or not text.strip() or len(text) > 300:
            raise ValueError('请输入1–300字符非空短文本；另有真实token截断检查')
        request_count += 1
        results = {}
        for variant, questions in [('A', A), ('B', B), ('C', GATE)]:
            start = time.perf_counter()
            stage = infer(text, questions, 'gate' if variant == 'C' else 'purpose')
            stages = [stage]
            if variant == 'C':
                if stage['choice'] == '明确单一当前目的':
                    stages.append(infer(text, B, 'purpose'))
                    actual = MAP[stages[-1]['choice']]
                else:
                    actual = 'unclear'
                # No calibrated joint distribution exists for this hard-gated pipeline.
                probabilities = confidence = None
            else:
                actual = stage['choice'] if variant == 'A' else MAP[stage['choice']]
                probabilities = stage['probabilities'] if variant == 'A' else {MAP[k]: v for k, v in stage['probabilities'].items()}
                confidence = stage['confidence']
            results[variant] = {'actual': actual, 'probabilities': probabilities, 'confidence': confidence,
                                'stages': stages, 'total_ms': (time.perf_counter() - start) * 1000}
        start = time.perf_counter()
        actual = classify(text)
        results['D'] = {'actual': actual, 'probabilities': None, 'confidence': None, 'stages': [],
                        'total_ms': (time.perf_counter() - start) * 1000}
        emit({'results': results, 'pid': os.getpid(), 'request_count': request_count, 'model_load_count': 1})
    except Exception as error:
        emit({'error': str(error), 'pid': os.getpid(), 'model_load_count': 1})
