const Product = require("../../models/productModel/porduct_model");
function findStatus(status) {
    return Product.find({ status: status });
}
const allListManageProductsGetController = async (req, res, next) => {
    try {
        const productsAll = await Product.find({}).sort({
            _id: -1,
        });
        res.status(200).render("pages/Products/all-products", {
            title: "Manage Products",
            productsAll,
        });
    } catch (error) {
        next();
    }
};
const activeListManageProductsGetController = async (req, res, next) => {
    try {
        const products = await findStatus("ACTIVE").sort({
            _id: -1,
        });
        res.status(200).render("pages/Products/list-products", {
            title: "Manage Products",
            products,
            url: process.env.WEB_URL,
        });
    } catch (error) {
        next(error);
    }
};
const pendingListManageProductsGetController = async (req, res, next) => {
    try {
        const productsPENDING = await findStatus("PENDING").sort({
            _id: -1,
        });
        res.status(200).render("pages/Products/pending-products", {
            title: "Manage Products",
            productsPENDING,
        });
    } catch (error) {
        next();
    }
};
const outofstockListManageProductsGetController = async (req, res, next) => {
    try {
        const productsSTOCKOUT = await findStatus("STOCKOUT").sort({
            _id: -1,
        });
        res.status(200).render("pages/Products/out-of-stockProduct", {
            title: "Manage Products",
            productsSTOCKOUT,
        });
    } catch (error) {
        next();
    }
};
const inactiveListManageProductsGetController = async (req, res, next) => {
    try {
        const productsINACTIVE = await findStatus("INACTIVE").sort({
            _id: -1,
        });
        res.status(200).render("pages/Products/inactiveProduct", {
            title: "Manage Products",
            productsINACTIVE,
        });
    } catch (error) {
        next();
    }
};
const suspendedListManageProductsGetController = async (req, res, next) => {
    try {
        const productsSUSPENDED = await findStatus("SUSPENDED").sort({
            _id: -1,
        });
        res.status(200).render("pages/Products/suspendedProduct", {
            title: "Manage Products",
            productsSUSPENDED,
        });
    } catch (error) {
        next();
    }
};

module.exports = {
    activeListManageProductsGetController,
    allListManageProductsGetController,
    pendingListManageProductsGetController,
    outofstockListManageProductsGetController,
    inactiveListManageProductsGetController,
    suspendedListManageProductsGetController,
};
