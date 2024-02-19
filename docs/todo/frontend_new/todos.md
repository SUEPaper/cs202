---
id : todos
sidebar_position: 5
---

# 完成Todo List剩下功能

## 删除功能

```bash
npm install @element-plus/icons-vue
```

在```src\main.js```中写入
```js
import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import { createPinia } from "pinia";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);
app.use(createPinia());
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount("#app");
```

在``src\stores\todoData.js``中写入
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
    deleteTodo(id) {
      const index = this.todoList.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        this.todoList.splice(index, 1);
      }
    },
  },
});
```
<!-- TODO:解释deleteTodo -->
在``src\App.vue``中写入
```vue
<script setup>
import Todo from "./components/Todo.vue";
import { useTodoDataStore } from "./stores/todoData";
import { ref } from "vue";
const input = ref("");
const todoData = useTodoDataStore();
const todoList = todoData.allTodos;
const addTodo = todoData.addTodo;
const deleteTodo = todoData.deleteTodo;

const AddTodo = () => {
  addTodo(input.value);
  input.value = "";
};

const DeleteTodo = (id) => {
  deleteTodo(id);
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

    <el-row v-for="todo in todoList" class="items-center space-x-3">
      <Todo :todo="todo" :keys="todo.id" />
      <el-icon size="16" class="center">
        <Delete @click="() => DeleteTodo(todo.id)" />
      </el-icon>
    </el-row>
  </div>
</template>
```
![](./img/3_4.png)

点击mytodo的删除图标

![](./img/3_5.png)

## 修改是否完成

在``src\stores\todoData.js``中修改代码

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
    deleteTodo(id) {
      const index = this.todoList.findIndex((todo) => todo.id == id);
      if (index !== -1) {
        this.todoList.splice(index, 1);
      }
    },
    changeIsDone(id) {
      const todo = this.todoList.find((item) => item.id === id);
      if (todo) {
        todo.isDone = !todo.isDone;
      }
    },
  },
});
```

在``src\App.vue``中修改代码

```vue
<script setup>
import Todo from "./components/Todo.vue";
import { useTodoDataStore } from "./stores/todoData";
import { ref } from "vue";
const input = ref("");
const todoData = useTodoDataStore();

const todoList = todoData.allTodos;
const addTodo = todoData.addTodo;
const deleteTodo = todoData.deleteTodo;
const changeIsDone = todoData.changeIsDone;

const AddTodo = () => {
  addTodo(input.value);
  input.value = "";
};

const DeleteTodo = (id) => {
  deleteTodo(id);
};

const ChangeIsDone = (id) => {
  changeIsDone(id);
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

    <el-row v-for="todo in todoList" :key="todo.id" class="items-center space-x-3">
      <div @click="() => ChangeIsDone(todo.id)">
        <Todo :todo="todo" />
      </div>
      <el-icon size="16" class="center">
        <Delete @click="() => DeleteTodo(todo.id)" />
      </el-icon>
    </el-row>
  </div>
</template>
```