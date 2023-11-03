const Joi = require('joi');

const newShop = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  ownerId: Joi.string().required(),
  location: Joi.string().min(10).required(),
  phone: Joi.string().min(10).max(11).optional(),
  open: Joi.string().optional(),
});

// exportálás
module.exports = { newShop };
