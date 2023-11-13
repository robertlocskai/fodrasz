import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

export const useServiceStore = defineStore('service', () => {
  const shopServices = ref([]);

  const API_URI = 'http://localhost:3000/api';

  async function getShopServices(id) {
    try {
      const {
        data: { shopServices: fetchedServices }
      } = await axios.get(`${API_URI}/services/shop/${id}`);

      if (!fetchedServices)
        throw new Error(
          'Ismeretlen hiba történt a szolgáltatások lekérdezése közben. Kérjük próbáld újra később!'
        );

      shopServices.value = fetchedServices;
    } catch (err) {
      console.log(err);
    }
  }

  // return
  return { shopServices, getShopServices };
});
