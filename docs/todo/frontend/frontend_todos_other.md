---
id : frontend-todos-other
sidebar_position: 11
---

# 完成Todo剩下的删除和修改

## 删除功能

在`src\stores\todoData.js`中，修改代码如下：

```js showLineNumbers title="src\stores\todoData.js"
import { defineStore } from "pinia";
import axios from 'axios';

import { FASTAPI_BASE_URL } from "../constant";

export const useTodoDataStore = defineStore("todoData", {
  state: () => ({
    todos: []
  }),
  getters: { allTodos: (state) => state.todos },
  actions: {
    async fetchTodos() {
      try {
        const response = await axios.get(`${FASTAPI_BASE_URL}/api/todos`);
        this.todos = response.data;
        console.log(this.todos);
      } catch (error) {
        console.error(error);
      }
    },
    async addTodo(content) {
      const newTodo = { content, is_done: false };
      try {
        const response = await axios.post(`${FASTAPI_BASE_URL}/api/todos`, newTodo);
        this.todos.push(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteTodo(id) {
      try {
        const response = await axios.delete(`${FASTAPI_BASE_URL}/api/todos/${id}`);
        this.todos.filter(todo => todo.id !== id);
      } catch (error) {
        console.error(error);
      }
    },
  }
});
```

我们可以将 `src/components/TodoItem.vue` 的代码更改成如下:

```html showLineNumbers title="src/components/TodoItem.vue"
<script setup>
import { toRefs } from "vue";
import { useTodoDataStore } from "../stores/todoData";
const todoData = useTodoDataStore();
import XMark from "./icons/XMark.vue";
const props = defineProps({
  todo: { id: Number, content: String, is_done: Boolean },
});

const { id, content, is_done } = toRefs(props.todo);

const deleteTodo = (id) => {
  todoData.deleteTodo(id);
}
</script>
<template>
  <article class="flex gap-4 border-b border-gray-200 p-4">
    <button
      class="h-5 w-5 rounded-full border-2 transition-all duration-700"
    ></button>
    <p :class=" is_done? 
    'flex-auto text-gray-300 line-through transition-all duration-700 ' :
    'flex-auto text-gray-500 transition-all duration-700'
    " >
      {{ content }}
    </p>
    <button @click="() => deleteTodo(id)">
      <XMark />
    </button>
  </article>
</template>
```


## 修改功能

在`src\stores\todoData.js`中，修改代码如下：

```js showLineNumbers title="src\stores\todoData.js"
import { defineStore } from "pinia";
import axios from 'axios';

import { FASTAPI_BASE_URL } from "../constant";

export const useTodoDataStore = defineStore("todoData", {
  state: () => ({
    todos: []
  }),
  getters: { allTodos: (state) => state.todos },
  actions: {
    async fetchTodos() {
      try {
        const response = await axios.get(`${FASTAPI_BASE_URL}/api/todos`);
        this.todos = response.data;
        console.log(this.todos);
      } catch (error) {
        console.error(error);
      }
    },
    async addTodo(content) {
      const newTodo = { content, is_done: false };
      try {
        const response = await axios.post(`${FASTAPI_BASE_URL}/api/todos`, newTodo);
        this.todos.push(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async deleteTodo(id) {
      try {
        const response = await axios.delete(`${FASTAPI_BASE_URL}/api/todos/${id}`);
        this.todos.filter(todo => todo.id !== id);
      } catch (error) {
        console.error(error);
      }
    },
    async changeIsDone(id) {
      const todo = this.todos.find(todo => todo.id === id);
      todo.is_done = !todo.is_done;
      try {
        const response = await axios.put(`${FASTAPI_BASE_URL}/api/todos/${id}`, todo);
      } catch (error) {
        console.error(error);
      }

      this.todos = this.todos.map(todo => {
        if (todo.id === idToModify) {
          return { ...todo, is_done: newIsDoneStatus };
        }
        return todo;
      });
    }
  }
});
```

我们可以将 `src/components/TodoItem.vue` 的代码更改成如下:

```html showLineNumbers title="src/components/TodoItem.vue"
<script setup>
import { toRefs } from "vue";
import { useTodoDataStore } from "../stores/todoData";
const todoData = useTodoDataStore();
import XMark from "./icons/XMark.vue";
const props = defineProps({
  todo: { id: Number, content: String, is_done: Boolean },
});

const { id, content, is_done } = toRefs(props.todo);

const deleteTodo = (id) => {
  todoData.deleteTodo(id);
}

const changeIsDone = (id) => {
  todoData.changeIsDone(id);
}
</script>
<template>
  <article class="flex gap-4 border-b border-gray-200 p-4">
    <button
      @click="() => changeIsDone(id)"
      class="h-5 w-5 rounded-full border-2 transition-all duration-700"
    ></button>
    <p :class=" is_done? 
    'flex-auto text-gray-300 line-through transition-all duration-700 ' :
    'flex-auto text-gray-500 transition-all duration-700'
    " >
      {{ content }}
    </p>
    <button @click="() => deleteTodo(id)">
      <XMark />
    </button>
  </article>
</template>
```