---
id : state-event
sidebar_position: 6
---

# State和事件处理

## pinia

Pinia 起始于 2019 年 11 月左右的一次实验，其目的是设计一个拥有组合式 API 的 Vue 状态管理库。

[pinia官网地址](https://pinia.vuejs.org/zh/introduction.html)

Pinia安装如下，在命令行中输入

```bash
npm install pinia
```

## 状态

[什么是状态](https://cn.vuejs.org/guide/scaling-up/state-management.html)


## 使用

为了使用`pinia`这个插件，我们需要先挂载它

在```src\main.js```中输入以下代码

```js
import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import { createPinia } from "pinia";

const app = createApp(App);
app.use(createPinia());
app.mount("#app");
```
<!-- TODO:解释何为插件，怎么使用 -->

:::tip

`app.use(createPinia())` 初始化了 Pinia 状态管理系统，使其可在Vue应用中使用。

`app.mount("#app")` 将整个Vue应用挂载到HTML文档中ID为 "app" 的元素上。

这确保了Pinia状态管理系统能够管理Vue应用的状态，并且Vue应用能够正确地在指定的HTML元素上启动。

这是在Vue.js应用中使用插件的方式。在Vue.js中，插件是一种扩展应用功能的方式，可以在应用中全局注册插件以提供额外的特性或功能。，`createPinia` 函数用于创建一个 Pinia 的状态管理实例，并通过 `app.use(createPinia())` 将其注册为Vue.js应用的插件。

使用插件的方式，可以使应用具有额外的功能或能力，而不必在每个组件中重复配置相同的逻辑。

:::

我们需要定义一个全局的状态管理器，用来在整个 Vue.js 应用中使用 

在```/src```文件夹下新建```stores```文件夹,在store文件夹下新建```todoData.js```文件

:::tip
将相关的代码组织到单独的文件夹中，这样可以更容易地查找和管理相关的代码。

todoData.js 文件被放置在 stores 文件夹中，表明它包含与状态管理有关的代码。

Todo.vue 文件被放置在 components 文件夹内，表明它是组件。
:::

![](./img/3_1.png)

在```src\stores\todoData.js```写入代码

```js
import { defineStore } from "pinia";

export const useTodoDataStore = defineStore("todoData", {
  state: () => ({
    todoList: [
      {
        id: 1,
        content: "上海电力大学",
        isDone: false,
      },
      {
        id: 2,
        content: "数理学院",
        isDone: false,
      },
      {
        id: 3,
        content: "现代Web开发",
        isDone: true,
      },
      {
        id: 4,
        content: "Web前端开发",
        isDone: false,
      },
      {
        id: 5,
        content: "待办清单",
        isDone: true,
      },
    ],
  }),
  getters: { allTodos: (state) => state.todoList },
  actions: {},
});

```

这段代码使用 `Pinia`，它是一个 Vue.js 的状态管理库,在这个代码中，通过 `defineStore` 函数创建了一个名为 `useTodoDataStore` 的状态管理仓库。

1. **state:**
   在 Pinia 中，`state` 是用于存储数据的地方。`state` 函数返回一个对象，其中包含一个名为 `todoList` 的数组。这个数组存储了待办事项的信息，每个事项是一个包含 `id`、`content` 和 `isDone` 属性的对象。

   ```javascript
   state: () => ({
     todoList: [
       // ... todo items ...
     ],
   }),
   ```

2. **getters:**
   `getters` 允许你在仓库中计算派生状态或对 `state` 进行一些逻辑操作。在这个例子中，定义了一个名为 `allTodos` 的 getter 函数，它返回当前存储在 `state` 中的所有待办事项。

   ```javascript
   getters: { 
     allTodos: (state) => state.todoList 
   },
   ```

3. **actions:**
   `actions` 是用于处理异步逻辑或对 `state` 进行更改的地方。在这个例子中，`actions` 没有被定义，因此在这个仓库中没有异步操作或对 `state` 的更改逻辑。

   ```javascript
   actions: {},
   ```

这个 `Pinia` 仓库用于管理应用程序中的待办事项数据。`state` 存储数据，`getters` 提供对数据的访问，而 `actions` 可以在需要时执行一些逻辑操作。在应用中，你可以使用 `useTodoDataStore` 来访问或更改待办事项的状态。

有了状态管理后，我们需要改进先前的代码，使用pinia来管理状态。

在```src\App.vue```中写入代码

```vue
<script setup>
import Todo from "./components/Todo.vue";
import { useTodoDataStore } from "./stores/todoData";
const todoData = useTodoDataStore();
const todoList = todoData.allTodos;
</script>

<template>
  <div className="bg-white text-black p-4">
    <ul v-for="todo in todoList">
      <Todo :todo="todo" :keys="todo.id" />
    </ul>
  </div>
</template>
```
此时网页效果没有改变，这说明已经成功使用pinia。


![](./img/2_7.png)

## 增加功能

为了可以方便的做一些UI设计，我们使用组件库。

### Element Plus

[Element Plus官网](https://element-plus.org/zh-CN/guide/installation.html)

```bash
npm install element-plus --save
npm install -D unplugin-vue-components unplugin-auto-import
```
[安装配置](https://element-plus.org/zh-CN/guide/quickstart.html#%E6%8C%89%E9%9C%80%E5%AF%BC%E5%85%A5)


Element Plus 是一个基于 Vue 3 的 UI 组件库，是对原本 Vue 2.x 版本的 Element UI 的升级和重构。Element Plus 提供了一套丰富的、现代化的 UI 组件，可用于构建用户界面。该组件库以易用性和美观为目标，广泛用于 Vue.js 的项目中。

为了使用这个组件库，我们需要对它进行配置。

在`vite.config.js`中写入
```js
import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import vue from "@vitejs/plugin-vue";
export default defineConfig({
  plugins: [
    [vue()],
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
});
```

### 添加Todo

接下来我们要完成"添加功能"，首先现在pinia增加`actions`,这是接下来需要调用的函数。

在``src\stores\todoData.js``中写入代码
```js
import { defineStore } from "pinia";

export const useTodoDataStore = defineStore("todoData", {
  state: () => ({
    todoList: [
      {
        id: 1,
        content: "上海电力大学",
        isDone: false,
      },
      {
        id: 2,
        content: "数理学院",
        isDone: false,
      },
      {
        id: 3,
        content: "现代Web开发",
        isDone: true,
      },
      {
        id: 4,
        content: "Web前端开发",
        isDone: false,
      },
      {
        id: 5,
        content: "待办清单",
        isDone: true,
      },
    ],
  }),
  getters: { allTodos: (state) => state.todoList },
  actions: {
    addTodo(content) {
      const newTodo = {
        id: this.todoList.length + 1,
        content: content,
        isDone: false,
      };
      this.todoList.push(newTodo);
    },
  },
});
```

我们的目标是完成一个输入框，一个确认按钮，当点击时，调用`addTodo`函数，将输入框输入的内容添加到`todoList`这个状态里，然后设置输入框的内容为空，因为`todoList`这个状态更新了，所以网页的内容更新了。

在``src\App.vue``中写入代码
```vue
<script setup>
// 导入 Todo 组件、todoData 数据仓库和 ref 函数
import Todo from "./components/Todo.vue";
import { useTodoDataStore } from "./stores/todoData";
import { ref } from "vue";

// 创建一个 ref 对象，用于存储输入框的值
const input = ref("");

// 获取名为 todoData 的数据仓库实例
const todoData = useTodoDataStore();

// 从 todoData 中获取名为 allTodos 的响应式数据
const todoList = todoData.allTodos;

// 获取名为 addTodo 的 action 函数，用于添加新的 todo
const addTodo = todoData.addTodo;

// 定义一个名为 AddTodo 的函数，用于添加新的 todo
const AddTodo = () => {
  // 调用 addTodo action，将输入框的值作为参数传递
  addTodo(input.value);
  
  // 将输入框的值重置为空
  input.value = "";
};
</script>

<template>
  <div class="bg-white text-black p-4">
    <el-row>
      <el-col :span="6">
        <el-input v-model="input" placeholder="请输入代办事项" />
      </el-col>
      <el-button @click="AddTodo">提交</el-button>
    </el-row>
    <ul v-for="todo in todoList">
      <Todo :todo="todo" :keys="todo.id" />
    </ul>
  </div>
</template>
```
此时效果如下

![](./img/3_2.png)

在输入框输入`mytodo`可以看到

![](./img/3_3.png)

这里的`<el-row>`，`<el-input>`,`<el-button>`,都是Element Plus这个UI组件库的组件。

```html
<el-button @click="AddTodo">提交</el-button>
```

- `@click="AddTodo"`是指当被点击时，触发`AddTodo`函数。

```html
<el-input v-model="input" placeholder="请输入代办事项" />
```
- `v-model="input"` 是 Vue.js 中的语法，用于实现数据的双向绑定。这意味着 `input` 这个变量的值将与输入框的值保持同步，如果用户在输入框中输入内容，`input` 的值也会更新，反之亦然。
  
- `placeholder="请输入代办事项"` 是 `<el-input>` 的一个属性，用于设置输入框的占位提示文本。
