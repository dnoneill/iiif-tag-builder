import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import tagbuilder from './components/tagbuilder2.vue'
import '@ungap/custom-elements'

import index from './components/index.vue'
import vueCustomElement from 'vue-custom-element'
import VueClipboards from 'vue-clipboards';
import VueTippy, { TippyComponent } from "vue-tippy";
Vue.use(VueTippy);
Vue.component("tippy", TippyComponent);

Vue.use(VueRouter)
Vue.use(VueClipboards);

Vue.config.productionTip = false

const routes = [
{ path: '/annonaview', component: tagbuilder, 'name': 'tagbuilder', 'title': 'Tag Builder', 'blurb': 'The Tag Builder is a user interface for creating tags to be used with this library. It provides a more user friendly way of implementing settings.'},
]

const router = new VueRouter({
    base: process.env['BASE_URL'],
    mode: 'history',
    routes // short for `routes: routes`
})
Vue.mixin({router});
// Vue.use(vueCustomElement);
// Vue.customElement('annona-tagbuilder', tagbuilder);