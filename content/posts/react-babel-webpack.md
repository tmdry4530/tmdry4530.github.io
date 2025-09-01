---
title: "Babel / Webpack"
slug: "react-babel-webpack"
status: "public"
type: "Post"
category: "💻 Frontend"
tags: ["React"]
summary: ""
thumbnail: "/thumbnails/react-babel-webpack.png"
date: "2023-11-23"
---


# **Babel?**


Babel은 최신 JavaScript 코드 변환에 사용되는 도구. ES6 이상 코드를 ES5로 변환해 구형 브라우저에서도 호환 가능하게 함.


### Babel 주요 기능

- **코드 변환**: 최신 JavaScript 문법을 구형 브라우저에서 이해 가능한 형태로 변환
- **브라우저 호환성 개선**: 최신 기능 사용하면서도 구형 브라우저 지원 가능
- **플러그인 시스템**: 다양한 변환 옵션 제공, 사용자 필요에 따른 커스텀 변환 가능

### Babel 설치 및 구성


```plain text
npm install @babel/core @babel/cli @babel/preset-env
```


설치 후 프로젝트 루트에 `.babelrc` 파일 생성, 필요한 설정 작성하여 커스텀 변환 구성


```json
{
  "presets": ["@babel/preset-env"]
}
```


이 설정으로 ES6 코드를 ES5로 변환 가능


### Babel 실행


```plain text
npx babel ["변환할 파일 경로"] --out-file ["내보내는 파일명과 경로"]
```


위 명령어로 특정 파일 변환 실행 가능. 예를 들어 `app.js` 파일을 `dist/app.js`로 변환


---


# Webpack?


Webpack은 다양한 자원(JavaScript, CSS, 이미지 등)을 최소 파일로 컴파일하여 로딩 속도 개선에 도움을 줌. 모듈 번들링 과정에서 의존성 관리


### Webpack 주요 속성

1. **Entry (진입점)**: 애플리케이션 빌드 시작점, 주로 메인 JavaScript 파일 지정
2. **Output (출력 설정)**: 빌드된 결과물 저장 위치 및 파일명 설정, 번들링된 자원 관리
3. **Loaders (로더)**: JavaScript 외 파일 처리, CSS, 이미지 파일 등을 JavaScript 모듈로 변환
4. **Plugins (플러그인)**: 번들링 최적화, 파일 생성 등 추가 기능 구현, 확장성 제공

### Webpack 설치 및 실행


```plain text
npm install webpack webpack-cli
```


Webpack과 CLI 도구 설치 후, 프로젝트 루트에서 `npx webpack` 명령어로 번들링 실행


### Webpack 추가 기능


스타일 및 React 관련 설정을 위한 추가 패키지 설치


```plain text
npm install css-loader style-loader
npm install @babel/core @babel/preset-env @babel/preset-react babel-loader html-webpack-plugin react react-dom
```


이러한 설정으로 Webpack을 통해 다양한 자원과 애플리케이션 관리 가능


---


# 실습 내용


### Babel 설정 (`.babelrc`)


```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```


React 프로젝트에 필요한 두 가지 주요 프리셋 지정. `@babel/preset-env`는 최신 JavaScript를 변환하고, `@babel/preset-react`는 JSX 문법을 JavaScript로 변환


### React 컴포넌트 (`App.js`)


```javascript
class App extends React.Component {
  render() {
    return (
      <ul>
        <li>list 1</li>
      </ul>
    );
  }
}

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<App />);
```


React 컴포넌트 `App` 정의하고, `ReactDOM.createRoot`를 사용해 DOM에 렌더링. JSX 문법으로 UI 구조 정의


### Webpack 설정 (`webpack.config.js`)


```javascript
const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports =
```


