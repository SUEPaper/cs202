---
id : backendconnect
sidebar_position: 8
---

# 链接后端

## 后端代码

```
backend
├─ .gitignore
├─ api
│  ├─ api.py
│  └─ todo.py
└─ main.py

```

`api\api.py`

```py
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class UpdateTodoModel(BaseModel):
    id: int
    task: str
    complete: bool


data = [
    {
        "id": 1,
        "task": "Give dog a bath",
        "complete": True,
    },
    {
        "id": 2,
        "task": "Do laundry",
        "complete": True,
    },
    {
        "id": 3,
        "task": "Vacuum floor",
        "complete": False,
    },
    {
        "id": 4,
        "task": "Feed cat",
        "complete": True,
    },
    {
        "id": 5,
        "task": "Change light bulbs",
        "complete": False,
    },
    {
        "id": 6,
        "task": "Go to Store",
        "complete": True,
    },
    {
        "id": 7,
        "task": "Fill gas tank",
        "complete": True,
    },
    {
        "id": 8,
        "task": "Change linens",
        "complete": False,
    },
    {
        "id": 9,
        "task": "Rake leaves",
        "complete": True,
    },
    {
        "id": 10,
        "task": "Bake Cookies",
        "complete": False,
    },
    {
        "id": 11,
        "task": "Take nap",
        "complete": True,
    },
    {
        "id": 12,
        "task": "Read book",
        "complete": True,
    },
    {
        "id": 13,
        "task": "Exercise",
        "complete": False,
    },
    {
        "id": 14,
        "task": "Give dog a bath",
        "complete": False,
    },
    {
        "id": 15,
        "task": "Do laundry",
        "complete": False,
    },
    {
        "id": 16,
        "task": "Vacuum floor",
        "complete": False,
    },
    {
        "id": 17,
        "task": "Feed cat",
        "complete": True,
    },
    {
        "id": 18,
        "task": "Change light bulbs",
        "complete": False,
    },
    {
        "id": 19,
        "task": "Go to Store",
        "complete": False,
    },
    {
        "id": 20,
        "task": "Fill gas tank",
        "complete": False,
    },
]


@router.get("/get_todos")
def get_todos():
    return data


@router.get("/get_todo/{id}")
def get_todo_by_id(id: int):
    for todo in data:
        if todo["id"] == id:
            return todo
    return {"message": "Todo not found"}


@router.post("/add_todo/{task}")
def add_todo(task: str):
    new_id = max(item["id"] for item in data) + 1
    new_todo = {
        "id": new_id,
        "task": task,
        "complete": False,
    }
    data.append(new_todo)
    return new_todo


@router.put("/update_todo")
def update_todo_by_id(update_data: UpdateTodoModel):
    for todo in data:
        if todo["id"] == update_data.id:
            todo["task"] = update_data.task
            todo["complete"] = update_data.complete
            return todo
    return {"message": "Todo not found"}


@router.delete("/delete_todo/{id}")
def delete_todo_by_id(id: int):
    for todo in data:
        if todo["id"] == id:
            data.remove(todo)
            return {"message": "Todo deleted"}
    return {"message": "Todo not found"}

```

`main.py`

```py
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.api import api_router

app = FastAPI()
app.include_router(api_router, prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/test")
async def root():
    return {"message": "Hello World"}


if __name__ == "__main__":
    uvicorn.run("main:app", reload=True, host="0.0.0.0", port=8000)
```


## 安装axios

```bash
npm install axios
```

