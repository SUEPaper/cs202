---
id: async
sidebar_position: 10
---

# 异步编程与 AJAX

## 异步编程简介

---

异步编程是一种编程模型，用于处理需要等待或耗时的操作，以避免阻塞主线程并提高程序的响应性能。在传统的同步编程中，代码会按照顺序一行一行地执行，直到遇到耗时操作时，程序会停止执行并等待操作完成。这种方式可能导致程序在等待时变得不响应或阻塞其他任务的执行。

异步编程通过使用回调函数、Promise、Async/Await等技术，允许代码在进行耗时操作时继续执行其他任务，当操作完成后再执行相应的回调或继续执行后续代码。这样可以避免阻塞主线程，使程序能够更高效地处理多个任务和提供更好的用户体验。

以下是一些常见的异步编程技术：

### 1. 回调函数

通过将操作完成后的处理逻辑封装在回调函数中，将其作为参数传递给异步函数，以在操作完成后执行相应的操作。

```javascript
function fetchData(callback) {
    // 模拟耗时操作
    setTimeout(() => {
        const data = '异步数据';
        callback(data);
    }, 1000);
}

fetchData(data => {
    console.log(data);
});
```

### 2. Promise

Promise是一种用于处理异步操作的对象，它可以在异步操作完成后返回结果或抛出错误。

```javascript
function fetchData() {
    return new Promise((resolve, reject) => {
        // 模拟耗时操作
        setTimeout(() => {
            const data = '异步数据';
            resolve(data);
        }, 1000);
    });
}

fetchData()
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    });
```

### 3. Async/Await

Async/Await是基于Promise的异步编程的语法糖，它可以以同步的方式编写异步代码，使其更易于阅读和编写。

```javascript
async function fetchData() {
    return new Promise((resolve, reject) => {
        // 模拟耗时操作
        setTimeout(() => {
            const data = '异步数据';
            resolve(data);
        }, 1000);
    });
}

async function processData() {
    try {
        const data = await fetchData();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

processData();
```

异步编程在处理网络请求、文件操作、定时器等需要等待的场景中非常常见。它使得程序可以同时处理多个任务，并在操作完成后进行相应的处理，提高了程序的效率和性能。

## XMLHttpRequest 对象

---
XMLHttpRequest对象是用于在JavaScript中进行HTTP请求的内置对象。它提供了一种与服务器进行数据交互的机制，可以用于发送HTTP请求并接收服务器的响应。

> 下面是一个使用XMLHttpRequest对象发送GET请求的简单示例：

```javascript
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.example.com/data', true); // 设置请求方法、URL和是否异步
xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) { // 当请求完成时
        if (xhr.status === 200) { // 如果请求成功
            const responseData = xhr.responseText; // 获取服务器返回的数据
            // 处理数据
        } else {
            // 处理请求失败的情况
        }
    }
};
xhr.send(); // 发送请求
```

> 上述代码首先创建了一个XMLHttpRequest对象，并通过调用 `open()` 方法设置请求的方法、URL和是否异步。然后，我们定义了 `onreadystatechange` 事件处理程序，当 `readyState` 发生变化时，会触发该事件处理程序。在事件处理程序中，我们可以根据 `readyState` 和 `status` 来判断请求的状态，并获取服务器返回的数据。

其中， `readyState` 表示请求的当前状态，有以下几个值：

* `0`: 未初始化，即尚未调用`open()`方法
* `1`: 打开，即已调用`open()`方法，但尚未调用`send()`方法
* `2`: 已发送，即已调用`send()`方法，但尚未接收到响应
* `3`: 接收中，即正在接收响应数据
* `4`: 完成，即已接收到完整的响应数据

而 `status` 表示服务器返回的HTTP状态码，常见的有以下几个值：

* `200`: 请求成功
* `404`: 请求的资源未找到
* `500`: 服务器内部错误

> 在上述示例中，当请求的 `readyState` 为 `4` 且 `status` 为 `200` 时，表示请求成功，我们可以通过 `responseText` 属性获取服务器返回的文本数据。

除了使用GET方法，还可以使用POST方法发送数据到服务器，如下所示：

```javascript
const xhr = new XMLHttpRequest();
xhr.open('POST', 'https://api.example.com/data', true);
xhr.setRequestHeader('Content-Type', 'application/json'); // 设置请求头
xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        const responseData = xhr.responseText;
        // 处理数据
    }
};
const requestData = {
    name: 'John',
    age: 30
};
xhr.send(JSON.stringify(requestData));
```

在POST请求中，我们需要通过 `setRequestHeader()` 方法设置请求头，通常用于指定请求的数据类型。然后，通过 `send()` 方法发送数据到服务器，可以使用 `JSON.stringify()` 方法将JavaScript对象转换为JSON格式的字符串。

通过XMLHttpRequest对象，我们可以灵活地发送HTTP请求，与服务器进行数据交互，并根据返回的响应进行相应的处理。它为实现AJAX和与服务器进行数据交换提供了基础支持。然而，现

## Fetch API

---
Fetch API是一种用于进行网络请求的现代JavaScript API，它提供了一种更简洁、灵活的方式来发送HTTP请求并处理响应。与传统的XMLHttpRequest相比，Fetch API具有以下优点：

1. 更简洁的语法：Fetch API使用了Promise来处理异步操作，使代码更具可读性和可维护性。它采用了链式调用的方式，使代码更加清晰明了。

2. 内置的JSON解析：Fetch API自动解析响应数据，可以直接获取JSON格式的数据，无需手动解析。

