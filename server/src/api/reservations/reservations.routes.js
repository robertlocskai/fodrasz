const express = require('express');
const controller = require('./reservations.controller');
const authMiddlewares = require('../auth/auth.middlewares');
const middlewares = require('./reservations.middlewares');
const router = express.Router();

//A fodrászat(id) foglalásait jeleníti meg
router.get('/:id', controller.getReservations);

//Új időpont foglalása
router.post('/reserve', controller.newReservation);

//Foglalt időpont visszaigazolása emailben
router.post(
  '/verify/:id',
  middlewares.isVerified,
  controller.verifyReservation,
);

module.exports = router;
