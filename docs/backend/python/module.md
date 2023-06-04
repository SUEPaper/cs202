# Python 模块

## 什么是 module?

如果退出 Python 解释器并再次进入，所做的定义（函数和变量）将丢失。
因此，如果您想编写一个稍微长一些的程序，最好使用文本编辑器为解释器准备输入，
然后将该文件作为输入来运行它,这称为创建脚本。
随着程序变长，可能希望将其拆分为多个文件以便于维护。
可能还想使用您在多个程序中编写的便捷函数，而无需将其定义复制到每个程序中。

为了支持这一点，Python 有一种方法可以将定义放在一个文件中，
并在脚本或解释器的交互式实例中使用它们。这样的文件称为模块(Module)；
来自模块的定义可以导入到其他模块或主模块
（可以在顶层和计算器模式下执行的脚本中访问的变量集合）。

模块是包含 Python 定义和语句的文件。文件名是模块名加上后缀.py。

模块中，模块的名称（作为字符串）可用作全局变量的值 **name**。
例如，使用您最喜欢的文本编辑器在当前目录中创建一个名为 fibo.py 以下内 ​​ 容的文件：

```python
def fib(n):    # 写出斐波那契数列直到n。
    a, b = 0, 1
    while a < n:
        print(a, end=' ')
        a, b = b, a+b
    print()

    def fib2(n):   # 返回斐波那契数列直到n。
    result = []
    a, b = 0, 1
    while a < n:
        result.append(a)
        a, b = b, a+b
    return result
```

现在进入 Python 解释器并使用以下命令导入此模块:

```python
>>> import fibo
```

你可以运行以下步骤：

```python
>>> fibo.fib(1000)
    0 1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 987
    >>> fibo.fib2(100)
    [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
    >>> fibo.__name__
    'fibo'
```

如果你打算经常使用一个函数，你可以将它分配给一个本地名称：

```python
>>>fib = fibo.fib
    >>>fib(500)
    0 1 1 2 3 5 8 13 21 34 55 89 144 233 377
```

## import 语句

模块定义好后，我们可以使用 import 语句来引入模块，语法如下：

> import module1[, module2[,... moduleN]]

比如要引用模块 math，就可以在文件最开始的地方用 import math 来引入。
在调用 math 模块中的函数时，必须这样引用：

> math.函数名

当解释器遇到 import 语句，如果模块在当前的搜索路径就会被导入。

搜索路径是一个解释器会先进行搜索的所有目录的列表。
如想要导入模块 support.py，需要把命令放在脚本的顶端：

```python
 # 导入模块
import support

# 现在可以调用模块里包含的函数了
support.print_func("Runoob")
```

输出结果：

```bash
Hello : Runoob
```

**一个模块只会被导入一次，不管你执行了多少次 import。
这样可以防止导入模块被一遍又一遍地执行。**

## from…import 语句

Python 的 from 语句让你从模块中导入一个指定的部分到当前命名空间中。语法如下：

> from modname import name1[, name2[, ... nameN]]

例如，要导入模块 fib 的 fibonacci 函数，使用如下语句：

'from fib import fibonacci'

这个声明不会把整个 fib 模块导入到当前的命名空间中，
它只会将 fib 里的 fibonacci 单个引入到执行这个声明的模块的全局符号表。

## from…import\* 语句

把一个模块的所有内容全都导入到当前的命名空间也是可行的，只需使用如下声明：

> from modname import \*

这提供了一个简单的方法来导入一个模块中的所有项目。然而这种声明不该被过多地使用。

## 搜索路径

当你导入一个模块，Python 解析器对模块位置的搜索顺序是：

> - 当前目录
> - 如果不在当前目录，Python 则搜索在 shell 变量 PYTHONPATH 下的每个目录
> - 如果都找不到，Python 会察看默认路径

模块搜索路径存储在 system 模块的 sys.path 变量中。
变量里包含当前目录，PYTHONPATH 和由安装过程决定的默认目录。

## PYTHONPATH 变量

作为环境变量，PYTHONPATH 由装在一个列表里的许多目录组成。
PYTHONPATH 的语法和 shell 变量 PATH 的一样。

在 Windows 系统，典型的 PYTHONPATH 如下：

> set PYTHONPATH=c:\python27\lib;

在 UNIX 系统，典型的 PYTHONPATH 如下：

> set PYTHONPATH=/usr/local/lib/python

## dir()函数

dir()函数一个排好序的字符串列表内容是一个模块里定义过的名字。

返回的列表容纳了在一个模块里定义的所有模块，变量和函数。如下一个简单的实例：

```python
# 导入内置math模块
import math

content = dir(math)

print content;
```

以上实例输出结果：

```python
['__doc__', '__file__', '__name__', 'acos', 'asin', 'atan',
'atan2', 'ceil', 'cos', 'cosh', 'degrees', 'e', 'exp',
'fabs', 'floor', 'fmod', 'frexp', 'hypot', 'ldexp', 'log',
'log10', 'modf', 'pi', 'pow', 'radians', 'sin', 'sinh',
'sqrt', 'tan', 'tanh']
```

在这里，特殊字符串变量**name**指向模块的名字，**file**指向该模块的导入文件名。
