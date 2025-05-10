# Nari-Web

## 📋 기술 스택 정리

| 항목            | 라이브러리/도구                     | 사용 목적                               |
| :-------------- | :---------------------------------- | :-------------------------------------- |
| **상태관리**    | `@tanstack/react-query`             | 서버 데이터 패칭과 캐싱 최적화          |
| **스타일링**    | `tailwindcss`                       | 빠른 스타일링과 일관된 디자인 시스템    |
| **API 통신**    | `axios`                             | 편리한 HTTP 요청/응답 처리              |
| **폼 검증**     | `zod`                               | 타입 기반 폼 검증                       |
|                 | `react-hook-form`                   | 폼 성능 최적화와 리렌더링 최소화        |
|                 | `@hookform/resolvers`               | react-hook-form과 zod 연결              |
| **빌드 툴**     | `vite`                              | 빠른 번들링과 최신 개발 환경 구축       |
|                 | `vite-tsconfig-paths`               | TypeScript 경로 별칭(path alias) 인식   |
| **TypeScript**  | `typescript`                        | 타입 안정성과 코드 신뢰성 강화          |
| **코드 품질**   | `eslint`                            | 코드 품질과 일관성 유지                 |
|                 | `eslint-plugin-import`              | import 문 정리                          |
|                 | `eslint-import-resolver-typescript` | ESLint의 TypeScript 경로 별칭 인식 강화 |
| **코드 포맷팅** | `prettier`                          | 코드 스타일 자동 통일과 포맷팅 강화     |

## 📝 폴더 구조

```
📦 src
├─ app
│  ├─ globalStyles
│  ├─ providers
│  ├─ router
│  └─ App.tsx
├─ features
│  └─ auth
│     ├─ apis
│     ├─ hooks
│     └─ components
├─ pages
│  └─ Home.tsx
└─ shared
   ├─ components
   ├─ constants
   ├─ hooks
   ├─libs
   │  └─ httpClient.ts
   ├─ types
   └─ utils
```

| 폴더                    | 설명                                                 |
| :---------------------- | :--------------------------------------------------- |
| `src/app`               | 앱 초기화(globalStyles, providers, router 등) 역할   |
| `src/features`          | 비즈니스 도메인 단위                                 |
| `src/pages`             | URL 경로에 대응하는 페이지 단위                      |
| `src/shared/components` | 범용 UI 컴포넌트(Button, Modal 등) 관리              |
| `src/shared/constants`  | 전역 상수(route path, error code 등) 관리            |
| `src/shared/hooks`      | 범용 커스텀 훅 관리 (ex: useDebounce)                |
| `src/shared/types`      | 공용 타입(interface, type alias 등) 관리             |
| `src/shared/utils`      | 범용 유틸 함수(dateUtils, stringUtils 등) 관리       |
| `src/shared/libs`       | 외부 라이브러리 기반 모듈 확장 관리 (ex: httpClient) |
