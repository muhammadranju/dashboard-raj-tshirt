const { Schema, model } = require("mongoose");
const moment = require("moment");
const shortId = require("shortid");
const domPurifiy = require("dompurify");
const { JSDOM } = require("jsdom");
// const { stripHtml } = require("string-strip-html");
const htmlPurify = domPurifiy(new JSDOM().window);

const productSchema = new Schema(
    {
        title_name: {
            type: String,
            required: [true, "Product Title is required."],
            trim: true,
            maxlength: [255, "Product Title more then 255 character allow"],
        },
        short_title: {
            type: String,
            required: [true, "Short Title is required."],
            lowercase: true,
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Product Description is required."],
            trim: true,
        },
        snippet: {
            type: String,
        },
        product_price: {
            type: Number,
            required: [true, "Price is required."],
            maxlength: [6, "This is to long amount Not Allow"],
        },
        special_price: {
            type: Number,
            trim: true,
            required: [true, "Special Price is required"],
            maxlength: [6, "This is to long amount Not Allow"],
        },
        product_sellerSKU: {
            type: String,
            lowercase: true,
            default: shortId.generate,
        },
        product_quantity: {
            type: Number,
            required: [true, "Stock is required."],
            default: 10,
            maxlength: [300, "Quantity more then 300 allow"],
        },
        product_box: {
            type: String,
            trim: true,
            required: [true, "What's in the box."],
        },
        product_tags: {
            type: [String],
            lowercase: true,
            required: [true, "Product Tags is required."],
        },
        image: {
            type: [String],
            // required: [true, "Product Image is required."],
            trim: true,
        },
        brand_name: {
            type: String,
            required: [true, "Product brand is required."],
            trim: true,
        },
        color_name: {
            type: String,
            required: [true, "Product Color is required."],
            trim: true,
        },
        product_size: {
            type: String,
            required: [true, "Product Size is required."],
            trim: true,
        },
        delivery_times: {
            type: String,
            required: [true, "Delivery times is required."],
            trim: true,
        },
        package_weight: {
            type: Number,
            trim: true,
            required: [true, "Product Package Weight is required."],
            maxlength: [10, "Weight must be more then 10KGs allow"],
        },
        length_dim: {
            type: Number,
        },
        width_dim: {
            type: Number,
        },
        height_dim: {
            type: Number,
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },
        sub_category: {
            type: String,
            required: true,
            trim: true,
        },
        sub_categorytwo: {
            type: String,
            required: true,
            trim: true,
        },

        category_id: {
            type: Schema.Types.ObjectId,
            ref: "Category",
        },
        subCategory_id: {
            type: Schema.Types.ObjectId,
            ref: "SubCategory",
        },
        subCategorytwo_id: {
            type: Schema.Types.ObjectId,
            ref: "SubCategoryTow",
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "AdminUser",
        },
        comment_id: {
            type: [Schema.Types.ObjectId],
            ref: "Comment",
        },
        status: {
            type: String,
            enum: ["ACTIVE", "PENDING", "STOCKOUT", "INACTIVE", "SUSPENDED"],
            default: "ACTIVE",
        },
        date: {
            type: String,
            default: moment().format("L"),
        },
        time: {
            type: String,
            default: moment().format("LTS"),
        },
    },
    { timestamps: true }
);

productSchema.pre("validate", function (next) {
    if (this.description) {
        this.description = htmlPurify.sanitize(this.description);
        // this.snippet = stringHtml(this.description.substring(0, 200).result);
    }
    next();
});
const Product = model("Product", productSchema);
module.exports = Product;
