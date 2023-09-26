const Category = require("../../models/categoryModel/category_model");
const SubCategory = require("../../models/categoryModel/sub_category_model");
const TowSubCategory = require("../../models/categoryModel/towsub_category_model");
const Error = require("../../utils/throwError");

const getCategoryController = async (req, res, next) => {
    try {
        const catalogs = await Category.find().sort({ _id: -1 });

        return res.status(200).render("pages/Categories/Categoty", {
            title: "Categoty Lists",
            catalogs,
        });
    } catch (error) {
        next(error);
    }
};
const getSubCategoryController = async (_req, res, next) => {
    try {
        const subCategorys = await SubCategory.find()
            .sort({ _id: -1 })
            .populate("category0");
        const catalogsId = await Category.find({});

        // res.json(subCategorys);
        return res.status(200).render("pages/Categories/SubCategoty", {
            title: "Categoty Lists",
            subCategorys,
            catalogsId,
        });
    } catch (error) {
        next(error);
    }
};

const getSub2ndCategoryController = async (req, res, next) => {
    try {
        const category = await Category.find({});
        const subCategorys = await SubCategory.find({});
        const twosubCategorys = await TowSubCategory.find({})
            .populate("subcategory1")
            .populate("category0");

        // res.json(twosubCategorys);
        return res.status(200).render("pages/Categories/TowSubCategoty", {
            title: "Sub Categoty Two",
            category,
            twosubCategorys,
            subCategorys,
        });
    } catch (error) {
        next(error);
    }
};

const subcategoryFindByCategoryId = async (req, res, next) => {
    try {
        const { catId } = req.query;
        const subcategory = await SubCategory.find({
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
const subcategorytwoFindByCategoryId = async (req, res, next) => {
    try {
        const { catId } = req.query;
        const subcategorytwo = await TowSubCategory.find({
            subcategory_id: catId,
        });
        return res.status(200).json({
            status: 200,
            success: true,
            subcategorytwo,
        });
    } catch (error) {
        next(error);
    }
};

// get sub category by id
const subCategoryGetByIdController = async (req, res, next) => {
    try {
        const subId = req.params.subId;
        const subCatId = await SubCategory.find({
            category_id: subId,
        }).populate("category_id");
        if (!subCatId) {
            throw Error("Id not found", 404, false);
        }
        return res.status(200).json(subCatId);
    } catch (error) {
        next(error);
    }
};

// get all category
const categoryGetByIdController = async (req, res, next) => {
    try {
        const categorys = await Category.find()
            .populate("sub_category_id")
            .select();
        return res.status(200).json(categorys);
    } catch (error) {
        next(error);
    }
};

// get category by name
const categoryGetByNameController = async (req, res, next) => {
    try {
        const catName = req.params.catName;
        if (catName) {
            const categorys = await Category.find({
                category: { $regex: catName, $options: "i" },
            }).populate("sub_category_id");
            return res.status(200).json(categorys);
        }
        const categorys = await Category.find({}).populate("sub_category_id");
        // throw Error("Category not found", 404, false);

        return res.status(200).json(categorys);
    } catch (error) {
        next(error);
    }
};

// post a category
const categoryPostController = async (req, res, next) => {
    try {
        const { category, color, icon } = req.body;
        if ((!category, !color, !icon)) {
            throw Error("Category is required", 400, false);
        }
        const findCategory = await Category.findOne({ category });

        if (findCategory) {
            throw Error("Category is alreday exits", 422, false);
        }
        const SplitAndJoinCategory = category.split(" ").join("-");

        const new_category = new Category({
            category,
            icon,
            color,
            category_copy: SplitAndJoinCategory,
        });
        await new_category.save();

        return res.status(201).json({
            status: 201,
            success: true,
            new_category,
        });
    } catch (error) {
        next(error);
    }
};

// post sub category
const subCategoryPostController = async (req, res, next) => {
    try {
        const { subcategory_name, icon, category_id } = req.body;
        if ((!subcategory_name, !icon, !category_id)) {
            throw Error("Category is required", 400, false);
        }
        // const findCategory = await SubCategory.findOne({
        //     subcategory_name,
        // });
        const SubSplitAndJoinCategory = subcategory_name.split(" ").join("-");
        // if (findCategory) {
        //     throw Error("Category is alreday exits", 422, false);
        // }
        const newcategory = new SubCategory({
            subcategory_name,
            icon,
            category_id,
            subcategory_copy: SubSplitAndJoinCategory,
            category0: category_id,
        });

        console.log(newcategory);
        await newcategory.save();
        return res.status(201).json({
            status: 201,
            success: true,
            newcategory,
        });
    } catch (error) {
        // next(error);
        console.log(error);
    }
};
// post sub category two
const towsubCategoryPostController = async (req, res, next) => {
    try {
        const { towsubcategory_name, icon, category_id, subcategory_id } =
            req.body;
        if ((!towsubcategory_name, !icon, !category_id, !subcategory_id)) {
            throw Error("Category is required", 400, false);
        }
        // const findCategory = await SubCategory.findOne({
        //     subcategory_name,
        // });

        const SubSplitAndJoinCategoryTwo = towsubcategory_name
            .split(" ")
            .join("-");
        // if (findCategory) {
        //     throw Error("Category is alreday exits", 422, false);
        // }
        const newcategory = new TowSubCategory({
            towsubcategory_name,
            icon,
            category_id,
            subcategory_id,
            subcategorytwo_copy: SubSplitAndJoinCategoryTwo,
            category0: category_id,
            subcategory1: subcategory_id,
        });

        console.log(newcategory);
        await newcategory.save();
        return res.status(201).json({
            status: 201,
            success: true,
            newcategory,
        });
    } catch (error) {
        next(error);
    }
};

const categoryUpdateController = async (req, res, next) => {
    try {
        const { catId } = req.params;
        const { category, icon } = req.body;

        const catalog = await Category.findByIdAndUpdate({ _id: catId });
        if (!catalog) {
            throw Error("Category not found", 404, false);
        }
        catalog.category = category ?? catalog.category;
        catalog.icon = icon ?? catalog.icon;
        await catalog.save();

        return res.status(201).json({
            status: 201,
            success: true,
            catalog,
        });
    } catch (error) {
        next(error);
    }
};

const categoryDeleteController = async (req, res, next) => {
    try {
        const { delId } = req.params;
        const catalog = await Category.findOneAndRemove({ _id: delId });
        if (!catalog) {
            return res.redirect("/category");
        }
        await catalog.remove();
        return res.redirect("/category");
    } catch (error) {
        next(error);
    }
};
module.exports = {
    categoryPostController,
    subCategoryPostController,
    subCategoryGetByIdController,
    categoryGetByIdController,
    categoryGetByNameController,
    getCategoryController,
    getSubCategoryController,
    categoryUpdateController,
    categoryDeleteController,
    subcategoryFindByCategoryId,
    getSub2ndCategoryController,
    towsubCategoryPostController,
    subcategorytwoFindByCategoryId,
};
