---
title: "Redux"
slug: "react-redux"
status: "public"
type: "Post"
category: "💻 Frontend"
tags: ["React"]
summary: ""
thumbnail: "/thumbnails/react-redux.png"
date: "2023-12-05"
---


## Redu특징


### **React 전역 상태 관리와 Redux**

- **Redux**: React에서 전역 상태를 관리하기 위해 널리 사용되던 라이브러리.
- **사용자 만족도**: 많이 사용됐으나, 사용자들의 만족도가 낮았고, 현재는 실무에서 사용이 줄어들고 있음.

### **Redux의 구성 요소**

1. **스토어(Store)**: 전역 상태가 관리되는 공간. 컴포넌트와 별개로 상태를 관리.
2. **액션(Action)**: 스토어에 전달할 데이터를 담는 객체. **`dispatch`** 함수를 통해 스토어로 전달되어 상태를 업데이트함.
3. **리듀서(Reducer)**: 액션 객체에 따라 스토어의 상태를 어떻게 변경할지 결정하는 함수.

### **Redux의 동작 구조**

- 컴포넌트에서 **`useDispatch`**를 통해 액션을 생성하고, 이는 리듀서를 통해 스토어의 상태를 업데이트함.
- Redux를 사용하면 **`props`** 전달을 최소화하고, 상태 관리의 편의성과 가독성을 높일 수 있음.

### **Redux의 단점**

- 초기 학습 곡선이 높고, 개념을 이해하기 어려울 수 있음.

## 예제 1


기능

- 저장소의 상태를 보여주는 페이지.
- **`useSelector`** 훅을 사용하여 Redux store의 상태를 참조.

상세

- **`useSelector`**를 호출하고, 콜백 함수를 통해 전역 상태 중 **`count`** 값을 가져옴.
- 전역 상태의 **`count`** 값만을 해당 컴포넌트에서 사용.

구현


```javascript
jsxCopy code
const Count = () => {
  const count = useSelector(state => state.count);
  return (
    <div>
      {count}
      <LoginCount />
    </div>
  );
};
```


## 예제 2


기능

- 전역 상태 업데이트 기능 구현.
- **`useDispatch`**와 **`useSelector`** 훅 사용.

상세

- **`useDispatch`**로 Redux의 **`dispatch`** 함수 인스턴스화.
- **`useSelector`**로 로그인 상태(**`isLogin`**) 참조.
- **`incrementHandler`**와 **`decrementHandler`** 함수: 각각 "김치볶음밥"과 "계란볶음밥" 타입의 액션을 dispatch하여 상태 업데이트.

구현


```javascript
jsxCopy code
const dispatch = useDispatch();
const isLogin = useSelector(state => state.isLogin);

const incrementHandler = () => {
  dispatch({ type: "김치볶음밥", payload: { count: 2 } });
};

const decrementHandler = () => {
  dispatch({ type: "계란볶음밥", payload: { count: 2 } });
};

return (
  <div>
    {isLogin ? "로그인 됨" : "로그인 안됨"}
    <button onClick={incrementHandler}>증가, 로그인</button>
    <button onClick={decrementHandler}>감소, 로그아웃</button>
  </div>
);
```


## 상태관리


### **초기 상태(****`init`****) 정의**

- **`count`**, **`user`**, **`isLogin`** 등의 전역 상태를 초기화합니다.
- **`user`**에는 **`uid`**, **`upw`**, **`age`**, **`name`** 등의 사용자 정보가 포함됩니다.

### **리듀서 함수(****`reducer`****) 정의**

- 상태(**`state`**)가 제공되면 해당 상태를, 그렇지 않으면 **`init`**을 기본값으로 사용합니다.
- **`type`**과 **`payload`**를 통해 액션의 내용을 분석하고, 상태를 업데이트합니다.
- "김치볶음밥" 액션: **`count`**를 증가시키고, **`isLogin`**을 **`true`**로 설정합니다.
- "계란볶음밥" 액션: **`count`**를 감소시키고, **`isLogin`**을 **`false`**로 설정합니다.
- 기본적으로 새로운 상태 객체를 반환하여 상태 변경을 알립니다.

```plain text
jsCopy code
export const reducer = (state = init, action) => {
  const { type, payload } = action;
  switch (type) {
    case "김치볶음밥":
      return { ...state, count: state.count + payload.count, isLogin: true };
    case "계란볶음밥":
      return { ...state, count: state.count - payload.count, isLogin: false };
    default:
      return state;
  }
};
```


### **Store 인스턴스 생성**

- **`createStore`** 메서드를 사용하여 Redux store 인스턴스 생성.
- **`createStore`**의 첫 번째 매개변수로 **`reducer`** 함수 전달.
- **`reducer`**는 애플리케이션의 전역 상태 변화를 관리하는 함수.

```plain text
jsCopy code
import { createStore } from "redux";
import { reducer } from "../reducer";

export const store = createStore(reducer);
```


