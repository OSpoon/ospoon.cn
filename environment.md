# 开发环境搭建 (MacOS)


## 安装篇

| 下载 | 目的 |
| --- | --- |
| [Chrome](https://www.google.cn/intl/zh-CN/chrome/) | 安装访问网络插件 |
| [Ghelper](https://ghelper.net) | 安装插件后同步 Google 账号、下载上网客户端 |
| [Command Line Tools](https://developer.apple.com/download/all/) | 安装 NVM 时需要依赖 |
| [VS Code](https://code.visualstudio.com/) | 文本编辑器、代码编辑器 |
| [Github Desktop](https://github.com/apps/desktop) | 配置 Git 环境，管理代码仓库 |
| [Rectangle](https://rectangleapp.com/) | 屏幕窗口管理器 |
| [iFan](https://www.better365.cn/h-col-195.html) | Mac 风扇管理器 |

### 安装 [Node.js](https://nodejs.org/)

> 需要配置系统代理、安装 Command Line Tools

```bash
# 安装 nvm ( Node 版本管理器)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

# 下载并安装 Node.js (建议重启终端后安装)
nvm install 20

# 验证当前环境中 Node.js 和 npm 的版本
node -v # should print `v20.16.0`
npm -v # should print `10.8.1`
```

### 安装 [Oh My Zsh](https://ohmyz.sh)

> 需要配置系统代理、安装 Git 环境

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

## 配置篇
### 环境变量配置

| 目的 | 操作 |
| --- | --- |
| 显示隐藏文件 | `command + shift + .` |
| 配置文件生效 | `source ~/.bash_profile` |

### 配置系统代理

```bash
# 配置文件位置：~/.bash_profile
export https_proxy=http://127.0.0.1:7890
export http_proxy=http://127.0.0.1:7890
export all_proxy=socks5://127.0.0.1:7890
```

### 重启终端生效
```bash
# 配置文件位置：~/.zshrc
source ~/.bash_profile
```

### 配置 `code` 命令到 PATH

1. 启动 VS Code 命令窗口：`command + shift + p`
2. 输入 `shell command`
3. 选择 Install `code` command in PATH

### NPM 代理管理:

设置代理
```bash
npm config set proxy http://127.0.0.1:7890
npm config set https-proxy http://127.0.0.1:7890
```

查看代理
```bash
npm config get proxy
npm config get https-proxy
```

删除代理
```bash
npm config delete proxy
npm config delete https-proxy
```

### Git 代理管理:

设置代理
```bash
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890
```

查看代理
```bash
git config --global --get http.proxy
git config --global --get https.proxy
```

删除代理
```bash
git config --global --unset http.proxy
git config --global --unset https.proxy
```