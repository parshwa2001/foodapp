const express = require('express')
const router = express.Router();
// const validator = require("../../utils/validator");
const { userAuth } = require('../../middleware/auth');
const userController = require("../../controller/frontend/userController")
// const { check } = require("express-validator");

router.post("/register", userController.register)
router.post("/login", userController.login)
router.post("/forgot", userController.forgetPassword)
router.put("/resetPassword", userController.resetPassword)
router.put("/changePassword", userAuth, userController.changePassword)
router.put("/editProfile/:id", userAuth, userController.editprofile)
router.get("/getUser/:id", userAuth, userController.getUser)
router.get("/getAll", userAuth, userController.getAllUser)
router.delete("/deleteCustomer/:id", userAuth, userController.deleteCustomer)



module.exports = router;