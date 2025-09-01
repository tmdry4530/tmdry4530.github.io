---
title: "Digital Signature"
slug: "signature"
status: "public"
type: "Post"
category: "Blockchain"
tags: ["blockchain"]
summary: ""
thumbnail: "/thumbnails/signature.png"
date: "2024-01-22"
---


# 암호화폐 지갑의 기능 및 전자서명


## 전자서명 

- 온라인에서는 인감이라는 개념 대신에 전자서명이라는 개념이 존재한다.
- 이미 발급된 전자문서의 해시값을 개인키로 암호화한다.
- 이후에 전자문서와 개인키를 함께 암호화한 해시값을 상대방에게 전송한다
- 수신자는 송신자의 공개키로 해시값을 복호화한후 수신받은 문서의 해시값과 비교해서 위변조 되었는지 확인할수있다.

## 암호화폐 지갑의 기능

- 사용자의 자산(암호화폐)을 안전하게 보관하고 거래를 가능하게 하는 도구
- 개인키를 이용해 소유권을 증명하고 거래에 서명한다
- 지갑을 통해 잔액과 거래내역을 확인할수있다.
- 복구 구문으로 지갑을 복원할 수 있으며, 개인키를 다시 생성하는데 쓰인다

## 중앙 집중식 금융과 분산원장의 차이


### 중앙 집중식 금융

- 중앙 집중식 금융에서는 모든 거래가 하나의 장부에 기록된다.

### 분산 원장

- 각 참여자가 자신의 장부를 가지고 거래를 기록한다.
- 중앙관리가 아닌 참여자간의 장부비교를 통해 일치된 장부를 유지하는 방식이다

## 암호화와 키 관리


### 암호화방식

- **대칭형 :** 하나의 키로 데이터를 암호화하고 복호화한다
- **비대칭형 :** 두개의 키를 사용한다. 하나는 개인이 소유하고, 나머지 하나는 공개된다

### 암호화흐름

- **대칭형 :** 같은 키로 메시지를 암호화하고 복호화한다
- **비대칭형 :** 개인키로 암호화하고 공개키로 유효성을 확인한다

### 키의 역할

- **공개키 :** 암호화된 메시지의 유효성을 확인하는데 사용된다
- **개인키 :** 메시지를 암호화하거나 복호화할 때 사용된다

비밀키로 데이터를 암호화하고 공개키로 신뢰성을 검증한다


### 키 생성과 관리

- 블록체인에서는 랜덤값을 16진수로 변환해 개인키를 생성한다
- 이 개인키는 전자서명에 사용되며 거래의 유효성을 증명한
- 비밀키는 개인키와 같은 의미로 사용되며, 사용자만 알아야하는 정보다

# 거래 서명 과정

1. SHA256 암호화 알고리즘 방식으로 데이터를 해싱한다
2. 개인키로 해시값에 서명한다
3. 서명과 공개키를 제3자에게 전달한다
4. 제3자는 공개키로 서명을 검증한다

## 트랜잭션 과정

1. 트랜잭션이 발생한다
2. 개인키르 이용해서 서명을 생성한다
3. 서명 r, s, v를 생성한다
    1. 타원곡선 알고리즘을 통해 생성되는 서명의 세가지 구성요소
4. 수신자는 서명을 검증하고, 검증된 트랜잭션을 블록에 기록한다.

# 지갑 구현 예제


```shell
npm i elliptic @types/elliptic
```

- 타원곡선 암호화를 구현하기 위한 패키지, 암호화폐에서 사용되는 secp256k1 알고리즘 포함함

암호화폐지갑의 기본 기능을 구현하는 Wallet 클래스 작성


```typescript
import { randomBytes } from "crypto";
import elliptic from "elliptic";
import fs from "fs";
import path from "path";

const ec = new elliptic.ec("secp256k1");

const dir = path.join(__dirname, "../data");

export class Wallet {
  account: string;
  privateKey: string;
  publicKey: string;
  balance: number;

  constructor(privateKey: string = "") {
    this.privateKey = privateKey || this.getPrivateKey();
    this.publicKey = this.getPublicKey();
    this.account = this.getAccount();
    this.balance = 0;

    if (privateKey == "") Wallet.createWallet(this);
  }

  static createWallet(myWallet: Wallet) {
    const filepath = path.join(dir, myWallet.account);
    const filecontent = myWallet.privateKey;
    fs.writeFileSync(filepath, filecontent);
  }

  static getWalletList(): string[] {
    const WalletFiles: string[] = fs.readdirSync(dir);
    return WalletFiles;
  }

  static getWalletPrivateKey(account: string): string {
    const filepath = path.join(dir, account);
    const filecontent = fs.readFileSync(filepath);
    return filecontent.toString();
  }

  getPrivateKey(): string {
    return randomBytes(32).toString("hex");
  }

  getPublicKey(): string {
    const keyPair = ec.keyFromPrivate(this.privateKey);
    return keyPair.getPublic().encode("hex", true);
  }

  getAccount(): string {
    return `${this.publicKey.slice(26).toString()}`;
  }
```


