const router = require("express").Router();
const catControll = require("../../controllers/categoryController/categoryController");
const TestControll = require("../../controllers/categoryController/testCatController");
const auth = require("../../middlewares/authMiddleware");
router.get("/", auth.authMiddleware, catControll.getCategoryController);
router.get(
    "/sub-category",
    auth.authMiddleware,
    catControll.getSubCategoryController
);
router.get(
    "/sub-category-two",
    auth.authMiddleware,
    catControll.getSub2ndCategoryController
);
router.get(
    "/d/:delId",
    auth.authMiddleware,
    catControll.categoryDeleteController
);
router.get(
    "/api/sub-category",
    auth.authMiddleware,
    catControll.subcategoryFindByCategoryId
);
router.get(
    "/api/sub-category-two",
    auth.authMiddleware,
    catControll.subcategorytwoFindByCategoryId
);

//************TEST****** */
router.get(
    "/test-cat",
    auth.authMiddleware,
    TestControll.get_test_cat_Controller
);
router.post(
    "/api/test-cat",
    auth.authMiddleware,
    TestControll.post_test_cat_Controller
);
router.get(
    "/test-sub-cat",
    auth.authMiddleware,
    TestControll.get_test_sub_cat_Controller
);
router.post(
    "/api/test-sub-cat",
    auth.authMiddleware,
    TestControll.post_test_sub_cat_Controller
);
router.get(
    "/test-show-cat",
    auth.authMiddleware,
    TestControll.get_test_showcat_Controller
);
router.get(
    "/api/test-show-sub-category",
    auth.authMiddleware,
    TestControll.post_test_showcat_Controller
);

module.exports = router;
