---
id: grid
sidebar_position: 3
---

# Grid 布局

## Grid 基础
CSS Grid 是一种用于创建网格布局的 CSS 模块。它提供了一种灵活且强大的方式来定义网格结构，使我们能够在网页上以行和列的形式布局元素。
## Grid 容器属性
Grid 容器属性是用于定义和控制 CSS Grid 布局的属性。以下是一些常用的 Grid 容器属性：

1、display: 设置元素为 Grid 容器。值为 grid 表示将元素设置为块级 Grid 容器，值为 inline-grid 表示将元素设置为内联 Grid 容器。

2、grid-template-columns: 定义网格的列模板。可以指定固定的宽度（如 200px），也可以使用相对单位（如 1fr 表示剩余空间的一个份）。多个值之间用空格分隔，每个值对应一个网格列。

3、grid-template-rows: 定义网格的行模板。与 grid-template-columns 类似，用法和语法相同，只是作用于网格的行。

4、grid-template-areas: 使用命名的网格区域来定义整个网格布局。通过在网格容器的子元素中设置 grid-area 属性，并指定区域名称，然后在网格容器中使用 grid-template-areas 属性来指定区域的位置。

5、grid-template: 是 grid-template-rows、grid-template-columns 和 grid-template-areas 属性的缩写形式，按顺序设置这三个值。

6、grid-gap: 定义网格单元之间的间隔。可以同时设置水平和垂直间隔，如 grid-gap: 10px 20px。

7、justify-items: 设置网格项目在网格单元内的水平对齐方式。可选值有 start、end、center、stretch 和 baseline。

8、align-items: 设置网格项目在网格单元内的垂直对齐方式。可选值有 start、end、center、stretch 和 baseline。

9、justify-content: 设置网格项目在网格容器中的水平对齐方式。可选值有 start、end、center、stretch、space-between、space-around 和 space-evenly。

10、align-content: 设置网格项目在网格容器中的垂直对齐方式。可选值有 start、end、center、stretch、space-between、space-around 和 space-evenly。

这些属性用于控制网格容器的布局和样式，通过调整这些属性的值，可以实现灵活且多样化的网格布局。

## Grid 项目属性
Grid 项目属性是用于定义和控制 CSS Grid 布局中网格项目的属性。以下是一些常用的 Grid 项目属性：

1、grid-column-start 和 grid-column-end：指定网格项目的起始列和结束列。可以使用线名称或编号来定义。例如，grid-column-start: 2 表示项目起始于第 2 列。

2、grid-row-start 和 grid-row-end：指定网格项目的起始行和结束行。使用线名称或编号定义。例如，grid-row-start: 1 表示项目起始于第 1 行。

3、grid-column 和 grid-row：是 grid-column-start、grid-column-end 和 grid-row-start、grid-row-end 的缩写形式。可以一次性指定项目的列和行范围。

4、grid-area：指定网格项目所占的网格区域。可以使用区域名称或使用 grid-row-start / grid-column-start / grid-row-end / grid-column-end 的语法。例如，grid-area: header 或 grid-area: 1 / 2 / 2 / 4。

5、justify-self：设置单个网格项目在水平方向上的对齐方式。可选值有 start、end、center、stretch 和 baseline。

6、align-self：设置单个网格项目在垂直方向上的对齐方式。可选值有 start、end、center、stretch 和 baseline。

7、order：定义网格项目的显示顺序。默认情况下，项目按照其在源代码中的顺序显示。通过为项目设置不同的 order 值，可以改变项目的显示顺序。

这些属性可以应用于 Grid 布局中的每个项目，用于控制项目的位置、尺寸和对齐方式。通过灵活地设置这些属性，可以创建复杂的网格布局，并调整项目的布局和显示效果。

## 实际布局示例
HTML 代码：
```bash
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
  <div class="item">6</div>
</div>
```
CSS 代码：
```bash
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;  /* 将容器分为三列，每列宽度相等 */
  grid-gap: 10px;  /* 设置网格单元之间的间隔为 10px */
}

.item {
  background-color: #ddd;
  padding: 20px;
  text-align: center;
}
```
在这个示例中，有一个包含六个项目的网格容器。通过将容器的 display 属性设置为 grid，将容器转换为 Grid 容器。

使用 grid-template-columns 属性，将容器分为三列，每列宽度相等。1fr 表示剩余空间的一个份，所以三列宽度平分。

通过 grid-gap 属性，设置网格单元之间的间隔为 10px，使项目之间有一定的间距。

每个项目都有相同的样式，包括背景颜色、内边距和文本居中。这些样式可以根据需要进行调整。

使用 CSS Grid 布局，可以轻松地创建具有复杂布局的网格结构，将项目放置在不同的单元格中，并自由调整网格的行列结构和样式。