const { Schema, model } = require("mongoose");
const moment = require("moment");
const adminAddressSchema = new Schema(
    {
        firstName: {
            type: String,
            trim: true,
        },
        lastName: {
            type: String,
            trim: true,
        },
        bio: {
            type: String,
            trim: true,
        },
        address: {
            type: String,
            trim: true,
        },
        address2: {
            type: String,
            trim: true,
        },
        city: {
            type: String,
            trim: true,
        },
        state: {
            type: String,
            trim: true,
        },
        zip: {
            type: String,
            trim: true,
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "AdminUser",
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

const AdminAddress = model("AdminAddress", adminAddressSchema);
module.exports = AdminAddress;
