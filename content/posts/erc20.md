---
title: "ERC20 / truffle"
slug: "erc20"
status: "public"
type: "Post"
category: "Blockchain"
tags: ["blockchain", "solidity"]
summary: ""
thumbnail: "/thumbnails/erc20.jpg"
date: "2024-01-29"
---


# Truffle과 ERC20


Truffle은 Dapps 개발을 쉽게 할 수 있도록 테스트 환경을 제공하는 프레임워크이다. 스마트컨트랙트의 컴파일, 배포 및 테스트를 쉽게 할수있다.


```shell
npx create-react-app erc20
npm i truffle
```


Truffle 초기 설정을 위해 `npx truffle init`을 실행하면 3개의 폴더가 생성된다.

1. **contracts :** 솔리디티 코드를 작성한 .sol 파일을 저장하는 폴더이다. 컴파일을 진행하면 .build 폴더가 생성되고 컴파일된 파일들이 json 형태로 생성된다.
2. **migrations :** 컨트랙트 배포를 위한 js 코드를 작성하는 폴더이다.
3. **test :** 테스트 파일을 작성하는 폴더이다.

Truffle 설정 파일인 truffle.config에서는 네트워크 속성과 솔리디티 컴파일 버전 정보를 명시한다.


## 컴파일 및 배포


```shell
npx ganache-cli
npx truffle compile
npx truffle migrate
```

1. contracts 폴더에 솔리디티 파일을 작성한 후, ganache 네트워크를 열고 다음 명령어를 실행한다.
2. 컴파일이 완료되면 .build 폴더가 생성되고 컴파일된 내용이 json 파일로 생성된다. 배포를 진행하면 json 파일의 내용이 변경된다.
3. 배포를 위한 파일 이름은 [번호]__[내용]__[파일명].js 형태로 작성한다. 예를 들어, 1_deploy_Counter.js와 같다.

## Remix를 이용한 배포


Remix는 Solidity 개발을 위한 웹 기반 IDE이고, 로컬환경에 있는 파일을 Remix 환경에서 사용할 수 다.


```markdown
npm i -g @remix-project/remixd
remixd -s . --remix-ide https://remix.ethereum.org
```

- 현재 디렉토리를 Remix IDE에 공유하도록 remixd를 실행한다

# ERC20


ERC20은 이더리움 네트워크에서 가장 표준이 되는 토큰을 정의한 것이다. ERC20 토큰은 교환 기능을 가지고 있다.


토큰과 코인의 차이는 토큰이 메인넷이 있는지 없는지에 따라 달라진다. 


```shell
npm i @openzeppelin/contracts
```


OpenZeppelin은 재사용 가능한 스마트 컨트랙트를 제공하는 라이브러리


## ERC20 토큰 표준 구현


### 인터페이현


먼저 ERC20 표준을 따르는 토큰을 위한 기본적인 기능 및 구조를 인터페이스로 정의한다


```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IERC20 {
    function totalSupply() external view returns (uint);

    function balanceOf(address account) external view returns (uint);

    function transfer(address to, uint amount) external returns (bool);

    function approve(address spender, uint256 value) external returns (bool);

    function allowance(address owner, address spender) external returns (uint);

    function transferFrom(
        address spender,
        address to,
        uint amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint value);

    event Approval(address indexed owner, address indexed spender, uint value);
}
```


하나하나 뜯어보자


```shell
function totalSupply() external view returns (uint);
```

- 총 토큰 발행량을 반환한다.

```solidity
function balanceOf(address account) external view returns (uint);
```

- 주어진 주소의 토큰잔액을 반환한다. 매개변수는 address account로, 잔액을 조회할 주소이다.

```solidity
function transfer(address to, uint amount) external returns (bool);
```

- 토큰을 전송하고 성공여부를 반환한다. 매개변수는 토큰을 전송할 주소와 토큰의 양으로 각각 토큰을 전송할 주소와 토큰의 양이다

```solidity
function approve(address spender, uint256 value) external returns (bool);
```

