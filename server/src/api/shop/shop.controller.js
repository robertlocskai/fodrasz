const shops = require('./shop.model');

/**
 * * Lekérdezi az összes fodrászatot
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const getAll = async (req, res, next) => {
  try {
    const shopList = await shops.find({});

    if (!shopList) {
      res.status(404);
      throw new Error('No shops found in the database.');
    }

    res.json({ shopList });
  } catch (err) {
    next(err);
  }
};

/**
 * * Lekérdezi a bejelentkezett felhasználó fordászatait
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const getByJWT = async (req, res, next) => {
  try {
    const {
      user: { _id: userId },
    } = req;

    const userShops = await shops.find({ ownerId: userId });

    res.json({ userShops });
  } catch (error) {
    next(error);
  }
};

/**
 * * Lekérdez agy fodrászatot az id-ja alapján
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
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

    res.json({ shop });
  } catch (err) {
    next(err);
  }
};

/**
 * * Létrehoz egy fodrászatot
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
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

    res.json({ newShop });
  } catch (err) {
    next(err);
  }
};

/**
 * * Frissít egy fodrászatot az id-ja alapján
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const editShop = async (req, res, next) => {
  try {
    const {
      params: { id },
      body,
    } = req;

    const editedShop = await shops.findOneAndUpdate(
      { _id: id },
      { $set: { ...body } },
    );

    if (!editedShop) {
      res.status(409);
      throw new Error("Couldn't edit your barber shop.");
    }

    res.json({ editedShop });
  } catch (err) {
    next(err);
  }
};

/**
 * * Töröl egy fodrászatot az id-ja alapján
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const deleteShop = async (req, res, next) => {
  try {
    const {
      params: { id: shopId },
    } = req;

    const shopRemove = await shops.findOneAndDelete({ _id: shopId });

    if (!shopRemove) {
      res.status(404);
      throw new Error("Couldn't delete your shop.");
    }

    res.json({ message: 'Your barber shop got successfully deleted.' });
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
  editShop,
  deleteShop,
};
