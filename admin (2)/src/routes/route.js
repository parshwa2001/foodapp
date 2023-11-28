import React from 'react';
import { HashRouter, Routes, Route, BrowserRouter } from 'react-router-dom';


// Auth Pages
import Login from '../screens/auth/Login';
import Forgot from '../screens/auth/Forgot';
import Verification from '../screens/auth/Verification';
import ResetPassword from '../screens/auth/ResetPassword';
// Logged Screens
import PrivateRoutes from './privateRoute';
import PrivateRoute from '../hoc/PrivateRouter';
import Profile from '../screens/auth/Profile';
import DashBoard from '../screens/dashboard/DashBoard';
import Customers from '../screens/customers/Customers';
import Reservations from '../screens/reservations/Reservations';
import Orders from '../screens/orders/Orders';
import Analytics from '../screens/analytics/Analytics';
import Products from '../screens/products/Products';
import ProtectedRoutes from '../hoc/ProtectedRoutes';
import ChangePassword from '../screens/auth/ChangePassword';
import ReservationView from '../screens/reservations/ReservationView';

const route = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<PrivateRoutes />}>
          <Route path='/profile' element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>

          } />
          <Route path='/dashboard' element={
            <PrivateRoute>
              <DashBoard />
            </PrivateRoute>
          } />
          <Route path='/customers' element={
            <PrivateRoute>
              <Customers />
            </PrivateRoute>
          } />
          <Route path='/reservations' element={
            <PrivateRoute>
              <Reservations />
            </PrivateRoute>

          } />
          <Route path='/orders' element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          } />
          <Route path='/analytics' element={
            <PrivateRoute>
              <Analytics />
            </PrivateRoute>
          } />
          <Route path='/products' element={
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          } />
          <Route path='/update-password' element={
            <PrivateRoute>
              <ChangePassword />
            </PrivateRoute>
          } />
          <Route path='/reservation-list' element={
            <PrivateRoute>
              <ReservationView />
            </PrivateRoute>
          } />
        </Route>


        <Route path='/' element={
          <ProtectedRoutes>
            <Login />
          </ProtectedRoutes>
        } />
        <Route path='/forgot-password' element={
          <ProtectedRoutes>
            <Forgot />
          </ProtectedRoutes>

        } />
        <Route path='/verification' element={<Verification />} />
        <Route path='/reset-password' element={
          <ProtectedRoutes>
            <ResetPassword />
          </ProtectedRoutes>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default route;