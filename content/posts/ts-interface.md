---
title: "Interface"
slug: "ts-interface"
status: "public"
type: "Post"
category: "💻 Frontend"
tags: ["typescript"]
summary: ""
thumbnail: "/thumbnails/ts-interface.png"
date: "2024-01-08"
---


## 인터페이스란?

- 타입스크립트에서 객체의 구조를 정의하는 방법이다.
- 객체가 어떤 속성과 메서드를 가져야하는지 정의한다
- 클래스와 달리 구현을 제공하지 않고, 인터페이스를 구현한 클래스에서 구현을 제공한다.

### 인터페이스의 장점

- 코드의 일관성과 유지보수성을 높일수있다.
- 객체가 어떤 속성과 메서드를 가져야하는지 정의할수 있으므로 다른 사람이 객체가 어떤식으로 사용되는지 쉽게 이해할수 있다.
- 코드를 리팩토링 할 때 코드의 변경을 최소화 할수있다.

### 인터페이스 기본 사용 예제 (1)


```javascript
interface User {
	name: string;
	age: number;
}

const user: User = {
	name: "chamdom"
	age: 25
}
```


"User인터페이스는 name이라는 문자열 타입과 age라는 넘버타입의 속성을 가지고있어야 한다”는걸 정의하고 있다. 


그리고 user객체는 User인터페이스를 구현하므로, 해당 인터페이스에 정의된 속성을 가지고 있어야한다.


그래서 객체내의 속성이 인터페이스 구조를 따르지 않게되면 아래 이미지처럼 타입오류가 나타난다.


