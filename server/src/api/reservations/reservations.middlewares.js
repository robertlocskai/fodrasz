const reservations = require('./reservations.model');

const isVerified = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const result = await reservations.findOne({ _id: id });

    if (!result) {
      res.status(404);
      throw new Error("Couldn't get the reservation.");
    }

    if (result.verified) {
      res.status(409);
      throw new Error('This reservation is already verified!');
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { isVerified };
