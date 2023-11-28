import React, { useState } from 'react';
import { Button, DatePicker, Form, Input, TimePicker } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.jpg';
import food from '../../assets/3.png';
import { ToastContainer, toast } from "react-toastify";
import * as authActions from "../../services/authService";
import { useDispatch } from 'react-redux';
// import { SET_CART } from '../../redux/slice/cartSlice';

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (formValues) => {
    setLoading(true)
    try {
      let response = await authActions.loginUser(formValues);

      if (response && response.data) {
        let dataObj = response.data;
        // dispatch(SET_CART(""))
        if (response.status === 200) {
          // setLoading(false)
          toast.success("Logged in successfully");
          setTimeout(() => {
            navigate("/");
          }, 1000)
          localStorage.setItem("user_token", dataObj?.data?.token);
          localStorage.setItem("userid_", dataObj.data.user._id);
        } else {
          toast.error(dataObj.message);
          setLoading(false)
        }
      }
    } catch (error) {
      setLoading(false)
      toast.error(error.message);
    }
  }
  return (
    <>
      <ToastContainer />
      <div className='d-flex'>
        <div className='common_left_div'>
          <img src={food} alt='picture' width="50%" />
        </div>
        <div className='common_right_div'>
          <div className='login_content'>
            <div className='text-center mb-3'>
              <img src={logo} alt='logo' className='logo' />
              <h2 className='big_font mt-3'>Welcome!</h2>
              <h2 className='small_font'>Please enter the email address & password <br /> to login into your account</h2>
            </div>
            <Form onFinish={handleLogin} layout="vertical">
              <Form.Item
                label={<b className='small_font'>Email</b>}
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                ]}
              >
                <Input type='email' className='common_input' />
              </Form.Item>

              <Form.Item
                label={<b className='small_font'>Password</b>}
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password className='common_input' />
              </Form.Item>
              <Link to='/forgot-password'><h2 className='small_font text-end' style={{ cursor: "pointer", color: "#222", textDecoration: "underline" }}>Forgot Password ?</h2></Link>

              <div className='text-center pt-4'>
                <Button loading={loading} type="ghost" htmlType="submit" className='border_btn2 w-50 common_back'>Login</Button>
                <h2 className='small_font my-3'>
                  Don't have an account <Link to='/register'><span style={{ color: "#222", fontWeight: "800" }}>Register</span></Link>
                </h2>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;
