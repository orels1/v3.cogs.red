import Vue from 'vue';
import Router from 'vue-router';
import CogsListPage from '@/pages/CogsListPage';
import About from '@/pages/About';
import CogPage from '@/pages/CogPage';
import RepoPage from '@/pages/RepoPage';
import UserPage from '@/pages/UserPage';
import SearchPage from '@/pages/SearchPage';
import Tags from '@/components/pages/Tags';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Cogs',
      component: CogsListPage,
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    {
      path: '/cogs/:user',
      name: 'UserPage',
      component: UserPage,
      meta: {
        title: route => `Cogs by ${route.params.user} | v3.cogs.red`,
      },
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
      path: '/search/:search',
      name: 'Search',
      component: SearchPage,
      meta: {
        title: route => `Cogs for "${route.params.search}" | v3.cogs.red`,
      },
    },
    {
      path: '/tags',
      name: 'Tags',
      component: Tags,
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
