import React from 'react';
import { Button, Form, Input } from 'antd';
import logo from '../../assets/logo.jpg';
import food from '../../assets/2.png';

const ResetPassword = () => {
    const handleResetPassword = (formValues) => {
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
                            <h2 className='big_font mt-3'>Reset Your Password</h2>
                        </div>
                        <Form onFinish={handleResetPassword} layout="vertical">
                            <Form.Item
                                label={<b className='small_font'>New Password</b>}
                                name="new_password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your new password!',
                                    },
                                ]}
                            >
                                <Input.Password className='common_input' />
                            </Form.Item>

                            <Form.Item
                                label={<b className='small_font'>Confirm Password</b>}
                                name="c_password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your confirm password!',
                                    },
                                ]}
                            >
                                <Input.Password className='common_input' />
                            </Form.Item>

                            <div className='text-center pt-4'>
                                <Button type="ghost" htmlType="submit" className='border_btn2 w-50 common_back'>Reset Password</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword;
