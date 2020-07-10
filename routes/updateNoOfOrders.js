const DBuser = require("../models/user");

// using populate method
module.exports = async (req, res) => {
  try {
    const users = await DBuser.find({}).populate("orderId");
    users.forEach(async (ele) => {
      let orderCount = ele.orderId.length;
      const updateData = await DBuser.updateOne(
        { _id: ele._id },
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
