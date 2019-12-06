import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import tagbuilder from './components/tagbuilder.vue'
import annotationeditor from './components/annotationeditor.vue'
import index from './components/index.vue'

import VueClipboards from 'vue-clipboards';


Vue.use(VueRouter)
Vue.use(VueClipboards);

Vue.config.productionTip = false

const routes = [
  { path: '/', component: index, 'name': 'index'},
  { path: '/tag-builder', component: tagbuilder, 'name': 'Tag Builder', 'blurb': 'The Tag Builder is a user interface for creating tags to be used with this library. It provides a more user friendly way of implementing settings.'},
  { path: '/annotationeditor', component: annotationeditor, 'name': 'Annotation Editor', 'blurb': 'The Annotation Editor is currently in development. It provides a user friendly for editing annotations with fields like rights. If there are things you would like to see implemented in this viewer please open an issue in the GitHub repo.'}
]

const router = new VueRouter({
  routes // short for `routes: routes`
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
