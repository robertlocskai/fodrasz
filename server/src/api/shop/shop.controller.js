const shops = require('./shop.model');

// GET ALL SHOPS
const getAll = async (req, res, next) => {
  try {
    const shopList = await shops.find({});

    if (!shopList) {
      res.status(404);
      throw new Error('No shops found in the database.');
    }

    res.status(200);
    res.json(shopList);
  } catch (err) {
    next(err);
  }
};

/**
 * * Get logged in user's barber shops
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const getByJWT = async (req, res, next) => {
  try {
    const {
      user: { _id: userId },
    } = req;

    const userShops = await shops.find({ userId });

    res.json({ userShops });
  } catch (error) {
    next(error);
  }
};

// Get one shop
const getById = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const shop = await shops.findOne({ _id: id });

    if (!shop) {
      res.status(404);
      throw new Error("Couldn't find this barber shop in the database.");
    }

    res.status(200).send(shop);
  } catch (err) {
    next(err);
  }
};

// CREATE NEW SHOP
const createShop = async (req, res, next) => {
  try {
    const {
      body: { name, location, phone, open },
    } = req;

    const shop = {
      ownerId: req.user._id,
      name,
      location,
      phone,
      open,
    };

    const newShop = await shops.insert(shop);

    if (!newShop) {
      res.status(409);
      throw new Error("Couldn't create your shop.");
    }

    return res
      .status(201)
      .send({ message: 'Barber shop successfully created.' });
  } catch (err) {
    next(err);
  }
};

// Delete your barber shop
const deleteShop = async (req, res, next) => {
  try {
    const {
      params: { id: shopId },
    } = req;

    const shopRemove = await shops.remove({ _id: shopId });

    if (!shopRemove) {
      res.status(404);
      throw new Error("Couldn't delete your shop.");
    }

    return res
      .status(200)
      .send({ message: 'Your barber shop got successfully deleted.' });
  } catch (err) {
    next(err);
  }
};

// Edit your barber
const editShop = async (req, res, next) => {
  try {
    const {
      body: { name, location, phone, open },
      params: { id },
    } = req;

    const editedShop = await shops.update(
      { _id: id },
      { $set: { name, location, phone, open } },
    );

    if (!editedShop) {
      res.status(409);
      throw new Error("Couldn't edit your barber shop.");
    }

    res.status(200).send({ message: 'Changes were made!' });
  } catch (err) {
    next(err);
  }
};

// exportálás
module.exports = {
  getAll,
  getById,
  getByJWT,
  createShop,
  deleteShop,
  editShop,
};
