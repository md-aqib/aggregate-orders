const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
  UID: String,
  userName: String,
  orderId: [
    {
      type: Schema.Types.ObjectId,
      ref: "order",
    },
  ],
  noOfOrders: {
    type: Number,
    default: 0,
  },
  createdAt: Date,
});

module.exports = mongoose.model("user", user);
