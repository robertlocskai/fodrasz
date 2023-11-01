const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const barbers = require('./auth.model');

/**
 * Regisztrál egy felhasználót
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const signup = async (req, res, next) => {
  try {
    const {
      body: { name, email, password },
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
      name,
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

    jwt.sign(newUser, process.env.SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) return next(err);
      res.json({ token });
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Bejelentkeztet egy felhasználót
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
    jwt.sign(
      maybeUser,
      process.env.SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) return next(err);
        res.json({ token });
      },
    );
  } catch (error) {
    next(error);
  }
};

// exportálása
module.exports = {
  signup,
  login,
};
