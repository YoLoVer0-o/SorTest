import profile from "../assets/profile.png";
import { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";


const TwitterPost = () => {

  const items = [
    {
      label: "ทุกคน",
      key: "ทุกคน",
    },
    {
      label: "บัญชีที่คุณติดตาม",
      key: "บัญชีที่คุณติดตาม",
    },
    {
      label: "บัญชีที่ยืนยันแล้ว",
      key: "บัญชีที่ยืนยันแล้ว",
    },
    {
      label: "เฉพาะบัญชีที่คุณกล่าวถึงเท่านั้น",
      key: "เฉพาะบัญชีที่คุณกล่าวถึงเท่านั้น",
    },
  
  ];
  return (
    <div className="tw-flex tw-justify-center tw-h-[75%] tw-w-full">
      <div className="tw-flex tw-items-center  tw-w-[80%] tw-h-full tw-flex-col tw-bg-white tw-border-gray-200 tw-border-[1px] ">
        <div className="tw-flex tw-gap-x-2 ">
          <img
            className="tw-w-12 tw-h-12 tw-rounded-full tw-border-2 tw-border-black"
            src={profile}
          />
          <textarea
            // value={message}
            // onChange={handleMessageChange}
            placeholder="มีอะไรเกิดขึ้นบ้าง"
            className=" tw-text-xl  tw-w-full  tw-border-none tw-resize-none tw-outline-none"
          />
        </div>
        <div>
          <Dropdown
           
            menu={{
              items,
            }}
           
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              
              <Space >
                safsfsafsfasf
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};
export default TwitterPost;
