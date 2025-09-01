---
title: "React Hook"
slug: "react-hook"
status: "public"
type: "Post"
category: "💻 Frontend"
tags: ["React"]
summary: ""
thumbnail: "/thumbnails/react-hook.png"
date: "2023-12-30"
---


## React Hook


훅을 사용하는 이유는 클래스컴포넌트와 함수형컴포넌트의 차이점을 알아야한다.


## 리액트


컴포넌트를 활용해서 화면을 꾸밀수있는 프레임워크


상태가 바뀌면 화면이 바뀐다


## 컴포넌트


페이지에서 역할별로 구분한것? 


브라우저에 보여줄 화면


상태에 따라서 화면이 바뀐다


### 클래스 컴포넌트

- ES6의 클래스로 정의된다.
- 생명주기 메서드를 사용할수 있다.
- this바인딩을 하여 인스턴스 변수나 메서드에 접근한다.

### 함수형 컴포넌트

- ES6의 화살표 함수를 사용할수있다.
    - this 바인딩이 필요없다
- 클래스컴포넌트의 생명주기메서드 대신 useEffect, useState을 사용하여 상태관리를한다
    - useState, useEffect, useContext, useReducer 등 다양한 훅을 사용가능

## 훅의 종류

- useState
- useEffect
- useContext
- useReducer
- useCallback
- useMemo
- useRef

기본적으로 제공하는 훅 이외에도 커스텀 훅을 만들어서 재사용 가능한 로직을 관리할수있다.


### useState


컴포넌트의 로컬상태를 관리한다. 


상태의 초기값을 인자로 받고 상태값과 해당 상태를 업데이트 하는 함수를 배열로 반환한다.


```javascript
import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const minus = () => {
    setCount(count - 1);
  };

  return (
    <>
      <p>{count}</p>
      <button onClick={increment}>plus</button>
      <button onClick={minus}>minus</button>
    </>
  );
};

export default Counter;
```

1. Counter 컴포넌트가 호출된다
2. useState함수를 호출해서, 상태와 상태변경하는 함수를 배열로 반환하고, 상태의 초기값을 0으로 설정한다
3. 
4. 

### useEffect


함수형 컴포넌트에서 사이드 이펙트를 관리할수있게한다.


사이드 이펙트란 데이터를 가져오거나, DOM을 직접 조작하는 것과 같은것들


함수를 인자로 받으며, 두번째 인자로 의존성 배열을 받을수있다.


### useContext


리액트 컨텍스트를 함수형 컴포넌트에서 사용할수있게한다


컨텍스트 객체를 인자로 받고 해당 컨텍스트의 현재값을 반환한다.


### useReducer


복잡한 상태로직을 관리할수있다.


리듀서 함수와 초기상태를 인자로 받고, 현재상태와 dispatch함수를 배열로 반환한다.


### useCallback


메모이제이션된 콜백을 반환한다. 


### useMemo


메모이제이션된 값을 반환한다.


### useRef


.current 프로퍼티로 변경가능한 객체를 반환한다.


