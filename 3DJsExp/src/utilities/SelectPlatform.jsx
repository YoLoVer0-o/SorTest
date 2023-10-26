import React from "react";
import { Select  } from "antd";

const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
const SelectPlatform = () => {
  return (
    <div className="tw-flex tw-flex-row tw-w-full tw-justify-center tw-gap-x-8 ">
      <div className="tw-w-[40%]">
        <p>แพลต์ฟอร์ม :</p>
      <Select
        defaultValue="Facebook"
        onChange={handleChange}
        className=" tw-w-full"
        options={[
          {
            value: "Facebook",
            label: "Facebook",
          },
          {
            value: "Instagram",
            label: "Instagram",
          },
          {
            value: "Youtube",
            label: "Youtube",
          },
      
        ]}
      />
      </div>
      <div className="tw-w-[40%]">
        <p>บัญชีที่ใช้โพสต์ :</p>
      <Select
        defaultValue="John Doe"
        onChange={handleChange}
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
    </div>
  );
};
export default SelectPlatform;
