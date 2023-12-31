const services = require('./services.model');
const shops = require('../shop/shop.model');

/**
 * * Lekérdezi az adott szolgáltatást az id alapján (serviceID)
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const getById = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const allServices = await services.findOne({ _id: id });

    if (!allServices) {
      res.status(404);
      throw new Error('Nem lehetett lekérni ezt a szolgáltatást.');
    }

    res.status(200).send({ allServices });
  } catch (err) {
    next(err);
  }
};

/**
 * * Lekérdezi az ÖSSZES szolgáltatást ami az adott fodrászathoz tartozik (shopId)
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const getByShopId = async (req, res, next) => {
  try {
    const {
      params: { id: shopId },
    } = req;

    const shopServices = await services.find({ shopId });
    if (!shopServices) {
      res.status(404);
      throw new Error('There are no services stored in the database.');
    }

    res.json({ shopServices });
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
const createService = async (req, res, next) => {
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

const updateService = async (req, res, next) => {
  try {
    const {
      params: { id },
      body,
    } = req;

    const result = await services.findOneAndUpdate(
      { _id: id },
      { $set: { ...body } },
    );

    if (!result) {
      res.status(409);
      throw new Error('Nem lehetett végrehajtani a kérést.');
    }

    res.status(200).send({ result });
  } catch (err) {
    next(err);
  }
};

const deleteService = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const result = await services.remove({ _id: id });

    if (!result) {
      res.status(409);
      throw new Error('Nem lehetett végrehajtani a kérést.');
    }

    res.json('Szolgáltatás sikeresen törölve.');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getById,
  getByShopId,
  createService,
  updateService,
  deleteService,
};
