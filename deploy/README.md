# 腾讯云 CVM 多站点部署 — 30 分钟操作手册

> 你的环境：腾讯云 CVM + `flowlight.me`（同台机器跑多个域名）

## 0. 准备工作（5 分钟，你电脑上）

终端里跑：
```bash
ssh root@你的服务器公网IP
```
首次连接问 `yes` 后输 root 密码进入 shell。**全程保持这个 SSH 不断开。**

---

## 1. 服务器初始化（10 分钟）

在 SSH 终端里跑：

```bash
apt update -y && apt install -y curl
curl -fsSL -o /tmp/server-init.sh \
  https://raw.githubusercontent.com/fan0269-code/VisaLang/main/deploy/server-init.sh
# 因为仓库刚 push 还没 1-2 分钟，curl 可能 404。等一会儿再跑。
# 或者我在你 push 后立即告诉你从 GitHub 拉。

# 临时方案：手动粘贴 server-init.sh 内容到 SSH 里执行
nano /tmp/server-init.sh  # 粘贴整段内容，Ctrl+O 回车，Ctrl+X 退出
bash /tmp/server-init.sh
```

执行完会打印服务器公网 IP，记下来。

---

## 2. 域名解析（5 分钟）

去域名注册商加 A 记录：
| 主机记录 | 记录类型 | 记录值 |
|:---|:---|:---|
| @ | A | 你的服务器 IP |
| www | A | 你的服务器 IP |

等生效（你电脑跑 `nslookup flowlight.me` 看 IP）。

---

## 3. SSH 密钥配对（5 分钟）

**本机执行：**
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"  # 没密钥则跑
ssh-copy-id root@你的服务器IP
```
之后 SSH 不用输密码。

---

## 4. Nginx 站点配置（3 分钟）

服务器上：
```bash
nano /etc/nginx/sites-available/flowlight.me.conf
```
粘贴 `deploy/nginx-vhost-template.conf` 全部内容，把 `$DOMAIN` 全部换成 `flowlight.me`。

启用：
```bash
ln -s /etc/nginx/sites-available/flowlight.me.conf /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

---

## 5. SSL 证书（2 分钟）

```bash
certbot --nginx -d flowlight.me -d www.flowlight.me
```
按提示输邮箱、同意条款。证书自动续期。

---

## 6. 部署代码（1 分钟）

```bash
nano deploy.sh   # 粘贴 deploy/deploy.sh 全部内容，保存
bash deploy.sh
```

或一行 curl 拉：
```bash
curl -fsSL -o /tmp/deploy.sh https://raw.githubusercontent.com/fan0269-code/VisaLang/main/deploy/deploy.sh
bash /tmp/deploy.sh
```

---

## 7. 验证

浏览器开 https://flowlight.me，应该看到升级后的 VisaLang。

## ✅ 完成！

---

## 改代码后重新部署
```bash
ssh root@你的服务器IP
curl -fsSL -o /tmp/deploy.sh https://raw.githubusercontent.com/fan0269-code/VisaLang/main/deploy/deploy.sh
bash /tmp/deploy.sh
```

部署脚本会把仓库保存在 `/var/www/flowlight.me/source`，在服务器上执行 Astro 构建，并把完整 `dist/` 同步到 Nginx 的 `/var/www/flowlight.me/public`。发布前会强制检查 `dist/index.html`，避免根目录缺少入口时再次出现 403。

## 加新域名（同台机器跑第二个站）
```bash
cp /etc/nginx/sites-available/flowlight.me.conf /etc/nginx/sites-available/新域名.conf
sed -i 's/flowlight.me/新域名/g' /etc/nginx/sites-available/新域名.conf
sed -i 's|/public|/新域名/public|g' /etc/nginx/sites-available/新域名.conf
ln -s /etc/nginx/sites-available/新域名.conf /etc/nginx/sites-enabled/
mkdir -p /var/www/新域名/public
nginx -t && systemctl reload nginx
certbot --nginx -d 新域名 -d www.新域名
```

## 安全加固（可选）
```bash
bash harden.sh   # 在服务器上
```

## 替换 Formspree
1. https://formspree.io 注册拿 form ID
2. 编辑 `index.html`，把 `YOUR_FORM_ID` 替换
3. 重新跑 `bash deploy.sh`
