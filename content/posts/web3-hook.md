---
title: "Web3 hook"
slug: "web3-hook"
status: "public"
type: "Post"
category: "Blockchain"
tags: ["blockchain", "solidity"]
summary: ""
thumbnail: "/thumbnails/web3-hook.jpg"
date: "2024-01-30"
---


# Web3 Hook의 역할


웹3와 관련된 로직이나 사용할수 있는 기능을 리액트훅으로 구현한것이다.


이 훅의 주요 역할로는

1. 브라우저에 메타마스크 같은 이더리움 지갑이 설치되있는지 확인하고 해당 지갑을 연결해서 웹3인스턴스를 생성한다
2. 사용자의 이더리움 계정을 요청하고, 사용자가 계정에 접근을 허용하면 해당계정의 주소와 잔액정보를 상태로 관리한다.
3. 웹3인스턴스나 계정정보가 변경될때마다 감지하고 상태를 업데이트한다.

# 구현 예제


### 토큰 표준 정의


먼저 배포할 토큰의 표준을 정의한다.


```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DomToken is ERC20 {
    constructor(string memory name, string memory symbol, uint value) ERC20(name, symbol) {
        _mint(msg.sender, value * (10 ** decimals()));
    }
}
```

1. 오픈제플린은 재사용 가능한 스마트 컨트랙트 컴포넌트를 제공하는 라이브러리이다.
2. ERC20컨트랙트를 상속받은 DomToken 이라는 새로운 스마트 컨트랙트를 선언한다.
3. 생성자함수는 토큰의 이름, 심볼, 초기 발행량을 인자로 받는다.
4. 토큰을 받을 주소와 발행할 토큰의 양을 인자로 받고, 컨트랙트를 배포한 주소에 토큰을 발행한다. 발행할 토큰의 양은 인자로 받은 value에 토큰의 소수점 자릿수를 계산한다.

### 웹3 훅


웹3 인스턴스를 상태로 관리하고, 지갑 설치 유무를 확인하는 기능을 훅으로 만든다.


```javascript
import { useState, useEffect } from "react";
import Web3 from "web3";

const useWeb3 = () => {
  const [user, setUser] = useState({ account: "", balance: 0 });
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    console.log(window.ethereum);
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(async ([data]) => {
          const web3Provider = new Web3(window.ethereum);
          const balance = await web3Provider.eth.getBalance(data);
          console.log(balance);
          const Wei = await web3Provider.utils.fromWei(balance, "ether");
          console.log(Wei);
          setUser({ account: data, balance: Wei });
          setWeb3(web3Provider);
        });
    } else {
      alert("메타마스크를 설치해주세요~");
    }
  }, []);
  return { user, web3 };
};

export default useWeb3;
```


```javascript
import Web3 from "web3";

const useWeb3 = () => {
  const [user, setUser] = useState({ account: "", balance: 0 });
  const [web3, setWeb3] = useState(null);
```

1. 웹3 라이브러리를 임포트한다.
2. 사용자의 계정 정보를 관리하는 상태를 정의한다. 초기 상태는 빈 계정 주소와 0의 잔액을 가진 객체이다.
3. 웹3 인스턴스를 관리하는 상태를 정의한다. 초기 상태는 null이다.

```javascript
useEffect(() => {
    console.log(window.ethereum);
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(async ([data]) => {
          const web3Provider = new Web3(window.ethereum);
          const balance = await web3Provider.eth.getBalance(data);
          const Wei = await web3Provider.utils.fromWei(balance, "ether");
          setUser({ account: data, balance: Wei });
          setWeb3(web3Provider);
        });
    } else {
      alert("메타마스크를 설치해주세요~");
    }
  }, []);
```

1. 브라우저에 메타마스크 같은 이더리움 관련 확장프로그램을 콘솔에 출력한다. → 이더리움 객체
2. 만약 이더리움 객체가 있다면 사용자의 계정을 요청한다. 요청이 승인되면 사용자의 계정 주소를 포함하는 배열을 결과로 가진다.
3. 이더리움 객체를 프로바이더로 사용해서 새로운 웹3 인스턴스를 생성하고, 잔액을 조회하고, 조회한 잔액을 wei단위에서 ether단위로 변환한다.
4. 사용자의 계정 정보 상태를 업데이트 하고, 웹3 인스턴스 상태를 업데이트 한다.
5. 만약 이더리움 객체가 없다면 지갑을 설치 해달라는 알림메시지를 표시한다.

### 메인 컴포넌트


화면에 그려주기 위한 메인 컴포넌트 작성


