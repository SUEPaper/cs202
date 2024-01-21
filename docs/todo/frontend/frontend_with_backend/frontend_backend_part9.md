---
sidebar_position: 9
---

# 增加注册页面

按照我们的需求，首先需要完成注册，其次登录，修改信息

## 修改注册页面

修改frontend\src\components\RegisterPage.jsx文件

```jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../index.css";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  function registerUser() {
    fetch("http://localhost:8000/api/users/", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          if (response.status === 401) {
            throw new Error("格式错误");
          } else {
            throw new Error("Error: " + response.statusText);
          }
        }
      })
      .then(() => {
        alert("注册成功");
        // 跳转到登录页面
        navigate("/");
      })
      .catch((error) => alert("Error: " + error));
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="mb-4 text-2xl font-bold text-center">TodoList 注册</h2>
      <input
        className="mb-2 px-3 py-2 border border-gray-300 rounded-md"
        type="text"
        placeholder="昵称"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="mb-2 px-3 py-2 border border-gray-300 rounded-md"
        type="email"
        placeholder="邮箱"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="mb-2 px-3 py-2 border border-gray-300 rounded-md"
        type="password"
        placeholder="密码"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className="mb-4 px-3 py-2 border border-gray-300 rounded-md"
        type="password"
        placeholder="确认密码"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-400"
        disabled={
          !username || !email || !password || password !== confirmPassword
        }
        onClick={() => {
          registerUser();
        }}
      >
        注册
      </button>
    </div>
  );
};
export default RegisterPage;
```

## 代码解读

这段代码是一个注册页面组件的示例代码。它使用了 React 和 React Redux 库，并使用了 React Router 的 `useNavigate` 钩子函数进行页面导航。

以下是对代码的逐行解释：

```javascript
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../index.css";
import { useNavigate } from "react-router-dom";
```

这里导入了所需的依赖项，包括 React、React Hooks、React Redux 和 React Router 相关的库。

```javascript
const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
```

在这里，使用了 React 的状态钩子函数 `useState` 来定义了一些组件级的状态。其中包括 `username`、`email`、`password` 和 `confirmPassword` 等字段，用于保存用户在表单中输入的值。`navigate` 则是使用了 React Router 的 `useNavigate` 钩子函数，用于在注册成功后进行页面导航。

```javascript
  function registerUser() {
    // 发起注册用户的请求
    fetch("http://localhost:8000/users/", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          if (response.status === 401) {
            throw new Error("格式错误");
          } else {
            throw new Error("Error: " + response.statusText);
          }
        }
      })
      .then(() => {
        alert("注册成功");
        // 跳转到登录页面
        navigate("/");
      })
      .catch((error) => alert("Error: " + error));
  }
```

`registerUser` 函数用于处理用户注册的逻辑。它发起一个 POST 请求到服务器的 `/users/` 接口，将用户的注册信息作为请求体发送。在成功注册后，弹出提示信息并使用 `navigate` 导航函数跳转到登录页面。如果请求失败，则通过 `catch` 捕获错误并显示错误信息。

:::tip
`navigate` 是 React Router 的一个钩子函数，用于进行页面导航。它可以在 React 组件中使用，通过调用 `navigate` 函数实现页面之间的切换。
:::


```javascript
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* 页面内容 */}
    </div>
  );
};

export default RegisterPage;
```

这里定义了注册页面组件的 JSX 结构，包含了一个包裹在 `div` 元素中的页面内容。在页面内容中，展示了一个注册表单，包含了输入字段和注册按钮。用户可以在输入字段中填写相关信息，并点击注册按钮来触发 `registerUser` 函数进行注册。

