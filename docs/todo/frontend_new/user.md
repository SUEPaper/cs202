---
id : user
sidebar_position: 8
---

# 用户注册，登录与注销。

接下来我们需要增加用户登录与注册的功能，这需要一个新的组件，以及新的`action`，`state`。

## 业务逻辑
我们需要一个`isLoggedIn`的`state`，这是用来判断是否登录的状态。

因为没有连接后端，所以我们使用`localStorage`来存储用户名，密码，todolist。

需要几个新的组件，用于登录/注册。

当我们想注册的时候，需要一个`CreateUser`的`action`,用来创建用户。

当想登陆的时候，需要一个`LogIn`的`action`，用来登录，并将`isLoggedIn`设为True。

同时需要一个`GetTodo`来获取该用户的`todoList`，并存到`state`中。

当未登陆时，如果访问`todos`这个页面，会显示“请先登录”，而非正常的待办事项。

当注销时，`isLoggedIn`设置成false，`todoList`设为空。

### 添加`state`

因为在`localStorage`存数据，所以`src\stores\todoData.js`中的`todoList`可以设置为空。添加`isLoggedIn`,默认为false。

```vue
import { defineStore } from "pinia";
export const useTodoDataStore = defineStore("todoData", {
  state: () => ({
    todoList: [],
    isLoggedIn: false,
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
### Login，Register组件
首先新建文件，`src\components\Login.vue`

```vue
<script setup>
import { ref } from "vue";
const loginUsername = ref("");
const loginPassword = ref("");
</script>

<template>
  <div>
    <el-row>
      <el-col :span="4" :offset="8" class="text-center">用户登录</el-col>
    </el-row>
    <el-row class="my-4">
      <el-col :span="4" :offset="8">
        <el-input v-model="loginUsername" placeholder="输入用户名" />
      </el-col>
    </el-row>
    <el-row class="my-4">
      <el-col :span="4" :offset="8">
        <el-input
          v-model="loginPassword"
          type="password"
          placeholder="输入密码"
          show-password
        />
      </el-col>
    </el-row>
    <el-row class="my-4">
      <el-col :span="4" :offset="8" class="text-center">
        <el-button>登录</el-button></el-col
      >
    </el-row>
  </div>
</template>
```

同样的为注册也完成UI，`src\components\Register.vue`

```vue
<script setup>
import { ref } from "vue";
const registerUsername = ref("");
const registerPassword = ref("");
</script>

<template>
  <div>
    <el-row>
      <el-col :span="4" :offset="8" class="text-center">用户注册</el-col>
    </el-row>
    <el-row class="my-4">
      <el-col :span="4" :offset="8">
        <el-input v-model="registerUsername" placeholder="输入用户名" />
      </el-col>
    </el-row>
    <el-row class="my-4">
      <el-col :span="4" :offset="8">
        <el-input
          v-model="registerPassword"
          type="password"
          placeholder="输入密码"
          show-password
        />
      </el-col>
    </el-row>
    <el-row class="my-4">
      <el-col :span="4" :offset="8" class="text-center">
        <el-button>注册</el-button></el-col
      >
    </el-row>
  </div>
</template>
```

接下来调用这两个组件，新建文件`src\components\LoginRegister.vue`

```vue
<script setup>
import Login from "./LogIn.vue";
import Register from "./Register.vue";
import { ref } from "vue";

const IsRegister = ref(true);
const changeIsRegister = () => {
  IsRegister.value = !IsRegister.value;
};
</script>

<template>
  <div v-if="IsRegister">
    <Login />
    <el-col :span="4" :offset="8" class="text-center">
      <el-button @click="changeIsRegister">没有账号？去注册</el-button></el-col
    >
  </div>

  <div v-else>
    <Register :IsRegister="IsRegister" />
    <el-col :span="4" :offset="8" class="text-center">
      <el-button @click="changeIsRegister">已有账号？去登录</el-button></el-col
    >
  </div>
</template>
```

然后有了登录/注册页面后，添加到路由里，
打开文件`src\router\index.js`，写入

```vue
import { createRouter, createWebHistory } from "vue-router";
import Todos from "../components/Todos.vue";
import Welcome from "../components/Welcome.vue";
import LoginRegister from "../components/LoginRegister.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Welcome,
    },
    {
      path: "/todos",
      name: "todos",
      component: Todos,
    },
    {
      path: "/user",
      name: "user",
      component: LoginRegister,
    },
  ],
});

export default router;
```

打开`src\App.vue`,写入

```vue
<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <el-row class="bg-blue-500">
    <el-col :span="2"><RouterLink to="/">Home</RouterLink></el-col>
    <el-col :span="2"><RouterLink to="/todos">todos</RouterLink></el-col>
    <el-col :span="2"><RouterLink to="/user">登录/注册</RouterLink></el-col>
  </el-row>
  <RouterView />
</template>
```

此时可以看到写的页面，而且可以正常跳转。

### 为`todos`页面增加判断

打开文件`src\components\Todos.vue`

```vue
<script setup>
import Todo from "./Todo.vue";
import { useTodoDataStore } from "../stores/todoData";
import { ref } from "vue";
const input = ref("");
const todoData = useTodoDataStore();

const todoList = todoData.allTodos;
const isLoggedIn = todoData.isLoggedIn;
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
    <div v-if="isLoggedIn">
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
    <div v-else>请先登录</div>
  </div>
</template>
```

此时我们引入了`isLoggedIn`这个状态，并添加`v-if`进行判断。若为真则正常显示，为假则显示`请先登录`。

