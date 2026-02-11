# 01.vanilla-vue3

## ✅ Basics

```bash
# 프로젝트 설치 시
## 1. Project Setup
> vue create 폴더명

## 2. Project Setup
> 개인이 원하는 설치 환경값(vanilla, ts, vite 등) 선택 후 엔터키를 눌러 설치 완료하기

# git clone 시
## 1. Project Setup
> yarn install

## 2. Compiles and hot-reloads for development
> yarn serve

## 3. Compiles and minifiles for production
> yarn build

## 4. Lints and fixes files
> yarn lint
```

## 목적

- `vue-cli`를 사용하여 가장 기본 세팅이 된 Webpack기반 프로젝트 일 때 TDD 구축을 통하여 전반적인 흐름에 대한 스터디 및 기술 습득

## 🌼 Installed Ones

- Vitest의 TDD는 테스트 대상이 라이브러리와 플러그인에서 다르기 때문에 라이브러리와 플러그인을 구분하여 작성
- 구분기준: `app.use()`로 시스템에 등록해야 할 때
- Vite 기반의 프로젝트를 구축하여 Vitest를 사용하는것은 크게 연관성이 없기에 바닐라로 먼저 테스트(전반적인 흐름에 대한 스터디 및 기술 습득)
- Vitest는 Vites의 설정 엔진만 빌려쓰는 테스트 러너
- 번들 툴은 vite 말고도 많음

### 🔗 라이브러리득

| 라이브러리명 | 버전    | 설명     | 공홈                   | 비고 |
| ------------ | ------- | -------- | ---------------------- | ---- |
| axios        | ^1.13.5 | API 통신 | https://axios-http.com |      |

### 🔗 플러그인

| 라이브러리명 | 버전   | 설명             | 공홈                     | 비고 |
| ------------ | ------ | ---------------- | ------------------------ | ---- |
| vue-router   | ^4.6.4 | 라우팅           | https://router.vuejs.org |      |
| pinia        | ^3.0.4 | 전역 데이터 관리 | https://pinia.vuejs.kr   |      |

## 😎 TDD Infra

### 🔗 Default

| 구분                  | 도구                     | 버전 | 설명                                 | 공홈                                     | 비고 |
| --------------------- | ------------------------ | ---- | ------------------------------------ | ---------------------------------------- | ---- |
| AI어시스턴트/에이전트 | Claude Code(CC)          |      | 어시스턴트                           | https://code.claude.com/docs/en/overview |      |
| 테스트 러너(runner)   | Vitest                   |      | 프론트 테스트 프레임워크 테스트 러너 | https://vitest.dev                       |
| 모킹 라이브러리       | Mock Service Worker(MSW) |      | 모킹용                               | https://mswjs.io                         |

### 🔗 Others

- 업데이트 중

| 구분           | 도구      | 버전 | 설명           | 공홈                     | 비고 |
| -------------- | --------- | ---- | -------------- | ------------------------ | ---- |
| UI 테스트 러너 | storybook |      | UI 테스트 전용 | https://storybook.js.org |      |

---

# TDD 환경 구축

## Vitest

### 1. vitest 의존성 설치

```bash
# 1. 버전 충돌 문제 해결 & 의존성 설치(--legacy-peer-deps)
> npm install -D vitest @vitejs/plugin-vue @vue/test-utils jsdom @vitest/ui @vitest/coverage-v8 msw @pinia/testing --legacy-peer-deps
```

| 패키지명               | 역할                                                                              | 필수여부 |
| ---------------------- | --------------------------------------------------------------------------------- | -------- |
| @vitejs/plugin-vue     | Vitest가 .vue 파일을 해석할 수 있게 해주는 엔진                                   | 필수     |
| @vue/test-utils        | Vue 컴포넌트를 테스트용으로 마운트하고 조작하는 공식 도구                         | 필수     |
| jsdom (또는 happy-dom) | Node.js 환경에 가상 브라우저(DOM) 생성. 이게 없으면 document, window를 쓸 수 없음 | 필수     |
| @vitest/ui             | 테스트 결과를 터미널이 아닌 예쁜 브라우저 화면으로 보여줌                         | 권장     |
| @vitest/coverage-v8    | 내 코드의 몇 %가 테스트되었는지(커버리지) 리포트 생성                             | 권장     |

