---
id: css_basic
sidebar_position: 8
---

# CSS基础

CSS（层叠样式表）是一种用于控制网页样式和布局的标记语言。
它允许开发人员定义网页中元素的外观、排版、颜色和其他方面的样式，从而使网页呈现出美观、一致和可读性强的外观。
CSS3 是 CSS 的最新版本，它引入了许多新的功能和特性，以提供更强大、更灵活的样式设计能力。

以下是CSS的一些基本概念和功能：


1. **选择器（Selectors）**：CSS 使用选择器来选择要应用样式的 HTML 元素。选择器可以基于元素的标签名、类名、ID、属性等来进行选择。
2. **属性（Properties）**：CSS 属性是用于定义元素样式的具体规则。例如，color 属性用于定义文本颜色，font-size 属性用于定义字体大小。
3. **值（Values**）：每个属性都有一个或多个可能的值，用于指定该属性的具体样式。例如，color 属性的值可以是颜色的名称（如 "red"）、十六进制值（如 "#FF0000"）或 RGB 值（如 "rgb(255, 0, 0)"）。
4. **盒模型（Box Model）**：在 CSS 中，每个 HTML 元素都被视为一个矩形的盒子，具有内容区域、内边距、边框和外边距。开发人员可以使用 CSS 来控制这些盒子的大小、间距和边框样式。
5. **层叠和继承（Cascading and Inheritance）**：CSS 样式可以层叠在一起，多个样式规则可能会同时应用到同一个元素上。此外，某些样式属性可以被子元素继承，从而使得在父元素上设置的样式可以自动应用到其子元素上。
7. **弹性盒子布局（Flexbox）**：是一种用于一维布局的布局模型，它可以沿着一个方向（水平或垂直）对元素进行布局。主要用于排列一组元素（通常是在同一个轴线上），并让它们在父容器中进行灵活的伸缩和对齐。
8. **网格布局（Grid）**：Grid 是一种用于二维布局的布局模型，它允许开发人员在水平和垂直方向上同时对元素进行布局。主要用于创建复杂的网格结构，使得网页布局更加灵活和精确。
7. **响应式设计（Responsive Design）**：CSS 可以通过媒体查询和其他技术来实现响应式设计，使网页可以适应不同尺寸和设备的屏幕，并提供更好的用户体验。


:::tip 选择使用 Flexbox 还是 Grid？

使用 Flexbox：当布局是一维的，并且元素在同一个轴线上排列时，Flexbox 是一个更好的选择，例如导航菜单、工具栏等。

使用 Grid：当布局需要二维结构，并且需要更精确地控制元素的位置和大小时，Grid 是一个更好的选择，例如网页主体布局、复杂的表格等。

:::


## HTML 如何使用CSS

### 内联样式（Inline Styles）

直接在 HTML 元素的 `style` 属性中指定 CSS 样式。这种方式会将样式与元素直接绑定，适用于单个元素或特定样式不会在其他地方重复使用的情况。

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
    <p style="color: red; font-size: 16px;">这是一段红色的文本。</p>
  </body>
<html>
```

### 内部样式表（Internal Style Sheet）

在 HTML 文件的 `<head>` 标签中使用 `<style>` 标签定义 CSS 样式。这种方式适用于单个 HTML 文件或页面，但样式可以在多个元素中共享。

用 VS Code修改 `html_css_basic/index.html`的 HTML 文件代码，内容如下：

```html title="index.html"
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> 案例01 </title>
    <style>
        p {
            color: blue;
            font-size: 14px;
        }
    </style>
  </head>

  <body>
    <p>这是一段蓝色的文本。</p>
  </body>
<html>
```


### 外部样式表（External Style Sheet）

将 CSS 样式单独存储在一个或多个外部 `.css` 文件中，然后在 HTML 文件中使用 `<link>` 标签引入。
这种方式适用于多个 HTML 文件共享相同样式的情况，提高了代码的可维护性和可复用性。

新建一个文件`html_css_basic/style.css`，请用VS Code给该文件增加如下代码：

```css title="style.css"
p {
    color: green;
    font-size: 18px;
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
    <link rel="stylesheet" href="style.css">   
  </head>

  <body>
    <p>这是一段样式来自外部样式表的文本。</p>
  </body>
<html>
```