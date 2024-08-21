import { generateSidebar } from 'vitepress-sidebar'
import { withMermaid } from "vitepress-plugin-mermaid";

// https://vitepress.dev/reference/site-config
export default withMermaid({
  title: "I'm OSpoon",
  description: "👋 Hi, Nice to meet you",
  themeConfig: {
    logo: '/logo.png',
    outline: [2, 6],
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },
    nav: [
      {
        text: '📚 Documents',
        items: [
          { text: 'Vuejs', link: '/docs/vuejs' },
          { text: 'React', link: '/docs/react/01-快速入门.md' },
          { text: 'Puppeteer', link: '/docs/puppeteer/01-快速上手.md' },
          { text: 'Extension.js', link: '/docs/extension-js' },
          { text: 'LogicFlow', link: '/docs/logic-flow/01LogicFlow安装与准备工作.md' },
          { text: 'Pinia', link: '/docs/pinia/01教程前言.md' },
          { text: 'Tsup', link: '/docs/tsup/01构建工具tsup入门第一部分' },
          { text: 'Vuejs-Decorator', link: '/docs/vuejs-decorator/01教程前言.md' },
          { text: '前端工程体验优化', link: '/docs/前端工程体验优化/01-数据收集与可视化.md' }
        ]
      },
      { text: '🔥 Articles', link: '/articles.md' },
      { text: '🚀 Blog', link: '/blog/Chrome扩展开发之按键提示.md' },
      { text: '✨ Use', link: '/use.md' },
      { text: '🎉 DevEnv', link: '/environment.md' },
    ],
    sidebar: generateSidebar([
      {
        documentRootPath: '/',
        scanStartPath: 'blog',
        resolvePath: '/blog/',
      },
      {
        documentRootPath: '/docs',
        scanStartPath: 'vuejs',
        resolvePath: '/docs/vuejs/',
      },
      {
        documentRootPath: '/docs',
        scanStartPath: 'react',
        resolvePath: '/docs/react/',
      },
      {
        documentRootPath: '/docs',
        scanStartPath: 'puppeteer',
        resolvePath: '/docs/puppeteer/',
      },
      {
        documentRootPath: '/docs',
        scanStartPath: 'extension-js',
        resolvePath: '/docs/extension-js/',
      },
      {
        documentRootPath: '/docs',
        scanStartPath: 'logic-flow',
        resolvePath: '/docs/logic-flow/',
      },
      {
        documentRootPath: '/docs',
        scanStartPath: 'pinia',
        resolvePath: '/docs/pinia/',
      },
      {
        documentRootPath: '/docs',
        scanStartPath: 'tsup',
        resolvePath: '/docs/tsup/',
      },
      {
        documentRootPath: '/docs',
        scanStartPath: 'vuejs-decorator',
        resolvePath: '/docs/vuejs-decorator/',
      },
      {
        documentRootPath: '/docs',
        scanStartPath: '前端工程体验优化',
        resolvePath: '/docs/前端工程体验优化/',
      },
    ]),
    footer: {
      copyright:
        '© <a target="_blank" href="https://github.com/ospoon">2024 小鑫同学.</a> All rights reserved.',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ospoon' }
    ]
  },
  mermaid: {

  },
})
