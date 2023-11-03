const db = require('../db/connection');

const barbers = db.get('barbers');

const clearDatabase = async () => {
  try {
    await barbers.remove({});
  } catch (error) {
    console.error({ error });
  }
};

module.exports = {
  clearDatabase,
};
