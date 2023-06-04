# Python 的异常处理

## 什么是异常？

异常即是一个事件，该事件会在程序执行过程中发生，影响了程序的正常执行。

即使语句或表达式使用了正确的语法，执行时仍可能触发错误，但是异常不一定导致严重的后果一般情况下，
在 Python 无法正常处理程序时就会发生一个异常。

当 Python 脚本发生异常时我们需要捕获处理它，否则程序会终止执行。

大多数异常不会被程序处理，而是显示下列错误信息：

```python
>>> 10*(1/0)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ZeroDivisionError: division by zero
>>> 4 + spam*3
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'spam' is not defined
>>>'2' + 2
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: can only concatenate str (not "int") to str
```

错误信息开头用堆栈回溯形式展示发生异常的语境。
一般会列出源代码行的堆栈回溯；但不会显示从标准输入读取的行。

错误信息的最后一行会告诉我们程序遇到了什么类型的错误，
此行其余部分根据异常类型，结合出错原因，说明错误细节。
上述示例中的异常类型依次是：ZeroDivisionError， NameError 和 TypeError。

## 异常处理

捕捉异常可以使用 try/except 语句。

try/except 语句用来检测 try 语句块中的错误，从而让 except 语句捕获异常信息并处理。

如果你不想在异常发生时结束你的程序，只需在 try 里捕获它。

下面给出一个实例下例会要求用户一直输入内容，
直到输入有效的整数，但允许用户中断程序（使用 Control-C 或操作系统支持的其他操作）；
注意，用户中断程序会触发 KeyboardInterrupt 异常。

```python
while True:YICHANGCHULYI
try:
    x = int(input("Please enter a number: "))
    break
except ValueError:
    print("Oops!  That was no valid number.  Try again...")

```

### try 语句的工作原理是这样的:

> - 首先，执行 try 子句 （try 和 except 关键字之间的（多行）语句）。
> - 如果没有触发异常，则跳过 except 子句，try 语句执行完毕。
> - 如果在执行 try 子句时发生了异常，则跳过该子句中剩下的部分。
>   如果异常的类型与 except 关键字后指定的异常相匹配，则会执行 except 子句，
>   然后跳到 try/except 代码块之后继续执行。
> - 如果发生的异常与 except 子句 中指定的异常不匹配，
>   则它会被传递到外部的 try 语句中；如果没有找到处理程序，
>   则它是一个 未处理异常 且执行将终止并输出如上所示的消息。

try 语句可以有多个 except 子句 来为不同的异常指定处理程序。
但最多只有一个处理程序会被执行。
处理程序只处理对应的 try 子句 中发生的异常，
而不处理同一 try 语句内其他处理程序中的异常。
except 子句 可以用带圆括号的元组来指定多个异常，例如:

```python
except (RuntimeError, TypeError, NameError):
pass
```

如果发生的异常与 except 子句中的类是同一个类或是它的基类时，
则该类与该异常相兼容（反之则不成立 --- 列出派生类的 except 子句 与基类不兼容）。
例如，下面的代码将依次打印 B, C, D:

```python
class B(Exception):
    pass

class C(B):
    pass

class D(C):
    pass

for cls in [B, C, D]:
    try:
        raise cls()
    except D:
        print("D")
    except C:
        print("C")
    except B:
        print("B")
```

请注意如果颠倒 except 子句 的顺序（把 except B 放在最前），
则会输出 B, B, B --- 即触发了第一个匹配的 except 子句。

当异常发生时，它可能有关联值，也称为异常参数。参数的存在和类型取决于异常类型。

xcept 子句可以在异常名称后指定一个变量。该变量绑定到异常实例，该实例通常具有 args 存储参数的属性。
为方便起见，内置异常类型定义**str**()为打印所有参数而无需显式访问,例如：

```python
>>> try:
    raise Exception('spam', 'eggs')
    except Exception as inst:
    print(type(inst))    # 异常类型
    print(inst.args)     # 参数存储在.args 中
    print(inst)          # __str__ 允许直接打印参数,
                         # 但可以在异常子类中被覆盖
    x, y = inst.args     # 从 args 中取出
    print('x =', x)
    print('y =', y)

<class 'Exception'>
('spam', 'eggs')
('spam', 'eggs')
x = spam
y = eggs
```

异常的**str**()输出作为未处理异常消息的最后部分（“详细信息”）打印。

Exception 可以用作捕获（几乎）所有内容的通配符。但是，
最好尽可能具体地说明我们打算处理的异常类型，并允许任何意外异常继续传播。

最常见的处理模式 Exception 是打印或记录异常，然后重新引发它（也允许调用者处理异常）：

```python
import sys

try:
    f = open('myfile.txt')
    s = f.readline()
    i = int(s.strip())
except OSError as err:
    print("OS error:", err)
except ValueError:
    print("Could not convert data to an integer.")
except Exception as err:
    print(f"Unexpected {err=}, {type(err)=}")
    raise
```

try ... except 语句具有可选的 else 子句，该子句如果存在，它必须放在所有 except 子句之后。
它适用于 try 子句 没有引发异常但又必须要执行的代码。例如:

```python
for arg in sys.argv[1:]:
    try:
        f = open(arg, 'r')
    except OSError:
        print('cannot open', arg)
    else:
        print(arg, 'has', len(f.readlines()), 'lines')
        f.close()
```

**使用 else 子句比向 try 子句添加额外的代码要好，
可以避免意外捕获非 try ... except 语句保护的代码触发的异常。**

异常处理程序不仅处理在 try 子句中立即发生的异常，而且还处理在 try 子句中调用（甚至间接调用）的函数内部发生的异常。

## 触发异常

raise 语句支持强制触发指定的异常。例如：

```python
>>>raise NameError('HiThere')
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: HiThere
```

raise 的唯一参数指定要引发的异常。这必须是异常实例或异常类（派生自 BaseException 的类，例如 Exception 或其子类之一）。
如果传递了异常类，它将通过不带参数调用其构造函数来隐式实例化：

```python
raise ValueError  #'raise ValueError()'的缩写
```

如果只想判断是否触发了异常，但并不打算处理该异常，
则可以使用更简单的 raise 语句重新触发异常：

```python
>>>try:
    raise NameError('HiThere')
    except NameError:
    print('An exception flew by!')
    raise

An exception flew by!
Traceback (most recent call last):
  File "<stdin>", line 2,  in <module>
NameError: HiThere
```

## 用户自定义异常

程序可以通过创建新的异常类命名自己的异常。
不论是以直接还是间接的方式，异常都应从 Exception 类派生。

异常类可以被定义成能做其他类所能做的任何事，但通常应当保持简单，
它往往只提供一些属性，允许相应的异常处理程序提取有关错误的信息。

大多数异常命名都以 “Error” 结尾，类似标准异常的命名。

许多标准模块定义了它们自己的异常来报告它们定义的函数中可能发生的错误。

以下为与 RuntimeError 相关的实例,实例中创建了一个类，基类为 RuntimeError，
用于在异常触发时输出更多的信息。

在 try 语句块中，用户自定义的异常后执行 except 块语句，
变量 e 是用于创建 Networkerror 类的实例。

```python
class Networkerror(RuntimeError):
    def __init__(self, arg):
        self.args = arg
```

在你定义以上类后，你可以触发该异常，如下所示：

```python
try:
    raise Networkerror("Bad hostname")
    except Networkerror,e:
    print e.args
```
