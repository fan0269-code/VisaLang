#!/usr/bin/env bash
set -euo pipefail

DOMAIN="visalang.org"
SITE_DIR="/var/www/$DOMAIN"
RELEASES_DIR="$SITE_DIR/releases"
CURRENT_LINK="$SITE_DIR/current"
SOURCE_DIR="$SITE_DIR/source"
REPO="https://github.com/fan0269-code/VisaLang.git"
REDIRECTS_TARGET="/etc/nginx/snippets/visalang-legacy-redirects.conf"

if [ "${EUID:-$(id -u)}" -eq 0 ]; then
  SUDO=""
else
  SUDO="sudo"
  $SUDO -n true || { echo "✗ 请使用 root 或配置了免密 sudo 的用户执行"; exit 1; }
fi

if [ ! -d "$SOURCE_DIR/.git" ]; then
  echo "==> 首次部署：克隆源码仓库"
  $SUDO mkdir -p "$SITE_DIR"
  $SUDO git clone --branch main --single-branch "$REPO" "$SOURCE_DIR"
else
  if [ -n "$($SUDO git -C "$SOURCE_DIR" status --porcelain)" ]; then
    echo "✗ 源码工作树不干净；拒绝发布以避免覆盖本地变更"
    exit 1
  fi

  echo "==> 仅快进更新源码"
  $SUDO git -C "$SOURCE_DIR" pull --ff-only origin main
fi

RELEASE_ID="$($SUDO git -C "$SOURCE_DIR" rev-parse --short=12 HEAD)"
RELEASE_DIR="$RELEASES_DIR/$RELEASE_ID"

echo "==> 准备发布提交：$RELEASE_ID"

if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then
  echo "✗ 需要已安装的 Node.js 22.12+ 和 npm；不会自动安装运行时"
  exit 1
fi

$SUDO node -e '
const [major, minor] = process.versions.node.split(".").map(Number);
if (!(major > 22 || (major === 22 && minor >= 12))) {
  console.error(`✗ Node.js ${process.versions.node} 不满足 22.12+ 要求`);
  process.exit(1);
}
'

echo "==> 安装锁定依赖并运行发布门禁"
$SUDO npm --prefix "$SOURCE_DIR" ci
$SUDO npm --prefix "$SOURCE_DIR" test
$SUDO npm --prefix "$SOURCE_DIR" run launch-check

if [ ! -f "$SOURCE_DIR/dist/index.html" ]; then
  echo "✗ 发布检查未生成 dist/index.html"
  exit 1
fi

$SUDO mkdir -p "$RELEASES_DIR"
if $SUDO test -e "$RELEASE_DIR"; then
  echo "✗ 发布目录已存在：$RELEASE_DIR；不可覆盖既有发布"
  exit 1
fi

$SUDO mkdir "$RELEASE_DIR"
$SUDO cp -a "$SOURCE_DIR/dist/." "$RELEASE_DIR/"

if [ ! -f "$RELEASE_DIR/index.html" ]; then
  echo "✗ 发布候选目录未包含 index.html"
  exit 1
fi

$SUDO chown -R www-data:www-data "$RELEASE_DIR"
$SUDO chmod -R 755 "$RELEASE_DIR"

$SUDO mkdir -p "$(dirname "$REDIRECTS_TARGET")"
$SUDO install -m 0644 "$SOURCE_DIR/deploy/legacy-redirects.conf" "$REDIRECTS_TARGET"

$SUDO nginx -t
$SUDO ln -sfn "$RELEASE_DIR" "$CURRENT_LINK.next"
$SUDO mv -Tf "$CURRENT_LINK.next" "$CURRENT_LINK"
$SUDO systemctl reload nginx

echo "==> 已切换至不可变发布：$RELEASE_ID"
echo "==> 生产 smoke 测试需要单独授权的维护窗口。"
