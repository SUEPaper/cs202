---
id: css_doc_flow
sidebar_position: 12
---

# 文档流程--分块与内联

CSS 的文档流程涉及两种基本类型的元素布局：
分块元素（Block-level elements）和内联元素（Inline elements）。

## 分块元素

**分块元素**是指在文档流中占据整行的元素，它们会在文档中自动换行，并且会尽可能占据其父容器的全部宽度。
常见的分块元素包括 `<div>`、`<p>`、`<h1> `到 `<h6>`、`<ul>`、`<ol>`、`<li>` 等。

在 CSS 中，分块元素通常具有以下特征：

- 默认情况下，分块元素会自动换行，每个分块元素都会在页面上单独占据一行。
- 可以设置宽度、高度、内外边距等属性，以及背景色、边框等样式。
- 可以包含其他分块元素和内联元素，以及文本内容。

用 VS Code修改 `html_css_basic/index.html`的 HTML 文件代码，内容如下：

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Block-level Elements</title>
    <link rel="stylesheet" href="styles.css">   
</head>
<body>
    <!-- 分块元素示例 -->
    <div>
        <p>This is a block-level element.</p>
        <p>It occupies the entire width of its container.</p>
    </div>
</body>
</html>
```

用 VS Code 修改`html_css_basic/style.css`代码成如下所示：

```css title="style.css"
div {
    width: 300px;
    height: 200px;
    background-color: lightblue;
    border: 1px solid #000;
    padding: 20px;
    margin-bottom: 20px;
}
```

## 内联元素

**内联元素**是指在文档流中不会换行的元素，它们会在同一行内显示，并且尽可能地紧凑排列。
常见的内联元素包括 `<span>`、`<a>`、`<strong>`、`<em>`、`<img>`、`<input>` 等。

在 CSS 中，内联元素通常具有以下特征：

- 默认情况下，内联元素不会在页面上换行，它们会在同一行内显示。
- 设置宽度和高度属性对内联元素没有效果，它们的宽度和高度由其内容决定。
- 可以设置内外边距、背景色、边框等样式，但是对文本样式的影响更为显著。


用 VS Code修改 `html_css_basic/index.html`的 HTML 文件代码，内容如下：

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inline Elements</title>
    <link rel="stylesheet" href="styles.css">   
</head>
<body>
    <!-- 内联元素示例 -->
    <p>This is an <span>inline</span> element.</p>
    <p>It stays on the same line as other inline elements.</p>
</body>
</html>

```

用 VS Code 修改`html_css_basic/style.css`代码成如下所示：

```css title="style.css"
span {
    background-color: lightgreen;
    padding: 5px;
    border: 1px solid #000;
    margin-right: 10px;
}
```


## 内联块元素（Inline-block elements）

内联块元素是一种结合了内联元素和块级元素特性的元素类型。
它们表现得像内联元素一样，可以在同一行内排列，同时又像块级元素一样，可以设置宽度、高度、内外边距等属性。
这使得内联块元素非常适合用于创建水平排列的元素组，同时又能够控制元素的尺寸和样式。

特点：
- 内联块元素可以在同一行内显示，并且可以设置宽度、高度、内外边距等属性。
- 与块级元素不同，内联块元素不会在页面上单独占据一行，而是可以与其他元素在同一行内排列。
- 与内联元素不同，内联块元素可以设置宽度和高度属性，并且可以包含其他块级元素和内联元素。


用 VS Code修改 `html_css_basic/index.html`的 HTML 文件代码，内容如下：

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inline-block Elements</title>
    <link rel="stylesheet" href="styles.css">   
</head>
<body>
    <!-- 内联块元素示例 -->
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
</body>
</html>
```

用 VS Code 修改`html_css_basic/style.css`代码成如下所示：

```css title="style.css"
.box {
    display: inline-block;
    width: 100px;
    height: 100px;
    background-color: lightblue;
    border: 1px solid #000;
    margin-right: 10px;
}
```

## display属性

这三种元素，可以通过display属性来相互转化，不过实际开发中，块元素用得比较多，所以我们经常把内联元素转化为块元素，少量转化为内联块，而要使用内联元素时，直接使用内联元素，而不用块元素转化了。

常用属性有：

1. `none` 元素隐藏且不占位置
2. `block` 元素以块元素显示
3. `inline` 元素以内联元素显示
4. `inline-block` 元素以内联块元素显示