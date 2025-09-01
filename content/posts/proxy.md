---
title: "Proxy"
slug: "proxy"
status: "public"
type: "Post"
category: "Blockchain"
tags: ["blockchain", "solidity"]
summary: ""
thumbnail: "/thumbnails/proxy.jpg"
date: "2024-02-07"
---


# 프록시

- 프록시는 다른 컨트랙트 대신 작동하고 업그레이드 때 중요한 역할을 한다.
- 통신 과정 :
    - 클라이언트가 프록시에 요청을 보낸다.
    - 클라이언트에서 받은 요청을 프록시가 백엔드 컨트랙트로 전달한다.
    - 백엔드 컨트랙트 처리 결과를 프록시를 거쳐 클라이언트에 전달한다.
- 이 과정 중 프록시 상태가 업데이트 되면 클라이언트에도 반영이 된다.

## 프록시 컨트랙트 패턴

- 프록시 컨트랙트 패턴은 블록체인에서 컨트랙트를 업그레이드하는 방법중 하나이다.
- 이 패턴을 사용하면 바이트코드를 네트워크에 전송하여 CA가 블록의 트랜잭션 내용으로 기록된다.
- 만약 ERC721(NFT)의 컨트랙트에서 치명적인 결함이 발견되었을 떄, 수정을 하려면 컨트랙트를 새로 배포해야하는데 그러기엔 너무 번거롭고 기존 홀더들에게도 불편을끼치기 때문에 프록시 컨트랙트를 사용해서 컨트랙트를 수정하는 것이다.
- 이때 CA 계정의 정보는 다음과 같다

```json
CA {
		"account" : "0x123",
    "nonce" : "transactionCount",
    "storageRoot" : "state", // 프록시를 통해 다른 컨트랙트의 상태를 변경하는 대리 호출을 수행
    "codeHash" : "byteCode" // 프록시를 통해 다른 컨트랙트의 코드를 실행하는 대리 호출을 요청
}
```


### 해시코드

- 해시코드는 데이터의 고유한 식별자로 사용되며, 여기서는 해시값의 첫 4자리를 의미한다.

## 프록시 컨트랙트의 중요성

- 블록체인은 불변성의 법칙에 의해 한번 배포된 컨트랙트는 변경할 수 없다.
- 문제가 생겼을 때 수정할 방법이 필요한데, 이때 프록시 패턴이 효율적이고 유용하다.
- 프록시는 상태값을 저장하고, 로직은 다른 컨트랙트가 대신 처리한다.

## 프록시 컨트랙트의 로직

- EVM은 스택머신으로 작동한다.
- 스택머신은 데이터를 push하고 pop할 수 있는 구조이다.
- EVM의 opcode는 LIFO(Last In First Out) 방식으로 데이터를 처리한다.

### 숙련된 개발자용

- 솔리디티 파일 내에서 opcode를 직접 작성할 수 있다.
- 이를 위해 어셈블리(assembly)구문을 사용하면 저수준언어로 코드를 작성할 수 있다.
- 이 방법을 통해 메모리나 스토리지에 직접 접근할 수 있다.
- 또한, 메모리를 효율적으로 관리하며, 수학적 연산이나 암호화 로직을 처리할 때 유용하다.
- 이러한 접근 방식은 가스비를 절감하는 장점이 있다.

### 1 과 2 르 더하는 간단한 예제


```solidity
1 2 ADD
```


```solidity
contract ADDTest{
	function add() public{
		assembly{
			let result := add(1, 2)
			mstore(0x0, result)
			return(0x0, 32)
		}
	}
}
```

1. 1과 2를 더한 결과를 변수에 할당하는데 `:=` 연산자는 솔리디티에서의 대입연산자이다.
2. result의 값을 메모리주소 0x0에 저장한다.
3. 메모리주소 0x0에서 시작하는 32바이트의 데이터를 반환한다.

## EVM opcode종류

