import React from 'react';
import { Button, Form, Input } from 'antd';
import logo from '../../assets/logo.jpg';
import food from '../../assets/4.png';

const Forgot = () => {

    const handleForgot = (formValues) => {
        console.log(formValues)
    }
    
    return (
        <>
            <div className='d-flex'>
                <div className='common_left_div'>
                    <img src={food} alt='picture' width="50%" />
                </div>
                <div className='common_right_div'>
                    <div className='login_content'>
                        <div className='text-center mb-3'>
                            <img src={logo} alt='logo' className='logo' />
                            <h2 className='big_font mt-3'>Forgot Password?</h2>
                            <h2 className='small_font'>Enter your email address to reset your password</h2>
                        </div>
                        <Form onFinish={handleForgot} layout="vertical">
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

                            <div className='text-center pt-4'>
                                <Button type="ghost" htmlType="submit" className='border_btn2 w-50 common_back'>Continue</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Forgot;
