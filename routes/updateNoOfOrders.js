const DBorder = require("../models/order");
const DBuser = require("../models/user");

// NOTE: we can do with another method using 'populate' if we save userId and orderId as objectId.
// that would be more efficient, and less db call.

module.exports = async (req, res) => {
  try {
    const users = await DBuser.find({});
    users.forEach(async (ele) => {
      let orderCount = await DBorder.countDocuments({ userId: ele.userId });
      const updateData = await DBuser.updateOne(
        { userId: ele.userId },
        { $set: { noOfOrders: orderCount } }
      );
      return updateData;
    });
    res.json({
      success: true,
      msg: "Order count updated Successfully",
    });
  } catch (err) {
    console.log(__filename, err);
    res.json({
      success: false,
      msg: "Something went wrong, Please try again",
    });
  }
};
