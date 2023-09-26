const { Schema, model } = require("mongoose");
const sub_categorySchema = new Schema({
  subcategory_name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    lowercase: true,
    required: true,
  },
  subcategory_copy: {
    type: String,
    lowercase: true,
  },
  category_id: {
    type: String,
    trim: true,
  },
  // category0: {
  //     type: Schema.Types.ObjectId,
  //     ref: "Category",
  // },
});
const SubCategory = model("SubCategory", sub_categorySchema);
module.exports = SubCategory;
