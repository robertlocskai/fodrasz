import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useShopStore } from '../stores/shop';
import { useAuthStore } from '../stores/auth';
import { useServiceStore } from '../stores/service';

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
        requiresFetchUserShops: true,
        requiresFetchAllShops: true,
        requiresAuth: true
      }
    },
    {
      path: '/create-shop',
      name: 'createShop',
      component: () => import('../views/CreateShopView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/create-service',
      name: 'createService',
      component: () => import('../views/CreateServiceView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/barbershop/:id',
      name: 'shop',
      component: () => import('../views/ShopView.vue'),
      meta: {
        requiresFetchBarbershopById: true
      }
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('../views/LogoutView.vue')
    }
  ]
});

// eslint-disable-next-line no-unused-vars
router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();
  const shopStore = useShopStore();
  const serviceStore = useServiceStore();

  if (authStore.isLoggedIn) await authStore.replaceTokenIfOld();

  if (!authStore.isLoggedIn && authStore.hasToken) {
    await authStore.setUserByToken();
    await authStore.replaceTokenIfOld();

    if (!authStore.isLoggedIn) authStore.$reset();
  }

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return { name: 'login' };
  }

  if (to.meta.requiresFetchAllShops) await shopStore.fetchAllShops();
  if (to.meta.requiresFetchUserShops) await shopStore.fetchUserShops();
  if (to.meta.requiresFetchBarbershopById) {
    await shopStore.fetchUserShopById(to.params.id);
    await serviceStore.getShopServices(to.params.id);
  }
});

export default router;
