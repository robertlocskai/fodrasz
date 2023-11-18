const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const barbers = require('./auth.model');

/**
 * * A kapott felhasználói adatokat beleteszi egy tokenbe és azt elküldi a felhasználónak
 * @param {Object} user
 * @param {String} user._id - A fodrász id-ja
 * @param {String} user.firstname - A fodrász vezetékneve
 * @param {String} user.lastname - A fodrász keresztneve
 * @param {String} user.email - A fodrász email címek
 * @param {String} user.password - A fodrász jelszava
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const respondWithToken = (user, res, next) => {
  const { password, iat, exp, ...payload } = user;

  jwt.sign(payload, process.env.SECRET, { expiresIn: '6m' }, (err, token) => {
    if (err) return next(err);

    res.json({ token });
  });
};

/**
 * * Érvényesíti a felhasználó által küldött tokent, majd visszaküldi a tartalmát
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const validateJWT = async (req, res, next) => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    next(error);
  }
};

// Set létrehozása, későbbi tokenek tárolására
// ? [ötlet] adatbázisban való tárolás
const tokens = new Set();

/**
 * * Ha a felhasználó által küldött token nemsokára lejár, kicseréli egy újra és visszaküldi
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const refreshToken = async (req, res, next) => {
  try {
    const { user, authToken } = req;

    // ha a felhasználó tokenje szerepel a listában, visszatérünk egy hibaüzenettel
    if (tokens.has(authToken)) {
      res.status(409);
      throw new Error('Ezzel a tokennel már igényeltél refresh tokent!');
    }

    // lejárati idő számítása
    const expTime = user.exp * 1000;
    const currTime = new Date().getTime();
    const timeToExpire = (expTime - currTime) / 1000;
    const timeLimit = 60;

    // ha a token még több mint {timeLimit} másodpecig akív, visszatérünk egy hibaüzenettel
    if (timeToExpire > timeLimit) {
      res.status(422);
      throw new Error(
        `A megadott token még nem most fog lejárni! Kérlek próbálkozz később!`,
      );
    }

    // ha a token 60 másodpercen bellül lejár, visszaküldünk a felhasználónak egy új tokent
    respondWithToken(user, res, next);
    tokens.add(authToken);
  } catch (error) {
    next(error);
  }
};

/**
 * * Regisztrál egy felhasználót
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const signup = async (req, res, next) => {
  try {
    const {
      body: { firstname, lastname, email, password },
    } = req;

    // felhasználó kikeresése az adatbázisból {email} alapján
    const maybeUser = await barbers.findOne({ email });

    // ha létezik ilyen felhasználó, visszatérünk egy hibaüzenettel
    if (maybeUser) {
      res.status(409);
      throw new Error(
        'A megadott email cím már foglalt. Kérlek válassz másikat!',
      );
    }

    // ha nem létezik, titkosítjuk a jelszót
    const hashedPassword = await bcrypt.hash(password, 12);

    // feltöltendő adatok megadása
    const newUserPayload = {
      firstname,
      lastname,
      email,
      password: hashedPassword,
    };

    // felhasználó feltöltése adatbázisba
    const newUser = await barbers.insert(newUserPayload);

    // ha sikertelen volt a feltöltés, visszatérünk egy hibaüzenettel
    if (!newUser)
      throw new Error(
        'Nem sikerült létrehozni a fiókodat. Kérlek próbáld újra!',
      );

    respondWithToken(newUser, res, next);
  } catch (error) {
    next(error);
  }
};

/**
 * * Bejelentkeztet egy felhasználót
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const login = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;

    // felhasználó kikeresése az adatbázisból {email} alapján
    const maybeUser = await barbers.findOne({ email });

    // ha nincs találat, visszatérünk egy hibaüzenettel
    if (!maybeUser) {
      res.status(422);
      throw new Error(
        'Ilyen email címmel nem létezik fiók. Kérlek próbáld újra!',
      );
    }

    // összevetjük a felhasználó által megadott jelszót és a tárolt jelszót
    const correctPassword = await bcrypt.compare(password, maybeUser.password);

    // ha téves a jelszó, visszatérünk egy hibaüzenettel
    if (!correctPassword) {
      res.status(422);
      throw new Error('Rossz jelszót adtál meg. Kérlek próbáld újra!');
    }

    // ha helyes a jelszó, visszaküldünk egy tokent
    // ami tárolja a felhasználó adatait
    respondWithToken(maybeUser, res, next);
  } catch (error) {
    next(error);
  }
};

// exportálása
module.exports = {
  validateJWT,
  refreshToken,
  signup,
  login,
};
