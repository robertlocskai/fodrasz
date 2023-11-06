const express = require('express');
const controller = require('./reservations.controller');
const authMiddlewares = require('../auth/auth.middlewares');
const middlewares = require('./reservations.middlewares');

const router = express.Router();

// Lekéri a foglalásokat a reservationID alapján
router.get('/:id', controller.getById);

// Lekéri a foglalásokat a shopID alapján
router.get('/shop/:id', controller.getByShopId);

// Lekéri a foglalásokat a serviceID alapján
router.get('/service/:id', controller.getByServiceId);

// Új időpont foglalása
router.post('/reserve', controller.newReservation);

// Foglalt időpont visszaigazolása emailben
router.post(
  '/verify/:id',
  middlewares.isVerified,
  controller.verifyReservation,
);

// Törli a foglalást az id alapján (reservationID)
router.delete('/delete/:id', controller.del);
module.exports = router;
