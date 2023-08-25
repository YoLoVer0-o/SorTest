// import React from 'react';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import background from '../assets/loginBG.jpg';

function Login() {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };
    return (
        <div className="tw-grid tw-grid-flow-col tw-auto-cols-auto tw-h-full tw-w-full tw-max-w-full tw-max-h-full tw-bg-white">
            <div className='tw-flex tw-h-full tw-w-full tw-max-w-full'>
                <div className='tw-w-full tw-h-full tw-bg-fixed tw-bg-cover tw-bg-no-repeat' style={{ backgroundImage: `url(${background})` }}></div>
            </div>
            <div className='tw-flex tw-flex-col tw-flex-wrap tw-h-full tw-w-full tw-max-w-full tw-max-h-full tw-content-center tw-justify-center tw-align-middle tw-text-center'>
                <h1 className='tw-text-lg tw-font-extrabold'>HELLO!</h1>
                <p className='tw-m-4'>Sign up to get started</p>
                <p>ไทย</p>
                <p>english</p>
                <Form
                    name="normal_login"
                    className="login-form tw-max-w-full tw-max-h-full tw-align-middle tw-self-center tw-m-4"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Email!',
                            },
                        ]}
                    >
                        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="tw-bg-blue-600">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>

        </div>
    );
}
export default Login;