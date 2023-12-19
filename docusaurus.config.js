// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const math = require("remark-math");
const katex = require("rehype-katex");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "现代 Web 应用开发",
  tagline: "纸上得来终觉浅",
  url: "https://suepaper.github.io",
  baseUrl: "/cs202",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/logo.png",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "SUEPaper", // Usually your GitHub org/user name.
  projectName: "cs202", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  plugins: [
    async function myPlugin(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
  ],

  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid", "@docusaurus/theme-live-codeblock"],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          remarkPlugins: [math],
          rehypePlugins: [katex],
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "CS 202: 现代Web应用开发",
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
        style: "dark",
        copyright: `<div>本网站仅供教学使用，自创内容采用<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh">CC BY-NC-SA 4.0 CN</a>许可协议发布，其他借鉴参考内容许可协议请参考原文许可协议。<div>`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["java", "latex"],
        magicComments: [
          {
            className: "theme-code-block-highlighted-line",
            line: "highlight-next-line",
            block: { start: "highlight-start", end: "highlight-end" },
          },
          {
            className: "code-block-error-line",
            line: "This will error",
          },
        ],
      },
    }),
};

module.exports = config;
