---
id: event
sidebar_position: 6
---

# 事件

## 事件简介

---

事件是指在特定操作或情况下触发的动作或响应。通过处理事件，可以在 Web 页面中实现交互和响应用户的操作。

### 1. 事件类型
事件可以是各种类型，包括用户交互事件（如点击、鼠标移动、键盘输入）、资源加载事件（如页面加载、图像加载）、表单事件（如提交、输入变化）、多媒体事件（如音频播放完成、视频暂停）等。

### 2. 事件监听器
为了捕获和处理事件，可以使用事件监听器（event listener）来注册对特定事件的监听。监听器是一个函数，当事件发生时会被调用。通过事件监听器，可以执行自定义的操作或响应。

### 3. 事件处理
事件处理是指在事件发生时执行的操作或函数。可以通过直接将函数赋值给事件监听器属性，或使用 `addEventListener()` 方法来注册事件监听器。

### 4. DOM 事件流
在 HTML 文档中，事件通过 DOM（文档对象模型）进行传播，沿着父子元素的层次结构传递。事件流有三个阶段：捕获阶段、目标阶段和冒泡阶段。可以通过在事件监听器中使用 `event.stopPropagation()` 方法来停止事件的传播。

### 5. 事件对象
在事件处理函数中，可以访问事件对象（event object），它提供了有关事件的详细信息，如事件类型、触发的元素、鼠标位置等。事件对象的属性和方法可以用于操作事件的相关信息。

### 6. 内联事件处理
除了使用事件监听器注册事件处理函数外，还可以在 HTML 元素的属性中直接指定事件处理代码，称为内联事件处理（inline event handling）。

JavaScript 的事件机制提供了丰富的功能和灵活性，使得我们能够对用户的操作和网页的状态进行响应和交互。通过事件处理，可以实现动态的用户体验和功能。



## 事件绑定与解绑
---
事件绑定和解绑是将事件监听器添加到元素或从元素中移除事件监听器的过程。事件绑定使我们能够响应特定的事件并执行相应的操作，而事件解绑则取消事件监听器，停止对事件的响应。

以下是事件绑定和解绑的方法：

#### 事件绑定：

##### 1. 直接属性赋值： 
通过直接将事件处理函数赋值给元素的事件属性，例如将点击事件绑定到按钮元素上：

```javascript
let button = document.getElementById('myButton');
button.onclick = function() {
  console.log('Button clicked!');
};
```


##### 2. addEventListener() 方法： 
使用 `addEventListener()` 方法可以在元素上添加事件监听器，允许多个事件监听器绑定到同一个元素的同一事件上，例如：

```javascript
let button = document.getElementById('myButton');
button.addEventListener('click', function() {
  console.log('Button clicked!');
});
```
可以使用 `addEventListener()` 方法绑定各种类型的事件，例如 click、mouseover、keydown 等。

#### 事件解绑：

##### 1. 直接属性赋值： 
通过将事件属性赋值为 null 可以移除事件监听器，例如：

```javascript
let button = document.getElementById('myButton');
button.onclick = null;
```


##### 2. removeEventListener() 方法： 
使用 `removeEventListener()` 方法可以从元素上移除特定的事件监听器，例如：

```javascript
let button = document.getElementById('myButton');
let clickHandler = function() {
  console.log('Button clicked!');
};
button.addEventListener('click', clickHandler);

// 在适当的时机解绑事件
button.removeEventListener('click', clickHandler);
```


>注意：
使用 `removeEventListener()` 方法解绑事件时，要确保传入的事件处理函数与绑定时使用的相同函数引用。

#### 小结
通过事件绑定和解绑，我们可以控制哪些事件将触发特定的处理函数，并可以根据需要在适当的时候添加或移除事件监听器。这使我们能够动态地管理元素的事件行为，并实现灵活的交互和功能。

### HTML 属性绑定

通过 `addEventListener()` 方法，可以将事件监听器添加到HTML元素上，并指定要执行的处理函数。

