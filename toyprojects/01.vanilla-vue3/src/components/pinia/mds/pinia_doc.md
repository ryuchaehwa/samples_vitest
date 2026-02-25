# Pinia TDD

## TDD를 위한 Pinia

### 🎶 목표

- `Actions`를 실행하고 `State`의 변화 감지
- 스토어 내부의 로직은 블랙박스 테스트
- 외부에서 보이는 결과값만 확인

### ✅ 개요

- Pinia를 테스트 할 때는 개별 store를 하나의 단위로 취급
  - `구현이 어떻게 되었는가`보다, `실질적 행위`를 테스트 해야 되기 때문
  - Pinia의 내부 로직을 어떻게 개발하였는가는 TDD 진행의 목적에 부합한다고 보기 어렵고, 내부 로컬 함수와 외부 컴포넌트에서 사용하는 결과값은 크게 관련 없음
  - 내부 로직이 어떠하든 결과가 중요하기 때문에 pinia의 경우, store를 하나의 단위로 취급하여 블랙박스 테스트로 진행
  - 만약 단위 테스트를 진행할 거라면 store로 진행하는 것이 아닌, util로 진행
    - 스토어 내부 로직 단위 테스트: 특정 도메인에 종속적이고 상태를 변경하는 로직은 store action 테스트로 통합 진행
    - 스토어 내부 순수 함수 테스트: 복잡한 계산식, 날짜 포맷팅 등 상태와 무관하게 입력값 대비 출력값이 일정한 로직 -> 별도 utils.ts로 분리해서 독립적인 단위 테스트 진행

### 📍 테스트 과정

1. 초기화 및 설정

   - 스토어를 초기화 하고
   - 모킹에 필요한 툴(MSW등)을 준비 및 설정

2. `Actions` 호출

3. `state`나 `getters`의 변경된 상태 확인

### 📂 폴더 구조

- 도메인 중심 구조

```text
src/
├── stores/
│   ├── user/
│   │   ├── user.ts          # 스토어 정의
│   │   ├── user.spec.ts     # TDD 테스트 코드 (Vitest)
│   │   └── user.type.ts     # 타입 정의
├── api/
│   └── user.ts              # Axios 인스턴스 및 호출 함수
└── tests/
    └── setup.ts             # Vitest 전역 설정 (MSW 연결 등)
```

### ⁉️ Pinia? or Composable?

| 항목      | 컴포저블 Composable                   | 피니아 Pinia            |
| --------- | ------------------------------------- | ----------------------- |
| 생명주기  | 일회                                  | 영구                    |
| 상태 공유 | 독립                                  | 싱글톤                  |
| 목적      | 로직의 재사용 및 컴포넌트 비대화 방지 | 데이터 중아관리 및 공유 |

### Pinia 및 Composable 사용 시 Axios 패턴 변경 사항

- 기존 axios 파트에 작성한 부분은 axios만 단독으로 스터디한 것으로 pinia와 composable을 사용한다면 패턴 중 데이터처리 부분이 변경되어야 한다.
- 변경사항
  - 기존 axios의 Repo를 작성할 때 불렀던 trans 코드를 pinia나 composable에서 부른다.
  - 이는 네트워크 연결 부분과 데이터 트랜스포밍 부분을 완전히 분리시켜 비지니스 로직의 처리를 실제 pinia나 composable에서 진행하도록 변경하여, TDD를 진행할 때 네트워크 단의 테스트를 좀 더 용이하게 한다.

**axios 코드 스터디 부분**

```javascript
// src/api/user.repo.js
import instance from "../instance.js";
import { transformUserList, transformUser } from "./user.trans";

export const userRepository = {
  // 1. 목록 조회 (배열 변환기 사용)
  async getUsers() {
    try {
      console.log("1단계: Repository에서 API 호출");

      const response = await instance.get(
        "https://jsonplaceholder.typicode.com/users",
      );
      return transformUserList(data);
      // return response;
    } catch (e) {
      console.log("2/3단계 에러", e);
      errorHandling(e.response?.status);
      throw e;
    }
  },
};
```

&nbsp;

**pinia나 composable 사용시**

```javascript
// src/api/user.repo.js
import instance from "../instance.js";

export const userRepository = {
  // 1. 목록 조회 (배열 변환기 사용)
  async getUsers() {
    try {
      console.log("1단계: Repository에서 API 호출");

      const response = await instance.get(
        "https://jsonplaceholder.typicode.com/users",
      );

      return response; // # 그대로 리턴
    } catch (e) {
      console.log("2/3단계 에러", e);
      errorHandling(e.response?.status);
      throw e;
    }
  },
};

// src/composable/user/useUserList.js
import { ref } from "vue";
import { userRepository } from "@/api/user/user.repo";
import { transformUserList } from "@/api/user/user.trans";

export function useUserList() {
  const user = ref(null);
  const users = ref(null);
  const isLoading = ref(false);

  const loadUser = async () => {
    console.log("composable: loadUser");
    isLoading.value = true;
    try {
      const { data } = await userRepository.getUsers();
      console.log("-data", data);
      users.value = transformUserList(data); // 여기서 Trans 호출
    } finally {
      isLoading.value = false;
    }
  };

  return { users, isLoading, loadUser };
}
```

### ⁉️ 클로드 코드 표준화 진행 시 유의사항

- `이 Action을 실행했을 때 이런 State가 되어야 한다는 명세를 작성해줘` 등의 검증 영역을 명확히 할 것.
