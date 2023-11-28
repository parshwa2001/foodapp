import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, DatePicker, Form, Input, TimePicker } from 'antd';
import moment from 'moment';

const BookTable = ({ serviceModal }) => {
    const navigate = useNavigate();

    const handleFormSubmit = (formValues) => {
        formValues.date = moment(formValues?.date?.$d).format('YYYY-MM-DD');
        formValues.time = moment(formValues?.time?.$d).format('h:mm a');
        formValues.type = "Reservation";
        navigate("/details");
        const jsonString = JSON.stringify(formValues);
        localStorage.setItem('formValues', jsonString);
    }

    return (
        <>
            <div className='my-4'>
                <Form onFinish={handleFormSubmit} layout="vertical">
                    <Form.Item
                        label={<b className='small_font'>No of Guest</b>}
                        name="guest"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your guest!',
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
                        label={<b className='small_font'>Email</b>}
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input className='common_input' />
                    </Form.Item>

                    <Form.Item
                        label={<b className='small_font'>Select Date</b>}
                        name="date"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Date!',
                            },
                        ]}
                    >
                        <DatePicker className='common_input' />
                    </Form.Item>

                    <Form.Item
                        label={<b className='small_font'>Select Time</b>}
                        name="time"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Time!',
                            },
                        ]}
                    >
                        <TimePicker use12Hours format="h:mm a" className='common_input' />
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

export default BookTable;
