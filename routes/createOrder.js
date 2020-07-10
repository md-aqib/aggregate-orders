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
        let savedData = await new DBorder({
          orderId: id,
          userId: req.params.userid,
          subTotal: req.body.subTotal,
          date: new Date(),
        }).save();
        if (savedData) {
          await DBuser.findOneAndUpdate(
            { _id: req.params.userid },
            {
              $push: { orderId: savedData._id },
              // $set: { noOfOrders: userData.orderId.length + 1 }, // if orderCount inc during order place
            },
            { useFindAndModify: false } // for removing warning
          );
        }
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
