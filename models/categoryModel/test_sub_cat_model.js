const { Schema, model } = require("mongoose");
const sub_categorySchema = new Schema(
    {
        sub_category_name: {
            type: String,
            required: true,
        },

        category_id_name: {
            type: String,
            required: true,
        },
        subcategory_copy: {
            type: String,
            lowercase: true,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
const TestSubCategory = model("TestSubCategory", sub_categorySchema);
module.exports = TestSubCategory;
