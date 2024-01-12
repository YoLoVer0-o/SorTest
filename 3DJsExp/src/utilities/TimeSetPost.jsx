import {} from "react";
import { Select, Space } from "antd";
import PropTypes from "prop-types";

import "dayjs/locale/th";
// import { useResponsive } from "../hooks";

const TimeSetPost = () => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  ////////////////////////Date//////////////////////////////////
  const date = new Date();
  const toDay = date.getDate();
  const thaiMonth = date.toLocaleString("th-TH", {
    month: "long",
    timeZone: "Asia/Bangkok",
  });
  const thisMonth = date.getMonth();
  const years = date.getFullYear();

  function getDaysInMonth(year, month) {
    // Month is 0-indexed in JavaScript Date object (0 = January, 11 = December)
    const lastDayOfMonth = new Date(year, month, 0);
    return lastDayOfMonth.getDate();
  }

  const year = toDay;
  const month = thisMonth;
  const daysInMonth = getDaysInMonth(year, month);
  const options = Array.from({ length: daysInMonth }, (_, index) => ({
    value: `${index + 1}`,
    label: `${index + 1}`,
  }));
  console.log("maxDateoftheMonth", daysInMonth);
  console.log(toDay, thaiMonth, years);
  ///////////////////////////////Time////////////////////////////////////////
  const toDayHours = date.getHours();
  const toDayMinutes = date.getMinutes();

  return (
    <div className="tw-w-full tw-h-full tw-z-10 tw-bg-white">
      <div className="tw-w-full tw-h-full tw-p-4 ">
        <p>วันที่</p>
        <div className="tw-flex tw-flex-row tw-gap-x-3">
          <Select
            defaultValue={thaiMonth}
            onChange={handleChange}
            options={[
              {
                value: "01",
                label: "มกราคม",
              },
              {
                value: "02",
                label: "กุมภาพันธ์",
              },
              {
                value: "03",
                label: "มีนาคม",
              },
              {
                value: "04",
                label: "เมษายน",
              },
              {
                value: "05",
                label: "พฤษภาคม  ",
              },
              {
                value: "06",
                label: "มิถุนายน  ",
              },
              {
                value: "07",
                label: "กรกฎาคม",
              },
              {
                value: "08",
                label: "สิงหาคม",
              },
              {
                value: "09",
                label: "กันยายน",
              },
              {
                value: "10",
                label: "ตุลาคม",
              },
              {
                value: "11",
                label: "พฤศจิกายน",
              },
              {
                value: "12",
                label: "ธันวาคม",
              },
            ]}
            className="tw-w-full"
          />
          <Select
            defaultValue={toDay}
            onChange={handleChange}
            options={options}
            className="tw-w-full"
          />
          <Select
            defaultValue={years}
            onChange={handleChange}
            options={[
              {
                value: years,
                label: years,
              },
              {
                value: years + 1,
                label: years + 1,
              },
              {
                value: years + 2,
                label: years + 2,
              },
            ]}
            className="tw-w-full"
          />
          {/* <p>{toDay}</p> */}
        </div>

        <div className="tw-w-full">
          <p>เวลา</p>
          <div className="tw-flex tw-flex-row tw-gap-x-3">
            <Select
              defaultValue={toDayHours}
              onChange={handleChange}
              options={options}
              className="tw-w-full"
            />
            <Select
              defaultValue={toDayMinutes}
              onChange={handleChange}
              options={options}
              className="tw-w-full"
            />
            <Select
              // defaultValue={}
              onChange={handleChange}
              options={[
                {
                  value: "AM",
                  label: "AM",
                },
                {
                  value: "PM",
                  label: "PM",
                },
              ]}
              className="tw-w-full"
            />
          </div>
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
