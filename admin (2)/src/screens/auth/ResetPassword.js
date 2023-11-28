import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo3.jpg';
import food from '../../assets/organic.png';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [inputVal, setInputVal] = useState('');

    const handleResetPassword = (e) => {
        e.preventDefault()
        if (!inputVal?.newpassword) {
            alert("please enter new password")
            return
        }else if (!inputVal?.c_password) {
            alert("please enter confirm password")
            return
        }else if (inputVal?.newpassword !== inputVal?.c_password) {
            alert("Both password doesn't match")
            return
        }else{
            navigate('/')
        }
    }
    const handleInput = (e) => {
        setInputVal({ ...inputVal, [e.target.name]: e.target.value })
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
                                    <h2 className='medium_font'>Reset Password</h2>
                                    <h2 className='small_font'>Please Enter Your New Password Below</h2>
                                </div>
                                <form onSubmit={handleResetPassword}>
                                    <label className='small_font'>New Password</label>
                                    <input className='input_fields mb-4' name='newpassword' value={inputVal?.newpassword} onChange={handleInput} />
                                    <label className='small_font'>Confirm Password</label>
                                    <input className='input_fields mb-2' name='c_password' value={inputVal?.c_password} onChange={handleInput} />
                                    <div className='text-center mt-5'>
                                        <button className='common_btn'>Reset Password</button>
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

export default ResetPassword;