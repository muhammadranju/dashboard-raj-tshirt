const router = require("express").Router();
const categoryRoute = require("./categoryRoute");
const getCategoryRoute = require("./getCategoryRoute");

router.use("/create", categoryRoute);
router.use("/category", getCategoryRoute);

module.exports = router;
