---
title: "Factory"
slug: "factory"
status: "public"
type: "Post"
category: "Blockchain"
tags: ["blockchain", "solidity"]
summary: ""
thumbnail: "/thumbnails/factory.jpg"
date: "2024-02-06"
---


# 팩토리 컨트랙트

- 스마트 컨트랙트 내에서 다른 컨트랙트를 생성하고 배포하는 기능으 가진 컨트랙트
- 공장에서 특정 규칙을 따라 제품을 생산하는 것처럼, 정해진 규칙에 따라 새로운 컨트랙트를 만드는 방식이다.
- 예시

```solidity
import "./ERC721.sol";

contract FactoryNFT {
    function createContract (string memory _name, string memory _symbol) external {
      ERC721 newNFT = new ERC721(_name, _symbol);

      emit createEvent(newNFT, msg.sender);
    }

    event createEvent(address indexed _address, address indexed _owner);
}
```

1. external 제한자를 사용해서 가스비를 절약하고, 코드 재사용성▲ 복잡성▼, 상태변수 접근을 최소화하여 효율성을 높인 ERC721토큰 컨트랙트를 생성하는 팩토리 컨트랙트이다.

## 스마트 컨트랙트의 DAO


### DAO란?

- DAO는 분산 자율 조직(Distributed Autonomous Organization)의 약자로, 중앙화가 아닌 탈중앙화된 방식으로 조직의 규칙을 운영하는 시스템
- 스마트 컨트랙트를 통해 구현되며, 조직 내 멤버들의 투표를 통해 의사 결정이 이루어진다.
- DAO의 핵심특징은 분산화, 투명성, 자율성, 저항성으로 모든 기록은 공개적으로 조회 및 검증이 가능하고, 탈중앙화답게 중앙집권의 제어없이 운영된다.

### DAO의 장점

- DAO의 장점은 중앙과니가 없이 조직 내 멤버들의 투표로 운영된다는 것이다. 멤버들은 토큰을 통해 거버넌스에 참여할 권리를 가지며, 투표권은 토큰의 양에 따라 결정된다
- 참여자들은 컨트랙트의 규칙에 따라 제안에 자금을 사용하거나, 제안으 실행하며, 승인 또는 거부를 결정할수있다.

### DAO의 운영과정

- 제안 생성
- 멤버 소집
- 투표시스템을 통한 제안 투표
- 유예 기간 설정
- 다수결에 따른 제안 실행

## 팩토리 컨트랙트 구현

- 팩토리 컨트랙트는 제안을 관리하며, DAO 컨트랙트ㅡㄹ 생성 및 관리하는 역할을 한다. 이를 통해 DAO의 운영과정이 구현된다.

### 컨트랙트 보안문제 : TheDAO 사례

- TheDao사건은 재진입 공격으로 인해 발생한 보안문제의 대표적인 사례라고 한다.
- 컨트랙트의 메서드를 예측하지 못한 순서로 재귀적으로 호출하여 이더를 탈취했다. 이러한 문제를 방지하기 위해 ‘checks-effects-interactions’ 패턴을 사용하는것이 좋다.
- 이 패턴은 코드를 검증, 상태변경, 외부 컨트랙트 호출의 순서로 작성하는 디자인 패턴이다.
- 이 패턴을 적용한 예제 구현

```solidity
import "./myInterest";

contract myBank {
    mapping(address => uint) balances;
    myInterest _myInterest;

    constructor(address _CA){
        _myInterest = myInterest(_CA);
    }

    receive() payable {
        balances[msg.sender] += msg.value;
        _myInterest.setInterest(msg.sender, msg.value);
    }

    function ethOut(uint _amount) payable {
        require(balances[msg.sender] >= _amount, "잔액 부족");

        balances[msg.sender] -= _amount;

        address payable(msg.sender).transfer(_amount);
        _myInterest.getInterest(msg.sender);
    }

    function getBalance() public view returns(uint) {
        return balances[msg.sender];
    }
}

contract myInterest {
    mapping(address => uint) balances;

    function setInterest(address owner, uint _balance) external {
        balances[owner] += _balance;
    }

    function getInterest(address owner) external payable {
        uint interest = balances[owner] / 10; 
        address payable(owner).transfer(interest);
    }
}
```


차근차근 살펴보자


```solidity
import "./myInterest";

contract myBank {
    mapping(address => uint) balances;
    myInterest _myInterest;

    constructor(address _CA){
        _myInterest = myInterest(_CA);
    }
```

