# axios 스터디 내용 정리

## 프로젝트 구조설계 및 주요 스터디 내용과 이유

### 목표

1. 테스트 코드와 Mock 서버가 엉키지 않게 완전 분리를 통해 의존성이 낮은 TDD 구축

### axios 구조

기본 구조: `api/api_route_path_name/api_route_path_name.xx.js`

1. **`api/user/instance.js`**
   - `instance.js`: axios와 관련된 설정을 하는 곳으로 인터셉터, baseUrl, 전역 에러 등을 설정
2. **`api/user/user.repo.js`**
   - `user.repo.js`: 데이터 캡슐화를 통해 의존성을 낮추고 TDD 진행 시 개별 시뮬레이터로 활용하기 위한 레포지토리로 실제 axios를 호출하는 부분으로 api별 비지니스 로직 구현
3. **`api/user/user.trans.js`**
   - `user.trans.js`: 서버에서 들어온 데이터를 프론트로 반환하기 전, 프론트에 맞춰 정제하는 역할로 단테 혹은 데이터와 관련된 테스팅을 진행할 때 의존성 없이 해당 파일만 활용하기 위해 repo에서 분리

### Mock 구조

기본 구조: `mocks/**.js`

1. **`mocks/handler.js**
   - `handler.js`: 기본 환경 설정 및 네트워크 요청을 가로채서 테스트용 더미 데이터를 작성하여 실행
2. **`mocks/server.js`**
   - `server.js`: mock 서버를 설정하는 부분
3. **`api/user/user.spec.js`**
   - `user.spec.js`: 모킹을 위한 실제 실행 코드 설정 및 실행하는 곳으로 테스트 관련 코드 작성 및 실행, 검증

### Mocking을 위한 Vitest

1. `vitest.setup.js`: 테스트 시 전역으로 실행할 함수 및 관련 코드 작성 및 실행

### 테스트 기본 구조

1. 핸들러(`handler.js`)는 `return status`가 `200`일 때의 케이스만 작성한다.
2. `return`이 `400` 등의 비지니스 로직에 따른 에러 케이스는 각 `**.spec.js` 파일에 작성하여 개별 에러 핸들링 처리를 한다. [msw 공홈 설명](https://mswjs.io/docs/best-practices/network-behavior-overrides)
3. 전역 에러 처리는 `instance`에서 관리한다.

### msw overrides (관련 내용은 상단 **msw 공홈 설명** 링크 타고 확인 가능)

1. msw의 기본 모킹 철학은 모듈화이다. `handler.js`에 다 작성하면 관리가 안되니 모듈화 해라
2. msw는 `handler.js`에 작성한 초기 설정 코드(init)을 실행하지만, 런타임 중 override 가 된 경로가 있을 경우, 해당 코드를 실행한다.(작동 원리: handler stack)
3. msw의 작동 원리
   - 스택 구조 관리(LIFO)
   - 함수 호출 시 우선순위: `server.use()`
   - 함수 호출 시 후선순위: `handler.js`
4. `handler.js`내 api 콜 주소는 중복될 수 없다.

**msw 콜 순서**

**server.use() -> handler.js**

> 그러므로, 함수 콜링 순서에 맞춰, 각 repo에서 비지니스 로직 별 에러 처리를 하는 것이 msw 처리 로직과 일치하니, 이대로 스터디 및 테스트를 진행했음
