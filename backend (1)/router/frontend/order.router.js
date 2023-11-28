const express = require('express')
const router = express.Router();
const orderController = require("../../controller/frontend/orderController")

router.post("/buy", orderController.placeOrder)
router.get("/getOrder", orderController.allOrderList)
router.get("/userOrder", orderController.allUserOrder)
router.put("/cancel/:id", orderController.cancelOrder)




module.exports = router;