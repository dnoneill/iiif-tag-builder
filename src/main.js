import Vue from 'vue'
import App from './App.vue'
import FlaskApp from './FlaskApp.vue'
import VueRouter from 'vue-router'
import tagbuilder from './components/tagbuilder.vue'
import annotationeditor from './components/annotationeditor.vue'
import index from './components/index.vue'

import VueClipboards from 'vue-clipboards';

Vue.use(VueRouter)
Vue.use(VueClipboards);

Vue.config.productionTip = false

var routes = [
  { path: '/', component: index, 'name': 'index'},
  { path: '/tag-builder', component: tagbuilder, 'name': 'tagbuilder', 'title': 'Tag Builder', 'blurb': 'The Tag Builder is a user interface for creating tags to be used with this library. It provides a more user friendly way of implementing settings.'},
  { path: '/annotationeditor', component: annotationeditor, 'name': 'annotationeditor', 'title': 'Annotation Editor', 'blurb': 'The Annotation Editor is currently in development. It provides a user friendly for editing annotations with fields like rights. If there are things you would like to see implemented in this viewer please open an issue in the GitHub repo.'}
]
if (process.env.NODE_ENV == 'flask'){
  routes = [
    { path: process.env.BASE_URL + '/annonaview', component: tagbuilder, 'name': 'tagbuilder', 'title': 'Tag Builder', 'blurb': 'The Tag Builder is a user interface for creating tags to be used with this library. It provides a more user friendly way of implementing settings.'},
  ]
}

console.log(routes)
const router = new VueRouter({
  mode: 'history',
  routes // short for `routes: routes`
})

if (process.env.NODE_ENV == 'flask'){
  new Vue({
    render: h => h(FlaskApp),
    router
  }).$mount('#app')
} else {
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
}