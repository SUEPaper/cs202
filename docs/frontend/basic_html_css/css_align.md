---
id: css_align
sidebar_position: 13
---

# 对齐基础知识


让我们来探讨如何使用 CSS 对齐文本和 HTML 元素。

首先，让我们关注水平对齐。垂直对齐比较困难，因此稍后我们将探讨垂直对齐。

## 文本对齐

对齐 HTML 元素中的文本非常简单。为此，您可以使用`text-align` CSS 属性。在下面的示例中，CSS 规则设置所有段落元素的文本居中对齐。

请用VS Code修改`html_css_basic/style.css`代码如下：

```css title="style.css"
#center {
  text-align: center;
}
```

用 VS Code修改 `html_css_basic/index.html`的 HTML 文件代码，内容如下：

```html title="index.html"
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> 案例01 </title>
    <link rel="stylesheet" href="styles.css">   
  </head>

  <body>
    <p id="center">文本居中</p>
    <p>文本不居中</p>
  </body>
<html>
```

文本对齐方式可设置为`left` 、`right` 、`center` 和`justify` 。

`justify` 对齐方式将文本分散开来，使文本的每一行都有相同的宽度。

对于从左到右的语言（如英语），默认对齐方式为`left` 。对于从右到左的语言（如阿拉伯语），默认对齐方式为`right` 。

## HTML 元素居中对齐

要使元素居中对齐，需要为元素设置一个宽度，并将其边距（margins）向外推，以填充父元素的剩余可用空间，如下所示的 HTML 结构：

```html title="index.html"
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> 案例01 </title>
    <link rel="stylesheet" href="styles.css">   
  </head>

  <body>
    <div class="parent">
      <div class="child">
      </div>
    </div>
  </body>
<html>
```


在 CSS 中，将`parent` 元素设置为红色边框，以显示其所占空间：

```css title="style.css"
.parent {
  border: 4px solid red;
}
```

`child` 元素的宽度等于`parent` 元素的 50%，填充为 20 像素。请注意，`padding: 20px `是将上下左右的 padding 设置为`20px` 的缩写。为使所占空间可视化，请将边框设置为绿色：

```css title="style.css"
.parent {
  border: 4px solid red;
}

.child {
  width: 50%;
  padding: 20px;
  border: 4px solid green;
}
```

要使元素居中对齐，可将`margin` 属性设置为`auto` 。`auto` 将告诉浏览器根据可用空间自动计算边距。

```css title="style.css"
.parent {
  border: 4px solid red;
}

.child {
  width: 50%;
  padding: 20px;
  border: 4px solid green;
  margin: auto;
}
```

结果是`child` 元素位于`parent` 元素的中心：

![](./images/align_01.png)

需要注意的是，这是因为`div` 元素是块级元素。  

如果要对齐`img` 这样的内联元素，则需要将其改为块级元素。与`div` 的示例类似，你可以将`img` 添加到父元素中（图片自行寻找）：

```html title="index.html"
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> 案例01 </title>
    <link rel="stylesheet" href="styles.css">   
  </head>

  <body>
    <div class="parent">
      <img src="photo.png" class="child">
    </div>
  </body>
<html>
```


然后，CSS 规则会将`img` 元素改为块级元素，并将其边距设置为`auto`:

```css title="style.css"
.parent {
  border: 4px solid red;
}

.child {
  display: block;
  width: 50%;
  margin: auto;
}
```

更准确地说，在 CSS 中，你只能将左边距和右边距设置为自动。这样，你就可以根据需要将上边距和下边距设置为特定值。

```css title="style.css"
.parent {
  border: 4px solid red;
}

.child {
  display: block;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}
```

## HTML 元素左右对齐

左右对齐元素最常用的两种方法是使用`float` 属性和`position` 属性。

`position` 属性有多个值选项，可影响元素在文档流中的显示方式。
本次教程不探讨如何使用`position` 属性，可自行了解其用法。

现在，让我们重点讨论`float` 属性。

`float` 属性设置元素相对于父元素中文本内容的位置。文本将围绕元素展开。

在下面的示例中，图片将对齐到`div` 元素的右侧。文本内容将围绕图片展开：


```html

<section>
  <div class="left">1</div>
  <div class="left">2</div>
  <div class="right">3</div>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tristique
    sapien ac erat tincidunt, sit amet dignissim lectus vulputate. Donec id
    iaculis velit. Aliquam vel malesuada erat. Praesent non magna ac massa
    aliquet tincidunt vel in massa. Phasellus feugiat est vel leo finibus
    congue.
  </p>
</section>

```


```css
section {
  box-sizing: border-box;
  border: 1px solid blue;
  width: 100%;
  float: left;
}

div {
  margin: 5px;
  width: 50px;
  height: 150px;
}

.left {
  float: left;
  background: pink;
}

.right {
  float: right;
  background: cyan;
}

```


:::warning

使用 `float` 时，请注意，浮动元素后面的所有元素的布局都可能会调整。
为了防止出现这种情况，您可以清除浮动元素，方法是对浮动元素之后的元素使用 `clear: both`，
或对浮动元素的父级使用 `display: flow-root`。

:::