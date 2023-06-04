---
id: class
sidebar_position: 7
---

# ES6 面向对象编程

## ES6 类的概述

---
ES6（ECMAScript 2015）引入了类（class）的概念，使得 JavaScript 中面向对象编程更加直观和易用。类是一种用于创建对象的蓝图或模板，它定义了对象的属性和方法。

在 ES6 中，通过使用 `class` 关键字来定义一个类。类可以包含构造函数、实例方法、静态方法和访问器属性。
>以下是一个简单的类的示例：

```javascript
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    sayHello() {
        console.log(`Hello, my name is ${this.name}. I am ${this.age} years old.`);
    }

    static getClassName() {
        return 'Person';
    }

    get fullName() {
        return this.name + ' Smith';
    }
}

const john = new Person('John', 25);
john.sayHello(); // 输出: Hello, my name is John. I am 25 years old.

console.log(Person.getClassName()); // 输出: Person

console.log(john.fullName); // 输出: John Smith
```

>在这个示例中，我们定义了一个名为 `Person` 的类，它有一个构造函数 `constructor` ，用于初始化对象的属性 `name` 和 `age` 。类中还定义了一个实例方法 `sayHello` ，用于打印对象的信息。另外，类中还有一个静态方法 `getClassName` ，用于返回类的名称。类中还定义了一个访问器属性 `fullName` ，它会返回对象的完整姓名。

通过 `new` 关键字可以创建类的实例，可以调用实例方法和访问实例属性。静态方法可以通过类本身调用，而访问器属性可以像访问普通属性一样获取。

ES6 类提供了更清晰、更易于理解的语法来定义和使用类，使得 JavaScript 中的面向对象编程更加直观和方便。它在许多现代 JavaScript 框架和库中得到广泛应用。




## 类的声明与实例化
---
在ES6中，使用`class`关键字来声明一个类，并使用`new`关键字实例化一个类的对象。

类的声明包括类名、构造函数和类的方法。构造函数用于初始化类的实例，而类的方法定义了类的行为和功能。

>下面是一个示例，演示了类的声明和实例化的过程：

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHello() {
    console.log(`Hello, my name is ${this.name}. I am ${this.age} years old.`);
  }
}

// 实例化一个Person对象
const john = new Person('John', 25);

// 调用实例方法
john.sayHello(); // 输出: Hello, my name is John. I am 25 years old.
```

>在这个示例中，我们声明了一个名为`Person`的类，它有一个构造函数`constructor`，接收两个参数`name`和`age`。构造函数会将传入的参数赋值给实例的属性`name`和`age`。

类中定义了一个实例方法`sayHello`，用于输出对象的信息。通过实例化类，并调用实例方法，我们可以创建类的对象，并对其进行操作。

要注意的是，在类的方法中，`this`关键字指向当前类的实例，用于访问和操作实例的属性和方法。

通过类的声明和实例化，我们可以创建多个对象并调用类的方法，实现面向对象编程的封装和复用特性。



## 类的构造函数与方法
---
在ES6中的类中，构造函数和方法是类的两个主要组成部分。

构造函数是类的特殊方法，用于创建和初始化类的实例。它使用 `constructor` 关键字来声明，并在类的实例化过程中自动调用。构造函数可以接受参数，并使用 `this` 关键字来引用类的实例。

方法是类中定义的函数，用于定义类的行为和功能。方法可以访问类的实例属性和其他方法，以及在实例上执行操作。类中的方法可以通过类的实例进行调用。

>下面是一个示例，演示了类的构造函数和方法的使用：

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHello() {
    console.log(`Hello, my name is ${this.name}. I am ${this.age} years old.`);
  }

  static getClassName() {
    console.log('Class name is Person');
  }
}

// 实例化一个Person对象
const john = new Person('John', 25);

// 调用实例方法
john.sayHello(); // 输出: Hello, my name is John. I am 25 years old.

// 调用静态方法
Person.getClassName(); // 输出: Class name is Person
```

>在这个示例中，我们定义了一个名为 `Person` 的类。类的构造函数使用 `constructor` 关键字声明，并接受 `name` 和 `age` 两个参数。构造函数将参数赋值给类的实例属性。

类中还定义了一个实例方法 `sayHello`，用于输出对象的信息。通过创建类的实例并调用实例方法，我们可以对实例进行操作。

此外，类中还定义了一个静态方法 `getClassName`，用于输出类的名称。静态方法可以直接通过类本身进行调用，而不需要实例化类。

通过构造函数和方法，类提供了一种结构化的方式来定义对象的属性和行为。构造函数用于创建和初始化对象，而方法用于描述对象的行为和功能。这样，我们可以通过类的实例和方法来创建和操作对象，使代码更具可读性和可维护性。



## 类的静态方法与静态属性
---
在ES6的类中，静态方法和静态属性是属于类本身而不是类的实例的方法和属性。

- 静态方法（Static Methods）是定义在类上的方法，而不是类的实例。它们使用 `static` 关键字来声明，并且不能直接访问类的实例属性或方法。静态方法通常用于执行与类相关的操作，而不依赖于类的实例。

- 静态属性（Static Properties）是定义在类上的属性，而不是类的实例。它们使用 `static` 关键字来声明，并且在类的实例化过程中被共享。静态属性可以存储与类相关的常量或共享数据。

>下面是一个示例，展示了类的静态方法和静态属性的用法：

```javascript
class MathUtils {
  static multiply(a, b) {
    return a * b;
  }

  static PI = 3.14;
}

console.log(MathUtils.multiply(5, 2)); // 输出: 10

console.log(MathUtils.PI); // 输出: 3.14
```

>在这个示例中，我们定义了一个名为 `MathUtils` 的类。该类中有一个静态方法 `multiply`，用于计算两个数字的乘积。静态方法可以直接通过类本身进行调用，而不需要实例化类。

类中还定义了一个静态属性 `PI`，用于存储常量 π 的值。静态属性可以直接通过类访问，而不需要类的实例。

通过静态方法和静态属性，类提供了一种在类级别上操作和存储数据的方式，与实例无关。这使得我们可以在类的上下文中定义与类相关的操作和数据，并直接通过类进行访问。




## ES6 中的继承
---
在ES6中，我们可以使用 `extends` 关键字来实现类的继承。继承允许一个类（称为子类或派生类）从另一个类（称为父类或基类）继承属性和方法。

>下面是一个示例，演示了如何使用继承来创建子类：

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound.`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  speak() {
    console.log(`${this.name} barks.`);
  }
}

const dog = new Dog('Buddy', 'Labrador');
dog.speak(); // 输出: Buddy barks.
```

>在这个示例中，我们有一个父类 `Animal`，它有一个构造函数 `constructor` 和一个实例方法 `speak`。子类 `Dog` 使用 `extends` 关键字继承了父类 `Animal`，并在自己的构造函数中使用 `super` 关键字调用父类的构造函数。这样，子类就可以继承父类的属性和方法。

子类中可以重写继承的方法，如示例中的 `speak` 方法。当子类中有一个同名的方法时，它会覆盖父类中的方法。这被称为方法的重写或方法的覆盖。

通过继承，子类可以继承父类的属性和方法，并且可以添加自己的属性和方法。子类还可以重写继承的方法，以适应自己的特定需求。这使得代码的重用和扩展更加方便，并实现了面向对象编程的继承特性。