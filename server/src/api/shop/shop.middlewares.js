/* eslint-disable no-restricted-syntax */
/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable no-continue */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
const fs = require('fs/promises');
const path = require('path');
const shops = require('./shop.model');

/**
 * * Ellenőrzi, hogy a felhasználó a saját szolgáltatására hivatkozott-e
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
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
 * * Ellenőrzi a kapott séma alapján, hogy a megadott adatok helyesek-e
 * @param {import('joi').Schema} schema
 */
const validateSchema = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    res.status(422);
    next(error);
  }
};

const whitelist = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

/**
 * * validateType fn
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const validateType = async (req, res, next) => {
  try {
    const { fileTypeFromFile } = await import('file-type');
    const { files } = req;

    const filesToRemove = new Set();
    const errorMessages = new Set();

    const { PUBLIC_IMAGES_PATH } = process.env;
    const publicImageDirs = PUBLIC_IMAGES_PATH.split('/');

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const meta = await fileTypeFromFile(file.path);

      if (!meta) {
        errorMessages.add('File is not allowed');
        filesToRemove.add(file.path);
        continue;
      }

      if (!whitelist.includes(meta.mime)) {
        errorMessages.add('File is not allowed');
        filesToRemove.add(file.path);
        continue;
      }

      const publicImagesPath = path.join(
        __dirname,
        '..',
        '..',
        ...publicImageDirs,
        file.filename,
      );

      await fs.rename(file.path, publicImagesPath);

      const [, safePublicPath] = publicImagesPath
        .replaceAll('\\', '/')
        .split('src/');

      req.files[i].publicPath = safePublicPath;

      console.log(
        `File successfully moved file from: ${file.path} -> ${publicImagesPath}`,
      );
    }

    req.filesToRemove = filesToRemove;
    req.errorMessages = errorMessages;

    next();
  } catch (error) {
    // await fs.unlink(req.file.path).catch((e) => console.error(e));
    // console.log(`File removed from ${req.file.path}`);
    next(error);
  }
};
/**
 * * validateType fn
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const fileRemover = async (req, res, next) => {
  try {
    const { filesToRemove } = req;

    for (const filePath of filesToRemove) {
      await fs.unlink(filePath);
      console.log(`Removed file from ${filePath}`);
    }

    next();
  } catch (err) {
    next(err);
  }
};

/**
 * * parseJSON fn
 * @param {import('express').Response} key
 */
const parseJSON = (key) => (req, res, next) => {
  try {
    const result = JSON.parse(req.body[key]);

    req.body[key] = result;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  isMine,
  validateSchema,
  validateType,
  parseJSON,
  fileRemover,
};
