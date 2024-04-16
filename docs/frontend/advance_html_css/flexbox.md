---
id: flexbox
sidebar_position: 2
---

# Flexbox 布局

与使用 HTML 创建的 div 和 box 容器一样，Flexbox 也是一种容器。Flexbox 可以克服 block 和 inline 等容器带来的限制，因为它能更好地在较大的网页上 Scale，还能对容器进行更动态的控制。这是因为它可以对容器内的项目进行增大、缩小和对齐，从而使程序员可以更好地控制容器内项目的内容和样式。

在了解使用 Flexbox 构建的常见布局之前，了解其中的属性和 Flexbox 的工作原理非常重要。让我们来研究一下 Flexbox 的一些重要特性以及可用于配置它们的属性。

Flexbox 是单维的，这意味着您可以沿行或列对齐，而且默认设置为行对齐。Flexbox 有两个轴，即主轴和横轴，就像几何坐标中使用的 x 轴和 y 轴一样。沿行对齐时，水平轴称为主轴，垂直轴称为横轴。对于 Flexbox 容器内的项目，放置位置从左上角开始沿主轴或横轴移动。当一行填满后，项目会继续放置到下一行。请注意，借助名为 "flex-direction "的属性，您可以将主轴翻转为垂直方向，这样横轴就会变成水平方向。在这种情况下，项目将从左上方开始，沿垂直主轴向下移动。您选择的属性将有助于更好地控制对齐方式、间距、方向以及容器和容器内项目的最终样式。

![](./images/flexbox_01.png)

现在，让我们来看看配置 Flexbox 的一些重要属性。

## Flexbox属性

新建一个 `html_css_advance`的文件夹，然后新建 `html_css_advance/index.html`和 `html_css_advance/sytle.css`两个文件。
用 VS Code 在`html_css_advance/index.html`文件添加如下代码：

```html title="index.html"
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Flexbox</title>
  </head>

  <body>
    <div class="flex-container">
      <div class="box box1">  One..</div>
      <div class="box box2">  Two..</div>
      <div class="box box3">  Three..</div>
      <div class="box box4">  Four..</div>
      <div class="box box5">  Five..</div>
      <div class="box box6">  Six..</div>
      <div class="box box7">  Seven..</div>
    </div>
  </body>
<html>
```

用 VS Code 在`html_css_advance/style.css`文件添加如下代码：

```css title="style.css"
.box{
    background-color: aquamarine;
    border-radius: 5px;
    margin: 2px;
    padding: 10px;
}
```

在网页浏览器中显示如下:


HTML 文件中有七个 div 容器。

相应的 CSS 文件包含了所有七个具有 box 类的 div 标记的规则。请注意，每个标记都有两个类名，一个是所有类中通用的，另一个是独立的。该样式将应用于所有容器。 

现在，让我们将 flex 容器转换为 flex，为其添加属性。 

`display:flex`;

用 VS Code 在`html_css_advance/style.css`将代码修改成如下：

```css title="style.css"

.flex-container{
    display: flex;
}

.box{
    background-color: aquamarine;
    border-radius: 5px;
    margin: 2px;
    padding: 10px;
}
```

现在输出的是七个从左上角开始从左到右排列的 flex 容器。在网页浏览器中显示如下:



## 对齐属性

让我们检查一下 flex 中的一些对齐属性。有四个主要属性用于对齐 flex 容器及其中的项目：  

- `justify-content`.用于在主轴上对齐项目。

- `align-items`.用于在横轴上对齐项目。

- `align-self`.用于交叉轴上唯一的柔性项目。

- 对齐内容。用于包装柔性线和控制空间。

其中，`justify-content`（对齐内容）和 `align-items` （对齐项目）经常用于各自的两个轴。 

我们先来看看 `justify-content` 的使用情况，它的默认值为 "左"。

### `justify-content`


用 VS Code 在`html_css_advance/style.css`将代码修改成如下：

```css title="style.css"
.flex-container{
    display: flex;
    justify-content: center
}

.box{
    background-color: aquamarine;
    border-radius: 5px;
    margin: 2px;
    padding: 10px;
}
```
在网页浏览器中显示如下:


### `flex-wrap`

此属性的默认值为 "nowrap"，这意味着项目将跨越轴的整个宽度。

用 VS Code 在`html_css_advance/style.css`将代码修改成如下：

```css title="style.css"
.flex-container{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

.box{
    background-color: aquamarine;
    border-radius: 5px;
    margin: 2px;
    padding: 10px;
}
```
在网页浏览器中显示如下:

