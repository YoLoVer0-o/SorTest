import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  UploadOutlined,
  UserOutlined,
  ContainerOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, Breadcrumb } from "antd";
import classNames from "classnames";
import { useResponsive } from "../hooks";

const { Header, Sider, Content } = Layout;

const MainLayout = (props) => {
  const {
    isDesktopOrLaptop,
    isBigScreen,
    isTabletOrMobile,
    isMobile,
    isTablet,
    isPortrait,
    isLandscape,
  } = useResponsive();
  const breadcrumbNameMap = {
    "/main": "main",
    "/main/overall": "overall",
    "/main/overall/feedback": "Feedback",
    "/search": "search",
    "/postlog": "postlog",
    "/postlog/report": "report",
    "/createPost": "createPost",
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

  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    if (location.pathname == "/") {
      navigate("/main");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <Layout
      className={classNames("tw-w-screen", {
        "tw-min-h-screen": isTabletOrMobile && isLandscape,
        "tw-min-h-full tw-h-full tw-max-h-full":
          isDesktopOrLaptop || isTabletOrMobile,
      })}
    >
      <Header
        className={classNames(
          "tw-p-0 tw-flex tw-bg-[#303c6c] tw-object-contain ",
          {
            "tw-sticky tw-top-0 tw-z-10": isTabletOrMobile && isLandscape,
          }
        )}
      >
      </Header>

      <Layout className={"tw-relative"}>
        <div className={classNames("tw-flex tw-h-full tw-flex-row tw-absolute tw-z-40", {
          "tw-w-full": isMobile && isPortrait && !collapsed,
        })}>
          <Sider
            trigger={null}
            width={isTabletOrMobile && isPortrait ? "100%" : 200}
            collapsible
            collapsed={collapsed}
            // collapsedWidth={isTabletOrMobile && isPortrait ? 0 : 80}
            collapsedWidth={0}
            className={classNames("tw-min-h-full tw-z-40 tw-bg-[#0874c4]", {
              "tw-absolute tw-top-0": isMobile && isPortrait,
            })}
          >
            {isMobile && (
              <div className={classNames("tw-w-full tw-grid tw-p-2", {})}>
                <Button
                  className="tw-text-white tw-flex tw-right-0 tw-z-40 tw-justify-center tw-items-center tw-justify-self-end"
                  icon={<CloseOutlined />}
                  onClick={() => setCollapsed(!collapsed)}
                  shape="circle"
                ></Button>
              </div>
            )}

            <div className="demo-logo-vertical " />
            <Menu
              className={classNames("tw-bg-[#0874c4]  tw-text-white", {
                "tw-sticky tw-top-0 ": isTabletOrMobile && isLandscape,
              })}
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
                  key: "/search",
                  icon: <UploadOutlined />,
                  label: "Search",
                  className: "",
                },
                {
                  key: "/postlog",
                  icon: <ContainerOutlined />,
                  label: "DataLog",
                  className: "",
                },
                {
                  key: "/createPost",
                  icon: <UploadOutlined />,
                  label: "Create New Post",
                  className: "",
                },
              ]}
            />
          </Sider>
          <Button
            className={classNames("tw-sticky tw-bg-[#0874c4] tw-h-[10rem] tw-z-40 tw-items-center tw-w-8 tw-flex tw-text-center tw-justify-center tw-self-center", {
              "tw-hidden": !collapsed && isMobile,
            })}
            onClick={() => setCollapsed(!collapsed)}
          >
            <p className="tw-rotate-90 tw-text-white">Menu</p>
          </Button>
        </div>

        <Layout>

          <Breadcrumb className="tw-px-4 tw-my-4" items={breadcrumbItems} />
          <Content
            className={classNames(
              "tw-flex tw-max-w-full tw-max-h-full tw-justify-center tw-m-4 tw-bg-white tw-object-contain",
              {
                "tw-overflow-auto": isTabletOrMobile && isLandscape,
              }
            )}
          >
            <Outlet
              className={classNames(
                "tw-flex tw-max-h-full tw-h-full tw-max-w-full tw-justify-center tw-object-contain",
                {}
              )}
            />
          </Content>
        </Layout>
      </Layout>
    </Layout >
  );
};

MainLayout.propTypes = {
  pageKey: PropTypes.array.isRequired,
};

export default MainLayout;
