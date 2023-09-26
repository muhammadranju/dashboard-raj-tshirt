const { Schema, model } = require("mongoose");
const moment = require("moment");
const productSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Product Title is required."],
            trim: true,
            unique: true,
        },
        dist: {
            type: String,
            required: [true, "Product Description is required."],
            trim: true,
        },
        image: {
            type: String,
            required: [true, "Product Image is required."],
            trim: true,
        },
        tags: {
            type: String,
            required: [true, "Product Tags is required."],
        },
        price: {
            type: Number,
            required: [true, "Price is required."],
        },
        stock: {
            type: Number,
            required: [true, "Stock is required."],
        },
        user_id: {
            type: [Schema.Types.ObjectId],
            ref: "User",
        },
        comment_id: {
            type: [Schema.Types.ObjectId],
            ref: "Comment",
        },
        status: {
            type: String,
            enum: ["ACTIVE", "DEACTIVE", "PENDING"],
            default: "PENDING",
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

const Product = model("Product", productSchema);
module.exports = Product;
