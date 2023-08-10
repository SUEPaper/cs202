---
id : updatefunction
sidebar_position: 9
---

# 更新增删改

## 更新增

`src\api\TodoApi.jsx`

增加addOne函数

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

  async addOne(data) {
    try {
      const response = await axios.post(this.baseURL + "add_todo/" + data, {
        headers: {
          Accept: "application/json",
        },
      });

      console.log("Todo added:", response.data);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  }
}

export default todoapi;

```

在`src\store\useData.jsx`中更改`addData`

```jsx
  addData: async (item) => {
    const api = new todoapi();
    await api.addOne(item); // 调用 addOne 方法来添加新的任务项
    const todos = await api.GetTodos();
    set({ data: todos });
  },
```

## 更新删

`src\api\TodoApi.jsx`

增加deleteOne函数

```jsx
  async deleteOne(id) {
    try {
      const response = await axios.delete(this.baseURL + "delete_todo/" + id, {
        headers: {
          Accept: "application/json",
        },
      });

      console.log("Todo deleted:", response.data);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }
```

在`src\store\useData.jsx`中更改`deleteData`

```jsx
  deleteData: async (id) => {
    await api.deleteOne(id); // 调用 deleteOne 方法来删除任务项
    const todos = await api.GetTodos();
    set({ data: todos });
  },
```

## 更新改

`src\api\TodoApi.jsx`

增加updateTodo函数

```jsx
  async updateTodo({ id, task }) {
    const data = { id: id, task: task, complete: false };
    try {
      const response = await axios.put(
        "http://localhost:8000/api/todo/update_todo",
        data,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Todo updated:", response.data);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  }
```
在`src\store\useData.jsx`中更改`changeData`

```jsx
  changeData: async ({ id, task }) => {
    await api.updateTodo({ id, task }); // 调用 updateTodo 方法来更新任务项
    const todos = await api.GetTodos();
    set({ data: todos });
  },
```

## 完整代码

 `src\store\useData.jsx`

```jsx
import { create } from "zustand";
import todoapi from "../api/todoapi";
const api = new todoapi();

const useData = create((set) => ({
  data: [],
  getData: async () => {
    const todos = await api.GetTodos();
    set({ data: todos });
  },
  addData: async (item) => {
    await api.addOne(item); // 调用 addOne 方法来添加新的任务项
    const todos = await api.GetTodos();
    set({ data: todos });
  },
  deleteData: async (id) => {
    await api.deleteOne(id); // 调用 deleteOne 方法来删除任务项
    const todos = await api.GetTodos();
    set({ data: todos });
  },

  changeData: async ({ id, task }) => {
    await api.updateTodo({ id, task }); // 调用 updateTodo 方法来更新任务项
    const todos = await api.GetTodos();
    set({ data: todos });
  },
}));

export { useData };
```

`src\api\TodoApi.jsx`

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

  async addOne(data) {
    try {
      const response = await axios.post(this.baseURL + "add_todo/" + data, {
        headers: {
          Accept: "application/json",
        },
      });

      console.log("Todo added:", response.data);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  }

  async deleteOne(id) {
    try {
      const response = await axios.delete(this.baseURL + "delete_todo/" + id, {
        headers: {
          Accept: "application/json",
        },
      });

      console.log("Todo deleted:", response.data);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }
  async updateTodo({ id, task }) {
    const data = { id: id, task: task, complete: false };
    try {
      const response = await axios.put(
        "http://localhost:8000/api/todo/update_todo",
        data,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Todo updated:", response.data);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  }
}

export default todoapi;
```