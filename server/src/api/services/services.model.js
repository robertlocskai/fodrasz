const db = require('../../db/connection');

const services = db.get('services');

module.exports = services;
