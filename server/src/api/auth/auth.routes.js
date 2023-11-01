const express = require('express');
const middlewares = require('./auth.middlewares');
const schemas = require('./auth.schemas');
const controller = require('./auth.controller');

// router létrehozása
const router = express.Router();

// elérési útvonalak
router.post(
  '/signup',
  middlewares.validateSchema(schemas.signup),
  controller.signup,
);

router.post(
  '/login',
  middlewares.validateSchema(schemas.login),
  controller.login,
);

// router exportálása
module.exports = router;
