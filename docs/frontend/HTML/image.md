---
id: image
sidebar_position: 6
---

# 图片标签
在一开始时，Web 仅有文本，那真的是很无趣。幸运的是，没过多久网页上就能嵌入图片和其他有趣的内容了。虽然还有许多其他类型的多媒体，但是从地位比较低的&#60img>元素开始是符合逻辑的，它常常被用来在网页中嵌入一张简单的图片。

## img 标签
我们可以用&#60img> 元素来把图片放到网页上。它是一个空元素（它不需要包含文本内容或闭合标签），最少只需要一个 src （一般读作其全称 *source）*来使其生效。src 属性包含了指向我们想要引入的图片的路径，可以是相对路径或绝对 URL，就像 &#60a> 元素的 href 属性一样。

举个例子，如果你有一幅文件名为 dinosaur.jpg 的图片，且它与你的 HTML 页面存放在相同路径下，那么你可以这样嵌入它：
```bash
<img src="dinosaur.jpg">
```
如果这张图片存储在和 HTML 页面同路径的 images 文件夹下（这也是 Google 推荐的做法，利于SEO/索引），那么你可以采用如下形式：
```bash
<img src="images/dinosaur.jpg">
```
也可以像使用绝对路径：
```bash
<img src="https://www.example.com/images/dinosaur.jpg">
```
但是这种方式是不被推荐的，这样做只会使浏览器做更多的工作，例如重新通过 DNS 再去寻找 IP 地址。通常我们都会把图片和 HTML 放在同一个服务器上。
## src 属性
在HTML中，src属性用于指定要在HTML元素中加载的外部资源的URL。

src属性通常与以下HTML元素一起使用：

1、&#60script>元素：用于指定要在页面中执行的JavaScript代码文件的URL。例如：
```bash
<script src="script.js"></script>
```
上面的代码将加载名为"script.js"的JavaScript文件并在页面中执行它。
## alt 属性
在HTML中，alt属性用于提供对图像的替代文本描述。它确定了一个文本字符，用于描述图像的内容或功能，以方便在无法显显示图像或用户使用屏幕阅读器时提供替代信息。

alt性质是可选择的，但在访问性方面非常重要。它有助于无障碍用户了解图像的内容，以及提供搜索引擎和浏览器插入更好的理解图像的上下文。

例如，上面的例子可以做如下改进：
```bash
<img src="images/dinosaur.jpg"
     alt="The head and torso of a dinosaur skeleton;
          it has a large head with long sharp teeth">
```
以下是一些说明示例使用方法：
```bash
<img src="image.jpg" alt="Sunset over the ocean">
```
上面的代码显示了一个图像，并使用alt属性提供了图像的描述。如果图像无法加载或用户使用屏幕阅读器，将会读到描述而不是图像。
```bash
<img src="avatar.png" alt="User Avatar">
```
在这个示例中，alt属性提供了一个描述用户头像的文本。
```bash
<img src="chart.png" alt="Sales Chart" aria-label="Monthly Sales">
```
在这个演示例中，alt属性提供了图形的描述，而aria-label属性提供了更全面的标签，描述了图形的通用功能或用途。

请注意，alt属性还有其他一些使用方法和最佳实践，例如对于装饰性图像或工具有复述描述的图像。确保在使用alt属性时随无障碍性指南和最佳实践。