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
      const {
        data: { userShops: userShopsReq }
      } = await axios.get(`${API_URI}/shop/logged-in/`, {
        headers: {
          Authorization: bearerToken.value
        }
      });

      if (!userShopsReq)
        throw new Error(
          'Ismeretlen hiba történt a fodrászatok lekérdezése közben. Kérlek próbáld újra!'
        );

      userShops.value = userShopsReq;
    } catch (err) {
      console.error({ err });
    }
  }

  async function createShop(formData) {
    try {
      const { data } = await axios.post(`${API_URI}/shop/test`, formData, {
        headers: {
          Authorization: bearerToken.value,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (!data.newShop)
        throw new Error('Ismeretlen hiba történt a létrehozás közben. Kérlek próbáld újra!');

      await fetchUserShops();
    } catch (err) {
      console.error({ err });
    }
  }

  async function deleteShop(id) {
    try {
      const result = await axios.delete(`${API_URI}/shop/delete/${id}`, {
        headers: {
          Authorization: bearerToken.value
        }
      });

      if (!result)
        throw new Error('Ismeretlen hiba történt törlés közben. Kérlek próbáld újra később!');

      await fetchUserShops();
    } catch (err) {
      console.log({ err });
    }
  }

  // return
  return { shops, userShops, fetchAllShops, fetchUserShops, createShop, deleteShop };
});
