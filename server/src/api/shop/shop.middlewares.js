const shops = require('./shop.model');

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
 * @param {import('joi').Schema} schema
<<<<<<< HEAD
<<<<<<< HEAD
=======
 * @returns next() vagy next(error)
>>>>>>> a04912548f01acec2f6774981ff8043c74bfdf98
=======
 * @returns next() vagy next(error)
>>>>>>> a04912548f01acec2f6774981ff8043c74bfdf98
 */
const validateSchema = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
<<<<<<< HEAD
<<<<<<< HEAD
  } catch (error) {
    res.status(422);
    next(error);
=======
  } catch (err) {
    res.status(422);
    next(err);
>>>>>>> a04912548f01acec2f6774981ff8043c74bfdf98
=======
  } catch (err) {
    res.status(422);
    next(err);
>>>>>>> a04912548f01acec2f6774981ff8043c74bfdf98
  }
};

module.exports = { isMine, validateSchema };
