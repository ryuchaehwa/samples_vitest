<script setup>
import { onBeforeMount, ref} from 'vue';
import * as MarkdownIt from 'markdown-it';
import mdFile from '../mds/axiosdoc.md'
import 'github-markdown-css/github-markdown-light.css'; 
import Prism from 'prismjs'
import 'prismjs/themes/prism.css';
import anchor from 'markdown-it-anchor';

// 언어 설정 (필요시)
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';
import AxiosStudy from './AxiosStudy.vue';

const md = new (MarkdownIt.default || MarkdownIt)({
  linkify: true,
  typographer: true,
  html: true,
  highlight: function (str, lang) {
    // JavaScript인 경우에만 Prism 적용
    if (lang === 'javascript' || lang === 'js') {
      try {
        return `<pre class="language-javascript"><code>${
          Prism.highlight(str, Prism.languages.javascript, 'javascript')
        }</code></pre>`;
      } catch (__) {}
    }
    // 그 외 언어는 인코딩만 해서 반환 (기본값)
    return `<pre class="language-${lang}"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  }
});

md.use(anchor, {
  permalink: false, // 제목 옆에 링크 아이콘을 표시할지 여부
  slugify: (s) => s.trim().toLowerCase().replace(/\s+/g, '-') // ID 생성 규칙 (공백을 -로)
});

const context = md.render(mdFile)
const convertedToHtml =ref('')

onBeforeMount(async () => {
  convertedToHtml.value = context
}) 
</script>

<template>
  <div class="views-main">
    <h1>Axios 네트워크를 모킹해봅시다. 현재 컴포넌트 (AxiosMocking.vue)</h1>
    <h2>모킹 전(TDD 전), 선 작업(기존 프로젝트의 경우 리팩토링 혹은 신규인 경우 패턴에 맞게 개발)</h2>
    <div>(필수 아닌 필수. 만약 개별 컴포넌트 단위에서 axios를 부른다면, 차후 TDD 작업 시 모킹지옥이 펼쳐지거나, 테스트 코드가 터질 위험성이 있음.
      물론, 클로드 코드같은 어시스턴트를 사용하면 큰 문제는 없을 수 있으나, 이 역시 프로젝트 규모가 큰 경우엔 ... 좀 터지는게 많지 않을까요? 핫핫핫! )</div>
      <div class="markdown-body axios-body-frame" >
      <div v-html="convertedToHtml" ></div>
      <div>
        <h3>현재 학습중인 axios 패턴의 시각화 자료(google gemini)</h3>
        <img src="../../../assets/imgs/axios.png" alt="">
        <hr />
        <h3>패턴 단순 시각화(직접 제작)</h3> 
        <img src="../../../assets/imgs/axios_vi.png" alt="">
        <h3>axios 흐름도(직접 제작)</h3>
        <img src="../../../assets/imgs/axiosflow.png" alt="">
            <AxiosStudy></AxiosStudy>
      </div> 
    </div>
    </div>
</template>

<style>
h1, h2 {
  text-align: center;
}

 .axios-body-frame {
  display: flex;
  justify-content: center;
  margin: 20px 0 0 0
}

 .axios-body-frame div {
  /* width: 50%; */
 }

 .axios-body-frame div:nth-child(1) {
  padding: 0 20px 0 0
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

.toc-wrapper {
  width: 250px;
  flex-shrink: 0;
  display: none; /* 모바일에서는 숨기기 */
}

@media (min-width: 1024px) {
  .toc-wrapper {
    display: block;
  }
}

.toc {
  position: sticky;
  top: 40px; /* 화면 상단에서 40px 떨어진 곳에 고정 */
  max-height: calc(100vh - 80px);
  overflow-y: auto;
  padding-left: 10px;
  border-left: 2px solid #eee;
}

.toc ul {
  list-style: none;
  padding: 0;
}

.toc li {
  margin-bottom: 12px;
}

.toc a {
  text-decoration: none;
  color: #666;
  font-size: 0.9rem;
  transition: color 0.2s;
}

.toc a:hover {
  color: #0366d6; /* 깃허브 블루 */
}

/* 현재 보고 있는 항목 스타일 */
.toc li.is-active a {
  color: #0366d6;
  font-weight: bold; /* 굵기 변환 */
}

.toc li.is-active {
  border-left: 2px solid #0366d6; /* 왼쪽에 강조 선 추가 */
  margin-left: -12px;
  padding-left: 10px;
}

.toc a {
  text-decoration: none;
  color: #666;
  font-size: 14px;
}
</style>