import {
  createRouter,
  createWebHistory
} from '@ionic/vue-router';
import {
  RouteRecordRaw
} from 'vue-router';
import TabsPage from '../views/TabsPage.vue';
import {
  getAuth,
  onAuthStateChanged
} from 'firebase/auth';

const routes: Array < RouteRecordRaw > = [{
  path: '/',
  redirect: '/login',
}, {
  path: '/login',
  component: () => import('../views/LoginPage.vue'),
}, {
  path: '/register',
  component: () => import('../views/RegisterPage.vue'),
}, {
  path: '/tabs/',
  component: TabsPage,
  meta: {
    requiresAuth: true
  },
  children: [{
    path: '',
    redirect: '/tabs/curiosidades',
  }, {
    path: 'curiosidades',
    component: () => import('../views/Tab1Page.vue'),
  }, {
    path: 'curiosidades/:id',
    component: () => import('../views/CuriosidadesPage.vue'),
  }, {
    path: 'tab2',
    component: () => import('../views/Tab2Page.vue'),
  }, {
    path: 'tab3',
    component: () => import('../views/Tab3Page.vue'),
  }, ],
}, ];

const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL),
  routes,
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth) {
    if (await getCurrentUser()) {
      next();
    } else {
      console.log('No autorizado');
      next('/login');
    }
  } else {
    next();
  }
});

export default router;