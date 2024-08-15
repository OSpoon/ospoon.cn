# 开发环境搭建 (MacOS)

## 安装篇

### 1. [Node.js](https://nodejs.org/)

```bash
# 安装 nvm ( Node 版本管理器)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

# 下载并安装 Node.js (建议重启终端后安装)
nvm install 20

# 验证当前环境中 Node.js 的版本
node -v # should print `v20.16.0`

# 验证当前环境中 npm 的版本
npm -v # should print `10.8.1`
```

### 2. VSCode

> 链接: https://code.visualstudio.com

### 3. Git

> 链接: https://git-scm.com

### 4. Github Desktop

> 链接: https://docs.github.com/desktop

### 5. Oh My Zsh

> 链接: https://ohmyz.sh

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

## 配置篇

### 设置代理:

npm config set proxy http://your-proxy-server:port
npm config set https-proxy http://your-proxy-server:port

npm config get proxy
npm config get https-proxy

npm config delete proxy
npm config delete https-proxy


git config --global http.proxy http://your-proxy-server:port
git config --global https.proxy http://your-proxy-server:port

git config --global --get http.proxy
git config --global --get https.proxy

git config --global --unset http.proxy
git config --global --unset https.proxy