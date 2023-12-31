const express = require('express');
const controller = require('./reservations.controller');
const authMiddlewares = require('../auth/auth.middlewares');
const middlewares = require('./reservations.middlewares');
const schemas = require('./reservations.schemas');

const router = express.Router();

// Lekéri a foglalásokat a reservationID alapján
router.get('/:id', controller.getById);

// Lekéri a foglalásokat a shopID alapján
router.get('/shop/:id', controller.getByShopId);

// Lekéri a foglalásokat a serviceID alapján
router.get('/service/:id', controller.getByServiceId);

// Új időpont foglalása
router.post(
  '/reserve',
  middlewares.shopServiceConnection,
  middlewares.validateSchema(schemas.upload),
  middlewares.checkIfAvailable,
  controller.newReservation,
);

// Foglalt időpont visszaigazolása emailben
router.get('/verify/:token', controller.verifyReservation);

// Törli a foglalást az id alapján (reservationID)
router.delete('/delete/:id', controller.deleteReservation);
module.exports = router;
