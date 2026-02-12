<template>
    <div class="header">
    <div class="gnb-header">
        <div class="gnb-header-item" v-for="menu in menus" :key="menu.key" @click="changeTo(menu.key)">{{ menu.name }}</div>
    </div>
        </div>
</template>

<script setup>
import { ref } from 'vue'
import { router } from '@/router'

// LINK
const menus = ref([{ name: 'Axios', key: 'axios' }, { name: 'Inheritance', key: 'inheritance' }, { name: 'Pinia', key: 'pinia' }, {name: 'Vue-Router', key: 'router'}])

/** routing */
const changeTo = (name) => {
   router.push(`/${name}`) 
}
</script>

<style>
.header {
    position:fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 9999; 
}

.gnb-header {
    background-color: #f4f4f4;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    height: 80px;
    border-bottom: 1px solid #ddd;
}

.gnb-header-item:nth-child(even) {
    margin: 0 30px;
}

.gnb-header-item:hover {
    color: red;
 
    cursor: pointer;
}
</style>