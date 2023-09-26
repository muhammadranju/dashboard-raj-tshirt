const { Schema, model } = require("mongoose");
const moment = require("moment");

const authSchema = new Schema(
    {
        username: {
            type: String,
            lowercase: true,
            required: [true, "Username is required"],
            trim: true,
        },
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            trim: true,
        },
        types: {
            type: String,
            enum: ["ROOT", "EDITOR", "MANAGER"],
            default: "ROOT",
        },
        status: {
            type: String,
            enum: ["ACTIVE", "DEACTIVE", "PENDING"],
            default: "PENDING",
        },
        bio: {
            type: String,
            trim: true,
        },
        photo: {
            type: String,
            trim: true,
            default: "../../img/photos/ranju.jpg",
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

const User = model("AdminUser", authSchema);
module.exports = User;
