const { Schema, model } = require("mongoose");
const moment = require("moment");

const SellerAuthModel = new Schema({
    name: {
        type: String,
        required: [true, "Name is required."],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required."],
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Passsword is required."],
        trim: true,
    },
    gander: {
        type: String,
        enum: ["male", "female", "other"],
        required: [true, "Gander is required."],
    },
    tc: {
        type: Boolean,
        required: [true, "Terms & Conditions is required."],
    },
    user_status: {
        type: String,
        enum: ["active", "pending", "inactive", "deactive", "suspend"],
        default: "pending",
    },
    seller_postId: {
        type: [Schema.Types.ObjectId],
        ref: "Product",
    },
    post_reviewId: {
        type: [Schema.Types.ObjectId],
        ref: "Review",
    },
    comment_id: {
        type: [Schema.Types.ObjectId],
        ref: "Comment",
    },
    date: {
        type: String,
        default: moment().format("L"),
    },
    time: {
        type: String,
        default: moment().format("LTS"),
    },
});

const Seller = model("Seller", SellerAuthModel);

module.exports = Seller;