>以下是使用JavaScript进行HTML属性绑定的示例：
```javascript
let button = document.getElementById('myButton');
button.addEventListener('click', function() {
  alert('Button clicked!');
});
```
在这个示例中，我们通过 `getElementById()` 方法获取了一个具有 `id` 属性为 `myButton` 的按钮元素，并使用 `addEventListener()` 方法将点击事件绑定到该按钮上。
当按钮被点击时，匿名函数将被执行，弹出一个警示框显示消息 "Button clicked!"  。
 
####
值得注意的是，使用JavaScript进行HTML属性绑定相对于直接在HTML标记中使用属性绑定的方式，提供了更灵活和可控的事件处理能力。它允许添加多个事件监听器、动态绑定和解绑事件，以及更好地组织和管理代码。

另外，还可以使用其他方法如 `onclick` 、 `onkeyup` 等直接在HTML标记中进行属性绑定，这样也可以实现事件处理的绑定，但相比起使用 `addEventListener()` 方法， `addEventListener()` 方法更为简单和直接，适用于简单的交互场景。



### DOM0 级事件绑定
DOM0级事件绑定是指在JavaScript中使用对象属性来绑定事件处理函数的方式。这种方式在早期的JavaScript版本中被广泛使用。

DOM0级事件绑定的原理是将事件处理函数直接赋值给HTML元素对象的事件属性。

>例如，将点击事件绑定到按钮元素：
```javascript
var button = document.getElementById('myButton');
button.onclick = function() {
  alert('Button clicked!');
};
```
在这个示例中，通过获取具有 `id` 属性为 `myButton` 的按钮元素，并将点击事件的处理函数直接赋值给 `onclick` 属性，当按钮被点击时，事件处理函数将被执行，弹出一个警示框显示消息 "Button clicked!"。

#### DOM0级事件绑定的特点包括：
1. 直接在对象属性上绑定事件处理函数。
2. 每个事件属性只能绑定一个事件处理函数，后续的绑定将覆盖之前的绑定。
3. 事件处理函数在全局作用域中执行，因此可能存在命名冲突和作用域污染的问题。
4. 通过将事件属性赋值为null可以解除事件绑定。


#### 
DOM0级事件绑定相对简单，适用于简单的交互场景和快速原型开发。然而，它也有一些限制，如不能绑定多个事件处理函数和难以管理和组织代码等。随着JavaScript的发展，DOM0级事件绑定逐渐被addEventListener()等更灵活的事件绑定方式取代，推荐使用更先进的事件绑定方法来实现事件处理。

### DOM2 级事件绑定
DOM2级事件绑定是一种在JavaScript中使用`addEventListener()`方法来绑定事件处理函数的方式。它是在DOM Level 2规范中引入的，为JavaScript提供了一种更灵活和可扩展的事件绑定机制。

使用DOM2级事件绑定，可以将多个事件处理函数绑定到同一个元素的同一个事件上，而不会覆盖之前的绑定。还可以方便地解绑事件，以及在事件冒泡或捕获阶段进行事件处理。

以下是使用DOM2级事件绑定的示例：

```javascript
var button = document.getElementById('myButton');

button.addEventListener('click', function() {
  alert('Button clicked!');
});

button.addEventListener('mouseover', function() {
  console.log('Mouse over button');
});
```

在这个示例中，通过`getElementById()`方法获取具有`id`属性为`myButton`的按钮元素，并使用`addEventListener()`方法绑定了点击事件和鼠标悬停事件。当按钮被点击时，第一个事件处理函数将被执行并弹出一个警示框。当鼠标悬停在按钮上时，第二个事件处理函数将在控制台中输出一条消息。

DOM2级事件绑定的特点包括：

- 允许将多个事件处理函数绑定到同一个元素的同一个事件上。
- 通过使用`removeEventListener()`方法可以解绑事件。
- 提供了更灵活的事件处理方式，如事件捕获和事件冒泡。
- 事件处理函数可以在指定的阶段（捕获阶段或冒泡阶段）进行处理。

