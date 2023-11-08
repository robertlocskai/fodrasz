<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="/">FodraszPont</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarScroll"
        aria-controls="navbarScroll"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarScroll">
        <ul
          class="navbar-nav me-auto my-3 my-lg-0 navbar-nav-scroll"
          style="--bs-scroll-height: 100px"
        ></ul>
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
        <router-link to="/login" custom v-slot="{ navigate }">
          <button class="btn btn-outline-primary me-3" type="submit" @click="navigate" role="link">
            Bejelentkezés
          </button>
        </router-link>
        <router-link to="/register" custom v-slot="{ navigate }">
          <button class="btn btn-primary me-3" type="submit" @click="navigate" role="link">
            Regisztráció
          </button>
        </router-link>
      </div>
    </div>
  </nav>
</template>
<script setup></script>
<style scoped>
.navbar {
  position: absolute;
  left: 0;
  right: 0;
  background-color: white;
  border-radius: 6px;
  margin: 2rem;
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
  align-self: center;
  transform: translateX(-2.7rem);
  color: #3f3f3f;
}
.bi-search:hover {
  color: #dd5656;
  cursor: pointer;
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
</style>
