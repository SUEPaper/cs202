---
id : component
sidebar_position: 2
---

# 程序代码解析

:::tip

本课程网站内容请仔细阅读后再进行实操。因未仔细阅读内容，出现任何错误后果自负（逃～～～逃～～～逃

**所有的代码请不要复制粘贴，请手敲每一行代码。复制粘贴不会让你动脑子，而手敲每一个行代码会让你自然而然地去动脑子会想每一行代码的含义和原理**
:::

一个 Vue 应用由根组件以及组件树（可复用的 Vue 组件）组成，简单来说，
组件可以扩展 HTML 元素，封装可重用的代码。
几乎任意类型的应用界面都可以抽象为一个组件树，
例如 Github 上 Vue 主页，我们能看到页面能划分成一块块的内容块，其中有些也可以看作组件：

![](./img/vue-4-1.png)

一般来说，这样的一个管理页面，我们可以抽象成这样的组件树：

![](./img/vue-4-2.jpg)

为什么要对一个Vue应用的Web页面进行组件的划分，而不是像HTML代码那样写在一整个代码文件中呢？
这是因为采用分而治之的思想能够更好地应对大型、复杂的应用开发挑战。
在单个代码文件中编写整个应用的HTML、CSS和JavaScript代码会导致文件庞大、结构混乱，
不利于维护和拓展。

通过将应用拆分为小型、独立且可复用的组件，我们能够：

- 降低开发难度： 组件化开发使得每个组件只关注于特定的功能或界面部分，简化了开发过程，降低了复杂度，使开发者能够更专注于每个组件的实现细节。

- 提高可维护性： 拥有小而清晰的组件可以使代码更易于理解和维护。每个组件都有自己的作用域和职责，当需要修改或优化功能时，只需针对特定的组件进行操作，而不会影响到其他部分。

- 增加代码的可复用性： 组件可以被多次使用在不同的地方，甚至在不同的项目中。这种重复利用可以节省开发时间，并确保应用中的功能保持一致性。

- 提升团队协作效率： 组件化开发使得团队成员可以并行开发不同的组件，减少了彼此之间的依赖，提高了团队的协作效率。

## 单个组件文件

前面讲到，一个组件是一些逻辑和功能完整的代码片段组成的，
同时也包括了 HTML、CSS 和 Javascript 的代码。
在 Vue 里，我们常常使用单文件组件，使用 `.vue` 后缀命名的文件，一般也包括这三部分：

```html showLineNumbers 
<script setup>
  // 组件逻辑，放置JS代码部分
</script>

<template>
  <!-- 组件模板， 放置HTML模板代码部分 -->
</template>

<style scoped>
  /* 组件样式， 放置CSS样式代码部分 */
</style>

```


## 你编写的第一个Vue组件

VS Code 打开 `src/App.vue` 文件，将其中代码替换成如下内容:

```jsx
<template>
  <div class="text-red-700  bg-blue-500">
    hello world
  </div>
</template>
```

在项目root路径下运行如下命令（*如果之前已经运行那么杀掉该进程并运行该命令*）：

```bash
npm run dev
```
浏览器中的效果应该是这样的：

![](./img/2_4.png)


:::tip

请一直打开`npm run dev`，不要关闭。这样修改代码后，浏览器中的内容将会自动刷新！

:::

`<template> `是 Vue.js 中的模板标签，用于定义组件的模板结构。

**更多请仔细学习JavaScript的基础语法**

VS Code 打开 `src/main.js` 文件，便可看到如下代码：

```jsx
import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
createApp(App).mount("#app");

```


VS Code 打开 `index.html`，便可看到如下代码：

```jsx
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + Vue</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

上述是我们整个应用程序的HTML入口文件，其中定义了ID为root的DOM元素，以及引入了`src/main.js`文件，
因此我们整个应用程序需要进行coding的部分是从`src/main.js`开始的。
