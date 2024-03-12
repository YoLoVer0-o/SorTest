import { useState, useEffect } from "react";
import { Select } from "antd";
import { DataTable } from "../../utilities";
import classNames from "classnames";
import { useResponsive } from "../../hooks";
import Image from "../../assets/PostImage";
import AccountManageAPI from "../../service/AccountManageAPI";
import { useSelector } from "react-redux";
import { getLogin } from "../../libs/loginSlice";

const columns = [
  {
    title: "ประเภท",
    dataIndex: "type",
    key: "type",
    align: "center",
    width: 50,
    className: "tw-truncate",
    render: (text, record) => <p className>{record.type}</p>,
  },
  {
    title: "ชื่อ",
    dataIndex: "name",
    key: "name",
    align: "center",
    width: 150,
    className: "tw-text-lime-600",
    render: (text, record) => <p>{record.title}</p>,
  },
  {
    title: "กลุ่ม",
    dataIndex: "group",
    key: "group",
    align: "center",
    width: 150,
    className: "tw-truncate",
  },
  {
    title: "รายละเอียด",
    dataIndex: "detail",
    key: "detail",
    align: "center",
    width: 200,
    className: "tw-text-violet-600",
    render: (text, record) =>
      record.information.profile_tabs.map((val, index) => (
        <p key={index}>{val} </p>
      )),
  },
  {
    title: "Link",
    dataIndex: "link",
    key: "link",
    align: "center",
    width: 150,
    className: "tw-text-amber-600",
    render: (text, record) => (
      <div className="tw-flex tw-justify-center ">
        <a href={record.url} target="blank">
          <div className="hover:tw-bg-blue-100 tw-rounded-full tw-p-1">
            <img className="tw-w-7 tw-h-7 " src={Image.link} />
          </div>
        </a>
      </div>
    ),
  },
];

const AccountManage = () => {
  const [accInfo, setAccInfo] = useState();
  const { isTabletOrMobile, isMobile, isPortrait, isLandscape } =
    useResponsive();
  console.log(accInfo);
  const getToken = useSelector((state) => getLogin(state));

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  useEffect(() => {
    const getData = async () => {
      const data = await AccountManageAPI.getProfile(getToken);
      setAccInfo(data);
    };
    getData();
  }, [getToken]);
  // console.log(accInfo);
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <div className="tw-w-full tw-h-full tw-flex tw-flex-col tw-items-center ">
      <div className=" tw-w-[80%] tw-max-h-full tw-flex-row tw-flex tw-gap-4 tw-justify-center">
        <Select
          className="tw-w-full tw-outline-blue-500 tw-outline tw-rounded-md "
          showSearch
          placeholder="ชื่อ"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={filterOption}
          options={[
            {
              value: "jack",
              label: "Jack",
            },
            {
              value: "lucy",
              label: "Lucy",
            },
            {
              value: "tom",
              label: "Tom",
            },
          ]}
        />
        <Select
          className="tw-w-full tw-outline-blue-500 tw-outline tw-rounded-md "
          showSearch
          placeholder="กลุ่ม"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={filterOption}
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
        <button className="tw-w-[50%] tw-h-8 tw-bg-green-500 tw-rounded-lg tw-items-center tw-text-white">
          เพิ่มเป้าหมายใหม่
        </button>
      </div>
      <div
        className={classNames("tw-border-2 tw-rounded-md tw-mt-4", {
          "tw-overflow-auto tw-min-h-fit": isTabletOrMobile && isPortrait,
        })}
      >
        <DataTable columns={columns} data={accInfo} />
      </div>
    </div>
  );
};

export default AccountManage;