### 설치 시 발생 가능 오류

**1. unable to resolve dependency tree**

- 원인

  1. 이전에 설치한 dependency 혹은 peer dependecy(대부분의 경우 peer)와 충돌

- 분석

  1. 에러 상세 설명에 어느 패키지와 충돌나는지 적혀있음. 상세 분석은 개인 오류별로 알아서.

- 해결방안(1안으로도 충분)

  1. 에러 상세 설명에 적힌 충돌나는 패키지와, 설치하려는 패키지의 dependency 확인 및 버전 업데이트 혹은 강제 설치 명령어 추가
     - `--legacy-peer-deps`
  2. 개인별 오류 항목에 대한 분석 후 패키지 버전 변경 혹은 삭제(필요없을 시)

- `--legacy-peer-deps` 명령어 해석

  1. legacy: 좀 친절하게(깐깐하게 굴지말고) 체크해줘
     - legacy인 이유는 npm v6은 peer 충돌을 에러로 안잡고 그냥 설치했는데 v7 이상부턴 충돌나면 에러로 잡고 설치를 안해줘서, 기존 버전(옛날거(v6)=legacy)에서 하던대로 설치해줘란 의미
  2. peer-deps: peer deps를

- 추가 설명

  - peer dependecy:
    - dependecy를 설치 후 사용하기 위해 기본적으로 필요한 의존성(예: 사람의 뇌:peer / 수학, 과학 등 다른 항목:dependecy)
    - 즉, dependency는 peer dependency에 의존(은 좀 애매한 설명이긴 하나, 어쨌든 뭐. 뜻만 통하면 될 듯. P2P가 Peer 2 Peer)
    - P2P: 중간 서버 안 거치고 A에서 B로 데이터 바로 쏘기(일반: A -> 서버 -> B)
    - `peer` in iT: 수평구조(계층 및 권한 포함) 물리나 논리적 계층이 동등할 때 peer라고 부름
    - peerDependecy 확인방법: @/node*modules/당신이*설치한*라이브러리*폴더의\_package.json
    - 예: `@/node_modules/vue/package.json`
      ```javascript
      "peerDependencies": { "typescript": "*" },
      "peerDependenciesMeta": {
      "typescript": {
      "optional": true}}
      ```

- 참고
  - [stackoverflow](https://stackoverflow.com/questions/64573177/unable-to-resolve-dependency-tree-error-when-installing-npm-packages)

### 2. 파일 설정

```javascript
# vitest.config.js
# vitest 설정
/* 프로젝트 루트 경로에 vitest.config.js 파일 추가 */

import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,      // expect, describe 등을 전역 사용
    environment: 'jsdom', // 브라우저 환경 모사
    setupFiles: ['./tests/setup.js'], // 테스트 전 실행할 설정
    alias: {
      '@': path.resolve(__dirname, './src'), // 경로 별칭 (@/components 등)
    },
  },
});
```

```javascript
# src/mocks/handler.js
# 네트워크 모킹 설정: MSW 핸들러
/* src에 mocks 폴더 생성 후, 해당 폴더 안에 handler.js 파일 추가 */

import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/user', () => {
    return HttpResponse.json({ name: '철수' });
  }),
];

export const server = setupServer(...handlers);
```

```javascript
# tests/setup.js
# 전역 테스트 설정
/* src에 tests 폴더 생성 후, 해당 폴더 안에 setup.js 파일 추가 */

import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './mockServer';

beforeAll(() => server.listen()); // 서버 가동
afterEach(() => server.resetHandlers()); // 핸들러 초기화 (테스트 간 간섭 방지)
afterAll(() => server.close()); // 서버 종료
```

### 3. package.json에 추가

- 테스트 실행을 위해 package.json에 아래 코드 추가
  `"script"`에 `{"test": "vitest"}` 추가

### 4. 실행

```bash
> npm test
```
