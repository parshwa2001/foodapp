import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';

const ChangePassword = () => {
    const [loading, setLoading] = useState(false);
    const handleChangePassword = () => {

    }
    return (
        <>
            <div className='row'>
                <div className='col-lg-6 mx-auto'>
                    <div className="profile_card">
                        <div className="text-center">
                            <p className='medium_font'>Change Password</p>
                        </div>
                        <Form onFinish={handleChangePassword} layout="vertical">
                            <Form.Item
                                label={<b className='small_font'>Old Password</b>}
                                name="guest"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your old password!',
                                    },
                                ]}
                            >
                                <Input className='input_fields' />
                            </Form.Item>

                            <Form.Item
                                label={<b className='small_font'>New Password</b>}
                                name="phone_no"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your new password!',
                                    },
                                ]}
                            >
                                <Input className='input_fields' />
                            </Form.Item>

                            <Form.Item
                                label={<b className='small_font'>Confirm Password</b>}
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input confirm password!',
                                    },
                                ]}
                            >
                                <Input className='input_fields' />
                            </Form.Item>


                            {/* <div className='d-flex pt-4'>
                                <Button style={{ height: "40px" }} type="ghost" htmlType="submit" className='common_btn w-100 me-3'>Submit</Button>
                                <Button style={{ height: "40px", background: "gray" }} onClick={() => setCustomerModal(false)} type="ghost" className='common_btn w-100'>Cancel</Button>
                            </div> */}
                            <div className="mx-auto mt-4" style={{ width: "40%" }}>
                                <Button loading={loading} className='common_btn mt-3' htmlType="submit">Submit</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangePassword;
