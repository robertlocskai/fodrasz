<template>
  <div class="hero">
    <div class="cover"></div>
    <div class="fadeOut"></div>
  </div>
  <div class="container">
    <div class="shopThumbnail">Teszt shopppp</div>
    <div class="content">
      <!--{{ $route.params.id }}-->
      <div class="row">
        <div class="services col-7">
          <div class="row">
            <Service />
          </div>
        </div>
        <div class="datas col-5"></div>
      </div>
    </div>
  </div>
</template>
<script setup></script>
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

.services {
  border: green 1px solid;
}
.datas {
  border: red 1px solid;
}
</style>
