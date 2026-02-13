# 🎶 TDD를 위한 Axios 패러다임

`axios의 패턴은 TDD의 목표에 따라 바뀔 수 있으나, 개인적인 의견으론 백단과 완전한 분리를 통해 의존성을 낮추고 테스트를 진행하는 것이 우선되어야 한다고 생각한다. 또한 각 단계별로 진행할 테스트 역시 타 기능 및 파일, 설정 등에 영향을 받지 않고 독단적으로 테스트가 가능해야지 사이드 이펙트가 낮아지며 유지보수성이 올라갈 수 있다고 생각하므로, axios 관련 테스트는 하단에 기술한 Repo Pattern + Data Transformer 조합으로만 진행한다. `

- 다른 패러다임에 대한 테스트 역시 진행 가능성이 있음.
- MSW의 모킹 레벨을 본 기능인 네트워크에 초점을 맞춰 진행.
- 검색 기능은 구현 하지 않을거라서 md 파일하나에 작성합니다. 검색이 필요하면 ctrl + f 눌러서 브라우저의 기본 검색 기능으로 사용하시면 되요.

## 목차

- [목표](#goal)
- [개요](#intro)
- [패턴의 장단점](#pandc)
- [파일 구조](#file-structure)
  - [폴더 및 파일 상세 설명](#detail)
- [TDD 진행 시 axios 관련 초기 셋업 코드](#init)
  - [환경 설정](#env-init)
  - [msw](#msw-init)
  - [axios](#axios-init)
  - [Repository](#repository)
  - [Data Transformer](#data-transformer)
  - [Axios Call in Component](#axios-call-in-component)

## 📍 Repository Pattern + Data Transformer

### ✅ <a id="goal"></a> 목표

- **백단과의 완벽한 분리를 통해 의존성을 낮춘다.**
- 단계별 의존성을 낮춰 독립적으로 테스트를 진행한다.
- 사이드 이펙트를 최소화 하여 엣지 케이스 수를 줄인다.
- 패턴 관리로 유지보수성을 높이고 런타임 에러를 방지한다.
- 코드의 가독성을 높여 러닝 커브를 낮춘다.

### ✅ <a id="intro"></a> 개요

- 가장 기본 조합의 패러다임
- 이 패러다임은 Axios 인스턴스, 데이터 변환 로직(Transformer), 그리고 도메인 로직(Repository)을 철저히 분리한다.
- Axios는 통신만 담당
- Transformer는 말 그대로 데이터 형태변환(예: 카멜 케이스 -> 스네이크 케이스로 변환 등)
- Repository는 위의 두 단계를 인터페이스화하서 독립화

### ⁉️ <a id="pandc"></a> 패턴의 장단점

- 장점
  1. 코드 재사용성 증가
  2. 서버와 프론트 구조 분리
  3. 테스트 자동화 용이
- 단점
  1. 단순 API의 경우, 파일이 많아져 구조가 복잡해 보일 수 있음

### 📂 <a id="file-structure"></a> 파일 구조

```typescript
project-root/
├── src/
│   ├── api/                                    # API 관련 핵심 로직
│   │   ├── instance.js                         # Axios 인스턴스 설정 (BaseURL, Interceptor)
│   │   └── user/                               # 도메인별 폴더 (User, Order, Post 등)
│   │       ├── index.js                        # (Optional) Repository 외부 노출용
│   │       ├── userRepository.js               # API 호출 인터페이스 (컴포넌트나 pinia)
│   │       ├── userTransformer.js              # 데이터 가공 로직용 순수 함수, 유닛 테스트에 활용
│   │       └── user.types.js                   # (JSDoc 사용 시) 데이터 타입 정의
│   │
│   ├── mocks/                                  # MSW 설정 (가짜 서버)
│   │   ├── handlers/                           # 도메인별 API 모킹 핸들러
│   │   │   └── userHandlers.js
│   │   ├── browser.js                          # 브라우저용 MSW 설정
│   │   └── server.js                           # 노드(Vitest)용 MSW 설정
│   │
│   └── __tests__/                              # 테스트 파일 모음 (또는 소스 옆에 위치)
│       └── api/
│           └── user/
│               └── userRepository.test.js
│
├── vitest.config.js                            # Vitest 환경 설정 파일
├── vitest.setup.js                             # MSW 서버 실행 등 사전 설정
└── package.json
```

### 📝 <a id="detail"></a> 폴더 및 파일 상세 설명

**1. `src/api/user/`**

- 도메인 단위 관리용 폴더
- `userRepository.js`
  - 외부 호출 인터페이스(컴포넌트나 pinia)
- `userTransformer.js`
  - 서버 및 앱 데이터 맵핑용 함수 모음
  - 유닛 테스트 시 사용

**2. `src/mocks/`**

- MSW 관리용 폴더
- 테스트 환경에서 서버 역할
- `handlers/userHandlers.js`
  - 테스트 환경에 사용할 도메인별 가짜 응답 생성

**3. `vitest.setup.js`**

- vite를 사용하지 않고, 다른 번들러 기반 vitest를 가동 시 MSW 서버를 초기화 할 수 있게 세팅하는 파일
- `*.test.js`이 실행되기 전 자동으로 실행되는 파일

---

## 🛠️ <a id="init"></a> TDD 진행 시 axios 관련 초기 셋업 코드

### <a id="env-init"></a> 환경 설정

**`vitest.config.js`**

- 아래 코드는 vite 없이 vitest를 사용할 때 초기 셋업

  ```javascript
  // vitest.config.js
  import { defineConfig } from "vitest/config";
  import vue from '@vitejs/plugin-vue'

  export default defineConfig({
    plugins: [vue()]
    test: {
      // Node 환경에서 테스트를 실행 (Vanilla JS API 테스트에 적합)
      globals: true,
      environment: "node",
      // 위에서 만든 setup 파일의 경로를 지정
      setupFiles: ["./vitest.setup.js"],
    },
  });
  ```

**`vitest.setup.js`**

- 아래 코드는 모든 `*.test.js`이 실행되기 전 자동으로 실행되는 파일

  ```javascript
  // vitest.setup.js
  import { beforeAll, afterEach, afterAll } from "vitest";
  import { server } from "./src/mocks/server";

  // 1. 모든 테스트 시작 전: MSW 서버 가동
  beforeAll(() => {
    server.listen({ onUnhandledRequest: "error" });
    // 'error' 설정은 모킹하지 않은 API 호출 시 에러를 내뱉어 실수를 방지합니다.
  });

  // 2. 각 테스트 종료 후: 핸들러 초기화
  afterEach(() => {
    server.resetHandlers();
    // 테스트 하나가 끝날 때마다 설정된 임시 핸들러를 지워 테스트 간 독립성을 유지합니다.
  });

  // 3. 모든 테스트 종료 후: MSW 서버 종료
  afterAll(() => {
    server.close();
  });
  ```

&nbsp;

### <a id="msw-init"></a> MSW 초기 설정

**`server.js`**

- 아래 코드는 `src/mock/server.js` 파일로 위에 설정한 파일을 작동시키는 파일

  ```javascript
  // src/mocks/server.js
  import { setupServer } from "msw/node";
  import { handlers } from "./handlers"; // 도메인별 핸들러들을 모은 배열

  export const server = setupServer(...handlers);
  ```

  &nbsp;

### <a id="axios-init"></a> Axios 인스턴스 설정

- 아래 코드는 모든 Repo에서 사용하는 공통 에러 처리 로직과 인증 토큰 등을 관리하는 인스턴스

  ```javascript
  // src/api/instance.js
  import axios from "axios";

  const axiosInstance = axios.create({
    baseURL: "https://api.example.com", // 실제 서버 주소 (MSW가 이 주소를 가로챕니다)
    headers: {
      "Content-Type": "application/json",
    },
  });

  // 인터셉터 설정 (나중에 TDD로 하나씩 채워갈 부분입니다)
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error),
  );

  export default axiosInstance;
  ```

  &nbsp;

### Repository

- 아래 코드는 axios를 사용해 실제 통신을 담당하고 그 결과를 transformer로 넘기는 예제 코드

  ```javascript
  // src/api/user/userRepository.js
  import axiosInstance from "../instance";
  import { transformUser } from "./userTransformer";

  export const userRepository = {
    async getUser(id) {
      const { data } = await axiosInstance.get(`/users/${id}`);
      return transformUser(data);
    },
  };
  ```

  &nbsp;

### Data Transformer

- 아래 코드는 서버에서 들어오는 raw 데이터를 프론트에서 사용하기 좋게 가공하는 예제 코드

  ```javascript
  // src/api/user/userTransformer.js
  export const transformUser = (data) => {
    return {
      id: data.user_id,
      name: data.user_nm,
      email: data.email_addr,
      isAdmin: data.auth_lvl === "99",
    };
  };
  ```

  &nbsp;

### Axios Call in Component

- 아래 코드는 컴포넌트에서 axios 통신(설정한 Repo를 사용하여)을 통해 데이터를 가져오는 예제 코드

  ```javascript
  // src/components/user/UserList.vue
  <template>
    <div>
      <h1>User List</h1>
      <ul v-if="users.length">
        <li v-for="user in users" :key="user.id">
          {{ user.name }} ({{ user.email }})
        </li>
      </ul>
      <p v-else-if="loading">Loading...</p>
      <p v-else>No users found.</p>
    </div>
  </template>

  <script setup>
  import { ref, onMounted } from "vue";
  import { userRepository } from "@/api/user/userRepository";

  const users = ref([]);
  const loading = ref(false);

  const fetchUsers = async () => {
    loading.value = true;
    try {
      // Axios 직접 호출 대신 Repository 사용
      users.value = await userRepository.getUsers();
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchUsers();
  });
  </script>
  ```

  &nbsp;

### Axios Call in Pinia

- 아래 코드는 pinia에서 axios 통신(설정한 Repo를 사용하여)을 통해 데이터를 가져오는 예제 코드

  ```javascript
  // src/stores/user.js
  import { defineStore } from "pinia";
  import { userRepository } from "@/api/user/userRepository";

  export const useUserStore = defineStore("user", {
    state: () => ({ users: [] }),
    actions: {
      async loadUsers() {
        this.users = await userRepository.getUsers();
      },
    },
  });
  ```

---

### 📍 레이어 역할 및 TDD 비중

| 레이어 | 이름        | TDD에서 의미                            | 테스트 방식                    |
| ------ | ----------- | --------------------------------------- | ------------------------------ |
| Data   | Axios/MSW   | 도구. 가짜 데이터를 쏴주는 환경 설정    | MSW 핸들러 작성                |
| Logic  | Transformer | 핵심 타겟. 순수 로직 검증 (가장 중요)   | 단위 테스트 (Unit Test)        |
| Domain | Repository  | 연결 검증. API+Trans가 잘 섞였는지 확인 | 통합 테스트 (Integration Test) |
| UI     | Component   | 화면 검증. 유저에게 잘 보이는지 확인    | 컴포넌트 테스트                |
