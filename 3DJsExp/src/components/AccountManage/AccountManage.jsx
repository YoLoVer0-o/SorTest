import { useState, useEffect } from "react";

import { Select, Input, Tooltip, Modal, Button } from "antd";
import { DataTable, Loading } from "../../utilities";
import classNames from "classnames";
import { useResponsive } from "../../hooks";
import Image from "../../assets/PostImage";
import AccountManageAPI from "../../service/AccountManageAPI";
import { useSelector } from "react-redux";
import { getLogin } from "../../libs/loginSlice";
import { EditOutlined } from "@ant-design/icons";
import AddTargetModal from "./AddTargeModal";
import EditModal from "./EditModal";

const AccountManage = () => {
  const [accInfo, setAccInfo] = useState();
  const [groupInfo, setGroupInfo] = useState();
  const [typeSelected, setTypeSelected] = useState("profile");
  const [isModalTarget, setIsModalTarget] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [isModalDetail, setIsModalDetail] = useState(false);
  const [seachTitle, setSeachTitle] = useState("");
  const [seachGroup, setSeachGroup] = useState("");
  const [detailData, setDetailData] = useState("");
  const [editData, setEditData] = useState("");
  const [dataType, setDataType] = useState([]);

  const { isTabletOrMobile, isMobile, isPortrait, isLandscape } =
    useResponsive();
  const { Search } = Input;
  // console.log(accInfo);
  const getToken = useSelector((state) => getLogin(state));

  const selectType = (value) => {
    console.log(`selected ${value}`);
    setTypeSelected(value);
    if (value === "profile") {
      setDataType(accInfo);
    } else if (value === "group") {
      setDataType(groupInfo);
    }
    // (value === "profile" && accInfo) ||
    // (value === "group" && groupInfo)
    // if(value === "profile"){

    // } else if (value === "group" ) {
    //   getDataGroup()
    // }xx
  };

  const openTargetModal = () => {
    setIsModalTarget(true);
  };
  const openTargetEdit = (data) => {
    setEditData(data);
    setIsModalEdit(true);
  };
  const closeTargetModal = () => {
    setIsModalTarget(false);
    setIsModalEdit(false);
  };
  const openDetailModal = (data) => {
    setDetailData(data);
    setIsModalDetail(true);
  };
  const closeDetailModal = () => {
    setIsModalDetail(false);
  };

  useEffect(() => {
    const getDataProfile = async () => {
      try {
        const dataProfile = await AccountManageAPI.getProfile(getToken);
        setAccInfo(dataProfile);
        setDataType(dataProfile);
      } catch (error) {
        console.log(error.message);
      }
    };
    const getDataGroup = async () => {
      try {
        const dataGroup = await AccountManageAPI.getGroupProfile(getToken);
        setGroupInfo(dataGroup);
      } catch (error) {
        console.log(error.message);
      }
    };
    getDataGroup();
    getDataProfile();
  }, [getToken]);

  // const filterOption = (input, option) =>
  //   (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

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
      filteredValue: [seachTitle],
      onFilter: (value, record) =>
        String(record?.title).toLowerCase().includes(value.toLowerCase()),
      render: (text, record) => <p>{record.title}</p>,
    },
    {
      title: "กลุ่ม",
      dataIndex: "group",
      key: "group",
      align: "center",
      width: 150,
      className: "tw-truncate",
      filteredValue: [seachGroup],
      onFilter: (value, record) =>
        String(record?.label).toLowerCase().includes(value.toLowerCase()),
      render: (text, record) => {
        return (
          <div key={record} className="tw-flex tw-justify-center tw-gap-2">
            {record.label
              ? record.label.map((e, i) => (
                  <div
                    className="tw-rounded-md tw-border-2 tw-border-black tw-w-max tw-text-center tw-text-white tw-p-2 tw-bg-blue-600"
                    key={i}
                  >
                    {e}
                  </div>
                ))
              : ""}
          </div>
        );
      },
    },
    {
      title: "รายละเอียด",
      dataIndex: "detail",
      key: "detail",
      align: "center",
      width: 200,
      className: "tw-text-violet-600 tw-truncate  ",
      render: (text, record) => (
        <button onClick={() => openDetailModal(record.information)}>
          {/* <div dangerouslySetInnerHTML={{ __html: record.information }}></div> */}
          <Tooltip placement="topLeft" title="คลิกเพื่อดูรายละเอียดเพิ่มเติม">
            <div>{record.information.split("<br>")}...</div>
          </Tooltip>
        </button>
      ),
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
          <Tooltip title="กดเพื่อไปยังหน้าโปรไฟล์">
            <a href={record.url} target="blank">
              <div className="hover:tw-bg-blue-200 tw-rounded-full tw-p-1">
                <img className="tw-w-7 tw-h-7 " src={Image.link} />
              </div>
            </a>
          </Tooltip>
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "edit",
      key: "edit",
      align: "center",
      width: 50,
      className: "tw-text-blue-600",
      render: (text, record) => (
        <Tooltip title="กดเพื่อเเก้ไข">
          <div className="tw-flex tw-justify-center ">
            <button
              onClick={() => openTargetEdit(record)}
              className="hover:tw-bg-blue-200 tw-rounded-full tw-p-1 tw-flex tw-justify-center"
            >
              <EditOutlined className="tw-w-7 tw-h-7 tw-text-2xl" />
            </button>
          </div>
        </Tooltip>
      ),
    },
  ];

  return (
    <div className="tw-w-full tw-h-full tw-flex tw-flex-col tw-items-center ">
      <div className=" tw-w-[80%] tw-max-h-full tw-flex-row tw-flex tw-gap-4 tw-justify-center">
        <Select
          defaultValue={typeSelected}
          className="tw-w-[30%] tw-outline-blue-500 tw-outline tw-rounded-md "
          placeholder="ประเภท"
          onChange={selectType}
          options={[
            {
              value: "profile",
              label: "profile&page",
            },
            {
              value: "group",
              label: "group",
            },
          ]}
        />
        {/* ///////////////////////////////รอ Upadte ในอนาคต///////////////////////////////////////// */}
        {/* <Select
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
        /> */}
        <Search
          className="tw-w-full tw-outline-blue-500 tw-outline tw-rounded-md "
          placeholder="ค้นหาชื่อ"
          allowClear
          onChange={(e) => setSeachTitle(e.target.value)}
        />
        <Search
          className="tw-w-full tw-outline-blue-500 tw-outline tw-rounded-md "
          placeholder="ค้นหากลุ่ม"
          allowClear
          onChange={(e) => setSeachGroup(e.target.value)}
        />
        {/* <Select
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
        /> */}
        <button
          onClick={openTargetModal}
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
        <DataTable columns={columns} data={dataType} />
      </div>
      <AddTargetModal
        isopen={isModalTarget}
        isclose={closeTargetModal}
        token={getToken}
      />
      <EditModal
        isopenEdit={isModalEdit}
        iscloseEdit={closeTargetModal}
        token={getToken}
        handleData={editData}
        getType={typeSelected}
      />
      <Modal
        title="รายละเอียด"
        centered={true}
        open={isModalDetail}
        onOk={closeDetailModal}
        onCancel={closeDetailModal}
        footer={[
          <Button
            key="submit"
            className="tw-bg-blue-500 tw-text-white tw-border-white hover:tw-bg-white hover:tw-text-blue-500 hover:tw-border-blue-500"
            onClick={closeDetailModal}
          >
            ตกลง
          </Button>,
        ]}
      >
        <div dangerouslySetInnerHTML={{ __html: detailData }}></div>
      </Modal>
    </div>
  );
};

export default AccountManage;
