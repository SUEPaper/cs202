---
id : frontend-user
sidebar_position: 62
---

# Web前端：用户注册，登录与注销。

:::tip

本课程网站内容请仔细阅读后再进行实操。因未仔细阅读内容，出现任何错误后果自负（逃～～～逃～～～逃

**所有的代码请不要复制粘贴，请手敲每一行代码。复制粘贴不会让你动脑子，而手敲每一个行代码会让你自然而然地去动脑子会想每一行代码的含义和原理**
:::

首先我们先完成用户注册的功能。

## 注册

因为我们需要管理用户方面的状态，所以新建`src\stores\auth.js`

在`src\stores\auth.js`中，新增`register`方法:

```html showLineNumbers title="src\stores\auth.js"
import { defineStore } from "pinia";
import axios from "axios";

import { FASTAPI_BASE_URL } from "../constant";

export const authStore = defineStore("auth", {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),
    actions: {
          async register(name, email, password) {
      try {
        const response = await axios.post(
          `${FASTAPI_BASE_URL}/users`,
          {
            name: name,
            email: email,
            password: password,
          },
          {
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        return true;
      } catch (error) {
        throw new Error("注册失败，请检查输入信息");
      }
    },
  },
});
```

为`src\views\SignupView.vue`添加注册功能:

```vue showLineNumbers title="src\views\SignupView.vue"
<script setup>
import { RouterLink } from "vue-router";
import { ref } from "vue";
import { authStore } from "../stores/auth";
import { useRouter } from "vue-router";

const name = ref("");
const email = ref("");
const password = ref("");
const passwordConfirmation = ref("");
const useAuthStore = authStore();
const router = useRouter();

const handleRegister = async () => {
  if (password.value !== passwordConfirmation.value) {
    alert("两次输入的密码不一致，请重新输入");
    return;
  }
  const success = await useAuthStore.register(name.value, email.value, password.value);
  if (success) {
    alert("注册成功，请登录");
    router.push({ path: "/login" });
  }
};
</script>

<template>
  <section class="bg-white">
    <div class="grid min-h-screen grid-cols-12">
      <aside
        class="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6"
      >
        <img
          alt=""
          src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          class="absolute inset-0 h-full w-full object-cover"
        />
      </aside>

      <main
        class="flex items-center justify-center px-8 py-8 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
      >
        <div class="max-w-xl lg:max-w-3xl">
          <a class="block text-blue-600" href="#">
            <span class="sr-only">Home</span>
            <svg
              class="h-8 sm:h-10"
              viewBox="0 0 28 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                fill="currentColor"
              />
            </svg>
          </a>

          <h1 class="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
            欢迎来到Todo Application
          </h1>

          <p class="mt-4 leading-relaxed text-gray-500">账号注册</p>

          <div @submit.prevent="handleRegister" class="mt-8 grid grid-cols-6 gap-6">
            <div class="col-span-6 sm:col-span-3">
              <label for="FirstName" class="block text-sm font-medium text-gray-700">
                Name
              </label>

              <input
                type="text"
                id="FirstName"
                name="first_name"
                v-model="name"
                class="mt-1 w-full h-10 rounded-md border-2 border-gray-400 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>

            <div class="col-span-6">
              <label for="Email" class="block text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                id="Email"
                name="email"
                v-model="email"
                class="mt-1 w-full h-10 rounded-md border-2 border-gray-400 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>

            <div class="col-span-6 sm:col-span-3">
              <label for="Password" class="block text-sm font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                id="Password"
                name="password"
                v-model="password"
                class="mt-1 w-full h-10 rounded-md border-2 border-gray-400 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>

            <div class="col-span-6 sm:col-span-3">
              <label
                for="PasswordConfirmation"
                class="block text-sm font-medium text-gray-700"
              >
                Password Confirmation
              </label>

              <input
                type="password"
                id="PasswordConfirmation"
                name="password_confirmation"
                v-model="passwordConfirmation"
                class="mt-1 w-full h-10 rounded-md border-2 border-gray-400 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>

            <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
              <button
                class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                @click="handleRegister"
              >
                新建一个账号
              </button>

              <p class="mt-4 text-sm text-gray-500 sm:mt-0">
                已经有账号了?
                <RouterLink to="/login" class="text-gray-700 underline">登录</RouterLink>.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </section>
</template>
<style scoped></style>

```

通过在`<input>`元素上添加`@input`事件监听器，我们可以在输入框的值发生变化时立即执行相应的操作。在这个例子中，我们使用了`v-model`指令来将输入框的值绑定到组件的数据属性`name`、`email`、`password`和`passwordConfirmation`上。

