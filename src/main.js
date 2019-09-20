import Vue from 'vue'
import App from './App.vue'
import VueClipboards from 'vue-clipboards';

Vue.use(VueClipboards);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
