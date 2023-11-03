const shops = require('./shop.model');

const isMine = async (req, res, next) => {
  console.log(`Shop ID: ${req.params.id}`);
  console.log(`User ID: ${req.user._id}`);
  try {
    const {
      params: { id: shopId },
    } = req;

    const shop = await shops.findOne({ _id: shopId });
    console.log(`Shop owner ID: ${shop.ownerId}`);

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
 * @param {import('joi').Schema} schema
 * @returns next() vagy next(error)
 */
const validateSchema = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    res.status(422);
    next(err);
  }
};

module.exports = { isMine, validateSchema };
