<template>
<div class="btn-box">
    <router-link to="/axios/all">
  <button class="intro-btn" >전체 정리 문서 보기</button>
  </router-link>  

  <router-link to="/axios/comparison">
      <button class="intro-btn intro-btn-center" >axios 패턴 적용 전/후 코드 비교 보기</button>
    </router-link>

    <router-link to="/axios/tdd">
        <button class="intro-btn" >TDD 관련 코드 예제만 보기</button>
    </router-link>
</div>
<router-view></router-view>
</template>


<style>
.btn-box {
  height: calc(100vh - 280px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.intro-btn {
  height: 150px;
  width: 500px;
  background-color: #f4f4f4;
  border: none;
  font-size: 30px;
  border-radius: 150px;
}

.intro-btn:hover {
  background-color: #ddd;
  cursor: pointer;
}

.intro-btn-center {
margin: 0 40px
}
</style>