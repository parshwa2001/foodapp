import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.jpg';
import food from '../../assets/2.png';
import { ToastContainer, toast } from "react-toastify";
import * as authActions from "../../services/authService";

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleRegister = async (formValues) => {
        setLoading(true)
        try {
            let response = await authActions.register(formValues);

            if (response && response.data) {
                let dataObj = response.data;
                if (response.status == 200) {
                    toast.success(dataObj.message);
                    setTimeout(() => {
                        navigate("/");
                    }, 1000);

                    localStorage.setItem("user_token", dataObj.token);
                    localStorage.setItem("userid_", dataObj.data._id);
                } else {
                    setLoading(false)
                    toast.error(dataObj.message)
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
                            <h2 className='big_font mt-3'>Register</h2>
                            <h2 className='small_font'>Create your account</h2>
                        </div>
                        <Form onFinish={handleRegister} layout="vertical">
                            <Form.Item
                                label={<b className='small_font'>Name</b>}
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your name!',
                                    },
                                ]}
                            >
                                <Input className='common_input' />
                            </Form.Item>

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
                                label={<b className='small_font'>Phone no</b>}
                                name="phoneNumber"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your phone number!',
                                    },
                                ]}
                            >
                                <Input className='common_input' />
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

                            {/* <Form.Item
                                label={<b className='small_font'>Confirm Password</b>}
                                name="c_password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your confirm password!',
                                    },
                                ]}
                            >
                                <Input className='common_input' />
                            </Form.Item> */}

                            <div className='text-center pt-4'>
                                <Button loading={loading} type="ghost" htmlType="submit" className='border_btn2 w-50 common_back'>Register</Button>
                                <h2 className='small_font my-3'>
                                    Already have an account <Link to='/login'><span style={{ color: "#222", fontWeight: "800" }}>Login</span></Link>
                                </h2>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;
