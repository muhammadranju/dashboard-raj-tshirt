const shortId = require("shortId");
const Product = require("../../models/productModel/porduct_model");
const Category = require("../../models/categoryModel/category_model");
const SubCategory = require("../../models/categoryModel/sub_category_model");
const Seller = require("../../models/seller_model/seller_auth_model");
const Error = require("../../utils/throwError");

const addProductGetController = async (req, res, next) => {
    try {
        const catalog = await Category.find({}).populate("category");
        const subcatalog = await SubCategory.find({});
        const cats = catalog.map((e) => {
            return e;
        });
        return res.status(200).render("pages/Products/add-product", {
            title: "Add Product",
            catalog,
            subcatalog,
            cats,
        });
    } catch (error) {
        next(error);
    }
};

const productGetController = async (req, res, next) => {
    try {
        const scachedName = req.query.search;

        if (scachedName) {
            const product = await Product.find({
                product_tags: { $regex: scachedName, $options: "i" },
            });
            // if (typeof product !== "undefined" && product.length === 0) {
            //     throw Error(
            //         "Search No Result,We're sorry. We cannot find any matches for your search term.",
            //         404,
            //         false
            //     );
            // }
            return res.status(200).json(product);
        }

        const product = await Product.find().sort({ _id: -1 }).select({
            createdAt: 0,
            updatedAt: 0,
            __v: 0,
        });
        // if (typeof product !== "undefined" && product.length === 0) {
        //     throw Error("Product not available");
        // }
        return res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};
const productGetByIdController = async (req, res, next) => {
    try {
        const postId = req.params.postId;

        const product = await Product.findOne({
            short_title: postId,
        })
            .populate("user_id", "username name email")
            .populate("category_id")
            .populate("subCategory_id")
            .populate("subCategorytwo_id")
            .select({
                __v: 0,
                updatedAt: 0,
                createdAt: 0,
            });
        if (!product) {
            throw Error("Product not found", 404, false);
        }
        // const newTitle = product.title.split("-")[0];
        const newProduct = {
            // title: newTitle,
            product,
        };
        // console.log(newProduct.product.category_id[0].category);
        return res.status(200).json(newProduct);
    } catch (error) {
        next(error);
    }
};
const productPostController = async (req, res, next) => {
    try {
        const {
            title_name,
            description,
            special_price,
            image,
            product_tags,
            color_name,
            product_price,
            product_quantity,
            product_size,
            brand_name,
            product_box,
            package_weight,
            delivery_times,
            category,
            sub_category,
            sub_categorytwo,
            length_dim,
            width_dim,
            height_dim,
        } = req.body;
        if (
            (!title_name,
            !description,
            !image,
            !product_tags,
            !color_name,
            !product_price,
            !product_quantity,
            !product_size,
            !brand_name,
            !product_box,
            !package_weight,
            !delivery_times,
            !length_dim,
            !width_dim,
            !height_dim,
            !special_price)
        ) {
            throw Error("Product fileds are required", 400, false);
        }

        const title_split = title_name.split(" ").join("-");

        const new_short_title = `${title_split}-${shortId.generate()}`;

        const new_tags = product_tags.split(" ");
        const join_tags = new_tags.join(",");
        const split_tags = join_tags.split(",");

        const product = await new Product({
            title_name,
            short_title: new_short_title,
            description,
            special_price,
            image,
            color_name,
            product_tags: split_tags,
            product_price,
            product_quantity,
            product_size,
            brand_name,
            product_box,
            package_weight,
            delivery_times,
            length_dim,
            width_dim,
            height_dim,
            user_id: req.user._id,
            category,
            sub_category,
            sub_categorytwo,
            category_id: category,
            subCategory_id: sub_category,
            subCategorytwo_id: sub_categorytwo,
        });
        await Seller.updateOne(
            {
                _id: req.user._id,
            },
            {
                $push: {
                    seller_postId: product._id,
                },
            }
        );
        // console.log(product);
        await product.save();
        return res.status(201).json({
            status: 201,
            success: true,
            product,
        });
    } catch (error) {
        next(error);
    }
};

const getProductCategoryController = async (req, res, next) => {
    try {
        const category = req.params.category;

        const categoryName = await Category.findOne({
            // category: { $regex: category, $options: "i" },
            category,
        });
        if (categoryName === null) {
            throw Error("Not found", 404, false);
        }
        return res.status(200).json(categoryName);
    } catch (error) {
        next(error);
    }
};

const getProductSubCategoryController = async (req, res, next) => {
    try {
        const subcategory = req.params.subcategory;

        const subcategoryName = await SubCategory.findOne({
            // sub_category_name: { $regex: subcategory, $options: "i" },
            sub_category_name: subcategory,
        });
        if (subcategoryName === null) {
            throw Error("Not found", 404, false);
        }
        return res.status(200).json(subcategoryName);
    } catch (error) {
        next(error);
    }
};

const productCategoryGetController = async (req, res, next) => {
    try {
        const categorys = await Category.find().select();
        return res.status(200).json(categorys);
    } catch (error) {
        next(error);
    }
};

const getProductByProductIdController = async (req, res, next) => {
    try {
        const prodId = req.params.prodId;
        if (!prodId) {
            throw Error("Product not found", 404, false);
        }
        const product = await Product.findOne({
            short_title: prodId,
        })
            .populate("category_id", "-__v")
            .populate("subCategory_id", "-__v")
            .populate("user_id", "-password -__v")
            .select({
                __v: 0,
            });

        // console.log(product.user_id.name);
        return res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

const productUpdateController = async (req, res, next) => {};
const productDeleteController = async (req, res, next) => {};

module.exports = {
    productGetController,
    productGetByIdController,
    productPostController,
    productUpdateController,
    productDeleteController,
    getProductCategoryController,
    getProductSubCategoryController,
    productCategoryGetController,
    getProductByProductIdController,
    addProductGetController,
};
