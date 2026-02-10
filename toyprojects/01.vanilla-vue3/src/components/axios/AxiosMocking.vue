<script setup>

import axios from 'axios';
import { onBeforeMount, ref } from 'vue';
import * as MarkdownIt from 'markdown-it';
import mdFile from './axios.md'
import 'github-markdown-css/github-markdown-light.css'; 

const md = new (MarkdownIt.default || MarkdownIt)();
const context = md.render(mdFile)
const convertedToHtml =ref('')

onBeforeMount(async () => {
  convertedToHtml.value = context
  await getFakeRestApi()
}) 

// AXIOS
// BEFORE_TDD: 
const getFakeRestApi = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/')
     console.log('response', response)
    if (response.status === 200) {
      
    }
  } catch (e) {
      console.error(e)      
    }
  }
</script>

<template>
  <div class="views-main">
    <div>Axios 네트워크를 모킹해봅시다. 현재 컴포넌트 (AxiosMocking.vue)</div>
    <div class="markdown-body" v-html="convertedToHtml"></div>
    </div>
</template>

<style>

</style>