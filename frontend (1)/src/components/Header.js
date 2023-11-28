import {React, useState, useEffect} from 'react';
import { Avatar, Badge, Dropdown, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { FaCartShopping, FaUserCircle } from 'react-icons/fa6';
import { FaUserAlt } from 'react-icons/fa';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { BiSolidUser } from 'react-icons/bi';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../assets/logo.jpg';
import { toast } from 'react-toastify';
import { Spin as Hamburger } from 'hamburger-react'


const Header = () => {
    const navigate = useNavigate();
    const cartData1 = useSelector((state) => state?.cart?.cartData);
    const token = localStorage.getItem('user_token');

    const handleLogout = () => {
        localStorage.removeItem("user_token");
        localStorage.removeItem("userid_");
        setTimeout(() => {
            toast.success("Logout successfully")
            navigate('/login');
        }, 1000);
    }

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (window.innerWidth < 480) {
            setIsOpen(false)
        } else {
            setIsOpen(true)
        }
    }, [])

    const CloseHandler = () => {
        if (window.innerWidth < 480) {
            setIsOpen(false)
        }
    }

    const items = [
        {
            label: <Link to="/profile"><span className='small_font'>Profile</span></Link>,
            key: '0',
            icon: <FaUserAlt />
        },
        {
            type: 'divider',
        },
        {
            label: <span className='small_font' onClick={handleLogout} >Logout</span>,
            key: 1,
            icon: <RiLogoutCircleLine onClick={handleLogout} />
        },
    ];
    return (
        <>
            <div className='header_div'>
                <div className='container-fluid common_flexing'>
                    <div className='logo_content'>
                        <img src={logo} className='logo_width' />
                        <div className='navbar-hamburger'><Hamburger color='#000000' toggled={isOpen} toggle={setIsOpen} /></div>
                        {isOpen && <div className='links'>
                            <Link onClick={CloseHandler} to='/'>Home</Link>
                            {token ? <Link onClick={CloseHandler} to='/reservation'>Reservation</Link> : ""}
                            {token ? <Link onClick={CloseHandler} to='/orders'>My Orders</Link> : ""}
                            <Link onClick={CloseHandler} to='#'>About Us</Link>
                        </div>}
                    </div>
                    <div className='cart_content common_flexing'>
                        <Link to='/cart'>
                            <Badge count={cartData1.length} className='me-3'>
                                <FaCartShopping size={30} style={{ cursor: "pointer", color: "222" }} />
                            </Badge>
                        </Link>
                        {!token ?
                            <Link to='/login'>
                                <button style={{ height: "40px" }} className='border_btn2'>LOGIN</button>
                            </Link>
                            :
                            <Dropdown menu={{ items }} trigger={['click']}>
                                <Avatar size={'large'}
                                    icon={<BiSolidUser />}
                                />
                            </Dropdown>
                        }
                    </div>
                </div>
            </div>
            <div style={{ height: "70px" }}></div>
        </>
    )
}

export default Header;
