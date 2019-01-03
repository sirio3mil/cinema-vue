<template>
  <div id="app">
    <MainSearch />
  </div>
</template>

<script>
import MainSearch from './components/MainSearch.vue'

export default {
  name: 'app',
  components: {
    MainSearch: MainSearch
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
