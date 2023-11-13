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

const validateType = async (req, res, next) => {
  try {
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const { fileTypeFromFile } = await import('file-type');
    const meta = await fileTypeFromFile(req.file.path);

    if (!meta) throw new Error('File is not allowed.');
    if (!whitelist.includes(meta.mime)) throw new Error('File is not allowed.');

    // move file from tmp to public
    const { PUBLIC_IMAGES_PATH } = process.env;
    const publicImageDirs = PUBLIC_IMAGES_PATH.split('/');
    const publicImagesPath = path.join(
      __dirname,
      '..',
      '..',
      ...publicImageDirs,
      req.file.filename,
    );

    await fs.rename(req.file.path, publicImagesPath);

    const [, safePublicPath] = publicImagesPath
      .replaceAll('\\', '/')
      .split('src/');

    req.file.publicPath = safePublicPath;

    console.log(
      `File successfully moved file from: ${req.file.path} -> ${publicImagesPath}`,
    );

    next();
  } catch (error) {
    await fs.unlink(req.file.path).catch((e) => console.error(e));
    console.log(`File removed from ${req.file.path}`);
    next(error);
  }
};

module.exports = { isMine, validateSchema, validateType };
