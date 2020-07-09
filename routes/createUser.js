const DBuser = require("../models/user");

const generateUID = async () => {
  try {
    let count = await DBuser.countDocuments({});
    let newCount = ++count;
    let finalCount = newCount > 9 ? newCount + "" : "0" + newCount;
    return `USR-${finalCount}`;
  } catch (err) {
    throw new Error("Error in generating user id");
  }
};

const addUser = async (req, res) => {
  try {
    if (req.body.userName) {
      let uid = await generateUID();
      await new DBuser({
        UID: uid,
        userName: req.body.userName,
      }).save();
      res.json({
        success: true,
        msg: "User data saved",
      });
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

module.exports = addUser;
