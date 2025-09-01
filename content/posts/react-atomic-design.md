---
title: "Atomic Design Pattern"
slug: "react-atomic-design"
status: "public"
type: "Post"
category: "💻 Frontend"
tags: ["React"]
summary: ""
thumbnail: "/thumbnails/react-atomic-design.png"
date: "2023-12-04"
---


# Atomic Design Pattern

- **원자(Atoms)** : 단순하고 작은 단위의 컴포넌트. 단독으로는 큰 의미가 없지만, 다른 컴포넌트와 결합할 때 가치를 발휘함.
- **분자(Molecules)** : 여러 원자의 결합으로 기능적인 단위를 형성. 분자는 자체적으로도 의미가 있으며, 유기체로 발전할 기반을 제공함.
- **유기체(Organisms)** : 다양한 분자들이 서로 상호작용하며 복잡한 기능과 레이아웃을 구성. 웹페이지의 독립적인 섹션으로 생각할 수 있음.
- **템플릿(Templates)** : 실제 컨텐츠가 채워지기 전의 페이지 레이아웃을 정의. 유기체들의 상대적 위치와 역할을 구체화함.
- **페이지(Pages)** : 사용자에게 최종적으로 보여지는 단계. 모든 컴포넌트들이 실제 데이터와 결합하여 사용자 인터페이스를 형성함.

### 아토믹 디자인 패턴의 장점

- **재사용성**: 작은 단위로 분해되어 컴포넌트 재사용이 용이.
- **유지보수성**: 컴포넌트 기반 개발로 유지보수가 용이.
- **일관성**: 디자인 시스템 내에서 일관된 UI/UX 제공.

### 주의사항

- 복잡한 구조에서는 컴포넌트 간의 상호작용이 복잡해질 수 있으므로, 구조 설계에 신중해야 함.
- Props 드릴링 문제를 해결하기 위해 상태 관리 라이브러리나 Context API의 사용이 필요할 수 있음.

# Sample Code


## Atoms

- LoginButton.jsx

```javascript
export const LoginButton = ({ children }) => {
  return <button>{children}</button>;
};
```


children에 대한 내용은 [React Children Props](https://www.notion.so/718c2771ed404eb6b7e88e97e7243a25#be21a78dd8794d66a14dffb4addb8795) 참고

- LoginLabel.jsx

```javascript
export const LoginLabel = ({ htmlFor, children }) => {
  return <label htmlFor={htmlFor}>{children}</label>;
};
```

- LoginInput.jsx

```javascript
import useInput from "../../hooks/useInput";

export const LoginInput = ({ name, type }) => {
  const uidInput = useInput("");
  return <input name={name} type={type} {...uidInput} />;
};
```


## Molecules

- LoginForm.jsx

```javascript
import { useEffect, useRef, useState } from "react";
import { LoginButton } from "../atoms/LoginButton";
import { LoginInput } from "../atoms/LoginInput";
import { LoginLabel } from "../atoms/LoginLabel";

const LoginForm = () => {
  const [SubmitData, setSubmitData] = useState(null);
  const selectInput = useRef();
  const loginHandler = (e) => {
    e.preventDefault();
    // const resp = await axios.post("domain.com/login")
    const { uid, upw } = e.target;
    setSubmitData({ uid: uid.value, upw: upw.value });
  };
  useEffect(() => {
    console.log(selectInput.current.value);
    if (SubmitData) console.log(SubmitData);
  }, [SubmitData]);
  return (
    <form onSubmit={loginHandler}>
      <LoginLabel>id</LoginLabel>
      <LoginInput name={"uid"} type={"text"}></LoginInput>
      <LoginLabel>pw</LoginLabel>
      <LoginInput name={"upw"} type={"password"}></LoginInput>
      <LoginLabel>id (useRef)</LoginLabel>
      <input value={"1234"} ref={selectInput} />
      <LoginButton>login</LoginButton>
    </form>
  );
};

export default LoginForm;
```


