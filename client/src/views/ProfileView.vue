<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/auth';
import { useShopStore } from '../stores/shop';
import UserShopCard from '../components/UserShopCard.vue';

// store
const authStore = useAuthStore();
const shopStore = useShopStore();
const { barberName } = storeToRefs(authStore);
const { userShops } = storeToRefs(shopStore);

// refs
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
  } catch (err) {
    console.error({ err });
  }
}

async function handleRemove() {
  try {
    await shopStore.deleteShop(removeId);
  } catch (err) {
    console.error({ err });
  }
}

// hooks
let removeId = '';

onMounted(() => {
  const exampleModal = document.getElementById('exampleModal2');

  exampleModal.addEventListener('show.bs.modal', (event) => {
    // Button that triggered the modal
    const button = event.relatedTarget;
    // Extract info from data-bs-* attributes
    const shop = button.getAttribute('data-bs-id');
    // If necessary, you could initiate an AJAX request here
    // and then do the updating in a callback.

    removeId = shop;
  });
});

/*const deleteModal = this.$refs.deleteModal;
console.log(deleteModal);*/

/**/
</script>

<template>
  <div class="hero">
    <div class="cover"></div>
    <div class="fadeOut"></div>
  </div>

  <div class="container">
    <div class="profileThumbnail"></div>
    <div class="content">
      <div class="profileHeader">
        <img src="https://pbs.twimg.com/media/FUrhqfUXoAIQS3Q.png" alt="profilePic" />
        {{ barberName }}
      </div>
      <div class="noStore" v-if="userShops.length == 0">
        Még nincs fodrászat létrehozva a fiókodban! Hozz létre egyet!
        <RouterLink :to="{ name: 'createShop' }">
          <button class="btn btn-primary">
            <i class="bi bi-plus"></i>
          </button>
        </RouterLink>
      </div>
      <div class="shops mt-4" v-if="userShops.length > 0">
        <h4 class="mb-4">Általad létrehozott fodrászatok ({{ userShops.length }}/4)</h4>
        <div class="row">
          <UserShopCard v-for="shop in userShops" :shopData="shop" :key="shop._id" />
          <div class="addIfHas col-lg-3 col-md-6 col-sm-12 mt-3">
            <RouterLink :to="{ name: 'createShop' }">
              <button v-if="userShops.length < 4" id="addIfHas" class="btn btn-primary">
                <i class="bi bi-plus"></i></button
            ></RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--remove modal-->
  <div
    class="modal fade"
    id="exampleModal2"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="deleteModal"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Fodrászat törlése</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">Biztosan el szeretnéd távolítani ezt a fodrászatot?</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Mégsem</button>
          <button
            type="button"
            @click="handleRemove()"
            class="btn btn-primary"
            data-bs-dismiss="modal"
          >
            Törlés
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    <i class="bi bi-plus"></i>
  </button> -->

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
  text-align: center;
}

.noStore .btn {
  width: 4rem;
  border-radius: 50%;
  aspect-ratio: 1/1;
}

.addIfHas {
  display: flex;
  justify-content: center;
  align-items: center;
}

#addIfHas {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
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

.profileThumbnail {
  z-index: -1;
  margin: -1rem -1rem -5rem -1rem;
  border-radius: 9px 9px 0px 0px;
  position: absolute;
  width: 100%;
  height: 10rem;
  background: rgb(144, 144, 144);
  background: linear-gradient(45deg, rgba(144, 144, 144, 1) 0%, rgba(223, 223, 223, 1) 100%);
}

@media (max-width: 454px) {
  .content {
    margin: 1rem;
  }
  .profileHeader {
    font-size: 28px;
    text-align: center;
  }
  h4 {
    font-size: 16px;
    text-align: center;
  }
  .profileHeader img {
    height: 10rem;
  }
}
@media (max-width: 390px) {
  .content {
    margin: 0.2rem;
  }
}
</style>
