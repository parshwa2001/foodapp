import React from 'react';
import { Button, Form, Input } from 'antd';

const Profile = () => {
  
  return (
    <>
      <div className='container-fluid'>
        <div className='row'>
          <div className='login_content py-4 col-md-9 col-lg-5 mx-auto'>
            <div className='text-center mb-3'>
              <h2 className='big_font'>Profile</h2>
            </div>
            <Form onFinish={''} layout="vertical">
              <Form.Item
                label={<b className='small_font'>Name</b>}
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your name!',
                  },
                ]}
              >
                <Input className='common_input' />
              </Form.Item>

              <Form.Item
                label={<b className='small_font'>Email</b>}
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                ]}
              >
                <Input type='email' className='common_input' />
              </Form.Item>

              <Form.Item
                label={<b className='small_font'>Phone no</b>}
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: 'Please input your phone number!',
                  },
                ]}
              >
                <Input className='common_input' />
              </Form.Item>

              <div className='text-center pt-4'>
                <Button type="ghost" htmlType="submit" className='border_btn2 w-50 common_back'>Edit</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile;
