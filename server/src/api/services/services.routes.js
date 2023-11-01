const express = require('express');

const router = express.Router();

router.get('/id', controller.getServices);

module.exports = router;