[Axios](https://axios-http.com/zh/docs/intro) 是什么?
Axios 是一个基于 `promise` 网络请求库，作用于`node.js` 和浏览器中。 它是 `isomorphic` 的(即同一套代码可以运行在浏览器和node.js中)。在服务端它使用原生 node.js `http` 模块, 而在客户端 (浏览端) 则使用 XMLHttpRequests。

## 使用axios

在`src` 文件夹下新建`api`文件夹，在api文件夹下新建文件`src\api\TodoApi.jsx`

```jsx
import React from "react";
import axios from "axios";

class todoapi {
  constructor() {
    this.baseURL = "http://localhost:8000/api/todo/";
  }

  async GetTodos() {
    const response = await axios.get(this.baseURL + "get_todos/", {
      headers: {
        accept: "application/json",
      },
    });
    return response.data;
  }

  async getOne(id) {
    const response = await axios.get(this.baseURL + "get_todo/" + id);
    return response.data;
  }
}

export default todoapi;
```

### 代码解读

当编写一个复杂的应用时，将不同的功能和逻辑模块进行分离和组织是非常重要的，这有助于提高代码的可维护性、可读性和重用性。在代码中，使用了 `todoapi` 类来处理待办事项数据的获取和处理。

1. **类和构造函数**：创建了一个名为 `todoapi` 的类，用于封装与待办事项相关的网络请求和数据处理逻辑。类有一个构造函数 `constructor()`，在这里你初始化了类的属性，如 `baseURL`。

2. **异步请求**：在类的方法中，使用了 `async` 和 `await` 来处理异步请求。这使得你可以在发起网络请求时暂停代码执行，直到请求完成并返回数据。

3. **获取待办事项数据**：`GetTodos()` 方法用于从服务器获取所有待办事项数据。它使用了 `axios` 库来发送 GET 请求，并在请求头中设置了 `accept: "application/json"`。通过 `await`，它等待请求完成，然后返回响应数据。

4. **获取单个待办事项数据**：`getOne(id)` 方法用于从服务器获取单个待办事项的数据。它根据传入的 `id` 参数构建请求 URL，然后发送 GET 请求，并使用 `await` 等待请求完成并返回响应数据。

5. **组件中的使用**：在 React 组件中，你可以通过创建 `todoapi` 类的实例来调用这些方法，从而获取待办事项数据。这种分离使你的组件代码更专注于界面呈现和用户交互，而数据获取和处理的逻辑则封装在 `todoapi` 类中。

## 使用后端数据

将`src\store\useData.jsx`的data删除，新增`getData`。

```jsx
import { create } from "zustand";
import todoapi from "../api/todoapi";

const useData = create((set) => ({
  data: [],
  getData: async () => {
    const api = new todoapi();
    const todos = await api.GetTodos();
    set({ data: todos });
  },
  addData: (item) =>
    set((state) => {
      // 找到当前 data 数组中最大的 id 值
      const maxId = Math.max(...state.data.map((dataItem) => dataItem.id));

      // 构建新的任务项对象
      const newTask = {
        id: maxId + 1, // 设置新的 id
        task: item,
        complete: false,
      };

      // 返回更新后的状态
      return {
        data: [...state.data, newTask], // 将新的任务项添加到 data 数组中
      };
    }),
  deleteData: (id) =>
    set((state) => {
      // 返回更新后的状态
      return {
        data: state.data.filter((dataItem) => dataItem.id !== id), // 过滤掉 id 不等于传入 id 的任务项
      };
    }),
  changeData: ({ id, task }) =>
    set((state) => {
      // 返回更新后的状态
      return {
        data: state.data.map((dataItem) =>
          dataItem.id === id ? { ...dataItem, task } : dataItem
        ), // 将 id 等于传入 id 的任务项的 task 属性修改为传入的 task
      };
    }),
}));

export { useData };
```

在`src\App.jsx`中新增`useEffect`

```jsx
import React from "react";
import MyToDoListHead from "./components/MyToDoListHead";
import MyToDoListBody from "./components/MyToDoListBody";
import { useData } from "./store/useData";

function App() {
  const getData = useData((state) => state.getData);
  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div className="item-center container py-16 px-6 min-h-screen mx-auto">
      <MyToDoListHead />
      <MyToDoListBody />
    </div>
  );
}

export default App;
```

此时就已经与后端联系

## 文件结构


```
frontend
├─ .eslintrc.cjs
├─ .gitignore
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ api
│  │  └─ TodoApi.jsx
│  ├─ App.jsx
│  ├─ assets
│  ├─ components
│  │  ├─ AddButtom.jsx
│  │  ├─ ChangeButtom.jsx
│  │  ├─ DeleteButtom.jsx
│  │  ├─ MyToDoListBody.jsx
│  │  └─ MyToDoListHead.jsx
│  ├─ index.css
│  ├─ main.jsx
│  └─ store
│     └─ useData.jsx
├─ tailwind.config.js
└─ vite.config.js

```