1. 이자 계산 컨트랙트를 가져온다.
2. 사용자의 이더리움 잔액을 추적한다.
3. 이자계산을 위해서 가져온 컨트랙트와 상호작용한다.
4. 생성자에서 이자계산 컨트랙트의 주소를 받아 초기화한다.

```solidity
receive() payable {
        balances[msg.sender] += msg.value;
        _myInterest.setInterest(msg.sender, msg.value);
    }
```

1. 사용자가 이더리움을 입금할때 호출된다.
2. 입금한 사용자의 주소와 금액을 기록한다.
3. 이자계산 컨트랙트에 입금정보를 전달한다.

```solidity
function ethOut(uint _amount) payable {
        require(balances[msg.sender] >= _amount, "잔액 부족");

        balances[msg.sender] -= _amount;

        address payable(msg.sender).transfer(_amount);
        _myInterest.getInterest(msg.sender);
    }
```

1. 출금할때 호출된다.
2. 출금 전에 사용자의 잔액이 충분한지 검증한다. (checks)
3. 잔액이 충분하면 사용자의 잔액을 감소시킨다. (effects)
4. 사용자에게 이더리움을 전송하고 이자를 받는다. (interactions)

```solidity
function getBalance() public view returns(uint) {
        return balances[msg.sender];
    }
```

1. 사용자의 현재 이더리움 잔액을 조회한다.

```solidity
contract myInterest {
    mapping(address => uint) balances;

    function setInterest(address owner, uint _balance) external {
        balances[owner] += _balance;
    }
```

1. 사용자별 이더리움 입금액을 추적한다.
2. 사용자의 입금액을 기록하여 이자를 계산할 준비를 한다.

```solidity
function getInterest(address owner) external payable {
        uint interest = balances[owner] / 10; 
        address payable(owner).transfer(interest);
    }
}
```

1. 사용자에게 이자를 지급하는 함수
2. 이자유을 적용하여 이자금액을 계산한다.
3. 예시로 10퍼의 이자율을 적용하고, 계산된 이자를 사용자에게 전송한다.

### 목적 및 방법

- 재진입 공격을 방지하기 위해, 상태변수를 이용하여 메서드가 이미 실행중인지 확인하고, 실행중이면 다른 호출을 막는 방지가드를 설정한다.

### 가스비 절약 및 코드 최적화

- 스마트 컨트랙트의 실행 비용을 줄이기 위해 새로운 문법과 논리제어자를 사용한다
- 코드의 재사용성을 높이고, 가스비를 절약한다.
- 조건 논리제어자는 특정조건을 만족할때만 함수가 실행되도록 하며, 코드의 중복을 줄인다.

### 구현 방식

- 조건 논리제어자르 사용하여 함수 실행전에 특정조건을 검사한다. 이를 통해 코드의 안정성을 높이고, 재사용 가능한 조건문을 통해 가스비를 절약하수있다.
- 예르 들어, 함수가 특정 사용자에 의해서만 호출될 수 있도록 제한하는 경우, 조건 논리제어자를 사용하여 이를 간단하게 구현할 수 있다.

```solidity
modifier onlyOwner() {
    require(msg.sender == owner, "이 기능은 오직 소유자만 호출할 수 있습니다.");
    _;
}

function ownerMinting() public onlyOwner {
    _mint(msg.sender, 10000 * (10 ** 18));
}

modifier onlyOwner(address _owner){
    require(_owner == owner, "이 기능은 오직 소유자만 호출할 수 있습니다.");
    _; 
}

function ownerMinting(address sender) public onlyOwner(sender) {
    _mint(sender, 10000 * (10 ** 18));
}
```

1. 함수를 호출한사람이 컨트랙트의 소유자인지 확인 후에 실제함수의 로직이 실행된다
2. 소유자에게 10000토큰을 발행한다
3. 주어진 주소가 소유자와 일치하는지 확인한다. 특정주소가 소유자인지 확인하는 수정자함수
4. 주어진 주소에 10000토큰을 발행한다.

## DAO 스마트 컨트랙트 구현


