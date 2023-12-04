<template>
  <div id="app">
    <tagbuilder apiurl="/saveannonaview" collectionurl="/createcollections"></tagbuilder>
  </div>
</template>

<script>
import tagbuilder from './components/tagbuilder2.vue'
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
