const errorHandler = (err, req, res, next) => {
  const errStatus = err.statusCode || res.statusCode || 500;
  const errMsg = err.message || 'Something went wrong (unknown error)';

  console.log('=======================');
  console.log({ err });

  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: err.stack,
  });

  console.log('=======================');
};

module.exports = { errorHandler };
