<script setup>
import { ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import * as schemas from '../schemas/schemas.auth';
import { storeToRefs } from 'pinia';

// state
const authStore = useAuthStore();
const { isLoggedIn } = storeToRefs(authStore);

// router
const router = useRouter();

// state
const barber = ref({
  email: '',
  password: ''
});

async function handleSubmit() {
  try {
    await schemas.login.validateAsync(barber.value);
    await authStore.login(barber.value);

    if (isLoggedIn.value) router.push({ name: 'home' });
  } catch (err) {
    console.error({ err });
  }
}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center" id="top">
      <div class="col-lg-6 col-md-12">
        <div class="panel">
          <h3 class="text-center">Bejelentkezés</h3>
          <form @submit.prevent="handleSubmit">
            <div class="row">
              <div class="col-12">E-mail</div>
            </div>

            <div class="row">
              <div class="col-12">
                <input
                  v-model="barber.email"
                  type="email"
                  class="form-control"
                  placeholder="E-mail..."
                  name="email"
                  id="email"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-12">Jelszó</div>
            </div>

            <div class="row">
              <div class="col-12">
                <input
                  v-model="barber.password"
                  type="password"
                  class="form-control"
                  placeholder="********"
                  name="password"
                  id="password"
                />
              </div>
            </div>

            <div class="row justify-content-center">
              <div class="col-12 d-flex justify-content-center">
                <button type="submit" class="btn btn-primary mt-3 mb-3">Bejelentkezés</button>
              </div>
            </div>

            <div class="row">
              <div class="logintext col-12 d-flex justify-content-center">
                Nem regisztráltál még?&nbsp;<RouterLink :to="{ name: 'register' }"
                  >Regisztrálj!</RouterLink
                >
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.panel {
  width: auto;
  padding: 3rem 4rem;
  background-color: white;
  border-radius: 9px;
  margin-top: 10rem;
}

.logintext,
.logintext a {
  font-size: 12px;
}

.row {
  margin-top: 0.5rem;
}
.row#top {
  margin-top: 0;
}

h3 {
  font-weight: bold;
}

form {
  margin-top: 2.5rem;
}

@media (max-width: 576px) {
  .panel {
    padding: 1rem 1rem;
  }
}
</style>
