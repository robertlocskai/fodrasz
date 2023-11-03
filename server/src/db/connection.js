const monk = require('monk');
require('dotenv').config();

const { TEST_DB_URI, MONGO_DB_URI } = process.env;

// use test database in test mode otherwise use default db
const isInTest = typeof global.it === 'function';
const dbUri = isInTest ? TEST_DB_URI : MONGO_DB_URI;

const db = monk(dbUri);

db.then(() => console.log('Successfully connected to MongoDB'));

module.exports = db;
