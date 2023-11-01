const monk = require('monk');
require('dotenv').config();

const { MONGO_DB_URI } = process.env;

const db = monk(MONGO_DB_URI);

db.then(() => console.log('Successfully connected to MongoDB'));

module.exports = db;
