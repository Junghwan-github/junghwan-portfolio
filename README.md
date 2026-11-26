# JUNGHWAN PARK Portfolio

```sh
npm install
npm run dev
```

개발 서버는 `http://localhost:3000`에서 열 수 있습니다.

- `src/app`에서 App Router 페이지와 레이아웃을 관리합니다.
- `src/components/layout`에는 Header, Container, Footer를 둡니다.
- `src/styles`에는 전역 스타일, CSS 변수, 리셋, 웹폰트 선언을 둡니다.
- `@/`는 `src/`를 가리킵니다. 예를 들어 `import Mark from "@/assets/mark.svg"`로 SVG를 React 컴포넌트처럼 사용할 수 있습니다.
- Three.js와 TypeScript 타입이 설치되어 있습니다. WebGL 렌더러를 추가할 때는 클라이언트 컴포넌트에서 초기화합니다.

`npm run lint`, `npm run typecheck`, `npm run build`로 프로젝트를 확인할 수 있습니다.
