const db = require('../../db/connection');

const shops = db.get('shops');

module.exports = shops;
