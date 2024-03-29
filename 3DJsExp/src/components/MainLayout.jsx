import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getLogin, logOut } from "../libs/loginSlice";
import { useResponsive } from "../hooks";
import SocialIcons from "../assets/SocialIcons";
import profile from "../assets/profile.png";
import { TbSeo } from "react-icons/tb";
import { Layout, Menu, Button, Breadcrumb, Tooltip } from "antd";
import {
  BarChartOutlined,
  CommentOutlined,
  UploadOutlined,
  ControlOutlined,
  ContainerOutlined,
  CloseOutlined,
  SlidersOutlined,
  TrademarkCircleOutlined,
  CrownOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import classNames from "classnames";
import PropTypes from "prop-types";

const { Header, Sider, Content } = Layout;

const MainLayout = (props) => {
  const isLogin = useSelector((state) => getLogin(state));

  // const isLogin = useSelector((state) => state.login?.items[0]);

  const [collapsed, setCollapsed] = useState(true);

  const [openKeys, setOpenKeys] = useState([]);

  const { isTabletOrMobile, isMobile, isPortrait, isLandscape } =
    useResponsive();

  const navigate = useNavigate();

  const location = useLocation();

  const param = useParams();

  const dispatch = useDispatch();

  ///////////////////////////////////////breadcrumb name///////////////////////////////////////////////////////////////////
  const breadcrumbNameMap = {
    "/main": "รายงานสรุป",
    "/main/overall": "ภาพรวม",
    "/postlog": "โพสต์และความเคลื่อนไหว",
    "/postlog/report": "รายงานโพสต์",
    "/postCreation": "เผยแพร่ข้อมูล",
    "/postCreation/createPost": "สร้างโพสต์ใหม่",
    "/postCreation/postStatus": "สถานะการโพส",
    "/postCreation/createGroupPost": "สร้างโพสต์ไปที่กลุ่ม",
    "/sentiment": "ประเมินผลตอบรับ",
    "/sentiment/report": "รายงานความคิดเห็น",
    "/RPA": "RPA",
    "/RPA/account": "บัญชีและสถานะ",
    "/RPA/fulltime": "งานประจำ",
    "/RPA/job": "งาน",
    "/RPA/errlog": "Error Log",
    "/RPA/activlog": "Activity Log",
    "/classconfig": "Classification Config",
    "/classconfig/edit": "แก้ไข",
    "/recommendation": "Recommendation",
    "/recommendation/similarpost": "ผลลัพธ์ของโพสต์ใกล้เคียง",
    "/recommendation/trending": "เนื้อหาที่กำลังได้รับความนิยม",
    "/admin": "admin",
    "/admin/usermanagement": "จัดการผู้ใช้งาน",
    "/seoWebSite": "SEO WebSite",
    "/account": "ข้อมูล",
    "/account/manage": "ค้นหาและบริหารจัดการ",
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////social icon declaration//////////////////////////////////////////////////////////////////////
  const { facebook, instagram, twitter, tiktok, youtube } = SocialIcons;
  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////breadcrumb render logic///////////////////////////////////////////////////////////////////
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const breadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;

    const [paramValue] = Object.values(param);

    const isDynamic = url.includes(paramValue);

    return {
      key: url,
      title: <p>{isDynamic ? paramValue : breadcrumbNameMap[url]}</p>,
    };
  });
  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleMenuClick = ({ key }) => {
    if (key) {
      setCollapsed(true);
      navigate(key);
    }
  };

  ///////////////////////////////////////root submenus///////////////////////////////////////////////////////////////////

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => !openKeys.includes(key));

    if (latestOpenKey) {
      const topLevelKeys = [];
      if (latestOpenKey.startsWith("/RPA")) {
        // console.log("hit1");
        topLevelKeys.push("/RPA");
        topLevelKeys.push(latestOpenKey);
      } else if (latestOpenKey.startsWith("/main")) {
        // console.log("hit2");
        topLevelKeys.push("/main");
        topLevelKeys.push(latestOpenKey);
      } else if (latestOpenKey.startsWith("/recommendation")) {
        // console.log("hit3");
        topLevelKeys.push("/recommendation");
        topLevelKeys.push(latestOpenKey);
      } else if (latestOpenKey.startsWith("/postCreation")) {
        // console.log("hit4");
        topLevelKeys.push("/postCreation");
        topLevelKeys.push(latestOpenKey);
      } else if (latestOpenKey.startsWith("/admin")) {
        // console.log("hit5");
        topLevelKeys.push("/admin");
        topLevelKeys.push(latestOpenKey);
      } else if (latestOpenKey.startsWith("/account")) {
        // console.log("hit6");
        topLevelKeys.push("/account");
        topLevelKeys.push(latestOpenKey);
      }
      console.log(topLevelKeys);
      setOpenKeys(topLevelKeys);
    } else {
      setOpenKeys([]);
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////back button logic////////////////////////////////////////////////////////////
  const showBackButton =
    breadcrumbItems.length > 1 &&
    !(
      breadcrumbItems.some((item) => item.key.includes("/RPA")) ||
      breadcrumbItems.some((item) => item.key.includes("/main")) ||
      breadcrumbItems.some((item) => item.key.includes("/recommendation")) ||
      breadcrumbItems.some((item) => item.key.includes("/postCreation")) ||
      breadcrumbItems.some((item) => item.key.includes("/admin")) ||
      breadcrumbItems.some((item) => item.key.includes("/account"))
    );
  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (location.pathname == "/" || location.pathname == "/main") {
      navigate("/main/overall");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    if (!isLogin?.status) {
      navigate("/login");
    }
    console.log(isLogin);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  return (
    <Layout
      className={classNames(
        "tw-w-full tw-min-h-full tw-h-full tw-max-h-full tw-max-w-full",
        {
          "tw-min-h-screen tw-h-screen tw-max-h-screen":
            isTabletOrMobile && isLandscape,
        }
      )}
    >
      <Header
        className={classNames(
          "tw-p-0 tw-flex tw-flex-row tw-justify-between tw-bg-[#303c6c] tw-object-contain ",
          {
            "tw-sticky tw-top-0 tw-z-10": isTabletOrMobile && isLandscape,
          }
        )}
      >
        <div className="tw-text-white tw-flex tw-items-center">
          <h1 className="tw-font-bold tw-mx-4 tw-text-2xl tw-h-fit">กังวาน</h1>
        </div>
        <div className="tw-flex tw-flex-row tw-gap-2 tw-mx-8 tw-py-4 tw-items-center">
          <div className="tw-w-max tw-h-max tw-border-2 tw-border-white tw-rounded-full">
            <img className="tw-rounded-full tw-h-10 tw-w-10" src={profile} />
          </div>
          <div className="tw-flex tw-flex-col tw-text-white tw-items-center">
            <p className="tw-text-xl">นายวินัย ใจรัก</p>
            <Button
              className="tw-h-min tw-w-fit tw-text-white tw-bg-red-600 tw-border-2 tw-border-white hover:tw-border-red-600 hover:tw-bg-white hover:tw-text-red-600"
              onClick={() => dispatch(logOut())}
            >
              Log Out
            </Button>
          </div>
        </div>
      </Header>

      <Layout className={"tw-max-w-full tw-relative"}>
        <div
          className={classNames(
            "tw-flex tw-h-full tw-flex-row tw-absolute tw-z-40",
            {
              "tw-w-full": isMobile && isPortrait && !collapsed,
            }
          )}
        >
          <Sider
            trigger={null}
            width={isTabletOrMobile && isPortrait ? "100%" : 200}
            collapsible
            collapsed={collapsed}
            collapsedWidth={0}
            className={classNames(
              "tw-min-h-full tw-overflow-y-auto tw-z-40 tw-bg-[#0874c4]",
              {
                "tw-absolute tw-top-0": isMobile && isPortrait,
              }
            )}
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
              openKeys={openKeys}
              onOpenChange={onOpenChange}
              items={[
                {
                  key: "/main",
                  icon: <BarChartOutlined />,
                  label: "รายงานสรุป",
                  children: [
                    {
                      key: "/main/overall",
                      label: "ภาพรวม",
                      className: "",
                    },
                    {
                      key: "/main/Royal",
                      label: "สถาบัน",
                      className: "",
                    },
                    {
                      key: "/main/Army",
                      label: "กองทัพ",
                      className: "",
                    },
                    {
                      key: "/main/Government",
                      label: "รัฐบาล",
                      className: "",
                    },
                    {
                      key: "/main/Rally",
                      label: "ชุมนุม",
                      className: "",
                    },
                  ],
                },
                {
                  key: "/sentiment",
                  icon: <CommentOutlined />,
                  label: "ประเมินผลตอบรับ",
                  className: "",
                },
                {
                  key: "/postlog",
                  icon: <ContainerOutlined />,
                  label: "โพสต์และความเคลื่อนไหว",
                  className: "",
                },
                {
                  key: "/postCreation",
                  icon: <UploadOutlined />,
                  label: "เผยแพร่ข้อมูล",
                  className: "",
                  children: [
                    {
                      key: "/postCreation/createPost",
                      label: "สร้างโพสต์ใหม่",
                      className: "",
                    },
                    {
                      key: "/postCreation/createGroupPost",
                      label: "สร้างโพสต์ไปที่กลุ่ม",
                      className: "",
                    },
                    {
                      key: "/postCreation/postStatus",
                      label: "สถานะการโพส",
                      className: "",
                    },
                  ],
                },
                {
                  key: "/account",
                  icon: <TeamOutlined />,
                  label: "ข้อมูลบัญชี",
                  children: [
                    {
                      key: "/account/manage",
                      label: "ค้นหาและบริหารจัดการ",
                    },
                  ],
                },
                {
                  key: "/RPA",
                  icon: <ControlOutlined />,
                  label: "RPA Management",
                  className: "",
                  children: [
                    {
                      key: "/RPA/facebook",
                      icon: <img src={facebook} className="tw-h-8 tw-w-8" />,
                      label: "Facebook",
                      className: "",
                      children: [
                        {
                          key: "/RPA/account/facebook",
                          label: "บัญชีและสถานะ",
                          className: "",
                        },
                        {
                          key: "/RPA/fulltime/facebook",
                          label: "งานประจำ",
                          className: "",
                        },
                        {
                          key: "/RPA/job/facebook",
                          label: "งาน",
                          className: "",
                        },
                        {
                          key: "/RPA/errlog/facebook",
                          label: "Error Log",
                          className: "",
                        },
                        {
                          key: "/RPA/activlog/facebook",
                          label: "Activity Log",
                          className: "",
                        },
                      ],
                    },
                    {
                      key: "/RPA/X",
                      icon: <img src={twitter} className="tw-h-8 tw-w-8" />,
                      label: "X(Twitter)",
                      className: "",
                      children: [
                        {
                          key: "/RPA/account/X",
                          label: "บัญชีและสถานะ",
                          className: "",
                        },
                        {
                          key: "/RPA/fulltime/X",
                          label: "งานประจำ",
                          className: "",
                        },
                        {
                          key: "/RPA/job/X",
                          label: "งาน",
                          className: "",
                        },
                        // {
                        //   key: "/RPA/errlog/X",
                        //   label: "Error Log",
                        //   className: "",
                        // },
                        // {
                        //   key: "/RPA/activlog/X",
                        //   label: "Activity Log",
                        //   className: "",
                        // },
                      ],
                    },
                    {
                      key: "/RPA/instagram",
                      icon: <img src={instagram} className="tw-h-8 tw-w-8" />,
                      label: "Instagram",
                      className: "",
                      children: [
                        // {
                        //   key: "/RPA/account/instagram",
                        //   label: "บัญชีและสถานะ",
                        //   className: "",
                        // },
                        // {
                        //   key: "/RPA/fulltime/instagram",
                        //   label: "งานประจำ",
                        //   className: "",
                        // },
                        {
                          key: "/RPA/job/instagram",
                          label: "งาน",
                          className: "",
                        },
                        // {
                        //   key: "/RPA/errlog/instagram",
                        //   label: "Error Log",
                        //   className: "",
                        // },
                        // {
                        //   key: "/RPA/activlog/instagram",
                        //   label: "Activity Log",
                        //   className: "",
                        // },
                      ],
                    },
                    {
                      key: "/RPA/youtube",
                      icon: <img src={youtube} className="tw-h-8 tw-w-8" />,
                      label: "Youtube",
                      className: "",
                      children: [
                        // {
                        //   key: "/RPA/account/youtube",
                        //   label: "บัญชีและสถานะ",
                        //   className: "",
                        // },
                        // {
                        //   key: "/RPA/fulltime/youtube",
                        //   label: "งานประจำ",
                        //   className: "",
                        // },
                        {
                          key: "/RPA/job/youtube",
                          label: "งาน",
                          className: "",
                        },
                        // {
                        //   key: "/RPA/errlog/youtube",
                        //   label: "Error Log",
                        //   className: "",
                        // },
                        // {
                        //   key: "/RPA/activlog/youtube",
                        //   label: "Activity Log",
                        //   className: "",
                        // },
                      ],
                    },
                    {
                      key: "/RPA/tiktok",
                      icon: <img src={tiktok} className="tw-h-8 tw-w-8" />,
                      label: "tiktok",
                      className: "",
                      children: [
                        // {
                        //   key: "/RPA/account/tiktok",
                        //   label: "บัญชีและสถานะ",
                        //   className: "",
                        // },
                        // {
                        //   key: "/RPA/fulltime/tiktok",
                        //   label: "งานประจำ",
                        //   className: "",
                        // },
                        {
                          key: "/RPA/job/tiktok",
                          label: "งาน",
                          className: "",
                        },
                        // {
                        //   key: "/RPA/errlog/tiktok",
                        //   label: "Error Log",
                        //   className: "",
                        // },
                        // {
                        //   key: "/RPA/activlog/tiktok",
                        //   label: "Activity Log",
                        //   className: "",
                        // },
                      ],
                    },
                  ],
                },
                {
                  key: "/classconfig",
                  icon: <SlidersOutlined />,
                  label: "Classification Config",
                },
                {
                  key: "/recommendation",
                  icon: <TrademarkCircleOutlined />,
                  label: "Recommendation",
                  children: [
                    {
                      key: "/recommendation/similarpost",
                      label: "ผลลัพธ์ของโพสต์ใกล้เคียง",
                      className: "",
                    },
                    {
                      key: "/recommendation/trending",
                      label: "เนื้อหาที่กำลังได้รับความนิยม",
                      className: "",
                    },
                  ],
                },
                {
                  key: "/admin",
                  icon: <CrownOutlined />,
                  label: "Admin",
                  children: [
                    {
                      key: "/admin/usermanagement",
                      label: "User Management",
                    },
                  ],
                },
                {
                  key: "/seoWebSite",
                  icon: <TbSeo />,
                  label: "SEO WebSite",
                  className: "",
                },
              ]}
            />
          </Sider>
          <Button
            className={classNames(
              "tw-sticky tw-bg-[#0874c4] tw-h-[10rem] tw-z-40 tw-items-center tw-w-8 tw-flex tw-text-center tw-justify-center tw-self-center",
              {
                "tw-hidden": !collapsed && isMobile,
              }
            )}
            onClick={() => setCollapsed(!collapsed)}
          >
            <p className="tw-rotate-90 tw-text-white">Menu</p>
          </Button>
        </div>

        <Layout className="tw-max-w-full">
          <div className="tw-flex tw-flex-row tw-px-6 tw-my-4 tw-justify-between">
            <Breadcrumb
              className="tw-text-lg tw-font-bold"
              items={breadcrumbItems}
            />
            {showBackButton && (
              <Tooltip title="ย้อนกลับ">
                <Button
                  className="tw-self-center tw-border-black tw-border-2 tw-bg-blue-400 tw-drop-shadow-md hover:tw-bg-white hover:tw-border-blue-600 hover:tw-text-blue-600"
                  onClick={() => navigate(-1)}
                >
                  ย้อนกลับ
                </Button>
              </Tooltip>
            )}
          </div>

          <Content
            className={classNames(
              "tw-flex tw-max-w-full tw-max-h-full tw-justify-center tw-bg-[#f8f4f4] tw-object-contain tw-p-4",
              {
                "tw-overflow-auto": isTabletOrMobile && isLandscape,
                " tw-bg-white  ": location.pathname != "/createPost",
              }
            )}
          >
            <Outlet
              className={classNames(
                "tw-flex tw-min-h-fit tw-w-full tw-max-w-full tw-justify-center tw-object-contain",
                {}
              )}
            />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

MainLayout.propTypes = {
  pageKey: PropTypes.array.isRequired,
};

export default MainLayout;
