<script setup>
import { computed, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useShopStore } from '../stores/shop';
import { useServiceStore } from '../stores/service';
import { useAuthStore } from '../stores/auth';
import ServiceCard from '../components/ServiceCard.vue';

const shopStore = useShopStore();
const serviceStore = useServiceStore();
const authStore = useAuthStore();
const { currentShop } = storeToRefs(shopStore);
const { shopServices } = storeToRefs(serviceStore);
const { barberId } = storeToRefs(authStore);

// computed
const address = computed(
  () => `${currentShop.value.zip}, ${currentShop.value.city}, ${currentShop.value.address}`
);

// refs
const newService = ref({
  name: '',
  price: '',
  time: ''
});

// functions
async function handleSubmit() {
  try {
    const serviceObject = {
      shopId: currentShop.value._id,
      name: newService.value.name,
      price: parseInt(newService.value.price),
      appointment: newService.value.time
    };
    //TODO: SCHEMA VALIDATION
    console.log(serviceObject);
    await serviceStore.createService(serviceObject);
  } catch (err) {
    console.error({ err });
  }
}
</script>

<template>
  <div
    class="modal fade"
    id="newServiceModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Új szolgáltatás hozzáadása</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <div class="row"><div class="col-12">Szolgáltatás neve:</div></div>
            <div class="row">
              <div class="col-12">
                <input
                  v-model="newService.name"
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="Pl.: Férfi hajvágás"
                />
              </div>
            </div>
            <div class="row"><div class="col-12">Szolgáltatás ára:</div></div>
            <div class="row">
              <div class="col-12">
                <div class="input-group">
                  <input
                    v-model="newService.price"
                    type="text"
                    class="form-control"
                    placeholder="0"
                    aria-label="Szolgáltatás ára"
                    aria-describedby="basic-addon2"
                  />
                  <span class="input-group-text" id="basic-addon2">Ft</span>
                </div>
              </div>
            </div>
            <div class="row"><div class="col-12">Szolgáltatás időtartama:</div></div>
            <div class="row">
              <div class="col-12">
                <input
                  v-model="newService.time"
                  type="text"
                  class="form-control"
                  id="time"
                  placeholder="Pl.: 1 óra"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Mégsem</button>
          <button type="button" class="btn btn-primary" @click="handleSubmit()">Létrehozás</button>
        </div>
      </div>
    </div>
  </div>
  <div class="hero">
    <div class="cover"></div>
    <div class="fadeOut"></div>
  </div>
  <div class="container">
    <div class="shopThumbnail">{{ currentShop.name }}</div>
    <div class="content">
      <!--{{ $route.params.id }}-->
      <div class="row">
        <div class="services col-sm-12 col-lg-7">
          <div class="row" v-if="shopServices.length == 0">
            <div class="noService">Jelenleg ennek a fodrászatnak nincs szolgáltatása.</div>
          </div>
          <div class="row" v-for="service in shopServices" :key="service._id">
            <ServiceCard :serviceData="service" :canEdit="currentShop.ownerId == barberId" />
          </div>
          <div class="row">
            <!--<RouterLink :to="{ name: 'createService' }" custom v-slot="{ navigate }">
              <button
                v-if="currentShop.ownerId == barberId"
                @click="navigate"
                class="btn btn-primary"
              >
                Új szolgáltatás hozzáadása
              </button>
            </RouterLink>-->
            <button
              v-if="currentShop.ownerId == barberId"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#newServiceModal"
            >
              Új szolgáltatás hozzáadása
            </button>
          </div>
        </div>
        <div class="col-sm-12 col-lg-5">
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
              <p class="card-text">{{ address }}</p>
              <p class="card-text">{{ currentShop.phone }}</p>
            </div>
          </div>
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

.modal-body .container-fluid .row {
  margin-top: 0.4rem;
}

.noService {
  width: 100%;
  height: 10rem;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
}

@media (max-width: 991px) {
  .content {
    margin-left: 0px;
    margin-right: 0px;
  }
}
</style>
