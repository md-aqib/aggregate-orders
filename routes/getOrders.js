const DBorder = require("../models/order");
const DBuser = require("../models/user");

// NOTE: we can do with another method using 'populate' if we save userId and orderId as objectId.
// that would be more efficient, and less db call.

module.exports = async (req, res) => {
  try {
    const users = await DBuser.find({});
    let response = await Promise.all(
      users.map(async (ele) => {
        let orderCount = await DBorder.countDocuments({ userId: ele.userId });
        let order = await DBorder.find({ userId: ele.userId });
        let sumofSubtotal = order.reduce((sum, element) => {
          return sum + element.subTotal;
        }, 0);
        let avg = sumofSubtotal / orderCount;
        return {
          userId: ele.userId,
          name: ele.userName,
          noOfOrders: orderCount,
          averageBillValue: !avg ? "0" : avg,
        };
      })
    );
    res.json({
      orderData: response,
    });
  } catch (err) {
    res.json({
      success: false,
      msg: "Something went wrong, Please try again",
    });
  }
};
