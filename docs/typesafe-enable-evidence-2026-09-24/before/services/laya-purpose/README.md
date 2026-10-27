# Laya purpose suggestion service

Optional text classification fills a suggested purpose only after an explicit user click. It never determines country coverage, language requirements, exemption, eligibility or certificate acceptance. Manual selection and deterministic rules remain authoritative in the product flow.

## Runtime and HTTP boundary

Python3.13, one Uvicorn worker, one resident offline multilingual model, one active inference without a queue. POST `/api/purpose-suggestion/` accepts only JSON `{"text":"..."}`: 1–300 trimmed characters, <=4096 bytes, no query or extra fields. It returns a fixed purpose enum or `needs_clarification`; `requiresConfirmation` is always true. No probabilities or raw model output are exposed. Input errors are bounded; unavailable/busy inference returns503. The frontend timeout is12s; disconnect does not interrupt the CPU operation.

GET `/healthz` means loaded readiness only. Local-only GET `/internal/metrics` provides fixed aggregate status counts, total inference seconds, busy state and peak process RSS. Nginx does not proxy metrics or health. Use real inference probes to detect a loaded but stuck model. Do not enable request-body capture, debug dumps or user-text logging at any layer.

## Reproducible Linux build and deployment

`requirements.in` records exact reviewed application versions. `requirements.lock` freezes the Linux x86_64/Python3.13 CPU dependency resolution with wheel hashes. Regenerate only as a reviewed dependency change using `uv pip compile ... --python-platform x86_64-unknown-linux-gnu --python-version 3.13 --torch-backend cpu --generate-hashes`. Local macOS development may use the small top-level `requirements.txt`; it is not the production lock.

The Dockerfile requires `PYTHON_IMAGE` as a reviewed Python3.13 base image digest; it has no mutable default. Build and measure on Linux amd64, then record the resulting registry image digest. Model bytes and the exact Hugging Face revision are in `model.lock.json`. Copy that snapshot's files preserving the multilingual subtree; verify all hashes. Point `LAYA_MODEL` at the immutable local checkpoint and set `LAYA_SUBFOLDER=multilingual`. Runtime network downloads and telemetry are disabled.

Follow `deploy/README.md` for the combined static-site/Nginx/model bundle, evidence gates and complete rollback. Container port8011 binds localhost only, cache mounts read-only, UID10001 is nonroot, and resource caps are mandatory. The initial 3GB container allocation leaves nominal headroom on a 4GB host but **has not passed Linux capacity testing**. Local macOS peak RSS was approximately4.14GB, so the proposed host cannot be assumed sufficient. Do not activate before measured cold-load and steady-state headroom and timeout behavior pass.

## Quality evidence and checks

The initial MCP experiment was5/10 correct. The frozen 2026-09-22 bilingual real-service check is11/20 correct, including unresolved ambiguity/negation errors. These sets differ and do not establish an improvement. See `docs/release-candidate-evidence-2026-09-22/laya-expected.json` (written before calls) and `laya-actual.json`. Suggestions remain fallible even when confidence is high. This is an optional confirmation surface, not an autonomous decision engine.

```bash
python3 -m unittest discover -s services/laya-purpose -p 'test_*.py' -v
node tests/laya-purpose.test.mjs
python3 services/laya-purpose/probe.py --port 8012 --cases docs/release-candidate-evidence-2026-09-22/laya-expected.json --out /tmp/laya-actual.json
```

The probe uses only synthetic examples and writes explicit results. A dependency lock, passing contract suite or fast macOS inference is not a Docker build, a target-host load test or a measured representative accuracy result.
