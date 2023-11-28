
const orderCollection = require("../../models/frontend/orderSchema");
const { pick } = require("lodash");
const stripe = require("stripe");
const placeOrder = async (req, res) => {
    try {
        const { userName, Status, orderType, orderData, paymentIntent, totalPrice, paymentType } = req.body;
        const userId = req.user._id;
        const obj = {
            userName,
            Status,
            orderType,
            totalPrice,
            paymentType,
            paymentIntent,
            orderBy: userId,
            orderData
        };
        const booking = await orderCollection.create(obj);

        return res.status(200).json({
            success: true,
            message: "Order placed successfully..",
            data: booking,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const allOrderList = async (req, res) => {
    const userId = req.user._id;
    let code = 200;
    try {
        const getOrderList = await orderCollection.find();
        return res.status(code).json({
            success: true,
            message: "Data fetched",
            data: getOrderList,
            count: getOrderList.length
        });
    } catch (error) {
        return res.status(500).json({ code: 500, message: error.message });
    }
};

const allUserOrder = async (req, res) => {
    const userId = req.user._id;
    console.log(userId,"userId")
    let code = 200;
    try {
        const getOrderList = await orderCollection.find({orderBy:userId});
        return res.status(code).json({
            success: true,
            message: "Data fetched",
            data: getOrderList,
            count: getOrderList.length
        });
    } catch (error) {
        return res.status(500).json({ code: 500, message: error.message });
    }
};

const cancelOrder = async (req, res) => {
    const { id, Status } = req.body;
    try {
        const data1 = {
            Status: Status
        };
        const orderData = await orderCollection.findById(id)
        if (orderData?.paymentType && orderData?.paymentType == "online") {
            const stripeInstance = stripe(process.env.STRIPE_KEY);
            const paymentIntent = await stripeInstance.paymentIntents.retrieve(orderData.paymentIntent);
            const refund = await stripeInstance.refunds.create({
                charge: paymentIntent.latest_charge,
            });
            const response = await orderCollection.findByIdAndUpdate(
                id,
                { $set: { ...data1 } },
                { new: true }
            );

            if (response) {
                return res.status(200).json({
                    success: true,
                    message: "Order is canceled",
                    data: response,
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: "No Order Found",
                });
            }
        } else {
            const response = await orderCollection.findByIdAndUpdate(
                id,
                { $set: { ...data1 } },
                { new: true }
            );

            if (response) {
                return res.status(200).json({
                    success: true,
                    message: "Order is canceled",
                    data: response,
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: "No Order Found",
                });
            }
        }

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
};


module.exports = {
    placeOrder,
    allOrderList,
    cancelOrder,
    allUserOrder
}