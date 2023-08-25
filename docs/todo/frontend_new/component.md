---
id : component
sidebar_position: 2
---

# Hello world 组件


## 你编写的第一个React组件

VS Code 打开 `src/App.jsx` 文件，将其中代码替换成如下内容:

```jsx
function App() {
  return <div>Hello world</div>;
}

export default App;
```

我们看到 App.jsx 里面的代码分为两个部分。
首先定义了一个 React 函数组件，命名为 App，其实就是一个JavaScript的函数，这个函数返回一个`div`的DOM节点元素。

第二部分其实在JavaScript中，export default 是用于将一个模块中的某个成员（通常是一个变量、函数或类）标记为默认导出。
这个默认导出在其他文件中可以被直接引用，而无需使用花括号 {} 来包裹。**更多请仔细学习JavaScript的基础语法**

VS Code 打开 `src/main.jsx` 文件，便可看到如下代码：

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

首先是一系列导包，我们导入了 `react` 包，并命名为 `React`，导入了 `react-dom` 包并命名为 `ReactDOM`。
然后导入我们在`App.js`里面定义的组件，命名为 App，同时也导入CSS样式文件。

`ReactDOM.createRoot(document.getElementById('root'))`:
这一部分使用 `ReactDOM.createRoot` 方法来创建一个根渲染器（root renderer）。
这个方法接受一个 DOM 元素作为参数，表示要将应用程序渲染到哪个 HTML 元素中。
在这里，它选择了具有 `id` 为 `root` 的 DOM 元素作为渲染目标。

`.render()`这部分调用了根渲染器的 render 方法，用于将 React 元素渲染到指定的目标 DOM 元素中。

`<React.StrictMode>`
这是 React 提供的一个组件，用于帮助你发现应用中潜在的问题。
在严格模式下，React 会执行额外的检查，以帮助你捕获一些常见的开发错误。
这个组件通常用来包裹应用的整个渲染树。

`<App />`这是你的应用程序的根组件，也就就是我们在`App.js`里面定义的组件，它会被渲染到目标 DOM 元素中。

VS Code 打开 `index.html`，便可看到如下代码：

```jsx
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

上述是我们整个应用程序的HTML入口文件，其中定义了ID为root的DOM元素，以及引入了`src/main.jsx`文件，
因此我们整个应用程序需要进行coding的部分是从`src/main.jsx`开始的。

## JSX 语法

首先我们来看一下 React 引以为傲的特性之一 -- JSX。
它允许我们在 JS 代码中使用 XML 语法来编写用户界面，使得我们可以充分的利用 JS 的强大特性来操作用户界面。

一个React函数式组件的 return 的内容就为这个组件所将渲染的内容。比如说如下代码：

```jsx
function App() {
  return (
    <div>Hello, World
  	</div>
  );
}
```

这里的 `<div>Hello, World</div>` 是一段 JSX 代码，它最终会被 Babel 转译成下面这段 JS 代码:

```javascript
import { jsx as _jsx } from "react/jsx-runtime";
function App() {
  return /*#__PURE__*/ _jsx("div", {
    children: "Hello world"
  });
}
```

React会将如上代码使用ReactDOM 的 render 方法渲染，最终显示在屏幕上的就是 Hello, World" 内容。

### JSX 变量使用

因为 JSX 最终会被编译成一个 JS 对象，所以我们可以把它当做一个 JS 对象使用，
它享有和一个 JS 对象同等的地位，比如可以将其赋值给一个变量，我们修改上面代码中如下：

```jsx
function App() {
  const element = <div> Hello world </div>
  return element;
}
```

### 在 JSX 中使用变量

我们可以使用大括号 {} 在 JSX 中动态的插入变量值，我们修改上面代码中如下：

```jsx
function App() {
  const content = "World";
  const element = <div>Hello, {content}</div>;
  return element;
}
```

### JSX 中使用 JSX

我们可以在 JSX 中再包含 JSX，这样我们编写任意层次的 HTML 结构：

```jsx
function App() {
const element = <li>Hello, World</li>;
  return (
    <div>
      <ul>
        {element}
      </ul>
    </div>
  );
}
```

### JSX 中添加节点属性

我们可以像在 HTML 中一样，给元素标签加上属性，只不过我们需要遵守[驼峰式命名](https://baike.baidu.com/item/%E9%A9%BC%E5%B3%B0%E5%91%BD%E5%90%8D%E6%B3%95/7560610?fromtitle=%E9%AA%86%E9%A9%BC%E5%91%BD%E5%90%8D%E6%B3%95&fromid=7794053)法则，
比如在 HTML 上的属性 data-index 在 JSX 节点上要写成 dataIndex。

```jsx
const element = <div dataIndex="0">Hello, World</div>;
```

:::caution

在 JSX 中所有的属性都要更换成驼峰式命名，比如 `onclick` 要改成 `onClick`，
唯一比较特殊的就是 `class`，因为在 JS 中 `class` 是保留字，我们要把 `class` 改成 `className` 。

```jsx
const element = <div className="app">Hello, World</div>;
```

:::
