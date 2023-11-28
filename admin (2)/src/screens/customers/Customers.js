import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, Input, Modal, Table } from 'antd';
import user from '../../assets/user.png';
import * as customerService from "../../services/customerService";
import { ToastContainer, toast } from "react-toastify";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiAddToQueue } from 'react-icons/bi';
const Customers = () => {
    const [loading, setLoading] = useState(false);
    const [customerModal, setCustomerModal] = useState(false);
    const [customerData, setCustomerData] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    const adminToken = localStorage.getItem("admin_token")
    const dataSource = [
        {
            index: 1,
            name: "Jhon Doe",
            email: "johndoe@yopmail.com",
            number: "8847500000",
            address: "abc street florida"
        }
    ]


    const getCustomers = async () => {
        setLoading(true);
        if (adminToken) {
            const response = await customerService.customerList(adminToken);
            if (response?.status == 200) {
                const sortedItems = response.data.data.sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });
                setCustomerData(sortedItems);
                setLoading(false);
            } else {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        getCustomers();
    }, [adminToken]);

    const column = [
        {
            title: "#",
            dataIndex: "index",
            key: "index",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email"
        },
        {
            title: "Number",
            dataIndex: "phoneNumber",
            key: "phoneNumber"
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action ",
            render: (text, record) => (
                <span>
                    <a onClick={() => showDeleteModal(record)}><RiDeleteBinLine size={20} className='ms-1' /></a>
                </span>
            ),
        },
    ]

    const showDeleteModal = (item) => {
        setSelectedCustomer(item);
        setDeleteModalVisible(true);
    };

    const handleDeleteCancel = () => {
        setDeleteModalVisible(false);
    };

    const handleDeleteConfirm = async () => {
        if (selectedCustomer) {
            const itemId = selectedCustomer._id;

            const response = await customerService.deleteCustomer(itemId, adminToken);

            if (response.status === 200) {
                toast.success(response?.data?.message);
                getCustomers();
            } else {
                toast.error(response?.data?.message);
            }
        }

        setDeleteModalVisible(false);
    };

    return (
        <>
            <ToastContainer />
            <div className='table_card'>
                <div className='row d-flex align-items-center'>
                    <div className='col-lg-4'>
                        <div className='card_div'>
                            <h2 className='medium_font'>Total Customers <h2 className='small_font'>200k</h2></h2>
                            <img src={user} width="25%" />
                        </div>
                    </div>
                    <div className='col-lg-3 ms-auto'>
                        <button onClick={() => setCustomerModal(true)} className='common_btn px-0'><BiAddToQueue size={20} color='#fff' /> Add customer</button>
                    </div>


                    <div className='mt-5'>
                        {/* <Table columns={column} dataSource={customerData} /> */}
                        <Table columns={column} dataSource={customerData.map((item, index) => ({
                            ...item,
                            index: index + 1,
                        }))}
                            pagination={{
                                pageSize: 5,
                            }} />
                    </div>
                </div>
            </div>

            <Modal
                open={deleteModalVisible}
                title="Confirm Delete"
                onOk={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
                okText="Delete"
                cancelText="Cancel"
            >
                <p>Are you sure you want to delete this customer?</p>
            </Modal>

            {/*Add Customer Modal */}
            <Modal
                destroyOnClose
                open={customerModal}
                title={<h2 className='small_font text-center'>Add Customer</h2>}
                closable={false}
                footer={null}
            >
                <Form onFinish={''} layout="vertical">
                    <Form.Item
                        label={<b className='small_font'>Name</b>}
                        name="guest"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                            },
                        ]}
                    >
                        <Input className='input_fields' />
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
                        <Input className='input_fields' />
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
                        <Input className='input_fields' />
                    </Form.Item>


                    <div className='d-flex pt-4'>
                        <Button style={{ height: "40px" }} type="ghost" htmlType="submit" className='common_btn w-100 me-3'>Submit</Button>
                        <Button style={{ height: "40px", background: "gray" }} onClick={() => setCustomerModal(false)} type="ghost" className='common_btn w-100'>Cancel</Button>
                    </div>
                </Form>
            </Modal>
        </>
    )
}

export default Customers;