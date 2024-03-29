---
id: basic
sidebar_position: 2
---

# HTML 的基本结构
HTML的基础结构包文件类型声明、HTML、head和body标签。下面是一个基础的HTML5页面结构示例：
```bash
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>页面标题</title>
</head>
<body>
    <header>
        <!-- 页面头部内容 -->
    </header>
    
    <nav>
        <!-- 导航栏内容 -->
    </nav>
    
    <main>
        <!-- 主要内容 -->
    </main>
    
    <footer>
        <!-- 页面底部内容 -->
    </footer>
</body>
</html>


```
在这个示例中，我们使用了一些新的 HTML5 元素，如&#60header>、&#60nav>、&#60main>和&#60footer>，来更好地组织页面的结构。

以下是各部分的功能：

- &#60html>：HTML 文档的根源。
- &#60head>：定义文档的头部，包含了一些与文档相关的元数据和引用的外部资源。
- &#60meta charset="UTF-8">：指定文档的字符编码。
- &#60meta name="viewport" content="width=device-width, initial-scale=1.0">：用于设置移动设备的视频，确保网页在不同设备上显示一致。
- &#60title>：确定正义页面的标题。
- &#60body>：定义文档的主体内容。

在&#60body>标签内，我们一步一步详细的分解了页面的结构：
- &#60header>：用于包含页面的头部内容，例如网站的标签、标题等。
- &#60nav>：定义导航栏，包含页面的导航链接。
- &#60main>：包含页面的主要内容，如文章、图片、表格等。
- &#60footer>：包含页面的底部内容，如版本信息、联系方式等。
你可以根据自己的需要在这些部分添加更多的 HTML 元素来构建页面的具体内容。
## 文档类型声明
HTML 文档类型声明，通常称为文档类型声明或文档类型，是包含在 HTML 文档开头的指令，用于指定所使用的 HTML 或 XHTML 的版本。它通知网络浏览器和其他软件如何解释文档中的标记。

文档类型声明位于<!DOCTYPE>标记内，标记后跟 HTML 根元素 &#60html>。声明通常采用以下格式：
```bash
<!DOCTYPE html>
```
在上面的示例中，doctype 声明指定文档符合 HTML5 标准。HTML5 是超文本标记语言的最新版本，得到现代网络浏览器和工具的广泛支持。

doctype 声明有助于确保文档被 Web 浏览器正确呈现和解析。它还有助于确定浏览器显示文档的呈现模式（怪异模式或标准模式）。使用的特定文档类型声明会影响元素和 CSS 属性的解释和呈现方式。

重要的是要注意，在 HTML5 中，与具有更复杂的文档类型声明的以前版本的 HTML 相比，文档类型声明相对简单。HTML5 文档类型声明旨在向后兼容且易于记忆。

## HTML、head 和 body 标签
### 什么是 HTML 头部 head
在页面加载完成的时候，HTML 文档中的头部是不会显示在 web 浏览器的。它包含了诸如页面的 &#60title>（标题）、指向 CSS 的链接（如果你选择用 CSS 来为 HTML 内容添加样式）、指向自定义网页图标的链接和其他的元数据（描述 HTML 的数据，比如作者和描述文档的重要关键词）等信息。Web 浏览器将使用文档头部的信息正确渲染 HTML 文档。本文将涵盖上述内容并拓展，以便为你的标记工作打下良好基础。

