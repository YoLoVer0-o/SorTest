import { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Breadcrumb } from 'antd';
import { Outlet } from 'react-router-dom';
import { Footer } from 'antd/es/layout/layout';
const { Header, Sider, Content } = Layout;
const MainPage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout className='tw-max-w-full tw-max-h-full'>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: 'nav 1',
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: 'nav 2',
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: 'nav 3',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}

                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: '4rem',
                            height: '4rem',
                        }}
                    />

                </Header>
                <Breadcrumb className='tw-pl-4'>
                    <Breadcrumb.Item>test1</Breadcrumb.Item>
                    <Breadcrumb.Item>test2</Breadcrumb.Item>
                </Breadcrumb>

                <Content
                    style={{
                        margin: '1.5rem 1rem',
                        padding: '1.5rem',
                        background: colorBgContainer,
                    }}
                    className='tw-flex tw-flex-wrap tw-max-w-full tw-max-h-full tw-content-center tw-justify-center tw-object-contain'
                >
                    <Outlet className="tw-flex tw-max-h-fit tw-max-w-fit tw-object-contain" />
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Ant Design ©2023 Created by Ant UED
                </Footer>
            </Layout>

        </Layout>

    );
};
export default MainPage;