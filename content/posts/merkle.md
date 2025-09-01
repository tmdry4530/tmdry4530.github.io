---
title: "Merkle root"
slug: "merkle"
status: "public"
type: "Post"
category: "Blockchain"
tags: ["blockchain"]
summary: ""
thumbnail: "/thumbnails/merkle.png"
date: "2024-01-16"
---


# 해시와 블록 


## 해시 암호화


블록체인에서 해시 암호화를 하는 이유는 데이터의 무결성과 보안을 보장하기 위해서 사용된다.


해시 암호화를 하기 위한 준비과정


```shell
npm init -y
npm install crypto-js
```

- SHA256 암호화 알고리즘을 사용하기 위해 crypto-js 패키를 사용한다.
- SHA256은 256비트로 구성된 64자리 문자열로 암호화한다
- 빠른속도가 강점이고 블록체인에서 가장 많이 채택되고있는 암호방식이다.

```javascript
const str = "password";
console.log("hash result : ", SHA256(str).toString());
console.log("hash length : ", SHA256(str).toString().length);
```

- password 라는 문자열을 SHA256 알고리즘을 통해 암호화 시키고 문자열과 그 길이를 로깅한다
- hash result : 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
- hash length : 64

## 머클루트 구하는 과정


### 머크루트를 사용하는 이유

- 각 트랜잭션의 변경 여부를 검증하는 역할을 수행하며, 이를 통해 블록의 유효성을 검증할 수 있다.
- 모든 데이터의 해시값을 포함하므로, 이를 통해 데이터의 위변조 여부를 확인할 수 있고, 데이터 중 하나라도 변경되면 머클루트가 변경되므로, 위변조를 쉽게 감지할 수 있다.

머클트리를 생성하고 최종적으로 암호화된 하나의 해시값이 머클루트이다.


```shell
npm init -y
npm i crypto-js
npm i merkle
```

- merkle 패키지는 머클트리를 생성하고 관리하는데 사용된다

```javascript
const merkle = require("merkle");

const txdata = ["승교지갑", "chamdom지갑", "25", "sign"];

const tree = merkle("sha256").sync(txdata);

const root = tree.root();
console.log("Merkle Root: ", root);
```

1. txdata를 sha256알고리즘으로 암호화하고 머클트리를 생성한다.
2. 머클트리에서 root메서드는 최종적으로 암호화된 루트 해시이다.

```javascript
const tree = merkle("sha256").sync(txdata);
console.log(tree);

{
  root: [Function: root],
  level: [Function: level],
  depth: [Function: depth],
  levels: [Function: levels],
  nodes: [Function: nodes],
  getProofPath: [Function: getProofPath]
}
```

- 생성된 머클트리를 로깅하면 머클트리의 메서드들이 포함된 객체가 나타난다.
    1. **root :** 머클트리의 루트 해시를 반환한다
    2. **level :** 특정 레벨의 모든 노드를 반환한다
    3. **depth :** 트리의 깊이를 반환한다
    4. **levels :** 트리의 모든 레벨의 수르 반환한다
    5. **nodes :** 트리의 모든 노드의 수를 반환
    6. **getProofPath :** 특정 노드에 대한 증명경로(?)를 반환한다.

```javascript
console.log(tree.root());
console.log(tree.level(1));
console.log(tree.depth());
console.log(tree.levels());
console.log(tree.nodes());
console.log(tree.getProofPath(1));
```

