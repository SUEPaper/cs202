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

在大多数启用了构建工具的 Vue 项目中，
我们可以使用一种类似 HTML 格式的文件来书写 Vue 组件，
它被称为单文件组件 (也被称为 `*.vue` 文件，英文 Single-File Components，缩写为 SFC)。
顾名思义，Vue 的单文件组件会将一个组件的逻辑 (JavaScript)，模板 (HTML) 和样式 (CSS) 封装在同一个文件里，
如下所示的案例：

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

让我们回看一下自己写的`components/HelloWorld.vue`这个组件的代码：

```html showLineNumbers title="components/HelloWorld.vue"
<script setup>
import { ref } from 'vue';

const count = ref(0);

const result = ref("?");

function add(x, y) {
  let value = x + y;
  return value;
}

function calculate() {
  let a = 3;
  let b = 4;
  result.value = add(a, b);
  console.log(`${a} + ${b} = ${result.value}`);
}

</script>

<template>
  <h1>你的第一个Vue应用</h1>
  
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <button type="button" @click="calculate">Calculate</button>
  </div>
  <h2>3 + 4 = {{ result }}</h2>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>

```

## 响应状态

在JavaScript部分，我们看到了 `ref`这个函数。
在Vue 3中，`ref` 是一个用于在响应式系统中包装基本类型值（如数字、字符串、布尔值等）的函数。
它能够确保在数据发生变化时，视图能够及时地更新。
`ref` 返回一个响应式且可变的对象，其中包含了一个 `.value` 属性，该属性用于访问被包装的值。

```js showLineNumbers 
import { ref } from 'vue';

const count = ref(0);

const result = ref("?");
```
代码的第一行是从`vue`中导入 `ref` 函数，
第三行和第五行是分别声明了一个数字类型和字符串类型的引用。
然后我们可以用`count.value`和 `result.value`来访问它所包装的值。

```html showLineNumbers 
  <button type="button" @click="count++">count is {{ count }}</button>
```
在 `vue` 中 ` {{ count }}` 的写法属于数据绑定形式的文本插值，
意思是在javascript代码中有 count 这个变量的值，
双大括号标签会被替换为相应组件实例HTML模版中 count 属性的值。
同时每次 count 属性更改时它也会同步更新。

请将`components/HelloWorld.vue`代码更新成如下代码，并且观察浏览器的效果：

```html showLineNumbers title="components/HelloWorld.vue"
<script setup>
import { ref } from 'vue';

const count = ref(0);

const result = ref("?");

const msg = "Hello Vue!";

function add(x, y) {
  let value = x + y;
  return value;
}

function calculate() {
  let a = 3;
  let b = 4;
  result.value = add(a, b);
  console.log(`${a} + ${b} = ${result.value}`);
}

</script>

<template>
  <h1>{{ msg }}</h1>
  
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <button type="button" @click="calculate">Calculate</button>
  </div>
  <h2>3 + 4 = {{ result }}</h2>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>

```

前面提到对于我们可以通过 `count.value`访问ref的值，
实际上在`vue`模板中访问的 `count` 响应状态`ref` 时不需要使用 `.value`：
它会被自动解包，让使用更简单。

## 监听事件

`@click="count++"` 和 `@click="calculate"`代码是Vue中用来监听DOM事件的，
并在事件触发时执行对应的JavaScript代码。

事件处理的用法：`v-on:click="handler"` 或 `@click="handler"。`

事件处理器 (handler) 的值可以是：

- 内联事件处理器：事件被触发时执行的内联 JavaScript 语句。

- 方法事件处理器：一个指向组件上定义的方法的属性名或是路径。

### 内联事件处理器

内联事件处理器通常用于简单场景，例如：

```html showLineNumbers
<script setup>
import { ref } from 'vue';
const count = ref(0);
</script>

<template>  
  <div class="card">
    <button @click="count++">Add 1</button>
    <p>Count is: {{ count }}</p>
  </div>
</template>

<style scoped>
</style>
```

### 方法事件处理器

