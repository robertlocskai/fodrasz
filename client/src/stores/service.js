import { defineStore, storeToRefs } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from './auth';
import { useShopStore } from './shop';

export const useServiceStore = defineStore('service', () => {
  // state
  const shopServices = ref([]);

  // stores
  const authStore = useAuthStore();
  const shopStore = useShopStore();
  const { bearerToken } = storeToRefs(authStore);
  const { currentShop } = storeToRefs(shopStore);

  // actions
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

  async function createService(formData) {
    try {
      const { data } = await axios.post(`${API_URI}/services/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: bearerToken.value
        }
      });

      if (!data.insertedService)
        throw new Error(
          'Ismeretlen hiba történt a szolgáltatás hozzáadása közben. Kérjük próbáld újra később!'
        );
    } catch (err) {
      console.error({ err });
    }
  }

  // return
  return { shopServices, getShopServices, createService };
});
