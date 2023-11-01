const shops = require('./shop.model');

//GET ALL SHOPS
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

//CREATE NEW SHOP
const createShop = async (req, res, next) => {
  try {
    const {
      body: { ownerId, name, location, phone, open },
    } = req;

    const shop = {
      ownerId: ownerId,
      name: name,
      location: location,
      phone: phone,
      open: open,
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

//Delete your barber shop
const deleteShop = async (req, res, next) => {
  try {
    const {
      body: { id: shopId },
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

//Edit your barber
const editShop = async (req, res, next) => {
  try {
    const {
      body: { id, name, location, phone, open },
    } = req;

    const editShop = await shops.update(
      { _id: id },
      { $set: { name: name, location: location, phone: phone, open: open } },
    );

    if (!editShop) {
      res.status(409);
      throw new Error("Couldn't edit your barber shop.");
    }

    res.status(200).send({ message: 'Changes were made!' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, createShop, deleteShop, editShop };
