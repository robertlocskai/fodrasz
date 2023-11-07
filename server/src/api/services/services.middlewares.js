const services = require('./services.model');
const shops = require('../shop/shop.model');

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

module.exports = { isMine, validateSchema };
