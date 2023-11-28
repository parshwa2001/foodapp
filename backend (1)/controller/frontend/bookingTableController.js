const bookingCollection = require("../../models/frontend/tableBookingSchema");
const { pick } = require("lodash");
const stripe = require("stripe");

const bookTable = async (req, res) => {
  try {
    const { bookingData, totalPrice, paymentType, paymentIntent } = req.body;
    console.log(req.body, "req.body");
    console.log(req.user, "req.user");
    const userId = req.user._id;

    const obj = {
      email: bookingData.email,
      noOfGuest: bookingData.guest,
      phoneNumber: bookingData.phone_no,
      bookingTime: bookingData.time,
      bookingDate: bookingData.date,
      price: totalPrice,
      paymentIntent,
      paymentType,
      bookedBy: userId,
    };
    const bookTable = await bookingCollection.create(obj);

    return res.status(200).json({
      success: true,
      message: "Table booked successfully..",
      data: bookTable,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const singleBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const singleBooking = await bookingCollection.findById(id);
    return res.status(200).json({
      success: true,
      message: "Data fetched",
      data: singleBooking,
    });
  } catch (error) {
    return res.status(500).json({ code: 500, message: error.message });
  }
};

const allBookingList = async (req, res) => {
  const userId = req.user._id;
  let code = 200;
  try {
    const getBookingList = await bookingCollection.find();
    return res.status(code).json({
      success: true,
      message: "Data fetched",
      data: getBookingList,
      count: getBookingList.length,
    });
  } catch (error) {
    return res.status(500).json({ code: 500, message: error.message });
  }
};

const deleteBooking = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await bookingCollection.findByIdAndDelete({ _id: id });
    if (response) {
      return res.status(200).json({
        success: true,
        message: "Deleted Successfully",
        data: response,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "No Theme Found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const updateBooking = async (req, res) => {
  const id = req.params.id;
  try {
    const data1 = pick(req.body, ["bookingStatus"]);

    const response = await bookingCollection.findByIdAndUpdate(id, { $set: { ...data1 } }, { new: true });

    if (response) {
      return res.status(200).json({
        success: true,
        message: "Booking status updated",
        data: response,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "No Booking Found", // Changed from "No Theme Found"
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const addCard = async (req, res) => {
  try {
    const { cardId, month, year, tokenCard, last4Digits, email, name } = req.body;

    const stripeInstance = stripe(process.env.STRIPE_KEY);

    let customerId = "";
    const customers = await stripeInstance.customers.list({
      email: email,
    });

    if (!customers.data || customers.data.length === 0) {
      const customer = await stripeInstance.customers.create({
        name: name,
        email: email,
      });
      customerId = customer.id;
    } else {
      customerId = customers.data[0].id;
    }

    if (!customerId || !cardId || !month || !year || !tokenCard || !last4Digits) {
      return res.status(400).json({
        success: false,
        message: "customer id & card details are required to be filled",
      });
    }

    const paymentMethod = await stripeInstance.paymentMethods.create({
      type: "card",
      card: {
        token: tokenCard,
      },
    });

    const attachcard = await stripeInstance.paymentMethods.attach(paymentMethod.id, {
      customer: customerId,
    });

    return res.status(200).json({
      success: true,
      paymentMethodId: paymentMethod.id,
      customerId: customerId,
      message: "card added successfully",
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const BookingPayment = async (req, res) => {
  try {
    let { paymentType, name, email, phone, customerId, paymentMethodId, totalPrice } = req.body;
    const userId = req.user._id;
    //   const salonOwner = await userCollection.findById(userId);

    const stripeInstance = stripe(process.env.STRIPE_KEY);
    const products = await stripeInstance.products.list();
    var Product = products.data.find((p) => p.name === "ThaiBudda");
    if (!Product) {
      Product = await stripeInstance.products.create({
        name: "ThaiBudda",
      });
    }
    const price = await stripeInstance.prices.create({
      product: Product.id,
      unit_amount: totalPrice * 100,
      currency: "inr",
    });

    console.log(price, "price");

    if (paymentType == "online") {
      const paymentIntent = await stripeInstance.paymentIntents.create({
        amount: totalPrice * 100,
        customer: customerId,
        payment_method: paymentMethodId,
        metadata: {
          product_id: Product.id,
        },
        currency: "inr",
      });
      const intent = await stripeInstance.paymentIntents.retrieve(paymentIntent.id);

      const invoice = await stripeInstance.invoices.create({
        customer: customerId,
        currency: "inr",
      });

      const invoiceItem = await stripeInstance.invoiceItems.create({
        customer: customerId,
        price: price.id,
        invoice: invoice.id,
      });

      const obj = {
        name: name,
        email: email,
        paymentIntent: paymentIntent.id,
        phone,
        invoiceNumber: invoice.id,
        // paymentStatus: paymentConfirm.status,
        amount: paymentIntent.amount / 100,
        userId,
      };
      console.log(obj, "obj");

      // const payment = paymentCollection.create(obj);

      return res.status(200).json({
        success: true,
        clientSecret: paymentIntent?.client_secret,
        price: obj.amount,
        status: 200,
      });
    }
  } catch (error) {
    return res.status(500).json({ code: 500, message: error.message });
  }
};

const cancelReservation = async (req, res) => {
  const { id, bookingStatus } = req.body;
  // return console.log(req.body,"ggggfg")
  try {
    const data1 = {
      bookingStatus: bookingStatus,
    };
    console.log(data1, "data1");
    const reservationData = await bookingCollection.findById(id);
    console.log(reservationData, "reservationData");
    if (reservationData?.paymentType && reservationData?.paymentType == "online") {
      // return console.log("here")
      const stripeInstance = stripe(process.env.STRIPE_KEY);
      const paymentIntent = await stripeInstance.paymentIntents.retrieve(reservationData.paymentIntent);
      const refund = await stripeInstance.refunds.create({
        charge: paymentIntent.latest_charge,
      });
      console.log(refund);
      const response = await bookingCollection.findByIdAndUpdate(id, { $set: { ...data1 } }, { new: true });

      if (response) {
        return res.status(200).json({
          success: true,
          message: "Booking is canceled",
          data: response,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "No Booking Found",
        });
      }
    } else {
      const response = await bookingCollection.findByIdAndUpdate(id, { $set: { ...data1 } }, { new: true });

      if (response) {
        return res.status(200).json({
          success: true,
          message: "Booking is canceled",
          data: response,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "No Booking Found",
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
  bookTable,
  singleBooking,
  allBookingList,
  deleteBooking,
  updateBooking,
  BookingPayment,
  cancelReservation,
  addCard,
};
