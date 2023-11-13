<template>
  <div class="hero">
    <div class="cover"></div>
    <div class="fadeOut"></div>
  </div>
  <div class="container">
    <div class="shopThumbnail">{{ currentShop.name }}</div>
    <div class="content">
      <!--{{ $route.params.id }}-->
      <div class="row">
        <div class="services col-7">
          <div class="row" v-for="service in shopServices">
            <Service :serviceData="service" :canEdit="currentShop.ownerId == barberId" />
          </div>
          <div class="row">
            <button class="btn btn-primary" v-if="currentShop.ownerId == barberId">
              Új szolgáltatás hozzáadása
            </button>
          </div>
        </div>
        <div class="col-5">
          <div class="dataPanel card text-center">
            <div class="card-header">Fodrászat adatok</div>
            <div class="card-body">
              <h5 class="card-title">{{ currentShop.name }}</h5>
              <div class="rating">
                <img src="../assets/images/star.svg" alt="star" />
                <img src="../assets/images/star.svg" alt="star" />
                <img src="../assets/images/star.svg" alt="star" />
                <img src="../assets/images/star.svg" alt="star" />
                <img src="../assets/images/star.svg" alt="star" />
                (12)
              </div>
              <p class="card-text">{{ currentShop.location }}</p>
              <p class="card-text">TELEFONSZÁM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Service from '../components/Service.vue';
import { storeToRefs } from 'pinia';
import { useShopStore } from '../stores/shop';
import { useServiceStore } from '../stores/service';
import { useAuthStore } from '../stores/auth';

const shopStore = useShopStore();
const { currentShop } = storeToRefs(shopStore);
const serviceStore = useServiceStore();
const { shopServices } = storeToRefs(serviceStore);
const authStore = useAuthStore();
const { barberId } = storeToRefs(authStore);
</script>
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
  overflow: hidden;
}

.shopThumbnail {
  margin: -1rem -1rem 0rem -1rem;
  height: 17rem;
  background:
    linear-gradient(0deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.45) 100%),
    url('../assets/images/hero.png'),
    lightgray 50% / cover no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 4rem;
  font-weight: 600;
}

.content {
  margin: 3rem;
}

.rating {
  margin: 1rem 0rem;
}
</style>
