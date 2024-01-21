---
sidebar_position: 10
---

# 增加登录页面

## 修改登录页面
修改frontend\src\components\LoginPage.jsx
```jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../UserSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function UserLog(e) {
    e.preventDefault();
    fetch("http://localhost:8000/api/login/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `grant_type=&username=${encodeURIComponent(
        email
      )}&password=${encodeURIComponent(
        password
      )}&scope=&client_id=&client_secret=`,
    })
      .then(async (response) => {
        if (response.ok) {
          const token = await response.json(); // Wait until the Promise resolves
          dispatch(setToken(token));
          alert("登录成功");
          navigate("/");
        } else {
          if (response.status === 401) {
            throw new Error("用户名或密码错误");
          } else {
            throw new Error("Error: " + response.statusText);
          }
        }
      })
      .catch((error) => alert(`错误: ${error.detail}`));
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="mb-4">欢迎登录</h2>
      <input
        className="mb-2 px-2 py-1 border rounded"
        type="email"
        placeholder="邮箱"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="mb-2 px-2 py-1 border rounded"
        type="password"
        placeholder="密码"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="px-4 py-2 border rounded" onClick={UserLog}>
        登录
      </button>
    </div>
  );
};

export default LoginPage;
```

## 代码解读

这段代码是一个登录页面组件的示例代码。它使用了 React、React Router 和 React Redux 库，并使用了一些钩子函数和 Redux 的操作。

以下是对代码的逐行解释：

```javascript
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../UserSlice";
```

这里导入了所需的依赖项，包括 React、React Hooks、React Router 和 React Redux 相关的库。同时也导入了 Redux 切片中的 `setToken` action。

```javascript
const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
```

在这里，使用了 React 的状态钩子函数 `useState` 来定义了一些组件级的状态。其中包括 `email` 和 `password` 字段，用于保存用户在登录表单中输入的邮箱和密码。`dispatch` 函数是 Redux 的 `useDispatch` 钩子函数返回的值，用于派发 Redux action。`navigate` 则是使用了 React Router 的 `useNavigate` 钩子函数，用于在登录成功后进行页面导航。

```javascript
  function UserLog(e) {
    e.preventDefault();
    // 发起用户登录的请求
    fetch("http://localhost:8000/login/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `grant_type=&username=${encodeURIComponent(
        email
      )}&password=${encodeURIComponent(
        password
      )}&scope=&client_id=&client_secret=`,
    })
      .then(async (response) => {
        if (response.ok) {
          const token = await response.json(); // 等待 Promise 解析完成
          dispatch(setToken(token));
          alert("登录成功");
          navigate("/");
        } else {
          if (response.status === 401) {
            throw new Error("用户名或密码错误");
          } else {
            throw new Error("Error: " + response.statusText);
          }
        }
      })
      .catch((error) => alert(`错误: ${error.detail}`));
  }
```

`UserLog` 函数用于处理用户登录的逻辑。它发起一个 POST 请求到服务器的 `/api/login/access_token` 接口，将用户的登录信息作为请求体发送。在登录成功后，通过调用 Redux 的 `dispatch` 函数派发 `setToken` action，并传递服务器返回的 token 值。随后，弹出提示信息并使用 `navigate` 导航函数跳转到首页。如果登录请求失败，则通过 `catch` 捕获错误并显示错误信息。

```javascript
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* 页面内容 */}
    </div>
  );
};

export default LoginPage;
```

这里定义了登录页面组件的 JSX 结构，包含了一个包裹在 `div` 元素中的页面内容。在页面内容中，展示了一个登录表单，包含了邮箱和密码的输入字段，以及一个登录按钮。用户可以在输入字段中填写相关信息，并点击登录按钮来触发 `UserLog` 函数进行登录。
