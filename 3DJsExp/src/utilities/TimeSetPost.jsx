import { useState, useEffect } from "react";
import { DatePicker } from "antd";
import PropTypes from "prop-types";
// import { useResponsive } from "../hooks";
import { CloseOutlined } from "@ant-design/icons";

const TimeSetPost = (props) => {
  const isOpenTime = props.isOpenTime;
  const isCloseTime = props.isCloseTime;

  const [isOpenState, setIsOpenState] = useState(isOpenTime);

  useEffect(() => {
    setIsOpenState(isOpenTime);
  }, [isOpenTime]);

  return (
    <div className="tw-w-full tw-h-full">
      {isOpenState === true && (
        <div className="tw-rounded-md tw-border-gray-300 tw-border-[1px] tw-w-full tw-h-full">
          <div className="tw-flex tw-w-full tw-justify-center">
            <button
              className="tw-flex tw-w-full  tw-z-10"
              onClick={isCloseTime}
            >
              <CloseOutlined className=" tw-items-center tw-justify-center tw-w-8 tw-h-8 tw-border-solid tw-border-[1px] tw-border-black tw-justify-self-center tw-rounded-full tw-bg-red-400" />
            </button>
          </div>

          <DatePicker picker="month" />
        </div>
      )}
    </div>
  );
};
TimeSetPost.propTypes = {
  isOpenTime: PropTypes.bool,
  isCloseTime: PropTypes.func,
};

export default TimeSetPost;
