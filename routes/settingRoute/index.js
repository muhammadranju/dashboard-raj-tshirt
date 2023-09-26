const router = require("express").Router();
const settingRoute = require("./settingRoute");
router.use("/user/setting", settingRoute);
module.exports = router;
