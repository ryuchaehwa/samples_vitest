<script setup>
import { onBeforeMount, ref } from 'vue';
import { md } from '@/modules/mdModule'
import axiosStudyMd from '../mds/axios_study.md'
import 'github-markdown-css/github-markdown-light.css'; 

const context = md.render(axiosStudyMd)
const convertedToHtml = ref('')

onBeforeMount(async () => {
  convertedToHtml.value = context
})

</script>


<template>
  <div class="views-main" >
    <div v-html="convertedToHtml" class="markdown-body" ></div>
  </div>
</template>