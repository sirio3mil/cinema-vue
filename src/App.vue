<template>
  <div id="app">
    <TapeDetail />
  </div>
</template>

<script>
import TapeDetail from './components/TapeDetail.vue'

export default {
  name: 'app',
  components: {
    TapeDetail
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
