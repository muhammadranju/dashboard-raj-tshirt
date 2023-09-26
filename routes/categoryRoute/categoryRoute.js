const router = require("express").Router();
const categorys = require("../../controllers/categoryController/categoryController");
const auth = require("../../middlewares/authMiddleware");

router.get("/category/:catName", categorys.categoryGetByNameController);

router.get(
    "/category/:id/sub-category/:subId",
    categorys.subCategoryGetByIdController
);

router.post(
    "/category/sub-category",
    auth.sellerMiddleware,
    categorys.subCategoryPostController
);
router.post(
    "/category/two-sub-category",
    auth.sellerMiddleware,
    categorys.towsubCategoryPostController
);
router.get("/category", categorys.categoryGetByIdController);

router.post(
    "/category",
    auth.sellerMiddleware,
    categorys.categoryPostController
);

router.patch(
    "/update/:catId",
    auth.sellerMiddleware,
    categorys.categoryUpdateController
);

module.exports = router;
