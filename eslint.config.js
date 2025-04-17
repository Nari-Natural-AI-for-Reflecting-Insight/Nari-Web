import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "build"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  importPlugin.flatConfigs.recommended,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "import/no-unresolved": "off",
      eqeqeq: "error", // 항상 === 사용
      curly: ["error", "all"], // 모든 조건문에 중괄호 필수
      "no-implicit-coercion": "warn", // !!value 같은 강제 변환 방지
      "no-var": "error", // var 금지
      "prefer-const": "error", // let → const 가능하면 const
      "no-console": ["warn", { allow: ["warn", "error"] }], // 로그 사용 제한
      "no-debugger": "error", // debugger 제거
      "react/self-closing-comp": "error", // <div></div> → <div />
      "react/jsx-boolean-value": ["warn", "never"], // <Button disabled={true} /> → <Button disabled />
      "react/jsx-curly-spacing": ["warn", { when: "never", children: true }], // { value } → {value}
      "react/jsx-no-useless-fragment": "warn", // 불필요한 <> </> 금지
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external", // 외부 라이브러리 (차크라)
            "internal", // 내부경로를 다르게 설정했을 때
            "parent", // 상대경로 부모 (../pages/home)
            "sibling", // 상대경로 형제(./bar/baz)
            "index", // 상대경로 현재(./)
            "object", // 타입스크립트에서만 사용가능
            "type", // 타입
            "unknown", //  alias
          ],
          pathGroups: [
            {
              // 리액트 관련 import문을 다른 외부 라이브러리보다 위에 위치시킴 'react', 'react-dom', 'react-router-dom
              pattern: "react*",
              group: "external",
              position: "before",
            },
            {
              pattern: "@/core/*",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@/features/*",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@/pages/*",
              group: "internal",
              position: "after",
            },
            {
              pattern: "@/shared/*",
              group: "internal",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["react"],
          alphabetize: {
            order: "asc", // 오름차순
            caseInsensitive: true, // 대문자 우선
          },
        },
      ],
    },
  },
  {
    files: ["eslint.config.js"],
    rules: {
      "import/no-unresolved": "off",
    },
  }
);
