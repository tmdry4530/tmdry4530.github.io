---
title: "JSX, Props, State"
slug: "react-basic"
status: "public"
type: "Post"
category: "💻 Frontend"
tags: ["React"]
summary: ""
thumbnail: "/thumbnails/react-basic.png"
date: "2023-12-29"
---


## JSX


리액트 요소를 생성하는데 사용되는 문법이고 html과 유사한 모습을 보이지만 실제로는 javascript이다.


```javascript
const str = <h1>Hello World!</h1>
```


`<h1>Hello World!</h1>` 이 부분이 JSX이고, 이런식으로 html요소를 변수에 할당할수있다.


```javascript
const str = "World"
const element = <h1>Hello {str}</h1>
```


중괄호 `{}` 안에  변수,함수호출, 연산 등 자바스크립트 코드를 삽입해서 사용가능하다


## Props


리액트에서 컴포넌트 간에 데이터를 전달하는 방법이고, 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는데 사용된다.


컴포넌트는 자신의 props를 변경할수없다. 왜냐하면 리액트의 원칙 중 하나인 단방향 데이터 흐름 원칙을 따르기 때문이다.


```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="chamdom" />;
```


Welcome 컴포넌트를 사용할때 name props를 chamdom으로 설정한다


## State


리액트 컴포넌트에서 컴포넌트의 동적인 데이터를 관리하는데 사용한다. 상태는 사용자의 입력, 서버의 응답으로 변경될수 있고, 상태가 변경되면 해당 컴포넌트를 리렌더링한다.


리액트에서는 useState라는 hook을 제공하여 함수컴포넌트에서도 상태관리를 할수있게 해준다.


```javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```


useState 간단한 사용예시


useState hook은 리액트에서 제공하는 기능이라 따로 임포트해야한다.


count는 상태변수 / setCount는 count의 상태를 업데이트하는 함수이다.


useState(0)은 count의 초기값을 0으로 설정하고, 버튼을 클릭하면 setCount함수를 실행시켜 count를 증가시킨다. 이후 컴포넌트 리렌더링한다.


리액트 훅에 대해 자세한 설명은 하단 포스팅에서 확인


[bookmark](https://chamdom.xyz/react-hook)


