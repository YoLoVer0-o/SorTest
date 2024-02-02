import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { getLogin, logOut } from '../libs/loginSlice'
import { setUserData } from "../libs/userSlice";
import mainUserAPI from "../service/mainUserAPI";
import { useResponsive } from "../hooks";
import SocialIcons from "../assets/SocialIcons";
import profile from "../assets/profile.png";
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
} from "@ant-design/icons";
import classNames from "classnames";
import PropTypes from "prop-types";

const { Header, Sider, Content } = Layout;

const MainLayout = (props) => {

  const isLogin = useSelector((state) => getLogin(state));

  // const isLogin = useSelector((state) => state.login?.items[0]);

  const [collapsed, setCollapsed] = useState(true);

  const [openKeys, setOpenKeys] = useState([]);

  const {
    isTabletOrMobile,
    isMobile,
    isPortrait,
    isLandscape,
  } = useResponsive();

  const navigate = useNavigate();

  const location = useLocation();

  const param = useParams();

  const dispatch = useDispatch()

  ///////////////////////////////////////breadcrumb name///////////////////////////////////////////////////////////////////
  const breadcrumbNameMap = {
    '/main': 'รายงานสรุป',
    '/main/overall': 'ภาพรวม',
    '/postlog': 'โพสต์และความเคลื่อนไหว',
    '/postlog/report': 'รายงานโพสต์',
    '/createPost': 'สร้างโพสต์ใหม่',
    '/sentiment': 'ความคิดเห็น',
    '/sentiment/report': 'รายงานความคิดเห็น',
    '/RPA': 'RPA',
    '/RPA/account': 'บัญชีและสถานะ',
    '/RPA/fulltime': 'งานประจำ',
    '/RPA/job': 'งาน',
    '/RPA/errlog': 'Error Log',
    '/RPA/activlog': 'Activity Log',
    '/classconfig': 'Classification Config',
    '/classconfig/edit': 'แก้ไข',
    '/recommendation': 'Recommendation',
    '/recommendation/similarpost': 'ผลลัพธ์ของโพสต์ใกล้เคียง',
    '/recommendation/trending': 'เนื้อหาที่กำลังได้รับความนิยม',
  };
  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////social icon declaration//////////////////////////////////////////////////////////////////////
  const { facebook, instagram, twitter, tiktok, youtube } = SocialIcons;
  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////breadcrumb render logic///////////////////////////////////////////////////////////////////
  const pathSnippets = location.pathname.split('/').filter((i) => i);

  const breadcrumbItems = pathSnippets.map((_, index) => {

    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;

    const [paramValue] = Object.values(param);

    const isDynamic = url.includes(paramValue);

    return {
      key: url,
      title: <p>{isDynamic ? paramValue : breadcrumbNameMap[url]}</p>,
    }
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
      if (latestOpenKey.startsWith('/RPA')) {
        console.log("hit1");
        topLevelKeys.push('/RPA');
        topLevelKeys.push(latestOpenKey);
      } else if (latestOpenKey.startsWith('/main')) {
        console.log("hit2");
        topLevelKeys.push('/main');
        topLevelKeys.push(latestOpenKey);
      }
      else if (latestOpenKey.startsWith('/recommendation')) {
        console.log("hit3");
        topLevelKeys.push('/recommendation');
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
  const showBackButton = breadcrumbItems.length > 1 &&
    !(
      breadcrumbItems.some(item => item.key.includes('/RPA'))
      || breadcrumbItems.some(item => item.key.includes('/main'))
      || breadcrumbItems.some(item => item.key.includes('/recommendation'))
    )
  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  const getUserGroup = async () => {
    await mainUserAPI.getAllRole(isLogin.token)
      .then((response) => { dispatch(setUserData({ owner: response })) });
  }
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

  useEffect(() => {
    getUserGroup()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <Layout
      className={classNames(
        "tw-w-screen tw-min-h-full tw-h-full tw-max-h-full",
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
              onClick={() => dispatch(logOut())}>
              Log Out
            </Button>
          </div>
        </div>
      </Header>

      <Layout className={"tw-relative"}>

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
            className={classNames("tw-min-h-full tw-overflow-y-auto tw-z-40 tw-bg-[#0874c4]", {
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
                      key: "/main/religion",
                      label: "-สถาบัน",
                      className: "",
                    },
                    {
                      key: "/main/army",
                      label: "-กองทัพ",
                      className: "",
                    },
                    {
                      key: "/main/government",
                      label: "-รัฐบาล",
                      className: "",
                    },
                    {
                      key: "/main/rally",
                      label: "-ชุมนุม",
                      className: "",
                    },
                  ]
                },
                {
                  key: "/sentiment",
                  icon: <CommentOutlined />,
                  label: "ความคิดเห็น",
                  className: "",
                },
                {
                  key: "/postlog",
                  icon: <ContainerOutlined />,
                  label: "โพสต์และความเคลื่อนไหว",
                  className: "",
                },
                {
                  key: "/createPost",
                  icon: <UploadOutlined />,
                  label: "สร้างโพสต์ใหม่",
                  className: "",
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
                      ]
                    }, {
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
                        {
                          key: "/RPA/errlog/X",
                          label: "Error Log",
                          className: "",
                        },
                        {
                          key: "/RPA/activlog/X",
                          label: "Activity Log",
                          className: "",
                        },
                      ]
                    }, {
                      key: "/RPA/instagram",
                      icon: <img src={instagram} className="tw-h-8 tw-w-8" />,
                      label: "Instagram",
                      className: "",
                      children: [
                        {
                          key: "/RPA/account/instagram",
                          label: "บัญชีและสถานะ",
                          className: "",
                        },
                        {
                          key: "/RPA/fulltime/instagram",
                          label: "งานประจำ",
                          className: "",
                        },
                        {
                          key: "/RPA/job/instagram",
                          label: "งาน",
                          className: "",
                        },
                        {
                          key: "/RPA/errlog/instagram",
                          label: "Error Log",
                          className: "",
                        },
                        {
                          key: "/RPA/activlog/instagram",
                          label: "Activity Log",
                          className: "",
                        },
                      ],
                    },
                    {
                      key: "/RPA/youtube",
                      icon: <img src={youtube} className="tw-h-8 tw-w-8" />,
                      label: "Youtube",
                      className: "",
                      children: [
                        {
                          key: "/RPA/account/youtube",
                          label: "บัญชีและสถานะ",
                          className: "",
                        },
                        {
                          key: "/RPA/fulltime/youtube",
                          label: "งานประจำ",
                          className: "",
                        },
                        {
                          key: "/RPA/job/youtube",
                          label: "งาน",
                          className: "",
                        },
                        {
                          key: "/RPA/errlog/youtube",
                          label: "Error Log",
                          className: "",
                        },
                        {
                          key: "/RPA/activlog/youtube",
                          label: "Activity Log",
                          className: "",
                        },
                      ],
                    },
                    {
                      key: "/RPA/tiktok",
                      icon: <img src={tiktok} className="tw-h-8 tw-w-8" />,
                      label: "tiktok",
                      className: "",
                      children: [
                        {
                          key: "/RPA/account/tiktok",
                          label: "บัญชีและสถานะ",
                          className: "",
                        },
                        {
                          key: "/RPA/fulltime/tiktok",
                          label: "งานประจำ",
                          className: "",
                        },
                        {
                          key: "/RPA/job/tiktok",
                          label: "งาน",
                          className: "",
                        },
                        {
                          key: "/RPA/errlog/tiktok",
                          label: "Error Log",
                          className: "",
                        },
                        {
                          key: "/RPA/activlog/tiktok",
                          label: "Activity Log",
                          className: "",
                        },
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
                      label: "นื้อหาที่กำลังได้รับความนิยม",
                      className: "",
                    },
                  ]
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

        <Layout>
          <div className="tw-flex tw-flex-row tw-px-6 tw-my-4 tw-justify-between">
            <Breadcrumb className="tw-text-lg tw-font-bold" items={breadcrumbItems} />
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
              "tw-flex tw-max-w-full tw-max-h-fit tw-justify-center tw-bg-[#f8f4f4] tw-m-4 tw-object-contain tw-p-4",
              {
                "tw-overflow-auto": isTabletOrMobile && isLandscape,
                " tw-bg-white  ": location.pathname != "/createPost",
              }
            )}
          >
            <Outlet
              className={classNames(
                "tw-flex tw-max-h-fit tw-h-fit tw-max-w-full tw-justify-center tw-object-contain",
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