3. 支持流式数据处理：Fetch API支持处理流式数据，可以处理大型文件和响应流。

> 下面是一个使用Fetch API发送GET请求的示例：

```javascript
fetch('https://api.example.com/data')
    .then(response => {
        if (!response.ok) {
            throw new Error('请求失败');
        }
        return response.json();
    })
    .then(data => {
        // 处理返回的JSON数据
    })
    .catch(error => {
        // 处理错误
    });
```

> 在上述代码中，我们使用 `fetch()` 函数发送GET请求，并通过 `then()` 方法处理返回的响应。在第一个 `then()` 方法中，我们首先检查响应是否成功（ `response.ok` ），如果失败则抛出一个错误。然后，我们使用 `response.json()` 方法将响应数据解析为JSON格式。在第二个 `then()` 方法中，我们可以处理解析后的JSON数据。

除了GET请求，Fetch API还支持发送POST请求和其他HTTP方法，以及设置请求头和请求参数等。

```javascript
fetch('https://api.example.com/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: 'John',
            age: 30
        })
    })
    .then(response => response.json())
    .then(data => {
        // 处理返回的JSON数据
    })
    .catch(error => {
        // 处理错误
    });
```

> 在上述代码中，我们通过传递一个配置对象作为 `fetch()` 函数的第二个参数来发送POST请求。配置对象中包含请求方法（ `method` ）、请求头（ `headers` ）和请求体（ `body` ）等信息。

Fetch API是现代Web开发中常用的网络请求工具，它提供了一种简洁、灵活的方式来进行数据交互，并且具有更好的兼容性和可读性。

## Promise 与 Async/Await

---

### Promise

Promise是JavaScript中用于处理异步操作的对象。它代表了一个尚未完成但最终会完成的操作，并可以获取其最终的结果或错误信息。

Promise对象有三种状态：

1. Pending（进行中）：初始状态，表示操作尚未完成。
2. Fulfilled（已完成）：表示操作已成功完成。
3. Rejected（已拒绝）：表示操作未能成功完成，发生了错误。

> 下面是一个简单的Promise示例：

```javascript
const promise = new Promise((resolve, reject) => {
    // 异步操作，例如发送网络请求或读取文件
    setTimeout(() => {
        const data = '操作成功';
        // resolve方法用于将Promise状态设置为Fulfilled，并将结果传递给后续的处理程序
        resolve(data);
        // 或者使用reject方法将Promise状态设置为Rejected，传递错误信息
        // reject(new Error('操作失败'));
    }, 1000);
});

promise
    .then(data => {
        // 在Promise状态变为Fulfilled时执行的处理程序
        console.log(data);
    })
    .catch(error => {
        // 在Promise状态变为Rejected时执行的处理程序
        console.error(error);
    });
```

> 在上述代码中，我们创建了一个Promise对象，并在构造函数中定义了异步操作。使用 `setTimeout` 模拟异步操作的延迟。在异步操作完成后，我们可以调用 `resolve` 方法将Promise状态设置为Fulfilled，并将操作结果传递给后续的 `.then()` 方法。如果异步操作发生错误，可以调用 `reject` 方法将Promise状态设置为Rejected，并传递错误信息。

使用 `.then()` 方法可以注册在Promise对象状态为Fulfilled时执行的处理程序。使用 `.catch()` 方法可以注册在Promise对象状态为Rejected时执行的处理程序。这样，我们可以根据Promise的状态来处理操作的结果或错误信息。

Promise还提供了其他方法，如 `.finally()` 用于注册无论Promise状态如何都会执行的处理程序，以及 `.all()` 和 `.race()` 用于处理多个Promise对象的并发操作。

使用Promise可以更好地处理异步操作，避免回调地狱（Callback Hell）的问题，使代码更清晰、可读性更高，并且更容易处理异步操作的结果和错误。

### Async/Await

Async/await是JavaScript中处理异步操作的一种语法糖，它基于Promise，并提供了更简洁、直观的方式来编写异步代码。

使用async/await，我们可以使用类似同步代码的方式来处理异步操作，而无需使用回调函数或链式调用的方式。通过在函数前面加上 `async` 关键字，我们可以将该函数声明为一个异步函数。在异步函数内部，可以使用 `await` 关键字来等待一个返回Promise的表达式，并暂停函数的执行，直到Promise解决（Fulfilled）并返回结果。

> 下面是一个使用async/await的示例：

```javascript
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function asyncFunction() {
    console.log('开始');
    await delay(1000); // 等待1秒钟
    console.log('结束');
}

asyncFunction();
```

> 在上述代码中，我们定义了一个 `delay` 函数，返回一个Promise，它会延迟指定的毫秒数后解决。然后，我们定义了一个异步函数 `asyncFunction` ，在函数内部使用 `await` 关键字来等待 `delay` 函数的完成。这样，当 `await` 后面的Promise解决后，才会执行后续的代码。

async/await还可以与try/catch语句结合使用，以处理Promise的拒绝（Rejected）状态和错误。

```javascript
async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('请求失败', error);
    }
}

fetchData();
```

> 在上述代码中，我们使用 `await` 关键字来等待 `fetch` 请求的结果，并使用try/catch语句来捕获可能发生的错误。如果请求成功，我们可以继续处理响应的数据；如果请求失败，会进入catch块并打印错误信息。

使用async/await可以使异步代码更易于编写和阅读，并且能够以更直观的方式处理异步操作的结果和错误。它是现代JavaScript中处理异步编程的常用模式之一。
