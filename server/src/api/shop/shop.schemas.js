const Joi = require('joi');

<<<<<<< HEAD
const upload = Joi.object({
  name: Joi.string()
    .min(4)
    .max(32)
    .pattern(/^[\w\-\s]+$/)
    .required(),

  location: Joi.string().min(10).max(200).required(),
  phone: Joi.string().min(9).max(12).required(),
  open: Joi.string().min(5).max(30).required(),
});

const update = Joi.object({
  name: Joi.string()
    .min(4)
    .max(32)
    .pattern(/^[\w\-\s]+$/),

  location: Joi.string().min(10).max(200),
  phone: Joi.string().min(9).max(12),
  open: Joi.string().min(5).max(30),
})
  .or('name', 'location', 'phone', 'open')
  .required();

module.exports = { upload, update };
=======
>>>>>>> a04912548f01acec2f6774981ff8043c74bfdf98
const newShop = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  ownerId: Joi.string().required(),
  location: Joi.string().min(10).required(),
  phone: Joi.string().min(10).max(11).optional(),
  open: Joi.string().optional(),
});

// exportálás
module.exports = { newShop };
