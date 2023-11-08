const reservations = require('./reservations.model');
const services = require('../services/services.model');

/**
 * * Ellenőrzi, hogy meg van-e erősítva már a foglalás
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
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

/**
 * * Ellenőrzi, hogy szabad-e a kiválasztott időpont
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */

const shopServiceConnection = async (req, res, next) => {
  try {
    const {
      body: { serviceId, shopId },
    } = req;

    // Service lekérése ID alapján, ahol shopId = shopId
    const service = await services.findOne({ _id: serviceId, shopId });

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
 * * Ellenőrzi a kapott séma alapján, hogy a megadott adatok helyesek-e
 * @param {import('joi').Schema} schema
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

/**
 * * Ellenőrzi, hogy szabad-e a kiválasztott időpont
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const checkIfAvailable = async (req, res, next) => {
  try {
    const {
      body: { shopId, appointment },
    } = req;

    const result = await reservations.findOne({
      shopId,
      appointment,
    });

    if (result) {
      res.status(409);
      throw new Error('Már van ekkorra foglalva időpont.');
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  isVerified,
  shopServiceConnection,
  validateSchema,
  checkIfAvailable,
};
