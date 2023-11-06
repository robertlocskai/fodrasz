const reservations = require('./reservations.model');

/**
 * * Visszaadja az adott foglalást (reservationID)
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const getById = async (req, res, next) => {
  try {
    const {
      params: { id: reservationId },
    } = req;

    const reservation = await reservations.findOne({ _id: reservationId });

    if (!reservation) {
      res.status(404);
      throw new Error('Nem sikerült lekérni a foglalásodat az adatbázisból!');
    }

    res.json({ reservation });
  } catch (error) {
    next(error);
  }
};

/**
 * * Visszaadja az ÖSSZES foglalást, amely egy adott fodrászathoz tartozik (shopID)
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const getByShopId = async (req, res, next) => {
  try {
    const {
      params: { id: shopId },
    } = req;

    // ? [ötlet] - 'verified' lehet nem kell, mert így a fodrász is használhatja ezt az útvonalat
    const shopReservations = await reservations.find({
      shopId,
      verified: true,
    });

    if (!shopReservations) {
      res.status(404);
      throw new Error("Couldn't get the reservations from the database.");
    }

    res.json({ shopReservations });
  } catch (err) {
    next(err);
  }
};

/**
 * * Visszaadja az ÖSSZES foglalást, ami az adott szolgáltatáshoz
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const getByServiceId = async (req, res, next) => {
  try {
    const {
      params: { id: serviceId },
    } = req;

    const serviceReservations = await reservations.find({ serviceId });

    if (!serviceReservations) {
      res.status(422);
      throw new Error('Nem sikerült lekérni a foglalásokat! (getByServiceID)');
    }

    res.json({ serviceReservations });
  } catch (error) {
    next(error);
  }
};

/**
 * * Létrehoz egy foglalást
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const newReservation = async (req, res, next) => {
  try {
    const {
      body: { shopId, serviceId, appointment, name, email, phone },
    } = req;

    const reservation = {
      shopId,
      serviceId,
      appointment,
      name,
      email,
      phone,
      verified: false,
    };

    const result = await reservations.insert(reservation);

    if (!result) {
      res.status(409);
      throw new Error("Couldn't make the reservation.");
    }

    return res
      .status(201)
      .send({ message: 'Reservation was successfully made!' });
  } catch (err) {
    next(err);
  }
};

/**
 * * Visszaigazol egy foglalást
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const verifyReservation = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const result = await reservations.find({ _id: id });

    if (!result) {
      res.status(404);
      throw new Error("Couldn't get reservations from database.");
    }

    const verify = await reservations.findOneAndUpdate(
      { _id: id },
      { $set: { verified: true } },
    );

    if (!verify) {
      res.status(409);
      throw new Error("Couldn't verify the reservation.");
    }

    return res
      .status(200)
      .send({ message: 'Reservation successfully verified!' });
  } catch (err) {
    next(err);
  }
};

/**
 * * Töröl egy foglalást
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const del = async (req, res, next) => {
  try {
    const {
      params: { id: reservationId },
    } = req;

    const deletedReservation = await reservations.findOneAndDelete({
      _id: reservationId,
    });

    if (!deletedReservation) {
      res.status(422);
      throw new Error('Hiba történt a foglalás törlése közben!');
    }

    res.json({ deletedReservation });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getById,
  getByShopId,
  getByServiceId,
  newReservation,
  verifyReservation,
  del,
};