```javascript
import "./App.css";
import useWeb3 from "./hooks/web3.hook";
import abi from "./abi/SoonToken.json";
import { useState, useEffect, useRef } from "react";

function App() {
  const { user, web3 } = useWeb3();
  const [SoonToken, setSoonToken] = useState(null);
  const [token, setToken] = useState(0);
  const accountInput = useRef();
  const tokenInput = useRef();
  useEffect(() => {
    if (web3 == null || SoonToken != null) return;
    const _SoonToken = new web3.eth.Contract(
      abi,
      "0x50C2E5FfbB518b4bC00b6252967031016E20F093",
      { data: "" }
    );
    setSoonToken(_SoonToken);
  }, [web3]);

  const getToken = async (account) => {
    if (SoonToken == null) return;
    let result = web3.utils
      .toBigInt(await SoonToken.methods.balanceOf(account).call())
      .toString();
    result = await web3.utils.fromWei(result, "ether");
    setToken(result);
    return result;
  };

  const transfer = async () => {
    await SoonToken.methods
      .transfer(
        accountInput.current.value,
        await web3.utils.toWei(tokenInput.current.value, "ether")
      )
      .send({
        from: user.account,
      });
    getToken(user.account);
  };

  useEffect(() => {
    getToken(user.account);
  }, [SoonToken]);

  return (
    <div className="App">
      <div>지갑 주소 : {user.account}</div>
      <div>지갑의 잔액 : {user.balance} ETH</div>
      <div>토큰 량 : {token}</div>
      <label>토큰 받을 계정</label>
      <input ref={accountInput}></input>
      <label>보낼 토큰량</label>
      <input ref={tokenInput}></input>
      <button onClick={transfer}>토큰 전송</button>
    </div>
  );
}

export default App;
```


```javascript
import useWeb3 from "./hooks/web3.hook";
import abi from "./abi/DomToken.json";
```

1. 이전에 작성했던 웹3훅을 임포트한다.
2. 해당 파일에서 abi를 임포트한다. (DomToken 컨트랙트 메서드를 호출하는데 사용됨)

```javascript
const { user, web3 } = useWeb3();
  const [DomToken, setDomToken] = useState(null);
  const [token, setToken] = useState(0);
  const accountInput = useRef();
  const tokenInput = useRef();
```

1. 웹3인스턴스와 사용자의 계정 정보를 가져온다
2. 컨트랙트의 인스턴스를 관리하는 상태를 정의하고, 초기 상태는 null이다.
3. 사용자의 토큰 잔액으 관리하는 상태를 정의하고, 초기 상태는 0이다.
4. 토큰을 받을 계정의 입력필드를 참조하는 ref를 생성한다. (입력필드의 현재 값 가져옴)
5. 보낼 토큰의 양을 입력하는 필드를 참조하는 ref를 생성한다.

```javascript
useEffect(() => {
    if (web3 == null || DomToken != null) return;
    const _DomToken = new web3.eth.Contract(
      abi,
      "0x50C2E5FfbB518b4bC00b6252967031016E20F093",
      { data: "" }
    );
    setDomToken(_DomToken);
  }, [web3]);
```

1. 웹3인스턴스가 없거나 DomToken의 인스턴스가 이미 있을 경우 함수를 종료한다.
2. 컨트랙트의 새로운 인스턴스를 생성하고, 생성자는 컨트랙트의 abi, 주소, 선택적으로 컨트랙트 데이터를 인자로 받는다
3. 컨트랙트의 인스턴스 상태를 업데이트 하는 코드이다. 생성한 컨트랙트의 인스턴스를 상태에 저장한다.
4. web3의 상태가 변경될때마다 훅 내의 함수를 실행한다.

```javascript
const getToken = async (account) => {
    if (DomToken == null) return;
    let result = web3.utils
      .toBigInt(await DomToken.methods.balanceOf(account).call())
      .toString();
    result = await web3.utils.fromWei(result, "ether");
    setToken(result);
    return result;
  };
```

1. 컨트랙트의 인스턴스가 없을 경우 함수를 종료한다.
2. 컨트랙트의 balanceOf 메서드를 호출해서 매개변수로 주어진 계정의 토큰 잔액을 조회한 뒤, 정수로 변환하고 다시 문자열로 변환하여 변수에 저장한다.
3. 조회한 잔액의 단위를 wei에서 ether로 변환한다.
4. 토큰잔액 상태를 업데이트하고, 잔액을 반환한다.

```javascript
const transfer = async () => {
    await DomToken.methods
      .transfer(
        accountInput.current.value,
        await web3.utils.toWei(tokenInput.current.value, "ether")
      )
      .send({
        from: user.account,
      });
    getToken(user.account);
  };
```

1. transfer 메서드를 호출해서 토큰을 전송한다. 사용자가 입력한 주소와 토큰의 양을 인자로 받아 해당 주소로 트랜잭션을 보낸다.
2. 토큰 전송후 사용자의 토큰잔액을 다시 조회한다.

```javascript
useEffect(() => {
    getToken(user.account);
  }, [DomToken]);
```

1. getToken 메서드는 DomToken의 잔액을 조회하는 코드이다.
2. DomToken의 상태가 변경될때마다 훅 내의 함수가 실행되도록 한다.

