---
id: form
sidebar_position: 8
---

# 表单

## 创建表单
在HTML中，可以使用&#60form>元素来创建表格。表格通常包含用户可以填写的输入字符串和输入按钮。

下面是一个简单的HTML表格的示例：
```bash
<!DOCTYPE html>
<html>
<head>
  <title>HTML表单示例</title>
</head>
<body>
  <form action="submit.php" method="post">
    <label for="name">姓名：</label>
    <input type="text" id="name" name="name" required><br><br>

    <label for="email">邮箱：</label>
    <input type="email" id="email" name="email" required><br><br>

    <label for="message">留言：</label>
    <textarea id="message" name="message" rows="4" cols="30"></textarea><br><br>

    <input type="submit" value="提交">
  </form>
</body>
</html>
```
在上面的例子中，&#60form>元素用于创建表格。它具有两个重要的属性：action和method。action属性指定表格单提交的目标URL，这里是"submit.php"。method属性性指定提交表单的HTTP方法，这里使用POST方法。

&#60label>元素用于创建字符串的标签。for属性与输入字符串的id属性对应，用于将标签与对应的字符串关联起来。

输入字符段有不同的类型，这里使用了&#60input type="text">来创建一个文本输入字符段和&#60input type="email">来创建一个电子邮件输入字符段。

&#60textarea>元素用于创建多行文本输入文字段。

最后，&#60input type="submit">用于创建提示按钮。

你可以根据需要添加更多的输入字符段和自定义样式来创建更复杂的表格。提交表格时，表格数据将被发送到属性指定的 URL，并可以使用服务器端代码来处理和验证数据action。
## 输入类型和属性
在HTML中，输入字段的类型和属性可以用来控制字段的行为和限制用户输入的内容。以下是常见的HTML输入类型和属性的示例：

输入类型(Input Types)：
1、文本输入（Text Input）：
```bash
<input type="text" name="username">
```
2、密码输入（密码输入）
```bash
<input type="password" name="password">
```
3、电子邮递输入（Email Input）：
```bash
<input type="email" name="email">
```
4、数字输入（Number Input）：
```bash
<input type="number" name="age">
```
5、文件上传（文件上传）：
```bash
<input type="file" name="avatar">
```
6、日期选择（Date Picker）：
```bash
<input type="date" name="dob">
```
常见属性（Common Attributes）：
- 1、name性质：用于指定字符段的名称，用作交表单时的标识符。
- 2、id属性：用于唯一标记识字段，可用于与&#60label>元素关联或通过JavaScript操作字段。
- 3、value属性：用于设置字符段的默认值。
- 4、required性质：要申请用户在提交表格之前必须填写该段。
- 5、placeholder性质：提供对字段预期价值的简短提示。
- 6、disabled性质：禁止使用文字段，使其不可编辑或选择。
- 7、readonly性质：将文字段设置为只读，用户无法编辑。
- 8、maxlength属性：限制用户输入的最大字符数。
- 9、pattern性质：使用正则表示达式确定正确输入的模式。
- 10、autocomplete性质：指示扫描器是否应为字节提供自动完成建议。

这些是经常看到的 HTML 输入类型和属性的示例，它们可以根据需要进行组合和定制。
## 下拉列表、单选按钮和复选框
在HTML中，可以使用下拉列表、单选按钮和复选框来收集用户输入。这些元素可以通过使用特定的HTML标记和属性来创造。以下是它们的基本使用方法：

1、下拉列表（选择元素）： 下拉列表允许用户从预定义的选项中选择一个值。使用&#60select>元素创建下拉列表，并使用&#60option>元素确定每个选项。
```bash
<select name="country">
  <option value="usa">美国</option>
  <option value="canada">加拿大</option>
  <option value="uk">英国</option>
  <option value="australia">澳大利亚</option>
</select>
```
2、单选按钮（Radio元素）： 单选按钮允许用户从一组选项中选择一个。使用元素&#60input>的type属性设置为"radio"来创建单选按一下，并使用name属性为它们组织起来，使用用户只能在同一个组中选一个。
```bash
<input type="radio" name="gender" value="male"> 男性
<input type="radio" name="gender" value="female"> 女性
<input type="radio" name="gender" value="other"> 其他
```
3、复选框（Checkbox元素）：复选框允许用户从一组选项中选择多个。使用&#60input>元素的type属性设置为"checkbox"来创建复选框。
```bash
<input type="checkbox" name="fruit" value="apple"> 苹果
<input type="checkbox" name="fruit" value="banana"> 香蕉
<input type="checkbox" name="fruit" value="orange"> 橙子
```
请注意，以上说明示例中的name属性用于识别表元素，并在提供交表时用于识别别用户的选择。在实际应用中，还可以使用其他属性来控制这些元素的样式、默认选择中项等。
## 表单验证和提交
HTML表格验证和提交是用于验证用户输入并将表格数据发送到服务器的两个重要步骤。下面是一个简单的演示，演说明了如何在 HTML 中进行表单验证和提交。
```bash
<!DOCTYPE html>
<html>
<head>
  <title>表单验证和提交</title>
  <script>
    function validateForm() {
      var name = document.forms["myForm"]["name"].value;
      var email = document.forms["myForm"]["email"].value;
      
      if (name == "") {
        alert("请输入姓名");
        return false;
      }
      
      if (email == "") {
        alert("请输入电子邮件地址");
        return false;
      }
      
      if (!validateEmail(email)) {
        alert("请输入有效的电子邮件地址");
        return false;
      }
    }
    
    function validateEmail(email) {
      // 简单的电子邮件验证正则表达式
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
    }
  </script>
</head>
<body>
  <h1>表单验证和提交</h1>
  
  <form name="myForm" onsubmit="return validateForm()" action="submit.php" method="post">
    <label for="name">姓名:</label>
    <input type="text" name="name" id="name">
    <br><br>
    
    <label for="email">电子邮件地址:</label>
    <input type="text" name="email" id="email">
    <br><br>
    
    <input type="submit" value="提交">
  </form>
</body>
</html>
```
在这个例子中，我们使用了JavaScript来进行表单验证。validateForm()在表单提交之前被调用的函数。它获得了名称和电子邮寄地址的价值，并进行验证。如果姓名或电子邮寄地址为空，或电子邮寄地址格式无效，将显示相关的警告信息，并返回false阻止表单提示。

在 HTML 表中，我们使用onsubmit="return validateForm()"来调试验证函数，并使用action属性指定表单提供的 URL（submit.php）。此外，method属性指定了表单提供的 HTTP 方法，这里使用了 POST 方法。

你可以根据需要自定义验证规则和发表评论。一旦表单验证通过，将会执行submit.php中的服务端代码处理表单数据。
