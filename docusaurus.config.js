// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "现代 Web 应用开发",
  tagline: "纸上得来终觉浅",
  url: "https://suepaper.github.io",
  baseUrl: "/cs202",
  favicon: "img/logo.png",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'SUEPaper', // Usually your GitHub org/user name.
  projectName: 'cs202', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'CS 202: 现代Web应用开发',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: "docSidebar",
            position: "left",
            sidebarId: "basicSidebar",
            label: "基础知识",
          },
          {
            type: "docSidebar",
            position: "left",
            sidebarId: "installSidebar",
            label: "开发环境安装",
          },
          {
            type: "docSidebar",
            position: "left",
            sidebarId: "frontendSidebar",
            label: "Web前端基础",
          },
          {
            type: "docSidebar",
            position: "left",
            sidebarId: "backendSidebar",
            label: "Web后端基础",
          },
          {
            type: "docSidebar",
            position: "left",
            sidebarId: "todoSidebar",
            label: "Todo应用开发",
          },
          {
            type: "docSidebar",
            position: "right",
            sidebarId: "gitSidebar",
            label: "git教程",
          },
          {
            type: "docSidebar",
            position: "right",
            sidebarId: "noteSidebar",
            label: "推荐材料",
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [

        ],
        copyright: `本网站仅供教学使用，自创内容采用CC BY-NC-SA 4.0 CN许可协议发布，其他借鉴参考内容许可协议请参考原文许可协议。`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
