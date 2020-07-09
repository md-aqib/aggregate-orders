const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
  userNo: String,
  userName: String,
  noOfOrders: {
    type: Number,
    default: 0,
  },
  createdAt: Date,
});

module.exports = mongoose.model("user", user);
