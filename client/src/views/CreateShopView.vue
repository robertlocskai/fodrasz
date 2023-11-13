<script setup>
// state
const cities = [
  'Bács-Kiskun',
  'Békés',
  'Baranya',
  'Borsod-Abaúj-Zemplén',
  'Budapest',
  'Csongrád',
  'Fejér',
  'Győr-Moson-Sopron',
  'Hajdú-Bihar',
  'Heves',
  'Jász-Nagykun-Szolnok',
  'Komárom-Esztergom',
  'Nógrád',
  'Pest',
  'Somogy',
  'Szabolcs-Szatmár-Bereg',
  'Tolna',
  'Vas',
  'Veszprém',
  'Zala'
];

// functions
async function handleSubmit() {}
</script>

<template>
  <div class="hero">
    <div class="heroText">
      <p id="title">
        Szerednéd, hogy fodrászatod <br class="heroBreak" /><span class="colorized">többen</span>
        ismerjék?
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
    <div class="row">
      <div class="h3 text-center">Fodrászat hozzáadása</div>
      <div class="h5 my-5">
        <span class="p-3 border border-dark rounded"
          >Adatok <i class="bi bi-clipboard-data"></i
        ></span>
      </div>

      <div class="col-6">
        <form @submit.prevent="handleSubmit" class="row g-3" enctype="multipart/form-data">
          <div class="col-md-6">
            <label for="inputEmail4" class="form-label">Email</label>
            <input type="email" class="form-control" id="inputEmail4" />
          </div>
          <div class="col-md-6">
            <label for="inputPassword4" class="form-label">Password</label>
            <input type="password" class="form-control" id="inputPassword4" />
          </div>
          <div class="col-6">
            <label for="inputAddress" class="form-label">Cím</label>
            <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" />
          </div>
          <div class="col-md-6">
            <label for="inputCity" class="form-label">Város</label>
            <input type="text" class="form-control" id="inputCity" />
          </div>
          <div class="col-md-6">
            <label for="inputState" class="form-label">Megye</label>
            <select id="inputState" class="form-select">
              <option
                v-for="(city, index) in cities"
                :key="index"
                :selected="city === 'Komárom-Esztergom'"
              >
                {{ city }}
              </option>
            </select>
          </div>
          <div class="col-md-6">
            <label for="inputZip" class="form-label">Irányítószám</label>
            <input type="text" class="form-control" id="inputZip" />
          </div>
          <div class="col-12">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="gridCheck" />
              <label class="form-check-label" for="gridCheck"> Check me out </label>
            </div>
          </div>
          <div class="col-12">
            <button type="submit" class="btn btn-primary">Sign in</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bi-clipboard-data {
  font-size: 1.33rem;
}

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
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.container {
  margin-top: 20rem;
  position: absolute;
  left: 50%;
  padding: 1rem 1rem 5rem 1rem;
  background-color: white;
  transform: translateY(-48rem) translateX(-50%);
  border-radius: 9px;
  padding: 3rem;
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
