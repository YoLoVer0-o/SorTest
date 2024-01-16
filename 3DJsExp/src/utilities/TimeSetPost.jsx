import { useState } from "react";
import { Select } from "antd";
import PropTypes from "prop-types";

import "dayjs/locale/th";
// import { useResponsive } from "../hooks";

const TimeSetPost = () => {
  const [handleMonth, setHandleMonth] = useState(null);
  const [handleDate, setHandleDate] = useState(null);
  const [handleYear, setHandleYear] = useState(null);
  const [handleHours, setHandleHours] = useState(null);
  const [handleMinutes, setHandleMinutes] = useState(null);
  const [handleAmPm, setHandleAmPm] = useState(null);
  const handleChange = (value, type) => {
    if (type === 1) {
      setHandleMonth(value);
    } else if (type === 2) {
      setHandleDate(value);
    } else if (type === 3) {
      setHandleYear(value);
    } else if (type === 4) {
      setHandleHours(value);
    } else if (type === 5) {
      setHandleMinutes(value);
    } else if (type === 6) {
      setHandleAmPm(value);
    }
    console.log(`selected ${value}`);
  };
  console.log(handleMonth);
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
  console.log(date);

  ///////////////////////////////Time////////////////////////////////////////
  // const toDayHours = date.getHours();
  const toDayMinutes = date.getMinutes();
  const getAmPmHours = () => {
    let hours = date.getHours();
    const amPm = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    hours = hours % 12 || 12;

    return {
      hours: hours < 10 ? `0${hours}` : `${hours}`,
      amPm,
    };
  };

  const minutesOptions = Array.from({ length: 60 }, (_, index) => ({
    value: index < 10 ? `0${index}` : `${index}`,
    label: index < 10 ? `0${index}` : `${index}`,
  }));

  // Example usage:
  const { hours, amPm } = getAmPmHours();
  console.log(`Current time: ${hours}:${new Date().getMinutes()} ${amPm}`);

  return (
    <div className="tw-w-full tw-h-full tw-z-10 tw-bg-white">
      <p className="tw-flex tw-flex-row ">
        <p className="tw-gap-1 tw-flex tw-flex-row">
          จะส่งในวันที่
          {handleDate === null && <p>{toDay}</p>}
          <p>{handleDate}</p>
          {handleMonth === null && <p>{thaiMonth}</p>}
          <p>{handleMonth}</p>
          {handleYear === null && <p>{years}</p>}
          <p>{handleYear}</p>
        </p>
        <p className="tw-flex tw-flex-row tw-gap-1">
          เวลา
          <div className="tw-flex tw-flex-row">
            {" "}
            {handleHours === null && <p>{hours}</p>}
            <p>{handleHours}</p>:
            {handleMinutes === null && <p>{toDayMinutes}</p>}
            <p>{handleMinutes}</p>
          </div>
          {handleAmPm === null && <p>{amPm}</p>}
          <p>{handleAmPm}</p>
        </p>
      </p>
      <div className="tw-w-full tw-h-full tw-p-4 ">
        <p>วันที่</p>
        <div className="tw-flex tw-flex-row tw-gap-x-3">
          <Select
            defaultValue={thaiMonth}
            onChange={(value) => handleChange(value, 1)}
            options={[
              {
                value: "มกราคม",
                label: "มกราคม",
              },
              {
                value: "กุมภาพันธ์",
                label: "กุมภาพันธ์",
              },
              {
                value: "มีนาคม",
                label: "มีนาคม",
              },
              {
                value: "เมษายน",
                label: "เมษายน",
              },
              {
                value: "พฤษภาคม",
                label: "พฤษภาคม  ",
              },
              {
                value: "มิถุนายน",
                label: "มิถุนายน  ",
              },
              {
                value: "กรกฎาคม",
                label: "กรกฎาคม",
              },
              {
                value: "สิงหาคม",
                label: "สิงหาคม",
              },
              {
                value: "กันยายน",
                label: "กันยายน",
              },
              {
                value: "ตุลาคม",
                label: "ตุลาคม",
              },
              {
                value: "พฤศจิกายน",
                label: "พฤศจิกายน",
              },
              {
                value: "ธันวาคม",
                label: "ธันวาคม",
              },
            ]}
            className="tw-w-full"
          />
          <Select
            defaultValue={toDay}
            onChange={(value) => handleChange(value, 2)}
            options={options}
            className="tw-w-full"
          />
          <Select
            defaultValue={years}
            onChange={(value) => handleChange(value, 3)}
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
              defaultValue={hours}
              onChange={(value) => handleChange(value, 4)}
              options={[
                {
                  value: "1",
                  label: "1",
                },
                {
                  value: "2",
                  label: "2",
                },
                {
                  value: "3",
                  label: "3",
                },
                {
                  value: "4",
                  label: "4",
                },
                {
                  value: "5",
                  label: "5  ",
                },
                {
                  value: "6",
                  label: "6  ",
                },
                {
                  value: "7",
                  label: "7",
                },
                {
                  value: "8",
                  label: "8",
                },
                {
                  value: "9",
                  label: "9",
                },
                {
                  value: "10",
                  label: "10",
                },
                {
                  value: "11",
                  label: "11",
                },
                {
                  value: "12",
                  label: "12",
                },
              ]}
              className="tw-w-full"
            />
            <Select
              defaultValue={toDayMinutes}
              onChange={(value) => handleChange(value, 5)}
              options={minutesOptions}
              className="tw-w-full"
            />
            <Select
              defaultValue={amPm}
              onChange={(value) => handleChange(value, 6)}
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
      <p>เขตเวลา</p>
      <p className=" tw-text-xl"> เวลาอินโดจีน</p>
    </div>
  );
};
TimeSetPost.propTypes = {
  isOpenTime: PropTypes.bool,
  isCloseTime: PropTypes.func,
};

export default TimeSetPost;
