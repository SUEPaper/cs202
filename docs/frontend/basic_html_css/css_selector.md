---
id: css_selector
sidebar_position: 9
---

# CSS选择器

在为网页设计样式时，有多种类型的选择器可供选择，开发人员在选择要应用 CSS 规则的 HTML 元素时，可以根据需要选择宽泛或具体的选择器。

在这里，你将了解到作为开发人员常用的一些 CSS 选择器。

## 元素选择器
元素选择器允许开发人员根据元素类型选择 HTML 元素。

例如，如果你使用p 作为选择器，那么该规则将应用于网页上的所有p 元素。

用 VS Code 在`html_css_basic/index.html`文件中的代码更改如下：

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
    <p>Once upon a time...</p>
    <p>In a hidden land...</p>
  </body>
<html>
```

用 VS Code 在`html_css_basic/style.css`文件添加如下代码：

```css title="style.css"
p { 
  color: blue; 
}
```

在网页浏览器中显示如下:



## ID 选择器

ID 选择器使用 HTML 元素的 id 属性。
由于 id 在网页中是唯一的，
因此开发人员可以使用它来选择特定元素进行样式设计。
ID 选择器的前缀是`#` 字符。


用 VS Code 在`html_css_basic/index.html`文件中的代码更改如下：

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
    <span id="latest">New!</span>
  </body>
<html>
```

用 VS Code 在`html_css_basic/style.css`文件添加如下代码：

```css title="style.css"
#latest { 
  background-color: purple; 
}
```

在网页浏览器中显示如下:


## 类选择器
还可以根据应用于元素的类属性来选择元素。CSS 规则已应用于具有指定类名的所有元素。类选择器的前缀是`.` 字符。

在下面的示例中，CSS 规则适用于两个元素，因为它们都应用了`navigation` CSS 类。

用 VS Code 在`html_css_basic/index.html`文件中的代码更改如下：

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
    <a class="navigation">Go Back</a>
    <p class="navigation">Go Forward</p>
  </body>
<html>
```

用 VS Code 在`html_css_basic/style.css`文件添加如下代码：

```css title="style.css"
.navigation { 
  margin: 2px;
  background-color: red;
}
```

在网页浏览器中显示如下:


类选择器的元素
选择 HTML 元素的更具体方法是，首先选择 HTML 元素，然后选择 CSS 类或 ID。

下面的示例选择了所有应用了 CSS 类**introduction** 的**p** 元素。

用 VS Code 在`html_css_basic/index.html`文件中的代码更改如下：

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
    <a class="navigation">Go Back</a>
    <p class="introduction">Go Forward</p>
  </body>
<html>
```

用 VS Code 在`html_css_basic/style.css`文件添加如下代码：

```css title="style.css"
p.introduction { 
  background-color: red;
}
```

在网页浏览器中显示如下:


## 后代选择器

如果需要选择包含在另一个选择器中的 HTML 元素，那么子代选择器就非常有用。

让我们举例说明。

用 VS Code 在`html_css_basic/index.html`文件中的代码更改如下：

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
    <div id="blog">
      <h1>Latest News</h1>
      <div>
        <h1>Today's Weather</h1>
        <p>The weather will be sunny</p>
      </div>
      <p>Subscribe for more news</p>
    </div>
    <div>
      <h1>Archives</h1>
    </div>
  </body>
<html>
```

用 VS Code 在`html_css_basic/style.css`文件添加如下代码：

```css title="style.css"
#blog h1 {
  color: blue;
}
```

在网页浏览器中显示如下:

CSS 规则将选择包含在 ID 为**blog** 的元素中的所有**h1** 元素。该 CSS 规则不适用于包含文本**Archives** 的**h1** 元素。

**后代选择符的结构是：一个 CSS 选择符，后跟一个空格字符，再后跟另一个 CSS 选择符。**

也可以选择多个后代。例如，要选择作为blog 元素后代的div 元素的后代的所有h1 元素，选择器的指定方式如下。


```css title="style.css"
#blog div h1 {
  color: blue;
}
```

## 子代选择器

子代选择器比后代选择器更具体。它们只选择选择器（父代）的直系后代（子代）元素。

用 VS Code 在`html_css_basic/index.html`文件中的代码更改如下：

```html title="index.html"
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>CSS Selector</title>
  </head>

  <body>
    <div id="blog">
      <h1>Latest News</h1>
      <div>
        <h1>Today's Weather</h1>
        <p>The weather will be sunny</p>
      </div>
      <p>Subscribe for more news</p>
    </div>
  </body>
<html>
```
如果要对包含文本**Latest News** 的**h1** 元素进行样式设置，可以使用以下子选择器：

用 VS Code 在`html_css_basic/style.css`文件添加如下代码：

```css title="style.css"
#blog > h1 {
  color: blue;
}
```

在网页浏览器中显示如下:


这将选择 ID 为**blog** 的元素（父元素），然后选择直接包含在该元素中的所有**h1** 元素（子元素）。
子代选择器的结构是：一个 CSS 选择器，后面是子代组合符号> ，再后面是另一个 CSS 选择器。

:::note 注意

这不会超出一个深度级别。因此，CSS 规则不会应用于包含文本**Today's Weather** 的**h1** 元素。

:::
