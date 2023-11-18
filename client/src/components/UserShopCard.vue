<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/auth';

// props
defineProps({ shopData: Object });

// store
const authStore = useAuthStore();
const { isLoggedIn } = storeToRefs(authStore);
</script>

<template>
  <div class="col-lg-3 col-md-6 col-sm-12 mt-3">
    <button
      v-if="isLoggedIn"
      class="remove"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal2"
      :data-bs-id="this.shopData._id"
    >
      <i class="bi bi-dash"></i>
    </button>
    <RouterLink :to="`/barbershop/${shopData._id}`" custom v-slot="{ navigate }">
      <div class="card" style="width: 100%" @click="navigate">
        <img
          :src="`http://localhost:3000/${shopData.photos[0]}`"
          class="card-img-top"
          :alt="shopData.name"
        />
        <div class="card-body">
          <h5 class="card-title">{{ shopData.name }}</h5>
          <p class="card-text">{{ shopData.city }}</p>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>
h5 {
  font-weight: 700 !important;
}

.card:hover {
  cursor: pointer;
}

.card {
  width: 100%;
}

.card-text {
  color: #909090 !important;
  font-size: 14px !important;
  font-style: normal !important;
  font-weight: 400 !important;
  line-height: normal !important;
}

button.remove {
  position: absolute;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  border-radius: 6px;
  background-color: #f05151;
  color: white;
  right: 0;
  margin-top: 0.5rem;
  margin-right: 1.2rem;
  z-index: 1;
}

.col-lg-3 {
  min-height: 10rem;
  position: relative;
}
</style>
