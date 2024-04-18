---
id: html_basic
sidebar_position: 4
---

# HTML基础


## HTML 标题

用 VS Code修改 `html_css_basic/index.html`的 HTML 文件代码，内容如下：

```html title="index.html"
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> 案例01 </title>
  </head>

  <body>
    <h1>这是1号标题</h1>

    <h2>这是2号标题</h2>

    <h3>这是3号标题</h3>

    <h4>这是4号标题</h4>

    <h5>这是5号标题</h5>

    <h6>这是6号标题</h6>
  </body>
<html>
```


## HTML 段落

用 VS Code修改 `html_css_basic/index.html`的 HTML 文件代码，内容如下：

```html title="index.html"
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> 案例01 </title>
  </head>

  <body>
    <p>
      This paragraph
      contains a lot of lines
      but they are ignored.
    </p>

    <p>
      This paragraph<br>
      contains a lot of lines<br>
      and they are displayed.
    </p>
  </body>
<html>
```

### 加强，粗体，强调，斜体

## HTML 链接

HTML 中创建链接的基本语法和属性：`<a>` 元素，素具有以下属性：

- `href`：指定链接目标的URL，这是链接的最重要属性。可以是另一个网页的URL、文件的URL或其他资源的URL。
- `target`（可选）：指定链接如何在浏览器中打开。常见的值包括 `_blank`（在新标签或窗口中打开链接）和 `_self`（在当前标签或窗口中打开链接）。
- `title`（可选）：提供链接的额外信息，通常在鼠标悬停在链接上时显示为工具提示。

用 VS Code修改 `html_css_basic/index.html`的 HTML 文件代码，内容如下：

```html title="index.html"
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> 案例01 </title>
  </head>

  <body>
    <a href="https://www.baidu.com/">访问百度</a>
  </body>
<html>
```

## HTML 图片

HTML 中添加图片使用到了 `<img>`， `<img>`素具有以下属性：

- `src`： 属性指定了要显示的图像文件的路径。
- `alt`：属性用于提供图像的替代文本，当图像无法显示时，将显示这个文本。
- `width`：属性是用于设置图像的宽度。
- `height`：属性是用于设置图像的高度。


用 VS Code修改 `html_css_basic/index.html`的 HTML 文件代码，内容如下：

```html title="index.html"
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> 图像 </title>
  </head>

  <body>
    <img src="cat.jpg" alt="我的猫咪" width="300px" height: auto>
  </body>
<html>
```

:::tip `width`和`height`值的选择

`width` 和 `height` 属性用于设置 HTML 元素（如图片、文本框、表格等）的宽度和高度。这两个属性可以接受多种类型的值，包括：

1. 像素值（Pixels）：指定元素的宽度和高度以像素为单位。例如：`width="200px"`，`height="150px"`。
2. 百分比值（Percentage）：相对于父元素的宽度或高度的百分比值。例如：`width="50%"`，`height="75%"`。
这种方式可以实现相对布局，使元素根据父元素的大小进行自适应调整。
3. 相对值（Relative Values）：相对于元素本身的大小进行调整的值，如 `em`、`rem` 等。
例如：`width="2em"`，`height="3rem"`。
4. 自动值（Auto）：让浏览器自动决定元素的宽度或高度。
例如，对于图片，如果只指定了其中一个属性，而另一个属性未指定，
则未指定的属性将自动根据图片的原始尺寸进行调整。

:::


## HTML div元素

`<div>` 标签定义 HTML 文档中的内容分区。
它是一个通用容器，除非使用 CSS 进行样式设置，否则不会对内容产生任何影响。

作为一个“纯粹的”容器，`<div>` 元素在语义上不表示任何特定类型的内容。
然而，其可以将内容分组，从而可以更加方便定义内容的格式。

用 VS Code修改 `html_css_basic/index.html`的 HTML 文件代码，内容如下：

```html title="index.html"
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> 案例01 </title>
  </head>

  <body>
    <div>
      <p>这里可以是任何内容，一切由你作主！</p>
    </div>

  </body>
<html>
```

如前所述，除非使用 CSS 对 div 进行样式设置，否则它不会对内容产生任何影响。
让我们添加一个小 CSS 规则，对页面上的所有 div 进行样式调整。

用 VS Code修改 `html_css_basic/index.html`的 HTML 文件代码，内容如下：

```html title="index.html"
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> 案例01 </title>
    <style>
      div {
          border: 1px solid black;
          padding: 2px;
      }
    </style>
  </head>
  <body>
    <div>
      <div>
          <p>This is a paragraph inside stylized divs</p>
      </div>
    </div>
  </body>
<html>
```
先不要担心 CSS 的含义，我们将在后面的课程中进一步探讨 CSS。
总之，你将应用一条规则，为元素添加边框和一些可视化间距。


