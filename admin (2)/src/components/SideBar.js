import React, { useEffect, useState } from 'react';
import { Button, Image, Layout, Menu } from 'antd';
import { BiLock } from 'react-icons/bi';
import { TbArchive } from 'react-icons/tb';
import { MdStorefront, MdDashboard, MdProductionQuantityLimits } from 'react-icons/md';
import { MenuOutlined } from '@ant-design/icons';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { IoBagHandleOutline } from 'react-icons/io5';
import { PiShoppingCartLight } from 'react-icons/pi';
import { FaQuestion, FaUser } from 'react-icons/fa';
import { AiOutlineProfile, AiOutlineQuestionCircle } from 'react-icons/ai';
import { SiGoogleanalytics } from 'react-icons/si';
import { BiSolidMessageSquareAdd } from 'react-icons/bi';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const siderStyle = {
  backgroundColor: '#fff',
  boxShadow: '0 2px 14px 5px rgb(68 69 71 / 6%)',
};

const staticSidebarList = [
  {
    title: 'Dashboard',
    link: 'dashboard',
    icons: <MdDashboard style={{ fontSize: 20 }} />,
  },
  {
    title: 'Customers',
    link: 'customers',
    icons: <FaUser style={{ fontSize: 20 }} />,
  },
  {
    title: 'Reservations',
    link: 'reservations',
    icons: <TbArchive style={{ fontSize: 20 }} />,
  },
  {
    title: 'Orders',
    link: 'orders',
    icons: <IoBagHandleOutline style={{ fontSize: 20 }} />,
  },
  {
    title: 'Analytics',
    link: 'analytics',
    icons: <SiGoogleanalytics style={{ fontSize: 20 }} />,
  },
  {
    title: 'Products',
    link: 'products',
    icons: <MdProductionQuantityLimits style={{ fontSize: 20 }} />,
  },
  // {
  //   title: 'Add Item',
  //   link: 'add-item',
  //   icons: <BiSolidMessageSquareAdd style={{ fontSize: 20 }} />,
  // },
];
const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("Dashboard");
  const [activePath, setActivePath] = useState("");

  const handleMenuClick = (e) => {
    setSelectedKey(e.key); // update the selected key when a menu item is clicked
  };

  const handleBreakpoint = (broken) => {
    if (broken) {
      setCollapsed(true); // if the screen is broken (md and below), collapse the siderr
    } else {
      setCollapsed(false); // if the screen is not broken (lg and above), expand the sider
    }
  };

  // Navigation Side bar Selection
  const activeNavigation = (path) => {
    setActivePath(path)
    switch (path) {
      case "/dashboard":
        setSelectedKey("Dashboard");
        break;
      case "/customers":
        setSelectedKey("Customers");
        break;
      case "/reservations":
        setSelectedKey("Reservations");
        break;
      case "/orders":
        setSelectedKey("Orders");
        break;
      case "/analytics":
        setSelectedKey("Analytics");
        break;
      case "/products":
        setSelectedKey("Products");
        break;
      // case "/add-item":
      //   setSelectedKey("Add Item");
      //   break;
      default:
        setSelectedKey("");
    }
  };

  useEffect(() => {
    activeNavigation(location.pathname);
  }, [location.pathname]);
  return (
    <>
      <Sider theme="light" trigger breakpoint="md" collapsedWidth="75px" collapsible collapsed={collapsed} onBreakpoint={handleBreakpoint} style={siderStyle} >
        <div className=''>
          <div>
            <Menu theme="light" mode="inline" selectable={true} selectedKeys={[selectedKey]}
              onClick={handleMenuClick} defaultSelectedKeys={["Dashboard"]}
            >
              {staticSidebarList?.map((item, index) => {
                return (
                  <Menu.Item className='mb-4' key={item?.title} onClick={() => { navigate(`${item?.link}`); }}
                    style={{}}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      <span style={{ lineHeight: 0, borderRadius: '50%', padding: 8, background: item?.title == selectedKey ? "#222" : 'none', color: item?.title == selectedKey ? '#fff' : "inherit" }} >{item?.icons}</span>&nbsp;
                      <span>{!collapsed && item?.title}</span>
                    </span>
                  </Menu.Item>
                )
              })}
            </Menu>
          </div>
          <Button type='link' onClick={() => setCollapsed(!collapsed)} style={{ position: 'absolute', right: -30, top: 0, borderRadius: '50%' }} icon={!collapsed ? <BsFillArrowLeftCircleFill style={{ fontSize: 35, color: '#fff' }} /> : <BsFillArrowRightCircleFill style={{ fontSize: 35, color: '#fff' }} />} />
        </div>
      </Sider>
    </>
  )
}

export default SideBar;