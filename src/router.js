import { createRouter, createWebHistory } from 'vue-router';

import DomainDetail from './pages/domains/DomainDetail.vue';
import DomainsList from './pages/domains/DomainsList.vue';

import NotFound from './pages/NotFound.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import store from './store/index.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/auth' },
    { path: '/domains', component: DomainsList, meta: { requiresAuth: true  } },
    {
      path: '/domains/:id',
      component: DomainDetail,
      props: true,
      meta: { requiresAuth: true }
    },  
    { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
    { path: '/:notFound(.*)', component: NotFound }
  ]
});

router.beforeEach(function(to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/domains');
  } else {
    next();
  }
});

export default router;
