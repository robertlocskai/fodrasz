<template>
  <div class="card">
    <div class="card-body">
      <div class="configs" v-if="canEdit">
        <button
          class="edit"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal2"
          data-bs-id="gatya"
        >
          <i class="bi bi-gear-fill"></i>
        </button>
        <button
          class="remove"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal2"
          data-bs-id="gatya"
        >
          <i class="bi bi-dash"></i>
        </button>
      </div>
      <h5 class="card-title">{{ serviceData.name }}</h5>
      <p class="card-text">Időtartam: {{ serviceData.appointment }} óra</p>
      <p class="servicePrice">{{ serviceData.price }}Ft</p>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({ serviceData: Object, canEdit: Boolean });
</script>
<style scoped>
.servicePrice {
  float: right;
  color: #1e1e1e;
  text-align: right;
  font-weight: 700;
  margin: 0;
  font-size: 20px;
}
.card-text {
  font-weight: 400;
  margin: 0;
}
.card-title {
  font-weight: 700;
  font-size: 24px;
}

.card {
  border: rgba(0, 0, 0, 0.2) 1px solid;
  border-radius: 6px;
  background-color: #fff;
  padding: 0.7rem 1.5rem;
  margin-bottom: 1rem;
}

.configs {
  position: absolute;
  right: 0;
  top: 0;
  margin: 0.4rem;
  height: 20px;
  display: flex;
}
button.remove {
  margin: 0rem 0.125rem;
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
  z-index: 1;
}
button.edit {
  margin: 0rem 0.125rem;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  border-radius: 6px;
  background-color: #75ce73;
  color: white;
  z-index: 1;
}
</style>
