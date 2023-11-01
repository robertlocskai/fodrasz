const express = require('express');
const volleyball = require('volleyball');
const helmet = require('helmet');
const cors = require('cors');
const middlewares = require('./app.middlewares');
const auth = require('./api/auth/auth.routes');

// create express app instance
const app = express();

// middlewares
app.use(volleyball);
app.use(helmet());
app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', auth);

// error handler
app.use(middlewares.errorHandler);

// export
module.exports = app;
