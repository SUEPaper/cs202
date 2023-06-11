---
sidebar_position: 13
---

# 新增业务逻辑

当我们没有登陆时，不能访问/todo,/edit-profile路由，在登陆成功后，新增Logout按钮，点击会退出登录

## 修改frontend\src\components\Navbar.jsx

将其代码替换为
```jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../UserSlice";
import { useDispatch, useSelector } from "react-redux";

function Navbar() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.access_token);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setToken(""));
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between p-6 bg-blue-500 border border-blue-500">
      <div>
        <ul className="flex space-x-4">
          {accessToken ? (
            <li>
              <Link
                to="/todo"
                className="px-2 py-1 text-xl text-white  hover:border-transparent hover:text-blue-200"
              >
                Home
              </Link>
            </li>
          ) : (
            <li>
              <button
                className="px-2 py-0 text-xl text-white hover:border-transparent hover:text-blue-200 h-8"
                onClick={() => {
                  alert("请先登录");
                }}
              >
                Home
              </button>
            </li>
          )}
        </ul>
      </div>
      <div>
        <ul className="flex items-center space-x-4">
          <li>
            <Link
              to="/register"
              className="px-2 py-1 text-xl text-white hover:border-transparent hover:text-blue-200 h-8"
            >
              Register
            </Link>
          </li>
          {accessToken && (
            <li>
              <Link
                to="/edit-profile"
                className="px-2 py-1 text-xl text-white hover:border-transparent hover:text-blue-200 h-8"
              >
                Edit Profile
              </Link>
            </li>
          )}
          {accessToken && (
            <li>
              <button
                onClick={handleLogout}
                className="px-2 py-0 text-xl text-white hover:border-transparent hover:text-blue-200 h-8"
              >
                Logout
              </button>
            </li>
          )}
          {!accessToken && (
            <li>
              <Link
                to="/"
                className="px-2 py-1 text-xl text-white hover:border-transparent hover:text-blue-200 h-8"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

```

## 代码解释

这段代码是一个导航栏组件，用于在应用中显示导航链接，并根据用户的登录状态来确定显示哪些链接。

- `useSelector` 是 Redux 提供的钩子函数，用于从 Redux store 中获取状态数据。在这里，我们使用 `useSelector` 获取 `access_token` 的值，它表示用户的登录状态。
- `useNavigate` 是 React Router 提供的钩子函数，用于在组件中进行页面导航。
- `handleLogout` 函数是一个处理登出操作的事件处理函数。当用户点击 "Logout" 链接时，它会调用 `dispatch` 函数发送一个 action 来清空 `access_token`，并使用 `navigate` 函数将用户导航到首页。
- 在导航栏的渲染部分，我们使用条件渲染来根据用户的登录状态决定显示哪些链接。如果用户已登录，显示 "Home"、"Edit Profile" 和 "Logout" 链接；如果用户未登录，显示 "Home"、"Register" 和 "Login" 链接。
- 在点击 "Home" 链接时，根据用户的登录状态决定是导航到 "/todo" 页面还是弹出 "请先登录" 的提示。
- "Logout" 链接被点击时，会触发 `handleLogout` 函数执行登出操作。
- 其他链接根据用户的登录状态进行显示或隐藏。

这个导航栏组件提供了基本的用户导航功能，根据用户的登录状态显示不同的链接，并在用户点击相关链接时执行相应的操作。