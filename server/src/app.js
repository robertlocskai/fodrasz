const express = require('express');
const volleyball = require('volleyball');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
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
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({ origin: 'http://localhost:5173' }));
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

// serve static files from /public
app.use('/public', express.static(path.join(__dirname, 'public')));

// error handler
app.use(middlewares.errorHandler);

// export
module.exports = app;
