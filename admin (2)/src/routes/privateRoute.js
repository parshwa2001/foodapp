import React from 'react';
import { Button, Drawer, Image, Layout, Menu, Popover, Spin, Tooltip } from 'antd'
import HeaderBar from '../components/HeaderBar';
import SideBar from '../components/SideBar';
import { Outlet } from 'react-router-dom';
const { Content } = Layout;

const contentStyle = {
    minHeight: 120,
    color: '#000',
    backgroundColor: '#ebf4fc',
    padding: '35px 30px',
    maxHeight: '100vh',
    overflowY: 'auto'
};
const privateRoute = () => {

    return (
        <>
            <Layout style={{ height: '100vh' }}>
                <HeaderBar />
                <Layout>
                    <SideBar />
                    <Content style={contentStyle}>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}

export default privateRoute;
