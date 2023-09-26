function error(message = "Something want wrong", status = 500, successCode) {
    const e = new Error(message);
    e.status = status;
    e.successCode = successCode;
    return e;
}

module.exports = error;
