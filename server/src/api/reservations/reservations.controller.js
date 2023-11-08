const jwt = require('jsonwebtoken');
const reservations = require('./reservations.model');
const { transporter } = require('../../email/main');

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
 * * Visszaadja az ÖSSZES foglalást, ami az adott szolgáltatáshoz tartozik (serviceID)
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

    const signedToken = await new Promise((resolve, reject) => {
      jwt.sign(
        { appointmentId: result._id },
        process.env.SECRET,
        {
          expiresIn: '12h',
        },
        (err, token) => {
          if (err) reject(err);
          resolve(token);
        },
      );
    });

    const info = await transporter.sendMail({
      from: `Globytes <${process.env.GMAIL_USERNAME}`,
      to: email,
      subject: 'Foglalás visszaigazolás',
      html: `<div>Név: ${name}</div>
             <div>Email: ${email}</div>
             <div>Telefonszám: ${phone}</div>
             <div>Időpont: ${appointment}</div>
             <div>Link: http://localhost:3000/api/reservations/verify/${signedToken}</div>`,
    });

    console.log('EMAIL WAS SENT SUCCESSFULLY');
    console.log({ info });

    res.json({ reservation });
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
      params: { token },
    } = req;

    const verifyToken = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.SECRET, (err, tokenn) => {
        if (err) reject(err);
        resolve(tokenn);
      });
    });

    const result = await reservations.find({ _id: verifyToken.appointmentId });

    if (!result) {
      res.status(404);
      throw new Error("Couldn't get reservations from database.");
    }

    const verify = await reservations.findOneAndUpdate(
      { _id: verifyToken.appointmentId },
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
const deleteReservation = async (req, res, next) => {
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
  deleteReservation,
};
