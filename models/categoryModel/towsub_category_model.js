const { Schema, model } = require("mongoose");
const towsub_categorySchema = new Schema({
    towsubcategory_name: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        lowercase: true,
        required: true,
    },
    subcategorytwo_copy: {
        type: String,
        lowercase: true,
    },
    category_id: {
        type: String,
        trim: true,
    },
    subcategory_id: {
        type: String,
        trim: true,
    },
    category0: {
        type: Schema.Types.ObjectId,
        ref: "Category",
    },
    subcategory1: {
        type: Schema.Types.ObjectId,
        ref: "SubCategory",
    },
});
const SubCategoryTow = model("SubCategoryTow", towsub_categorySchema);
module.exports = SubCategoryTow;
