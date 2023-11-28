
import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { apiBaseUrl } from "../constants/constants";
import { useNavigate } from "react-router-dom";
import * as orderService from "../services/orderService";
// import { createNotification } from "../../helper/notification";
import { UNSET_CART } from "../redux/slice/cartSlice";

const CheckoutForm = ({ paymentData, paymentType }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const cartData1 = useSelector((state) => state?.cart?.cartData);
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);
    console.log(paymentType, "paymentType")
    const cardElementStyle = {
        base: {
            fontSize: "16px",
            color: "#424770",
            "::placeholder": {
                color: "#2c1b4c",
            },
        },
        invalid: {
            color: "#000",
        },
    };
    const userToken = localStorage.getItem("user_token")
    const bookingDataString = localStorage.getItem("formValues");
    const bookingData = JSON.parse(bookingDataString);
    const typeValue = bookingData.type;
    const totalPrice = cartData1.reduce((total, item) => total + (item.price), 0);

    async function submitHandler(event) {
        event.preventDefault();
        const res = await stripe.createToken(elements.getElement(CardElement));
        setIsLoading(true)
        const token = res?.token?.id;
        const cardId = res?.token?.card?.id;
        const month = res?.token?.card?.exp_month;
        const year = res?.token?.card?.exp_year;
        const last4Digits = res?.token?.card?.last4;

        try {
            const response = await axios.post(`${apiBaseUrl}/frontend/booking/addCard`, {
                tokenCard: token,
                cardId: cardId,
                month: month,
                year: year,
                email: paymentData?.email,
                last4Digits: last4Digits,
            }, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                }
            }
            );


            if (response.status == "200") {

                const bookingPayment = await axios.post(
                    `${apiBaseUrl}/frontend/booking/payment`,
                    {
                        paymentType: paymentData.paymentType,
                        phone: paymentData.phone,
                        name: paymentData.name,
                        totalPrice,
                        email: paymentData?.email,
                        paymentMethodId: response?.data?.paymentMethodId,
                        customerId: response?.data?.customerId,
                    }, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    }
                }
                );
                if (
                    bookingPayment.status == 200 &&
                    bookingPayment?.data?.clientSecret
                ) {
                    const clientSecret = bookingPayment?.data?.clientSecret;
                    const { paymentIntent, error } = await stripe.confirmCardPayment(
                        clientSecret
                    );
                    if (paymentIntent.status == "succeeded") {
                        const formData = {
                            userName: "Sam",
                            Status: "Confirmed",
                            orderType: typeValue,
                            paymentIntent: paymentIntent.id,
                            paymentType,
                            totalPrice: totalPrice,
                            orderData: bookingData

                        }
                        if (typeValue == "Reservation") {
                            const reservationData =
                            {
                                bookingData,
                                totalPrice,
                                paymentIntent: paymentIntent.id,
                                paymentType
                            }
                            const bookOrder = await orderService.bookReservation(reservationData, userToken)
                            navigate("/paymentSucces");
                            dispatch(UNSET_CART([]))
                        } else {
                            const placeOrder = await orderService.placeOrder(formData, userToken)
                            navigate("/paymentSucces");
                            dispatch(UNSET_CART([]))
                        }

                    } else {
                        navigate("/paymentFailed");
                    }
                }
            } else {
                setIsLoading(false);
            }
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="mb-3" style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "4px", backgroundColor: "transparent" }}>
                <CardElement options={{ style: cardElementStyle }} />
            </div>
            <button style={{ color: "#fff", backgroundColor: "#005941", border: "0", padding: "7px 20px", borderRadius: "4px" }} disabled={isLoading}  >{isLoading ? "Paying...." : "Pay"}</button>
        </form>
    );
};

export default CheckoutForm;
