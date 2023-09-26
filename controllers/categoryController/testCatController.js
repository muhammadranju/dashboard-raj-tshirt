const Error = require("../../utils/throwError");
const TestCategory = require("../../models/categoryModel/test_cat_model");
const TestSubCategory = require("../../models/categoryModel/test_sub_cat_model");

const get_test_cat_Controller = async (req, res, next) => {
    try {
        const CategoryList = await TestCategory.find();
        // if (CategoryList.length >= 0) {
        //     res.json({ Data: "No data" });
        // }
        return res.status(200).render("pages/Categories/testCat", {
            title: "Test Categories",
            CategoryList,
        });
    } catch (error) {
        next(error);
    }
};
const post_test_cat_Controller = async (req, res, next) => {
    try {
        const { category } = req.body;
        if (!category) {
            throw Error("Input are required", 401, false);
        }
        const haveCategory = await TestCategory.findOne({ category });
        if (haveCategory) {
            throw Error("Category alreday exits", 422, false);
        }
        const splits = category.split(" ").join("-");
        const newCategory = await new TestCategory({
            category,
            category_copy: splits,
        });
        await newCategory.save();
        return res.status(201).json({
            status: 201,
            success: true,
            newCategory,
        });
    } catch (error) {
        next(error);
    }
};
const get_test_sub_cat_Controller = async (req, res, next) => {
    try {
        const subcategory = await TestSubCategory.find();
        const category = await TestCategory.find();

        return res.status(200).render("pages/Categories/testSubCat", {
            title: "Test Sub Categories",
            subcategory,
            category,
        });
    } catch (error) {
        next(error);
    }
};
const post_test_sub_cat_Controller = async (req, res, next) => {
    try {
        const { sub_category_name, category_id_name } = req.body;
        if ((!sub_category_name, !category_id_name)) {
            throw Error("Input are required", 401, false);
        }
        const haveSubCategory = await TestSubCategory.findOne({
            sub_category_name,
        });
        if (haveSubCategory) {
            throw Error("Sub Category alreday exits", 422, false);
        }
        const newSubCategory = await new TestSubCategory({
            sub_category_name,
            category_id_name,
            subcategory_copy: sub_category_name.split(" ").join("-"),
        });
        await newSubCategory.save();
        return res.status(201).json({
            status: 201,
            seccess: true,
            newSubCategory,
        });
    } catch (error) {
        next(error);
    }
};

const get_test_showcat_Controller = async (req, res, next) => {
    try {
        const category = await TestCategory.find({});
        const subcategory = await TestSubCategory.find({});
        return res.status(200).render("pages/Categories/showCats", {
            title: "Show Category",
            category,
            subcategory,
        });
    } catch (error) {
        next(error);
    }
};
const post_test_showcat_Controller = async (req, res, next) => {
    try {
        const { catId } = req.query;
        const subcategory = await TestSubCategory.find({
            category_id: catId,
        });
        return res.status(200).json({
            status: 200,
            success: true,
            subcategory,
        });
    } catch (error) {
        next(error);
    }
};
module.exports = {
    get_test_cat_Controller,
    post_test_cat_Controller,
    get_test_sub_cat_Controller,
    post_test_sub_cat_Controller,
    post_test_showcat_Controller,
    get_test_showcat_Controller,
};
