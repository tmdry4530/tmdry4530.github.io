---
title: "React Custom Hook"
slug: "react-custom-hook"
status: "public"
type: "Post"
category: "💻 Frontend"
tags: ["React"]
summary: ""
thumbnail: "/thumbnails/react-custom-hook.png"
date: "2023-12-04"
---


## React Custom Hook

- **기능**: React에서 자주 사용되는 기능들을 Hook 형태로 작성하여 재사용성을 높임.
- **설명**: Custom Hook을 통해 컴포넌트 간 상태 관리 논리, 이벤트 핸들러, 구독 등을 재사용 가능하게 만들 수 있음.

## React Children Props

- **설명**: React에서 Children Props는 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는 방식을 말함.

## React Hook 종류

1. **useMemo**
    - 성능 최적화를 위해 사용.
    - 메모이제이션을 통해 동일 연산의 반복을 줄임. 연산 결과를 메모리에 저장하고 필요할 때 참조.
    - 예: 아이템이 많은 컴포넌트의 리렌더링 최적화.
2. **useContext**
    - Context API를 사용하여 전역 상태 관리.
    - Props 드릴링 없이 컴포넌트 트리 어디서든 데이터 접근 가능.
    - `createContext`로 Context 객체 생성 후, `Provider`를 통해 하위 컴포넌트에 전달.
3. **useReducer**
    - `useState`의 대체제로 사용.
    - 상태 관리 로직을 Reducer 함수로 분리하여 관리.
    - `dispatch` 함수를 통해 action 객체를 전달하고 상태 업데이트.
    - 복잡한 상태 관리에 유용하며, 가독성이 좋음.
4. **useCallback**
- 함수의 재생성 방지와 성능 최적화를 위해 사용.
- 종속성 배열의 값이 변경될 때만 함수를 새로 생성, 그 외에는 메모리에 저장된 함수 재사용.
- 예: 자식 컴포넌트에 전달되는 함수의 참조 일관성 유지.

### useReducer 사용 예시


```plain text
const reducer = (state, action) => {
  switch (action.type) {
    case "김치볶음밥":
      return { ...state, id: state.id + action.payload.id };
  }
};

<button onClick={() => dispatch({ type: "김치볶음밥", payload })}>...</button>;
```

- `reducer` 함수는 현재 상태와 action 객체를 받아 새로운 상태를 반환.
- `dispatch`는 Reducer의 action을 실행하는 함수.

Sample Code


