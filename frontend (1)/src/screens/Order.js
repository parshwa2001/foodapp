import React, { useState, useEffect, useRef } from 'react';
import { Modal } from 'antd';
import food from '../assets/3.jpeg';
import * as orderService from "../services/orderService";
import { HiShoppingBag } from 'react-icons/hi';

const Order = () => {
    const [loading, setLoading] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [productData, setProductData] = useState([]);

    const user_token = localStorage.getItem("user_token")

    const handleCancelOrder = () => {
        setDeleteModal(true)
    }

    const orderList = async () => {
        setLoading(true);
        const response = await orderService.orderList(user_token);
        if (response?.status == 200) {
            const sortedItems = response.data.data.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
            setProductData(sortedItems);
            setLoading(false);
        } else {
            setLoading(false);
        }
    };
    useEffect(() => {
        orderList();
    }, []);
    return (
        <>
            <div className='container-fluid my-5'>
                <div className='row'>
                    <p className='big_font text-center'>My orders</p>
                    {productData?.map((item, indx) => (
                        <div className='col-md-9 col-lg-6 mx-auto' key={indx}>
                            <div className='service_btn p-0 text-start'>
                                <div className='text-center my-1'>
                                    <HiShoppingBag size={window.innerWidth < 460 ? 40 : 45} />
                                </div>
                                <div className="shop_cart align-items-start" style={{ borderRadius: "0 0 10px 10px" }}>
                                    <div className="d-flex">
                                        <img src={food} alt="pic" className='cart_img_height img-thumbnail' />
                                        <div className="mx-2">
                                            <h2 className='small_font'>Price: {item.totalPrice}</h2>
                                            <h2 className='small_font'>Quantity: 10$</h2>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <button onClick={() => handleCancelOrder()} className='btn btn-dark btn-sm mb-3'>Cancel Order</button>
                                        <h2 className='small_font text-secondary'>{item.Status}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Delete Modal */}
            <Modal open={deleteModal} closable={false} onCancel={() => setDeleteModal(false)} onOk={''}>
                <h2 className='small_font'>Are you sure you want to cancel this item</h2>
            </Modal>
        </>
    )
}

export default Order;
