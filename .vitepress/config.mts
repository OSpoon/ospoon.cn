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
          { text: 'Gulp', link: '/docs/gulp/01-构建工具Gulp.md' },
          { text: 'NestJs', link: '/docs/nest-js/01-NestJs模块化组织App结构.md' },
          { text: 'webrtc', link: '/docs/webrtc/WebRTC之媒体流与轨道.md' },
          { text: 'Vuejs-Decorator', link: '/docs/vuejs-decorator/01教程前言.md' },
          { text: 'Strapi', link: '/docs/strapi/01-Strapi快速开始指南.md' },
          { text: '前端工程体验优化', link: '/docs/前端工程体验优化/01-数据收集与可视化.md' }
        ]
      },
      { text: '🔥 Articles', link: '/articles.md' },
      { text: '✨ Use', link: '/use.md' },
      { text: '🎉 DevEnv', link: '/environment.md' },
    ],
    sidebar: generateSidebar([
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
        scanStartPath: 'gulp',
        resolvePath: '/docs/gulp/',
      }, {
        documentRootPath: '/docs',
        scanStartPath: 'nest-js',
        resolvePath: '/docs/nest-js/',
      }, {
        documentRootPath: '/docs',
        scanStartPath: 'webrtc',
        resolvePath: '/docs/webrtc/',
      },
      {
        documentRootPath: '/docs',
        scanStartPath: 'vuejs-decorator',
        resolvePath: '/docs/vuejs-decorator/',
      },
      {
        documentRootPath: '/docs',
        scanStartPath: 'strapi',
        resolvePath: '/docs/strapi/',
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
