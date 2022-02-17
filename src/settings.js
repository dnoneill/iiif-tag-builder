
import Vue from 'vue'
import settings from './components/settings.vue'

import "@babel/polyfill";

import vueCustomElement from 'vue-custom-element'
Vue.use(vueCustomElement);
Vue.customElement('annona-settings', settings);