const createError = require("http-errors");
const notFoundError = (_req, _res, next) => {
    next(createError.NotFound());
};
const serverError = (err, _req, res, _next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            success: err.successCode,
            message: err.message,
        },
    });
};

module.exports = {
    notFoundError,
    serverError,
};
