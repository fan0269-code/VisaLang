#!/usr/bin/env bash
set -euo pipefail
# Explicit verified bundle; identical transaction restores site, Nginx and Laya.
exec python3 "$(dirname "$0")/release.py" rollback "$@"
