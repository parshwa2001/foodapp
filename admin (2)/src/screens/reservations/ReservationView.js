import React from 'react';
import { Table } from 'antd';
import { MdMarkEmailUnread } from 'react-icons/md';
import { BsFillPhoneFill } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';

const ReservationView = () => {
    const column = [
        {
            title: "#",
            dataIndex: "index",
            key: "index"
        },
        {
            title: "Image",
            dataIndex: "image",
            key: "image"
        },
        {
            title: "Payment Mode",
            dataIndex: "payment_mode",
            key: "payment_mode"
        },
        {
            title: "Total Guest",
            dataIndex: "total_guest",
            key: "total_guest"
        },
    ]
    return (
        <>
            <div className='table_card'>
                <div className='row d-flex align-items-center'>
                    <div className='col-lg-4'>
                        <div className='listing_card'>
                            <h2 className='small_font'><FaUserCircle size={20}/> John Doe</h2>
                            <h2 className='small_font'><MdMarkEmailUnread size={20}/> johndoe@gmail.com</h2>
                            <h2 className='small_font'><BsFillPhoneFill size={20}/> 8847500000</h2>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <Table columns={column} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReservationView;
