import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "../CartContext";
import PrivateRoute from "./PrivateRoute";
import PrivateRoutes from "../hoc/PrivateRouter";
import ProtectedRoutes from "../hoc/ProtectedRoutes";
// Before LOgin Screens
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import Forgot from "../screens/auth/Forgot";
import ResetPassword from "../screens/auth/ResetPassword";
// After Login Screens
import Home from "../screens/Home";
import CartItems from "../screens/CartItems";
import Details from "../screens/Details";
import Profile from "../screens/Profile";
import PaymentSucces from "../screens/PaymentSucces";
import PaymentFailed from "../screens/PaymentFailed";
import Order from "../screens/Order";
import Reservation from "../screens/Reservation";

const Router = () => {
  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<CartItems />} />
              <Route path="/paymentSucces" element={<PaymentSucces />} />
              <Route path="/paymentFailed" element={<PaymentFailed />} />
              <Route path="/details" element={<Details />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/orders" element={<Order />} />
              <Route path="/reservation" element={<Reservation />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<Forgot />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </>
  );
};

export default Router;
