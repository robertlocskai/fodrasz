import { defineStore } from 'pinia';
import { ref, computed, watchEffect } from 'vue';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
  // state
  const barber = ref({
    _id: '',
    firstname: '',
    lastname: '',
    email: '',
    iat: 0,
    exp: 0
  });

  const token = ref(localStorage.getItem('token') || '');

  // getters
  const barberName = computed(() => `${barber.value.firstname}  ${barber.value.lastname}`);
  const hasToken = computed(() => !!token.value);
  const isLoggedIn = computed(() => !!barber.value._id);
  const bearerToken = computed(() => `Bearer ${token.value}`);

  const API_URI = 'http://localhost:3000/api';

  // actions
  watchEffect(() => localStorage.setItem('token', token.value));

  async function setUserByToken() {
    try {
      if (!hasToken.value) return;

      const { data } = await axios.get(`${API_URI}/auth/validate`, {
        headers: {
          Authorization: bearerToken.value
        }
      });

      if (!data.user)
        throw new Error('Valami hiba történt a hitelesítés közben. Kérlek próbáld meg újra!');

      barber.value = data.user;
    } catch (err) {
      console.error({ err });
    }
  }

  async function signup(user) {
    try {
      const { data } = await axios.post(`${API_URI}/auth/signup`, user);

      if (!data.token)
        throw new Error('Valami hiba történt a regisztráció közben. Kérlek próbáld újra!');

      token.value = data.token;

      await setUserByToken();
    } catch (err) {
      console.error({ err });
    }
  }

  async function login(user) {
    try {
      const { data } = await axios.post(`${API_URI}/api/auth/login`, user);
      if (!data.token)
        throw new Error('Valami hiba történt a regisztráció közben. Kérlek próbáld újra!');

      token.value = data.token;

      await setUserByToken();
    } catch (err) {
      console.error({ err });
    }
  }

  // ruhák kiszedése
  // fekete ruhák berakása
  // szárítógép: ahol most áll || Pamut
  // szűrő kiszedése & víz kiöntése

  function $reset() {
    barber.value = {
      _id: '',
      name: '',
      email: '',
      iat: 0,
      exp: 0
    };

    token.value = '';
  }

  // return
  return { barber, token, barberName, hasToken, isLoggedIn, setUserByToken, signup, login, $reset };
});