然后给`<button>`元素添加了一个`@click`事件监听器，当用户点击按钮时，会执行`handleRegister`函数。在`handleRegister`函数中，我们首先检查两个密码是否一致，如果不一致则弹出一个警告框提示用户。如果密码一致，则调用`authStore`的`register`方法来执行注册操作。

## 登录

在`src\stores\auth.js`中，新增`login`方法:

```html showLineNumbers title="src\stores\auth.js"
import { defineStore } from "pinia";
import axios from "axios";

import { FASTAPI_BASE_URL } from "../constant";

export const authStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthenticated: !!localStorage.getItem("access_token"),
  }),
  actions: {
    async login(email, password) {
      try {
        // 实现登录逻辑
        const formData = new URLSearchParams();
        formData.append("username", email);
        formData.append("password", password);
        formData.append("grant_type", "password");
        formData.append("client_id", "string");
        formData.append("client_secret", "string");

        const response = await axios.post(
          `${FASTAPI_BASE_URL}/login/access_token`,
          formData,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              accept: "application/json",
            },
          }
        );

        // 修复用户对象存储格式
        this.user = { email }; // 改为对象格式
        this.isAuthenticated = true;
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("user", JSON.stringify({ email })); // 保持对象格式
        return true;
      } catch (error) {
        this.logout();
        throw new Error("登录失败，请检查邮箱和密码");
      }
    },
    async register(name, email, password) {
      try {
        const response = await axios.post(
          `${FASTAPI_BASE_URL}/users`,
          {
            name: name,
            email: email,
            password: password,
          },
          {
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        return true;
      } catch (error) {
        throw new Error("注册失败，请检查输入信息");
      }
    },
  },
});
```

新增了login函数，根据后端的api形式，新增了formData，然后调用axios.post发送请求，若没有返回错误，则将状态中的user设置为邮箱，并将isAuthenticated设置为true，表示已经登录，同时将用户信息和token存储到localStorage中，若失败则抛出错误。

为了实现持久化登录，我们需要在登录成功后将用户信息和token存储到localStorage中，以便在页面刷新后仍然保持登录状态。我们可以使用Vue的`localStorage`来实现这个功能。在初始化时，我们可以从`localStorage`中获取用户信息和token，并将其赋值给组件的状态。这样，当页面刷新后，组件的状态就会恢复到之前的状态。

接下来更新`src\views\LoginView.vue`:

```vue showLineNumbers title="src\views\LoginView.vue"
<script setup>
import { RouterLink } from "vue-router";
import { ref } from "vue";
import { authStore } from "../stores/auth";
import { useRouter } from "vue-router"; // 新增路由

const email = ref("");
const password = ref("");
const useAuthStore = authStore();

const router = useRouter(); // 获取路由实例

const handleLogin = async () => {
  const success = await useAuthStore.login(email.value, password.value);
  if (success) {
    alert("登录成功");
    router.push({ path: "/" });
  }
};
</script>

<template>
  <section class="bg-white">
    <div class="grid min-h-screen grid-cols-12">
      <aside
        class="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6"
      >
        <img
          alt=""
          src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          class="absolute inset-0 h-full w-full object-cover"
        />
      </aside>

      <main
        class="flex items-center justify-center px-8 py-8 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
      >
        <div class="max-w-xl lg:max-w-3xl">
          <a class="block text-blue-600" href="#">
            <span class="sr-only">Home</span>
            <svg
              class="h-8 sm:h-10"
              viewBox="0 0 28 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                fill="currentColor"
              />
            </svg>
          </a>

          <h1 class="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
            欢迎来到Todo Application
          </h1>

          <p class="mt-4 leading-relaxed text-gray-500">账号登录</p>

          <div class="mt-8 grid grid-cols-6 gap-6">
            <div class="col-span-6">
              <label for="Email" class="block text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                v-model="email"
                type="email"
                id="Email"
                name="email"
                class="mt-1 w-full h-10 rounded-md border-2 border-gray-400 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>

            <div class="col-span-6">
              <label for="Password" class="block text-sm font-medium text-gray-700">
                Password
              </label>

              <input
                v-model="password"
                type="password"
                id="Password"
                name="password"
                class="mt-1 w-full h-10 rounded-md border-2 border-gray-400 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>

            <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
              <button
                @click="handleLogin"
                class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
              >
                登录
              </button>

              <p class="mt-4 text-sm text-gray-500 sm:mt-0">
                没有账号？
                <RouterLink to="/signup" class="text-gray-700 underline">注册</RouterLink>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </section>
</template>

<style scoped></style>
```

新增了`handleLogin`函数，调用`authStore`的`login`方法，若成功则弹出登录成功的提示框，并跳转到首页。

## 注销