- **산술 연산**: ADD(덧셈), MUL(곱셈), SUB(뺄셈), DIV(나눗셈) 등
- **논리 연산**: AND(논리곱), OR(논리합), XOR(배타적 논리합), NOT(논리 부정) 등
- **환경 정보**: ADDRESS(계약 주소), BALANCE(잔액 조회), ORIGIN(트랜잭션 발신자 주소), CALLER(직접 호출자 주소) 등
- **블록 정보**: BLOCKHASH(블록 해시 조회), COINBASE(채굴자 주소), TIMESTAMP(블록 타임스탬프), NUMBER(블록 번호) 등
- **스택, 메모리, 저장소 조작**: PUSH(스택에 푸시), POP(스택에서 팝), SLOAD(저장소 로드), SSTORE(저장소 저장), MLOAD(메모리 로드), MSTORE(메모리 저장) 등
- **프로그램 흐름 제어**: JUMP(점프), JUMPI(조건부 점프), PC(프로그램 카운터), JUMPDEST(점프 목적지) 등
- **데이터 복사**: CALLDATACOPY(입력 데이터를 메모리로 복사), CODECOPY(코드를 메모리로 복사), EXTCODECOPY(외부 계약 코드를 메모리로 복사) 등
- **로그 및 이벤트**: LOG0, LOG1, ... , LOG4(로그 이벤트 생성)

# 업그레이드 진행 과정


## 실제 컨트랙트


```solidity
contract Count{
	uint public count;
	function increment() public{
		count += 1;
	}
}
```


이 컨트랙트를 배포 했을때의 정보

- CA : 0xdasdas90j2 (예시)

## 프록시 컨트랙트


```solidity
contract Proxy {
    // 로직 컨트랙트의 주소를 저장하는 'implementation' 변수를 선언한다.
    address public implementation;

    constructor(address _implementation){
        // 생성자를 통해 로직 컨트랙트 주소를 'implementation' 변수에 초기화한다.
        implementation = _implementation;
    }

    // 이더를 받으면 호출되는 'receive()' 함수와
    // 존재하지 않는 함수를 호출하려 할 때 실행되는 'fallback()' 함수를 정의한다.
    // 프록시 컨트랙트는 로직을 직접 처리하지 않고, 지정된 로직 컨트랙트의 함수를 호출한다.
    // 'fallback()' 함수는 로직 컨트랙트의 함수를 대신 호출하는 역할을 한다.
    fallback() external payable {
        // 로직 컨트랙트 주소가 유효한지 확인한다.
        require(implementation != address(0), "Invalid implementation address");
        // 메모리 참조, 복사, 대리 호출을 위해 assembly 구문을 사용한다.
        assembly{
            // calldatacopy를 사용해 호출 데이터를 메모리에 복사한다.
            calldatacopy(0, 0, calldatasize())

            // delegatecall을 사용해 로직 컨트랙트에 대리 호출을 요청한다.
            let result := delegatecall(gas(), implementation, 0, calldatasize(), 0, 0)

            // 대리 호출 후 반환 데이터를 메모리에 복사한다.
            returndatacopy(0, 0, returndatasize())

            // 대리 호출의 성공 여부에 따라 분기 처리한다.
            switch result
            case 0 {
                // 호출 실패 시 오류 내용을 반환한다.
                revert(0, returndatasize())
            }
            default {
                // 호출 성공 시 반환 데이터를 반환한다.
                return(0, returndatasize())
            }
        }
    }

    // 로직 컨트랙트 주소를 업데이트하는 함수를 정의한다.
    function setImplementation(address _CA) public {
        implementation = _CA;
    }
}
```


프록시 컨트랙트를 사용해서 기존 컨트랙트의 버전을 업그레이드 해보자


## 컨트랙트의 버전 업그레이드


```solidity
contract Count {
    uint public count;

    // count 값을 1 증가시킨다.
    function increment() public {
        count += 1;
    }

    // count 값을 1 감소시킨다.
    function decrement() public {
        count -= 1;
    }
}
```

