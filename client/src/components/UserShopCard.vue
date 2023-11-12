<template>
  <div class="col-lg-3 col-md-6 col-sm-12 mt-3">
    <div class="card" style="width: 100%">
      <button
        class="remove"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal2"
        :data-bs-id="this.shopData._id"
      >
        <i class="bi bi-dash"></i>
      </button>
      <img
        src="https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg"
        class="card-img-top"
        :alt="shopData.name"
      />
      <div class="card-body">
        <h5 class="card-title">{{ shopData.name }}</h5>
        <p class="card-text">Város neve</p>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({ shopData: Object });
</script>
<style scoped>
h5 {
  font-weight: 700 !important;
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
  margin: 0.5rem;
}
</style>
