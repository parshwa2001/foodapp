const express = require('express')
const router = express.Router();
const bookingController = require("../../controller/frontend/bookingTableController")


router.post("/reserveTable", bookingController.bookTable)
router.get("/getBooking/:id", bookingController.singleBooking)
router.get("/allBooking", bookingController.allBookingList)
router.delete("/deleteBooking/:id", bookingController.deleteBooking)
router.put("/updateStatus/:id", bookingController.updateBooking)
router.post("/payment", bookingController.BookingPayment)
router.post("/addCard", bookingController.addCard)
router.put("/cancel/:id", bookingController.cancelReservation)






module.exports = router;