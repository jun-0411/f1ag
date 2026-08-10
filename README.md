<div align="center">
  <h1>F1ag</h1>
  <p>F1 DATA</p>
  <p>
    <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React" />
    <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  </p>
</div>

## F1 데이터를 더 깊고 쉽게, F1ag

F1ag는 Formula 1의 그랑프리, 세션 결과, 기록, 서킷 정보를 한국어로 탐색하고 해석할 수 있는 웹사이트입니다.

이곳은 F1ag의 프론트엔드 프로젝트입니다.

## 시작하기

다음 명령어를 입력하여 개발 서버를 실행합니다.

```bash
yarn install
yarn dev
```

[http://localhost:5173](http://localhost:5173)에 접속하여 개발 화면을 확인할 수 있습니다.

## 프로젝트 구조

```text
src/
├── api/          API 요청 함수
├── components/   공통 및 도메인 컴포넌트
│   └── ui/       Shadcn UI 컴포넌트
├── constants/    여러 페이지에서 사용하는 상수
├── hooks/        커스텀 훅
├── mocks/
│   ├── db/       MSW mock 데이터
│   └── handlers/ 기능·도메인별 MSW handler
├── routes/       페이지 컴포넌트
├── routes.ts     전체 route tree 설정
├── types/        여러 페이지에서 공유하는 타입
└── utils/        여러 페이지에서 공유하는 유틸리티
```

### 브랜치

- `dev`에서 브랜치를 만들어 작업합니다. 작업을 마치면 풀 리퀘스트를 올리고, 다른 작업자는 코드 리뷰 후 `dev` 브랜치로 **스쿼시 병합**합니다.
- 병합이 완료되면 깃허브 액션을 통해 [f1ag-1qni9807x-jun411s-projects.vercel.app](f1ag-1qni9807x-jun411s-projects.vercel.app)으로 자동 배포됩니다.
- 브랜치 이름은 `{유형}/{이름}`으로 작성합니다.
  - 브랜치 유형: `feat`, `fix`, `chore`, `style`, `refactor`
- PR 제목을 작성할 때는 [깃모지](https://gitmoji.dev)를 사용하는 것을 권장합니다.

## 기술 스택

| Category | Technology |
| :--- | :--- |
| Core | React 19, TypeScript |
| Build | Vite |
| Routing | React Router v7 |
| UI | Tailwind CSS v4, Shadcn UI, Lucide |
| Quality | Biome, Knip, GitHub Actions |

## 기여자

| [이준엽(@jun-0411)](https://github.com/jun-0411) | 박명규 |
| :---: | :---: |
| <a href="https://github.com/jun-0411"><img src="https://avatars.githubusercontent.com/u/202625805?v=4" width="150"></a> | :---: |
| 프론트엔드 담당 | 백엔드 담당 |
