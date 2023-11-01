const express = require('express');
const controller = require('./shop.controller');
const authMiddlewares = require('../auth/auth.middlewares');

const router = express.Router();

//Get all shops
router.get('/', controller.getAll);
//Get one barber shop data by id
router.get('/:id', controller.getShop);

//Create a new barber shop
router.post('/create', authMiddlewares.isLoggedIn, controller.createShop);

//Delete your barber shop
router.delete(
  '/delete/:id',
  authMiddlewares.isLoggedIn,
  controller.deleteShop,
);

//Edit your barber shop
router.patch('/edit', authMiddlewares.isLoggedIn, controller.editShop);

module.exports = router;
