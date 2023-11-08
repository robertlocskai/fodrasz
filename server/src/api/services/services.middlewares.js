const services = require('./services.model');
const shops = require('../shop/shop.model');

/**
 * * Ellenőrzi, hogy a felhasználó a saját szolgáltatására hivatkozott-e
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const isMine = async (req, res, next) => {
  try {
    const {
      params: { id },
      user: { _id: userId },
    } = req;

    const serviceResult = await services.findOne({ _id: id });

    if (!serviceResult) {
      res.status(409);
      throw new Error('Nem lehetett lekérni a szolgáltatást.');
    }

    const shopResult = await shops.findOne({
      _id: serviceResult.shopId,
      ownerId: userId,
    });

    if (!shopResult) {
      res.status(409);
      throw new Error('Nem lehetett lekérni a fodrászatot.');
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

module.exports = { isMine, validateSchema };
