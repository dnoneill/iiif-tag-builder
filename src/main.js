import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import tagbuilder from './components/tagbuilder.vue'
import settings from './components/settings.vue'

import index from './components/index.vue'
import 'document-register-element/build/document-register-element';
import vueCustomElement from 'vue-custom-element'
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
  Vue.mixin({router});
  Vue.use(vueCustomElement);
  Vue.customElement('annona-tagbuilder', tagbuilder);
} else {
new Vue({
  render: h => h(App),
  mode: 'history',
  routes
})
Vue.mixin({router});
Vue.use(vueCustomElement);
Vue.customElement('annona-settings', settings);
}