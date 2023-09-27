import React from "react";
import { FloatButton } from "antd";
import { UpCircleOutlined } from "@ant-design/icons";

const FButton = (props) => {
  const clickHandler = props.onClick;
  return (
    <button onClick={() => clickHandler()}>
      <FloatButton
        className="tw-flex justify-end tw-mb-6 tw-mr-6"
        icon={<UpCircleOutlined />}
      />
    </button>
  );
};
export default FButton;
