<script setup>
import { onBeforeMount, ref } from 'vue';
import { md } from '@/modules/mdModule'
import piniaDoc from './mds/pinia_doc.md'
import 'github-markdown-css/github-markdown-light.css'; 
import UserListComposable from './contents/UserListComposable.vue';
import UserListPinia from './contents/UserListPinia.vue';

const context = md.render(piniaDoc)
const convertedToHtml = ref('')

onBeforeMount(async () => {
    convertedToHtml.value = context
})
</script>

<template>
    <div class="views-main">
        <div class="markdown-body axios-body-frame">
            <div style="width: 50%" v-html="convertedToHtml" ></div>
            <div style="width: 50%">
                <h1>composable을 활용한 사용자 목록</h1>
                <UserListComposable></UserListComposable>

                <h1>pinia를 활용한 사용자목록</h1>
                <UserListPinia></UserListPinia>
                <img src="../../assets/imgs/axios_pinia_tdd.jpg" alt="">
            </div>
        </div>
    </div>
</template>