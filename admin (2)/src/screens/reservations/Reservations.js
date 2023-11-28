import React, { useState, useEffect } from 'react';
import { Switch, Table } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import reservation from '../../assets/reservation.png';
import * as orderService from "../../services/orderService";
import { ToastContainer, toast } from "react-toastify";

const Reservations = () => {
    const [loading, setLoading] = useState(false);
    const [bookingData, setBookingData] = useState([]);

    const adminToken = localStorage.getItem("admin_token")

    const column = [
        {
            title: "#",
            dataIndex: "index",
            key: "index"
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email"
        },
        {
            title: "Date",
            dataIndex: "bookingDate",
            key: "bookingDate"
        },
        {
            title: "Time",
            dataIndex: "bookingTime",
            key: "bookingTime"
        },
        {
            title: "PhoneNumber",
            dataIndex: "phoneNumber",
            key: "phoneNumber"
        },
        {
            title: "Total Guest",
            dataIndex: "noOfGuest",
            key: "noOfGuest"
        },
        {
            title: "Status",
            dataIndex: "Status",
            key: "Status",
            render: (text, record) => (
                <span>
                <Switch
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    checked={record.bookingStatus === 'Confirmed'}
                    disabled={record.bookingStatus !== 'Confirmed'}
                    onChange={() => cancelReservation(record)}
                />
            </span>
            ),
        },
    ]

    const getBooking = async () => {
        setLoading(true);
        if (adminToken) {
            const response = await orderService.bookingList(adminToken);
            if (response?.status == 200) {
                const sortedItems = response.data.data.sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });
                setBookingData(sortedItems);
                setLoading(false);
            } else {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        getBooking();
    }, [adminToken]);

    const cancelReservation = async (item) => {
        if (adminToken) {
            const response = await orderService.cancelReservation(adminToken, "Cancelled", item._id);
            if (response.status === 200) {
                toast.success(response?.data?.message);
                getBooking();
            } else {
                toast.error('Error cancel order');
            }
        }
    }

    return (
        <>
        <ToastContainer/>
            <div className='table_card'>
                <div className='row d-flex align-items-center'>
                    <div className='col-lg-4'>
                        <div className='card_div'>
                            <h2 className='medium_font'>Total Reservations <h2 className='small_font'>500</h2></h2>
                            <img src={reservation} width="30%" />
                        </div>
                    </div>
                    <div className='mt-5'>
                        <Table columns={column} dataSource={bookingData.map((item, index) => ({
                            ...item,
                            index: index + 1,
                        }))}
                            pagination={{
                                pageSize: 5,
                            }} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reservations;
