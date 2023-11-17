const express = require('express');
const controller = require('./shop.controller');
const middlewares = require('./shop.middlewares');
const schemas = require('./shop.schemas');
const authMiddlewares = require('../auth/auth.middlewares');
const upload = require('./shop.multer');

const router = express.Router();

// Get all shops
router.get('/', controller.getAll);

// Get logged in user's barber shops
router.get('/logged-in', authMiddlewares.isLoggedIn, controller.getByJWT);

// Get one barber shop data by id
router.get('/:id', controller.getById);

// Create a new barber shop
router.post(
  '/create',
  upload.array('photos', 10),
  middlewares.validateType,
  middlewares.parseJSON('open'),
  // authMiddlewares.isLoggedIn,
  // middlewares.validateType,
  // middlewares.validateSchema(schemas.upload),
  middlewares.fileRemover,
  controller.createShop,
);

// Edit your barber shop
router.patch(
  '/update/:id',
  authMiddlewares.isLoggedIn,
  middlewares.isMine,
  middlewares.validateSchema(schemas.update),
  controller.updateShop,
);

// Delete your barber shop
router.delete(
  '/delete/:id',
  authMiddlewares.isLoggedIn,
  middlewares.isMine,
  controller.deleteShop,
);

module.exports = router;
