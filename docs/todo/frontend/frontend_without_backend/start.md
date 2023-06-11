---
id : start
sidebar_position: 1
---

# 初始化项目

## Vite

首先进行以下操作

1. 新建文件夹，命名为TodoListApplication。
2. 打开文件夹，新建两个文件夹，命名为backend，frontend。
3. 在VScode中打开TodoListApplication，并打开终端。

我们使用[Vite](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project)来初始化前端项目。

在命令行中输入
```bash
cd frontend
npm create vite@latest
```
![](img/1_1.png)

在这里输入我们的项目名，TodoListApplication，回车

![](img/1_2.png)

输入包名，直接回车

![](img/1_3.png)

用键盘的上下键选择，我们选择`React`框架，回车

![](img/1_4.png)

选择用Javascript，回车

![](img/1_5.png)

此时已经初始化成功，按照它的提示，输入

```bash
code .\frontend\TodoListApplication
npm install
npm run dev
```
:::tip
`npm install`是按照所需要的依赖

`npm run dev`是启动项目
:::

![](img/1_6.png)

此时本地服务器已经启动,浏览器输入http://localhost:5173/，即可看到我们的项目

![](img/1_7.png)

## 安装所需要的包

### tailwind css

![](img/1_8.png)

接下来我们新建终端，输入
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
我们将使用[Tailwind](https://tailwindcss.com/docs/guides/vite)作为样式

:::tip
[Tailwind](https://www.tailwindcss.cn/)是什么？
只需书写 HTML 代码，无需书写 CSS，即可快速构建美观的网站。
:::

### react

接下来安装我们所需要的包`react-icons`,`react-redux`,`@reduxjs/toolkit`

```bash
npm install react-icons react-redux @reduxjs/toolkit
```

### 查看是否安装

![](img/1_9.png)

打开**package.json**文件，可以看到已经安装好了所需要的包

:::tip
package.json 是一个用于描述和管理项目的配置文件，通常位于项目的根目录下。它是 Node.js 项目的一部分，用于定义项目的元数据、依赖关系和脚本命令等信息。

在 package.json 文件中，可以包含以下信息：

1. 项目名称 (`name`)：指定项目的名称。
2. 项目版本 (`version`)：指定项目的版本号。
3. 项目描述 (`description`)：对项目进行简要描述。
4. 作者 (`author`)：指定项目的作者。
5. 许可证 (`license`)：指定项目的许可证。
6. 依赖关系 (`dependencies`)：指定项目所依赖的外部包或库。
7. 开发依赖关系 (`devDependencies`)：指定项目在开发过程中所需要的依赖项。
8. 脚本命令 (`scripts`)：定义一些自定义的脚本命令，可以通过 `npm run` 或 `yarn run` 来执行这些命令。
9. 其他自定义配置项：可以根据项目的需要添加其他自定义的配置项。

通过编辑和维护 package.json 文件，开发人员可以管理项目的依赖、运行自定义的脚本命令，以及描述项目的基本信息。这对于项目的开发、构建和部署非常有用。
:::

## 配置Tailwind

![](img/1_10.png)

删除该文件，因为我们有了Tailwind css就不需要自己写css了

![](img/1_13.png)

删除文件src\assets\react.svg

将src\index.css文件中的代码替换为

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

将tailwind.config.js替代为
```jsx
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      Poppins: "Poppins",
    },
    extend: {
      colors: {
        transparentBlack: "rgba(0,0,0,0.85)",//透明度为 0.85 的黑色，用于创建半透明的背景或文字颜色。
        sunsetOrange: "#FF4F5A",// 日落橙色
        Tangaroa: "#1A2E35",
        Gainsboro: "#E1E1E1",//一种淡灰色，用于创建背景或边框。
        greenTeal: "#22C55E",//绿蓝色
        Gray: "#6B7498",//灰色
      },
    },
    screens: {
      xs: "480px",
      sm: "768px",
      md: "1060px",
    },
  },
  plugins: [],
};

```
:::tip
tailwind.config.js 是 Tailwind CSS 的配置文件。它用于自定义和配置 Tailwind CSS 的各种选项和样式。

在 tailwind.config.js 文件中，可以进行以下配置：

1. 主题（Theme）：通过配置颜色、字体、边框、间距等参数来定义项目的主题样式。
2. 变体（Variants）：配置哪些 CSS 类名的变体应该生成，例如响应式类名、伪类、状态类等。
3. 插件（Plugins）：引入和配置各种插件来扩展 Tailwind CSS 的功能，例如自定义样式、添加第三方库、优化工具等。
4. 样式（Styles）：配置自定义的 CSS 类名和样式，可以使用原生 CSS 或预处理器语法。
5. PurgeCSS：配置用于清除未使用的 CSS 的选项，以减小生成的 CSS 文件大小。

通过编辑和配置 tailwind.config.js 文件，可以根据项目的需要自定义和调整 Tailwind CSS 的样式和功能。这样可以使得 Tailwind CSS 更加适应项目的需求，并提供一致的设计风格和样式规范。
:::


打开src\App.jsx文件，将其中的代码替换为

```jsx
function App() {
  return <div>App</div>;
}

export default App;
```

打开网页可以看到网页的左上角
![](img/1_12.png)

## 新建字体与组件文件夹等

在/src下新建components，fonts，Store文件夹

将字体放在fonts文件夹内

将图片放在frontend\src\assets文件夹

![](img/1_14.png)

将src\index.css文件中的代码替换为

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
    @font-face {
      font-family: "Poppins";
      src: url(./fonts/Poppins-Regular.ttf);
    }
  }
```
:::tip
这段代码是在 `@layer base` 中定义了 `@font-face` 规则，用于引入字体文件并定义字体系列名称为 "Poppins"。

具体来说，它做了以下几个操作：

1. 使用 `@font-face` 规则引入字体文件。
2. `font-family` 属性设置字体系列名称为 "Poppins"。
3. `src` 属性指定了字体文件的路径，这里使用了相对路径 `./fonts/Poppins-Regular.ttf`。

这样，在应用中使用 `font-family: "Poppins";` 时，会使用引入的字体文件来渲染文本。请确保字体文件的路径和文件名是正确的，并位于指定的路径下。
:::

### 测试Tailwind css

将APP.jsx中的代码替换为

```jsx
function App() {
  return (
    <div className="App font-Poppins container py-16 px-6 min-h-screen mx-auto">
      App
    </div>
  );
}

export default App;
```
返回网页，发现

![](img/1_15.png)

说明css样式生效了

## 总结

我们用vite初始化了项目，安装了所需的依赖，使用了tailwind css，并修改了其配置，增加了字体以及要用到的图片。