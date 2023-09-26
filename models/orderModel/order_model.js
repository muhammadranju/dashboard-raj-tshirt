const { Schema, model } = require("mongoose");

const OrderSchema = new Schema({});
const Order = model("Order", OrderSchema);

module.exports = Order;
