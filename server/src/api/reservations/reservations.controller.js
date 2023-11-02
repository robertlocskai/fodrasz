const reservations = require('./reservations.model');

const getReservations = async (req, res, next) => {
  try {
    const {
      params: { id: shopId },
    } = req;

    const result = await reservations.find({ shopId: shopId, verified: true });

    if (!result) {
      res.status(404);
      throw new Error("Couldn't get the reservations from the database.");
    }

    return res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

const newReservation = async (req, res, next) => {
  try {
    const {
      body: { shopId, serviceId, appointment, name, email, phone, verified },
    } = req;

    const reservation = {
      shopId: shopId,
      serviceId: serviceId,
      appointment: appointment,
      name: name,
      email: email,
      phone: phone,
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

module.exports = { getReservations, newReservation, verifyReservation };
