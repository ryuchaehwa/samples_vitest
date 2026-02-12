# 컴포넌트에서 직접 axios 통신 하는 경우

- 특이사항 및 제약사항이 없는 경우 많이 쓰는 개발 방법

## 패턴용 파일

### 😎 위 코드를 작성하기 위해 필요한 설정 및 패턴 파일

- 없음
- 개별 컴포넌트에서 axios 통신을 할 때는, 인터셉터 등의 처리가 필요하지 않는 이상 추가로 개발해야 하는 파일이 없음

### 📍 UserList.vue 컴포넌트

```javascript

<template>
  <div>
    <h1>사용자 목록 (기본 방식)</h1>

    <ul v-if="users.length">
      <li v-for="user in users" :key="user.user_id">
        {{ user.user_nm }} ({{ user.email_addr }})
      </li>
    </ul>
    <p v-else>데이터가 없습니다.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
// 1. axios를 직접 임포
import axios from "axios";

const users = ref([]);

const fetchUsers = async () => {
  try {
    // 2. 컴포넌트 안에서 직접 URL과 옵션을 넣고 호출
    const response = await axios.get("https://api.example.com/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    // 3. 서버에서 온 데이터(response.data)를 그대로 상태에 저장
    users.value = response.data;
  } catch (error) {
    console.error("에러 발생:", error);
    alert("데이터를 가져오지 못했습니다.");
  }
};

onMounted(() => {
  fetchUsers();
});
</script>
```

## 코드 설명

### 😎 axios 직접 통신 부분

`const response = await axios.get("https://api.example.com/users", {...}`

---
