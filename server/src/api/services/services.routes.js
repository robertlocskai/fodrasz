const express = require('express');
const controller = require('./services.controller');

const router = express.Router();

router.get('/id', controller.getServices);

module.exports = router;
