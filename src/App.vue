<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import tagbuilder from './components/tagbuilder.vue'
import annotationeditor from './components/annotationeditor.vue'

export default {
  name: 'app',
  components: {
    tagbuilder,
    annotationeditor
  }
}
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
}
</style>
