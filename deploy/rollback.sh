#!/usr/bin/env bash
set -euo pipefail

DOMAIN="visalang.org"
SITE_DIR="/var/www/$DOMAIN"
RELEASES_DIR="$SITE_DIR/releases"
CURRENT_LINK="$SITE_DIR/current"
RELEASE_ID="${1:-}"

if [ ! "$RELEASE_ID" ] || [[ ! "$RELEASE_ID" =~ ^[0-9a-f]{7,40}$ ]]; then
  echo "✗ Usage: rollback.sh <verified-release-id>"
  exit 1
fi

if [ "${EUID:-$(id -u)}" -eq 0 ]; then
  SUDO=""
else
  SUDO="sudo"
  $SUDO -n true || { echo "✗ Run as root or configure passwordless sudo"; exit 1; }
fi

if [ ! -d "$RELEASES_DIR" ]; then
  echo "✗ Releases directory does not exist: $RELEASES_DIR"
  exit 1
fi

RELEASES_REAL="$(readlink -f "$RELEASES_DIR")"
TARGET_RELEASE="$RELEASES_DIR/$RELEASE_ID"
TARGET_REAL="$(readlink -f "$TARGET_RELEASE" || true)"
CURRENT_TARGET="$(readlink -f "$CURRENT_LINK" || true)"

case "$TARGET_REAL" in
  "$RELEASES_REAL"/*) ;;
  *) echo "✗ Rollback target is outside the releases directory"; exit 1 ;;
esac

if [ ! -f "$TARGET_RELEASE/index.html" ]; then
  echo "✗ Rollback target is missing index.html: $TARGET_RELEASE"
  exit 1
fi

if [ "$TARGET_REAL" = "$CURRENT_TARGET" ]; then
  echo "✗ Requested release is already current: $RELEASE_ID"
  exit 1
fi

$SUDO nginx -t
$SUDO ln -sfn "$TARGET_REAL" "$CURRENT_LINK.next"
$SUDO mv -Tf "$CURRENT_LINK.next" "$CURRENT_LINK"
$SUDO systemctl reload nginx

echo "Rolled back to verified release: $RELEASE_ID"
