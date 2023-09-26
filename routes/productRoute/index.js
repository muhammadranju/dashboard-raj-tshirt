const router = require("express").Router();
const productRoute = require("./productRoute");
const manageProductRoute = require("./manageProductRoute");

router.use("/product", productRoute);
router.use("/apps/product", manageProductRoute);

module.exports = router;
