#!/usr/bin/env bash
# 一键部署 VisaLang 到 /var/www/flowlight.me/public
# 用法：在服务器上，cd ~/ && bash deploy.sh

set -euo pipefail

DOMAIN="flowlight.me"
SITE_DIR="/var/www/$DOMAIN"
PUBLIC_DIR="$SITE_DIR/public"
SERVE_DIR="$PUBLIC_DIR/dist"
SOURCE_DIR="$SITE_DIR/source"
REPO="https://github.com/fan0269-code/VisaLang.git"

if [ "${EUID:-$(id -u)}" -eq 0 ]; then
  SUDO=""
else
  SUDO="sudo"
  $SUDO -n true || { echo "✗ 请用 root 或配置了免密 sudo 的 ubuntu 用户执行"; exit 1; }
fi

echo "==> 部署目标：$SERVE_DIR"
echo "==> 仓库：$REPO"
echo ""

if [ ! -d "$SOURCE_DIR/.git" ] && [ -d "$PUBLIC_DIR/.git" ]; then
  echo "==> 迁移旧的仓库目录到独立源码目录"
  $SUDO mv "$PUBLIC_DIR" "$SOURCE_DIR"
fi

if [ ! -d "$SOURCE_DIR/.git" ]; then
  echo "==> 首次部署：克隆仓库"
  $SUDO mkdir -p "$SITE_DIR"
  $SUDO git clone "$REPO" "$SOURCE_DIR"
else
  echo "==> 更新源码：拉取最新代码"
  $SUDO git -C "$SOURCE_DIR" stash --include-untracked || true
  $SUDO git -C "$SOURCE_DIR" pull origin main
  $SUDO git -C "$SOURCE_DIR" stash pop || true
fi

if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then
  echo "==> 安装 Node.js 和 npm（Astro 构建需要）"
  $SUDO apt update -y
  $SUDO env DEBIAN_FRONTEND=noninteractive apt install -y nodejs npm
fi

echo "==> 安装依赖并构建 Astro"
$SUDO npm --prefix "$SOURCE_DIR" ci
$SUDO npm --prefix "$SOURCE_DIR" run build

if [ ! -f "$SOURCE_DIR/dist/index.html" ]; then
  echo "✗ 构建没有生成 dist/index.html，停止发布以避免 Nginx 目录 403"
  exit 1
fi

echo "==> 更新静态发布目录"
$SUDO mkdir -p "$SERVE_DIR"
$SUDO find "$SERVE_DIR" -mindepth 1 -maxdepth 1 -exec rm -rf {} +
$SUDO cp -a "$SOURCE_DIR/dist/." "$SERVE_DIR/"

echo "==> 修正权限"
$SUDO chown -R www-data:www-data "$SERVE_DIR"
$SUDO chmod -R 755 "$SERVE_DIR"

echo "==> 验证文件"
ls -la "$SERVE_DIR" | head -15

echo ""
echo "==> 重新加载 Nginx"
$SUDO nginx -t && $SUDO systemctl reload nginx

echo ""
echo "==> 部署完成 ✅"
echo "  访问：https://$DOMAIN"
echo "  日志：tail -f /var/log/nginx/$DOMAIN.access.log"
