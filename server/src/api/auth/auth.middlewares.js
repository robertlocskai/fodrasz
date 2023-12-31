const jwt = require('jsonwebtoken');

/**
 * * Feldolgozza a felhasználó által küldött auth tokent, és beállítja a req.authToken-be
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const processAuthToken = (req, res, next) => {
  // kiszedjük a req-ből a felhasználó által küldött tokent
  const {
    headers: { authorization: rawToken },
  } = req;

  // ha nem küldött tokent, visszatérünk
  if (!rawToken) return next();

  // megszerezzük a tokent az előre beállított prefix alapján
  const prefix = 'Bearer ';
  const [, token] = rawToken.split(prefix);

  req.authToken = token;

  next();
};

/**
 * * Hitelesíti a felhasználó tokenjét, és beállítja a tartalmát a req.user-be
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const checkTokenSetUser = (req, res, next) => {
  // ha nincs token beállítva, visszatérünk
  if (!req.authToken) return next();

  // ha van tokenünk, ellenőrizzük
  jwt.verify(req.authToken, process.env.SECRET, (err, user) => {
    // ha nem érvényes a token, kiirjuk a hibát
    if (err)
      return console.error(
        `Failed to authenticate token: ${err.message || err}`,
      );

    // ha érvényes a token, elmentjük a tartalmát a req-be
    req.user = user;
  });

  next();
};

/**
 * * Értesíti a felhasználót, hogy nem jogosult az adott művelethez
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const unAuthorized = (res, next) => {
  const error = new Error('Unauthorized request!');

  res.status(401);
  next(error);
};

/**
 * * Ellenőrzi, hogy az adott felhasználó be van-e jelentkezve
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const isLoggedIn = (req, res, next) => {
  if (!req.user) return unAuthorized(res, next);
  next();
};

/**
 * * Ellenőrzi hogy az adott felhasználó rendelkezik admin jogosultsággal
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const isAdmin = (req, res, next) => {
  if (req.role !== 'admin') return unAuthorized(res, next);
  next();
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

// exportálás
module.exports = {
  processAuthToken,
  checkTokenSetUser,
  unAuthorized,
  isLoggedIn,
  isAdmin,
  validateSchema,
};
