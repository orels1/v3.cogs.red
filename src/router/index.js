import Vue from 'vue';
import Router from 'vue-router';
import Cogs from '@/components/Cogs';
import About from '@/components/pages/About';
import CogPage from '@/components/pages/CogPage';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Cogs',
      component: Cogs,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    {
      path: '/:user/:repo/:cog',
      name: 'CogPage',
      component: CogPage,
    },
  ],
});
