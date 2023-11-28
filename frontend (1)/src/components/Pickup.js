import React from 'react';
import {useNavigate } from 'react-router-dom';
import { Button, DatePicker, Form, TimePicker } from 'antd';
import { useDispatch } from 'react-redux';
import { FaMapLocationDot } from 'react-icons/fa6';
import moment from 'moment';
// import {SET_TYPE} from "../redux/slice/orderSlice"
const Pickup = ({ serviceModal }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const handleFormSubmit = (formValues) => {
        formValues.date = moment(formValues?.date?.$d).format('YYYY-MM-DD');
        formValues.time = moment(formValues?.time?.$d).format('h:mm a');
        formValues.type = "PickUp";
        const jsonString = JSON.stringify(formValues);
        localStorage.setItem('formValues', jsonString);
        // dispatch(SET_TYPE(JSON.stringify(formValues)))
        navigate("/details");
    }
    return (
        <>
            <div className='address_card my-4'>
                <span className='big_font'>Hotel Thai buddha <FaMapLocationDot size={30} /></span>
                <h2 className='small_font'>abc street 123</h2>
            </div>

            <Form onFinish={handleFormSubmit} layout="vertical">
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
        </>
    )
}

export default Pickup;
