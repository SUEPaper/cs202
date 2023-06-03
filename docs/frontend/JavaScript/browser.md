---
id: browser
sidebar_position: 13
---

# 浏览器 API

## 简介

---
浏览器提供了一系列的 API（Application Programming Interface）用于与浏览器环境进行交互和操作。这些浏览器 API 包括以下几个主要部分：

#### 1. DOM API（Document Object Model）：

用于操作和操纵网页的文档对象模型。它提供了访问和修改网页内容、结构和样式的方法，例如通过元素选择器获取元素、修改元素的属性、添加、删除或修改元素等。

#### 2. BOM API（Browser Object Model）：

用于与浏览器窗口进行交互的对象模型。它提供了与浏览器窗口、历史记录、定时器、对话框等进行交互的方法和属性，例如操作浏览器历史记录、设置定时器、弹出对话框等。

#### 3. AJAX API（Asynchronous JavaScript and XML）：

用于进行异步通信的 API。它提供了发送 HTTP 请求、接收和处理服务器响应的方法，例如通过 XMLHttpRequest 对象发送请求、处理响应数据等。

#### 4. Storage API：

用于在浏览器中存储数据的 API。它提供了两种存储机制：localStorage 和 sessionStorage，用于在客户端浏览器中永久或会话期间存储数据。

#### 5. Geolocation API：

用于获取用户设备的地理位置信息的 API。它提供了获取用户地理位置坐标的方法，用于开发基于地理位置的应用和服务。

#### 6. Canvas API：

用于绘制图形和图像的 API。它提供了一组绘图方法和属性，使开发者可以在网页上创建和操作图形、图像、动画等。

#### 7. Web Storage API：

用于在浏览器中以键值对形式存储数据的 API。它提供了 sessionStorage 和 localStorage 对象，用于存储和读取数据，这些数据在不同浏览器会话和页面之间都可以保持。

#### 8. 其他API：

除了上述提到的 API，还有许多其他的浏览器 API，如历史记录 API、拖放 API、通知 API、媒体 API 等，它们提供了丰富的功能和能力，帮助开发者构建交互性强、功能丰富的网页和应用程序。

## Window 对象与定时器

---

Window 对象是浏览器环境中的顶层对象，它表示整个浏览器窗口或标签页。Window 对象提供了一系列的属性和方法，用于操作和管理浏览器窗口的各个方面。

其中，定时器是 Window 对象提供的一种机制，用于在指定的时间间隔内执行代码或延迟执行代码。

在 JavaScript 中，常用的定时器函数有两种：

### 1. setTimeout 函数

用于在指定的延迟时间之后执行一次指定的代码。
   

```javascript
   setTimeout(function() {
       // 执行的代码
   }, 延迟时间);
```

### 2. setInterval 函数

用于按照指定的时间间隔循环执行指定的代码。
   

```javascript
   setInterval(function() {
       // 执行的代码
   }, 时间间隔);
```

> 这两个函数返回一个定时器标识，可以使用该标识来取消定时器的执行。

> 例如，使用 setTimeout 函数延迟执行一段代码：

```javascript
setTimeout(function() {
    console.log('延迟执行的代码');
}, 2000); // 延迟2秒执行
```

> 使用 setInterval 函数循环执行一段代码：

```javascript
var count = 0;
var intervalId = setInterval(function() {
    console.log('循环执行的代码');
    count++;
    if (count === 5) {
        clearInterval(intervalId); // 在执行了5次后取消定时器
    }
}, 1000); // 每隔1秒执行一次
```

定时器函数可以用于实现一些需要延迟执行或周期性执行的操作，例如定时刷新页面内容、轮播图自动播放等。需要注意的是，使用定时器时要小心避免过多的定时器重叠或未及时清除导致的性能问题。

## Location 对象与导航

---

Location 对象是浏览器提供的内置对象之一，它包含有关当前 URL 的信息，并提供了一些方法用于导航到其他 URL。

通过 `window.location` 或 `location` 可以访问到当前窗口的 Location 对象。

### Location 对象的常用属性