在主页面时，当没有登录，则右上角`登录`,`注册`,当登陆时，则右上角显示用户邮箱以及`注销`按钮。

更新`src\views\HomeView.vue`
```vue showLineNumbers title="src\views\HomeView.vue"
<script setup>
import { RouterLink, useRouter } from "vue-router";
import { computed } from "vue";
import { authStore } from "../stores/auth";

const router = useRouter();
const useAuthStore = authStore();
const isAuthenticated = computed(() => useAuthStore.isAuthenticated);

// 修复函数定义语法
const handleLogOut = () => {
  useAuthStore.logout();
  router.push("/login");
};
</script>

<template>
  <header class="bg-white">
    <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="md:flex md:items-center md:gap-12">
          <RouterLink to="/" class="block text-teal-600">
            <svg
              class="h-8"
              viewBox="0 0 28 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                fill="currentColor"
              />
            </svg>
          </RouterLink>
        </div>

        <div class="hidden md:block">
          <nav aria-label="Global">
            <ul class="flex items-center gap-6 text-sm">
              <li>
                <RouterLink
                  to="/"
                  class="text-gray-500 transition hover:text-gray-500/75"
                >
                  Home
                </RouterLink>
              </li>

              <li>
                <RouterLink
                  to="/todo"
                  class="text-gray-500 transition hover:text-gray-500/75"
                >
                  Todo
                </RouterLink>
              </li>
            </ul>
          </nav>
        </div>

        <div class="flex items-center gap-4">
          <div v-if="!isAuthenticated" class="sm:flex sm:gap-4">
            <!-- 未登录时显示登录/注册 -->
            <RouterLink
              to="/login"
              class="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
            >
              登录
            </RouterLink>
            <RouterLink
              to="/signup"
              class="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
            >
              注册
            </RouterLink>
          </div>

          <div v-else class="sm:flex sm:gap-4 items-center">
            <div class="text-gray-600">{{ useAuthStore.user?.email }}</div>
            <button
              @click="handleLogOut"
              class="px-3 py-1 text-sm text-red-600 hover:bg-gray-100 rounded"
            >
              注销
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped></style>
```

通过获取`isAuthenticated`的值来判断是否显示登录/注册按钮，以及用户信息。当点击注销按钮时，调用`handleLogOut`函数，调用`authStore`的`logout`方法，然后跳转到登录页面。

## 路由守卫

当未登录时，我们不希望能直接访问到`/todo`页面，所以我们需要在`/todo`页面添加路由守卫，当未登录时，跳转到登录页面。

路由守卫是在进行路由导航过程中执行的一系列钩子函数，用于控制和管理路由的访问权限、页面跳转等操作。它就像是路由跳转的“关卡”，在路由跳转前后对特定条件进行检查，根据检查结果决定是否允许路由跳转或者执行其他操作。

路由守卫主要有以下几种类型：

1. 全局路由守卫：
   - `beforeEach`：在路由跳转前执行的钩子函数。
   - `beforeResolve`：在路由跳转前执行的钩子函数，与`beforeEach`不同的是，它在解析异步路由组件之前执行。
   - `afterEach`：在路由跳转后执行的钩子函数。

2. 组件级路由守卫：
   - `beforeRouteEnter`：在路由进入组件之前执行的钩子函数。
   - `beforeRouteUpdate`：在路由更新时执行的钩子函数。
   - `beforeRouteLeave`：在路由离开组件时执行的钩子函数。

3. 路由独享守卫：
   - `beforeEnter`：在路由进入组件之前执行的钩子函数。
  
我们这里使用路由独享守卫来实现路由守卫，当未登录时，跳转到登录页面。

更新`src\router\index.js`

```javascript showLineNumbers title="src\router\index.js"
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TodoView from "../views/TodoView.vue";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";
import NotFoundView from "../views/NotFoundView.vue";
import { authStore } from "../stores/auth";

const requireAuth = (to, from, next) => {
  const store = authStore();
  if (store.isAuthenticated) {
    next();
  } else {
    alert("请先登录");
    next({
      path: "/login",
      query: {
        redirect: to.fullPath,
      },
    });
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    // 在routes数组中找到todo路由配置
    {
      path: "/todo",
      name: "todo",
      component: TodoView,
      beforeEnter: requireAuth,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignupView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not_found",
      component: NotFoundView,
    },
  ],
});

export default router;
```

## todos列表

在登陆后我们可以看到用户独有的todos列表，因此需要更新todo状态的函数。

更改`src\stores\todo.js`

