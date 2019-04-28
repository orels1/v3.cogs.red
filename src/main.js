import Vue from 'vue';
import VueHotkey from 'v-hotkey';
import VueMarkdown from 'vue-markdown';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faPaste,
  faAngleRight,
  faTags,
  faCommentAltExclamation,
  faSpinnerThird,
  faUser,
  faCaretDown,
  faCheck,
  faTimes,
  faRandom,
} from '@fortawesome/pro-light-svg-icons';
import App from './App';
import router from './router';
import store from './store';
import './registerServiceWorker';

library.add(
  faPaste,
  faAngleRight,
  faTags,
  faCommentAltExclamation,
  faSpinnerThird,
  faUser,
  faCaretDown,
  faCheck,
  faTimes,
  faRandom,
);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('vue-markdown', VueMarkdown);

Vue.config.productionTip = false;

Vue.use(VueHotkey);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
