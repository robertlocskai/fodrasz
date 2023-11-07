const express = require('express');
const controller = require('./services.controller');

const router = express.Router();

// Get all services of a shop, by the given id in the URL. id = shopId
router.get('/shop/:id', controller.getByShopId);

// Szolgáltatás lekérése ID alapján
router.get('/:id', controller.getService);

//Szolgáltatás szerkesztése ID alapján

//Szolgáltatás törlése ID alapján

// Add a new service *TO YOUR OWN* barber shop
router.post('/add', controller.newService);

module.exports = router;
