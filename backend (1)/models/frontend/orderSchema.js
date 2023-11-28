const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const orderSchema = new Schema(
    {
        userName: {
            type: String,
            required: [true, "userName is required"]
        },
        orderData: {
            type: Array,
        },
        Status: {
            type: String,
            enum: ["Confirmed", "Cancelled"],
            default: "Confirmed",
        },
        orderType: {
            type: String,

        },
        totalPrice: {
            type: Number,

        },
        paymentType: {
            type: String
        },
        paymentIntent: {
            type: String
        },
        orderBy: { type: Schema.Types.ObjectId, ref: "User" },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("Order", orderSchema);
