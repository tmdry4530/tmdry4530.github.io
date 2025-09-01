---
title: "JS class"
slug: "js-class"
status: "public"
type: "Post"
category: "💻 Frontend"
tags: ["javascript"]
summary: ""
thumbnail: "/thumbnails/js-class.jpg"
date: "2023-10-01"
---


## 클래스란?

- 자바스크립트에서 객체를 생성하기 위한 템플릿이다.
- 클래스는 데이터와 이를 조작하는 코드를 함께 묶는 방법으로 사용된다.
- 그리고 ES6에서 도입되었으며, 기존의 프로토타입 기반 상속을 좀 더 이해하기 쉬운 구문으로 작성된다.

### 예제


```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    return `Hello, I'm ${this.name}!`;
  }
}

const person1 = new Person("Alice");
console.log(person1.sayHello());
```


Person 클래스는 name 속성을 가지고있고, sayHello 메서드를 통해 인삿말을 전달할수있다.


new 연산자를 사용해서 Person클래스의 인스턴스를 생성한다.


## 생성자 함수란?

- 클래스는 class키워드를 사용하여 정의하며 생성자(constructor)를 포함할수있다.
- 생성자는 함수는 새 객체가 생성될 때 자동으로 호출된다.
- 생성자 함수는 일반적으로 인스턴스의 초기 상태를 설정하는 데 사용되며, 인스턴스에 속성을 추가하는데 사용된다.

### 예제


```javascript
class Person {
  constructor(name) {
    this.name = name; // `this` 키워드는 인스턴스를 가리킨다.
  }

  introduce() {
    console.log(`Hello, my name is ${this.name}.`);
  }
}

const person = new Person("chamdom");
person.introduce();
```


Person 클래스는 생성자 함수를 가지고있고, name 매개변수를 받아 인스턴스의 name속성을 설정한다. new키워드를 사용해서 Person클래스의 인스턴스를 생성할때 생성자함수가 호출되고 this.name에 전달된 값이 할당된다.


```javascript
class Person {
  // constructor() {}
}

const person = new Person();
```


만약 클래스에 생성자함수르 작성하지 않았다면 자바스크립트가 기본 생성자를 제공한다.


```javascript
class Employee extends Person {
  constructor(name, position) {
    super(name); 
    this.position = position;
  }
}

const employee = new Employee("chamdom", "student");
console.log(employee.name); 
console.log(employee.position);
```


Employee 클래스는 Person 클래스를 상속받고있고, super 메서드를 호출하여 부모클래스의 생성자함수를 실행한다. 그 후에 position 속성을 추가하고 Employee 인스턴스를 초기화한다.


## 인스턴스란?

- 인스턴스는 클래스를 기반으로 생성된 객체이다.
- 이해하기 쉽게 클래스는 객체의 설계도와 같으며, 인스턴스는 이 설계도를 바탕으로 만들어진 실제로 작동하는 객체이다.
- 각 인스턴스는 클래스에 정의된 메서드들을 사용할수있다.

### 예제


```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  introduce() {
    console.log(`Hello, my name is ${this.name}.`);
  }
}

const person1 = new Person("chamdom");
person1.introduce();
```


person1은 Person 클래스의 인스턴스이다. pserson1은 Person 클래스의 정의된 생성자함수와 introduce 메서드를 포함한 모든 속성과 메서드에 접근할수있다.


## this ?

- 현재 실행 컨텍스트의 객체를 가리키는 키워드이다. 클래스, 메서드내에서 사용될 때 this의 값은 그것이 어떻게 호출되었는지에 따라 달라진다.
- 클래스의 메서드 내에서 this는 그 메서드를 호출한 인스턴스를 참조한다. 클래스의 인스턴스 내에서 this는 그 인스턴스 자신을 가리킨다

### 예제


```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  introduce() {
    console.log(`Hello, my name is ${this.name}.`);
  }
}

const person1 = new Person("chamdom");
person1.introduce();
```


Person 클래스를 인스턴스화 하고, 생성자 함수 내에서 this.name에 “chamdom”을 할당하면 이 this는 새로 생성된 person 인스턴스를 가리킨다. 그리고 person.introduce() 를 호출하면 introduce내의 this는 person 인스턴스를 가리키게 된다


하지만 화살표함수에서의 this는 다르다. 화살표함수는 자신의 this를 가지지않고, 화살표함수를 둘러싼 외부 함수의 this값을 상속받기 때문이다.


```javascript
class Person {
  constructor(name) {
    this.name = name;
    this.introduce = () => {
      console.log(`안녕하세요, 제 이름은 ${this.name}입니다.`);
    };
  }
}

const person = new Person("홍길동");
setTimeout(person.introduce, 1000);
```


setTimeout 내부에서 호출되는 person.introduce 화살표함수는 Person 인스턴스의 this를 사용한다. 화살표함수가 아니였다면 setTimeout이 일반 함수를 전역컨텍스트에서 호출했기 때문에 this가 전역객체를 가리켰을 것이다.


