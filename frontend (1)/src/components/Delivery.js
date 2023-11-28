import React from 'react';
import { Button, Form, Input } from 'antd';
import {useNavigate } from 'react-router-dom';
const Delivery = ({ serviceModal }) => {
    const navigate = useNavigate();

    const handleFormSubmit = (formValues) => {
        formValues.type = "Delivery";
        const jsonString = JSON.stringify(formValues);
        localStorage.setItem('formValues', jsonString);
        navigate("/details");
    }
    return (
        <>
            <div className='my-4'>
                <Form onFinish={handleFormSubmit} layout="vertical">
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
                        label={<b className='small_font'>Phone No</b>}
                        name="phone_no"
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
                        label={<b className='small_font'>Address</b>}
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your address!',
                            },
                        ]}
                    >
                        <Input className='common_input' />
                    </Form.Item>

                    <div className='d-flex pt-4'>
                        <Button style={{ height: "40px" }} type="ghost" htmlType="submit" className='border_btn2 w-100 me-3'>Proceed</Button>
                        <Button style={{ height: "40px" }} onClick={() => serviceModal(false)} type="ghost" className='border_btn2 w-100'>Cancel</Button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default Delivery
