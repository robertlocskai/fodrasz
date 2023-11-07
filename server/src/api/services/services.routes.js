const express = require('express');
const controller = require('./services.controller');
const authMiddlewares = require('../auth/auth.middlewares');
const middlewares = require('./services.middlewares');
const schemas = require('./services.schemas');

const router = express.Router();

// Get all services of a shop, by the given id in the URL. id = shopId
router.get('/shop/:id', controller.getByShopId);

// Szolgáltatás lekérése ID alapján
router.get('/:id', controller.getService);

// Szolgáltatás szerkesztése ID alapján
router.patch(
  '/update/:id',
  authMiddlewares.isLoggedIn,
  middlewares.isMine,
  middlewares.validateSchema(schemas.update),
  controller.editService,
);

// Szolgáltatás törlése ID alapján
router.delete(
  '/delete/:id',
  authMiddlewares.isLoggedIn,
  middlewares.isMine,
  controller.deleteService,
);

// Add a new service *TO YOUR OWN* barber shop
router.post(
  '/add',
  authMiddlewares.isLoggedIn,
  middlewares.validateSchema(schemas.upload),
  controller.newService,
);

module.exports = router;
