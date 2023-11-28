const express = require("express");
const authRouter = require("./auth.router");
const bookingRouter = require("./booking.router")
const productOrder = require("./order.router")
const {userAuth}  = require('../../middleware/auth');

const router = express.Router();
router.use("/", authRouter);
router.use("/booking",userAuth,bookingRouter)
router.use("/order",userAuth,productOrder)


module.exports = router;

