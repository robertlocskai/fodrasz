const db = require('../db/connection');

const barbers = db.get('barbers');
const shops = db.get('shops');

const clearDatabase = async () => {
  try {
    await barbers.remove({});
    await shops.remove({});
  } catch (error) {
    console.error({ error });
  }
};

module.exports = {
  clearDatabase,
};
