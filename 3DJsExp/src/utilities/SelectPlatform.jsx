import { useState } from "react";
import { Select } from "antd";
import { useResponsive } from "../hooks";
import classNames from "classnames";
import PropTypes from "prop-types";

const SelectPlatform = (props) => {
  const { selected } = props;
  const [platform, setPlatform] = useState(selected);
  const [selectedGroupType, setSelectedGroupType] = useState("Single User");

  const handleChange = (selected) => {
    console.log(`selected ${selected}`);
    setPlatform(selected);
    props.onPlatformSelect(selected);
  };

  const selectUser = (selected) => {
    console.log(`selected ${selected}`);
  };

  const selectGroup = (selected) => {
    console.log(`selected ${selected}`);
    setSelectedGroupType(selected);
  };

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
          "tw-flex tw-flex-col tw-w-full tw-p-4 tw-h-36 ": isMobile && isPortrait,
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
          onChange={handleChange} // Change to onChange for handling selection change
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
            defaultValue="John Doe"
            onChange={selectUser}
            className="tw-w-full"
            options={[
              {
                value: "John Doe",
                label: "John Doe",
              },
              {
                value: "Jane Doe",
                label: "Jane Doe",
              },
              {
                value: "Som Sak",
                label: "Som Sak",
              },
            ]}
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
            defaultValue="กลุ่มทางการเมือง"
            onChange={selectUser}
            className="tw-w-full"
            options={[
              {
                value: "กลุ่มทางการเมือง",
                label: "กลุ่มทางการเมือง",
              },
              {
                value: "กลุ่มทางสถาบันพระมหากษัตริย์",
                label: "กลุ่มทางสถาบันพระมหากษัตริย์",
              },
              {
                value: "กลุ่มทางศาสนา",
                label: "กลุ่มทางศาสนา",
              },
            ]}
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
  onPlatformSelect: PropTypes.func,
};

export default SelectPlatform;
