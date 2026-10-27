"""Offline JSON-lines worker. One model instance per process; no MCP required."""
import contextlib
import importlib.metadata
import json
import os
from pathlib import Path
import sys
import time

# Force offline operation even if the caller's shell requests online mode.
os.environ.update(HF_HUB_OFFLINE="1", TRANSFORMERS_OFFLINE="1",
                  HF_HUB_DISABLE_TELEMETRY="1", USE_TF="0",
                  TOKENIZERS_PARALLELISM="false")


def emit(value):
    print(json.dumps(value, ensure_ascii=False), flush=True)


started = time.perf_counter()
with contextlib.redirect_stdout(sys.stderr):
    import laya
import_ms = (time.perf_counter() - started) * 1000
started = time.perf_counter()
with contextlib.redirect_stdout(sys.stderr):
    agent = laya.load(os.environ.get("LAYA_MODEL", "convaiinnovations/laya"),
                      subfolder=os.environ.get("LAYA_SUBFOLDER", "multilingual") or None,
                      device=os.environ.get("LAYA_DEVICE") or None)
load_ms = (time.perf_counter() - started) * 1000
questions = json.loads(Path(__file__).with_name("questions.json").read_text())
emit({"ready": True, "import_ms": import_ms, "load_ms": load_ms,
      "device": str(agent.device), "max_tokens": agent.cfg.get("max_len", 1024),
      "python": sys.version.split()[0], "laya_version": importlib.metadata.version("laya"),
      "model": os.environ.get("LAYA_MODEL", "convaiinnovations/laya"),
      "subfolder": os.environ.get("LAYA_SUBFOLDER", "multilingual")})
for line in sys.stdin:
    try:
        request = json.loads(line)
        text = request["text"]
        if not isinstance(text, str) or not text.strip() or len(text) > 300:
            raise ValueError("请输入 1–300 字符的非空短文本；长文本可能被模型截断。")
        started = time.perf_counter()
        with contextlib.redirect_stdout(sys.stderr):
            result = agent.predict(text, questions)
        elapsed = (time.perf_counter() - started) * 1000
        answer = result["answers"]["purpose"]
        # Discard action/act_probability: the demo never interprets model actions.
        emit({"actual": answer["choice"], "probabilities": answer["probabilities"],
              "confidence": answer["confidence"], "inference_ms": elapsed,
              "input_tokens": result["usage"]["input_tokens"]})
    except Exception as error:
        emit({"error": str(error)})
