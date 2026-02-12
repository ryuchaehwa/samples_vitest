<script setup>
import { onBeforeMount, ref } from 'vue';
import axioscomparisonMd from '../mds/axioscomparison.md'
import axiosComparisonNew from '../mds/axios_comparison_new.md'
import axiosComparisonOld from '../mds/axios_comparison_old.md'
import axiosComparisonNetwork from '../mds/axios_comparison_network.md'
import { md } from '@/modules/mdModule';

const context = md.render(axioscomparisonMd)
const convertedToHtml = ref('')

const oldSampleCode = md.render(axiosComparisonOld)
const oldSampleCodeToHtml = ref('')

const newSampleCode = md.render(axiosComparisonNew)
const newSampleCodeToHtml = ref('')

const networkSampleCode = md.render(axiosComparisonNetwork)
const networkSampleCodeToHtml = ref('')

onBeforeMount(async () => {
    convertedToHtml.value = context
    oldSampleCodeToHtml.value = oldSampleCode
    newSampleCodeToHtml.value = newSampleCode
    networkSampleCodeToHtml.value = networkSampleCode
})
</script>

<template>
    <div class="views-main">
        <div class="d-f">
            <div >
                <div class="markdown-body" v-html="oldSampleCodeToHtml"></div>
                
                <h1>TDD를 위법 axios 패턴화 중 네트워크 개발 방법</h1>
                <div class="markdown-body" v-html="networkSampleCodeToHtml"></div>
            </div>
            <div class="markdown-body" v-html="newSampleCodeToHtml"></div>
        </div>
        <!-- <div class="markdown-body " v-html="convertedToHtml" style="width: 50%"></div> -->
    </div>
</template>

<style>
.d-f {
    display: flex;
    justify-content: center;
}

/* 1. 전체 마크다운 본문 스타일 (글꼴, 글자 크기) */
.markdown-body {
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
  font-size: 16px; /* 기본 글자 크기 */
  line-height: 1.6 #ffffff; /* 전체 배경색 */
  padding: 45px;
}

/* 2. 코드 블록 배경색 및 폰트 크기 조정 (JS 포함 모든 코드) */
.markdown-body pre,
.markdown-body pre.language-javascript  {
  background-color: #f6f8fa !important; /* 코드 블록 배경 (연한 회색) */
  font-size: 14px !important; /* 코드 글자 크기 */
  border-radius: 8px;
  border: 1px solid #d0d7de;
}

</style>