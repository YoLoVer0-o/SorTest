import {} from "react";
import { DatePicker, TimePicker } from "antd";
import PropTypes from "prop-types";
import locale from "antd/es/date-picker/locale/th_TH";
import "dayjs/locale/th";
// import { useResponsive } from "../hooks";

const TimeSetPost = () => {
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div className="tw-w-full tw-h-full tw-z-10 tw-bg-white">
      <div className="tw-w-full tw-h-full tw-p-4">
        <p>วันที่</p>
        <div className="tw-flex tw-flex-row">
          <DatePicker
            onChange={onChange}
            locale={locale}
            format="MMMM"
            picker="month"
            className="tw-w-full"
          />
          <DatePicker
            locale={locale}
            onChange={onChange}
            format="D"
            className="tw-w-full"
          />
          <DatePicker
            locale={locale}
            onChange={onChange}
            picker="year"
            className="tw-w-full"
          />
        </div>

        <div className="tw-w-full">
          <p>เวลา</p>
          <TimePicker className="tw-w-full" onChange={onChange} />
        </div>
      </div>
    </div>
  );
};
TimeSetPost.propTypes = {
  isOpenTime: PropTypes.bool,
  isCloseTime: PropTypes.func,
};

export default TimeSetPost;
