import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useShopStore } from '../stores/shop';
import { useAuthStore } from '../stores/auth';
import { useServiceStore } from '../stores/service';
import { storeToRefs } from 'pinia';

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
      path: '/logout',
      name: 'logout',
      component: () => import('../views/LogoutView.vue')
    },
    {
      path: '/barbershop/:id',
      name: 'shop',
      component: () => import('../views/ShopView.vue'),
      meta: {
        requiresFetchBarbershopById: true
      }
    }
  ]
});

// eslint-disable-next-line no-unused-vars
router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();
  const shopStore = useShopStore();
  const serviceStore = useServiceStore();

  const { barber } = storeToRefs(authStore);

  // megnézzük, hogy be van-e lépve a user
  // ha bevan, megnézzük mikor jár le a token
  // ha lejárt a token, kiléptetjük a user-t
  // ha 5p múlva jár le akkor kérünk refresh token-t
  // ha nincs
  // megnézzük, hogy van-e token
  // ha nincs token visszaírányítjuk a főoldalra, és eltárolunk egy figyelmeztető üzentet
  // ha van token meghívjuk a user.validate()-ot és megnézzük megint, hogy be van-e lépve,
  // ha helytelen a token, visszaírányítjuk a főoldalra, és eltárolunk egy figyelmeztető üzentet
  // ha helyes volt a token a usert tovább engedjük

  // be van lépve a user
  if (authStore.isLoggedIn) {
    // kiszámoljuk a token lejáratni idejét percben
    const exp = barber.value.exp * 1000;
    const now = new Date().getTime();
    const timeToExp = Math.floor((exp - now) / 1000);

    console.log(`Time till token expires in seconds: ${timeToExp}`);

    if (timeToExp < 300) {
      // refresh token-t kérünk
      await authStore.refreshToken();
    }
  }

  if (!authStore.isLoggedIn && authStore.hasToken) {
    await authStore.setUserByToken();

    if (!authStore.isLoggedIn) {
      console.log('Nem sikerült a mentett tokennel való bejelentkezés :/');
      authStore.$reset();
    }
  }

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return { name: 'login' };
  }

  // if (to.meta.requiresAuth) {
  //   if (!authStore.isLoggedIn) {
  //     if (!authStore.hasToken) {
  //       console.log('nincs bejelentkezve && token sincs');
  //       // return '/login';
  //     }

  //     await authStore.setUserByToken();

  //     if (!authStore.isLoggedIn) {
  //       // a user-nek volt tokenje eltárolva, de nem volt valid
  //       // ezért reseteljük az authStore-t és
  //       authStore.$reset();
  //       // return { message: 'Előszőr jelentkezz be!', name: 'login' };
  //     }
  //   }
  // }

  if (to.meta.requiresFetchAllShops) await shopStore.fetchAllShops();
  if (to.meta.requiresFetchUserShops) await shopStore.fetchUserShops();
  if (to.meta.requiresFetchBarbershopById) {
    await shopStore.fetchUserShopById(to.params.id);
    await serviceStore.getShopServices(to.params.id);
  }
});

export default router;
