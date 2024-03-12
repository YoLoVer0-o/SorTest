import { useState, useEffect } from "react";

import { Select, Modal, Button, Input } from "antd";
import { DataTable, Loading } from "../../utilities";
import classNames from "classnames";
import { useResponsive } from "../../hooks";
import Image from "../../assets/PostImage";
import AccountManageAPI from "../../service/AccountManageAPI";
import { useSelector } from "react-redux";
import { getLogin } from "../../libs/loginSlice";
import TextArea from "antd/es/input/TextArea";
import { EditOutlined } from "@ant-design/icons";

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
    // className: "tw-text-lime-600",
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
    // render: (text, record) =>
    //   record.information.profile_tabs.map((val, index) => (
    //     <p key={index}>{val} </p>
    //   )),
  },
  {
    title: "Link",
    dataIndex: "link",
    key: "link",
    align: "center",
    width: 50,
    className: "tw-text-amber-600",
    render: (text, record) => (
      <div className="tw-flex tw-justify-center ">
        <a href={record.url} target="blank">
          <div className="hover:tw-bg-blue-200 tw-rounded-full tw-p-1">
            <img className="tw-w-7 tw-h-7 " src={Image.link} />
          </div>
        </a>
      </div>
    ),
  },
  {
    title: "",
    dataIndex: "",
    key: "",
    align: "center",
    width: 50,
    className: "tw-text-blue-600",
    render: (text, record) => (
      <div className="tw-flex tw-justify-center ">
        <div className="hover:tw-bg-blue-200 tw-rounded-full tw-p-1 tw-flex tw-justify-center">
          <EditOutlined className="tw-w-7 tw-h-7 tw-text-2xl" />
        </div>
      </div>
    ),
  },
];

const AccountManage = () => {
  const [accInfo, setAccInfo] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editName, setEditName] = useState("")
  const [editDetail, setEditDetail] = useState("")

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

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleNameInput = (event) => {
    const inputValue = event.target.value;
    setEditName(inputValue)
  };
  const handleDetailInput = (event) => {
    const inputValue = event.target.value;
    setEditDetail(inputValue)
  }

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
          className="tw-w-[30%] tw-outline-blue-500 tw-outline tw-rounded-md "
          showSearch
          placeholder="ประเภท"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={filterOption}
          options={[
            {
              value: "profile",
              label: "profile",
            },
            {
              value: "group",
              label: "group",
            },
          ]}
        />
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
        <button
          onClick={showModal}
          className="tw-w-[50%] tw-h-8 tw-bg-green-500 tw-rounded-lg tw-items-center tw-text-white"
        >
          เพิ่มเป้าหมายใหม่
        </button>
      </div>
      <div
        className={classNames(
          "tw-border-2 tw-rounded-md tw-mt-4 tw-overflow-x-auto tw-min-w-fit",
          {
            "tw-overflow-auto tw-min-h-fit": isTabletOrMobile && isPortrait,
          }
        )}
      >
        <DataTable columns={columns} data={accInfo} />
        <Modal
          title="เพิ่มเป้าหมายใหม่"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          centered={true}
          footer={[
            <Button
              key="submit"
              className="tw-bg-blue-500 tw-text-white tw-border-white hover:tw-bg-white hover:tw-text-blue-500 hover:tw-border-blue-500"
              // onClick={() => handleSave()}
            >
              บันทึก
            </Button>,
          ]}
        >
          <p>ประเภท:</p>
          <Select
            className="tw-w-full  tw-rounded-md "
            showSearch
            placeholder="ประเภท"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={[
              {
                value: "profile",
                label: "profile",
              },
              {
                value: "group",
                label: "group",
              },
              {
                value: "page",
                label: "page",
              },
            ]}
          />
          <p>ชื่อ:</p>
          <Input
            className="tw-w-full  tw-rounded-md "
            placeholder="กรอกชื่อ"
            onChange={handleNameInput}
          />
          <p>กลุ่ม:</p>
          <Select
            className="tw-w-full   tw-rounded-md "
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
          <p>รายละเอียด:</p>
          <TextArea rows={4} onChange={handleDetailInput} />
          <p>Link:</p>
          <Input className="tw-w-full tw-rounded-md " placeholder="กรอก link" />
        </Modal>
      </div>
    </div>
  );
};

export default AccountManage;
