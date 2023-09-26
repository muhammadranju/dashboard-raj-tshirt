const { Schema, model } = require("mongoose");

const CategorySchema = new Schema(
    {
        category: {
            type: String,
            required: [true, "Category is required"],
            trim: true,
        },
        category_copy: {
            type: String,
            lowercase: true,
            trim: true,
        },

        color: {
            type: String,
            lowercase: true,
            trim: true,
        },
        icon: {
            type: String,
            lowercase: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Category = model("Category", CategorySchema);
module.exports = Category;
