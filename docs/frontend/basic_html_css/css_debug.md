---
id: css_debug
sidebar_position: 14
---

# CSS调试

你有时写 CSS 会碰到这样的问题：结果看起来和你想的不太一样。你可能会认为 selector（选择器）匹配到了元素但是什么都没发生，还可能会觉得盒子的大小与你想的有出入。这篇文章会教你着手调试 CSS，向你展示现代浏览器中的 DevTools 是怎样让你更方便地获悉发生了什么。

```html

<html lang="en-us"><head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Inspecting CSS</title>

    <style>
      body {
        background-color: #fff;
        color: #333;
        font:
          1.2em / 1.5 Helvetica Neue,
          Helvetica,
          Arial,
          sans-serif;
        padding: 0;
        margin: 0;
      }

      .container {
        padding: 20px 10px;
        max-width: 900px;
        margin: 40px auto;
      }

      .box1 {
        width: 400px;
        margin: 0 0 40px 0;
        padding: 20px;
        border: 5px solid rgb(75 70 74);
        border-radius: 0.5em;
      }

      .box2 {
        box-sizing: border-box;
        width: 400px;
        margin: 0 0 40px 0;
        padding: 20px;
        border: 5px solid rgb(78 17 66);
        border-radius: 0.5em;
      }

      .special {
        color: orange;
      }

      em {
        color: hotpink;
        font-weight: bold;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="box1">
        <p>
          Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh
          onion daikon amaranth tatsoi tomatillo melon azuki bean garlic.
        </p>
      </div>

      <div class="box2">
        <p>
          Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot
          courgette tatsoi pea sprouts fava bean collard greens dandelion okra
          wakame tomato. Dandelion cucumber earthnut pea peanut soko zucchini.
        </p>
      </div>

      <p>
        Turnip <em class="special">greens</em> yarrow ricebean rutabaga endive
        cauliflower <em>sea lettuce</em> kohlrabi amaranth water spinach avocado
        daikon napa cabbage asparagus winter purslane kale. Celery potato
        scallion desert raisin horseradish spinach carrot soko.
      </p>
    </div>
  

</body>
</html>
```

## 审查 CSS

从页面上选择一个元素，可以通过以下方法：右键该元素，选择审查元素（Inspect）；从 DevTools 左侧 HTML tree 中选择该元素。试试选择 class 为 box1 的元素吧，它是页面上的第一个元素，周围画有边框。



如果查看 HTML 右边的 Rules view 栏，你应该能看到该元素的 CSS 属性与值。你能看到直接应用到 box1 类上的规则，还有其继承了祖先的 CSS（该例中指 `<body>`）。这在一种情况下就很有帮助——你看到有些 CSS 并非在计划之内（或许它们继承自某个父元素然而你没有覆盖它们）。

另一个有用的功能是将简写属性展开的功能。在我们的示例里面使用了 margin 的简写。

点击小箭头来展开界面，显示不同的完整属性和它们的值。

你可以在 Rules view 面板活动的时候打开或关闭值，在你将光标悬浮在上面的时候，就会出现勾选框。取消勾选一个规则的勾选框，例如 border-radius，CSS 就会停止应用。

你可以运用这个功能来进行对照实验，来决定是否有东西会在应用了一条规则的时候变得更好看，同时也有助于调试，例如如果一个布局出错，你正在研究究竟是哪项属性是问题的源头的时候。


## 编辑值

除了开关属性以外，你还能编辑它们的值。也许你会想要看看是不是另外一种颜色会更好看，或者希望微调什么东西的大小呢？开发者工具可以省去你耗费在编辑样式表和重载页面上的大量时间。

选择了 box1 以后，点击显示应用在边框的颜色的色块（被涂上颜色的圆），会打开一个颜色选择器，然后你就能尝试一些不同的颜色，页面上的显示会进行实时的更新。类似地，你也可以用这种方法改变宽度或者边框的样式。


## 添加一个新属性

你可以使用开发者工具添加属性。也许你已经意识到，你不希望你的盒子继承 `<body>` 元素的字体大小，想要给它设定专属的特别颜色了？在将它加入到你的 CSS 文件之前，你可以在开发者工具中试一下。

你可以点击在规则中合拢的花括号，开始向里面键入一个新的声明，此时你可以开始键入新的属性，开发者工具会展示给你一个自动填充的对应属性列表。在选择了 font-size 以后，键入你想要尝试的值。你也可以点击“+”按钮以添加一个对应于相同选择器的规则，将你的新规则加到那里。


## 理解盒模型

在之前的课程里我们已经讨论了盒模型，介绍了替代盒模型，它改变了元素根据给定大小计算自身尺寸的方式，再在这个计算值上加上内边距和边框。开发者工具可以确实帮助你理解元素尺寸的计算方式。

Layout view 给你展示了一张选定元素的盒模型示意图，还有对能改变元素展示方式的属性和值的描述。你可能原本没有精确地使用元素的属性，只设定了初始值，盒模型也可能包含对于这些属性的描述。

在这一面板上，被详细说明的属性之一为 box-sizing 属性，它控制了元素使用的盒模型种类。

将这两个分别带有 box1 和 box2 类的盒子进行比较，它们可能都应用了相同的宽度（400 像素），但是 box1 显然更宽。你可以在布局面板上看到，它正在使用 content-box 值，即为那种取你赋予元素的大小并在这基础上加上内边距和边框宽度的那种值。

带有 box2 类的盒子使用了 border-box，所以此时内边距和边框的值是从你赋给元素的值里面减去的，也就是说页面上被盒子占据的空间大小就是你指定的大小，此例中为 width: 400px。


## 解决优先级问题

有的时候，在开发过程中，尤其是在你需要编辑运行站点的 CSS 的时候，你将会发现你很难让一些 CSS 被应用。无论你做了什么，元素看起来就是不听 CSS 使唤。这时候大概发生的事情是，一个更明确的选择器覆盖了你的改动，此时开发者工具也能帮助你解决这个问题。

在我们的示例文件里，有两个单词被包含在了一个 `<em>` 元素里。一个显示为橘黄色，另一个为深粉色。在 CSS 里我们这样写：

```css
em {
  color: hotpink;
  font-weight: bold;
}
```

但在样式表里面，这些规则的上面有以 .special 为选择器的规则：

正如你从层叠与继承里面，我们讨论的关于优先级的经验中回忆起来的那样，类选择器比元素选择器有更高的优先级，因而这就是实际生效的值。开发工具可以帮忙找出这类问题，尤其是在有效的信息被淹没在一个巨大的样式表的某个角落的时候。

检查有 `.special` 类的 `<em>` 元素，开发者工具会告诉你橘黄色是实际生效的颜色，还会将应用在 `em` 上的 `color` 属性划掉。你这样就能看到是类选择器覆盖了元素选择器了。