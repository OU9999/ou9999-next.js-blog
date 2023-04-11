# OU9999 Next.js Blog!

<img width="650" alt="op_resize" src="https://user-images.githubusercontent.com/113419018/231088010-e65212ff-48c4-480d-bf25-7427638b6e93.png">

https://ou9999-next-js-blog.vercel.app/

<div align="center">
	<img src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white" />
	<img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white" />
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=Firebase&logoColor=white" />
  <img src="https://img.shields.io/badge/ChakraUI-319795?style=flat&logo=ChakraUI&logoColor=white" />
</div>
<br>

### Introduce

개발환경

    Next.js , React , TypeScript , Firebase , Chakra UI

<hr>

#### 구상

![next](https://user-images.githubusercontent.com/113419018/231082483-a9f58160-1aa5-4a78-b79b-ec4ed1da99a4.png)

- https://ou9999-next-js-blog.vercel.app/entry/Next.js-%EB%B8%94%EB%A1%9C%EA%B7%B8-%EA%B0%9C%EB%B0%9C%ED%95%98%EA%B8%B0---0-(%EA%B5%AC%EC%83%81)/HpM1F6WAA9wP5WqxJgqT
- Next.js 리메이크 이유
- 계획단계

<hr>

#### SSR & SEO

<img width="958" alt="스크린샷 2023-04-10 오전 10 05 20" src="https://user-images.githubusercontent.com/113419018/231082682-487f18c7-12f1-443c-a084-f243fb320e07.png">

- https://ou9999-next-js-blog.vercel.app/entry/Next.js-%EB%B8%94%EB%A1%9C%EA%B7%B8-%EA%B0%9C%EB%B0%9C%ED%95%98%EA%B8%B0---1-(SSR-&-SEO)/AHKyregTvxawyJz1ftu2
- SSR 구현 단계
- SSR 속도 개선
- SEO,OG 설정

<hr>

#### Color Theme

![화면 기록 2023-04-07 오후 5 06 19](https://user-images.githubusercontent.com/113419018/231082922-f16c7464-2fcd-404f-88f1-94d0fea9bb1a.gif)

- https://ou9999-next-js-blog.vercel.app/entry/Next.js-%EB%B8%94%EB%A1%9C%EA%B7%B8-%EA%B0%9C%EB%B0%9C%ED%95%98%EA%B8%B0---2-(%EC%BB%AC%EB%9F%AC%ED%85%8C%EB%A7%88)/ZLtAWJVecaOHxPF1HH2C
- Chakra UI extendTheme 사용
- Recoil을 이용하여 모든 컴포넌트는 컬러테마 값을 받아오도록 설계

<hr>

#### Mobile View

![good](https://user-images.githubusercontent.com/113419018/231083163-ce3a56f8-d01b-4097-a3ba-bb0a5475371a.gif)

- https://ou9999-next-js-blog.vercel.app/entry/Next.js-%EB%B8%94%EB%A1%9C%EA%B7%B8-%EA%B0%9C%EB%B0%9C%ED%95%98%EA%B8%B0---3-(%EB%AA%A8%EB%B0%94%EC%9D%BC-%ED%99%94%EB%A9%B4-%EA%B5%AC%ED%98%84)/P2epAlQCIft9jjq8s9HZ
- useMediaQuery 사용
- 모바일 친화적 Header 제작
<hr>

#### Loading Component

![화면 기록 2023-04-09 오후 2 43 16](https://user-images.githubusercontent.com/113419018/231083444-46d6a924-eec9-4081-a2c2-99164b06c28c.gif)

- https://ou9999-next-js-blog.vercel.app/entry/Next.js-%EB%B8%94%EB%A1%9C%EA%B7%B8-%EA%B0%9C%EB%B0%9C%ED%95%98%EA%B8%B0---4-(%EB%A1%9C%EB%94%A9-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EA%B5%AC%ED%98%84)/Xwhw7W6nocwctdd8Gx64
- 페이지 이동간 Loading Component 구현
- Chakra UI의 Spinner 사용

<hr>

#### 배포 후 문제점 수정

- https://ou9999-next-js-blog.vercel.app/entry/Next.js-%EB%B8%94%EB%A1%9C%EA%B7%B8-%EA%B0%9C%EB%B0%9C%ED%95%98%EA%B8%B0---5-(%EB%B0%B0%ED%8F%AC-%ED%9B%84-%EB%AC%B8%EC%A0%9C%EC%A0%90-%EC%88%98%EC%A0%95)/YKV5dQ4nFDPIXAPpzNfE
- 모바일 페이지 UI , 속도 개선
- 모바일 페이지 전환 개선 (dynamic import 사용)
- 로딩컴포넌트를 사용자 친화적으로 변경
- 다양한 환경을 고려한 폰트 업데이트

<hr>

### Conclusions

- CRA부터 시작해서 Next.js 나 베이스로 나만의 블로그를 개발하는데 한 달이 넘게 걸린 것 같다. 클론 코딩도 좋지만... 내가 직접 만들면서 마주하는 문제들을 해결하는 게 정말 도움이 많이 된다.
- Next.js는 정말 좋은 것 같다. React에 SSR을 구현하는 게 정말 대단하게 느껴진다.
- Next.js 13의 appDirectory가 더 안정화되고 더 많이 사용되었으면 한다. Nested Layout이나 app 폴더의 라우팅 방식이 너무 마음에 들었지만 배포가 안정화되지 않은 게 많이 아쉬웠다.
- 지인에게 나의 블로그를 냉정하게 평가해 줄 것을 요청했고, 각종 피드백을 수용했다.
- 사용자의 입장과 개발자의 입장은 완전히 다르다. 내가 만든 홈페이지를 배포하려면 당연시 사용자의 입장으로 만들어야 한다. 그동안 개발자인 나의 편의를 위해 너무 간단하고 불편하게 만들려고 했던 것 같다. ~~당장 CSR 블로그만 봐도 불편~~
- 다양한 상황과 환경을 고려하고 개발해야 한다.
- 개발자는 디자이너가 아니다.. 보이지 않는 많은 문제를 처리해야한다.
- 내가 겪었던 문제들을 다시 마주하면 당연히 해결할 수 있고, 모르는 문제들을 마주한다고 해도 , 새로운 것들을 깨닫고 더 배울수 있다는 사실이 기쁘다.
<hr>
