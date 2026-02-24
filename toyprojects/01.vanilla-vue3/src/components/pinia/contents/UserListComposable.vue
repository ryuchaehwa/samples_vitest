<script setup>

import { useUserList } from '@/composable/user/useUserList';
import { onBeforeMount } from 'vue';

const {users , loadUser} = useUserList()

onBeforeMount(async () => {
await loadUser()
})
</script>

<template>
<table>
    <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.address }}</td>
    </tr>
</table>
</template>