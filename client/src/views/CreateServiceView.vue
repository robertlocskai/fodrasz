<script setup>
import { useServiceStore } from '../stores/service';

// stores
const serviceStore = useServiceStore();

// functions
async function handleSubmit() {
  try {
    await serviceStore.createService();
  } catch (err) {
    console.error({ err });
  }
}
</script>

<template>
  <div class="hero">
    <div class="heroText d-none">
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
      <div class="h3 text-center">Szolgáltatás hozzáadása</div>
      <div class="h5 my-5">
        <span class="p-3 border border-dark rounded"
          >Adatok <i class="bi bi-clipboard-data"></i
        ></span>
      </div>

      <div class="col-6">
        <form @submit.prevent="handleSubmit" class="row g-3">
          <div class="col-md-6">
            <label for="inputName" clagis="form-label">Fodrászat neve</label>
            <input type="text" class="form-control" id="inputName" />
          </div>
          <div class="col-md-6">
            <label for="inputPhone" class="form-label">Telefonszám</label>
            <input type="tel" class="form-control" id="inputPhone" />
          </div>
          <div class="col-6">
            <label for="inputAddress" class="form-label">Cím</label>
            <input
              type="text"
              class="form-control"
              id="inputAddress"
              placeholder="Pl.: Kenyérmező utca 5"
            />
          </div>

          <div class="col-md-12">
            <div class="h5 my-5">
              <span class="p-3 border border-dark rounded"
                >Nyitvatartás <i class="bi bi-calendar-week"></i
              ></span>
            </div>
            <div class="row">
              <div class="col-md-4">
                <h6>Hétköznap</h6>
                <label for="inputOpenWorkdays" class="form-label">Nyitás</label>
                <input
                  type="time"
                  class="form-control mb-3"
                  name="inputOpenWorkdays"
                  id="inputOpenWorkdays"
                />

                <label for="inputCloseWorkdays" class="form-label">Zárás</label>
                <input
                  type="time"
                  class="form-control"
                  name="inputCloseWorkdays"
                  id="inputCloseWorkdays"
                />
              </div>

              <div class="col-md-4">
                <h6>Szombat</h6>
                <label for="inputOpenSaturday" class="form-label mb-0">Nyitás</label>
                <input
                  type="time"
                  class="form-control mb-3"
                  name="inputOpenSaturday"
                  id="inputOpenSaturday"
                />

                <label for="inputCloseSaturday" class="form-label mb-0">Zárás</label>
                <input
                  type="time"
                  class="form-control mb-2"
                  name="inputCloseSaturday"
                  id="inputCloseSaturday"
                />

                <div>
                  <input type="checkbox" class="form-check-input" id="closedCheckSaturday" />
                  <label class="form-check-label ms-2" for="closedCheckSaturday">Zárva?</label>
                </div>
              </div>

              <div class="col-md-4">
                <h6>Vasárnap</h6>
                <label for="inputOpenSunday" class="form-label mb-0">Nyitás</label>
                <input
                  type="time"
                  class="form-control mb-3"
                  name="inputOpenSunday"
                  id="inputOpenSunday"
                />

                <label for="inputCloseSunday" class="form-label mb-0">Zárás</label>
                <input
                  type="time"
                  class="form-control mb-2"
                  name="inputCloseSunday"
                  id="inputCloseSunday"
                />

                <div>
                  <input type="checkbox" class="form-check-input" id="closedCheckSunday" />
                  <label class="form-check-label ms-2" for="closedCheckSunday">Zárva?</label>
                </div>
              </div>
            </div>
          </div>

          <div class="h5 mt-5 mb-4">
            <span class="p-3 border border-dark rounded">Képek <i class="bi bi-images"></i></span>
          </div>

          <div class="col-md-10 mb-4">
            <label for="photos" class="form-label">Képek a fodrászatról</label>
            <input class="form-control" type="file" id="photos" name="photos" multiple />
          </div>

          <div class="col-12">
            <button type="submit" class="btn btn-primary">Fodrászat hozzáadása</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bi {
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
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.container {
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
