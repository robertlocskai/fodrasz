const express = require('express');
const controller = require('./services.controller');
const authMiddlewares = require('../auth/auth.middlewares');
const middlewares = require('./services.middlewares');
const schemas = require('./services.schemas');

const router = express.Router();

// Szolgáltatás lekérése ID alapján (serviceID)
router.get('/:id', controller.getById);

// Get all services of a shop, by the given id in the URL. id = shopId
router.get('/shop/:id', controller.getByShopId);

// Add a new service *TO YOUR OWN* barber shop
router.post(
  '/create',
  authMiddlewares.isLoggedIn,
  middlewares.validateSchema(schemas.upload),
  controller.createService,
);

// Szolgáltatás szerkesztése ID alapján
router.patch(
  '/update/:id',
  authMiddlewares.isLoggedIn,
  middlewares.isMine,
  middlewares.validateSchema(schemas.update),
  controller.updateService,
);

// Szolgáltatás törlése ID alapján
router.delete(
  '/delete/:id',
  authMiddlewares.isLoggedIn,
  middlewares.isMine,
  controller.deleteService,
);

module.exports = router;
