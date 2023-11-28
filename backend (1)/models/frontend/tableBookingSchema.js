const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const bookingSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, "email is required"]
        },
        noOfGuest: {
            type: Number,
            required: [true, "noOfGuest is required"],
        },
        bookingTime:{
            type:String,
            required: [true, "bookingTime is required"],
        },
        phoneNumber: {
            type: String,
            required: [true, "phonenumber is required"],
        },
        price: {
            type: Number,
        },
        paymentType: {
            type: String
        },
        paymentIntent: {
            type: String
        },
        bookingStatus: {
            type: String,
            enum: ["Confirmed", "Cancelled"],
            default: "Confirmed",
        },
        bookedBy: { type: Schema.Types.ObjectId, ref: "User" },
        bookingDate: { type: String, required: [true, "bookingDate is required"] },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("Booking", bookingSchema);
