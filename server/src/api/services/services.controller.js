const services = require('./services.model');

const getServices = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
  } catch (err) {
    next(err);
  }
};

module.exports = { getServices };
