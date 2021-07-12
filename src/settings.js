
import Vue from 'vue'
import settings from './components/settings.vue'

import "@babel/polyfill";
import 'document-register-element/build/document-register-element';

import vueCustomElement from 'vue-custom-element'
Vue.use(vueCustomElement);
Vue.customElement('annona-settings', settings);