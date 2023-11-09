<script setup>
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

// router
const router = useRouter();

// store
const authStore = useAuthStore();

authStore.$reset();
router.push({ name: 'home' });
</script>

<template>
  <div></div>
</template>

<style scoped></style>
