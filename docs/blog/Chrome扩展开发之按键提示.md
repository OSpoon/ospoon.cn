# 全流程 Chrome 扩展开发之按键提示

本文详述了使用 Extension.js 开发 Chrome 扩展的流程，包括 Vue.js 组件开发、样式隔离、RxJS 事件处理，以及通过 GitHub Actions 实现持续交付和语义化版本管理。

[key-prompt](https://github.com/OSpoon/key-prompt) 是一个基于 **Extension.js** 开发工具和其提供的 `vue-typescript` 模板开发的 Chrome 扩展程序，可以在任意网页的左下方位置显示你对当前页面的键盘操作，其实这是一个无聊的扩展程序，只当图一乐儿 😁

**重点提示：**

1. 如何使用 Extension.js 即插即用、无需配置、跨浏览器的扩展开发工具；
2. VueUse 组合式工具集开箱即用的工具函数；
3. ShadowDOM 实现样式隔离；
4. 利用 RxJS 特性完成功能的合并封装；
5. Github Actions 持续交付；
6. 自定义语义化版本； 
7. 完整代码提议访问 https://github.com/OSpoon/key-prompt 获取；

## Extension.js 开发工具

🧩 [Extension.js](https://github.com/extension-js/extension.js) 是 [Cezar Augusto](https://github.com/cezaraugusto) 开发的一个即插即用、无需配置、跨浏览器的扩展开发工具，内置支持 TypeScript、WebAssembly 和现代 JavaScript。

提供了三种开启方式：

* [Create A New Extension](https://github.com/extension-js/extension.js#create-a-new-extension)
* [Get Started Immediately](https://github.com/extension-js/extension.js#get-started-immediately)
* [I have An Extension](https://github.com/extension-js/extension.js#i-have-an-extension)

### 创建一个新的扩展程序：

通过下面的命令你可以获得一个基于内置默认[模板](https://extension.js.org/n/getting-started/templates/)创建的名为 `my-extension` 的扩展程序项目，通过简单的  `dev` 命令，即可自动打开浏览器并安装好扩展程序：

```sh
npx extension create my-extension
cd my-extension
npm run dev
```

目前 Extension.js 支持 **ESNext**、**TypeScript**、**WASM**、**React**、**Vue** 和 **Preact** 为技术栈的开发模板支持，**Angular**、**Svelte** 和 **Solid** 还尚未支持，欢迎有兴趣的朋友提交👋 **PR**。

### 立即开始一个扩展程序：

如果你不想基于[内置模板](https://extension.js.org/n/getting-started/templates/)，也可以通过下面的方式立即开始一个创建程序：

* 从 [Google Chrome Extension Samples](https://github.com/GoogleChrome/chrome-extensions-samples) 创建基于 Edge 作为运行时浏览器的示例：

```sh
npx extension dev https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/api-samples/topSites/magic8ball --browser=edge
```

* 从 [MDN WebExtensions Examples](https://github.com/mdn/webextensions-examples) 创建基于 Edge 作为运行时浏览器的示例：

```sh
npx extension dev https://github.com/mdn/webextensions-examples/tree/main/apply-css --browser=edge --polyfill=true
```

* 从 [MDN WebExtensions Examples](https://github.com/mdn/webextensions-examples) 创建基于Chrome 和 Firefox 作为运行时浏览器的示例：

```sh
npx extension dev https://github.com/mdn/webextensions-examples/tree/main/firefox-code-search --browser=chrome,firefox --polyfill=true
```

### 已有一个扩展程序：

如果你已经有使用包管理器的现有扩展程序，你可以安装 Extension.js 包并手动创建用于运行扩展程序的脚本。参见上方的示例或遵循以下步骤完成操作：

* **步骤 1 - 安装扩展程序作为 `devDependency`**

```sh
npm install extension --save-dev
```

* **步骤 2 - 将您的 npm 脚本与可执行的 Extension.js 命令链接起来**

```json
{
  "scripts": {
    "build": "extension build",
    "dev": "extension dev",
    "start": "extension start"
  },
  "devDependencies": {
    // ...other dependencies
    "extension": "latest"
  }
}
```

常用命令：

* 开发扩展程序时，请运行 `npm run dev` 。
* 为了在生产模式下可视化扩展，请运行 `npm run start` 。
* 构建生产模式下的扩展，请运行 `npm run build` 。

PS：由于 Extension.js 近期忙于一个大版本的迭代，文档更新不及时，感兴趣的朋友可以通过项目及 Issue 获取项目更多细节。

## 按键提示扩展开发流程

**按键提示** 功能常见于视频录制和在线会议的一些演示场景，可以给予学习和参会者更多的键盘上的明确信息，其实基于浏览器的**按键提示**是有一定的局限性的，我仅以此案例作为浏览器扩展开发的切入点。

![](https://raw.githubusercontent.com/OSpoon/ImageStorage/2024/uPic/key-ptompt.gif)

👇🏻接下来跟随我的步伐一起敲起来 

### 快速创建一个扩展程序项目：

基于 **vue-typescript** 模板创建一个内置 `typescript`、`tailwind` 的 `content` 扩展程序项目。

```sh
$ npx extension create key-prompt-new --template=vue-typescript
🐣 - Starting a new browser extension named key-prompt-new...
🤝 - Ensuring key-prompt-new folder exists...
🤞 - Checking if destination path is writeable...
🔎 - Scanning for potential conflicting files...
🧰 - Installing key-prompt-new from vue-typescript template...
📝 - Writing package.json metadata...
🛠  - Installing dependencies...
📝 - Writing README.md metadata...
📜 - Writing manifest.json metadata...
🌲 - Initializing git repository for key-prompt-new...
🔷 - Writing key-prompt-new type definitions...
🧩 - Success! Extension key-prompt-new created.

Now cd key-prompt-new and npm run dev to open a new browser instance
with your extension installed, loaded, and enabled for development.

You are ready. Time to hack on your extension!
```

> [!NOTE]
>
> **Chrome 扩展程序知识补充：**
>
> * **Content scripts** 主要用于与网页内容交互，在网页的上下文中运行，但不能直接访问 Chrome 扩展的 API。
>
> * **Popup scripts** 主要用于提供用户界面，在扩展的弹出页面中运行，可以直接访问 Chrome 扩展的 API。

|                 | 定义                                                         | 用途                                                         | 运行环境                                                     |
| --------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Content Scripts | Content scripts 是在浏览器页面中运行的 JavaScript 文件。它们可以访问和修改网页的 DOM 内容，但不能直接访问 Chrome 扩展的 API（除了部分有限的 API） | Content scripts 通常用于操作网页内容，例如修改网页的 HTML、CSS，或从网页中提取数据 | Content scripts 运行在网页的上下文中，意味着它们与网页共享相同的 DOM 环境和 JavaScript 作用域，但它们的执行环境是与网页的 JavaScript 独立的，这有助于隔离扩展和网页之间的代码 |
| Popup Scripts   | Popup scripts 是在扩展的弹出页面中运行的 JavaScript 文件。弹出页面是当用户点击浏览器工具栏上的扩展图标时显示的 UI | Popup scripts 通常用于提供用户界面和交互逻辑，例如显示信息、接收用户输入、触发扩展功能等 | Popup scripts 运行在独立的 HTML 页面中，类似于一个普通的 Web 页面。它们可以直接访问 Chrome 扩展的所有 API |

### 开发 Content Scripts 部分：

#### VueUse 组合式工具集：

[VueUse](https://vueuse.org/) 是 Vue.js 开发时非常用帮助的 **Vue 组合式工具集**，**按键提示**主要使用到其中的 `onKeyDown` 和 `useDebounceFn` 两个 API：

首先定义三个变量：

* queue：存储当前键盘输入的按键

* history：储存输入完成后的一组按键
* maxHistoryQueue：表示 history 最大存储几组建安

```typescript
const maxHistoryQueue = 2;

const history = reactive<{ key: string[][] }>({ key: [] })
const queue = reactive<{ key: string[] }>({ key: [] })
```

接着使用 `onKeyDown` 实现按键按下的监听，并启用 `dedupe` 选项对按键去重：

```typescript
// 监听按键事件
onKeyDown(true, (e) => {
  queue.key.push(e.key)
}, { dedupe: true })
```

再接着利用 `useDebounceFn` 函数延迟执行的特性实现 `inputCompleteReady` 和 `inputTimeoutReady`：

```typescript
// 输入完成后将内容转移到历史队列并清空当前队列
const inputCompleteReady = useDebounceFn(() => {
  if (history.key.length === maxHistoryQueue) {
    history.key.shift()
  }
  history.key?.push(queue.key)
  queue.key = []
}, 300)
```

```typescript
// 输入超时后清空历史队列和当前队列
const inputTimeoutReady = useDebounceFn(() => {
  queue.key = []
  history.key = []
}, 2400)
```

最后将这两个函数接入到 `onKeyDown` 监听中：

```typescript
// 监听按键事件
onKeyDown(true, (e) => {
  queue.key.push(e.key)

  inputCompleteReady()
  inputTimeoutReady()
}, { dedupe: true })
```

#### ShadowDOM 样式隔离：

```vue
// content/ContentApp.vue
<template>
  <div class="container">
    <div class="group">
      <TransitionGroup>
        <template v-for="queue in history.key">
          <kbd v-if="queue.length > 0" class="kbd">
            {{ queue.join(' ') }}
          </kbd>
        </template>
      </TransitionGroup>
    </div>
    <div class="single">
      <kbd class="kbd" v-for="key in queue.key">
        {{ key }}
      </kbd>
    </div>
  </div>
</template>
```

由于 Content scripts 通常运行在网页的上下文中，所以样式污染是一个必须解决的问题，所以我考虑使用 **ShadowDOM** + **Inline style** 的方式的达到天然的样式隔离：

```javascript
// content/scripts.ts
import css from './styles'

function initial() {
  const rootId = 'key-prompt'

  // 创建一个新的 div 作为 shadowDOM 根节点。
  const hostDiv = document.createElement("div")
  hostDiv.id = `${rootId}-host`
  document.body.appendChild(hostDiv)

  // 将 shadowDOM 附加到 hostDiv，并将模式设置为“打开”，以便从JavaScript访问。
  const shadowRoot = hostDiv.attachShadow({ mode: "open" })

  // 通过内联的方式插入样式片段
  const styleSheet = document.createElement("style")
  styleSheet.textContent = css
  shadowRoot.appendChild(styleSheet)

  // 创建一个新的 div ，作为 Vue 根容器
  const rootDiv = document.createElement("div")
  rootDiv.id = `${rootId}`
  shadowRoot.appendChild(rootDiv)

  createApp(ContentApp).mount(rootDiv)
}
```

PS：由于 Extension.js 底层对于 Vue.js SFC 组件中 style 部分的解析似乎存在问题，所以无法在 SFC 组件使用 style 标签直接编写样式。

### 开发 Popup Scripts 部分：

基于 Vue.js 的在 Popup Scripts 部分开发 ：

```
popup            
├─ NewPopup.vue   // 激活按键提示功能的选项页面
├─ popup.html     // 包含 scripts.ts 文件的 html
├─ scripts.ts     // 完成基于 vue 的 DOM 挂在
└─ styles.css   	// 导入 tailwind 相关样式文件
```

**NewPopup.vue** 主要负责激活功能的开启和关闭：

```vue
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { getLocalStorage, Keys, setLocalStorage } from '../shared/shared';

const isEnabled = ref<boolean>(false);

watch(isEnabled, async (bool) => {
    // TODO 监听 isEnabled 的变换，更新 Storage 中的状态值
})

onMounted(() => {
    // TODO 获取 Storage 存储的是否激活状态的状态值
})
</script>
<template>
    <div class="w-[320px] min-h-[80px] p-5 bg-base-200">
        <div class="form-control">
            <label class="label cursor-pointer">
                <span class="label-text">激活 Key Display</span>
                <input type="checkbox" v-model="isEnabled" class="checkbox" />
            </label>
        </div>
    </div>
</template>
```

更新 `manifest.json` 文件，完成必要配置：

```json
{
  "action": {
    "default_popup": "./popup/popup.html"
  },
  "permissions": [
    "activeTab",
    "storage"
  ]
}
```

安装 **daisyui** 并配置到 `tailwind.config.js`：

```sh
npm install -D daisyui
```

```typescript
/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [
    require('daisyui')
  ]
}
```

### RxJS 强化 StorageChange：

**[Storage](https://developer.chrome.com/docs/extensions/reference/api/storage?hl=zh-cn)** 是用于扩展程序保留用户数据和状态一组 API，下面是对 getter 和 setter API 的使用：

```typescript
// shared/shared.ts
export const Keys = {
    KEY_PROMPT_ACTIVATE: 'key-prompt-activate'
}

export async function setLocalStorage(key: string, value: any) {
    const target = {}
    Reflect.set(target, key, value)
    await chrome.storage.local.set(target)
}

export function getLocalStorage(callback: (value: any) => void) {
    chrome.storage.local.get([Keys.KEY_PROMPT_ACTIVATE], (items) => {
        const value = Reflect.get(items, Keys.KEY_PROMPT_ACTIVATE)
        callback(value)
    });
}
```

在 Content Scripts 的页面挂在后，应该先获取 storage 中存储的是否激活功能的状态值，然后利用 Storage 提供的 `onChanged` 函数开启状态值的监听。这样往往在 `onMounted` 函数中需要写获取和监听两部分功能，所以我决定使用 RxJS 订阅事件流的特性将它们合并到一起：

```typescript
import { Observable } from 'rxjs';

export const localStorageChanged$ = new Observable<{
    [key: string]: chrome.storage.StorageChange
}>(subscriber => {
    const next = (
        areaName: chrome.storage.AreaName,
        changes: { [key: string]: chrome.storage.StorageChange }
    ) => {
        if (areaName === 'local') {
            subscriber.next(changes)
        }
    }
    chrome.storage.local.get(null, (items) => {
        const changes = Object.keys(items).reduce((target, key) => {
            Reflect.set(target, key, {
                oldValue: undefined,
                newValue: items[key]
            })
            return target
        }, {})
        next('local', changes)
    })
    chrome.storage.onChanged.addListener((changes, areaName) => next(areaName, changes))
})
```

接着在 Content Scripts 的 `onMounted` 函数就可以通过订阅 StorageChange 既能获取到第一次的状态值也可以在后续状态变化后随时更新：

```typescript
onMounted(() => {
  localStorageChanged$.subscribe((changes) => {
    isEnabled.value = Reflect.get(changes, Keys.KEY_PROMPT_ACTIVATE)?.newValue
  })
})

// 注意：监听按键事件中需要添加 isEnabled 判断
onKeyDown(true, (e) => {
  if (isEnabled.value) {
    queue.key.push(e.key)

    inputCompleteReady()
    inputTimeoutReady()
  }
}, { dedupe: true })
```

再将 Popup Scripts 中保留的两个 TODO 补充完整：

```vue
<script setup lang="ts">
import { onMounted, watch } from 'vue';

watch(isEnabled, async (bool) => {
    setLocalStorage(Keys.KEY_PROMPT_ACTIVATE, bool)
})

onMounted(() => {
    getLocalStorage(async (value) => {
        isEnabled.value = value
    })
})
</script>
```

### 调整配置文件：

* 更新 content_scripts 中的 matches 字段，让任意网页都能使用按键提示功能

  ```json
  {
    "content_scripts": [
      {
        "matches": [
          "<all_urls>"
        ],
        "js": [
          "./content/content.ts"
        ]
      }
    ]
  }
  ```

* 更新 tailwind.config.js 文件，将 tailwind 限制到只针对 Popup Scripts 生效，因为 Content Scripts 直接使用 tailwind 会造成样式污染，虽然使用 ShadowDOM 可以避免样式污染，但是内联的使用仍然是不方便的，姑且就把 tailwind 的配置直接缩小，较少开发阶段的文件检索：

  ```
  /** @type {import('tailwindcss').Config} */
  module.exports = {
    content: ['popup/*.vue'],
  }
  ```

## GitHub Actions 持续交付

Chrome 扩展商店是需要付费上架的，对于个人制作的小玩具不具备花钱的必要，所以我选择将打包的 Chrome 扩展程序发布到 Github Release。

这份 Github Actions 主要分为三部分来说明，

### 第一部分： `name`、`on`、`permissions` 

* name：设置工作流程的名字
* on：触发器，`workflow_dispatch:` 允许手动触发工作流程，也可以将配置中注释打开，在 `main` 分之有新代码推送时自动触发
* permissions：因为涉及到在工作流程中 创建 `tag` 和提交，所以需要赋予一定的权限，当然也可以在项目的设置中进行修改

```yaml
// .github/workflows/release.yml
name: Build and Release Chrome Extension

on:
  # push:
  #   branches:
  #     - main
  workflow_dispatch:

permissions:
  contents: write
```

### 第二部分：jobs/build

* runs-on：在最新的 Ubuntu 环境运行此工作流程
* outputs：输出一个 `version` 变量，用来确定扩展程序版本， 在后续流程有用到
* steps：
  * 检出源码
  * 设置 Node.js 环境和版本
  * 安装项目依赖
  * 构建扩展并打包成 zip 文件
  * **从 `manifest.json` 文件中读取扩展版本号，并将其存储在环境变量和步骤输出中**
  * **将编译后的扩展程序存档**

```yaml
runs-on: ubuntu-latest
outputs:
  version: ${{ steps.get_version.outputs.version }}
steps:
  - name: Checkout repository
    uses: actions/checkout@v3

  - name: Set up Node.js
    uses: actions/setup-node@v3
    with:
      node-version: '20'

  - name: Install dependencies
    run: npm install

  - name: Build extension
    run: npm run build:zip

  - name: Read version from manifest.json
    id: get_version
    run: |
      VERSION=$(jq -r .version manifest.json)
      echo "VERSION=$VERSION" >> $GITHUB_ENV
      echo "::set-output name=version::$VERSION"

  - name: Archive build artifacts
    uses: actions/upload-artifact@v3
    with:
      name: chrome-extension
      path: ./dist/chrome/key-prompt-${{ steps.get_version.outputs.version }}.zip
```

### 第三部分：jobs/release

* runs-on: 同样在最新的 Ubuntu 环境运行
* needs: 需要依赖 build 构建 job
* steps:
  * 再次检出代码
  * 下载 build 时存档的扩展程序文件
  * 配置必要的 Git 用户信息
  * 使用 build 时存储的版本号创建新的 **tag**，并推送远程仓库
  * 安装 `github_changelog_generator` 并生成 `CHANGELOG.md`
  * 创建 **GitHub Release** 并上传扩展程序文件

```yaml
runs-on: ubuntu-latest
needs: build
steps:
  - name: Checkout repository
    uses: actions/checkout@v3

  - name: Download build artifacts
    uses: actions/download-artifact@v3
    with:
      name: chrome-extension

  - name: Configure git
    run: |
      git config --global user.email "github-actions@github.com"
      git config --global user.name "GitHub Actions"

  - name: Create new tag
    env:
      GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    run: |
      git tag -a v${{ needs.build.outputs.version }} -m "Release version ${{ needs.build.outputs.version }}"
      git push https://x-access-token:${{ secrets.GITHUB_TOKEN }}@github.com/OSpoon/key-prompt.git v${{ needs.build.outputs.version }}

  - name: Set up Ruby
    uses: ruby/setup-ruby@v1
    with:
      ruby-version: '3.0'

  - name: Install github-changelog-generator
    run: gem install github_changelog_generator

  - name: Generate changelog
    run: github_changelog_generator -u <username> -p <repo> --token ${{ secrets.GITHUB_TOKEN }}

  - name: Create GitHub Release
    id: create_release
    uses: actions/create-release@v1
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    with:
      tag_name: v${{ needs.build.outputs.version }}
      release_name: Release ${{ needs.build.outputs.version }}
      body_path: CHANGELOG.md
      draft: false
      prerelease: false

  - name: Upload release asset
    uses: actions/upload-release-asset@v1
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    with:
      upload_url: ${{ steps.create_release.outputs.upload_url }}
      asset_path: ./key-prompt-${{ needs.build.outputs.version }}.zip
      asset_name: key-prompt-${{ needs.build.outputs.version }}.zip
      asset_content_type: application/zip
```



## 自定义语义化版本

> 语义化版本 2.0.0 摘要：
>
> 版本格式：主版本号.次版本号.修订号，版本号递增规则如下：
>
> 1. 主版本号：当你做了不兼容的 API 修改，
> 2. 次版本号：当你做了向下兼容的功能性新增，
> 3. 修订号：当你做了向下兼容的问题修正。
>
> 先行版本号及版本编译信息可以加到“主版本号.次版本号.修订号”的后面，作为延伸。
>
> 全文阅读：https://semver.org/lang/zh-CN/

语义化版本管理是软件管理领域的一套管理规范，前端项目的语义化版本管理模块主要是对 `package.json` 中的 `version` 字段维护，但是**Chrome** 扩展开发中主要需要维护的版本号是 `manifest.json` 文件中的 `verison` 字段，所以我通过编写一个 `update-version.js` 文件来实现语义化版本管理的通用做法：

### 如何自动获取 ReleaseType：

**ReleaseType** 指的是版本号递增规则中的主版本号（`major`）、次版本号（`minor`）、修订号（`patch`）等，确定 ReleaseType 的主要途径一个是人为选择来确定，另一个是通过 **Git Commit** 信息来自动确定，这里我主要来讲如何通过 **Git Commit** 信息来自动确定ReleaseType。

我编写了一段 Node.js 脚本，通过 `execSync `执行 `git log` 命令获取到 commit 信息，再通过正则来判断 commit 信息中是否包含特定的 Git Commit 标识。

```javascript
const { execSync } = require('child_process')

const commitMessages = execSync('git log --format=%s -n 10', { encoding: 'utf-8' })
let releaseType = "patch"
if (/BREAKING CHANGE/i.test(commitMessages)) {
    releaseType = 'major'
} else if (/feat/i.test(commitMessages)) {
    releaseType = 'minor'
} else if (/fix/i.test(commitMessages)) {
    releaseType = 'patch'
}
```

### 生成 New 版本号：

这里需要引入一个 `semver` 模块，使用该模块内置的 `inc` 函数，可以一行代码获得新的版本号：

```JavaScript
const newVersion = semver.inc(manifest.version, releaseType)
```

最后加入文件读写的代码获得一个最终版的升级版本的脚本文件：

```javascript
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const semver = require('semver')

const versionPath = path.resolve(__dirname, './manifest.json')
const manifest = JSON.parse(fs.readFileSync(versionPath))

// 读取 commit message, 分析下一次升级的 ReleaseType
const commitMessages = execSync('git log --format=%s -n 10', { encoding: 'utf-8' })
let releaseType = "patch"
if (/BREAKING CHANGE/i.test(commitMessages)) {
    releaseType = 'major'
} else if (/feat/i.test(commitMessages)) {
    releaseType = 'minor'
} else if (/fix/i.test(commitMessages)) {
    releaseType = 'patch'
}

// 按照 ReleaseType 生成新的版本号
const newVersion = semver.inc(manifest.version, releaseType) || version
manifest.version = newVersion;
fs.writeFileSync(
    versionPath,
    JSON.stringify(manifest, null, 2),
    'utf8'
)

console.log(`Version bumped to ${newVersion}`)
```

## 总结

这篇文章介绍了如何使用 Extension.js 和 Vue.js 开发一个 Chrome 扩展程序。主要内容包括如何创建和配置扩展程序、开发 Content Scripts 和 Popup Scripts、实现样式隔离、使用 RxJS 强化 StorageChange，并通过 GitHub Actions 实现持续交付。还涵盖了语义化版本管理的自动化脚本编写和应用。