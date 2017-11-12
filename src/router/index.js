import Vue from 'vue';
import Router from 'vue-router';
import Cogs from '@/components/Cogs';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Cogs',
      component: Cogs,
    },
  ],
});
