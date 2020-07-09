const DBorder = require("../models/order");
const DBuser = require("../models/user");

module.exports = async (req, res) => {
  try {
    const users = await DBuser.find({});
    users.forEach(async (ele) => {
      let orderCount = await DBorder.countDocuments({ userId: ele._id });
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
