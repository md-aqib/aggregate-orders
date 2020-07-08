const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const order = new Schema({
  orderId: String,
  userId: {
    type: Date,
    ref: "user",
  },
  subTotal: Number,
  date: Date,
});

module.exports = mongoose.model("order", order);
