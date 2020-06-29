const express = require("express");
const router = express.Router();

router.post("/createUser", require("./createUser"));
router.post("/createOrder/:userid", require("./createOrder"));

router.put("/updateOrderNo", require("./updateNoOfOrders"));

router.get("/getOrders", require("./getOrders"));

module.exports = router;
