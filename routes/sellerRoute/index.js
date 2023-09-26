const router = require("express").Router();
const sellerAuth = require("./sellerRoute");
router.use("/seller/auth", sellerAuth);
module.exports = router;
