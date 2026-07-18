#!/usr/bin/env bash
# 服务器初始化脚本 - 在腾讯云 CVM 上首次运行
# 用法：ssh 到服务器后，粘贴整个文件内容到终端执行
# 前提：需要 root 权限（sudo -i 或直接 root 登录）

set -euo pipefail

echo "==> 检测系统"
. /etc/os-release
if [[ "$ID" != "ubuntu" && "$ID" != "debian" ]]; then
  echo "✗ 这个脚本只支持 Ubuntu/Debian。你的系统：$ID"
  echo "  如果是 CentOS，把 apt 换成 dnf/yum 后再跑。"
  exit 1
fi
echo "  ✓ $PRETTY_NAME"

echo "==> 更新系统包索引"
apt update -y

echo "==> 安装 Nginx + Certbot + Git + UFW"
DEBIAN_FRONTEND=noninteractive apt install -y nginx certbot python3-certbot-nginx git ufw curl

echo "==> Node.js 要求"
echo "  发布前请单独安装 Node.js 22.12+ 与 npm；本初始化脚本不会在发布窗口修改 Node 运行时。"

echo "==> 启动并开机自启 Nginx"
systemctl enable --now nginx

echo "==> 配置防火墙（保留 SSH / HTTP / HTTPS）"
ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable
ufw status

echo "==> 创建 VisaLang 目录骨架"
mkdir -p /var/www/visalang.org/source /var/www/visalang.org/releases
chown -R www-data:www-data /var/www/visalang.org
chmod -R 755 /var/www/visalang.org

echo ""
echo "==> 初始化完成 ✅"
echo ""
echo "接下来需要由获权操作人完成："
echo "  1) 确认 visalang.org 与 www.visalang.org 的 DNS 目标"
echo "  2) 安装 deploy/nginx-vhost-template.conf 到 /etc/nginx/sites-available/visalang.org.conf"
echo "  3) 安装 deploy/legacy-redirects.conf 到 /etc/nginx/snippets/visalang-legacy-redirects.conf"
echo "  4) nginx -t 通过后再启用并重载 Nginx"
echo "  5) 确认证书覆盖 visalang.org 与 www.visalang.org"
echo "  6) 仅在批准的发布窗口运行 deploy/deploy.sh"
echo ""
echo "服务器公网 IP：$(curl -s ifconfig.me)"