- 토큰사용을 위임하고 성공여부를 반환한다. 매개변수는 토큰사용을 위임받을 주소와 위임할 토큰의 양이다.

```solidity
function allowance(address owner, address spender) external returns (uint);
```

- 위임받은 토큰잔액을 반환한다. 매개변수는 각각 토큰소유자의 주소와 토큰사용을 위임받은 주소이다.

```solidity
function transferFrom(
        address spender,
        address to,
        uint amount
    ) external returns (bool);
```

- 위임받은 토큰을 전송하고 성공여부를 반환한다. 매개변수는 각각 토큰을 전송할 주소, 토큰을 받을 주소, 전송할 토큰의 양이다.

그리고 두가지 이벤트를 정의한다


```solidity
event Transfer(address indexed from, address indexed to, uint value);

event Approval(address indexed owner, address indexed spender, uint value);
```

1. 토큰전송 이벤트를 기록한다. 매개변수는 각각 토큰을 보낸주소, 토큰을 받은주소, 전송된 토큰의 양이다.
2. 토큰위임 이벤트를 기록한다. 매개변수는 각각 토큰소유자의 주소, 토큰 사용을 위임받은 주소, 위임된 토큰의 양이다.

### 토큰 표준 구현


```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./IERC20.sol";

contract ERC20 is IERC20 {
    string public name;
    string public symbol;
    uint8 public decimals = 18;
    uint public override totalSupply;
    address private owner; 
    mapping(address => uint) public balances; 
    mapping(address => mapping(address => uint)) public override allowance; 

    constructor(string memory _name, string memory _symbol, uint256 _amount) {
        owner = msg.sender;
        name = _name;
        symbol = _symbol;
        mint(_amount * (10 ** decimals));
    }

    function mint(uint amount) internal {
        balances[msg.sender] += amount;
        totalSupply += amount;
    }

    function transfer(address to, uint amount) external override returns (bool) {
        balances[msg.sender] -= amount;
        balances[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }

    function approve(address spender, uint amount) external override returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(address spender, address to, uint amount) 
    external override returns (bool) {
        require(allowance[spender][msg.sender] >= amount);
        allowance[spender][msg.sender] -= amount;
        balances[spender] -= amount;
        balances[to] += amount;
        return true;
    }

    function balanceOf(address account) external view returns (uint) {
        return balances[account];
    }

    receive() external payable {
        uint amount = msg.value * 20;
        if (msg.sender == owner) {
            mint(amount);
        }
        require(balances[owner] >= amount);
        balances[owner] -= amount;
        balances[msg.sender] += amount;
    }
}
```


하나하나 뜯어보자


```solidity
import "./IERC20.sol";

contract ERC20 is IERC20 {
```

1. ERC20 토큰 표준의 인터페이스를 임포트한다
2. ERC20이라는 새로운  스마트 컨트랙트를 선언하고 IERC20 인터페이스를 상속받는다

```solidity
string public name;
    string public symbol;
    uint8 public decimals = 18;
    uint public override totalSupply;
    address private owner; 
    mapping(address => uint) public balances; 
    mapping(address => mapping(address => uint)) public override allowance;
```

1. 토큰의 이름을 저장하는 상태변수.
2. 토큰의 심볼을 저장하는 상태변수.
3. 토큰의 소수점 이하 자릿수를 저장하는 상태변수.
4. 토큰의 총 발행량을 저장하는 상태변수.
5. 토큰의 소유자 주소를 저장하는 상태변수.
6. 각 주소의 토큰 보유량을 저장하는 상태변수.
7. 각 주소가 다른 주로부터 위임받은 토큰의 양을 저장하는 상태변수.

```solidity
constructor(string memory _name, string memory _symbol, uint256 _amount) {
        owner = msg.sender;
        name = _name;
        symbol = _symbol;
        mint(_amount * (10 ** decimals));
    }
```

