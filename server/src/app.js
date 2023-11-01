const express = require('express');
const volleyball = require('volleyball');
const helmet = require('helmet');
const cors = require('cors');
const middlewares = require('./app.middlewares');
const auth = require('./api/auth/auth.routes');
const shop = require('./api/shop/shop.routes');
const services = require('./api/services/services.routes');

// create express app instance
const app = express();

// middlewares
app.use(volleyball);
app.use(helmet());
app.use(cors());
app.use(express.json());

// routes
//app.use('/api/auth', auth);
app.use('/api/shop', shop);
app.use('/api/services', services);

// error handler
app.use(middlewares.errorHandler);

// export
module.exports = app;
