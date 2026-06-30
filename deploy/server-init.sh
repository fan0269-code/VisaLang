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

echo "==> 创建 web 目录骨架 /var/www/<site>/public"
mkdir -p /var/www/_template
chown -R www-data:www-data /var/www
chmod -R 755 /var/www

echo ""
echo "==> 初始化完成 ✅"
echo ""
echo "接下来你需要："
echo "  1) 把域名 flowlight.me 的 A 记录指向 $(curl -s ifconfig.me)"
echo "  2) 复制 deploy/nginx-vhost-template.conf 到 /etc/nginx/sites-available/flowlight.me.conf"
echo "     把 \$DOMAIN 全部替换成 flowlight.me"
echo "     ln -s /etc/nginx/sites-available/flowlight.me.conf /etc/nginx/sites-enabled/"
echo "     nginx -t && systemctl reload nginx"
echo "  3) certbot --nginx -d flowlight.me -d www.flowlight.me（首签证书）"
echo "  4) bash deploy.sh（部署代码）"
echo ""
echo "服务器公网 IP：$(curl -s ifconfig.me)"