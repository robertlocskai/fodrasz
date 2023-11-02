const services = require('./services.model');
const shops = require('../shop/shop.model');

const getServices = async (req, res, next) => {
  try {
    const {
      params: { id: shopId },
    } = req;

    const allServices = await services.find({ shopId: shopId });

    if (!allServices) {
      res.status(404);
      throw new Error('There are no services stored in the database.');
    }

    return res.status(200).send(allServices);
  } catch (err) {
    next(err);
  }
};

const newService = async (req, res, next) => {
  try {
    const {
      user: { _id: userId },
      body: { name, price, appointment },
    } = req;

    //Lekérjük a shopot ami a useré
    const shop = await shops.find({ ownerId: userId });

    if (!shop) {
      res.status(404);
      throw new Error("You don't have a barber shop attached to your account!");
    }
    //Kiszedjük a shop ID-jét, hogy az új service-ben belerakhassuk a shopId-be.
    const shopId = shop[0]._id.toString();

    const service = {
      shopId: shopId,
      name: name,
      price: price,
      appointment: appointment,
    };

    const newService = await services.insert(service);

    if (!newService) {
      res.status(409);
      throw new Error("Couldn't add a new service.");
    }

    return res.status(201).send({ message: 'New service added successfully!' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getServices, newService };