现在，项目将按照可用 Viewport 的大小进行包边。 

### `flex-direction`

该属性用于设置主轴，默认为 "行"。这基本上意味着你要将 "主 "轴从水平行改为垂直列。 

用 VS Code 在`html_css_advance/style.css`将代码修改成如下：

```css title="style.css"
.flex-container{
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
}

.box{
    background-color: aquamarine;
    border-radius: 5px;
    margin: 2px;
    padding: 10px;
}
```
在网页浏览器中显示如下:


输出结果看起来与原始输出结果相似，但现在实际上是一个柔性输出结果。

现在，让我们再次对齐项目，并检查前面提到的其他属性。   

### `align-items`

横轴上的对齐是通过该属性完成的。让我们将其值改为 "flex-end"。 

用 VS Code 在`html_css_advance/style.css`将代码修改成如下：

```css title="style.css"
.flex-container{
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
    align-items:flex-end;
}

.box{
    background-color: aquamarine;
    border-radius: 5px;
    margin: 2px;
    padding: 10px;
}
```
在网页浏览器中显示如下:

结束 "指的是页面的右侧，因为左侧被视为开始。 

### `align-self`

该属性可用于 Flex 中的单个项目。 

用 VS Code 在`html_css_advance/style.css`将代码修改成如下：

```css title="style.css"
.flex-container{
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
    align-items:flex-end;
}

.box3{
    background-color: blanchedalmond;
    align-self: center;
}

.box{
    background-color: aquamarine;
    border-radius: 5px;
    margin: 2px;
    padding: 10px;
}
```
在网页浏览器中显示如下:

在这里，第三个方框的颜色和对齐方式已经更改，并且它覆盖了使用 align-items 设置的属性。

### 间隙：

`gap` 属性可用于在项目之间沿主轴创建空间。还可以使用行间隙和列间隙属性单独配置行和列的间隙。

用 VS Code 在`html_css_advance/style.css`将代码修改成如下：

```css title="style.css"
.flex-container{
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
    align-items:flex-end;
    gap:10px;
}
.box3{
    background-color: blanchedalmond;
    align-self: center;
}

.box{
    background-color: aquamarine;
    border-radius: 5px;
    margin: 2px;
    padding: 10px;
}
```
在网页浏览器中显示如下:



项目之间的间距有了明显的变化。 



### 其他

最后一组属性是 `flex-grow`、`flex-shrink` 和 `flex-basis`。这些属性共同决定了 flex 如何占用空间，如何根据可用空间增大或缩小。

这些都是名为 `flex` 的属性的子属性。借助 CSS 中的速记符号，还可以为这三个属性共同赋值。
速记符号可以帮助你使代码更紧凑，也更易于书写和遵循。
在速记符号中留空的值都是默认值。 

用 VS Code 在`html_css_advance/style.css`将代码修改成如下：

```css title="style.css"
.flex-container{
    display: flex;
    flex: 0 1 auto;
    justify-content: center;
    flex-wrap: wrap;
    align-items:flex-end;
    gap:10px;
}
.box3{
    background-color: blanchedalmond;
    align-self: center;
}

.box{
    background-color: aquamarine;
    border-radius: 5px;
    margin: 2px;
    padding: 10px;
}
```

在这里，`flex-container` 类的 `flex` 属性有一个设置规则。
这些值与三个属性相对应，即 `flex-grow` 设置为 0，`flex-shrink` 设置为 1，`flex-basis` 设置为 auto。
`flex-basis` 设置了容器的初始大小。它们共同定义了你想为 Flexbox 添加的刚性或灵活性和动态性。 

为了演示其效果，必须对代码稍作修改，删除设置为 "列 "的 `flex-direction` 值。
这将使其变为默认的 "行"，输出将再次居中对齐，并在两行之间实现最佳水平分布。 

在网页浏览器中显示如下:




其余代码保持不变。但是，如果修改代码，在 flex item box3 类中添加 flex 属性，输出结果将发生变化。 

用 VS Code 在`html_css_advance/style.css`将代码修改成如下：

```css title="style.css"
.flex-container{
    display: flex;
    flex: 0 1 auto;
    justify-content: center;
    flex-wrap: wrap;
    align-items:flex-end;
    gap:10px;
}

.box3{
    background-color: blanchedalmond;
    align-self: center;
    flex: 1 1 auto;
}
.box{
    background-color: aquamarine;
    border-radius: 5px;
    margin: 2px;
    padding: 10px;
}
```
在网页浏览器中显示如下:


