<template>
  <div id="app">
    <router-view></router-view>
    <settings type="iiifstoryboard"></settings>
  </div>
</template>

<script>
import tagbuilder from './components/tagbuilder.vue'
import settings from './components/settings.vue'

export default {
  name: 'app',
  components: {
    tagbuilder,
    settings
  }
}
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
}
</style>
