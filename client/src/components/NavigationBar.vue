<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/auth';
import { RouterLink } from 'vue-router';

// store
const authStore = useAuthStore();
const { isLoggedIn, barberName } = storeToRefs(authStore);
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <RouterLink :to="{ name: 'home' }" class="navbar-brand">FodraszPont</RouterLink>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto my-3 my-lg-0"></ul>
        <form class="d-flex">
          <input
            class="form-control me-3"
            type="search"
            placeholder="Keresés..."
            aria-label="Keresés"
          />
          <i class="bi bi-search"></i>
        </form>

        <div class="divider me-3"></div>

        <RouterLink v-if="!isLoggedIn" to="/login" custom v-slot="{ navigate }">
          <button class="btn btn-outline-primary me-3" type="submit" @click="navigate" role="link">
            Bejelentkezés
          </button>
        </RouterLink>
        <br id="mobile" />
        <RouterLink v-if="!isLoggedIn" to="/register" custom v-slot="{ navigate }">
          <button class="btn btn-primary me-3" type="submit" @click="navigate" role="link">
            Regisztráció
          </button>
        </RouterLink>

        <ul class="navbar-nav me-3" v-if="isLoggedIn">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style="color: #e46f6f"
            >
              {{ barberName }}
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li>
                <RouterLink v-if="isLoggedIn" to="/profile" custom v-slot="{ navigate }">
                  <a class="dropdown-item" href="#" @click="navigate"
                    ><i class="bi bi-person-fill"></i> Profil megtekintése</a
                  ></RouterLink
                >
              </li>
              <li>
                <a class="dropdown-item" href="#"
                  ><i class="bi bi-gear-fill"></i> Profil beállítások</a
                >
              </li>
              <hr />
              <li>
                <RouterLink v-if="isLoggedIn" to="/logout" custom v-slot="{ navigate }">
                  <a class="dropdown-item" style="color: #e46f6f" href="#" @click="navigate"
                    ><i class="bi bi-box-arrow-right"></i> Kijelentkezés</a
                  >
                </RouterLink>
              </li>
            </ul>
          </li>
        </ul>
        <!--<RouterLink v-if="isLoggedIn" to="/profile" custom v-slot="{ navigate }">
          <a @click="navigate" class="profileLink me-3">{{ barberName }}</a>
        </RouterLink>-->
      </div>
    </div>
  </nav>
</template>

<style scoped>
.profileLink {
  text-decoration: none;
}
.profileLink:hover {
  cursor: pointer;
}

.navbar {
  z-index: 1;
  left: 0;
  right: 0;
  background-color: white !important;
  border-radius: 6px;
  margin: 2rem;
  position: absolute;
}
.navbar-brand,
.navbar-brand:hover,
.navbar-brand:focus {
  font-weight: 800;
  font-family: Montserrat;
  font-size: 1.5rem;
  color: #dd5656;
}

.divider {
  height: 1.4rem;
  width: 1px;
  background-color: #cecece;
}

.navbar-toggler,
.navbar-toggler:focus {
  border: none;
  outline: none !important;
}

.bi-search {
  transform: translateX(-2.7rem);
  align-self: center;
  color: #3f3f3f;
}
.bi-search:hover {
  color: #dd5656;
  cursor: pointer;
}

form {
  margin-right: -1rem;
}

/* clears the ‘X’ from Internet Explorer */
input[type='search']::-ms-clear {
  display: none;
  width: 0;
  height: 0;
}
input[type='search']::-ms-reveal {
  display: none;
  width: 0;
  height: 0;
}
/* clears the ‘X’ from Chrome */
input[type='search']::-webkit-search-decoration,
input[type='search']::-webkit-search-cancel-button,
input[type='search']::-webkit-search-results-button,
input[type='search']::-webkit-search-results-decoration {
  display: none;
}

br#mobile {
  display: none;
}

@media (max-width: 991px) {
  br#mobile {
    display: block;
  }
  .divider {
    display: none;
  }
  .form-control.me-3 {
    margin-right: 0 !important;
  }

  .btn {
    margin-top: 0.5rem;
    width: 100%;
  }

  ul.navbar-nav {
    width: 100%;
  }
}

@media (max-width: 575px) {
  .navbar {
    margin: 0.8rem;
  }
}
</style>
