const DBorder = require("../models/order");
const DBuser = require("../models/user");

// using populate method
module.exports = async (req, res) => {
  try {
    const users = await DBuser.find({}).populate("orderId");
    let mappedData = users.map((ele) => {
      let sum = ele.orderId.reduce((sum, ele) => {
        return sum + ele.subTotal;
      }, 0);
      console.log(sum);
      let avg = (sum / ele.orderId.length).toFixed(2);
      return {
        userId: ele.UID,
        name: ele.userName,
        noOfOrders: ele.noOfOrders,
        averageBillValue: avg,
      };
    });
    res.json({
      orderData: mappedData,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      msg: "Something went wrong, Please try again",
    });
  }
};
