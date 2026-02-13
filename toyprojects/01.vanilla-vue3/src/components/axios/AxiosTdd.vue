<template>
    <div style="margin: 0 100px">
        <h2>실제 TDD를 위한 axios 패턴 적용 컴포넌트 AxiosTdd.vue의 결과화면</h2>
        <h2>
            F12 누르셔서 콘솔 확인해보세요.
        </h2> 
        
        <ul>
            <li>사용한 fake API: https://jsonplaceholder.typicode.com/</li>
        </ul>
       
        <table style="margin: 20px 0 0 0">
            <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.address }}</td>
            </tr>
        </table>
    </div>
</template>

<script setup>
import { onBeforeMount , ref} from 'vue';
import { userRepository } from '@/api/user/user.repo';

const users = ref([])

onBeforeMount(() => {
    loadUsers()
})

const loadUsers = async () => {
  try {
    // Repository에게 요청만 하면, 위 1~3단계를 거친 예쁜 데이터가 옵니다.
    const userList = await userRepository.getUsers();
    console.log('5단계: 컴포넌트에서 깨끗한 데이터 수신', userList);
     users.value = userList
    
  } catch (err) {
    console.error('오류 발생');
  }
};
</script>