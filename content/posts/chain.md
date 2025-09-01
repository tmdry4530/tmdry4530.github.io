---
title: "Chain"
slug: "chain"
status: "public"
type: "Post"
category: "Blockchain"
tags: ["blockchain"]
summary: ""
thumbnail: "/thumbnails/chain.png"
date: "2024-01-16"
---


# 블록체인과 체인


## 체인의 정의와 기능

- 체인은 블록들이 서로 연결되어 있는것이고 블록의 헤더에 포함되있는 이전블록의 해시값을 통해 연결이 이루어진다.
- 이러한 체인구조 덕분에 블록체인은 데이터의 불변성을 검증할수있다.
- 데이터의 불변성을 검증할수있는 이유는 만약 이전블록의 해시값이 변경되면 뒤에있는 블록들의 해시값이 변경되어서 최종적인 머클루트도 변경되는데 블록해시와 머클루트르 비교했을때 일치하지않으면 유효하지않은 블록이기 때문이다.

## 블록체인의 구조

- 블록체인은 객체 데이터를 가지는 블록들의 배열과 유사하다.
- 체인에 추가되는 블록은 순차적으로 추가된다.
- 블록의 높이는 블록조회의 인덱스로 사용된다.

## 블록체인 데이터 저장 및 조회

- 블록체인은 LevelDB라는 key-value 저장소를 사용한다
- 블록체인의 데이터 조회에 주로 사용되고 메타데이터 저장, 인덱스 관리, UTXO 세트 처리등에 활용된다.

### **UTXO 세트란?**


UTXO에서는 거래가 입력과 출력으로 구서오디는데 입력은 이전 거래의 UTXO를 참조하고 출력은 새로운 UTXO를 생성한다. 정상적은 거래가 발생하면 새로운 UTXO가 생성되고 사용된 UTXO는 세트에서 제거된다. 만약 이전거래의 UTXO가 없으면 그건 유효하지않은 거래라는것으로 간주된다.


## 블록체인 구현 예시


먼저 체인의 구조를 정의해줄 IChain 인터페이스를 작성한다.


```javascript
import Block from "@core/block/block";
import { Faillable } from "./faillable.interface";

export interface IChain {
  get(): Block[];
  length(): number;
  latestBlock(): Block;
  addToChain(receivedBlock: Block): Block;
  getBlock(callbackFn: (block: Block) => boolean): Block;
  getBlockHeight(height: number): Block;
  getBlockByHash(hash: string): Block;
  serialize(): string;
  deserialize(chunk: string): Block[];
  replaceChain(receivedChain: Block[]): Faillable<undefined, string>;
  getAdjustmentBlock(): Block;
}
```

1. 블록을 정의하는 클래스를 가져온다
2. 결과 반환 성공여부를 나타내는 클래스를 가져온다.
3. **get() :** 전체 체인을 반환하고 블록타입의 객체로 이루어진 배열로 나타난다.
4. **length() :** 체인의 길이를 반환하고 넘버타입이다.
5. **latestBlock() :** 체인의 마지막 블록을 반환한다.
6. **addToChain() :** receivedBlock은 추가할 블록이다. 체인에 블록을 추가하는 함수이다.
7. **getBlock() :** callbackFn은 특정 블록을 찾는 조건함수이고 boolean값을 가진 블록을 반환한다.
8. **getBlockHeight() :** 체인의 특정높이에 해당하는 블록을 찾는 함수이다.
9. **getBlockHash() :** 체인의 특정해시값을 가진 블록을 찾는 함수이다.
10. **serialize() :** 체인을 문자열로 변환하는 함수이다.
11. **deserialize() :** chunk는 체인의 정보가 담긴 문자열이고, 이를 체인으로 변환하는 함수이다.
12. **replaceChain() :** receivedChain은 교체할 체인이고, 현재 체인을 교체한다. Faillable은 성공여부에 따라 메시지를 내보낸다. 성공하면 undefined, 실패하면 오류메시지
13. **getAdjustmentBlock() :** 체인에서 난이도를 조정하는 블록을 반환한다.

해당 인터페이스 구조를 구현하는 Chain 클래스


