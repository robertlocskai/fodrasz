<script setup>
import { storeToRefs } from 'pinia';
import { useShopStore } from '../stores/shop';
import ShopCard from '../components/ShopCard.vue';

// stores
const shopStore = useShopStore();
const { shops } = storeToRefs(shopStore);
</script>

<template>
  <div class="hero">
    <div class="heroText">
      <p id="title">
        Legyen olyan, amilyent <br class="heroBreak" /><span class="colorized">te</span> szeretnél!
      </p>
      <p>
        Nálunk kedvedre válogathatsz akár környéked beli, <br class="heroBreak" />akár az ország
        másik pontján lévő fodrászatok közül is!
      </p>
    </div>
    <div class="cover"></div>
    <div class="fadeOut"></div>
  </div>
  <div class="container">
    <div class="content">
      <h4>Legjobb értékelések</h4>

      <div class="row row-cols-1 rowl-cols-md-2 row-cols-lg-3">
        <div v-for="shop in shops" :key="shop._id" class="col">
          <ShopCard :shopData="shop"></ShopCard>
        </div>
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
.heroText {
  margin-top: 10rem;
  text-align: center;
  color: white;
  margin-left: 2rem;
  margin-right: 2rem;
}

.heroText p {
  font-size: 20px;
}

p#title,
span.colorized {
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 0.1rem;
}

span.colorized {
  background: linear-gradient(349deg, #e44141 19.59%, #e46f6f 46.08%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
  transform: translateY(-30rem) translateX(-50%);
  border-radius: 9px;
}

.content {
  margin: 3rem;
}

@media (max-width: 715px) {
  p#title,
  span.colorized {
    font-size: 30px;
    font-weight: 800;
    margin-bottom: 0.1rem;
  }
  .heroText p {
    font-size: 16px;
  }

  .heroBreak {
    display: none;
  }
}
</style>
