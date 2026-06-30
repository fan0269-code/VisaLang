#!/usr/bin/env bash
# 一键部署 VisaLang 到 /var/www/flowlight.me/public
# 用法：在服务器上，cd ~/ && bash deploy.sh

set -euo pipefail

DOMAIN="flowlight.me"
SITE_DIR="/var/www/$DOMAIN"
PUBLIC_DIR="$SITE_DIR/public"
REPO="https://github.com/fan0269-code/VisaLang.git"

echo "==> 部署目标：$PUBLIC_DIR"
echo "==> 仓库：$REPO"
echo ""

if [ ! -d "$PUBLIC_DIR" ]; then
  echo "==> 首次部署：克隆仓库"
  mkdir -p "$SITE_DIR"
  git clone "$REPO" "$PUBLIC_DIR"
else
  echo "==> 更新部署：拉取最新代码"
  cd "$PUBLIC_DIR"
  git stash --include-untracked || true
  git pull origin main
  git stash pop || true
fi

echo "==> 修正权限"
chown -R www-data:www-data "$PUBLIC_DIR"
chmod -R 755 "$PUBLIC_DIR"

echo "==> 验证文件"
ls -la "$PUBLIC_DIR" | head -15

echo ""
echo "==> 重新加载 Nginx"
nginx -t && systemctl reload nginx

echo ""
echo "==> 部署完成 ✅"
echo "  访问：https://$DOMAIN"
echo "  日志：tail -f /var/log/nginx/$DOMAIN.access.log"