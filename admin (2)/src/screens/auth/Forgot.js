import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo3.jpg';
import food from '../../assets/organic.png';

const Forgot = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  
  const handleForgot = (e) => {
    e.preventDefault()
    if (!email) {
      alert("please enter email id")
      return
    } else if (email !== "" && !emailPattern.test(email)) {
      alert("please enter valid email")
      return
    }else{
      navigate('/verification')
    }
  }

  const handleInput = (e) => {
    setEmail(e.target.value)
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
                  <h2 className='medium_font'>Forgot Password</h2>
                  <h2 className='small_font'>Enter your email address to reset your password</h2>
                </div>
                <form onSubmit={handleForgot}>
                  <label className='small_font'>Email</label>
                  <input className='input_fields mb-4' name='email' value={email} onChange={handleInput} />
                  <div className='text-center mt-5'>
                    <button className='common_btn'>Continue</button>
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

export default Forgot;