|Location 对象的常用属性|访问对象|
|:-|:-:|
| `location.href` |当前页面的完整 URL|
| `location.protocol` |当前页面的协议，如 "http:" 或 "https:"|
| `location.host` |当前页面的主机名和端口号|
| `location.hostname` |当前页面的主机名|
| `location.port` |当前页面的端口号|
| `location.pathname` |当前页面的路径部分|
| `location.search` |当前页面的查询参数部分（以 "?" 开头的部分）|
| `location.hash` |当前页面的片段标识符部分（以 "#" 开头的部分）|

### Location 对象的常用方法包括

|Location 对象的常用方法|对应操作|
|:-|:-:|
| `location.assign(url)` |将当前页面导航到指定的 URL|
| `location.replace(url)` |用指定的 URL 替换当前页面，不会生成浏览器历史记录|
| `location.reload()` |重新加载当前页面|

### 示例

```javascript
// 获取当前页面的 URL
console.log(location.href);

// 将当前页面导航到指定的 URL
location.assign("https://www.example.com");

// 用指定的 URL 替换当前页面
location.replace("https://www.example.com");

// 重新加载当前页面
location.reload();
```

通过 Location 对象的属性和方法，可以方便地获取和操作当前页面的 URL，并进行导航和页面刷新等操作。

## History 对象与浏览历史

---

History 对象是浏览器提供的内置对象之一，它用于管理浏览器的会话历史记录。

通过 `window.history` 或 `history` 可以访问到当前窗口的 History 对象。

#### History 对象的常用属性和方法

|History 对象的常用方法|对应操作|
|:-|:-:|
| `history.length` |返回浏览器历史记录中的页面数量|
| `history.back()` |导航到上一个页面（等同于点击浏览器的后退按钮）|
| `history.forward()` |导航到下一个页面（等同于点击浏览器的前进按钮）|
| `history.go(delta)` |根据指定的偏移量 delta 导航到历史记录中的特定页面。正数表示向前导航，负数表示向后导航|
| `history.pushState(state, title, url)` |将新的状态添加到浏览器历史记录中，并且不会导致页面的重新加载|
| `history.replaceState(state, title, url)` |用新的状态替换当前页面的状态，并且不会导致页面的重新加载|

#### 示例用法

```javascript
// 获取浏览器历史记录中的页面数量
console.log(history.length);

// 导航到上一个页面
history.back();

// 导航到下一个页面
history.forward();

// 导航到历史记录中的第三个页面
history.go(2);

// 将新的状态添加到浏览器历史记录中，并改变 URL
history.pushState({
    data: "state"
}, "Page Title", "new-url.html");

// 用新的状态替换当前页面的状态，并改变 URL
history.replaceState({
    data: "updated-state"
}, "Updated Page Title", "updated-url.html");
```

通过 History 对象的属性和方法，可以在浏览器的历史记录中导航、操作页面状态，并且可以在不刷新页面的情况下改变 URL，以实现更好的用户体验和页面交互。

## LocalStorage 和 SessionStorage

---

LocalStorage 和 SessionStorage 是 HTML5 提供的两个 Web 存储 API，用于在浏览器中存储数据。

它们的主要区别在于数据的生命周期和作用域：

### 1. LocalStorage

   - 数据生命周期：数据存储在本地，除非被显式删除，否则会一直保留在浏览器中。
   - 作用域：数据在同源的所有窗口、标签页和浏览器实例之间共享。

### 2. SessionStorage

   - 数据生命周期：数据存储在会话期间，当会话结束（浏览器关闭）时会被清除。
   - 作用域：数据仅在创建数据的窗口或标签页中有效，不同窗口或标签页之间的数据是隔离的。

### 使用方法

#### 1. 存储数据到 LocalStorage：

   

```javascript
   localStorage.setItem('key', 'value');
```

#### 2. 从 LocalStorage 中获取数据：

   

```javascript
   var value = localStorage.getItem('key');
```

#### 3. 从 LocalStorage 中移除数据：

   

```javascript
   localStorage.removeItem('key');
```

#### 4. 清除 LocalStorage 中的所有数据：

   

```javascript
   localStorage.clear();
```

SessionStorage 的使用方法与 LocalStorage 类似，只需将 `localStorage` 替换为 `sessionStorage` 即可。

LocalStorage 和 SessionStorage 是非常方便的用于在浏览器中存储数据的工具。它们可以存储字符串类型的数据，支持键值对的形式，可以在同一域名下的不同页面之间共享数据。通过这些 API，开发者可以在客户端存储和读取数据，以实现各种功能和交互需求。
