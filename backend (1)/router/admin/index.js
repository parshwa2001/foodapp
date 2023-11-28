const express = require("express");
const itemRouter = require("./item.router");
const authRouter = require("./auth.router")

const {userAuth}  = require('../../middleware/auth');
const router = express.Router();
router.use("/", authRouter);
router.use("/item", userAuth,itemRouter);

module.exports = router;