1. 생성자함수는 토큰의 이름, 심볼, 초기 발행량을 인자로 받는다.
2. 컨트랙트를 배포한 주소(msg.sender)를 토큰의 소유자로 설정한다
3. 인자로 받은 토큰의 이름과 심볼을 상태변수에 저장한다.
4. 인자로 받은 초기 발행량에 토큰의 소수점 자릿수를 고려하여 토큰을 발행하는 mint함수를 호출한다.

```solidity
function mint(uint amount) internal {
        balances[msg.sender] += amount;
        totalSupply += amount;
    }
```

1. 발행할 토큰의 양을 인자로 받는다.
2. 함수를 호출한 주소의 토큰 잔액에 발행할 토큰의 양을 더한다.
3. 총 토큰 발행량에 발행할 토큰의 양을 더한다

```solidity
function transfer(address to, uint amount) external override returns (bool) {
        balances[msg.sender] -= amount;
        balances[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }
```

1. 토큰을 전송할 주소와 전송할 토큰의 양을 인자로 받는다.
2. 함수를 호출한 주소의 토큰 잔액에서 전송할 토큰의 양을 뺀다.
3. 토큰을 받을 주소의 토큰 잔액에 전송할 토큰의 양을 더한다.
4. 토큰 전송 이벤트를 발생시키고, 토큰을 보낸주소, 받는주소, 전송된 토큰의 양을 인자로 받는다.
5. 함수가 성공적으로 동작하면 true를 반환한다.

```solidity
function approve(address spender, uint amount) external override returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }
```

1. 토큰 사용을 위임받을 주소와 토큰의 양을 인자로 받는다.
2. 함수를 호출한 주소가 토큰사용을 위임받을 주소에게 위임할 토큰의양을 설정한다.
3. 토큰위임 이벤트를 발생시킨디ㅏ. 토큰소유자의 주소, 토큰사용을 위임받은 주소, 위임된 토큰의 양을 인자로 받는다.
4. 함수가 성공적으로 동작하면 true를 반환한다.

```solidity
function transferFrom(address spender, address to, uint amount) 
    external override returns (bool) {
        require(allowance[spender][msg.sender] >= amount);
        allowance[spender][msg.sender] -= amount;
        balances[spender] -= amount;
        balances[to] += amount;
        return true;
    }
```

1. 토큰을 전송할 주소, 받을 주소, 토큰의 양을 인자로 받는다
2. 전송할 주소가 함수를 호출한 주소에게 위임된 토큰의 양이 전송할 토큰의 양보다 많거나 같아야한다는걸 요구한다.
3. 전송할 주소가 함수를 호출한 주소에게 위임된 토큰의 양에서 전송하 토큰의 양을 뺀다
4. 전송할 주소의 토큰잔액에서 전송할 토큰의 양을 뺀다
5. 토큰을 받을 주소의 토큰 잔액에 전송할 토큰의 양을 더한다
6. 함수가 성공적으로 동작하면 true를 반환한다.

```solidity
function balanceOf(address account) external view returns (uint) {
        return balances[account];
    }
```

1. 토큰잔액을 조회할 주소를 인자로 받는다.
2. 인자로 받은 주소의 토큰잔액을 반환한다.

```solidity
receive() external payable {
        uint amount = msg.value * 20;
        if (msg.sender == owner) {
            mint(amount);
        }
        require(balances[owner] >= amount);
        balances[owner] -= amount;
        balances[msg.sender] += amount;
    }
```

1. 이더를 받아서 토큰을 발행하고, 발행된 토큰을 보내는 주소에 전송하는 함수이고, 컨트랙트가 이더를 받을수있게한다.
2. 함수를 호출하면서 보낸 이더의 양에 20을 곱해서 토큰의 양을 계산한다.
3. 함수를 호출한 주소가 토큰의 소유자일 경우, 계산된 토큰의 양만큼 토큰을 발행하는 mint함수를 호출한다.
4. 소유자의 토큰 잔액이 계산된 토큰의 양보다 많거나 같아야한다.
5. 소유자의 토큰 잔액에서 계산된 토큰의양을 뺀다.
6. 함수를 호출한 주소의 토큰 잔액에 계산된 토큰의 양을 더한다.

