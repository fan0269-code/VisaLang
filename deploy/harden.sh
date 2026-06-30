#!/usr/bin/env bash
# 服务器安全加固脚本（第二步，server-init.sh 之后跑）
# 前置：已配好 SSH 公钥

set -euo pipefail

if [ "$EUID" -ne 0 ]; then
  echo "请用 root 跑：sudo bash $0"
  exit 1
fi

echo "==> 备份原配置"
cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak.$(date +%Y%m%d)

echo "==> 检查是否有密钥登录"
if [ ! -s /root/.ssh/authorized_keys ] && [ -z "$(ls /home/*/.ssh/authorized_keys 2>/dev/null)" ]; then
  echo "✗ 警告：authorized_keys 是空的！"
  echo "  先把本机公钥加进来：ssh-copy-id root@你的服务器IP"
  echo ""
  read -p "确认已加好密钥？(y/N) " ok
  [[ "$ok" == "y" || "$ok" == "Y" ]] || exit 1
fi

echo "==> 修改 SSH 配置"
sed -i 's/^#\?PasswordAuthentication .*/PasswordAuthentication no/' /etc/ssh/sshd_config
sed -i 's/^#\?PermitRootLogin .*/PermitRootLogin prohibit-password/' /etc/ssh/sshd_config
sed -i 's/^#\?PubkeyAuthentication .*/PubkeyAuthentication yes/' /etc/ssh/sshd_config

echo "  当前设置："
grep -E "^(PasswordAuthentication|PermitRootLogin|PubkeyAuthentication)" /etc/ssh/sshd_config

echo "==> 测试配置"
sshd -t && echo "  ✓ sshd 配置 OK"

echo "==> 安装 fail2ban"
DEBIAN_FRONTEND=noninteractive apt install -y fail2ban
systemctl enable --now fail2ban

echo "==> 重启 sshd（保持当前会话！新会话用密钥登录测试）"
systemctl restart sshd

echo ""
echo "==> 加固完成 ✅"
echo "  - 密码登录：已关闭"
echo "  - root 直登：仅密钥可登"
echo "  - fail2ban：已启用"
echo ""
echo "⚠️  现在不要断当前的 SSH。"
echo "   另开一个终端，新开一个 SSH 连接测试：ssh root@你的服务器IP"
echo "   确认能登录后，再回来关当前会话。"