const router = require("express").Router();
const sellerAuth = require("../../controllers/sellerController/sellerAuthController");
const auth = require("../../middlewares/authMiddleware");

router.get("/login", sellerAuth.sellerGetLoginController);
router.post("/login", sellerAuth.sellerPostLoginController);

router.get("/signup", sellerAuth.sellerGetSugnupController);
router.post("/signup", sellerAuth.sellerPostSugnupController);

router.get(
    "/change-password",
    auth.sellerMiddleware,
    sellerAuth.sellerGetChangePasswordController
);
router.post(
    "/change-password",
    auth.sellerMiddleware,
    sellerAuth.sellerPostChangePasswordController
);

router.get("/forgot-password", sellerAuth.sellerGetForgotPasswordController);
router.post("/forgot-password", sellerAuth.sellerPostForgotPasswordController);

router.post(
    "/logout",
    auth.sellerMiddleware,
    sellerAuth.sellerPostLogoutController
);

module.exports = router;
