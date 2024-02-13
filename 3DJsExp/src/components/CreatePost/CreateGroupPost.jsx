import { useState } from "react";
import FacebookPost from "./FacebookPost";
// import InstagramPost from "./InstagramPost";
import TwitterPost from "./TwitterPost";
import { useResponsive } from "../../hooks";
import classNames from "classnames";
import { Button, Input, Select, Tooltip } from "antd";

const CreateGroupPost = () => {
  const {
    isDesktopOrLaptop,
    isMobile,
    isTablet,
    isPortrait,
    isLandscape,
  } = useResponsive();

  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [allGroup, setAllGroup] = useState([
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
  ]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [inputValue, setInputValue] = useState('');


  const handlePlatformSelect = (platform) => {
    setSelectedPlatform(platform);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
  };



  let selectedComponent;

  if (selectedPlatform === "Twitter") {
    selectedComponent = <TwitterPost />;
  } else if (selectedPlatform === "Facebook") {
    selectedComponent = <FacebookPost />;
  } else {
    selectedComponent = <FacebookPost />;
  }

  return (
    <div className="tw-w-screen tw-h-full tw-max-h-full tw-gap-y-5 tw-p-4 tw-overflow-auto tw-flex tw-flex-col tw-items-center">
      <div className="tw-flex tw-justify-center ">CreateGroupPost</div>

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
            onChange={handlePlatformSelect}
            className=" tw-w-full"
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

        <div
          className={classNames("tw-w-[30%]", {
            "tw-w-full": isMobile && isPortrait,
          })}
        >
          <p>บัญชีที่ใช้โพสต์ :</p>
          <Select
            defaultValue="John Doe"
            onChange={handleUserSelect}
            className="tw-w-full"
            options={inputValue ? allGroup.filter((group) => group.value.toLowerCase().includes(inputValue.toLowerCase())) : allGroup}
            dropdownRender={(menu) => (
              <div className='tw-flex tw-flex-col'>
                {menu}
                <div className='tw-flex tw-flex-row tw-border-2 tw-border-black tw-rounded-md tw-p-1'>
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

        <div
          className={classNames("tw-w-[20%]", {
            "tw-w-full": isMobile && isPortrait,
          })}
        >
          <p>โพสไปที่กลุ่ม :</p>
          <Select
            defaultValue="A"
            onChange={handleGroupSelect}
            className="tw-w-full"
            options={[
              {
                value: "A",
                label: "A",
              },
              {
                value: "B",
                label: "B",
              },
              {
                value: "C",
                label: "C",
              },
            ]}
          />
        </div>
      </div>

      <div
        className={classNames(
          "tw-flex tw-h-full  tw-justify-center tw-items-center tw-justify-self-center",
          {
            "tw-w-full ": isMobile,
            "tw-w-[80%] tw-h-[80%]": isTablet && isPortrait || isLandscape && !isDesktopOrLaptop && !isMobile,

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
