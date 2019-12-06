<template>
<div>
<div v-for="item in items" v-if="item.path != '/'">
    <router-link :to="item.path">
        {{item.name}}
    </router-link>
    <p>{{item.blurb}}</p>
  </div>
  </div>
</template>
<script>
export default {
  created() {
    this.$router.options.routes.forEach(route => {
      this.items.push({
        name: route.title,
        path: route.path,
        blurb: route.blurb
      })
    })
  },
  data() {
    return {
      items: []
    }
  }
}
</script>
