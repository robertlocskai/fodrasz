<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/auth';

// store
const authStore = useAuthStore();
const { isLoggedIn, barberName } = storeToRefs(authStore);
</script>

<template>
  <div class="hero">
    <div class="cover"></div>
    <div class="fadeOut"></div>
  </div>
  <div class="container">
    <div class="content">
      <div class="profileHeader">
        <img src="https://pbs.twimg.com/media/FUrhqfUXoAIQS3Q.png" alt="profilePic" />
        {{ barberName }}
      </div>
      <div class="noStore">
        Még nincs fodrászat létrehozva a fiókodban! Hozz létre egyet!
        <button class="btn btn-primary">
          <i class="bi bi-plus"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  height: 57rem;
  background-image: url('../assets/images/hero.png');
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
}

.fadeOut {
  height: 30%;
  width: 100%;
  background: linear-gradient(180deg, rgba(2, 0, 36, 0) 0%, #f2f2f2 100%);
  position: absolute;
  bottom: 0;
}
.cover {
  z-index: -1;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.25);
  width: 100%;
  height: 100%;
}
.container {
  position: absolute;
  left: 50%;
  padding: 1rem 1rem 5rem 1rem;
  background-color: white;
  transform: translateY(-48rem) translateX(-50%);
  border-radius: 9px;
}

.content {
  margin: 3rem;
}

.profileHeader {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: bold;
}

.profileHeader img {
  height: 13rem;
  border-radius: 50%;
  margin-bottom: 0.2rem;
}

.noStore {
  height: 15rem;
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
  justify-content: center;
  align-items: center;
}

.noStore .btn {
  width: 4rem;
  border-radius: 50%;
  aspect-ratio: 1;
}

.btn i {
  font-size: 2rem;
}
</style>
