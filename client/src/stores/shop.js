import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

export const useShopStore = defineStore('shop', () => {
  // state
  const shops = ref([]);

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

  // return
  return { shops, fetchAllShops };
});
