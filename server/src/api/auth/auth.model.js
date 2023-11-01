const db = require('../../db/connection');

const barbers = db.get('barbers');

module.exports = barbers;