- 이렇게 메서드를 하나씩 로깅해보자
    - 630AE35EE0F6FD088BA89C6FE07DD05DF01029DF9786FAF0EDB3F34FA17AB62C → 루트해시값이 반환된다
    - ['3FED8D25AB18F05BBF5803AEBB280D241D68539E80FCE8D3A09FBE20E749DF24','2C2485D5F6DA61E539C0279A0AFBAC72EA65A17EE8D5DA32F608C1982A8A6AE1’] → 1레벨에 위치한 노드의 해시값들이 반환된다
    - 2 → 트리의 깊이가 반환된다
    - 3 → 모든 레벨의 수가 반환된다
    - 3 → 모든 노드의 수가 반환된다
    - 일단 아래처럼 나오는데 잘 모르겠음.

    ```javascript
    [
      {
        parent: "3FED8D25AB18F05BBF5803AEBB280D241D68539E80FCE8D3A09FBE20E749DF24",
        left: "1DFA78BABA7A17BB533BAD4A092BC08ED075CD53E94F0B7B267C0D205459EDAB",
        right: "F3134B8F983071E51731F70F5F6B54067C97BD53E58107C7A09B2C207D5213F0",
      },
      {
        parent: "630AE35EE0F6FD088BA89C6FE07DD05DF01029DF9786FAF0EDB3F34FA17AB62C",
        left: "3FED8D25AB18F05BBF5803AEBB280D241D68539E80FCE8D3A09FBE20E749DF24",
        right: "2C2485D5F6DA61E539C0279A0AFBAC72EA65A17EE8D5DA32F608C1982A8A6AE1",
      },
    ];
    ```


머클트리는 대충 이렇게 생김


![Untitled.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/35d62817-513e-4f49-8028-93e1cdbed9e5/8b39e6cf-697b-491b-a44c-08725f7d3727/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TCBPMQKP%2F20250901%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250901T044326Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCIHnJy%2FS1PdP0HBZ%2FWebe4NrWkUUjbYp0OB8JPlXKrUgIhAKe0gOpKKase8w8db%2FgA0rktmSFqkc71iGFHuO0PBwhuKogECP7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzfKVP7OU%2Fc4NXLMAsq3ANjyjZDruYoyFmRjdVaiUN6H9J8wewv1K9p0YztQTO2TwXR0uAmi2MSppwviIDkGl4gnHP0d3hdOptWgL6tquAadDaVedYEUANDjAmncxSABgo2WWgS0d6LktHy56r1XuP6fH4rbE6vhGD4JHieNq6x4feJExa2J3PcPoGqoouuOFL3zF4QkMp29rXSgbF79GdJgnQ71%2FzdfcOCd9fxXmxwP%2F%2BwWpqFCWUd6%2FmYxq6JcO%2BrjuvU%2BOvv23Z%2BflJ6dqWmOo8Y%2BTDTeVGkU33A%2FLxNLN5mnRd15Uzj6W7Bkyyo8T7KPbSUz4DOiY0lSR1P3DNhCUQUJ%2FdhRuk5IUkYb7JBPnOQx3okTIa%2FZHEPSUXCUd3ZFKby3Z1eYHZ3IqYxWqxZ3Y250WzMbMWblvf%2BHluIvuTJGsKwfkcnMwcHHWMRGZxCUCHkII06yNHyoorkhlILsVbNOPIY5HQxO1wxlLsd6UnhjQykn7j%2FxbS2BQNN7ga0N4JVNa%2B6TO0FYCvwRT9DBLF08FEcEjBDhnT1UL5mAptpB%2FqgSpDfECSLAcVOWCNjiYx2ZFKff7nyQJoSucq1ENYJU7KIdGsrUhI5oGrNGaDrn95QWUit5vl6ow45RZ%2FMemdlcvY6ejpNtzC%2FwdTFBjqkAWsVZ%2BwfodZ%2Fmbf%2FX%2Fdc99U754IKAXiDJ%2BF8WPEqNdvT0QcaqHUogf%2FrUrphfcNtEieB0369UvkQf%2FdLsPXIVrV4w%2BtcFxxnZFIq2iZ8aLv7xLzxSDnzPygjAzMlMf%2ByGXWte9fgV9bn6kPAwSuWiWAl6%2B%2FXQ1odS8evdMT%2FIlrguwq3selx1G3rOErWod1cxbeFHMUAuOgVRIddt%2BYCDKdyyBer&X-Amz-Signature=56d0b2d50f310fd9de7e714c8824f2457ca23ad90a2e576db5843330edc3fd4e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


## 블록의 채굴과정


비트코인의 경우 10분간 진행된 약 2,000건의 거래내역을 하나의 블록으로 묶어서 관리한다


