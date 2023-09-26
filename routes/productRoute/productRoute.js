const router = require("express").Router();
const auth = require("../../middlewares/authMiddleware");
const product = require("../../controllers/productController/productController");

router.get("/:postId", product.productGetByIdController);

router.get("/u/:category", product.getProductCategoryController);
router.get(
    "/u/:category/:subcategory",
    product.getProductSubCategoryController
);
router.get(
    "/u/:category/:subcategory/:prodId",
    product.getProductByProductIdController
);

router.get("/", product.productGetController);

router.get(
    "/submit/add-product",
    auth.authMiddleware,
    product.addProductGetController
);

router.get("/v/categorys", product.productCategoryGetController);

router.get("/post", (_req, res) => {
    return res.redirect("/product");
});
router.post("/upload/post", auth.authMiddleware, product.productPostController);

router.patch("/post/u/:id", product.productUpdateController);

router.delete("/post/d/:id", product.productDeleteController);

module.exports = router;
