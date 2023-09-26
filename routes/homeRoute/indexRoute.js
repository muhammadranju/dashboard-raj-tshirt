const router = require("express").Router();
const homeController = require("../../controllers/homeController/homeController");

const auth = require("../../middlewares/authMiddleware");

// router.get("/", homeController.getHomeController2);

router.get("/", auth.authMiddleware, homeController.getHomeDashbordController);

router.get("/about", auth.authMiddleware, homeController.getAboutController);

router.get(
    "/catalog",
    auth.authMiddleware,
    homeController.getSearchByQueryController
);

router.get("/logout", auth.authMiddleware, homeController.getLogoutController);
module.exports = router;
