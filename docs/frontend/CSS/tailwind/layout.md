---
id: layout
sidebar_position: 3
---

# 布局与定位

## Display 属性
在 Tailwind CSS 中，display 属性用于控制元素的显示方式。Tailwind CSS 提供了一组方便的类来快速设置 display 属性的值。

下面是一些常用的 Tailwind CSS display 属性类：
- block：设置元素以块级方式显示，占据整个父容器的宽度，并在垂直方向上占据一行的空间。
- inline：设置元素以行内方式显示，根据内容的宽度进行布局，并在水平方向上与相邻元素共享空间。
- inline-block：设置元素以行内块级方式显示，根据内容的宽度进行布局，但可以设置宽度和高度，并在水平方向上与相邻元素共享空间。
- hidden：隐藏元素，使其不可见，并且不占据任何空间。
- flex：设置元素以弹性盒子方式显示，将其作为弹性容器，并允许使用弹性布局属性控制其子元素的排列。
- grid：设置元素以网格方式显示，将其作为网格容器，并允许使用网格布局属性控制其子元素的排列。
- table：设置元素以表格方式显示，将其作为表格容器，并允许使用表格布局属性控制其子元素的排列。
- table-row：设置元素以表格行方式显示，将其作为表格的行。
- table-cell：设置元素以表格单元格方式显示，将其作为表格的单元格。

除了上述常用的类之外，Tailwind CSS 还提供了更多的 display 相关类，例如 table-caption、table-column、table-column-group、table-footer-group 等，你可以根据具体需求进行使用。

你可以将这些类应用于 HTML 元素，例如：
```bash
<div class="block">This is a block-level element.</div>

<span class="inline">This is an inline-level element.</span>

<div class="flex">This is a flex container.</div>
```
通过使用 Tailwind CSS 提供的 display 相关类，你可以轻松设置元素的显示方式，快速构建和定制网页布局。
## Flexbox 布局
在 Tailwind CSS 中，你可以使用一组类来轻松实现弹性盒子（Flexbox）布局。Flexbox 是一种强大的布局技术，可以使元素在容器中灵活地排列、对齐和分布空间。

下面是一些常用的 Tailwind CSS Flexbox 布局类：

1、容器类：
- flex：将元素设为弹性容器。
- flex-row：将子元素水平排列。
- flex-col：将子元素垂直排列。
- flex-wrap：允许子元素换行。
- flex-no-wrap：禁止子元素换行。
- justify-start：子元素在主轴上左对齐。
- justify-end：子元素在主轴上右对齐。
- justify-center：子元素在主轴上居中对齐。
- justify-between：子元素在主轴上均匀分布，两端对齐。
- justify-around：子元素在主轴上均匀分布，每个元素周围有相同的空间。
- justify-evenly：子元素在主轴上均匀分布，包括两端和中间的空间。
- items-start：子元素在交叉轴上顶部对齐。
- items-end：子元素在交叉轴上底部对齐。
- items-center：子元素在交叉轴上居中对齐。
- items-baseline：子元素在交叉轴上以基线对齐。
- items-stretch：子元素在交叉轴上拉伸填充容器。

2、子元素类：
- flex-1：子元素占据剩余空间。
- flex-initial：子元素使用自身内容的宽度。
- flex-auto：子元素根据内容自动伸缩。
- order-&#60number>：调整子元素的顺序。
- self-start：子元素自身在交叉轴上顶部对齐。
- self-end：子元素自身在交叉轴上底部对齐。
- self-center：子元素自身在交叉轴上居中对齐。
- self-baseline：子元素自身在交叉轴上以基线对齐。
- self-stretch：子元素自身在交叉轴上拉伸填充容器。

通过将这些类应用于 HTML 元素，你可以轻松地创建弹性盒子布局，例如：
```bash
<div class="flex flex-wrap justify-center">
  <div class="flex-initial">Item 1</div>
  <div class="flex-1">Item 2</div>
  <div class="flex-initial">Item 3</div>
</div
```
## Grid 布局
在 Tailwind CSS 中，可以使用一组类来实现网格布局（Grid Layout）。网格布局是一种强大的布局技术，可以以网格形式对元素进行排列、对齐和分布。

下面是一些常用的 Tailwind CSS Grid 布局类：

1、容器类：
- grid：将元素设为网格容器。
- grid-cols-&#60num>：设置网格容器的列数。
- grid-rows-&#60num>：设置网格容器的行数。
- gap-&#60size>：设置网格容器中各单元格之间的间距。

2、子元素类：
- col-span-&#60num>：设置子元素跨越的列数。
- row-span-&#60num>：设置子元素跨越的行数。
- col-start-&#60num>：设置子元素开始的列索引。
- col-end-&#60num>：设置子元素结束的列索引。
- row-start-&#60num>：设置子元素开始的行索引。
- row-end-&#60num>：设置子元素结束的行索引。
通过将这些类应用于 HTML 元素，你可以轻松地创建网格布局，例如：
```bash
<div class="grid grid-cols-3 gap-4">
  <div class="col-span-2">Item 1</div>
  <div class="row-span-2">Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
  <div>Item 5</div>
</div>
```
上述代码将创建一个包含 3 列的网格容器，各单元格之间有 4 的间距。col-span-2 类将使第一个子元素跨越 2 列，row-span-2 类将使第二个子元素跨越 2 行。

通过使用 Tailwind CSS 提供的网格布局类，可以轻松地控制元素在网格中的排列和跨越，以创建复杂的网格布局。
## 定位（相对、绝对、固定、粘性）
在 Tailwind CSS 中，可以使用一组类来进行定位，包括相对定位、绝对定位、固定定位和粘性定位。这些类可以让你更灵活地控制元素在页面中的位置。

下面是一些常用的 Tailwind CSS 定位类：

1、相对定位（Relative Positioning）：
- relative：将元素设为相对定位，相对于其正常位置进行定位。
- top-&#60size>、bottom-&#60size>、left-&#60size>、right-&#60size>：通过指定偏移量，相对于元素的正常位置进行定位。

2、绝对定位（Absolute Positioning）：
- absolute：将元素设为绝对定位，相对于其最近的非静态（非默认定位）父元素进行定位。
- top-&#60size>、bottom-&#60size>、left-&#60size>、right-&#60size>：通过指定偏移量，相对于父元素进行定位。
- inset-&#60size>：通过指定偏移量，同时设置上、下、左、右偏移量。

3、固定定位（Fixed Positioning）：
- fixed：将元素设为固定定位，相对于浏览器窗口进行定位。
- top-&#60size>、bottom-&#60size>、left-&#60size>、right-&#60size>：通过指定偏移量，相对于浏览器窗口进行定位。

4、粘性定位（Sticky Positioning）：
- sticky：将元素设为粘性定位，根据滚动位置在相对定位和固定定位之间切换。
- top-&#60size>、bottom-&#60size>、left-&#60size>、right-&#60size>：通过指定偏移量，相对于滚动容器进行定位。

这些类可以与其他 Tailwind CSS 类组合使用，以达到所需的样式效果。例如：
```bash
<div class="relative">
  <div class="absolute top-0 left-0">Absolute positioned element</div>
  <div class="fixed bottom-0 right-0">Fixed positioned element</div>
  <div class="sticky top-0">Sticky positioned element</div>
</div>
```
上述代码展示了相对定位、绝对定位、固定定位和粘性定位的使用示例。

通过使用 Tailwind CSS 提供的定位类，可以轻松地控制元素的位置和行为，实现各种布局和交互效果。