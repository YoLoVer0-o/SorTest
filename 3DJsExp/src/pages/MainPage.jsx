import { useState } from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet } from "react-router-dom"

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];
const MainPage = () => {
    const [collapsed, setCollapsed] = useState(true);
    // const {
    //     token: { colorBgContainer },
    // } = theme.useToken();
    return (
        <Layout
            style={{
                maxHeight: '100%',
            }}
        >
            <Sider
                style={{
                    position: 'sticky',
                }}
                collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout>
                <Header className='tw-grid tw-grid-cols-2'>
                    <div><h1 className='tw-text-white'>your logo</h1></div>
                    <div></div>
                </Header>
                <Content
                    className='tw-w-full tw-max-w-full tw-max-h-full'
                    style={{
                        margin: '1rem 0',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '1rem 1rem',
                        }}
                    >
                        <Breadcrumb.Item>Breadcrumb1</Breadcrumb.Item>
                        <Breadcrumb.Item>Breadcrumb2</Breadcrumb.Item>
                    </Breadcrumb>
                    {/* <div
                        className='tw-flex tw-h-full tw-w-full tw-flex-wrap tw-justify-center tw-content-center tw-justify-self-center'
                    >
                        <Outlet />
                    </div> */}
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