- 이 컨트랙트를 배포하고 새로운 CA을 얻는다.
- Proxy의 setImplementation 함수를 호출해서 새로운 CA을 설정한다.
- Proxy를 통해 decrement 함수를 호출하면 fallback함수가 호출되고 결과적으로 count값이 감소한다.

# 구현 예제


테스트넷으로 배포를 진행하고 프록시를 활용해 기존컨트랙트를 업그레이드 해보자


### count.sol

- 처음 배포할 Count 컨트랙트

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Count{
    uint public count;
    function increment() public{
        count += 1;
    }
}
```


### proxy.sol

- Count 컨트랙트를 업그레이드 하게 해줄 프록시 컨트랙트

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Proxy {
    bytes32 public constant IMPL_SLOT = bytes32(uint(keccak256("IMPL")) - 1);
    bytes32 public constant ADMIN_SLOT = bytes32(uint(keccak256("admin")) - 1);

    constructor(){
        setOwner(msg.sender);
    }

    modifier onlyOwner(){
        require(msg.sender ==  getOwner(), "Only owner can call this function.");
        _;
    }

    function getOwner() private view returns(address){
        return Slot.getAddressSlot(ADMIN_SLOT).value;
    }

    function setOwner(address owner) private{
        Slot.getAddressSlot(ADMIN_SLOT).value = owner;
    }

    function getImpl () private view returns(address){
        return Slot.getAddressSlot(IMPL_SLOT).value;
    }

    function setImpl (address _CA) public onlyOwner(){
        Slot.getAddressSlot(IMPL_SLOT).value = _CA;
    }

    function  getAdmin() external view returns(address){
        return getOwner();
    }

    function getEImpl() external view returns(address){
        return getImpl();
    }

    function delegate(address impl) private {
        assembly {
            calldatacopy(0, 0, calldatasize())

            let result := delegatecall(gas(), impl, 0, calldatasize(), 0, 0)
            returndatacopy(0, 0, returndatasize())

            switch result
            case 0 {
                revert(0, returndatasize())
            }
            default {
                return(0, returndatasize())
            }
        }
    }

    fallback() external payable{
        delegate(getImpl());
    }
    receive() external payable{
        delegate(getImpl());
    }
}

library Slot {
    struct AddressSlot{
        address value;
    }
    function getAddressSlot(bytes32 slotAdress) internal pure returns(AddressSlot storage pointer){
        assembly{
            pointer.slot := slotAdress
        }
    }
    
}
```


하나하나 씹뜯맛 하자


### Slot 라이브러리


프록시 컨트랙트 내에서 직접 정의한 Slot라이브러리의 메서드를 사용하기에 먼저 설명함. 컨트랙트의 저장소 슬롯에 접근하는 기능을 제공한다.


```solidity
library Slot {
    struct AddressSlot{
        address value;
    }
    function getAddressSlot(bytes32 slotAdress) internal pure returns(AddressSlot storage pointer){
        assembly{
            pointer.slot := slotAdress
        }
    }
    
}
```

1. AddressSlot 구조체는 주소타입의 값을 하나 가진다. 컨트랙트의 저장소에 주소 값을 저장할때 사용한다.
2. getAddressSlot함수는 주어진 저장소 슬롯의 주소를 받아, 해당 슬롯에 저장된 주소 값을 다룰 수 있는 AddressSlot 구조체의 포인터를 반환한다.
3. 이 함수는 internal로 선언되있어서, 같은 컨트랙트 내부 또는 이 라이브러리를 상속받는 컨트랙트에서만 호출할수 있다.
4. pure속성은 오직 입력된 값에 기반하여 연산을 한다는걸 나타낸다.

### 프록시 컨트랙현


```solidity
contract Proxy {
    bytes32 public constant IMPL_SLOT = bytes32(uint(keccak256("IMPL")) - 1);
    bytes32 public constant ADMIN_SLOT = bytes32(uint(keccak256("admin")) - 1);

    constructor(){
        setOwner(msg.sender);
    }
```

