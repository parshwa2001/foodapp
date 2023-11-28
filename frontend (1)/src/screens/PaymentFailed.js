import React from "react";
import { Button, Image } from "react-bootstrap";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function PaymentFailed() {

    const navigate = useNavigate();


    const handleSubmit = () => {
        navigate(
            `/`
        );
    };
    return (
        <div className="payment_wrapper payment_failed_wrapper">
            <div className="payment_main_box">
                <div className="payment_content_box mx-auto">
                    <div className="payment_content_inner">
                        <div className="payment_failed_icon">
                            <IoIosCloseCircleOutline />
                        </div>
                        <div className="payment_failed_content">
                            <h6 className="mb-0">Payment failed !!</h6>
                            <p>Your payment has failed. Please go back and try again.</p>
                            <Button className="payment_failed_btn" onClick={handleSubmit}>Try again</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}