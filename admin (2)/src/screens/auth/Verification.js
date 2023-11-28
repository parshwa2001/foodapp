import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo3.jpg';
import food from '../../assets/organic.png';

const Verification = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');

    const handleVerifyOtp = (e) => {
        e.preventDefault()
        if (!otp) {
            alert("OTP is required")
            return
        }else{
            navigate('/reset-password')
        }
    }


    const handleResendOtp = () =>{
        alert("Otp send Successfully")
    }

    return (
        <>
            <div className='login_background'>
                <div className='common_container'>
                    <div className='row'>
                        <div className='col-6'>
                            <img src={food} alt='picture' width="100%" />
                        </div>
                        <div className='col-6'>
                            <div className='login_content'>
                                <div className='text-center mb-3'>
                                    <div className='mb-4'>
                                        <img src={logo} alt='logo' width="20%" />
                                    </div>
                                    <h2 className='medium_font'>Verification!</h2>
                                    <h2 className='small_font'>We have sent a 4-digit verification code on your email</h2>
                                </div>
                                <form onSubmit={handleVerifyOtp}>
                                    <label className='small_font'>Enter OTP</label>
                                    <input type='number' className='input_fields mb-4' name='otp' value={otp} onChange={(e) => {setOtp(e.target.value)}} />
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <h2 className='small_font'>Didn't receive the code?</h2>
                                        <h2 style={{cursor:"pointer"}} onClick={handleResendOtp} className='small_font'>Resend</h2>
                                    </div>
                                    <div className='text-center mt-5'>
                                        <button className='common_btn'>Verify and Continue</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Verification;