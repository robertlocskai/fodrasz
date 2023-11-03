const express = require('express');
const controller = require('./shop.controller');
const middlewares = require('./shop.middlewares');
const authMiddlewares = require('../auth/auth.middlewares');

const router = express.Router();

// Get all shops
router.get('/', controller.getAll);

// Get logged in user's barber shops
router.get('/logged-in', controller.getByJWT);

// Get one barber shop data by id
router.get('/:id', controller.getById);

// Create a new barber shop
router.post('/create', authMiddlewares.isLoggedIn, controller.createShop);

// Delete your barber shop
router.delete(
  '/delete/:id',
  authMiddlewares.isLoggedIn,
  middlewares.isMine,
  controller.deleteShop,
);

// Edit your barber shop
router.patch(
  '/edit/:id',
  authMiddlewares.isLoggedIn,
  middlewares.isMine,
  controller.editShop,
);

module.exports = router;
