#!/usr/bin/env bash
set -euo pipefail
# DOMAIN="visalang.org" — no clone/pull/build on the production host.
exec python3 "$(dirname "$0")/release.py" activate "$@"