```javascript showLineNumbers title="src\stores\todo.js"
import { defineStore } from "pinia";
import axios from "axios";

import { FASTAPI_BASE_URL } from "../constant";
const token = localStorage.getItem("access_token");
export const todoStore = defineStore("todo", {
  state: () => ({
    todos: [],
  }),
  actions: {
    async loadTodos() {
      try {
        const response = await axios.get(`${FASTAPI_BASE_URL}/todos`, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        this.todos = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async addTodo(content) {
      const newTodo = { content: content, is_done: false };
      try {
        const response = await axios.post(
          `${FASTAPI_BASE_URL}/todos`,
          newTodo,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.todos.push(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        console.log(this.todos);
      }
    },
    async deleteTodo(id) {
      try {
        await axios.delete(`${FASTAPI_BASE_URL}/todos/${id}`, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        this.todos = this.todos.filter((todo) => todo.id !== id);
      } catch (error) {
        console.error(error);
      }
    },
  },
});

```

通过后端的api格式，修改了前端的`axios`请求，需要将access_token添加到请求头中。

修改`src\components\TodoList.vue`

```vue showLineNumbers title="src\components\TodoList.vue"
<script setup>
import TodoItem from "./TodoItem.vue";
import { todoStore } from "../stores/todo";

import { onMounted, computed } from "vue";

const useTodoStore = todoStore();
const todos = computed(() => useTodoStore.todos);

const deleteTodo = (id) => {
  useTodoStore.deleteTodo(id);
};

onMounted(() => {
  useTodoStore.loadTodos();
});
</script>
<template>
  <div class="mt-4 rounded-t-md bg-white transition-all duration-75">
    <div v-for="todo in todos" :key="todo.id">
      <TodoItem :todo="todo" @delete="deleteTodo" />
    </div>
  </div>
</template>
<style></style>
```

通过调用`useTodoStore`的`loadTodos`函数，在组件挂载时加载todos列表，并在`deleteTodo`函数中调用`useTodoStore`的`deleteTodo`函数，删除todos列表中的todo。

## 优化UI

为了能在/todo页面看到导航栏，我们需要将NavBar进行组件化

新建`src\components\NavBar.vue`

```vue showLineNumbers title="src\components\NavBar.vue"
<script setup>
import { RouterLink, useRouter } from "vue-router";
import { computed } from "vue";
import { authStore } from "../stores/auth";

const router = useRouter();
const useAuthStore = authStore();
const isAuthenticated = computed(() => useAuthStore.isAuthenticated);

const handleLogOut = () => {
  useAuthStore.logout();
  router.push("/login");
};
</script>

<template>
  <header class="bg-white">
    <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="md:flex md:items-center md:gap-12">
          <RouterLink to="/" class="block text-teal-600">
            <svg
              class="h-8"
              viewBox="0 0 28 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                fill="currentColor"
              />
            </svg>
          </RouterLink>
        </div>

        <div class="hidden md:block">
          <nav aria-label="Global">
            <ul class="flex items-center gap-6 text-sm">
              <li>
                <RouterLink
                  to="/"
                  class="text-gray-500 transition hover:text-gray-500/75"
                >
                  Home
                </RouterLink>
              </li>

              <li>
                <RouterLink
                  to="/todo"
                  class="text-gray-500 transition hover:text-gray-500/75"
                >
                  Todo
                </RouterLink>
              </li>
            </ul>
          </nav>
        </div>

        <div class="flex items-center gap-4">
          <div v-if="!isAuthenticated" class="sm:flex sm:gap-4">
            <!-- 未登录时显示登录/注册 -->
            <RouterLink
              to="/login"
              class="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
            >
              登录
            </RouterLink>
            <RouterLink
              to="/signup"
              class="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
            >
              注册
            </RouterLink>
          </div>

          <div v-else class="sm:flex sm:gap-4 items-center">
            <div class="text-gray-600">{{ useAuthStore.user?.email }}</div>
            <button
              @click="handleLogOut"
              class="px-3 py-1 text-sm text-red-600 hover:bg-gray-100 rounded"
            >
              注销
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
```

修改`src\views\HomeView.vue`

```vue showLineNumbers title="src\views\HomeView.vue"
<script setup>
import Navbar from "../components/Navbar.vue"; // 导入 Navbar 组件
</script>

<template>
  <Navbar />
</template>
```

修改`src\views\TodoView.vue`

```vue showLineNumbers title="src\views\TodoView.vue"
<script setup>
import { RouterLink } from "vue-router";
import { authStore } from "../stores/auth";
import TodoCreate from "../components/TodoCreate.vue";
import TodoList from "../components/TodoList.vue";
import Navbar from "../components/Navbar.vue";
</script>

<template>
  <div class="min-h-screen bg-gray-300">
    <Navbar />
    <main class="container mx-auto px-6 md:max-w-xl">
      <TodoCreate />
      <TodoList />
    </main>
  </div>
</template>

<style></style>
```
