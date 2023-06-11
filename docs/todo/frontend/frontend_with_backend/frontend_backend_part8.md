---
sidebar_position: 8
---

# 增加Slice

按照我们的需求，我们需要储存一个状态`access_token`,所以需要在frontend\src下新建文件`UserSlice.jsx`

## UserSlice.jsx

在该文件中增加
```jsx
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  access_token: "",
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.access_token = action.payload.access_token;
    },
  },
});

export const { setToken } = UserSlice.actions;

export default UserSlice.reducer;
```

这段代码是一个使用 Redux Toolkit 的用户切片（UserSlice）的示例代码。它使用 `createSlice` 函数创建了一个 Redux 切片，包含了对用户的状态和操作的定义。

以下是对代码的逐行解释：

```javascript
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  access_token: "",
};
```

这里导入了 `createSlice` 函数，并定义了用户切片的初始状态 `initialState`，其中 `access_token` 属性被初始化为空字符串。

```javascript
const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.access_token = action.payload.access_token;
    },
  },
});
```

使用 `createSlice` 函数创建了一个名为 "user" 的切片，并定义了一个 `setToken` 的 reducer 函数。当调用 `setToken` action 时，它会接收一个 `action` 参数，并将 `action.payload.access_token` 的值赋给 `state.access_token` 属性。

```javascript
export const { setToken } = UserSlice.actions;

export default UserSlice.reducer;
```

通过 `export` 关键字，将 `setToken` action 导出，并将 `UserSlice.reducer` 导出作为用户切片的 reducer 函数。

这段代码可以用于创建 Redux Store，并管理应用程序中与用户相关的状态和操作。你可以在其他组件中使用 `setToken` action 来更新 `access_token` 的值，以及在需要的地方访问和使用 `access_token` 属性。


## frontend\src\Store\store.jsx

因为增加了一个`Slice`，所以需要更改frontend\src\Store\store.jsx

```jsx
import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from "../ToDoSlice";
import UserReducer from "../UserSlice";

const store = configureStore({
  reducer: {
    todo: TodoReducer,
    auth: UserReducer,
  },
});

export default store;
```