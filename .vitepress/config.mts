import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/website',
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
          { text: 'React', link: '/docs/react' },
          { text: 'Puppeteer', link: '/docs/puppeteer/01-快速上手.md' },
          { text: 'Extension.js', link: '/docs/extension-js' },
        ]
      },
      { text: '✨ Use', link: '/use.md' },
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
    ]),
    footer: {
      copyright:
        '© <a target="_blank" href="https://github.com/ospoon">2024 小鑫同学.</a> All rights reserved.',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ospoon' }
    ]
  }
})
