const Joi = require('joi');

const upload = Joi.object({
  shopId: Joi.string().required(),
  name: Joi.string().min(4).max(35).required(),
  price: Joi.number().greater(500).required(),
  appointment: Joi.string().min(4).max(5).required(),
});

const update = Joi.object({
  name: Joi.string().min(4).max(35),
  price: Joi.number().greater(500),
  appointment: Joi.string().min(4).max(5),
})
  .or('name', 'price', 'appointment')
  .required();

module.exports = { upload, update };
