<template>
  <div class="col-3">
    <div class="card" style="width: 18rem">
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
defineProps({ shopData: Object });
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
</style>
