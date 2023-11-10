import { defineStore } from 'pinia';
import { storeToRefs } from 'pinia';
import { useAuthStore } from './auth';
import { ref, computed } from 'vue';
import axios from 'axios';

export const useShopStore = defineStore('shop', () => {
  // state
  const shops = ref([]);
  const userShops = ref([]);

  //stores
  const authStore = useAuthStore();
  const { bearerToken } = storeToRefs(authStore);

  // getters

  // actions

  const API_URI = 'http://localhost:3000/api';

  async function fetchAllShops() {
    try {
      const { data } = await axios.get(`${API_URI}/shop`);

      if (!data.shopList)
        throw new Error(
          'Ismeretlen hiba történt a fodrászatok lekérdezése közben. Kérlek próbáld újra!'
        );

      shops.value = data.shopList;
    } catch (err) {
      console.error({ err });
    }
  }

  async function fetchUserShops() {
    try {
      const { data } = await axios.get(`${API_URI}/shop/logged-in/`, {
        headers: {
          Authorization: bearerToken.value
        }
      });

      if (!data.shopList)
        throw new Error(
          'Ismeretlen hiba történt a fodrászatok lekérdezése közben. Kérlek próbáld újra!'
        );

      userShops.value = data.shopList;
    } catch (err) {
      console.error({ err });
    }
  }

  async function createShop(shop) {
    try {
      console.log(shop);
      const { data } = await axios.post(`${API_URI}/shop/create`, shop, {
        headers: {
          Authorization: bearerToken.value
        }
      });

      if (!data.newShop)
        throw new Error('Ismeretlen hiba történt a regisztráció közben. Kérlek próbáld újra!');

      await fetchUserShops();
    } catch (err) {
      console.error({ err });
    }
  }

  // return
  return { shops, userShops, fetchAllShops, fetchUserShops, createShop };
});
