const DBorder = require("../models/order");
const DBuser = require("../models/user");

const createId = async () => {
  try {
    let count = await DBorder.countDocuments({});
    let newCount = ++count;
    let finalCount = newCount > 9 ? newCount + "" : "0" + newCount;
    return `ORD-${finalCount}`;
  } catch (err) {
    throw new Error("Error in generating order id");
  }
};

const createOrder = async (req, res) => {
  try {
    if (req.body.subTotal && req.params.userid) {
      let userData = await DBuser.findById(req.params.userid);
      if (!userData || userData === null) {
        res.json({
          success: false,
          msg: "User not available, Please add first",
        });
      } else {
        let id = await createId();
        await new DBorder({
          orderId: id,
          userId: req.params.userid,
          subTotal: req.body.subTotal,
          date: new Date(),
        }).save();
        res.json({
          success: true,
          msg: "Order placed",
        });
      }
    } else {
      res.json({
        success: false,
        msg: "Please provide all details",
      });
    }
  } catch (err) {
    console.log(__filename, err);
    res.json({
      success: false,
      msg: "Something went wrong",
    });
  }
};

module.exports = createOrder;
