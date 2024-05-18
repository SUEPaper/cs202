---
id : frontend-user
sidebar_position: 62
---

# Web前端：用户注册，登录与注销。

:::tip

本课程网站内容请仔细阅读后再进行实操。因未仔细阅读内容，出现任何错误后果自负（逃～～～逃～～～逃

**所有的代码请不要复制粘贴，请手敲每一行代码。复制粘贴不会让你动脑子，而手敲每一个行代码会让你自然而然地去动脑子会想每一行代码的含义和原理**
:::

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
首先新建文件，`src\components\LogIn.vue`

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

### 增加`action`

当有了注册，登陆页面后，我们需要增加对应的action。

在`src\stores\todoData.js`写入

```js
import { defineStore } from "pinia";
export const useTodoDataStore = defineStore("todoData", {
  state: () => ({
    todoList: [],
    isLoggedIn: false,
    userName: "",
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

      let storedUsersData = localStorage.getItem("usersData");

      // 如果 localStorage 中不存在 usersData，创建一个新的空对象
      if (!storedUsersData) {
        storedUsersData = "{}";
      }

      const parsedUsersData = JSON.parse(storedUsersData);

      // 更新用户的 todoList
      parsedUsersData[this.userName].todoList.push(newTodo);

      // 更新 localStorage 中的用户数据
      localStorage.setItem("usersData", JSON.stringify(parsedUsersData));
    },
    deleteTodo(id) {
      const index = this.todoList.findIndex((todo) => todo.id == id);
      if (index !== -1) {
        // 删除 Vuex state 中的项
        this.todoList.splice(index, 1);

        // 更新 localStorage 中的用户数据
        const storedUsersData = localStorage.getItem("usersData");
        if (storedUsersData) {
          const parsedUsersData = JSON.parse(storedUsersData);

          // 检查当前用户是否存在
          if (parsedUsersData[this.userName]) {
            // 找到对应的 todo 在 localStorage 中的索引
            const todoIndex = parsedUsersData[this.userName].todoList.findIndex(
              (todo) => todo.id == id
            );

            // 如果找到，删除对应的 todo
            if (todoIndex !== -1) {
              parsedUsersData[this.userName].todoList.splice(todoIndex, 1);

              // 更新 localStorage 中的用户数据
              localStorage.setItem(
                "usersData",
                JSON.stringify(parsedUsersData)
              );
            }
          }
        }
      }
    },
    changeIsDone(id) {
      const todo = this.todoList.find((item) => item.id === id);
      if (todo) {
        // 更改 Vuex state 中的 isDone 状态
        todo.isDone = !todo.isDone;

        // 更新 localStorage 中的用户数据
        const storedUsersData = localStorage.getItem("usersData");
        if (storedUsersData) {
          const parsedUsersData = JSON.parse(storedUsersData);

          // 检查当前用户是否存在
          if (parsedUsersData[this.userName]) {
            // 找到对应的 todo 在 localStorage 中的索引
            const todoIndex = parsedUsersData[this.userName].todoList.findIndex(
              (todo) => todo.id == id
            );

            // 如果找到，更新对应的 todo 的 isDone 状态
            if (todoIndex !== -1) {
              parsedUsersData[this.userName].todoList[todoIndex].isDone =
                todo.isDone;

              // 更新 localStorage 中的用户数据
              localStorage.setItem(
                "usersData",
                JSON.stringify(parsedUsersData)
              );
            }
          }
        }
      }
    },
    createUser({ username, password }) {
      let storedUsersData = localStorage.getItem("usersData");

      // 如果 localStorage 中不存在 usersData，创建一个新的空对象
      if (!storedUsersData) {
        storedUsersData = "{}";
      }

      const parsedUsersData = JSON.parse(storedUsersData);

      if (!parsedUsersData[username]) {
        const newUser = {
          username: username,
          password: password,
          todoList: [],
        };

        // 将新用户添加到已有用户数据中
        parsedUsersData[username] = newUser;

        // 更新 localStorage 中的用户数据
        localStorage.setItem("usersData", JSON.stringify(parsedUsersData));

        return true; // 表示用户创建成功
      } else {
        // 表示用户名已存在，用户创建失败
        return false;
      }
    },
    login({ username, password }) {
      let storedUsersData = localStorage.getItem("usersData");

      // 如果 localStorage 中不存在 usersData，表示没有用户数据，登录失败
      if (!storedUsersData) {
        return false;
      }

      const parsedUsersData = JSON.parse(storedUsersData);

      // 检查用户名是否存在
      if (!parsedUsersData[username]) {
        return false;
      }

      // 检查密码是否匹配
      if (parsedUsersData[username].password !== password) {
        return false;
      }

      // 登录成功，更新 Vuex state 中的用户信息
      this.isLoggedIn = true;
      this.userName = username;
      this.todoList = parsedUsersData[username].todoList;

      return true;
    },
  },
});
```

