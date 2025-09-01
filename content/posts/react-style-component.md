---
title: "React Styled Component"
slug: "react-style-component"
status: "public"
type: "Post"
category: "💻 Frontend"
tags: ["React"]
summary: ""
thumbnail: "/thumbnails/react-style-component.png"
date: "2023-11-30"
---


## React Router Hook


React Router에서 제공하는 Hook을 통해 컴포넌트 내에서 라우팅 관련 기능 사용 가능. 예를 들어, `useHistory`, `useParams`, `useLocation` 등의 Hook을 활용하여 프로그래밍 방식으로 라우팅 관리 가능.


## React Styled Components (CSS in JS)


Styled Components는 CSS in JS 라이브러리로, React 컴포넌트 내에서 CSS 스타일을 직접 작성하고 적용할 수 있게 해줌. 이를 통해 컴포넌트 기반의 스타일 관리가 용이해짐.


## Router의 Hook 사용


React의 페이지는 URL 요청 시 브라우저에 전달되고, 페이지 전환 이벤트를 막음. URL 내용을 조건 처리하여 컴포넌트를 교체함으로써 페이지 전환 효과 구현. 예를 들어, 쇼핑몰 페이지에서 `params` 또는 `querystring`으로 데이터 관리.

- SPA 특성상 상품 페이지에서 검색 시, 상태값에 저장함.
- URL 파라미터(`/shop/:type/:option`) 또는 쿼리스트링(`/search?type=1&option=2`)을 이용한 데이터 관리.

## React Design Pattern


### Atomic Design

- React의 디자인 패턴 중 하나로, 컴포넌트 재사용성을 극대화하기 위한 방법.
- UI의 최소 단위부터 컴포넌트 구성 (원자 -> 분자 -> 유기체 -> 템플릿 -> 페이지).

### Atomic 디자인 패턴의 특징

- 컴포넌트의 재사용성을 극대화.
- 컴포넌트를 최소 단위로 구성하여 유지보수성 향상.
- 구성이 잘못될 경우 복잡도 증가 및 유지보수성 저하 위험.
- Props 드릴링 문제 회피 필요.

### Atomic 디자인 패턴의 단위

1. **원자**: 가장 기본 단위 컴포넌트 (예: 버튼, 텍스트).
2. **분자**: 원자 단위의 결합으로 이루어진 컴포넌트 (예: 입력 폼).
3. **유기체**: 분자/원자 단위의 결합으로 이루어진 더 큰 단위 컴포넌트 (예: 헤더, 푸터).
4. **템플릿**: 유기체의 결합으로 이루어진 구조 및 레이아웃 컴포넌트.
5. **페이지**: 템플릿에 데이터를 적용하여 완성된 페이지 형태의 컴포넌트.

## 예제코드


### 컴포넌트 구성

- **App 컴포넌트**
    - 전체 어플리케이션 라우팅 및 로그인 상태관리

    ```javascript
    function App() {
      const [login, setLogin] = useState(false);
      const Redirect = () => {
        if (login) return <MyPage login={login} />;
        return <Navigate to={"/login"} />;
      };
      return (
        <div className="App">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/mypage" element={<Redirect />} />
            <Route
              path="/login"
              element={<Login login={login} setLogin={setLogin} />}
            />
            <Route path="/detail/:id/:num/:name" element={<Detail />} />
          </Routes>
        </div>
      );
    }
    ```

    1. **리다이렉트 로직 (****`Redirect`** **컴포넌트)**:
    - 로그인 상태에 따라 사용자를 적절한 페이지로 리다이렉트함.
    - 로그인이 되어 있으면 **`MyPage`** 컴포넌트를 반환하고, 그렇지 않으면 **`Navigate`** 컴포넌트를 사용해 로그인 페이지(**`/login`**)로 리다이렉트함.
    - 고차컴포넌트 :
- **Main 컴포넌트**
    - 메인페이지 구현

    ```javascript
    import React from "react";
    import { Header, Body } from "../component/layout";
    const Main = () => {
      return (
        <div>
          <>
            <Header name={"메인 페이지"} />
            <Body path={"/shop"} pageName={"상품"} login={false} />
            <Body path={"/login"} pageName={"로그인"} login={false} />
            <Body path={"/mypage"} pageName={"마이페이지"} login={false} />
          </>
        </div>
      );
    };
    
    export default Main;
    ```

    - 각각의 컴포넌트로 보내게 함
