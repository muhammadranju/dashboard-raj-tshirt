const router = require("express").Router();
const Manage = require("../../controllers/productController/manageProductsController");
router.get("/list", Manage.activeListManageProductsGetController);
router.get("/", Manage.allListManageProductsGetController);
router.get("/pending", Manage.pendingListManageProductsGetController);
router.get("/out-of-stock", Manage.outofstockListManageProductsGetController);
router.get("/inactive", Manage.inactiveListManageProductsGetController);
router.get("/suspended", Manage.suspendedListManageProductsGetController);

module.exports = router;
