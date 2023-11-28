const express = require("express");
const router = express.Router();
const authController = require("../../controller/admin/authController");
const { userAuth } = require('../../middleware/auth');
router.post(
  "/signin", authController.login
);
router.post(
  "/signup", authController.register
);

router.post(
  "/changePassword", userAuth, authController.changePassword
);
router.get(
  "/getUser/:id", authController.getUser
);

router.put(
  "/updateProfile/:id", userAuth, authController.editprofile
);
router.get("/getAllItem", authController.getAllItem)


module.exports = router;
