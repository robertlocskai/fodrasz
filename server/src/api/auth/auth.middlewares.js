const jwt = require('jsonwebtoken');

/**
 * checkTokenSetUser function
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns next()
 */
const checkTokenSetUser = (req, res, next) => {
  // kiszedjük a req-ből a felhasználó által küldött tokent
  const {
    headers: { authorization: rawToken },
  } = req;

  // ha nem küldött tokent, visszatérünk
  if (!rawToken) return next();

  // megszerezzük a tokent az előre beállított prefix alapján
  const prefix = 'Bearer ';
  const [, token] = rawToken.split(prefix);

  // ha hibás a prefix, visszatérünk
  if (!token) return next();

  // ha van tokenünk, ellenőrizzük
  jwt.verify(token, process.env.SECRET, (err, user) => {
    // ha nem érvényes a token, kiirjuk a hibát
    if (err) return console.error({ err });

    // ha érvényes a token, elmentjük a tartalmát a req-be
    req.user = user;
  });

  next();
};

/**
 * Értesíti a felhasználót, hogy nem jogosult az adott művelethez
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns Error | Unauthorized request!
 */
const unAuthorized = (res, next) => {
  const error = new Error('Unauthorized request!');

  res.status(401);
  next(error);
};

/**
 * Ellenőrzi, hogy az adott felhasználó be van-e jelentkezve
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns next()
 */
const isLoggedIn = (req, res, next) => {
  if (!req.user) return unAuthorized(res, next);

  next();
};

/**
 * Ellenőrzi hogy az adott felhasználó rendelkezik admin jogosultsággal
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns next() vagy Error | Unauthorized request!
 */
const isAdmin = (req, res, next) => {
  const {
    user: { role },
  } = req;

  if (role !== 'admin') return unAuthorized(res, next);

  next();
};

/**
 * Ellenőrzi a kapott séma alapján, hogy a megadott adatok helyesek-e
 * @param {import('joi').Schema} schema
 * @returns next() vagy next(error)
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

// exportálás
module.exports = {
  checkTokenSetUser,
  unAuthorized,
  isLoggedIn,
  isAdmin,
  validateSchema,
};
