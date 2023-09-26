const router = require("express").Router();
const auth = require("../../middlewares/authMiddleware");
const settingControl = require("../../controllers/settingController/settingController");
router.get("/", auth.authMiddleware, settingControl.userSettingGetController);
router.post(
    "/submit",
    auth.authMiddleware,
    settingControl.userPrivateInfoSettingPostController
);
router.patch(
    "/u/:user_id",
    auth.authMiddleware,
    settingControl.userPrivateInfoSettingUpdateController
);

module.exports = router;
