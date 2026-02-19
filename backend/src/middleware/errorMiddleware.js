'use strict';

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

// Only expose stack traces when debugging locally.
const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError' && err.path === '_id') {
    err.statusCode = 404;
    err.message = 'Resource not found';
  }

  const statusCode = err.statusCode || res.statusCode || 500;
  res.status(statusCode);

  const payload = {
    message: err.message || 'Server error',
  };

  if (process.env.NODE_ENV !== 'production') {
    payload.stack = err.stack;
  }

  res.json(payload);
};

module.exports = {
  notFound,
  errorHandler,
};
