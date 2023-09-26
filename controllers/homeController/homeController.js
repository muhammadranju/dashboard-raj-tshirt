const User = require("../../models/userModel/user_model");
const AdminAddress = require("../../models/adminModel/admin_address_model");
const Product = require("../../models/productModel/porduct_model");
const Category = require("../../models/categoryModel/category_model");
const SubCategory = require("../../models/categoryModel/sub_category_model");
const Error = require("../../utils/throwError");
const getHomeDashbordController = async (req, res, next) => {
    try {
        const product = await Product.find({ status: "ACTIVE" })
            .limit(10)
            .sort({ _id: -1 })
            .populate("category_id", "category")
            .populate("subCategory_id", "sub_category_id");

        return res.status(200).render("pages/index", {
            title: "Dashboard",
            product,
            user: req.user,
            url: process.env.WEB_URL,
        });
    } catch (error) {
        next(error);
    }
};

const getHomeController2 = async (req, res, next) => {
    try {
        const product = await Product.find()
            .sort({ _id: -1 })
            .select({
                createdAt: 0,
                updatedAt: 0,
                __v: 0,
            })
            .populate("category_id")
            .populate("user_id", "-password")
            .populate("subCategory_id");
        // if (product.length < 0) {
        //     throw Error("Product not available", 404, false);
        // }
        return res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};
const getAboutController = (req, res, next) => {
    // throw new Error("dsfhdsj");
    return res.status(200).render("pages/index");
    // res.status(200).json({ message: "Hello About page" });
};
const getSearchByQueryController = async (req, res, next) => {
    try {
        const searchQuery = req.query.q;
        if (searchQuery) {
            const catalog = await SubCategory.findOne({
                sub_category_name: searchQuery,
            });
            // if (searchQuery.length >= 0 || null) {
            //     throw Error(
            //         "Search No Result,We're sorry. We cannot find any matches for your search term.",
            //         404,
            //         false
            //     );
            // }
            res.status(200).json(catalog);
        }
        return res.redirect("/");
    } catch (error) {
        next(error);
    }
};

const getLogoutController = async (req, res, next) => {
    try {
        res.clearCookie(process.env.COOKIE_KYE, "access_token");
        return res.redirect("/");
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getHomeController2,
    getAboutController,
    getSearchByQueryController,
    getHomeDashbordController,
    getLogoutController,
};
