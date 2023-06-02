---
id: dom
sidebar_position: 5
---

# DOM 

## 一、DOM 简介

---

DOM（文档对象模型）是一种表示和操作HTML、XML和XHTML文档的标准编程接口。它将Web页面视为由层次结构的节点组成的文档，并提供了一组方法和属性，使开发人员可以通过JavaScript脚本动态地访问和修改文档的内容、结构和样式。

DOM以树状结构表示文档，其中每个节点都是文档的一部分，可以是元素、文本、注释、属性等。DOM节点可以通过JavaScript脚本进行遍历、查询和操作。

JavaScript中的DOM提供了一些重要的对象和方法
>例如：
1. document对象：
   表示整个文档，是DOM树的根节点。可以使用document对象获取和修改文档的各个元素和属性。
2. 元素对象：
   表示HTML文档中的元素，如 `<div>` 、 `<p>` 、 `<a>` 等。可以使用元素对象的属性和方法来访问和修改元素的内容、样式和属性。
3. 事件对象：
   在JavaScript中，事件对象提供了有关事件的详细信息，如事件类型、触发的元素、鼠标位置等。可以使用事件对象来处理用户的交互操作。

通过JavaScript中的DOM，我们可以通过编程的方式实现以下功能：

- 动态地创建、插入和删除HTML元素。
- 修改元素的文本内容、属性和样式。
- 操作表单元素，获取和设置用户输入的值。
- 注册事件监听器，响应用户的交互操作。
- 遍历和搜索文档中的元素，进行查询和操作。
- 与服务器进行交互，动态更新页面内容。


DOM在JavaScript中扮演着重要的角色，使开发人员能够通过脚本语言操作和控制网页的结构和内容，实现交互性和动态性的Web应用程序。



## 二、获取 DOM 元素

---
要获取 DOM 元素（Document Object Model element）的引用，可以使用以下几种常见的方式：

### 1. 通过 ID 获取

```javascript 
let element = document.getElementById('elementId'); 

```

### 2. 通过选择器获取

- 通过类名：
```javascript
let element = document.getElementById('elementId');
```

* 通过标签名：

```javascript
let elements = document.getElementsByTagName('tagName');
```

* 通过选择器：

```javascript
let element = document.querySelector('selector');
let elements = document.querySelectorAll('selector');
```

### 3. 通过 CSS 类选择器获取

```javascript
let elements = document.querySelectorAll('.className');
```

### 4. 通过属性选择器获取

```javascript
let elements = document.querySelectorAll('[attribute="value"]');
```

### 5. 通过父元素获取子元素

* 通过类名：

```javascript
let parentElement = document.getElementById('parentId');
let elements = parentElement.getElementsByClassName('className');
```

* 通过标签名：

```javascript
let parentElement = document.getElementById('parentId');
let elements = parentElement.getElementsByTagName('tagName');
```

* 通过选择器：

```javascript
let parentElement = document.getElementById('parentId');
let element = parentElement.querySelector('selector');
let elements = parentElement.querySelectorAll('selector');
```

### 6. 通过索引获取

* 通过父元素的子节点列表索引：

```javascript
let parentElement = document.getElementById('parentId');
let element = parentElement.childNodes[index];
```

* 通过类名或标签名在获取的元素集合中的索引：

```javascript
let elements = document.getElementsByClassName('className');
let element = elements[index];
```

## 三、操作 DOM 元素属性

---

### 1. 获取属性的值

通过属性名获取元素的属性值：

```javascript
let element = document.getElementById('elementId');
let attributeValue = element.getAttribute('attributeName');
```

### 2. 设置属性的值

通过属性名设置元素的属性值：

```javascript
let element = document.getElementById('elementId');
element.setAttribute('attributeName', 'attributeValue');
```

### 3. 移除属性：

通过属性名移除元素的属性：

```javascript
let element = document.getElementById('elementId');
element.removeAttribute('attributeName');
```

### 4. 操作 class 属性

#### 1）添加类名：

```javascript
let element = document.getElementById('elementId');
element.classList.add('className');
```

#### 2）移除类名：

```javascript
let element = document.getElementById('elementId');
element.classList.remove('className');
```

#### 3）切换类名的状态：

```javascript
let element = document.getElementById('elementId');
element.classList.toggle('className');
```