```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// DAO 컨트랙트 정의
contract DAO {
    // 컨트랙트 배포자를 저장하는 상태 변수
    address private owner;
    // 멤버 여부를 저장하는 매핑. 주소가 멤버인지 아닌지를 나타냄
    mapping(address => bool) private members;
    // 현재 멤버 수를 저장하는 상태 변수
    uint private memberCount;
    // 제안들을 저장하는 배열
    Proposal[] public proposals;
    // 특정 멤버가 특정 제안에 투표했는지 여부를 저장하는 매핑
    mapping(address => mapping(uint => bool)) private voted;

    // DAO 컨트랙트 생성자
    constructor(address _owner) {
        // 컨트랙트 배포자를 owner 상태 변수에 할당
        owner = _owner;
        // 배포자를 첫 번째 멤버로 추가
        members[_owner] = true;
        // 멤버 수를 1 증가
        memberCount += 1;
    }

    // 제안의 상태를 나타내는 열거형
    enum Play {
        loading, // 준비 중
        start,   // 시작됨
        end      // 종료됨
    }

    // 제안을 나타내는 구조체
    struct Proposal {
        string title; // 제안의 제목
        string text;  // 제안의 내용
        uint votes;   // 투표 수
        Play plays;   // 제안의 상태
        bool execute; // 제안이 실행되었는지 여부
    }

    // 멤버만 호출할 수 있는 함수를 위한 제어자
    modifier onlyMenber() {
        require(members[msg.sender], "no member");
        _;
    }

    // 오직 컨트랙트 소유자만 호출할 수 있는 함수를 위한 제어자
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    // 이미 투표한 멤버가 다시 투표하지 못하도록 하는 제어자
    modifier alreadyVote(uint index) {
        require(!voted[msg.sender][index]);
        _;
    }

    // 멤버를 추가하는 함수
    function setghMenbers(address _address) public onlyOwner {
        members[_address] = true; // 멤버로 추가
        memberCount += 1; // 멤버 수 증가
    }

    // 제안을 생성하는 함수
    function createProposal(
        string memory _title,
        string memory _text
    ) public onlyMenber {
        proposals.push(
            Proposal({
                title: _title,
                text: _text,
                votes: 0,
                plays: Play.loading,
                execute: false
            })
        );
    }

    // 제안에 투표하는 함수
    function vote(uint _index) public onlyMenber alreadyVote(_index) {
        Proposal storage proposal = proposals[_index]; // 투표할 제안을 가져옴

        require(proposal.plays == Play.start); // 제안이 시작 상태인지 확인
        proposal.votes += 1; // 투표 수 증가

        voted[msg.sender][_index] = true; // 재투표 방지를 위해 투표 기록
    }

    // 투표를 시작하는 함수
    function startVote(uint _index) public onlyOwner {
        Proposal storage proposal = proposals[_index];
        proposal.plays = Play.start; // 제안의 상태를 시작으로 변경
    }

    // 투표를 종료하는 함수
    function endVote(uint _index) public onlyOwner {
        Proposal storage proposal = proposals[_index];
        require(proposal.plays == Play.start); // 제안이 시작 상태인지 확인
        require(proposal.votes > memberCount / 2); // 과반수 이상이 투표했는지 확인

        proposal.execute = true; // 제안 실행
        proposal.plays = Play.end; // 제안 상태를 종료로 변경
    }
}
```


## **DAO 인스턴스를 생성하고 관리하는 팩토리 컨트랙트**


```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./DAO.sol";

contract Factory {
    DAO[] private DAOs;

    // 이 함수는 새로운 DAO 컨트랙트를 생성하고, 생성된 컨트랙트를 DAOs 배열에 추가
    // msg.sender는 컨트랙트를 생성하는 사용자의 주소
    function createContract() public {
        DAO newDAO = new DAO(msg.sender); // 새 DAO 인스턴스 생성
        DAOs.push(newDAO); // 생성된 DAO를 DAOs 배열에 추가
    }

    // 이 수정자는 함수가 받은 인덱스가 DAOs 배열의 길이 내에 있는지 확인
    // 인덱스가 배열의 길이를 초과하면, 함수 실행이 중단
    modifier checkLength(uint index, DAO[] memory _dao) {
        require(index < _dao.length); // 인덱스 유효성 검사
        _; // 수정자를 사용하는 함수의 본문이 이 위치에 삽입
    }

    // 이 함수는 특정 인덱스에 해당하는 DAO 컨트랙트를 반환
    // checkLength 수정자를 사용하여, 요청된 인덱스가 유효한지 먼저 확인
    function getContract(
        uint _index
    ) public view checkLength(_index, DAOs) returns (DAO) {
        return DAOs[_index]; // 요청된 인덱스에 해당하는 DAO 반환
    }
}
```


