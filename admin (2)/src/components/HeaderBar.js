import React, { useState } from 'react';
import { Layout, Popover, Spin } from 'antd';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { FaRegUser, FaUserCircle, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo3.jpg';
import { BiLock } from 'react-icons/bi';
const { Header } = Layout;


const headerStyle = {
  height: 70,
  paddingInline: 30,
  backgroundColor: '#fff',
  color: '#000',
  zIndex: 12,
  background: '#fff',
  boxShadow: '2px 0 16px 8px rgba(0, 0, 0, 0.06)',

};

const HeaderBar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);



  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("userid_");
    setTimeout(() => {
      navigate('/');
    }, 1000);
  }

  return (
    <>
      <Header style={headerStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', height: 64, alignItems: 'center' }}>
          <div className='main_logo d-flex align-items-center' >
            <img src={logo} style={{ width: "40px", borderRadius: "50%" }} />
            <span className='medium_font ps-2'>Thai <span style={{ color: "#ff7782" }}>Budda</span></span>
          </div>
          <div className=''>
            <Link to={'#'} >
              <Popover placement='bottomRight' content={
                <div className='links-tag'>
                  <Link className='' to={'/profile'} ><FaRegUser style={{ color: 'gray', fontSize: 18, }} /><span className='mx-2'>My Profile</span> </Link>
                  <div className='my-2 links-tag'>
                    <Link to={'/update-password'} ><BiLock style={{ color: 'gray', fontSize: 18, }} /><span className='mx-2'>Change Password</span></Link>
                  </div>
                  <Link role='button' onClick={handleLogout}><RiLogoutBoxRLine style={{ color: 'gray', fontSize: 18, }} /><span className='mx-2'>Logout</span></Link>
                </div>
              }
              >
                <FaUserCircle role='button' style={{ fontSize: 40, color: 'gray' }} />
              </Popover>
            </Link>
          </div>
          {/* <div onClick={() => setOpen(!open)} className={''}>
            <MenuOutlined />
          </div> */}
        </div>
      </Header>
    </>
  )
}

export default HeaderBar;