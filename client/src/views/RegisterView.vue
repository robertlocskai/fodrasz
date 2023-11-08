<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-6 col-md-12">
        <div class="panel">
          <center><h3>Regisztráció</h3></center>
          <form>
            <div class="row">
              <div class="col-6">Vezetéknév</div>
              <div class="col-6">Keresztnév</div>
            </div>
            <div class="row">
              <div class="col-6">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Vezetéknév..."
                  name="vezeteknev"
                  id="vezeteknev"
                />
              </div>
              <div class="col-6">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Keresztnév..."
                  name="keresztnev"
                  id="keresztnev"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-12">E-mail</div>
            </div>
            <div class="row">
              <div class="col-12">
                <input
                  type="email"
                  class="form-control"
                  placeholder="E-mail..."
                  name="email"
                  id="email"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-12">Jelszó</div>
            </div>
            <div class="row">
              <div class="col-12">
                <input
                  type="password"
                  class="form-control"
                  placeholder="********"
                  name="password"
                  id="password"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-12">Jelszó mégegyszer</div>
            </div>
            <div class="row">
              <div class="col-12">
                <input
                  type="password"
                  class="form-control"
                  placeholder="********"
                  name="passwordagain"
                  id="passwordagain"
                />
              </div>
            </div>
            <div class="row justify-content-center">
              <div class="col-12 d-flex justify-content-center">
                <button type="submit" class="btn btn-primary mt-3 mb-3">Regisztráció</button>
              </div>
            </div>
            <div class="row">
              <div class="logintext col-12 d-flex justify-content-center">
                Van már profilod?&nbsp;<a href="#">Jelentkezz be!</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.panel {
  width: auto;
  padding: 3rem 4rem;
  background-color: white;
  border-radius: 9px;
}

.logintext,
.logintext a {
  font-size: 12px;
}

.row {
  margin-top: 0.5rem;
}

h3 {
  font-weight: bold;
}

form {
  margin-top: 2.5rem;
}

@media (max-width: 576px) {
  .panel {
    padding: 1rem 1rem;
  }
}
</style>
