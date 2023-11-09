<script setup>
// import
import { ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/auth';
import * as schemas from '../schemas/schemas.auth';

// store
const authStore = useAuthStore();
const { isLoggedIn } = storeToRefs(authStore);

// router
const router = useRouter();

// state
const barber = ref({
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  confirmPassword: ''
});

// functions
async function handleSubmit() {
  try {
    await schemas.signup.validateAsync(barber.value);
    await authStore.signup(barber.value);

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
          <h3 class="text-center">Regisztráció</h3>

          <form @submit.prevent="handleSubmit">
            <div class="row">
              <div class="col-6">Vezetéknév</div>
              <div class="col-6">Keresztnév</div>
            </div>

            <div class="row">
              <div class="col-6">
                <input
                  v-model="barber.firstname"
                  type="text"
                  class="form-control"
                  placeholder="Vezetéknév..."
                  name="vezeteknev"
                  id="vezeteknev"
                />
              </div>

              <div class="col-6">
                <input
                  v-model="barber.lastname"
                  type="text"
                  class="form-control"
                  placeholder="Keresztnév..."
                  name="keresztnev"
                  id="keresztnev"
                />
              </div>
            </div>

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

            <div class="row">
              <div class="col-12">Jelszó mégegyszer</div>
            </div>

            <div class="row">
              <div class="col-12">
                <input
                  v-model="barber.confirmPassword"
                  type="password"
                  class="form-control"
                  placeholder="********"
                  name="passwordagain"
                  id="passwordagain"
                />
              </div>
            </div>

            <div class="row justify-content-center">
              <div class="col-12 d-flex justify-content-center">
                <button type="submit" class="btn btn-primary mt-3 mb-3">Regisztráció</button>
              </div>
            </div>

            <div class="row">
              <div class="logintext col-12 d-flex justify-content-center">
                Van már profilod?&nbsp;<RouterLink :to="{ name: 'login' }"
                  >Jelentkezz be!</RouterLink
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
  margin-top: 10rem;
  width: auto;
  padding: 3rem 4rem;
  background-color: white;
  border-radius: 9px;
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
