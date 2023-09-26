const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");
const cookie = require("cookie-parser");
const flash = require("connect-flash");
const localvariable = require("../utils/localvariable");

const middlewares = [
    express.json(),
    express.urlencoded({ extended: true }),
    cors(),
    morgan("dev"),
    cookie(process.env.COOKIE_KYE),
    session({
        httpOnly: true,
        secret: process.env.SESSION_KYE,
        cookie: { maxAge: 24 * 60 * 60 * 1000, secure: true },
        resave: false,
        saveUninitialized: true,
    }),
    flash(),
];
module.exports = middlewares;
