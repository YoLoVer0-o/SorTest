import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  ContainerOutlined,
  CloseOutlined,
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
    isLandscape,
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
    <Layout className={classNames("tw-max-w-full", {
      "tw-min-h-screen": isTabletOrMobile && isLandscape,
      "tw-min-h-full tw-h-full tw-max-h-full": isDesktopOrLaptop || isTabletOrMobile,
    })}>
      <Sider
        trigger={null}
        width={isTabletOrMobile && isPortrait ? "100%" : 200}
        collapsible
        collapsed={isTabletOrMobile ? !collapsed : collapsed}
        collapsedWidth={isTabletOrMobile && isPortrait ? 0 : 80}
        className={classNames("tw-opacity-90 tw-min-h-screen", {
          "tw-absolute tw-w-full tw-h-full tw-z-10": isTabletOrMobile && isPortrait,
          "tw-sticky tw-top-0 tw-w-full tw-min-h-screen tw-z-10": isTabletOrMobile && isLandscape,
        })}
      >
        {isTabletOrMobile && isPortrait && (
          <div className={classNames("tw-w-full tw-grid tw-p-2 ", {})}>
            <Button
              className="tw-text-white tw-flex tw-right-0  tw-z-20 tw-justify-center tw-items-center tw-justify-self-end"
              icon={<CloseOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              shape="circle"
            ></Button>
          </div>
        )}

        <div className="demo-logo-vertical" />
        <Menu
          className={classNames("", {
            "tw-sticky tw-top-0 ": isTabletOrMobile && isLandscape,
          })}
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
        <Header className={classNames("tw-p-0 tw-bg-white tw-object-contain", {
          "tw-sticky tw-top-0 tw-z-10": isTabletOrMobile && !isPortrait,
        })}>
          {!(isTabletOrMobile && isPortrait && collapsed) && (
            <Button
              className={classNames("tw-h-16 tw-w-16 tw-text-lg", {})}
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            />
          )}
        </Header>
        <Breadcrumb className="tw-px-4 tw-my-4" items={breadcrumbItems} />
        <Content className={classNames("tw-flex tw-max-w-full tw-max-h-full tw-justify-center tw-m-1 tw-bg-white tw-object-contain", {
          "tw-overflow-auto": isTabletOrMobile && isLandscape,
        })}>
          <Outlet className={classNames("tw-flex tw-max-h-full tw-h-full tw-max-w-full tw-justify-center tw-object-contain", {

          })} />
        </Content>
        <Footer className={classNames("tw-text-center tw-content-center", {
          "tw-h-6 tw-my-4": isDesktopOrLaptop,
          "tw-h-2 tw-my-2": isTabletOrMobile,
        })}>
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
