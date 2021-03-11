import Vue from 'vue'
import App from './App.vue'
import FlaskApp from './FlaskApp.vue'
import VueRouter from 'vue-router'
import tagbuilder from './components/tagbuilder.vue'
import index from './components/index.vue'

import VueClipboards from 'vue-clipboards';
import VueTippy, { TippyComponent } from "vue-tippy";

Vue.use(VueTippy);
Vue.component("tippy", TippyComponent);

Vue.use(VueRouter)
Vue.use(VueClipboards);

Vue.config.productionTip = false

var routes = [
  { path: '/', component: index, 'name': 'index'},
  { path: '/tag-builder', component: tagbuilder, 'name': 'tagbuilder', 'title': 'Tag Builder', 'blurb': 'The Tag Builder is a user interface for creating tags to be used with this library. It provides a more user friendly way of implementing settings.'},
  { path: '/display', component: tagbuilder, 'name': 'display', 'title': 'Display Annona items', 'blurb': 'Static URL to display Annona views'}
]
if (process.env.NODE_ENV == 'flask'){
  routes = [
    { path: '/annonaview', component: tagbuilder, 'name': 'tagbuilder', 'title': 'Tag Builder', 'blurb': 'The Tag Builder is a user interface for creating tags to be used with this library. It provides a more user friendly way of implementing settings.'},
  ]
}

const router = new VueRouter({
  base: process.env['BASE_URL'],
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