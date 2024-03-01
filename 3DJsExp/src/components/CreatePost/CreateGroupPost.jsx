import { useState, useRef } from "react";
import FacebookPost from "./FacebookPost";
// import InstagramPost from "./InstagramPost";
import TwitterPost from "./TwitterPost";
import { useResponsive } from "../../hooks";
import classNames from "classnames";
import { Input, Select, Button, Space, Divider } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import postCreateAPI from "../../service/postCreateAPI";
import { getLogin } from "../../libs/loginSlice";

const CreateGroupPost = () => {
  const { isDesktopOrLaptop, isMobile, isTablet, isPortrait, isLandscape } =
    useResponsive();

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
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState(["A", "B", "C"]);
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

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
          "tw-flex tw-flex-col tw-w-full tw-h-40 tw-justify-center tw-items-center tw-gap-x-8 tw-bg-white tw-shadow-[0_3px_10px_rgb(0,0,0,0.2)]",
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
                {
                  value: "Twitter",
                  label: "Twitter",
                },
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
              defaultValue="John Doe"
              onChange={handleUserSelect}
              className="tw-w-full"
              options={
                inputValue
                  ? allGroup.filter((group) =>
                      group.value
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())
                    )
                  : allGroup
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
            className="tw-w-full"
            placeholder="กรอก Url กลุ่ม"
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider
                  style={{
                    margin: "8px 0",
                  }}
                />
                <Space
                  className="tw-"
                  style={{
                    padding: "0 8px 4px",
                  }}
                >
                  <Input
                    placeholder="กรอกเพิ่มหัวข้อ"
                    ref={inputRef}
                    value={name}
                    onChange={onNameChange}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                  <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                    เพิ่ม
                  </Button>
                </Space>
              </>
            )}
            options={items.map((item) => ({
              label: item,
              value: item,
            }))}
          />
          {/* <Select
            defaultValue="A"
            showSearch
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
          /> */}
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
