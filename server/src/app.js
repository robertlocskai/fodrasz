const express = require('express');
const volleyball = require('volleyball');
const helmet = require('helmet');
const cors = require('cors');
const middlewares = require('./app.middlewares');
const authMiddlewares = require('./api/auth/auth.middlewares');
const auth = require('./api/auth/auth.routes');
const shop = require('./api/shop/shop.routes');
const services = require('./api/services/services.routes');
const reservations = require('./api/reservations/reservations.routes');

// create express app instance
const app = express();

// middlewares
app.use(volleyball);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(authMiddlewares.processAuthToken);
app.use(authMiddlewares.checkTokenSetUser);

// routes
app.use('/api/auth', auth);
app.use('/api/shop', shop);
app.use('/api/services', services);
app.use('/api/reservations', reservations);

app.get('/', (_req, res) => {
  res.json({ message: 'Homepage' });
});

// error handler
app.use(middlewares.errorHandler);

// export
module.exports = app;

// home page flow
// GET /api/shops/ => megkapjuk az összes fodrászatot
// - amikor a felhasználó kiválaszt egy fodrászatot,
//   elkerül egy ilyen linkre .../fodraszat/id
// - ezen az oldalon a fodrászat id-ja alapján,
//   lekrédezzük a szolgáltatásokat
// - amikor a felhasználó rákattint egy szolgáltatásra,
//   lekérdezzük az adott foglalásokat a szolgáltatás id-ja alapján,
//   a foglalásoknál a személyes adatok ne jelenjenek meg
