const Joi = require('joi');

const upload = Joi.object({
  name: Joi.string()
    .min(4)
    .max(32)
    .pattern(/^[\w\-\s]+$/)
    .required(),

  location: Joi.string().min(10).max(200).required(),
  phone: Joi.string().min(9).max(12).required(),
  open: Joi.object({
    hetfo: Joi.object({
      opens: Joi.string().min(4).max(5).required(),
      closes: Joi.string().min(4).max(5).required(),
    }).optional(),
    kedd: Joi.object({
      opens: Joi.string().min(4).max(5).required(),
      closes: Joi.string().min(4).max(5).required(),
    }).optional(),
    szerda: Joi.object({
      opens: Joi.string().min(4).max(5).required(),
      closes: Joi.string().min(4).max(5).required(),
    }).optional(),
    csutortok: Joi.object({
      opens: Joi.string().min(4).max(5).required(),
      closes: Joi.string().min(4).max(5).required(),
    }).optional(),
    pentek: Joi.object({
      opens: Joi.string().min(4).max(5).required(),
      closes: Joi.string().min(4).max(5).required(),
    }).optional(),
    szombat: Joi.object({
      opens: Joi.string().min(4).max(5).required(),
      closes: Joi.string().min(4).max(5).required(),
    }).optional(),
    vasarnap: Joi.object({
      opens: Joi.string().min(4).max(5).required(),
      closes: Joi.string().min(4).max(5).required(),
    }).optional(),
  }).optional(),
});

const update = Joi.object({
  name: Joi.string()
    .min(4)
    .max(32)
    .pattern(/^[\w\-\s]+$/),

  location: Joi.string().min(10).max(200),
  phone: Joi.string().min(9).max(12),
  open: Joi.object({
    hetfo: Joi.object({
      opens: Joi.string().min(4).max(5).required(),
      closes: Joi.string().min(4).max(5).required(),
    }).optional(),
    kedd: Joi.object({
      opens: Joi.string().min(4).max(5).required(),
      closes: Joi.string().min(4).max(5).required(),
    }).optional(),
    szerda: Joi.object({
      opens: Joi.string().min(4).max(5).required(),
      closes: Joi.string().min(4).max(5).required(),
    }).optional(),
    csutortok: Joi.object({
      opens: Joi.string().min(4).max(5).required(),
      closes: Joi.string().min(4).max(5).required(),
    }).optional(),
    pentek: Joi.object({
      opens: Joi.string().min(4).max(5).required(),
      closes: Joi.string().min(4).max(5).required(),
    }).optional(),
    szombat: Joi.object({
      opens: Joi.string().min(4).max(5).required(),
      closes: Joi.string().min(4).max(5).required(),
    }).optional(),
    vasarnap: Joi.object({
      opens: Joi.string().min(4).max(5).required(),
      closes: Joi.string().min(4).max(5).required(),
    }).optional(),
  }).optional(),
})
  .or('name', 'location', 'phone', 'open')
  .required();

module.exports = { upload, update };
