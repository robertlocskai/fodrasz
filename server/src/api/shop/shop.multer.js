const path = require('path');
const multer = require('multer');
const { v4: uuid } = require('uuid');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { TMP_IMAGES_PATH } = process.env;
    const tmpImageDirs = TMP_IMAGES_PATH.split('/');
    const tmpImagesPath = path.join(__dirname, '..', '..', ...tmpImageDirs);

    cb(null, tmpImagesPath);
  },

  filename: (req, file, cb) => {
    const [name, ext] = file.originalname.split('.');
    cb(null, `${name.trim()}-${uuid()}.${ext}`);
  },
});

const whitelist = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

const fileFilter = (req, file, cb) => {
  if (!whitelist.includes(file.mimetype)) {
    const error = new Error('File is not allowed.');
    return cb(error);
  }

  cb(null, true);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
