import { useState, useEffect } from "react";
import { Select } from "antd";
import FacebookPost from "./FacebookPost";
import TwitterPost from "./TwitterPost";
import { useResponsive } from "../../hooks";
import classNames from "classnames";
import { useSelector } from "react-redux";
import postCreateAPI from "../../service/postCreateAPI";
import { getLogin } from "../../libs/loginSlice";

const CreatePost = () => {
  const {
    isDesktopOrLaptop,
    // isBigScreen,
    // isTabletOrMobile,
    isMobile,
    isTablet,
    isPortrait,
    isLandscape,
  } = useResponsive();

  const [selectedPlatform, setSelectedPlatform] = useState("");
  // const { selected , sentBotData } = props;
  const [platform, setPlatform] = useState();
  const [selectedGroupType, setSelectedGroupType] = useState("Single User");
  const [botData, setBotData] = useState("");
  const [selectedBot, setSelectedBot] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");

  const handlePlatformSelect = (platform) => {
    setSelectedPlatform(platform);
  };

  let selectedComponent;
  if (selectedPlatform === "Twitter") {
    selectedComponent = <TwitterPost />;
  } else if (selectedPlatform === "Facebook") {
    selectedComponent = (
      <FacebookPost
        handelBotData={botData}
        selectUser={selectedBot}
        identifier="CreatePost"
      />
    );
  } else {
    selectedComponent = (
      <FacebookPost
        handelBotData={botData}
        selectUser={selectedBot}
        identifier="CreatePost"
      />
    );
  }

  const selectUser = (selectedOption) => {
    setSelectedBot(selectedOption);
  };

  const getToken = useSelector((state) => getLogin(state));

  useEffect(() => {
    const fetchBotConfig = async () => {
      try {
        const data = await postCreateAPI.fbGetBotConfig(getToken);
        setBotData(data);
        setSelectedBot(data[0].botname);
        setSelectedGroup(data[0].groups);
      } catch (error) {
        console.error("Error fetching bot config:", error);
      }
    };

    fetchBotConfig();
  }, [getToken]);

  // Format Data into an array of objects with value and label properties
  const userOptions = botData
    ? botData.map((bot) => ({
        value: bot.botname,
        label: bot.botname,
      }))
    : [];

  return (
    <div className="tw-w-screen tw-h-full tw-max-h-full tw-gap-y-5 tw-p-4 tw-overflow-auto tw-flex tw-flex-col tw-items-center">
      <div className="tw-flex tw-justify-center ">Createpost</div>
      <div
        className={classNames(
          "tw-flex tw-flex-row tw-w-full tw-h-40 tw-justify-center tw-p-6 tw-items-center tw-gap-x-8 tw-bg-white tw-shadow-[0_3px_10px_rgb(0,0,0,0.2)]",
          {
            "tw-flex tw-flex-col tw-w-full tw-p-4 tw-h-36 ":
              isMobile && isPortrait,
          }
        )}
      >
        <div
          className={classNames("tw-w-[30%]", {
            "tw-w-full": isMobile && isPortrait,
          })}
        >
          <p>แพลต์ฟอร์ม :</p>
          <Select
            defaultValue="Facebook"
            onChange={handlePlatformSelect}
            className=" tw-w-full"
            value={platform}
            options={[
              {
                value: "Facebook",
                label: "Facebook",
              },
              {
                value: "Twitter",
                label: "Twitter",
              },
            ]}
          />
        </div>
        {selectedGroupType === "Single User" && (
          <div
            className={classNames("tw-w-[30%]", {
              "tw-w-full": isMobile && isPortrait,
            })}
          >
            <p>บัญชีที่ใช้โพสต์ :</p>
            <Select
              showSearch
              defaultValue={selectedBot}
              onChange={selectUser}
              className="tw-w-full"
              value={selectedBot}
              options={userOptions}
              filterOption={(input, option) =>
                (option?.label ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
            />
          </div>
        )}

        {/* {selectedGroupType === "Group" && (
          <div
            className={classNames("tw-w-[30%]", {
              "tw-w-full": isMobile && isPortrait,
            })}
          >
            <p>กลุ่มที่ใช้โพสต์ :</p>
            <Select
              value={selectedGroup}
              onChange={selectGrouptaget}
              className="tw-w-full"
              // value={}
              options={groupOptions}
            />
          </div>
        )} */}

        {/* <div
          className={classNames("tw-w-[20%]", {
            "tw-w-full": isMobile && isPortrait,
          })}
        >
          <p>เลื่อกกลุ่ม :</p>
          <Select
            defaultValue="Single User"
            onChange={selectGroup}
            className="tw-w-full"
            value={selectedGroupType}
            options={[
              {
                value: "Single User",
                label: "Single User",
              },
              {
                value: "Group",
                label: "Group",
              },
            ]}
          />
        </div> */}
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

export default CreatePost;