HTML 头部包含 HTML &#60head> 元素的内容，与 &#60body> 元素内容不同，页面在浏览器加载后它的内容不会在浏览器中显示，它的作用是保存页面的一些元数据。上述示例的头部非常简短：
```bash
<head>
  <meta charset="utf-8" />
  <title>我的测试页面</title>
</head>
```
然而，大型页面的头部会相当大。可以试着到一些喜欢的网站上，使用开发者工具查看网页的头部内容。我们在这里的目的不是向你展示如何使用所有可能放在头部的东西，而是教你如何熟悉使用你想要包括在头部的主要元素。
#### 添加标题
&#60title> 元素是一项元数据，它可以为文档添加标题,用于表示整个 HTML 文档的标题（而不是文档内容）。
#### 元数据：&#60meta> 元素
元数据就是描述数据的数据，而 HTML 有一个“官方的”方式来为一个文档添加元数据——&#60meta> 元素。当然，其他在这篇文章中提到的东西也可以被当作元数据。有很多不同种类的 &#60meta> 元素可以被包含进你的页面的 &#60head> 元素，但是现在我们还不会尝试去解释所有类型，这只会引起混乱。
```bash
<meta charset="utf-8" />
```
这个元素简单的指定了文档的字符编码——在这个文档中被允许使用的字符集。utf-8 是一个通用的字符集，它包含了任何人类语言中的大部分的字符，意味着该 web 页面可以显示任意的语言；所以对于你的每一个页面都使用这个设置会是一个好主意！比如说，你的页面可以很好的处理英文和日文。
### 什么是 HTML 主体 body
在HTML中，&#60body>标签是用来确定正义文件的主体部分的。它包含了在网页上显示的所有内容，如文本、图像、链接、表格等。在标签中的内容会被浏览器解析并显示&#60body>在网页上。

下面是一个简单的例子，展示了如何使用&#60body>标签来确定网页的主体内容：
```bash
<!DOCTYPE html>
<html>
<head>
  <title>我的网页</title>
</head>
<body>
  <h1>欢迎来到我的网页</h1>
  <p>这是一个段落。</p>
  <img src="image.jpg" alt="我的图片">
  <a href="https://www.example.com">这是一个链接</a>
</body>
</html>
```
在上面的例子中，&#60body>标签包包含了一个&#60h1>标题元素、一&#60p>段落元素、一个&#60img>图像元素和一个&#60a>链接元素。这些元素的内容会在浏览器中显示出来，形成网页的可见部分。

需要注意的是，&#60body>标签必须在&#60html>标签内部，并位于&#60head>标签之后。
## 基本 HTML5 页面结构
一个基本的HTML5页面结构通常包含以下组成部分：
```bash
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>页面标题</title>
    <!-- 在<head>标签中引入样式表、脚本等 -->
    <link rel="stylesheet" href="styles.css">
    <script src="script.js"></script>
</head>
<body>
    <!-- 页面内容 -->
    <header>
        <h1>页面标题</h1>
    </header>
    <nav>
        <!-- 导航链接 -->
        <ul>
            <li><a href="#">链接1</a></li>
            <li><a href="#">链接2</a></li>
            <li><a href="#">链接3</a></li>
        </ul>
    </nav>
    <section>
        <h2>内容标题</h2>
        <!-- 内容段落 -->
        <p>这里是内容段落。</p>
        <!-- 更多内容 -->
    </section>
    <footer>
        <!-- 页脚内容 -->
        <p>版权信息等</p>
    </footer>
</body>
</html>
```
这是一个基本的HTML5页面结构示例，其中包含了&#60!DOCTYPE html>声明，用于指定文件类型为HTML5。&#60html>标签用于打包整个HTML文件。&#60head>标签用于于定义文档的头部，包含了页面的元数据和引用的外部资源，如样式表和脚本文件。&#60meta>标签用于指定文档的字符编写代码。&#60title>标签用于指定页面的标题。

&#60body>标签用于确定正义文档的主体内容，包含页面的实际显示内容。通常会在&#60body>中包包含网页的头部（&#60header>）、导航（&#60nav>）、主要内容区域（&#60section>）和页脚（&#60footer>）等部分。

在头部的&#60link>标签中可以引入外部样式（CSS文件），以作为页面设置样式。在头部的标签中&#60script>可以引入外部样式文件（JavaScript文件），以便为页面添加交互为和功能。

以上只是一个基本的HTML5页面结构示例，具体的页面结构可以根据实际需要进行扩展和调整。