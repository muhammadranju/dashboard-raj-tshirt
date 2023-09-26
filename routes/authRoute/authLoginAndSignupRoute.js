const router = require("express").Router();
const logiController = require("../../controllers/authController/authController");

const auth = require("../../middlewares/authMiddleware");

router.get("/login", logiController.loginGetController);
router.post("/login", logiController.loginPostController);

router.get("/signup", auth.authMiddleware, logiController.signupGetController);
router.post(
  "/signup",
  // auth.authMiddleware,
  logiController.signupPostController
);
router.post(
  "/logout",
  auth.authMiddleware,
  logiController.logoutPostController
);

module.exports = router;
