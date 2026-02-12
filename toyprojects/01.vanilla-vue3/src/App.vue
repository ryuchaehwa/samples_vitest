<script>
export default {
  component: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body {
  padding: 0 !important;
  margin: 0 !important
}

.views-main {
  padding: 40px 80px;
}
</style>

<template>
<div>
    <router-view></router-view>
  </div>
</template>
