const Joi = require('joi');

const upload = Joi.object({
  shopId: Joi.string().required(),
  name: Joi.string().min(4).max(35).required(),
  price: Joi.number().greater(500).required(),
  time: Joi.string().min(4).max(5).required(),
});

const update = Joi.object({
  name: Joi.string().min(4).max(35),
  price: Joi.number().greater(500),
  time: Joi.string().min(4).max(5),
})
  .or('name', 'price', 'time')
  .required();

module.exports = { upload, update };
