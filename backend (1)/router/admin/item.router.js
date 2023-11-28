const express = require('express')
const router = express.Router();
const itemController = require("../../controller/admin/itemController")
const upload = require("../../middleware/multer")

router.post("/addItem",upload.single("itemImg"), itemController.addItem)
router.get("/get/:id", itemController.getSingleItem)
router.put("/editItem/:id",upload.single("itemImg"), itemController.editItem)
router.delete("/delete/:id", itemController.deleteItem)



module.exports = router;
