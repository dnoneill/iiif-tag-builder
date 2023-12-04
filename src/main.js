import Vue from 'vue'
import App from './App.vue'
import FlaskApp from './FlaskApp.vue'

import VueRouter from 'vue-router'
import tagbuilder from './components/tagbuilder2.vue'

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
  { path: '/display', component: tagbuilder, alias: '/display', 'name': 'display', 'title': 'Display Annona items', 'blurb': 'Static URL to display Annona views'},
  { path: '/tag-builder', component: tagbuilder, 'name': 'tagbuilder', 'title': 'Tag Builder', 'blurb': 'The Tag Builder is a user interface for creating tags to be used with this library. It provides a more user friendly way of implementing settings.'}
]
if (process.env.NODE_ENV == 'flask'){
  routes = [
    { path: '/annonaview', component: tagbuilder, 'name': 'tagbuilder', 'title': 'Tag Builder', 'blurb': 'The Tag Builder is a user interface for creating tags to be used with this library. It provides a more user friendly way of implementing settings.'},
  ]
}

var router = new VueRouter({
  base: process.env['BASE_URL'],
  //mode: 'history',
  routes // short for `routes: routes`
})

if (process.env.NODE_ENV == 'flask'){
  router = new VueRouter({
    base: process.env['BASE_URL'],
    mode: 'history',
    routes // short for `routes: routes`
  })
  new Vue({
    render: h => h(FlaskApp),
    router
  }).$mount('#app')
  // Vue.mixin({router});
  // Vue.use(vueCustomElement);
  // Vue.customElement('annona-tagbuilder', tagbuilder);
} else {
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
}