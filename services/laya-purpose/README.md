# Purpose suggestion service (TypeSafe default; legacy Laya provider supported)

Optional text classification fills a suggested purpose only after an explicit user click. New configuration uses the server-side TypeSafe API provider; a legacy Laya provider remains available for existing bundles and rollback. TypeSafe sends the entered description to TypeSafe AI, Inc. in the United States. It never determines country coverage, language requirements, exemption, eligibility or certificate acceptance. Manual selection and deterministic rules remain authoritative in the product flow.

## Runtime and HTTP boundary

Python3.13, one Uvicorn worker, one active inference without a queue. POST `/api/purpose-suggestion/` accepts only JSON `{"text":"..."}`: 1–300 trimmed characters, <=4096 bytes, no query or extra fields. It returns a fixed purpose enum or `needs_clarification`; `requiresConfirmation` is always true. No probabilities or raw model output are exposed. Input errors are bounded; unavailable/busy inference returns503. The TypeSafe adapter uses `jev-latest`, one eight-second monotonic deadline across DNS, TLS, request, headers and the bounded response body, and strict typed-output validation. For TypeSafe, a client disconnect cancels the async request and closes its stream; provider errors fail closed to manual choices. Legacy Laya runs in a synchronous worker that asyncio cannot stop: a 10-second app timeout may send 503, while the single-inference slot remains held until the worker actually exits, including when the request task is cancelled. The frontend timeout is12s. No provider key or text is logged by the app; do not enable proxy request-body logging. The 1024-token cutoff is retained only for legacy Laya output; TypeSafe validates its separate 2048-token ceiling.

For local service work, place `TYPESAFE_API_KEY` in the ignored `.env.local` with file mode `600`, then export that file's variables before running Uvicorn. The browser never receives the key. A missing key prevents service startup. Use synthetic test text only; provider privacy terms and the account's actual settings are separate from this code-level configuration.

GET `/healthz` means loaded readiness only. Local-only GET `/internal/metrics` provides fixed aggregate status counts, total inference seconds, busy state and peak process RSS. Nginx does not proxy metrics or health. Use real inference probes to detect a loaded but stuck model. Do not enable request-body capture, debug dumps or user-text logging at any layer.

## Reproducible Linux build and deployment

`requirements.in` records exact reviewed application versions. `requirements.lock` freezes the Linux x86_64/Python3.13 CPU dependency resolution with wheel hashes. Regenerate only as a reviewed dependency change using `uv pip compile ... --python-platform x86_64-unknown-linux-gnu --python-version 3.13 --torch-backend cpu --generate-hashes`. Local macOS development may use the small top-level `requirements.txt`; it is not the production lock.

The Dockerfile requires `PYTHON_IMAGE` as a reviewed Python3.13 base image digest; it has no mutable default. Build and measure on Linux amd64, then record the resulting registry image digest. Legacy Laya releases also require the exact Hugging Face snapshot in `model.lock.json`, mounted read-only at runtime with `LAYA_SUBFOLDER=multilingual`. TypeSafe releases use the `purposeProvider` manifest field and require a key in the host environment before replacing a running container. Runtime API calls are limited to the explicit suggestion action.

Follow `deploy/README.md` for the combined static-site/Nginx/model bundle, evidence gates and complete rollback. Container port8011 binds localhost only, cache mounts read-only, UID10001 is nonroot, and resource caps are mandatory. The initial 3GB container allocation leaves nominal headroom on a 4GB host but **has not passed Linux capacity testing**. Local macOS peak RSS was approximately4.14GB, so the proposed host cannot be assumed sufficient. Do not activate before measured cold-load and steady-state headroom and timeout behavior pass.

## Quality evidence and checks

The initial Laya MCP experiment was5/10 correct. The frozen 2026-09-22 bilingual Laya check is11/20 correct, including unresolved ambiguity/negation errors. These sets differ and do not establish an improvement. See `docs/release-candidate-evidence-2026-09-22/laya-expected.json` (written before calls) and `laya-actual.json`. TypeSafe has only one synthetic connectivity smoke in the current enablement window; that is not an accuracy evaluation. Suggestions remain fallible even when confidence is high. This is an optional confirmation surface, not an autonomous decision engine.

```bash
python3 -m unittest discover -s services/laya-purpose -p 'test_*.py' -v
node tests/laya-purpose.test.mjs
python3 services/laya-purpose/probe.py --port 8012 --cases docs/release-candidate-evidence-2026-09-22/laya-expected.json --out /tmp/laya-actual.json
```

The probe uses only synthetic examples and writes explicit results. A dependency lock, passing contract suite or fast macOS inference is not a Docker build, a target-host load test or a measured representative accuracy result.
