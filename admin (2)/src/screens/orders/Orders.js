import React, { useState, useEffect } from 'react';
import { Switch, Table } from 'antd';
import order from '../../assets/order.png';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import * as orderService from "../../services/orderService";
import { ToastContainer, toast } from "react-toastify";

const Orders = () => {
    const [loading, setLoading] = useState(false);
    const [orderData, setOrderData] = useState([]);

    const adminToken = localStorage.getItem("admin_token")

    const column = [
        {
            title: "#",
            dataIndex: "index",
            key: "index"
        },
        {
            title: "Username",
            dataIndex: "userName",
            key: "userName"
        },
        {
            title: "Type",
            dataIndex: "orderType",
            key: "orderType"
        },
        {
            title: "TotalPrice",
            dataIndex: "totalPrice",
            key: "totalPrice"
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
                        checked={record.Status === 'Confirmed'}
                        disabled={record.Status !== 'Confirmed'}
                        onChange={() => cancelOrder(record)}
                    />
                </span>
            ),
        },
    ]

    const getOrder = async () => {
        setLoading(true);
        if (adminToken) {
            const response = await orderService.orderList(adminToken);
            if (response?.status == 200) {
                const sortedItems = response.data.data.sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });
                setOrderData(sortedItems);
                setLoading(false);
            } else {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        getOrder();
    }, [adminToken]);

    const cancelOrder = async (item) => {
        if (adminToken) {
            const response = await orderService.cancelOrder(adminToken, "Cancelled", item._id);
            if (response.status === 200) {
                toast.success(response?.data?.message);
                getOrder();
            } else {
                toast.error('Error cancel order');
            }
        }
    }

    return (
        <>
            <ToastContainer />
            <div className='table_card'>
                <div className='row d-flex align-items-center'>
                    <div className='col-lg-4'>
                        <div className='card_div'>
                            <h2 className='medium_font'>Total Orders <h2 className='small_font'>{orderData.length}</h2></h2>
                            <img src={order} width="30%" />
                        </div>
                    </div>
                    <div className='mt-5'>
                        <Table columns={column} dataSource={orderData.map((item, index) => ({
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

export default Orders;
