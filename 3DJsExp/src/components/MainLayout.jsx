import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, Breadcrumb } from "antd";
import { Footer } from "antd/es/layout/layout";
import classNames from "classnames";
import { useResponsive } from "../hooks";

const { Header, Sider, Content } = Layout;

const MainLayout = (props) => {
  const {
    isDesktopOrLaptop,
    isBigScreen,
    isTabletOrMobile,
    isPortrait,
    isRetina,
  } = useResponsive();
  const breadcrumbNameMap = {
    "/main": "main",
    "/main/overall": "overall",
    "/main/overall/feedback": "Feedback",
    "/postlog": "postlog",
    "/postlog/report": "report",
  };
  const navigate = useNavigate();

  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return {
      key: url,
      title: <Link to={url}>{breadcrumbNameMap[url]}</Link>,
    };
  });
  const breadcrumbItems = [].concat(extraBreadcrumbItems);

  const handleMenuClick = ({ key }) => {
    if (key) {
      navigate(key);
    }
  };

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (location.pathname == "/") {
      navigate("/main");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <Layout className="tw-max-w-full tw-max-h-full tw-h-full">
      <Sider
        trigger={null}
        width={isTabletOrMobile && isPortrait ? "100%" : '200px'}
        collapsible
        collapsed={isTabletOrMobile && isPortrait ? !collapsed : collapsed}
        collapsedWidth={isTabletOrMobile && isPortrait ? 0 : 80}
        className={classNames(" tw-opacity-90", {
          "": isDesktopOrLaptop,
          " tw-absolute  tw-w-full tw-h-screen tw-z-10 ":
            isTabletOrMobile && isPortrait,
        })}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          onClick={handleMenuClick}
          selectedKeys={props.pageKey}
          items={[
            {
              key: "/main",
              icon: <UserOutlined />,
              label: "main",
            },
            {
              key: "/postlog",
              icon: <ContainerOutlined />,
              label: "DataLog",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "nav 3",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header className="tw-p-0 tw-bg-white">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: "4rem",
              height: "4rem",
              zIndex: "10",
            }}
          />
        </Header>
        <Breadcrumb className="tw-px-4 tw-my-4" items={breadcrumbItems} />
        <Content className="tw-flex tw-max-w-full tw-max-h-full tw-justify-center tw-m-1 tw-bg-white tw-object-contain">
          <Outlet className="tw-flex tw-max-h-full tw-max-w-full tw-justify-center tw-object-contain" />
        </Content>
        <Footer className="tw-h-6 tw-text-center tw-content-center tw-my-4">
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

MainLayout.propTypes = {
  pageKey: PropTypes.array.isRequired,
};

export default MainLayout;
