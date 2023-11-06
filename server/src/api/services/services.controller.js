const services = require('./services.model');
const shops = require('../shop/shop.model');

/**
 * * Lekérdezi az összes szolgáltatást ami az adott fodrászathoz tartozik (shopId)
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */

const getByShopId = async (req, res, next) => {
  try {
    const {
      params: { id: shopId },
    } = req;

    const allServices = await services.find({ shopId });
    if (!allServices) {
      res.status(404);
      throw new Error('There are no services stored in the database.');
    }

    res.json({ allServices });
  } catch (err) {
    next(err);
  }
};

/**
 * * Létrehoz egy szolgáltatást, amit hozzákapcsol az adott fodrászathoz (a shopId alapján)
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const newService = async (req, res, next) => {
  try {
    const {
      body: { shopId, name, price, appointment },
    } = req;

    const userShop = await shops.findOne({
      ownerId: req.user._id,
      _id: shopId,
    });

    if (!userShop) {
      res.status(422);
      throw new Error('A megadott shopID nem a te fiókodhoz tartozik');
    }

    const service = {
      shopId,
      name,
      price,
      appointment,
    };

    const insertedService = await services.insert(service);

    if (!insertedService) {
      res.status(409);
      throw new Error("Couldn't add a new service.");
    }

    res.json({ insertedService });
  } catch (err) {
    next(err);
  }
};

module.exports = { getByShopId, newService };
