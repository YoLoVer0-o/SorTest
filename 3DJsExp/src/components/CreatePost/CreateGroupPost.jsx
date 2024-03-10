import { useState, useEffect, useRef } from "react";
import FacebookPost from "./FacebookPost";
// import InstagramPost from "./InstagramPost";
import TwitterPost from "./TwitterPost";
import { useResponsive } from "../../hooks";
import classNames from "classnames";
import { Input, Select, Button, Space, Divider } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import postCreateAPI from "../../service/postCreateAPI";
import { getLogin } from "../../libs/loginSlice";

const CreateGroupPost = () => {
  const { isDesktopOrLaptop, isMobile, isTablet, isPortrait, isLandscape } =
    useResponsive();

  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState(["A", "B", "C"]);
  const [handleUrl, setHandleUrl] = useState("");
  const [botData, setBotData] = useState("");
  const [selectedBot, setSelectedBot] = useState("");
  const inputRef = useRef(null);

  const handlePlatformSelect = (platform) => {
    setSelectedPlatform(platform);
  };

  const handleUserSelect = (user) => {
    setSelectedBot(user);
  };

  const handleSelectGroup = (urlGroup) => {
    setSelectedGroup(urlGroup)
  }
console.log(selectedGroup)
  let selectedComponent;

  if (selectedPlatform === "Twitter") {
    selectedComponent = <TwitterPost />;
  } else if (selectedPlatform === "Facebook") {
    selectedComponent = (
      <FacebookPost
        handelBotData={botData}
        selectUser={selectedBot}
        groupUrl={selectedGroup}
        identifier="CreateGroupPost"
      />
    );
  } else {
    selectedComponent = (
      <FacebookPost
        handelBotData={botData}
        selectUser={selectedBot}
        groupUrl={selectedGroup}
        identifier="CreateGroupPost"
      />
    ); //////////////////////////ส่งprops /////////////////////////มา
  }

  const getToken = useSelector((state) => getLogin(state));

  useEffect(() => {
    const fetchBotConfig = async () => {
      try {
        const data = await postCreateAPI.fbGetBotConfig(getToken);
        setBotData(data);
        setSelectedBot(data[0].botname);
      } catch (error) {
        console.error("Error fetching bot config:", error);
      }
    };

    fetchBotConfig();
  }, [getToken]);

  const userOptions = botData
    ? botData.map((bot) => ({
        value: bot.botname,
        label: bot.botname,
      }))
    : [];

  console.log(handleUrl);
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setItems([...items, handleUrl]);
    }
  };
  console.log(items);
  return (
    <div className="tw-w-screen tw-h-full tw-max-h-full tw-gap-y-5 tw-p-4 tw-overflow-auto tw-flex tw-flex-col tw-items-center">
      {/* <div className="tw-flex tw-justify-center ">CreateGroupPost</div> */}

      <div
        className={classNames(
          "tw-flex tw-flex-col tw-w-full tw-h-40 tw-justify-center tw-items-center tw-p-6 tw-gap-x-8 tw-bg-white tw-shadow-[0_3px_10px_rgb(0,0,0,0.2)]",
          {
            "tw-flex tw-flex-col tw-w-full tw-p-4 tw-h-36 ":
              isMobile && isPortrait,
          }
        )}
      >
        <div
          className={classNames(
            "tw-flex tw-flex-row tw-w-full tw-justify-center tw-gap-x-5"
          )}
        >
          <div
            className={classNames("tw-w-[35%]", {
              "tw-w-full": isMobile && isPortrait,
            })}
          >
            <p>แพลต์ฟอร์ม :</p>
            <Select
              defaultValue="Facebook"
              onChange={handlePlatformSelect}
              className=" tw-w-full"
              options={[
                {
                  value: "Facebook",
                  label: "Facebook",
                },
                // {
                //   value: "Twitter",
                //   label: "Twitter",
                // },
              ]}
            />
          </div>

          <div
            className={classNames("tw-w-[35%]", {
              "tw-w-full": isMobile && isPortrait,
            })}
          >
            <p>บัญชีที่ใช้โพสต์ :</p>
            <Select
              defaultValue={selectedBot}
              onChange={handleUserSelect}
              className="tw-w-full"
              options={
                inputValue
                  ? userOptions.filter((user) =>
                      user.value
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())
                    )
                  : userOptions
              }
              dropdownRender={(menu) => (
                <div className="tw-flex tw-flex-col">
                  {menu}
                  <div className="tw-flex tw-flex-row tw-border-2 tw-border-black tw-rounded-md tw-p-1">
                    <Input
                      placeholder="ค้นหา"
                      onKeyDown={(e) => e.stopPropagation()}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                  </div>
                </div>
              )}
            />
          </div>
        </div>
        <div
          className={classNames("tw-w-[50%]", {
            "tw-w-full": isMobile && isPortrait,
          })}
        >
          <p>โพสไปที่กลุ่ม :</p>
          <Select
            showSearch
            onSelect={handleSelectGroup}
            onSearch={(e) => setHandleUrl(e)}
            onKeyDown={handleKeyPress}
            className="tw-w-full"
            placeholder="กรอก Url กลุ่ม"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={items.map((item) => ({
              label: item,
              value: item,
            }))}
          />
        </div>
      </div>

      <div
        className={classNames(
          "tw-flex tw-h-full  tw-justify-center tw-items-center tw-justify-self-center",
          {
            "tw-w-full ": isMobile,
            "tw-w-[80%] tw-h-[80%]":
              (isTablet && isPortrait) ||
              (isLandscape && !isDesktopOrLaptop && !isMobile),

            "tw-w-[40%] ": isDesktopOrLaptop,
          }
        )}
      >
        {selectedComponent}
      </div>
    </div>
  );
};

export default CreateGroupPost;
