/**
 *
 * @param {Error} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const errorHandler = (err, req, res, next) => {
  const errStatus = res.statusCode === 200 ? 500 : res.statusCode;
  const errMsg = err.message || 'Something went wrong (unknown error)';

  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: err.stack,
  });
};

module.exports = { errorHandler };
