const express = require('express');
const controller = require('./shop.controller');
const middlewares = require('./shop.middlewares');
const schemas = require('./shop.schemas');
const authMiddlewares = require('../auth/auth.middlewares');

const router = express.Router();

// Get all shops
router.get('/', controller.getAll);

// Get logged in user's barber shops
router.get('/logged-in', authMiddlewares.isLoggedIn, controller.getByJWT);

// Get one barber shop data by id
router.get('/:id', controller.getById);

// Create a new barber shop
router.post(
  '/create',
  authMiddlewares.isLoggedIn,
  middlewares.validateSchema(schemas.upload),
  controller.createShop,
);

// Edit your barber shop
router.patch(
  '/edit/:id',
  authMiddlewares.isLoggedIn,
  middlewares.isMine,
  middlewares.validateSchema(schemas.update),
  controller.editShop,
);

// Delete your barber shop
router.delete(
  '/delete/:id',
  authMiddlewares.isLoggedIn,
  middlewares.isMine,
  controller.deleteShop,
);

module.exports = router;