新增了两个`action`,分别是`createUser`,`login`，修改了三个个`action`,分别是`addTodo`,`deleteTodo`,`changeIsDone`

其中修改的三个action都是增加了修改`localStorage`的功能。

:::tip
`localStorage` 是浏览器提供的一种用于存储数据的机制。它是 Web Storage API 的一部分，允许你在浏览器中存储键值对。
这些数据存储在客户端，不同于会话期间的内存存储，因此即使用户关闭浏览器窗口或者重新打开页面，存储的数据仍然保留。

使用 `localStorage` 的基本方法是通过 `setItem` 存储数据和通过 `getItem` 获取数据。这些数据以字符串形式存储，
所以如果你想存储对象，需要使用 `JSON.stringify` 进行转换，而在获取时使用 `JSON.parse` 进行解析。

以下是一个简单的例子：

```javascript
// 存储数据
localStorage.setItem("username", "john_doe");

// 获取数据
const username = localStorage.getItem("username");
console.log(username);  // 输出: john_doe
```

注意，存储在 `localStorage` 中的数据在同源策略下是可见的，这意味着数据只能被存储和检索到相同协议、主机名和端口的页面中。因此，不同页面之间不能直接共享 `localStorage`。
这两行代码用于从 `localStorage` 中获取名为 "usersData" 的数据，并将其解析为 JavaScript 对象。

:::
其中，

1. `localStorage.getItem("usersData")`: 这一行获取名为 "usersData" 的数据项。`localStorage` 存储的数据是字符串形式的键值对，这一行代码获取了 "usersData" 对应的字符串。

2. `JSON.parse(storedUsersData)`: 这一行将获取到的字符串解析为 JavaScript 对象。因为在 `localStorage` 中存储的是字符串，如果你想在 JavaScript 中使用这些数据，就需要使用 `JSON.parse` 来将其转换为对象。

### 完成逻辑

打开`src\components\Login.vue`,写入

```vue
<script setup>
import { ref } from "vue";
import { useTodoDataStore } from "../stores/todoData";
import { useRouter } from "vue-router";
const loginUsername = ref("");
const loginPassword = ref("");
const router = useRouter();
const todoData = useTodoDataStore();
const login = todoData.login;

const loginIn = () => {
  // 调用登录方法，传入用户名和密码
  const isLoggedIn = login({
    username: loginUsername.value,
    password: loginPassword.value,
  });

  if (isLoggedIn) {
    // 登录成功
    alert("登录成功");

    router.push({ name: "todos" });
  } else {
    // 登录失败
    alert("登录失败");
  }
};
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
        <el-button @click="loginIn">登录</el-button></el-col
      >
    </el-row>
  </div>
</template>
```

当点击"登录"按钮后，触发`loginIn`函数，然后调用`login`这个action函数，如果返回的为真，则显示登录成功，并跳转到`/todos`,若为假，则显示登录失败。

打开`src\components\Register.vue`,写入

```vue
<script setup>
import { ref } from "vue";
import { useTodoDataStore } from "../stores/todoData";
const registerUsername = ref("");
const registerPassword = ref("");
const todoData = useTodoDataStore();
const createUser = todoData.createUser;
const CreateUser = () => {
  if (
    createUser({ username: registerUsername.value, password: registerPassword.value })
  ) {
    registerPassword.value = "";
    registerUsername.value = "";
    alert("注册成功");
  } else {
    alert("注册失败");
  }
};
</script>

<template>
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
      <el-button @click="CreateUser">注册</el-button></el-col
    >
  </el-row>
</template>
```

当点击"注册"按钮后，触发`CreateUser`函数，然后调用`createUser`这个action函数，如果返回的为真，则显示注册成功，并清除账号密码,若为假，则显示注册失败。

### 注销功能

与之前一样，首先完成一个注销的UI。

新建文件`src\components\LogOut.vue`,写入

```vue
<template>
  <button @click="LogOut">注销</button>
</template>
```

然后放在导航栏中，打开文件`src\App.vue`,写入
```vue
<script setup>
import { RouterLink, RouterView } from "vue-router";
import LogOut from "./components/LogOut.vue";
</script>

<template>
  <el-row class="bg-blue-500">
    <el-col :span="2" :offset="1"><RouterLink to="/">Home</RouterLink></el-col>
    <el-col :span="2"><RouterLink to="/todos">todos</RouterLink></el-col>
    <el-col :span="2" :offset="14"><RouterLink to="/user">登录/注册</RouterLink></el-col>
    <el-col :span="2"><LogOut /></el-col>
  </el-row>
  <RouterView />
</template>
```

接下来添加对应的逻辑，当注销后，若`isLoggedIn`为假，及未登录，并显示"请先登录"，若为真，则显示"注销成功"。

打开`src\stores\todoData.js`,写入

