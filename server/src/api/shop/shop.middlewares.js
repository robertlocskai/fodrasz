const shops = require('./shop.model');

/**
 * * Ellenőrzi, hogy a felhasználó a saját szolgáltatására hivatkozott-e
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const isMine = async (req, res, next) => {
  try {
    const {
      params: { id: shopId },
    } = req;

    const shop = await shops.findOne({ _id: shopId });

    if (!shop) {
      res.status(404);
      throw new Error("Couldn't find a barber shop with this ID.");
    }

    if (shop.ownerId !== req.user._id) {
      res.status(401);
      throw new Error("You can't access this function.");
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
