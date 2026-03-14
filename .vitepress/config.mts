import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'SerinaIX',
  description: 'AS4242423625 | 一个 DN42 中的 IX | 全互联二层交换网络',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      {
        text: '🔎 Looking Glass',
        link: 'https://lg.dn42.serinanya.cn/',
      },
    ],

    sidebar: [
      {
        text: '接入指南',
        items: [
          { text: '开始接入', link: '/getting-started' },
          { text: '配置 BGP 会话', link: '/bgp-configuration' },
          { text: '路由政策', link: '/route-policy' },
          { text: 'Large Communities', link: '/large-communities' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/SerinaNya/SerinaIX-doc' },
    ],

    footer: {
      message:
        '<a href="https://beian.miit.gov.cn/" target="_blank" style="text-decoration: none">沪ICP备2021021453号-4</a>',
      copyright:
        '© 2026-present <a href="https://serinanya.cn/" target="_blank" style="text-decoration: none">SerinaNya</a>, licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" style="text-decoration: none">CC BY-NC-SA 4.0</a>',
    },

    externalLinkIcon: true,
  },
  cleanUrls: true,
  lastUpdated: true,
});
