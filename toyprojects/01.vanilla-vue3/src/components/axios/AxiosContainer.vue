<template>
<div class="btn-box">
    <router-link to="/axios/all">
  <button class="intro-btn" >전체 문서 보기</button>
  </router-link>  
  <router-link to="/axios/comparison">
      <button class="intro-btn intro-btn-center" >axios 패턴 적용 전/후 코드 비교 보기</button>
    </router-link>
    <router-link to="/axios/tdd">
        <button class="intro-btn intro-btn-center" >TDD 관련 코드 예제만 보기</button>
    </router-link>
    
</div>
<hr />
  <div style="margin: 40px 0 0 0;">
    <AxiosTdd></AxiosTdd>
  </div>
</template>

<script setup>
import AxiosTdd from './AxiosTdd.vue';
</script>

<style>
.btn-box {
  /* height: calc(100vh - 280px); */
  display: flex;
  margin: 100px 0 20px 0;
  justify-content: center;
  /* align-items: center; */
}

.intro-btn {
  height: 100px;
  width: 350px;
  background-color: #f4f4f4;
  border: none;
  font-size: 20px;
  border-radius: 150px;
  border: 1px solid #ddd
}

.intro-btn:hover {
  background-color: #ddd;
  cursor: pointer;
}

.intro-btn-center {
margin: 0 0 0 40px
}
</style>