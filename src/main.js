import Vue from 'vue';
import VueHotkey from 'v-hotkey';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(VueHotkey);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
