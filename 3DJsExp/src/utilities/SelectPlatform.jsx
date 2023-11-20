import React, { useState } from "react";
import { Select } from "antd";
import PropTypes from 'prop-types';

const SelectPlatform = (props) => {
  const { selected } = props;
  const [platform, setPlatform] = useState(selected);

  const handleChange = (selected) => {
    console.log(`selected ${selected}`);
    setPlatform(selected);
    props.onPlatformSelect(selected);
  };

  return (
    <div className="tw-flex tw-flex-row tw-w-full tw-justify-center tw-gap-x-8 ">
      <div className="tw-w-[40%]">
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
            {
              value: "Instagram",
              label: "Instagram",
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

SelectPlatform.propTypes = {
  selected: PropTypes.any,
  onPlatformSelect: PropTypes.func,
};

export default SelectPlatform;
