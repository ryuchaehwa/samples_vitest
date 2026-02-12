# TDD를 위해 axios 패턴화를 진행한 뒤 통신하는 컴포넌트

- axios 통신을 컴포넌트 레벨에서 직접 진행하지 않음

## 패턴용 파일

### 😎 위 코드를 작성하기 위해 필요한 설정 및 패턴 파일

| 레이어               | 담당 파일          | 핵심 역할                                      |
| -------------------- | ------------------ | ---------------------------------------------- |
| UI 레이어            | UserList.vue       | 사용자와 상호작용, 데이터 보여주기 (user.name) |
| 도메인/데이터 레이어 | userRepository.js  | API 호출 명령, 변환기(Transformer) 호출        |
| 변환 레이어          | userTransformer.js | user_nm → name 같은 데이터 세척 (순수 함수)    |
| 네트워크 레이어      | instance.js        | Axios 설정, 공통 에러 핸들링, 세션 토큰 주입   |

### 📍 UI 레이어

```javascript

<template>
  <div class="user-container">
    <h2>사용자 관리</h2>

    <div v-if="loading">로딩 중...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <ul v-else>
      <li v-for="user in users" :key="user.id">
        <strong>{{ user.name }}</strong> ({{ user.email }})
        <span v-if="user.isAdmin" class="admin-tag">관리자</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// 2. Axios 대신 Repository만 임포트
import { userRepository } from '@/modules/api/userRepository';

const users = ref([]);
const loading = ref(false);
const error = ref(null);

const loadUsers = async () => {
  loading.value = true;
  try {
    // 3. 비즈니스 로직: 데이터 가져오기 (변환은 이미 Repository 내부에서 끝남)
    users.value = await userRepository.getUsers();
  } catch (err) {
    error.value = "데이터를 불러오는 중 오류가 발생했습니다.";
  } finally {
    loading.value = false;
  }
};

onMounted(loadUsers);
</script>
```

## 코드 설명

### 😎 axios 간접 통신 부분

`  users.value = await userRepository.getUsers();`

&nbsp;

### 📍 도메인/데이터 레이어

- 레포(Repository)
- 인스턴스 생

```javascript

// src/modules/api/userRepository.js
import axiosInstance from "./instance";
import { transformUser, transformUserList } from "./userTransformer";

export const userRepository = {
  // 컴포넌트는 이 함수만 부르면 끝!
  async getUsers() {
    try {
      const { data } = await axiosInstance.get("/users");
      // 획득한 날것의 데이터를 변환기로 세척해서 반환
      return transformUserList(data);
    } catch (error) {
      throw error; // 에러는 컴포넌트로 던져서 UI 처리
    }
  }화

  async getUserById(id) {
    const { data } = await axiosInstance.get(`/users/${id}`);
    return transformUser(data);
  },
};
```

&nbsp;

### 변환 레이어

- 트랜스포머 (Transformer)
- TDD 진행 시 가장 핵심이 되는 파일
- 서버에서 들어오는 raw 데이터를 프론트 개발에서 사용할 수 있게 형태 가공의 역할

```javascript
// src/modules/api/userTransformer.js

export const transformUser = (raw) => {
  if (!raw) return null;

  return {
    id: raw.user_id, // snake_case -> camelCase
    name: raw.user_nm, // user_nm -> name
    email: raw.email_addr,
    isAdmin: raw.auth_lvl === "99", // 비즈니스 로직: 등급 99는 관리자
    createdAt: raw.reg_dt ? new Date(raw.reg_dt) : null, // 날짜 객체화
  };
};

export const transformUserList = (rawList) => {
  return Array.isArray(rawList) ? rawList.map(transformUser) : [];
};
```

&nbsp;

### 네트워크 레이어 : 테스트용으로 인터셉터 방법 사용

- axios는 비지니스 로직별 처리 방법이 다르다.
- 관련 내용은 왼편에.

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