### 5. 操作样式属性：

* 获取样式属性值：

```javascript
let element = document.getElementById('elementId');
let styleValue = element.style.propertyName;
```

* 设置样式属性值：

```javascript
let element = document.getElementById('elementId');
element.style.propertyName = 'propertyValue';
```

### 6. 操作元素内容：

* 获取元素的文本内容：

```javascript
let element = document.getElementById('elementId');
let textContent = element.textContent;
```

* 设置元素的文本内容：

```javascript
let element = document.getElementById('elementId');
element.textContent = 'New Text Content';
```

* 获取元素的 HTML 内容：

```javascript
let element = document.getElementById('elementId');
let htmlContent = element.innerHTML;
```

* 设置元素的 HTML 内容：

```javascript
let element = document.getElementById('elementId');
element.innerHTML = '<p>New HTML Content</p>';
```

## 四、操作 DOM 元素样式

---

### 1. 修改元素的类名（class）

* 添加类名：

```javascript
let element = document.getElementById('elementId');
element.classList.add('className');
```

* 移除类名：

```javascript
let element = document.getElementById('elementId');
element.classList.remove('className');
```

* 切换类名的状态：

```javascript
let element = document.getElementById('elementId');
element.classList.toggle('className');
```

### 2. 直接修改元素的样式属性

* 修改单个样式属性：

```javascript
let element = document.getElementById('elementId');
element.style.propertyName = 'propertyValue';
```

* 修改多个样式属性：

```javascript
let element = document.getElementById('elementId');
element.style.cssText = 'property1: value1; property2: value2;';
```

### 3. 获取或设置计算后的样式属性值

* 获取计算后的样式属性值：

```javascript
let element = document.getElementById('elementId');
let computedStyle = getComputedStyle(element);
let propertyValue = computedStyle.getPropertyValue('propertyName');
```

* 设置样式属性值：

```javascript
let element = document.getElementById('elementId');
element.style.setProperty('propertyName', 'propertyValue');
```

### 4. 使用 CSS 类名和样式表（StyleSheet）

* 添加或移除 CSS 类名：

```javascript
let element = document.getElementById('elementId');
element.classList.add('className');
element.classList.remove('className');
```

* 使用内联样式表：

```javascript
let element = document.getElementById('elementId');
element.style.cssText = 'property1: value1; property2: value2;';
```

* 使用外部样式表（通过修改元素的 class 属性来应用样式）：

```javascript
let element = document.getElementById('elementId');
element.className = 'className';
```




## 五、DOM 元素的创建、插入与删除

---

### 1. 创建元素
可以使用 `document.createElement(tagName)`  方法创建一个新的 DOM 元素。其中 `tagName` 是要创建的元素的标签名。

```javascript
let newElement = document.createElement('div');
```

### 2. 设置元素属性和内容
可以使用 `element.setAttribute(attributeName, attributeValue) ` 方法设置元素的属性，使用 `element.textContent` 或 `element.innerHTML` 设置元素的文本内容或 HTML 内容。

```javascript
newElement.setAttribute('id', 'newElementId');
newElement.textContent = 'This is a new element';
```

### 3. 插入元素到父元素中
可以使用父元素的 `appendChild(childElement)` 方法将一个元素插入到父元素的末尾，或使用 `insertBefore(newElement, referenceElement)` 方法在指定的参考元素之前插入一个新元素。

```javascript
let parentElement = document.getElementById('parentElementId');
parentElement.appendChild(newElement);
```

或

```javascript
let referenceElement = document.getElementById('referenceElementId');
parentElement.insertBefore(newElement, referenceElement);
```


### 4. 删除元素
可以使用父元素的 `removeChild(childElement)` 方法从父元素中移除一个子元素。

```javascript
parentElement.removeChild(childElement);
```

### 注意事项

插入和删除元素的操作都需要有对应的父元素和要插入/删除的子元素的引用。

插入元素时，可以使用 `appendChild()` 将元素插入到父元素的末尾，或使用 `insertBefore()` 在参考元素之前插入。

删除元素时，要从父元素中调用 `removeChild()` 方法，并传入要删除的子元素的引用。

通过以上方法，可以在 JavaScript 中动态地创建、插入和删除 DOM 元素，以实现动态的页面交互和内容更新。