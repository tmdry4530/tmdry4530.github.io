---
title: "Next.js"
slug: "nextjs"
status: "public"
type: "Post"
category: "💻 Frontend"
tags: ["Next.js"]
summary: ""
thumbnail: "/thumbnails/nextjs.jpg"
date: "2024-01-10"
---


## Next.js란?

- 리액트 기반의 프레임워크로, 풀스택 웹 어플리케이션을 구축하기 위해 사용된다.
- 리액트 컴포넌트를 사용하여 사용자 인터페이스를 구축하고 넥스트는 추가기능과 최적화를 제공한다.
- 넥스트는 리액트를 위한 번들링, 컴파일링 등의 도구를 자동으로 추상화하고 구성하여 개발자들이 어플리케이션 구축에 집중할수있도록 도와준다

### 주요 특징

1. **파일 시스템 기반 라우팅**
    1. 서버 컴포넌트를 기반으로 하는 라우팅 시스템을 제공하고, 레이아웃, 중첩라우팅, 로딩상태, 에러 처리 등을 지원한다
2. **렌더링**
    1. CSR 및 SSR을 지원하며, 클라이언트 및 서버 컴포넌트를 사용한다.
    2. 서버에서 정적 및 동적 렌더링을 최적화하고, Node.js 런타임에서 스트리밍을 지원한
3. **데이터 가져오기**
    1. 서버컴포넌트에서 async/await을 사용하여 데이터를 간단하게 가져올수있으며, 요청 메모이제이션, 데이터 캐싱 및 재검증을 위한 fetch API를 제공한다
4. **스타일링**
    1. CSS모듈, Tailwind CSS 등 선호하는 스타일링 방법을 지원한다
5. **최적화**
    1. 이미지, 폰트, 스크립트 최적화를 통해 어플리케이션의 핵심 웹 바이탈과 사용자 경험을 향상시킨다.
6. **타입스크립트**
    1. 타입스크립트에 대한 개선된 지원을 제공하며, 더 나은 타입검사와 더 효율적인 컴파일을 가능하게 한다.

**넥스트 12버전까지는 페이지라우터가 사용되었지만 13버전부터는 앱 라우터를 사용하여 레이아웃, 서버컴포넌트, 서스펜스 등 리액트의 최신 기능을 활용할수있다.**


## 폴더구조


![Untitled.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/35d62817-513e-4f49-8028-93e1cdbed9e5/30a38a99-3eec-47ea-9878-599e42f5db4f/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667DJI5N3G%2F20250901%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250901T044331Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICMJk2Mt2ChOnunsDW%2B3sr%2BFgTGSn0wPqiKuAFsGlUwPAiBN9AAB00EtbjfmFg7oVn9cilAaRH6zvejvpIH6tECgQiqIBAj9%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMCXOZD%2BCRyLnF9ouMKtwD%2Bs63NpEbgPCTr%2FznHwDf5T%2FK8N298sUzyeIUkac2Vc0d%2FhFoTHT8QTEBh2rVqcHrJRywNAh3JC6jFGLGdY4WB%2Bzh%2BWRzLqTlqLSWP2%2FfCoiQb5A5Oh%2FjzBkPfKZc52K7u0GZXOi0vwPXd8ubFW5T7SrGF%2Fjhu1ppXySJRduMYCi%2BDsbDYHFVE%2FnR6UPH5mOpfhBGLtExw%2BO8kJbQuVaRV5QPRXEWxEUyGP6AEdmXHBPQUXgN0lb203J0H2HUFhUsRBa4Z319O1t35l6Vqc8ejXsDAkwS2zzSmMqBWzNSMMKac7jJvT9daNBbQA%2B%2BVAbIujA9Mt2SIk9AeiMZU5JDVb21daatG%2F4YVxKT%2FtFoL0Nx%2FOwRo%2FVO02y%2FK0w0sSJ%2BGYVLAyLfSA0xvFbQ5FeozuU%2Br88qT6xft%2F0StDFBPylLFo%2BFbF5mXb5W0uHaWXzxrDgi7SIC9vHXYzx5OGfDhTtgF0WDxAFCZspKq5R4EyJsuWvpaouBzRc8Ueb5Ni7jgSr3JspeMhZYkcoF936Wj%2F9JLQBYSDoSIQfynValimJFz6w5CYIW8Kld2Wz9h5UHkoqhqmmStT1keCIqf13VFB%2FbNLLY31wC94cX%2FGXnmw8BBuDeuANsFk%2FI1lAwlcDUxQY6pgGVCzDQqIB6Su38qslkFnF8IWE2UTszWC8O6xbrzegttUI9Hd%2BIWweZHJiS7jDa03BDWj1ev3iddJgJaSx1CEEnb64mVPONgfsfKl%2Bq4apkBQ44mB%2FSfO%2FIIjqCA6DBwrrVUvwdK1K4Grgl%2F9NTopNVNP2tAb6c05g8j4aa4EBozLgXuBTZeMqhHISOS5Lqkr2%2BnpzEAnEnCQSLGGtKU%2FpiCe23bZ3s&X-Amz-Signature=73c035de4fa8280ecd9dfe71f52db96259a509ed90123306ba7e1084cf504fbf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- **/app :** 어플리케이션에 대한 모든 경로, 구성요소 및 논리가 포함되어있으며 여기서 주로 작업하게 된다.
- **/app/lib :** 재사용 가능한 유틸리티 함수, 데이터 가져오기 함수 등 어플리케이션에서 사용되는 함수가 포함되있다.
- **/app/ui :** 카드, 테이블, 양식 등 어플리에키션의 모든 UI 구성요소가 포함되있다.
- **/public :** 이미지와 같은 모든 정적자산을 포함한다
- /**scripts :** 이후 창에서 데이터베이스를 채우는 데 사용할 시드스크립트가 포함되있다.

