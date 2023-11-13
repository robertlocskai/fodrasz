import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useShopStore } from '../stores/shop';
import { useAuthStore } from '../stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresFetchAllShops: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      meta: {
        requiresFetchUserShops: true
      }
    },
    {
      path: '/create-shop',
      name: 'createShop',
      component: () => import('../views/CreateShopView.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('../views/LogoutView.vue')
    }
  ]
});

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();
  const shopStore = useShopStore();

  if (to.meta.requiresFetchAllShops) await shopStore.fetchAllShops();
  if (to.meta.requiresFetchUserShops) await shopStore.fetchUserShops();
});

export default router;
