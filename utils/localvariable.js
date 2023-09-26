const localvariable = (req, res, next) => {
    req.user;
    return next();
};

module.exports = localvariable;
