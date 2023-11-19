<script setup>
defineProps({ shopData: Object });
</script>

<template>
  <RouterLink :to="{ name: 'shop', params: { id: shopData._id } }" custom v-slot="{ navigate }">
    <div class="card h-100" @click="navigate">
      <img :src="`http://localhost:3000/${shopData.photos[0]}`" class="card-img-top" />
      <div class="card-body">
        <h5 class="card-title">{{ shopData.name }}</h5>
        <div class="card-text">
          <div>Rating: *****</div>
          <div>
            Description: Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic, officia!
          </div>
          <div>Services: Gyermek hajvágás, SkinFade hajvágás, Szakáll igazítás</div>
        </div>
      </div>
      <div class="card-footer">
        <small class="text-body-secondary">Last updated 3 mins ago</small>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped></style>
