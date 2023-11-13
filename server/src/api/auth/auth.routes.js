const express = require('express');
const middlewares = require('./auth.middlewares');
const schemas = require('./auth.schemas');
const controller = require('./auth.controller');

// ROUTER LÉTREHOZÁSA
const router = express.Router();

// ELÉRÉSI ÚTVONALAK
// token tartalmának visszaküldése
router.get('/validate', controller.validateJWT);

// ha a felhasználó tokenje le fog járni, itt kérhet újat (bejelentkezés nélkül)
router.get('/refresh', middlewares.isLoggedIn, controller.refreshToken);

// itt tudnak a fordrászok regisztrálni
router.post(
  '/signup',
  middlewares.validateSchema(schemas.signup),
  controller.signup,
);

// itt tudnak a fodrászok belépni
router.post(
  '/login',
  middlewares.validateSchema(schemas.login),
  controller.login,
);

// EXPORTÁLÁS
module.exports = router;