随着事件处理器的逻辑变得愈发复杂，
内联代码方式变得不够灵活。
因此 `v-on` 也可以接受一个方法名或对某个方法的调用。

```html showLineNumbers
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>  
  <div class="card">
    <button @click="increment">Add 1</button>
    <p>Count is: {{ count }}</p>
  </div>
</template>

<style scoped>
</style>
```

## 如何在其他组件中使用已经定义好的组件

组件使用其实很简单，
只需要在HTML模版中使用`<MyTemplate />`或者`<MyTemplate></MyTemplate>`即可。
案例如下

```html showLineNumbers title="App.vue"
<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <HelloWorld />
</template>

<style scoped>
</style>
```
第二行代码是导入 `HelloWorld.vue` 这个组件，第六行代码便是使用这个组件。

因此对于如下的组件树：

![](./img/vue-4-2.jpg)

我们在根组件中的代码通常呈现是：

```html showLineNumbers
<script setup>
import app-header from './components/app-header.vue'
...
</script>

<template>
<div id="root">
  <app-header>
    <header-search></header-search>
    <header-nav></header-nav>
    <header-aside></header-aside>
  </app-header>
  <app-view>
    <group-info></group-info>
    <app-tab></app-tab>
    <app-tab-container>
      <project-card></project-card>
      <card-list></card-list>
    </app-tab-container>
  </app-view>
</div>
</template>

<style scoped>
</style>
```

## 项目中其他部分的介绍

我们在 VS Code 中可以看到我们整个Vue的应用的文件树主要包含如下内容：

```bash
./
├── README.md
├── index.html
├── node_modules
│   ├── @vitejs
│   ├── vite -> .pnpm/vite@5.2.6/node_modules/vite
│   └── vue -> .pnpm/vue@3.4.21/node_modules/vue
├── package.json
├── public
│   └── vite.svg
├── src
│   ├── App.vue
│   ├── assets
│   │   └── vue.svg
│   ├── components
│   │   └── HelloWorld.vue
│   ├── main.js
│   └── style.css
└── vite.config.js
```

对于整个Vue项目中，最重要的文件是`package.json`、`index.html`、`src`整个文件夹下的文件。
`node_modules`中存放整个项目所依赖的JavaScript的库。

请用 VS Code 打开 `package.json`：

```js showLineNumbers title="package.json"
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.4.21"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.4",
    "vite": "^5.2.0"
  }
}
```

任何一个 Node.js 项目中都包含 `package.json` 文件，它包含了项目的名称、依赖、脚本等信息。
让我们逐个解释其中的字段和属性：

1. `"name": "frontend"`：项目的名称，这个字段指定了项目在 npm 仓库中的唯一标识符。

2. `"private": true`：这个字段指示该项目是私有的，即不能发布到 npm 仓库。这是一个安全措施，防止意外发布敏感信息或未完整的代码。

3. `"version": "0.0.0"`：项目的版本号。在这个例子中，版本号被设置为初始值 "0.0.0"。

4. `"type": "module"`：指定了项目使用 ECMAScript 模块化。这是因为在 Node.js 中，原生支持 CommonJS 模块化，但是通过设置 "type": "module"，项目可以使用 ECMAScript 模块化来导入和导出模块。

5. `"scripts"`：这个字段包含了一系列可以通过 npm 运行的脚本命令。

  - `"dev": "vite"`：启动开发服务器，用于开发环境。
  - `"build": "vite build"`：用于构建生产环境的项目代码。
  - `"preview": "vite preview"`：启动一个本地服务器来预览生产环境的项目。

6. `"dependencies"`：这个字段包含了项目运行时依赖的模块。在这个例子中，项目依赖于 Vue.js 的版本为 "^3.4.21"。

7. `"devDependencies"`：这个字段包含了开发时依赖的模块。在这个例子中，项目依赖于 Vite 相关的插件和工具，包括 @vitejs/plugin-vue 和 vite 本身。

VS Code 打开 `src/App.vue` 文件，将其中代码替换成如下内容:

```jsx
<template>
  <div class="text-red-700  bg-blue-500">
    hello world
  </div>
</template>
```



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