![Untitled.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/35d62817-513e-4f49-8028-93e1cdbed9e5/4ac9a53f-97ce-442d-b03d-86eb671a23f3/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZMMEVKP2%2F20250901%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250901T044336Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDho4%2BC3PLnsY8%2BPAYgdYEwfISO%2FTIBukU1hPI%2FQ8szFQIhAJPRQvbRahtott8kIyt7v0tcHBT8S2TE339%2BmE149mNuKogECP7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwcK0Cmbon%2BL16CWpwq3AN2Rjb%2B8Bm0RCQF8WZvyzLOZAYoso%2BgAZ4aJVkH3lw5jU9Adt9pZQOzfBPWf2BnElhxNL1Sl5KaZ24eO2tQXI2VRriHg4rmisikLHExIZ4cjY8TQJPdfATFrS%2F4M5WtFXP1H1p9P8XE7LLYX5SNXI1USWuDdHFSY4d4xEdNERW33q%2BUQoQyhc38jpxmG2Vv9eyRaUVyL8pD4a0iBoqHIKRfiRFXfLp6%2BVjD8PTjulCfO8A0FkkmB1cgqsbgKMBE%2FFxnPtD3mP2bGQEcX%2F3iwgN3diYW4%2BTXeyjWnoGpYOGxJLGPIAVanIQJoM01XLNtPzjYuxaBwMTQrVx9eChIMSF029UawP1cifUTyPpqtMOObjPhJradAmhJ%2BsX5HPFPLm8RsM6YZLjZNJ%2FhC2rhuLlRTRvesIzapO19nufHrr0yXI9ujlmQYTvDV1EIRyC7YQjmyH2MRKT3uttE%2Fr7Suc%2BmWrzoWFCDOanWwjDrXIiG0xnRXByPJ2fKQkoHf4xI1bphb1ZQTDaa9OG8BE2VblqX6hXFw3Zqqsc9xaIZFFJcOh8ti1ARCgov4otDVW5itbAIqEqIscyu67iyIijCSVYdHi4vfYdXeNrh5CV3BNALOcyDHfd5mUZJeqiRMzCHwNTFBjqkAR%2FE7l%2BL1xAYi%2FENL42Y5dhwBGXiv3oxmLGN0NwY9qO5qJ6tJE4GFg8y498fh27Cgws%2Fna3YaRkZJkswDSO1SdddcNd7l86oRfpybBGuR%2FCmQqjKEO%2FAmy2FY4BU68ZFpQcxkU5%2Bv6erfBVRGjnM8qs2hnrAtlThXPmZDsh9sY90rLN2mJAp3uPNsSahQn9fP4Fl7%2B3SmdCBOpgV7Nmy3zKPbR01&X-Amz-Signature=6d4b46d3ea0703968eb2fa63cb0ad0f8050c1b107ad2a90ad591b0fd722564e1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


### 인터페이스 기본 사용 예제 (2)


```javascript
interface User {
	name: string;
	age: number;
}

function deleteUser(user: User) {
	//..
}

function getAdminUser(): User {
	//..
	return { name: "Admin", age: 25 }
}
```


이렇게 인터페이스를 사용하면 함수가 특정형태의 객체를 매개변수로 받거나 반환해야함을 명시한다.


그리고 인터페이스는 클래스와 함께 사용될수있고, 클래스가 인터페이스를 구현하면 해당 클래스는 인터페이스에 정의된 모든 속성과 메서드를 구현해야 한다.


```javascript
interface User {
	name: string;
	age: number;
}

class UserAccount implements User {
	name: string;
	age: number;

	constructor(name: string, age: number) {
		this.name = name;
		this.age = age;
	}
}

const user: User = new UserAccount("chamdom", 25)
```


UserAccount 클래스는  User인터페이스를 구현한다. 따라서 UserAccount클래스는 name과 age속성을 가지고 있어야하고, User인터페이스에 정의된 것과 일치해야한다.


만약 클래스가 인터페이스의 구조를 따르지 않는다면 아래 처럼 클래스와 인스턴스 변수에 타입오류가 나타난다.


![Untitled.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/35d62817-513e-4f49-8028-93e1cdbed9e5/6d94967e-0ae7-4725-9291-b4a7cd556d84/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZMMEVKP2%2F20250901%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250901T044336Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDho4%2BC3PLnsY8%2BPAYgdYEwfISO%2FTIBukU1hPI%2FQ8szFQIhAJPRQvbRahtott8kIyt7v0tcHBT8S2TE339%2BmE149mNuKogECP7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwcK0Cmbon%2BL16CWpwq3AN2Rjb%2B8Bm0RCQF8WZvyzLOZAYoso%2BgAZ4aJVkH3lw5jU9Adt9pZQOzfBPWf2BnElhxNL1Sl5KaZ24eO2tQXI2VRriHg4rmisikLHExIZ4cjY8TQJPdfATFrS%2F4M5WtFXP1H1p9P8XE7LLYX5SNXI1USWuDdHFSY4d4xEdNERW33q%2BUQoQyhc38jpxmG2Vv9eyRaUVyL8pD4a0iBoqHIKRfiRFXfLp6%2BVjD8PTjulCfO8A0FkkmB1cgqsbgKMBE%2FFxnPtD3mP2bGQEcX%2F3iwgN3diYW4%2BTXeyjWnoGpYOGxJLGPIAVanIQJoM01XLNtPzjYuxaBwMTQrVx9eChIMSF029UawP1cifUTyPpqtMOObjPhJradAmhJ%2BsX5HPFPLm8RsM6YZLjZNJ%2FhC2rhuLlRTRvesIzapO19nufHrr0yXI9ujlmQYTvDV1EIRyC7YQjmyH2MRKT3uttE%2Fr7Suc%2BmWrzoWFCDOanWwjDrXIiG0xnRXByPJ2fKQkoHf4xI1bphb1ZQTDaa9OG8BE2VblqX6hXFw3Zqqsc9xaIZFFJcOh8ti1ARCgov4otDVW5itbAIqEqIscyu67iyIijCSVYdHi4vfYdXeNrh5CV3BNALOcyDHfd5mUZJeqiRMzCHwNTFBjqkAR%2FE7l%2BL1xAYi%2FENL42Y5dhwBGXiv3oxmLGN0NwY9qO5qJ6tJE4GFg8y498fh27Cgws%2Fna3YaRkZJkswDSO1SdddcNd7l86oRfpybBGuR%2FCmQqjKEO%2FAmy2FY4BU68ZFpQcxkU5%2Bv6erfBVRGjnM8qs2hnrAtlThXPmZDsh9sY90rLN2mJAp3uPNsSahQn9fP4Fl7%2B3SmdCBOpgV7Nmy3zKPbR01&X-Amz-Signature=726858302d66d1e792332d5b6218e982ddc61b42a53141f499c2031bf07a0a20&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


## 부모클래스 상속 대신 인터페이스를 사용하는 이유?

- 계**약의 정의**
    - 인터페이스는 클래스가 특정 계약을 준수하도록 강제한다. 이 계약은 클래스가 구현해야 할 메서드와 속성의 명세를 포함한다.
- **유연성**
    - 인터페이스를 통해 다양한 클래스들이 같은 인터페이스를 구현함으로써, 다형성을 지원한다. 이는 서로 다른 클래스들이 같은 인터페이스를 공유할 수 있게 하여, 코드의 재사용성과 유지보수성을 향상시킨다.
- **분리와 추상화**
    - 인터페이스는 구현을 분리하고 추상화하는 데 도움을 준다. 클래스는 인터페이스의 구현에만 집중할 수 있으며, 인터페이스 자체는 구현 세부 사항으로부터 분리된다.

### 인터페이스 구현


```javascript
interface Movable {
	move(): void;
}

class Car implements Movable {
	move() {
		console.log('Car is moving');
	}
}

class Animal implements Movable {
	move() {
		console.log('Animal is moving');
	}
}
```


Movable 인터페이스는 move메서드를 정의하고, Car와 Animal클래스는 Movable인터페이스를 구현한다. Car와 Animal이 move메서드를 가지고 있음을 보장합니다.


### 클래스 구현


```javascript
class Vehicle {
	startEngine(): void {
		console.log('Engine started');
	}
}

class Car extends Vehicle {
	openDoor(): void {
		console.log("Door opened");
	}
}

const myCar = new Car();
myCar.startEngine(); // 상속받은 메서드
myCar.openDoor(); // Car 클래스에 정의된 메서
```


Car클래스는 Vehicle클래스로부터 startEngine메서드를 상속받는다. Car는 추가적으로 openDoor메서드를 정의한다.


