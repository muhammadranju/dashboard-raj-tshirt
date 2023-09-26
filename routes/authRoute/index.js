const router = require("express").Router();
const authLoginAndSignupRoute = require("./authLoginAndSignupRoute");

router.use("/auth", authLoginAndSignupRoute);
module.exports = router;
