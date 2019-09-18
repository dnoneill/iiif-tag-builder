<template>
  <div id="app">
    <tagbuilder/>
  </div>
</template>

<script>
import tagbuilder from './components/tagbuilder.vue'

export default {
  name: 'app',
  components: {
    tagbuilder
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
