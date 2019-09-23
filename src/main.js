import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import tagbuilder from './components/tagbuilder.vue'
import VueClipboards from 'vue-clipboards';

Vue.use(VueRouter)
Vue.use(VueClipboards);

Vue.config.productionTip = false

const routes = [
  { path: '/', component: tagbuilder, 'name': 'tagbuilder'}
]

const router = new VueRouter({
  routes // short for `routes: routes`
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
