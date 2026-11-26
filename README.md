# 박정환 · Full-stack Developer Portfolio

웹과 모바일에서 사용자가 기능을 쉽게 이용할 수 있도록 화면을 만들고, 그 흐름을 뒷받침하는 API와 데이터 구조를 함께 설계합니다. 이 저장소는 실제 작업과 개인 프로젝트의 화면, 주요 기능, 기술을 적용한 이유를 소개하는 포트폴리오입니다.

## 🛠️ 사용 기술

![Next.js](https://img.shields.io/badge/Next.js-171717?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![CSS Modules](https://img.shields.io/badge/CSS_Modules-264DE4?style=flat-square&logo=cssmodules&logoColor=white)
![Motion](https://img.shields.io/badge/Motion-202124?style=flat-square&logo=framer&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-242424?style=flat-square&logo=threedotjs&logoColor=white)
![Gmail SMTP](https://img.shields.io/badge/Gmail_SMTP-EA4335?style=flat-square&logo=gmail&logoColor=white)

| 기술 | 이 포트폴리오에서 사용한 곳 |
| --- | --- |
| Next.js · React · TypeScript | 단일 페이지의 섹션 구성, 프로젝트 데이터 정의, 상세 모달과 문의 API 구현 |
| CSS Modules · Motion | 모바일과 데스크톱 레이아웃, 카드 등장과 가로 스크롤, 메뉴 펼침 애니메이션 |
| Three.js | Hero의 3D 오브젝트 렌더링과 애니메이션. 화면을 벗어나면 렌더링을 멈추고, 초기화가 어려운 환경에는 대체 그림을 표시합니다. |
| Nodemailer · Gmail SMTP | 문의 폼의 입력을 서버에서 검증한 뒤 Gmail로 발송합니다. 방문자가 입력한 주소로 답장할 수 있도록 `Reply-To`를 설정했습니다. |

## 🚀 배포한 개인 프로젝트

| 프로젝트 | 하는 일 |
| --- | --- |
| 🎲 [오늘의 뽑기](https://todayppopgi.vercel.app/) | 카드 보드에서 당첨 등수를 확인하고, 등수별 수량을 조정해 새로운 뽑기를 시작할 수 있습니다. |
| 🎮 [리그 오브 레전드 밴픽 툴](https://banpick.vercel.app/) | 블루팀과 레드팀 정보를 설정하고, 싱글 또는 매치 모드에서 챔피언 금지와 선택을 연습할 수 있습니다. |

## ✨ 포트폴리오 사이트의 주요 기능

- 스크롤을 따라 가로로 이동하는 프로젝트 카드와 화면·기술 설명을 담은 상세 모달
- 모바일 햄버거 메뉴, 부드러운 섹션 이동, 우측 하단 맨 위로 버튼
- 개인 프로젝트 첫 화면을 담은 별도 모달과 푸터 프로젝트 선택 메뉴
- 이름·이메일·제목·내용을 입력해 발송하는 문의 폼과 결과 안내

## 로컬 실행

```sh
npm ci
npm run dev
```

`http://localhost:3000`에서 확인할 수 있습니다. 문의 메일을 발송하려면 서버 환경 변수 `CONTACT_SMTP_USER`와 `CONTACT_SMTP_PASSWORD`를 설정합니다.
