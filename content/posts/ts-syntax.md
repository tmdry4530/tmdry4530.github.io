---
title: "Typescript 문법"
slug: "ts-syntax"
status: "public"
type: "Post"
category: "💻 Frontend"
tags: ["typescript"]
summary: ""
thumbnail: "/thumbnails/ts-syntax.png"
date: "2024-01-05"
---


# 타입스크립트 문법


## 초기 환경설정


```shell
npm init -y
npm install -D typescript ts-node @types/node
npx tsc --init
```


의존성 설치 > 타입스크립트, 컴파일러 설치 > tsconfig 설치


# 예제코드


## 변수 선언 방식


### 자바스크립트 변수 선언방식


```javascript
let num = 20;
const str = "javascript";
const nan = NaN;
const infinity = Infinity;
const bool = true;
const nullValue = null;
const undefinedValue = undefined;

const obj = {};
const arr = [];

const fn = (a) => {
  console.log(a);
};

const sum = (a, b) => {
  return a + b;
};

const any = "";
const unknown = "";
```


일반적으로 자바스크립트에서 변수를 선언하는 방식이다.


 자바스크립트는 자동으로 타입을 판단하기에 타입오류가 나타나지 않는다


### 타입스크립트 타입 정의 변수 선언방식


```javascript
let num2: number = 20;
const str2: string = "typescript";
const nan2: number = NaN;
const infinity2: number = Infinity;
const bool2: boolean = true;
const nullValue2: null = null;
const undefinedValue2: undefined = undefined;

const obj2: object = {};
const arr2: Array<number | string> = [];

const fn2 = (a: number): void => {
  console.log(a);
};

const sum2 = (a: number, b: number): number => {
  return a + b;
};

const any: any = "";
const unknown: unknown = "";

if (typeof unknown === "string") {
  console.log(unknown);
}
```


<>문법은 제네릭문법으로 타입내에 들어가는 값들의 타입을 정해줄수있다. 


예를들어 Array<number>는 number 타입을 가질수있는 배열을 나타낸다.


타입스크립트에서 함수선언은 매개변수의 타입 뿐 아니라 반환값의 타입도 선언해야한다.


예를들어


```javascript
const fn = (a:number, b:number)=>{
	return a + b
}
```


a, b는 모두 숫자이므로 사실상 반환되는 값은 누가봐도 넘버타입이다. 반환값의 타입을 명시하지않아도 컴파일러 자동으로 타입을 정의하는것을 타입추론이라고 한다.


하지만 복잡한 로직에서는 반환 타입을 명시적으로 선언하는 것이 좋을 수 있다.


any타입과 unknown타입 둘 다 모든 종류의 값이 할당 될 수 있다.


**any / unknown 차이점**

- **any** : 값에 대한 어떠한 연산도 허용되어, 타입체크를 피할수있지만 타입 안정성도 잃게된다
- **unknown :** any타입과 같이 어떤 값도 할당될수있지만 다른 변수에 할당하거나 연산에 사용되려면 타입체크를 먼저해야한다.

