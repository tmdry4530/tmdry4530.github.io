---
title: "Typescript "
slug: "typescript"
status: "public"
type: "Post"
category: "💻 Frontend"
tags: ["typescript"]
summary: ""
thumbnail: "/thumbnails/typescript.png"
date: "2024-01-03"
---


## 타입스크립트란?

1. 자바스크립트의 슈퍼셋으로, 자바스크립트의 모든 기능을 포함하면서 타입체크 기능을 제공하는 프로그래밍언어이다.
2. 코드를 실행하기 전에 오류를 발견하고 수정할수 있고, 타입 추론, 인터페이스 제네릭 등의 기능을 사용해서 코드의 가독성과 유지보수성을 높인다.
3. 타입스크립트는 컴파일 언어라서, 자바스크립트 코드로 변환시켜 사용한다.

## 타입스크립트의 필요성

1. **타입안정성**
    1. 컴파일할때 타입검사를 수행하여 오류를 줄일수있다. 이로인해 코드의 안정성을 높이고 런타임환경에서 발생할수있는 오류를 사전에 방지할수있다.
2. **다양한 도구 지원**
    1. 코드편집기에서 더 나은 자동완성, 타입검사, 리팩토링 등을 제공하여, 개발속도가 향상되고 코드의 품질을 높일수있다.
3. **문서화**
    1. 타입 정보는 함수나 컴포넌트의 API를 문서화하는데 도움이 된다.
4. **대규모 프로젝트 관리**
    1. 타입 시스템은 코드의 복잡성으 ㄹ관리하고 코드간의 관계를 명확하게 표현하는데 도움이 된다.

## 타입스크립트 초기 환경설정


```shell
npm install -D typescript
npx tsc --version
npx tsc --init
```

1. `-D` 는 `--save-dev`의 축약형이다.
2. 설치된 타입스크립트의 버전 확인
3. `tsconfig.json`파일 생성

## 타입스크립트 기본 문법

- **변수 선언**

```javascript
let name: string = 'chamdom';
let age: number = 25;
let isStudent: boolean = true;
```


변수를 선언할때 타입을 지정할수있다. 이는 변수가 어떤 타입의 값을 가질수 있는지 명확하게 한다.

- **함수**

```javascript
function greet(name: string): string {
    return `Hello, ${name}`;
}
```


함수의 매개변수와 반환 값에 대한 타입을 지정할수있다.

- **인터페이스**

```javascript
interface Person {
    name: string;
    age: number;
}

const john: Person = { name: 'chamdom', age: 25 };
```


타입스크립트에서는 인터페이스를 사용하여 복잡한 타입을 정의할수 있다. 그리고 클래스가 특정 조건을 충족하도록 강제하는 역할을 한


- **클래스**

```javascript
class Student {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    greet() {
        return `Hello, ${this.name}`;
    }
}
```


타입스크립트는 클래스 기반 객체 지향 프로그래밍을 지원한다. 클래스는 필드와 메서드를 가질수있고, 접근 제어자를 사용하여 클래스에 대한 접근범위를 제한할수있다.


## 타입스크립트를 이용한 node 런타임 환경설정


```shell
npm install -D typescript ts-node @types/node
```

- 이 명령어는 타입스크립트를 nodejs환경에서 직접 실행 할수있게 해주는 ts-node와 nodejs의 타입정의 파일을 설치한다.

## 타입스크립트의 tsconfig 설정 방법


타입스크립트의 설정은 tsconfig 파일을 통해 이루어지고, 타입스크립트 컴파일러 에게 프로젝트를 어떻게 컴파일 할지 알려준다.


tsconfig파일에 작성될수있는 속성들에 대해서는 아래 포스팅에서 확인


[bookmark](https://chamdom.xyz/typescript-prop)


## 타입스크립트 빌드 과정

1. **타입검사**
    1. 타입스크립트 컴파일러는 코드를 읽고 타입오류를 찾으며, 런타임오류가 아닌 문법적인 오류만 찾는다.
2. **트랜스파일링**
    1. 타입검사가 완료되면 타입스크립트 컴파일러는 코드를 자바스크립트 코드로 변환하면서 타입정보는 제거한다.
3. **출력**
    1. 변환된 자바스크립트 코드는 tsconfig파일에 작성된 ourDir옵션으로 지정된 디렉토리에 출력된다.

이 과정은 `npx tsc`명령어를 사용하여 수행할수있다. 해당 명령어는 tsconfig파일을 찾아 해당 설정에 따라 빌드를 수행한다


