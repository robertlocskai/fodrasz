const db = require('../../db/connection');

const reservations = db.get('reservations');

module.exports = reservations;
