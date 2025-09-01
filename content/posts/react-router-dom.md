---
title: "React Router DOM"
slug: "react-router-dom"
status: "public"
type: "Post"
category: "💻 Frontend"
tags: ["React"]
summary: ""
thumbnail: "/thumbnails/react-router-dom.png"
date: "2023-11-27"
---


# React Router DOM?


React Router DOM은 React 애플리케이션에서 라우팅을 관리하는 주요 라이브러리임. 페이지가 새로고침되지 않고도 URL 변경에 따라 다른 컴포넌트를 렌더링할 수 있게 해주는 SPA(Single Page Application) 구현을 가능하게 함.


### 라우팅 설정

- `Routes`와 `Route` 컴포넌트로 라우팅 설정.
- `Route`는 URL 경로(`path`)와 렌더링할 컴포넌트(`element`) 지정.

```javascript
import { Routes, Route } from "react-router-dom";

<Routes>
  <Route path="/" element={<Main />} />
  <Route path="/game" element={<Game />} />
  <Route path="/login" element={<Login />} />
  <Route path="/game2" element={<Game2 />} />
</Routes>
```


### `<Link>` 컴포넌트

- 페이지 새로고침 없이 다른 경로로 네비게이션 가능.

```javascript
<Link to={"/game"}>게임페이지로 이동</Link>
<Link to={"/game2"}>가위바위보로 이동</Link>
```


### `Game` 컴포넌트 설명


### 기능

- `Boom` 컴포넌트들을 렌더링하는 함수형 컴포넌트.

### 상태 관리

- `useState`로 `booms` 상태 배열과 `setBooms` 함수 정의.
- 초기 상태는 빈 배열 `[]`.
- `booms`에는 `Boom` 컴포넌트 인스턴스들이 저장됨.

### `useEffect` 사용

- 컴포넌트 마운트 시 `Boom` 인스턴스 생성 및 `booms` 상태 업데이트.
- 길이 8의 `temp` 배열 생성, 반복문으로 `Boom` 인스턴스 추가.

### 리턴 값

- `booms` 배열에 저장된 `Boom` 컴포넌트들을 렌더링.

```javascript
const [booms, setBooms] = useState([]);
useEffect(() => {
  const temp = new Array(8).fill(null).map(() => <Boom />);
  setBooms(temp);
}, []);
return <div>{booms}</div>;
```


### `Game2` 컴포넌트 설명


### State 변수

- `playerSelect`, `comSelect`, `result` 상태 관리.

### 가위바위보 선택 객체

- `select` 객체에 이름과 이미지 경로 정보 저장.

### 선택 처리

- `comSelectHandler`: 컴퓨터의 랜덤 선택 처리.
- `playerSelectHandler`: 플레이어 선택 및 컴퓨터 선택 동시 처리.

### 게임 결과 처리

- `resultHandler`: 플레이어와 컴퓨터 선택 비교, 결과 결정.
- `useEffect`: `comSelect` 변경 시 결과 핸들러 호출.

### 컴포넌트 렌더링

- `Player` 컴포넌트로 선택 및 결과 표시.
- 선택 버튼 제공, 클릭 시 `playerSelectHandler` 호출.

```javascript
const [playerSelect, setPlayerSelect] = useState(null);
const [comSelect, setComSelect] = useState(null);
const [result, setResult] = useState(null);
const Game2 = () => {
  const [playerSelect, setPlayerSelect] = useState(null);
  const [comSelect, setComSelect] = useState(null);
  const [result, setResult] = useState(null);
  const select = {
    scissors: { name: "가위", imgPath: scissors },
    rock: { name: "바위", imgPath: rock },
    paper: { name: "보", imgPath: paper },
  };
  const comSelectHandler = () => {
    let arr = Object.keys(select);
    console.log(arr);
    let comRandom = Math.floor(Math.random() * 3);
    setComSelect(select[arr[comRandom]]);
  };
  const playerSelectHandler = (_select) => {
    setPlayerSelect(select[_select]);
    comSelectHandler();
  };
  useEffect(() => {
    if (comSelect === null) return;
    resultHandler();
  }, [comSelect]);
  const resultHandler = () => {
    if (playerSelect.name === comSelect.name) {
      setResult("무승부");
    } else if (playerSelect.name === "가위") {
      let result = comSelect.name === "보" ? "승리" : "패배";
      setResult(result);
    } else if (playerSelect.name === "바위") {
      let result = comSelect.name === "가위" ? "승리" : "패배";
      setResult(result);
    } else if (playerSelect.name === "보") {
      let result = comSelect.name === "바위" ? "승리" : "패배";
      setResult(result);
    }
  };
return (
    <div className="border">
      <Player name={"유저"} select={playerSelect} result={result} />
      <Player name={"컴퓨터"} select={comSelect} result={result} />
      <div>
        <button
          onClick={() => {
            playerSelectHandler("scissors");
          }}
        >
          가위
        </button>
        <button
          onClick={() => {
            playerSelectHandler("rock");
          }}
        >
          바위
        </button>
        <button
          onClick={() => {
            playerSelectHandler("paper");
          }}
        >
          보
        </button>
      </div>
    </div>
  );
};
```


### `Player` 컴포넌트 설명


### Props

- `name`, `select`, `result`를 Props로 받음.

### 로직

- `name`에 따라 결과 처리.
- "유저"인 경우 `result` 표시, 그 외 경우 반대 결과 표

시.


### 렌더링

- 이름, 선택 이미지, 결과를 `<div>`와 `<img>` 태그를 사용하여 표시.

```javascript
const Player = ({ name, select, result }) => {
  const temp = name === "유저" ? result
              : result === "무승부" ? "무승부"
              : result === "승리" ? "패배" : "승리";
  return (
    <div className="player">
      <div className="name">{name}</div>
      <img className="select-img" src={select && select.imgPath} alt="" />
      <div className="result">{temp}</div>
    </div>
  );
};
```


