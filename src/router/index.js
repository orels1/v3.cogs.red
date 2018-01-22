import Vue from 'vue';
import Router from 'vue-router';
import Cogs from '@/components/Cogs';
import About from '@/components/pages/About';
import CogPage from '@/components/pages/CogPage';
import RepoPage from '@/components/pages/RepoPage';

Vue.use(Router);

const router = new Router({
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
      path: '/cogs/:user/:repo',
      name: 'RepoPage',
      component: RepoPage,
      meta: {
        title: route => `${route.params.repo} by ${route.params.user} | v3.cogs.red`,
      },
    },
    {
      path: '/cogs/:user/:repo/:cog',
      name: 'CogPage',
      component: CogPage,
      meta: {
        title: route => `${route.params.cog} by ${route.params.user} | v3.cogs.red`,
      },
    },
    {
      path: '/cogs',
      redirect: '/',
      exact: true,
    },
    {
      path: '*', // 404
      redirect: '/',
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = (to.meta && to.meta.title && to.meta.title(to)) || `${to.name} | v3.cogs.red`;
  next();
});

export default router;
