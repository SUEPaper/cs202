---
sidebar_position: 12
---

# todo页面

因为新增了鉴权，所以之前的fetch均需要添加一个header，因此对frontend\src\components\ToDoList.jsx进行改动

## fetch api

首先新增语句
```jsx
  const accessToken = useSelector((state) => state.auth.access_token);
```


用`fetchData`函数举例
```jsx
    fetch("http://localhost:8000/api/todos/", {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
```
fetch需要添加
```jsx
Authorization: `Bearer ${accessToken}`
```

同理，`addData`，`deleteData`，`updateData`均需要添加
```jsx
Authorization: `Bearer ${accessToken}`
```