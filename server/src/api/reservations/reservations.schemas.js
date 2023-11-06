const Joi = require('joi');

const upload = Joi.object({
  shopId: Joi.string().required(),
  serviceId: Joi.string().required(),
  appointment: Joi.object({
    date: Joi.date().required(),
    time: Joi.string().min(4).max(5).required(),
  }).required(),
  name: Joi.string().min(5).max(35).required(),
  email: Joi.string().min(15).required(),
  phone: Joi.string().min(8).max(12).required(),
});

const update = Joi.object({
  shopId: Joi.string().required(),
  serviceId: Joi.string().required(),
  appointment: Joi.object({
    date: Joi.date().required(),
    time: Joi.string().min(4).max(5).required(),
  }).required(),
  name: Joi.string().min(5).max(35).required(),
  email: Joi.string().min(15).required(),
  phone: Joi.string().min(8).max(12).required(),
});

module.exports = { upload, update };
