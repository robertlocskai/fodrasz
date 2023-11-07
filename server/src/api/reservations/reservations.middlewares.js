const reservations = require('./reservations.model');
const services = require('../services/services.model');

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

const shopServiceConnection = async (req, res, next) => {
  try {
    const {
      body: { serviceId, shopId },
    } = req;

    //Service lekérése ID alapján, ahol shopId = shopId
    const service = await services.findOne({ _id: serviceId, shopId: shopId });

    if (!service) {
      res.status(404);
      throw new Error(
        'Nincs ilyen szolgáltatás, melynek ez a fodrászat a tulajdonosa.',
      );
    }

    next();
  } catch (err) {
    next(err);
  }
};

/**
 * @param {import('joi').Schema} schema
 * @returns next() vagy next(error)
 */
const validateSchema = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(422);
    next(error);
  }
};

module.exports = { isVerified, shopServiceConnection, validateSchema };