```typescript
import { randomBytes } from "crypto";
import elliptic from "elliptic";
import fs from "fs";
import path from "path";
```

1. 특정 바이트 수의 랜덤데이터를 생성하기 위해 사용한다
    1. ex) randomBytes(1) ⇒ dd
2. 타원곡선 알고리즘을 통해 암호화를 구현하는데 사용되는 패키지이다.
3. 디지털지갑에서 지갑정보를 파일 시스템에 저장하고 불러오는데 사용하기 위한 파일시스템 모듈이다.
4. 디지털지갑에서 지갑정보를 저장할 파일의 경로를 생성하는데 사용되기 위한 경로 모듈이다.

```javascript
const ec = new elliptic.ec("secp256k1");

const dir = path.join(__dirname, "../data");
```

1. ec는 elliptic의 ec클래스의 인스턴스이다. 이 인스턴스는 암호화폐에서 많이 사용되는 secp256k1이라는 타원곡선 알고리즘이다. 이 인스턴스는 개인키를 활용해서 공개키를 생성하는데 사용된다
2. 지갑정보를 저장할 디렉토리의 경로이다. 루트 디렉토리의 data디렉토리에 저장

```typescript
export class Wallet {
  account: string;
  privateKey: string;
  publicKey: string;
  balance: number;

  constructor(privateKey: string = "") {
    this.privateKey = privateKey || this.getPrivateKey();
    this.publicKey = this.getPublicKey();
    this.account = this.getAccount();
    this.balance = 0;

    if (privateKey == "") Wallet.createWallet(this);
  }
```

1. 계정정보, 개인키, 공개키, 잔액 속성의 타입을 명시한다.
2. 생성자는 선택적으로 개인키르 인자로 받는다. 개인키를 받지못하는 경우 새로운 개인키를 생성하고 이걸 활용해서 공개키와 계정을 생성한다. 그리고 새로운 지갑을 생성한다

```typescript
static createWallet(myWallet: Wallet) {
    const filepath = path.join(dir, myWallet.account);
    const filecontent = myWallet.privateKey;
    fs.writeFileSync(filepath, filecontent);
  }
```

1. 새로운 지갑을 생성하고 파일시스템에 저장한다. 지갑의 계정을 파일이름으로 사용하고 개인키를 파일내용으로 사용한다. 파일경로는 dir변수와 계정을 결합해서 생성한다

```javascript
static getWalletList(): string[] {
    const WalletFiles: string[] = fs.readdirSync(dir);
    return WalletFiles;
  }
```

1. 파일시스템에 저장된 모든 지갑의 계정목록을 반환한다. dir 변수를 사용하여 지정된 디렉토리의 모든 파일을 읽고, 이 파일이름들을 반환환다

```javascript
static getWalletPrivateKey(account: string): string {
    const filepath = path.join(dir, account);
    const filecontent = fs.readFileSync(filepath);
    return filecontent.toString();
  }
```

1. 주어진 계정의 개인키를 반환한다. 계정이름을 파일이름으로 사용하여 파일시스템에서 해당 파일을 찾고, 그 내용을 반환한다. 파일경로는 dir변수와 계정을 결합하여 생성한다

```typescript
getPrivateKey(): string {
    return randomBytes(32).toString("hex");
  }
```

1. 32바이트의 랜덤한 데이터를 생성하고 16진수 문자열로 변환하여 개인키를 생성한다

```typescript
getPublicKey(): string {
    const keyPair = ec.keyFromPrivate(this.privateKey);
    return keyPair.getPublic().encode("hex", true);
  }
```

1. ec객체의 keyFromPrivate메서드를 사용해서 개인키로부터 키쌍을 생성한다
2. 이때의 공개키를 16진수 문자열로 변환하여 생성한다.
3. getPublic의 두번째 인자로 true를 전달하여 공개키를 압축된 형태로 반환하게 한다.

```typescript
getAccount(): string {
    return `${this.publicKey.slice(26).toString()}`;
  }
```

1. 공개키의 마지막 부분을 사용해서 계정정보를 생성하는데 문자열의 26번째부터 끝까지를 잘라낸것을 계정정보로 사용한다.