![Untitled.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/35d62817-513e-4f49-8028-93e1cdbed9e5/7b70b60e-3951-493b-b631-5668416af798/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UAHJHDPP%2F20250901%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250901T044337Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFutiFPBjpx%2BCAcbic3gUy3qEhddiSFwNfhq7DXfNywbAiEAskBOxjIFqoCWk4eSS5IihoCNYicpdXRpr63FAGndK3AqiAQI%2Fv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHhR7cd6Pv6xafyWmSrcA%2Fw4YJBGtDzT2TTjMhivel5vH7Imd5gaJk7I7TufnJ%2Bfj5c5UnXAMe6iA7iHiokPFq9vHGG5%2FJwbysO114KQfG%2FNAYYt2ooMtglSyA23X5dH4cT6QSifHjW3Gjj9CG%2FaJoWHOSH%2FHQ9q9RbpnkHGmj01mgnj1ojGs655R618ea0%2BN4P6thoE13LUv29xdE3%2F1gxoe1UFpSx%2FPyzsoUBD9b%2Bxsuwynww7RCYl3pC9biN3Hcj78Ir0yZXlu60mV23AZDBGuWMZh01ELpXmn%2FOI64VKkLGwtJpoNG2w5HDx31HHzZ6VYLXe7CQdjCbY6M9uTus04vMlkf7cPsFN%2FMaFtIf9Et%2FDO0sRCHO0rub412JPwciPuBL0uCCXKeyPPUcYaSlOXOehT9dIvxCEypYb4BO0EtpoeA6iimEnceJ0C0lxydCTFT%2FA01JAjLqmF9kxCI1jyB8MGkwEuEmLxvuNIDVxPrwdJHzy1%2FZ5QKTbORQtxyjNIJ2bxbNp%2Feg9aFG7ese5BfUxvvzSsDMKTp4NBvh0V89nNEu4elmXKtDIkEgdrygCnvKu9QU%2BQmtSBDcJd%2FoY9uCM0MXXWeJjeUO8S2Rl6Bqz0UBFVgJ2UuM6OTP0eEVWu0ExhwPuBRXqMJXB1MUGOqUBTru5VuJOG9MU213oc7fVDNKz5LlV18W1%2B5tRFqjVyt7kBidIjMoMs7jT%2FuKv89TddvcrAPYmGx2zOsXjpWS0DmYM4P8jD8gbSyqUfQe9cPGcXgJysWaD8AfNWrEo5zufZhpjfx0gUDaj8PENnyLqNWl%2FQ%2B9xnWkyw9qtwiVYSr1KZudUUC44vGjFCdBlluke7wPw5mG5LXXxzqN2R2XAzlZ1%2B7Kg&X-Amz-Signature=de94384d1cf0d5de48414f65b48db72a1bdca782f665f531a97e1c733e6f811a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


unknown타입의 특성때문에 이런식으로 타입체크 없이 로깅을 하려고 하면 에러가 나타난다.


## 타입스크립트의 배열 선언 방식


```javascript
const strArr: string[] = ["1", "2", "3"];
const numArr: number[] = [1, 2, 3];
const tuple: [string, number, object] = ["1", 2, {}];
```

1. 문자열 배열 타입
2. 숫자 배열 타입
3. 튜플의 특징은 특정 인덱스에 특정 타입을 가진 요소를 가질수있다.

## 인터페이스


타입스크립트에서 가장 많이 사용되는 문법이다


객체의 형태를 정의하고 클래스나 객체가 특정 구조를 따르도록 강제하는 역할을 한다.


```javascript
interface Person {
  name: string;
  age: number;
	money? : number;
}
```


person 인터페이스는 name, age, money 라는 속성을 가진 객체를 정의한다. 


이 객체의 구조에서 money라는 속성은 있을수도 없을수도 있기에 ? 를 사용해 타입을 정의한다.


```javascript
let chamdom: Person = { name: "chamdom", age: 25 };
```


chamdom 객체는 Person 인터페이스를 따르므로, name과 age 속성을 반드시 가지고 있어야 한다.


```javascript
class PersonClass implements Person {
	name : string = "chamdom"
	age : number = 25
}

const dom = new PersonClass();
```


extends 와 implements의 차이점

- **extends :** 클래스가 다른 클래스를 상속받거나 인터페이스가 다른 인터페이스를 상속할때 사용한다. 부모클래스 및 인터페이스의 모든 속성과 메서드를 상속받는다.
- **implements :** 클래스가 인터페이스를 구현할때 사용하고, 인터페이스에서 정의한 모든 속성과 메서드를 가지고있어야한다.

## 인증로직


로그인 프로세스 구현을 해보겠습니다.

- **Authent.ts**

```javascript
export interface AuthProps {
  email: string;
  password: string;
}
```


로그인을 진행할때 전달받는 객체의 형태. 


이메일과 비밀번호를 전달한다.


```javascript
export interface AuthentResponse {
  success: boolean;
  message?: string;
}
```


로그인 요청을 반은 이후 응답의 객체형태. 


성공여부를 불리언타입으로 전달하고 메시지를 전달한다.


```javascript
export interface Authenticator {
  authenticator(credentials: AuthProps): Promise<AuthentResponse>;
}
```


인증기능을 포함한 객체의 형태


credentials은 이메일과 비밀번호를 포함하는 객체이다.


해당 객체를 입력으로 받고, 인증의 성공여부와 메시지(선택적)를 반환하고, 비동기적으로 처리되서, 프로미스로 반환한다.


위 로직을 참고해서 이메일 로그인과 카카오 로그인의 로직을 예제로 구현 해보겠습니다.


### 이메일/카카오 로그인 예제코드 


```javascript
// 카카오 로그인
export class KaKaoAuthcenticator implements Authenticator {
  async authenticator(credentials: AuthProps): Promise<AuthentResponse> {
    console.log("kakao login");
    return { success: true };
  }
}
```


```javascript
// 이메일로그인
export class EmailAuthcenticator implements Authenticator {
  async authenticator(credentials: AuthProps): Promise<AuthentResponse> {
    console.log("email login");
    return { success: true };
  }
}
```


credentials객체를 받고 인증의 성공여부와 메시지를 프로미스로 반환


메서드가 실행될때 메시지를 콘솔에 출력한 뒤 성공적인 인증 응답을 나타나는객체를 반환한다.

- **auth.ts**

```javascript
export interface Startegy {
  email: EmailAuthcenticator;
  kakao: KaKaoAuthcenticator;
}
```


카카오 로그인 로직과 이메일 로그인 로직을 객체로 정의한다.

- **Authent.ts**

```javascript
export interface LoginService {
  login(type: string, credentials: AuthProps): Promise<AuthentResponse>;
}
```


로그인 로직에서 사용할 서비스 처리 객체의 형태


type은 로그인 유형을 나타내고 email / kakao 과 같은 값을 가질수있다.


```javascript
export class Login implements LoginService {
  constructor(private readonly strategy: Startegy) {}
  async login(
    type: "email" | "kakao",
    credentials: AuthProps
  ): Promise<AuthentResponse> {
    const result = this.strategy[type].authenticator(credentials);
    return result;
  }
}
```


로그인 클래스에 로그인서비스 구조를 상속한다.


auth.ts 파일에서 Strategy객체를 매개변수로 받고, login메서드는 로그인의 유형과 인증정보를 매개변수로 받는다. 


이후 로그인 로직 객체의 authenticator메서드를 호출해서 로그인유형에 맞는 로그인 로직을 실행하고 결과를 반환한다


추가적으로 private readonly 속성에 대해 알아보자

- **private :** 클래스 외부에서는 이 속성을 직접참조하거나 수정할수 없다
- **readonly :** 속성의 값을 변경하는것이 허용되지 않는다.
- **auth.ts**

```javascript
class Auth {
  constructor(
    private readonly authProps: AuthProps,
    private readonly loginService: LoginService
  ) {
    this.authProps = authProps;
  }

  public async login() {
    console.log(this);
    const result = await this.loginService.login("email", this.authProps);
    console.log(result);
  }
}
```


인증정보를 담은 객체와 로그인서비스를 담당하는 객체를 매개변수로 받고, 


로그인서비스 객체의 login메서드를 호출해서 email과 인증정보 객체를 매개변수로 전달한 후에 로그인을 처리한다


이후 login메서드가 반환하는 프로미스 객체의 결과값을 반환한다.


```javascript
const authProps: AuthProps = {
  email: "chamdom@naver.com",
  password: "1234",
};

const _email = new EmailAuthcenticator();

const _kakao = new KaKaoAuthcenticator();

const _startegy: Startegy = {
  email: _email,
  kakao: _kakao,
};

const _loginService = new Login(_startegy);

const auth = new Auth(authProps, _loginService);

auth.login();
```


로그인 로직 실전형. 


## 


