import { useState, useEffect } from "react";
import { Select } from "antd";
import { useResponsive } from "../hooks";
import classNames from "classnames";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import postCreateAPI from "../service/postCreateAPI";
import { getLogin } from "../libs/loginSlice";

const SelectPlatform = (props) => {
  const { selected , sentBotData } = props;
  const [platform, setPlatform] = useState(selected);
  const [selectedGroupType, setSelectedGroupType] = useState("Single User");
  const [botData, setBotData] = useState("");
  const [selectedBot, setSelectedBot] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");

  // console.log(selectedGroup);
  const handleChange = (selected) => {
    console.log(`selected ${selected}`);
    setPlatform(selected);
    props.onPlatformSelect(selected);
  };

  const selectGroup = (selected) => {
    console.log(`selected ${selected}`);
    setSelectedGroupType(selected);
  };
  const getToken = useSelector((state) => getLogin(state));

  useEffect(() => {
    const fetchBotConfig = async () => {
      try {
        const data = await postCreateAPI.fbGetBotConfig(getToken);
        setBotData(data);
        sentBotData(data);
        setSelectedBot(data[0].botname);
        setSelectedGroup(data[0].groups);
      } catch (error) {
        console.error("Error fetching bot config:", error);
      }
    };

    fetchBotConfig();
  }, [getToken]);

  const selectUser = (selectedOption) => {
    setSelectedBot(selectedOption);
  };
  const selectGrouptaget = (selectedOption) => {
    console.log(selectedOption);
    setSelectedGroup(selectedOption.value);
  };

  // Format Data into an array of objects with value and label properties
  const userOptions = botData
    ? botData.map((bot) => ({
        value: bot.botname,
        label: bot.botname,
      }))
    : [];
  const groupOptions = botData
    ? botData.map((bot) => ({
        value: bot.groups,
        label: bot.groups,
      }))
    : [];
  console.log(groupOptions);
  const {
    // isDesktopOrLaptop,
    // isBigScreen,
    // isTabletOrMobile,
    // isTablet,
    isMobile,
    isPortrait,
  } = useResponsive();

  return (
    <div
      className={classNames(
        "tw-flex tw-flex-row tw-w-full tw-h-40 tw-justify-center tw-items-center tw-gap-x-8 tw-bg-white tw-shadow-[0_3px_10px_rgb(0,0,0,0.2)]",
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
          onChange={handleChange}
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
            defaultValue={selectedBot}
            onChange={selectUser}
            className="tw-w-full"
            value={selectedBot}
            options={userOptions}
          />
        </div>
      )}

      {selectedGroupType === "Group" && (
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
      )}

      <div
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
      </div>
    </div>
  );
};

SelectPlatform.propTypes = {
  selected: PropTypes.any,
  sentBotData: PropTypes.any,
  onPlatformSelect: PropTypes.func,
};

export default SelectPlatform;
