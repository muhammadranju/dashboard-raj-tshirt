const router = require("express").Router();

router.use(require("./homeRoute"));
router.use(require("./authRoute"));
router.use(require("./productRoute"));
router.use(require("./categoryRoute"));
router.use(require("./sellerRoute"));
router.use(require("./settingRoute"));

module.exports = router;
