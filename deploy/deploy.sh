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

echo "==> 部署目标：$SERVE_DIR"
echo "==> 仓库：$REPO"
echo ""

if [ ! -d "$SOURCE_DIR/.git" ] && [ -d "$PUBLIC_DIR/.git" ]; then
  echo "==> 迁移旧的仓库目录到独立源码目录"
  mv "$PUBLIC_DIR" "$SOURCE_DIR"
fi

if [ ! -d "$SOURCE_DIR/.git" ]; then
  echo "==> 首次部署：克隆仓库"
  mkdir -p "$SITE_DIR"
  git clone "$REPO" "$SOURCE_DIR"
else
  echo "==> 更新源码：拉取最新代码"
  cd "$SOURCE_DIR"
  git stash --include-untracked || true
  git pull origin main
  git stash pop || true
fi

if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then
  echo "==> 安装 Node.js 和 npm（Astro 构建需要）"
  apt update -y
  DEBIAN_FRONTEND=noninteractive apt install -y nodejs npm
fi

echo "==> 安装依赖并构建 Astro"
cd "$SOURCE_DIR"
npm ci
npm run build

if [ ! -f "$SOURCE_DIR/dist/index.html" ]; then
  echo "✗ 构建没有生成 dist/index.html，停止发布以避免 Nginx 目录 403"
  exit 1
fi

echo "==> 更新静态发布目录"
mkdir -p "$SERVE_DIR"
find "$SERVE_DIR" -mindepth 1 -maxdepth 1 -exec rm -rf {} +
cp -a "$SOURCE_DIR/dist/." "$SERVE_DIR/"

echo "==> 修正权限"
chown -R www-data:www-data "$SERVE_DIR"
chmod -R 755 "$SERVE_DIR"

echo "==> 验证文件"
ls -la "$SERVE_DIR" | head -15

echo ""
echo "==> 重新加载 Nginx"
nginx -t && systemctl reload nginx

echo ""
echo "==> 部署完成 ✅"
echo "  访问：https://$DOMAIN"
echo "  日志：tail -f /var/log/nginx/$DOMAIN.access.log"
