const express = require('express');
const controller = require('./shop.controller');

const router = express.Router();

//Get all shops
router.get('/', controller.getAll);
//Get one barber shop data by id
router.get('/:id', controller.getShop);

//Create a new barber shop
router.post('/create', controller.createShop);

//Delete your barber shop
router.delete('/delete', controller.deleteShop);

//Edit your barber shop
router.patch('/edit', controller.editShop);

module.exports = router;