```js
import { defineStore } from "pinia";
import { ref } from "vue";
export const useTodoDataStore = defineStore("todoData", {
  state: () => ({
    todoList: [],
    isLoggedIn: false,
    userName: "",
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

      let storedUsersData = localStorage.getItem("usersData");

      // 如果 localStorage 中不存在 usersData，创建一个新的空对象
      if (!storedUsersData) {
        storedUsersData = "{}";
      }

      const parsedUsersData = JSON.parse(storedUsersData);

      // 更新用户的 todoList
      parsedUsersData[this.userName].todoList.push(newTodo);

      // 更新 localStorage 中的用户数据
      localStorage.setItem("usersData", JSON.stringify(parsedUsersData));
    },
    deleteTodo(id) {
      const index = this.todoList.findIndex((todo) => todo.id == id);
      if (index !== -1) {
        // 删除 Vuex state 中的项
        this.todoList.splice(index, 1);

        // 更新 localStorage 中的用户数据
        const storedUsersData = localStorage.getItem("usersData");
        if (storedUsersData) {
          const parsedUsersData = JSON.parse(storedUsersData);

          // 检查当前用户是否存在
          if (parsedUsersData[this.userName]) {
            // 找到对应的 todo 在 localStorage 中的索引
            const todoIndex = parsedUsersData[this.userName].todoList.findIndex(
              (todo) => todo.id == id
            );

            // 如果找到，删除对应的 todo
            if (todoIndex !== -1) {
              parsedUsersData[this.userName].todoList.splice(todoIndex, 1);

              // 更新 localStorage 中的用户数据
              localStorage.setItem(
                "usersData",
                JSON.stringify(parsedUsersData)
              );
            }
          }
        }
      }
    },
    changeIsDone(id) {
      const todo = this.todoList.find((item) => item.id === id);
      if (todo) {
        // 更改 Vuex state 中的 isDone 状态
        todo.isDone = !todo.isDone;

        // 更新 localStorage 中的用户数据
        const storedUsersData = localStorage.getItem("usersData");
        if (storedUsersData) {
          const parsedUsersData = JSON.parse(storedUsersData);

          // 检查当前用户是否存在
          if (parsedUsersData[this.userName]) {
            // 找到对应的 todo 在 localStorage 中的索引
            const todoIndex = parsedUsersData[this.userName].todoList.findIndex(
              (todo) => todo.id == id
            );

            // 如果找到，更新对应的 todo 的 isDone 状态
            if (todoIndex !== -1) {
              parsedUsersData[this.userName].todoList[todoIndex].isDone =
                todo.isDone;

              // 更新 localStorage 中的用户数据
              localStorage.setItem(
                "usersData",
                JSON.stringify(parsedUsersData)
              );
            }
          }
        }
      }
    },
    createUser({ username, password }) {
      let storedUsersData = localStorage.getItem("usersData");

      // 如果 localStorage 中不存在 usersData，创建一个新的空对象
      if (!storedUsersData) {
        storedUsersData = "{}";
      }

      const parsedUsersData = JSON.parse(storedUsersData);

      if (!parsedUsersData[username]) {
        const newUser = {
          username: username,
          password: password,
          todoList: [],
        };

        // 将新用户添加到已有用户数据中
        parsedUsersData[username] = newUser;

        // 更新 localStorage 中的用户数据
        localStorage.setItem("usersData", JSON.stringify(parsedUsersData));

        return true; // 表示用户创建成功
      } else {
        // 表示用户名已存在，用户创建失败
        return false;
      }
    },
    login({ username, password }) {
      let storedUsersData = localStorage.getItem("usersData");

      // 如果 localStorage 中不存在 usersData，表示没有用户数据，登录失败
      if (!storedUsersData) {
        return false;
      }

      const parsedUsersData = JSON.parse(storedUsersData);

      // 检查用户名是否存在
      if (!parsedUsersData[username]) {
        return false;
      }

      // 检查密码是否匹配
      if (parsedUsersData[username].password !== password) {
        return false;
      }

      // 登录成功，更新 Vuex state 中的用户信息
      this.isLoggedIn = true;
      this.userName = username;
      this.todoList = parsedUsersData[username].todoList;

      return true;
    },
    logOut() {
      if (this.isLoggedIn == false) alert("请先登录");
      else {
        this.isLoggedIn = false;
        alert("注销成功");
      }
    },
  },
});
```

然后调用`logOut`这个`action`,打开`src\components\LogOut.vue`，写入

```vue
<script setup>
import { useTodoDataStore } from "../stores/todoData";
import { useRouter } from "vue-router";
const todoData = useTodoDataStore();
const logOut = todoData.logOut;
const router = useRouter();

const LogOut = () => {
  logOut();
  router.push({ name: "user" });
};
</script>
<template>
  <button @click="LogOut">注销</button>
</template>
```

当点击注销按钮后，跳转到`/user`页面。