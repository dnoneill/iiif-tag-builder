<template>
  <div id="app">
    <tagbuilder apiurl="/saveannonaview"></tagbuilder>
  </div>
</template>

<script>
import tagbuilder from './components/tagbuilder.vue'
export default {
  name: 'flaskapp',
  components: {
    tagbuilder
  }
}
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0px;
  padding: 0px;
}
</style>