- **Login 컴포넌트**
    - 로그인 상태에 따라 로그인/로그아웃 버튼 표시 및 상태관리

    ```javascript
    import React from "react";
    import { Body, Header } from "../component/layout";
    
    const Login = ({ login, setLogin }) => {
      return (
        <>
          <Header name={"로그인 페이지"}></Header>
          <button
            onClick={() => {
              setLogin(!login);
            }}
          >
            {login ? "로그아웃" : "로그인"}
          </button>
          <Body path={"/"} pageName={"메인"}></Body>
        </>
      );
    };
    export default Login;
    ```

    - **`App`**컴포넌트로부터 로그인 상태를 나타내는 **`login`**과 상태를 관리하는 **`setLogin`**을 **`props`**로 받음
    - 로그인 되있으면 로그아웃버튼, 로그인이 되어있지 않으면 로그인 버튼을 나타냄
- **Shop 컴포넌트**
    - 상품 목록 페이지 구현

    ```javascript
    import React from "react";
    import { Body, Header } from "../component/layout";
    const Shop = () => {
      let tempItem = [
        { num: 10, name: "hat" },
        { num: 20, name: "pants" },
        { num: 30, name: "shirt" },
      ];
      return (
        <>
          <Header name={"상품"}></Header>
          <Body path={"/"} pageName={"메인"}></Body>
          {tempItem.map((i, index) => (
            <Body path={`detail/${index}/1/1`} pageName={i.name} />
          ))}
        </>
      );
    };
    
    export default Shop;
    ```

    - DB를 생성하지 않았으므로 임시로 데이터배열을 생성
    - 배열의 데이터와 **`index`**를 받아 **`map`**메서드로 출력
    - 각각의 아이템페이지의 경로는 배열의 순서/1/1 로 구성됨
- **MyPage 컴포넌트**
    - 사용자 마이페이지 구현

    ```javascript
    import React from "react";
    import { Body, Header } from "../component/layout";
    const MyPage = () => {
      return (
        <>
          <Header name={"마이페이지"}></Header>
          <Body path={"/"} pageName={"메인"}></Body>
        </>
      );
    };
    
    export default MyPage;
    ```

- **Detail 컴포넌트**
    - **`URL`**파라미터와 쿼리스트링을 사용해 상품 상세페이지 및 내용표시

    ```javascript
    import React from "react";
    import { Body, Header } from "../component/layout";
    import { useLocation, useParams, useSearchParams } from "react-router-dom";
    
    const Detail = ({ num, name }) => {
      let tempItem = [
        { num: 10, name: "hat" },
        { num: 20, name: "pants" },
        { num: 30, name: "shirt" },
      ];
      const location = useLocation();
      console.log(location);
    
      const params = useParams;
      console.log(params);
    
      const [query, setQuery] = useSearchParams();
      console.log(query.get("num2"));
      return (
        <>
          <Header name={"상세 페이지"} />
          <div>{tempItem[params.id].num}</div>
          <div>{tempItem[params.id].name}</div>
          <Body path={"/"} pageName={"메인"} />
        </>
      );
    };
    
    export default Detail;
    ```

    - **`react-router-dom`** 내부에 있는 hook
    - **`useLocation`** : 현재 브라우저의 url정보
    - **`useParams`** : url의 파라미터 값을 객체형태로 나타냄
    - **`useSearchParams`** : 쿼리스트링을 파싱해서 매개변수 값으로 가져옴
- **Header 컴포넌트**
    - 페이지의 헤더를 표시

    ```javascript
    import React from "react";
    import styled from "styled-components";
    
    const HeaderStyle = styled.div`
      font-size: 15px;
      width: 100%;
      height: 60px;
      color: blue;
    `;
    
    const Header = ({ name }) => {
      return <HeaderStyle>{name}</HeaderStyle>;
    };
    
    export default Header;
    ```

    - **`styled-component`**
    - 템플릿 리터럴과 함께 실제 CSS 구문을 사용하여 스타일을 정의
    - 재사용성이 뛰어나고, 유지보수에 용이함
- **Body 컴포넌트**
    - 페이지 이동을 위한 링크, 버튼

    ```javascript
    import React from "react";
    import { Link, useNavigate } from "react-router-dom";
    
    const Body = ({ path, pageName, login }) => {
      const nav = useNavigate();
      const NavHandler = (_path) => {
        nav(_path);
      };
      return (
        <div>
          <Link to={path}>{pageName}페이지 이동</Link>
          <button onClick={() => NavHandler(path)}>{pageName} 페이지로 이동</button>
        </div>
      );
    };
    
    export default Body;
    ```

    - **`useNavigate`** : react-router-dom 내부 훅, 특정 경로로 이동 ex. 사용자가 로그인 후 메인페이지로 리다이렉트 되는 경우
    - **`NavHandler`** 함수는 버튼이 클릭될 때 해당 경로로 이동하는 기능
    - **`<button onClick={() => NavHandler(path)}>`**버튼이 클릭되면 **`NavHandler`** 함수가 호출되며,  **`nav`** 함수를 사용하여 지정된 경로로 이동

