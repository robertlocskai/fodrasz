const Joi = require('joi');

const cities = [
  'Bács-Kiskun',
  'Békés',
  'Baranya',
  'Borsod-Abaúj-Zemplén',
  'Budapest',
  'Csongrád',
  'Fejér',
  'Győr-Moson-Sopron',
  'Hajdú-Bihar',
  'Heves',
  'Jász-Nagykun-Szolnok',
  'Komárom-Esztergom',
  'Nógrád',
  'Pest',
  'Somogy',
  'Szabolcs-Szatmár-Bereg',
  'Tolna',
  'Vas',
  'Veszprém',
  'Zala',
];

const upload = Joi.object({
  name: Joi.string()
    .min(4)
    .max(32)
    .pattern(/^[\w\-\s]+$/)
    .required(),

  address: Joi.string().min(3).max(50).required(),
  city: Joi.string().min(3).max(35).required(),
  county: Joi.string()
    .valid(...cities)
    .required(),
  zip: Joi.number().min(4).max(4).required(),

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

  address: Joi.string().min(3).max(50),
  city: Joi.string().min(3).max(35),
  county: Joi.string().valid(...cities),
  zip: Joi.number().min(4).max(4),

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
  .or('name', 'address', 'city', 'county', 'zip', 'location', 'phone', 'open')
  .required();

module.exports = { upload, update };
