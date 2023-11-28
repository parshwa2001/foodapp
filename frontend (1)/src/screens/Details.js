import React, { useState, useEffect } from "react";
import { Button, List, Typography, Modal } from 'antd';
import { RiDeleteBin6Line, RiEBike2Fill } from 'react-icons/ri';
import { HiShoppingBag } from 'react-icons/hi';
import { IoCalendar } from 'react-icons/io5';
import { ToastContainer, toast } from "react-toastify";
import food from '../assets/2.jpeg';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutForm from './checkOut';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import * as authActions from "../services/authService";
import { apiBaseUrl } from "../constants/constants";
import { json, useNavigate } from "react-router-dom";
import { UNSET_CART } from "../redux/slice/cartSlice";
import * as orderService from "../services/orderService";

const Details = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const cartData1 = useSelector((state) => state?.cart?.cartData);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [paymentData, setPaymentData] = useState({
        name: "",
        email: "",
        phone: "",
        paymentType: ""
    })
    const shipingCost = 40

    const userId = localStorage.getItem("userid_")
    const userToken = localStorage.getItem("user_token")
    const bookingDataString = localStorage.getItem("formValues");
    const bookingData = JSON.parse(bookingDataString);


    const typeValue = bookingData.type;
    const stripePromise = loadStripe("pk_live_51ODjL8CCvFokLJY1pxLfnmsbCsYTWjsQRnIqdAPiQnU4FWCa6OIDnV4RAymVYLllhRFUEeOFlqkuacb0M9l8yTfo00a7ukOCBe");
    const totalPrice = cartData1.reduce((total, item) => total + (item.price), 0);

    let getUserById = async () => {
        const response = await authActions.getUser(userId, userToken);
        setPaymentData({ name: response?.data?.data.name, email: response?.data?.data.email, phone: response.data.data.phoneNumber })
    };
    useEffect(() => {
        getUserById();
    }, [userToken]);

    const handlePlaceOrderClick = async () => {
        if (paymentData.paymentType == "online") {
            setIsModalVisible(true);
        } 
        else if (paymentData.paymentType == "cod") {
            const formData = {
                userName: "Sam",
                Status: "Confirmed",
                orderType: typeValue,
                paymentType: paymentData.paymentType,
                totalPrice: totalPrice,
                orderData: bookingData

            }
            if (typeValue == "Reservation") {
                const reservationData =
                {
                    bookingData,
                    totalPrice
                }
                const bookReservation = await orderService.bookReservation(reservationData, userToken)
                if (bookReservation.status == 200) {
                    navigate("/paymentSucces")
                    dispatch(UNSET_CART([]))
                }
            }
            else {
                const placeOrder = await orderService.placeOrder(formData, userToken)
                if (placeOrder.status == 200) {
                    navigate("/paymentSucces")
                    dispatch(UNSET_CART([]))
                }

            }

        }
        else {
            toast.warning("Select payment type");
        }
    }

    const handleModalOk = () => {
        setIsModalVisible(false);
    }

    const handleModalCancel = () => {
        setIsModalVisible(false)
    }

    const handlePaymentTypeChange = (event) => {
        const selectedPaymentType = event.target.value;
        setPaymentData({
            ...paymentData,
            paymentType: selectedPaymentType
        });
    }
    return (
        <>
            <ToastContainer />
            <div className=''>
                <div className="service_btn">
                    {
                        typeValue == "Delivery" ? <RiEBike2Fill size={window.innerWidth < 460 ? 35 : 50} /> : typeValue == "PickUp" ? <HiShoppingBag size={window.innerWidth < 460 ? 35 : 50} /> : <IoCalendar size={window.innerWidth < 460 ? 35 : 50} />
                    }

                    <h2 className='small_font'>{typeValue}</h2>
                </div>
                <div className='row my-4 m-0'>
                    <div className='col-md-12 col-lg-7 mx-auto'>
                        {cartData1.map((item, index) => (
                            <div className="shop_cart" key={index}>
                                <div className="d-flex">
                                    <img src={`${apiBaseUrl}/uploads/${item.itemImg}`} alt="pic" className='cart_img_height img-thumbnail' />
                                    <div className="mx-2">
                                        <h2 className='small_font'>{item.name}</h2>
                                        <div className="quantity-buttons">
                                            {/* <Button onClick={() => increaseQuantity(item.id)}>+</Button> */}
                                            {/* <span>{quantities[item.id]}</span> */}
                                            {/* <Button onClick={() => decreaseQuantity(item.id)} disabled={quantities[item.id] === 1}>-</Button> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center flex-column">
                                    {/* <Button className='del_btn' onClick={() => handleDelete(item)}> */}
                                    <RiDeleteBin6Line />
                                    {/* </Button> */}
                                    <h2 className='small_font pt-4'>{`$${item.price}`}</h2>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='col-md-12 col-lg-7 mx-auto'>
                        {/* <h2 className='big_font'>Payment Detail</h2> */}
                        <div className='cart_card p-3'>
                            <div className='text-center sub_total_div'>
                                <List>
                                    <List.Item style={{ borderBottom: "none" }}>
                                        <Typography className='small_font' style={{ fontWeight: "400" }}>Sub Total</Typography>
                                        <Typography className='small_font'>$ {totalPrice}</Typography>
                                    </List.Item>
                                    {true == true ?
                                        <List.Item style={{ borderBottom: "none" }}>
                                            <Typography className='small_font' style={{ fontWeight: "400" }}>Shipping Cost</Typography>
                                            <Typography className='small_font'>${shipingCost}</Typography>
                                        </List.Item> : null}
                                    <List.Item >
                                        <Typography className='big_font'>Total Amount</Typography>
                                        <Typography className='big_font'>${totalPrice + shipingCost}</Typography>
                                    </List.Item>
                                </List>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-12 col-lg-7 mx-auto mt-4'>
                        <h2 className='big_font'>Payment Type</h2>
                        <select
                            className='common_input'
                            value={paymentData.paymentType}
                            onChange={handlePaymentTypeChange}
                        >
                            <option value=''>Select payment type----</option>
                            <option value='cod'>COD</option>
                            <option value='online'>ONLINE</option>
                        </select>
                    </div>
                </div>
                <div className='text-center mb-5'>
                    <Button className='border_btn2' onClick={handlePlaceOrderClick} disabled={paymentData.paymentType === "" || paymentData.paymentType === null}>Place Order</Button>
                </div>
            </div>
            <Modal
                title={<h2 className="small_font">Pay ${totalPrice + shipingCost}</h2>}
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                footer={null}
            >
                <h5>Payment Info</h5>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        paymentType={paymentData.paymentType}
                        paymentData={paymentData}
                    />
                </Elements>
            </Modal>
        </>
    )
}

export default Details;
