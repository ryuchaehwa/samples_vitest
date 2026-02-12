### 네트워크 레이어 (제어권에 따른 3가지 개발 방법)

- 실제 axios 통신을 하는 파일
- 모든 api의 요청, 공통 설정, 세션, 에러 핸들링 등의 처리 부분

**1. 인터셉터(interceptors(통신 가로채기)) 사용**

- 목적
  - 전역 로직 자동화
- 방법
  - 모든 요청과 응답을 가로채 로직 주입
- 장점
  - 초기 설정해두면 비지니스 로직이 바뀌지 않는 이상 굳이 추가 변경 필요 없음
- 단점
  - 특정 api 예외처리, 비지니스 로직 추척(디버깅)이 어려움
- 언제 사용
  - 모든 API의 인증 규칙, 에러 핸들링 등의 처리가 동일할 때

```javascript
// src/modules/api/instance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.example.com",
  timeout: 5000,
});

// [요청 인터셉터] 세션 토큰 자동 주입
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("user_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// [응답 인터셉터] 공통 에러 핸들링 (401 등)
axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      console.error("세션 만료 - 로그인 페이지로 이동");
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
```

&nbsp;

**2. 랩퍼(Wrapper(감싸기)) 방식**

- 목적
  - 명시적인 데이터 흐름 파악과 유연한 커스텀 에러 핸들링
- 방법
  - axios를 직접 부르지 않고, 함수화해서(감싸서) 사용
- 장점
  - 직관적인 코드
  - 특정 API 호출 시에만 특별한 옵션을 주거나 로깅을 하기 매우 쉬움
- 단점
  - 매번 axios 대신 이 래퍼 함수를 임포트해서 써야 하며, 수동적인 느낌이 강함
- 언제 사용
  - API마다 에러 처리 방식이 제각각이거나, 네트워크 요청 전후에 복잡한 로직이 필요한 경우

```javascript
// apiClient.js
const instance = axios.create({ baseURL: "/api" });

export const apiRequest = async (config) => {
  // 1. 요청 전 명시적으로 토큰 주입
  const token = localStorage.getItem("token");
  const finalConfig = {
    ...config,
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const response = await instance(finalConfig);
    return response.data;
  } catch (error) {
    // 2. 에러 핸들링 로직이 눈에 보임
    if (error.response?.status === 401) goToLogin();
    throw error;
  }
};

// userRepository.js
import { apiRequest } from "./apiClient";

export const userRepository = {
  async getUsers() {
    const data = await apiRequest({ method: "get", url: "/users" });
    return transformUserList(data);
  },
};
```

&nbsp;

**3. 기본 레포(Base Repo(상속)) 방식**

- 목적
  - 데이터 레이어 간의 강한 규격화와 코드 재사용성 극대화
- 방법
  - 공통 기능을 부모 클래스에 담고, 각 도메인 Repository가 이를 물려받는 OOP 방식
- 장점
  - 상속을 통해 this.get(), this.post() 처럼 깔끔하게 사용 가능. 확장성이 매우 높음
- 단점
  - 자바스크립트/타입스크립트의 클래스 문법에 익숙해야 하며, 구조가 다소 무거워질 수 있음
- 언제 사용
  - 대규모 프로젝트에서 Repository 간의 공통 메서드(로그 저장, 캐싱 등)가 많을 때

```javascript
// BaseRepository.js
export class BaseRepository {
  constructor() {
    this.client = axios.create({ baseURL: "/api" });
  }

  async request(config) {
    try {
      const token = localStorage.getItem("token");
      const response = await this.client({
        ...config,
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) goToLogin();
      throw error;
    }
  }
}

// userRepository.js
import { BaseRepository } from "./BaseRepository";

class UserRepository extends BaseRepository {
  async getUsers() {
    const data = await this.request({ method: "get", url: "/users" });
    return transformUserList(data);
  }
}
export const userRepository = new UserRepository();
```
