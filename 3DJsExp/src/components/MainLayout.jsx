import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import {
    Layout,
    Menu,
    Button,
    theme,
    Breadcrumb
} from 'antd';
import {
    Link,
    Outlet,
    useLocation,
    useNavigate
} from 'react-router-dom';
import { Footer } from 'antd/es/layout/layout';

const { Header,
    Sider,
    Content
} = Layout;

const MainLayout = props => {


    const breadcrumbNameMap = {
        '/main': 'main',
        '/main/overall': 'overall',
        '/main/overall/feedback': 'Feedback',
        '/postlog': 'postlog',
    };
    const navigate = useNavigate();

    const location = useLocation();



    const pathSnippets = location.pathname.split('/').filter((i) => i);

    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        // console.log(url);
        return {
            key: url,
            title: <Link to={url}>{breadcrumbNameMap[url]}</Link>,
        };
    });
    const breadcrumbItems = [].concat(extraBreadcrumbItems);

    const handleMenuClick = ({ key }) => {
        if (key) {
            navigate(key);
            // console.log(key);
        }
    };

    const [collapsed, setCollapsed] = useState(false);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    useEffect(() => {
        if (location.pathname == '/') {
            // console.log("blank url");
            navigate('/main')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);


    return (
        <Layout className='tw-max-w-full tw-max-h-full tw-h-[100%]'>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    onClick={handleMenuClick}
                    selectedKeys={props.pageKey}
                    items={[
                        {
                            key: '/main',
                            icon: <UserOutlined />,
                            label: 'main',
                        },
                        {
                            key: '/postlog',
                            icon: <VideoCameraOutlined />,
                            label: 'DataLog',
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
                <Breadcrumb className='tw-pl-4' items={breadcrumbItems} />
                <Content
                    style={{
                        margin: '1.5rem 1rem',
                        padding: '1.5rem',
                        background: colorBgContainer,
                    }}
                    className='tw-flex tw-flex-wrap tw-max-w-full tw-max-h-fit tw-justify-center tw-object-contain'
                >
                    <Outlet className="tw-flex tw-max-h-fit tw-max-w-fit tw-object-contain tw-justify-center" />
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

MainLayout.propTypes = {
    pageKey: PropTypes.array.isRequired,
}

export default MainLayout;