1. 컨트랙트주소와 관리자주소를 저장하기 위한 저장소 슬롯을 정의하는데, keccak256해시 함수를 사용해서 문자열을 해시화하고 uint로 변환한뒤에 1을 빼서 bytes32타입으로 변환한다.
    1. **IMPL_SLOT :** 구현 계약의 주소를 저장하는 데 사용되며, 이 주소는 프록시 계약이 호출을 위임할 대상이다.
    2. **ADMIN_SLOT :** 프록시 계약을 관리할 수 있는 관리자의 주소를 저장하는 데 사용된다. 이 주소는 프록시 계약의 구현을 변경할 권한이 있는 주체를 나타낸다.
2. 생성자함수는 컨트랙트를 호출한 주소를 관리자로 설정한다.

```solidity
modifier onlyOwner(){
        require(msg.sender ==  getOwner(), "Only owner can call this function.");
        _;
    }
```

1. 관리자에 의해서만 호출될 수 있도록 제한한다.

```solidity
function getOwner() private view returns(address){
        return Slot.getAddressSlot(ADMIN_SLOT).value;
    }

function setOwner(address owner) private{
        Slot.getAddressSlot(ADMIN_SLOT).value = owner;
    }
```

1. 라이브러리의 함수를 통해 관리자주소 슬롯에 저장된 주소값을 조회한다.
2. 관리자주소 슬롯을 찾고 value필드에 새로운 owner주소를 할당한다.

```solidity
function getImpl () private view returns(address){
        return Slot.getAddressSlot(IMPL_SLOT).value;
    }

function setImpl (address _CA) public onlyOwner(){
        Slot.getAddressSlot(IMPL_SLOT).value = _CA;
    }
```

1. 함수를 사용해서 컨트랙트주소 슬롯에 저장된 주소 값을 조회한다.
2. 컨트랙트주소 슬롯을 찾고 value필드에 새로운 구 컨트랙트주소를 할당한다

```solidity
function  getAdmin() external view returns(address){
        return getOwner();
    }

    function getEImpl() external view returns(address){
        return getImpl();
    }
```

1. getOwner 함수를 호출해서 컨트랙트의 소유자 주소를 반환한다
2. getImpl 함수를 호출해서 구현 컨트랙트의 주소를 반환한다.

```solidity
function delegate(address impl) private {
        assembly {
            calldatacopy(0, 0, calldatasize())

            let result := delegatecall(gas(), impl, 0, calldatasize(), 0, 0)
            returndatacopy(0, 0, returndatasize())

            switch result
            case 0 {
                revert(0, returndatasize())
            }
            default {
                return(0, returndatasize())
            }
        }
    }
```

1. 구현 컨트랙트 주소를 매개변수로 받는다.
2. 어셈블리를 사용해서 EVM의 저수준 명령어를 직접실행한다.
3. 외부 호출 데이터를 현재 컨트랙트의 메모리로 복사하고, 입력데이터의 크기를 반환하며, 이 크기만큼의 데이터를 메모리의 시작위치부터 복사한다.
4. 현재 컨트랙트의 컨텍스트에서 구현 컨트랙트 주소의 코드를 실행한다. 모든 가스를 사용할수 있도록 gas함수로 가스를 전달하고 메모리에서 데이터를 읽어 실행한다.
5. 실행결과는 result에 할당한다.
6. 실행 결과에 따라 각각 다른 결과를 반환한다.

```solidity
fallback() external payable{
        delegate(getImpl());
    }
    receive() external payable{
        delegate(getImpl());
    }
```

1. fallback함수는 데이터가 없거나 이더를 받을때 호출되고, delegate(getImpl())를 호출함으로써, 모든 호출을 getImpl 함수로부터 받은 구현 컨트랙트의 주소로 위임한다.
2. fallback함수와 비슷하지만 이더를 받을때만 호출된다.

