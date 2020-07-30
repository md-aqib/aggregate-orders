const DBuser = require("../models/user");

// using populate method
// module.exports = async (req, res) => {
//   try {
//     const users = await DBuser.find({}).populate("orderId");
//     let mappedData = users.map((ele) => {
//       let sum = ele.orderId.reduce((sum, ele) => {
//         return sum + ele.subTotal;
//       }, 0);
//       let avg = (sum / ele.orderId.length).toFixed(2);
//       return {
//         userId: ele.UID,
//         name: ele.userName,
//         noOfOrders: ele.noOfOrders,
//         averageBillValue: isNaN(avg) === true ? 0 : avg,
//       };
//     });
//     res.json({
//       orderData: mappedData,
//     });
//   } catch (err) {
//     console.log(err);
//     res.json({
//       success: false,
//       msg: "Something went wrong, Please try again",
//     });
//   }
// };

module.exports = async (req, res) => {
  try {
    const users = await DBuser.aggregate([
      {
        $lookup: {
          from: "order",
          localField: "orderId",
          foreignField: "_id",
          as: "orders",
        },
      },
    ]);
    console.log(users);
    process.exit();
    let mappedData = users.map((ele) => {
      let sum = ele.orderId.reduce((sum, ele) => {
        return sum + ele.subTotal;
      }, 0);
      let avg = (sum / ele.orderId.length).toFixed(2);
      return {
        userId: ele.UID,
        name: ele.userName,
        noOfOrders: ele.noOfOrders,
        averageBillValue: isNaN(avg) === true ? 0 : avg,
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