DOM2级事件绑定提供了一种更强大和可扩展的事件绑定机制，适用于复杂的交互和更灵活的事件处理需求。相比于DOM0级事件绑定，它具有更好的兼容性和更多的功能选项，是推荐使用的事件绑定方式之一。



## 事件对象
在JavaScript中，事件对象是在触发事件时由浏览器自动创建的对象，它包含与该事件相关的信息和属性。通过事件对象，我们可以获取触发事件的元素、事件的类型、鼠标位置、键盘按键等相关信息，以便进行相应的处理。

事件对象可以通过事件处理函数的参数传递给处理函数，常用的参数名为`event`、`e` 或 `evt` 。

以下是一些常用的事件对象属性和方法：

|事件对象属性和方法|作用|
|:-|:-:|
|`event.target`|获取触发事件的元素。|
|`event.type`|获取事件的类型，如`click`、`keydown`等。|
|`event.clientX` |获取鼠标在页面上的水平位置。|
 `event.clientY`|获取鼠标在页面上的垂直位置。|
|`event.keyCode`|获取按下的键盘按键的键码值。|
|`event.preventDefault()`|阻止事件的默认行为。|
|`event.stopPropagation()`|停止事件的传播，阻止事件冒泡。|

下面是一个简单的示例，展示如何使用事件对象来获取触发事件的元素和事件的类型：

```javascript
document.getElementById('myButton').addEventListener('click', function(event) {
  var target = event.target; // 获取触发事件的元素
  var eventType = event.type; // 获取事件的类型

  console.log('Target element:', target);
  console.log('Event type:', eventType);
});
```
在这个示例中，我们使用`addEventListener()`方法将点击事件绑定到`id`为`myButton`的按钮元素上，并在事件处理函数中使用`event.target`和`event.type`获取事件对象的相关信息。当按钮被点击时，事件处理函数将输出触发事件的元素和事件的类型到控制台。

通过事件对象，我们可以灵活地获取事件的相关信息，从而实现更加交互和动态的事件处理逻辑。


## 事件冒泡与捕获

---

事件冒泡和事件捕获是JavaScript中事件传播的两种不同方式。

#### 事件冒泡（Event Bubbling）
指事件从触发元素逐级向上冒泡到父元素或更高层级的祖先元素。换句话说，事件会先触发最内层的元素的事件处理函数，然后逐级向外层元素传播，直至达到最外层的元素。

#### 事件捕获（Event Capturing）
指事件从最外层元素开始向内层元素捕获，直到达到触发事件的元素。换句话说，事件会先触发最外层的元素的事件处理函数，然后逐级向内层元素传播，直至达到触发事件的元素。

####
在DOM中，默认情况下，事件是按照事件冒泡的方式传播的。这意味着当一个事件在一个元素上被触发时，它会依次触发该元素的父元素的事件处理函数，直到传播到文档的根节点。

你可以使用 `addEventListener()` 方法的第三个参数来指定事件传播的方式。如果参数为 `true`，则表示事件使用事件捕获方式传播；如果参数为 `false` 或者不提供该参数，则表示事件使用事件冒泡方式传播（默认值）。

以下是一个示例，展示事件冒泡和事件捕获的区别：

```javascript
document.getElementById('myButton').addEventListener('click', function(event) {
  console.log('Event bubbling - Button clicked!');
});

document.getElementById('myDiv').addEventListener('click', function(event) {
  console.log('Event bubbling - Div clicked!');
}, false);

document.getElementById('myDiv').addEventListener('click', function(event) {
  console.log('Event capturing - Div clicked!');
}, true);
```

在这个示例中，我们有一个按钮和一个包裹按钮的 `div` 元素。当按钮被点击时，按钮的事件处理函数将按照事件冒泡方式触发，输出 "Event bubbling - Button clicked!"。而当 `div` 元素被点击时，`div` 元素的事件处理函数将按照事件捕获方式触发，先输出 "Event capturing - Div clicked!"，然后再输出 "Event bubbling - Div clicked!"。

####
通过理解和使用事件冒泡和事件捕获，我们可以更好地控制和处理事件的传播过程，实现更灵活的事件处理逻辑。