```typescript
import Block from "@core/block/block";
import { GENESIS, INTERVAL } from "@core/config";
import { IChain } from "@core/interface/chain.interface";
import { Faillable } from "@core/interface/faillable.interface";

class Chain implements IChain {
  private chain: Block[] = [GENESIS];

  get(): Block[] {
    return this.chain;
  }

  length(): number {
    return this.chain.length;
  }

  latestBlock(): Block {
    return this.chain[this.length() - 1];
  }

  addToChain(receivedBlock: Block): Block {
    this.chain.push(receivedBlock);
    return this.latestBlock();
  }

  getBlock(callbackFn: (block: Block) => boolean): Block {
    const findBlock = this.chain.find(callbackFn);
    if (!findBlock) throw new Error("not block");
    return findBlock;
  }

  getBlockHeight(height: number): Block {
    return this.getBlock((block: Block) => block.height === height);
  }

  getBlockByHash(hash: string): Block {
    return this.getBlock((block: Block) => block.hash === hash);
  }

  serialize(): string {
    return JSON.stringify(this.chain);
  }

  deserialize(chunk: string): Block[] {
    return JSON.parse(chunk);
  }

  replaceChain(receivedChain: Block[]): Faillable<undefined, string> {
    const latestReceivedBlock: Block = receivedChain[receivedChain.length - 1];
    const latestBlock: Block = this.latestBlock();
    if (latestReceivedBlock.height === 0) {
      return {
        isError: true,
        value: "상대방의 체인은 마지막 블록이 최초블록이다",
      };
    }
    if (latestReceivedBlock.height <= latestBlock.height) {
      return {
        isError: true,
        value: "상대방의 체인이 내 체인보다 짧거나 길다",
      };
    }
    this.chain = receivedChain;
    return { isError: false, value: undefined };
  }

  getAdjustmentBlock(): Block {
    const currentLength = this.length();
    const adjustmentBlock: Block =
      currentLength < INTERVAL ? GENESIS : this.chain[currentLength - INTERVAL];
    return adjustmentBlock;
  }
}

export default Chain;
```


```javascript
import Block from "@core/block/block";
import { GENESIS, INTERVAL } from "@core/config";
import { IChain } from "@core/interface/chain.interface";
import { Faillable } from "@core/interface/faillable.interface";
```

1. 블록을 정의하는 클래스 가져온다
2. 최초블록을 나타내는 객체와 10 이란값을 가진 INTERVAL상수를 가져온다
3. 체인을 정의하는 인터페이스를 가져온다
4. 결과 반환 성공여부를 나타내는 클래스를 가져온다.

```javascript
private chain: Block[] = [GENESIS];
```

- chain에 <u>private</u>속성을 부여하고 초기값으로 GENESIS(최초블록)로 설정한다.
- private는 현재 클래스에서만 접근가능하게 해서 다른 위치에서는 수정되는것을 방지한다.
- 접근제한자에 대해서는 추가공부가 필요할듯. 잘 안 와닿음

```javascript
get(): Block[] {
    return this.chain;
  }

  length(): number {
    return this.chain.length;
  }

  latestBlock(): Block {
    return this.chain[this.length() - 1];
  }

  addToChain(receivedBlock: Block): Block {
    this.chain.push(receivedBlock);
    return this.latestBlock();
  }
```

1. 체인의 전체블록배열을 반환한다
2. 체인의 길이를 반환한다
3. 체인의 마지막 블록을 반환한다
4. 체인에 새로운 블록을 추가한 후에 마지막블록을 반환한다

```javascript
getBlock(callbackFn: (block: Block) => boolean): Block {
    const findBlock = this.chain.find(callbackFn);
    if (!findBlock) throw new Error("not block");
    return findBlock;
  }
```

1. callbackFn: (block: Block) => boolean 여기서 콜백함수는 Block객체형태의 인자를 받아서 boolean값을 반환하고 true에 해당하는 블록을 찾는다.
2. 체인에서 1번의 조건을 만족하는 블록을 찾는다
3. 만약 조건에 만족하는 블록이 없을때는 에러메시지를 나타내고 만족하는 블록이 있다면 해당 블록을 반환한다

```javascript
getBlockHeight(height: number): Block {
    return this.getBlock((block: Block) => block.height === height);
  }
```

1. 특정 높이를 인자로 받는
2. 특정 높이에 해당하는 블록을 찾아서 해당 블록의 높이와 인자로 받은 높이가 일치하는지 확인한뒤에 높이가 일치하다면 해당 블록을 반환한다

```javascript
getBlockByHash(hash: string): Block {
    return this.getBlock((block: Block) => block.hash === hash);
  }
```

1. 특정 해시값을 인자로 받는다
2. 특정 해시값에 해당하는 블록을 찾아서 해당 블록의 해시값과 인자로 받은 해시값이 일치하는지 확인한뒤에 해시값이 일치하다면 해당 블록을 반환한다

```javascript
serialize(): string {
    return JSON.stringify(this.chain);
  }

  deserialize(chunk: string): Block[] {
    return JSON.parse(chunk);
  }
```

1. 체인을 문자열형태로 변환한뒤에 반환한다 → [{block},{block2},{block3}]

```javascript
replaceChain(receivedChain: Block[]): Faillable<undefined, string> {
    const latestReceivedBlock: Block = receivedChain[receivedChain.length - 1];
    const latestBlock: Block = this.latestBlock();
    if (latestReceivedBlock.height === 0) {
      return {
        isError: true,
        value: "상대방의 체인은 마지막 블록이 최초블록이다",
      };
    }
    if (latestReceivedBlock.height <= latestBlock.height) {
      return {
        isError: true,
        value: "상대방의 체인이 내 체인보다 짧거나 길다",
      };
    }
    this.chain = receivedChain;
    return { isError: false, value: undefined };
  }
```


```typescript
getAdjustmentBlock(): Block {
    const currentLength = this.length();
    const adjustmentBlock: Block =
      currentLength < INTERVAL ? GENESIS : this.chain[currentLength - INTERVAL];
    return adjustmentBlock;
  }
```


