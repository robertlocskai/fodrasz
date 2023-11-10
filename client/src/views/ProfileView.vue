<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/auth';
import { useShopStore } from '../stores/shop';

// store
const authStore = useAuthStore();
const { isLoggedIn, barberName } = storeToRefs(authStore);
const shopStore = useShopStore();
const { userShops } = storeToRefs(shopStore);

console.log(userShops.value.length);
let shopNum = userShops.value.length;

const newShop = ref({
  name: '',
  location: '',
  phone: ''
});

// functions
async function handleSubmit() {
  try {
    //TODO: SCHEMA VALIDATION
    await shopStore.createShop(newShop.value);

    if (shopNum > 0) router.push({ name: 'profile' });
  } catch (err) {
    console.error({ err });
  }
}
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
      <div class="noStore" v-if="shopNum == 0">
        Még nincs fodrászat létrehozva a fiókodban! Hozz létre egyet!
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          <i class="bi bi-plus"></i>
        </button>
      </div>
    </div>
  </div>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Fodrászat létrehozása</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form id="createForm" @submit.prevent="handleSubmit">
            <div class="row">Fodrászat neve:</div>
            <div class="row">
              <input
                v-model="newShop.name"
                class="form-control"
                type="text"
                name="shopName"
                id="shopName"
                placeholder="Név..."
              />
            </div>
            <div class="row">Fodrászat címe:</div>
            <div class="row">
              <input
                v-model="newShop.location"
                class="form-control"
                type="text"
                name="location"
                id="location"
                placeholder="Cím..."
              />
            </div>
            <div class="row">Telefonszám:</div>
            <div class="row">
              <input
                v-model="newShop.phone"
                class="form-control"
                type="tel"
                name="phone"
                id="phone"
                placeholder="Telefonszám..."
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Mégsem</button>
          <button type="submit" form="createForm" class="btn btn-primary" data-bs-dismiss="modal">
            Létrehozás
          </button>
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

.modal-body {
  margin: 2rem;
}

.modal-body .row {
  margin-bottom: 0.4rem;
}
</style>
