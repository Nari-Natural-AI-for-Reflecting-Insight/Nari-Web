# Nari-Web

# 폴더 구조

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
