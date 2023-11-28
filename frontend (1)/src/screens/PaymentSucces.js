import React, { useEffect, useState } from "react";
// import Logo from "../assets/img/bisi_logo.png";
import { Button, Image } from "react-bootstrap";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function PaymentSucces() {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate(
    `/`
    );
  };
  return (
    <div className="payment_wrapper">
      <div className="payment_main_box">
        <div className="payment_content_box mx-auto">
          <div className="payment_content_inner">
            <div className="payment_icon">
              <IoIosCheckmarkCircleOutline />
            </div>
            <div className="payment_content">
              <h6 className="">Order Placed Successfully !!</h6>
              {/* <p>Your payment has been successfully done.</p> */}
              <Button className="payment_btn" onClick={handleSubmit}>
                Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
