---
sidebar_position: 11
---

# 增加修改信息页面

## 修改修改信息页面
修改frontend\src\components\EditProfilePage.jsx
```jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../UserSlice";

function EditProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const accessToken = useSelector((state) => state.auth.access_token);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmitUsername = () => {
    fetch("http://localhost:8000/api/users/name", {
      method: "PUT",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
      }),
    }).then(() => {
      alert("username updated successfully!");
      dispatch(setToken(""));
      navigate("/");
    });
  };

  const handleSubmitPassword = () => {
    fetch("http://localhost:8000/api/users/password", {
      method: "PUT",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
      }),
    }).then(() => {
      alert("password updated successfully!");
      dispatch(setToken(""));
      navigate("/");
    });
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold">Edit Profile</h1>
      <div className="mt-6">
        <label className="text-xl">Username:</label>
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          className="border border-gray-300 px-2 py-1 rounded"
        />
        <button
          onClick={handleSubmitUsername}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Confirm
        </button>
      </div>
      <div className="mt-4">
        <label className="text-xl">Password:</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          className="border border-gray-300 px-2 py-1 rounded"
        />
        <button
          onClick={handleSubmitPassword}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default EditProfilePage;
```

## 代码解读

这段代码是一个编辑用户资料页面的示例代码。它使用了 React、React Redux 和 React Router 相关的库，并使用了一些钩子函数和 Redux 的操作。

以下是对代码的逐行解释：

```javascript
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../UserSlice";
```

这里导入了所需的依赖项，包括 React、React Hooks、React Redux 和 React Router 相关的库。同时也导入了 Redux 切片中的 `setToken` action。

```javascript
function EditProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const accessToken = useSelector((state) => state.auth.access_token);
```

在这里，使用了 React 的状态钩子函数 `useState` 来定义了一些组件级的状态。其中包括 `username` 和 `password` 字段，用于保存用户在编辑资料表单中输入的用户名和密码。`dispatch` 函数是 Redux 的 `useDispatch` 钩子函数返回的值，用于派发 Redux action。`navigate` 则是使用了 React Router 的 `useNavigate` 钩子函数，用于进行页面导航。`accessToken` 使用了 Redux 的 `useSelector` 钩子函数从 Redux Store 中获取用户的访问令牌。

```javascript
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
```

这里定义了两个处理函数，`handleUsernameChange` 和 `handlePasswordChange`，用于在用户输入框中的文本发生变化时更新相关的状态值。

```javascript
  const handleSubmitUsername = () => {
    // 发起更新用户名的请求
    fetch("http://localhost:8000/api/users/name", {
      method: "PUT",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
      }),
    }).then(() => {
      alert("用户名更新成功！");
      dispatch(setToken(""));
      navigate("/");
    });
  };
```

`handleSubmitUsername` 函数用于处理提交更新用户名的操作。它发起一个 PUT 请求到服务器的 `/api/users/name` 接口，将用户的新用户名作为请求体发送，并在请求头中包含访问令牌以进行鉴权。在请求成功后，弹出提示信息，并使用 `dispatch` 函数派发 `setToken` action 来清除用户的访问令牌，并通过 `navigate` 导航函数跳转到首页。

```javascript
  const handleSubmitPassword = () => {
    // 发起更新密码的请求
    fetch("http://localhost:8000/api/users/password", {
      method: "PUT",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
      }),
    }).then(() => {
      alert("密码更新成功！");
      dispatch(setToken(""));
      navigate("/");
    });
  };
```

`handleSubmitPassword` 函数用于处理提交更新密码的操作。它发起一个 PUT 请求到服务器的 `/api/users/password` 接口，将用户的新密码作为请求体发送，并在请求头中包含访问令牌以进行鉴权。在请求成功后，弹出提示信息，并使用 `dispatch` 函数派发 `setToken` action 来清除用户的访问令牌，并通过 `navigate` 导航函数跳转到首页。

```javascript
  return (
    <div className="flex flex-col items-center mt-10">
      {/* 页面内容 */}
    </div>
  );
}

export default EditProfilePage;
```

这里定义了编辑用户资料页面组件的 JSX 结构，包含了一个包裹在 `div` 元素中的页面内容。在页面内容中，展示了一个编辑用户名和密码的表单，包含了输入字段和确认按钮。用户可以在输入字段中填写相关信息，并点击确认按钮来触发对应的提交操作。
