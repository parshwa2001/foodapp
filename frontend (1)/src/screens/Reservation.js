import React, { useState } from 'react';
import { Modal } from 'antd';
import { IoCalendar } from 'react-icons/io5';
import { HiMiniUsers } from 'react-icons/hi2';
import { BsFillPhoneFill, BsCalendarWeekFill } from 'react-icons/bs';
import { MdMarkEmailUnread } from 'react-icons/md';
import {  } from 'react-icons/md';

const Reservation = () => {
    const [deleteModal, setDeleteModal] = useState(false);

    const handleCancelReservation = () => {
        setDeleteModal(true)
    }
    return (
        <>
            <div className='container-fluid mt-5'>
                <div className='row'>
                    <div className='col-md-9 col-lg-6 mb-5 mx-auto'>
                        <p className='big_font text-center'>My Reservations</p>
                        <div className='service_btn p-0 text-start'>
                            <div className='text-center my-1'>
                                <IoCalendar size={window.innerWidth < 460 ? 40 : 45} />
                            </div>
                            <div className="shop_cart align-items-start" style={{ borderRadius: "0 0 10px 10px" }}>
                                <div className="">
                                    <div className="mx-2">
                                        <h2 className='small_font'><HiMiniUsers size={20}/> Number of guest - (15)</h2>
                                        <h2 className='small_font'><BsFillPhoneFill size={20}/>Phone no - 8847500000</h2>
                                        <h2 className='small_font'><MdMarkEmailUnread size={20}/> Email - johndoe@gnmail.com</h2>
                                        <h2 className='small_font'><BsCalendarWeekFill size={20}/> Date & time - 10 jan 2023 11 A.M</h2>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button onClick={() => handleCancelReservation()} className='btn btn-dark btn-sm mb-3'>Cancel Reservation</button>
                                    <h2 className='small_font text-secondary'>Prepaid</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Modal */}
            <Modal open={deleteModal} closable={false} onCancel={() => setDeleteModal(false)} onOk={''}>
                <h2 className='small_font'>Are you sure you want to cancel your reservation</h2>
            </Modal>
        </>
    )
}

export default Reservation;
