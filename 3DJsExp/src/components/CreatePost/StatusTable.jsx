import { useState, useEffect, useRef } from "react";
import { DataTable, SearchBar } from "../../utilities";
import { botStatus } from "../../mock";
import { useResponsive } from "../../hooks";
// import { AddUserModal, EditUserModal } from "..";
import { Button, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(isSameOrAfter);
import classNames from "classnames";
import { useSelector } from 'react-redux'
import { getLogin } from '../../libs/loginSlice'

const StatusTable = () => {
    // const [botData, setBotData] = useState([]);
    const [searchAccount, setSearchAccout] = useState("");
    const [searchDate, setSearchDate] = useState([]);
    const [searchStatus, setSearchStatus] = useState([]);
    // const [modalToggle, setModalToggle] = useState(false);
    // const [addModalToggle, setAddModalToggle] = useState(false);
    // const [modalData, setModalData] = useState([]);

    const { isTabletOrMobile, isMobile, isPortrait, isLandscape } = useResponsive();

    //////////////////////////////////////////modal toggle logic////////////////////////////////////////////////////////////////
    // const showModal = (data) => {
    //     setModalData(data);
    //     setModalToggle(true);
    // };

    // const handleCancel = () => {
    //     setModalToggle(false);
    // };

    // const showAddModal = () => {
    //     setAddModalToggle(true);
    // };

    // const handleAddCancel = () => {
    //     setAddModalToggle(false);
    // };
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    // const token = useSelector((state) => getLogin(state).token);

    ////////////////////////////////////////////table//////////////////////////////////////////////////////////////
    const columns = [
        {
            title: "accName",
            dataIndex: "accName",
            key: "accName",
            align: "center",
            width: 150,
            className: "tw-truncate",
            filteredValue: [searchAccount],
            onFilter: (value, record) =>
                String(record?.accName).toLowerCase().includes(value.toLowerCase()),
        },
        {
            title: "details",
            dataIndex: "details",
            key: "details",
            align: "center",
            width: 150,
            className: "tw-truncate",
        },
        {
            title: "group",
            dataIndex: "group",
            key: "group",
            align: "center",
            width: 150,
            className: "tw-text-violet-600",
            render: (text, record) => (
                <div className="tw-flex tw-flex-row tw-gap-1 tw-justify-center">
                    {record?.group.map((group) => (
                        <Tooltip key={group} title={group}>
                            <div className="tw-w-max tw-rounded-md tw-p-2 tw-border-2 tw-border-black tw-text-center tw-text-white tw-bg-violet-600">
                                {/* {botGroup?.find((botGroup) => botGroup.group_id == groups) ? botGroup?.find((botGroup) => botGroup.group_id == groups)?.group_name : "ไม่ระบุ"} */}
                                {group}
                            </div>
                        </Tooltip>
                    ))}
                </div>
            ),
        },
        {
            title: "status",
            dataIndex: "status",
            key: "status",
            align: "center",
            width: 100,
            className: "tw-text-amber-600",
            filteredValue: [searchStatus],
            onFilter: (value, record) =>
                value
                    .split(",")
                    .some((status) => String(record?.status).includes(status)),
            render: (text, record) => (
                <div className="tw-flex tw-flex-row tw-gap-1 tw-justify-center">
                    <Tooltip title={record?.status}>
                        <div
                            className={classNames(
                                "tw-rounded-md tw-border-2 tw-border-black tw-w-max tw-text-center tw-text-white tw-p-2",
                                {
                                    "tw-bg-green-600": record?.status == "finish",
                                    "tw-bg-red-600": record?.status == "error",
                                    "tw-bg-yellow-600": record?.status == "queue",
                                    "tw-bg-blue-600": record?.status == "processing",
                                }
                            )}
                        >
                            {record?.status}
                        </div>
                    </Tooltip>
                </div>
            ),
        },
        {
            title: "timestamp",
            dataIndex: "timestamp",
            key: "timestamp",
            align: "center",
            width: 100,
            className: "tw-text-lime-600 tw-truncate",
            filteredValue: [searchDate],
            onFilter: (value, record) => {
                if (value != undefined && value != null && value != "" && value != 'undefined') {
                    let startDate = String(value?.split(",")[0])
                    let endDate = String(value?.split(",")[1])
                    let recordDate = dayjs(record?.timestamp).format('YYYY-MM-DD')
                    if (dayjs(recordDate).isSameOrBefore(endDate) && dayjs(recordDate).isSameOrAfter(startDate)) {
                        return record?.timestamp
                    }
                } else {
                    return record?.timestamp
                }
            },
        },
        {
            title: "",
            dataIndex: "accName",
            key: "accName",
            align: "center",
            width: 150,
            className: "tw-text-blue-500 tw-text-2xl",
            render: (text, record) => (
                <div className="tw-flex tw-flex-row tw-gap-1 tw-justify-between">
                    <Tooltip title="กดเพื่อไปที่โพสต์">
                        {/* <a href={record?.post_url} target="blank"> */}
                        <div className="tw-rounded-md tw-w-fit tw-h-fit tw-border-2 tw-border-black tw-text-center tw-text-white tw-bg-sky-600" >
                            <p className="tw-m-2">Link</p>
                        </div>
                        {/* </a> */}
                    </Tooltip>
                    <Tooltip title="ลบหมวดหมู่">
                        <div className="tw-text-3xl tw-text-red-600"><DeleteOutlined /></div>
                    </Tooltip>
                    {record?.status === "queue" && (
                        <Tooltip title="แก้ไขหมวดหมู่">
                            <div className="tw-text-3xl tw-text-blue-600"><EditOutlined /></div>
                        </Tooltip>
                    )}
                </div>
            ),
        },
    ];
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div
            className={
                classNames(
                    "tw-flex tw-flex-col tw-max-w-full tw-max-h-full tw-overflow-auto",
                    {}
                )
            }
        >
            <p className="tw-self-center tw-font-bold tw-text-xl tw-my-4">
                PostStatus
            </p>
            {/* {botData.length > 0 && ( */}
            <div
                className={classNames(
                    "tw-flex tw-flex-row tw-max-w-full tw-justify-center tw-gap-2",
                    {
                        "tw-flex-col": isTabletOrMobile,
                    }
                )}
            >
                <div className={classNames("tw-w-full", {})}>
                    <p className="tw-text-lg">เลขบัญชี/ชื่อบัญชี:</p>
                    <SearchBar
                        useTextSearch={true}
                        data={botStatus}
                        onChangeSearch={setSearchAccout}
                    />
                </div>
                <div className={classNames("tw-w-full", {})}>
                    <p className="tw-text-lg">เวลา:</p>
                    <SearchBar
                        useDateSearch={true}
                        onChangeDate={setSearchDate}
                    // keyName={"tag"}
                    />
                </div>
                <div className={classNames("tw-w-full", {})}>
                    <p className="tw-text-lg">สถานะ:</p>
                    <SearchBar
                        useTagSearch={true}
                        data={botStatus}
                        onChangeFilter={setSearchStatus}
                        keyName={"status"}
                    />
                </div>
            </div>
            {/* )} */}

            {/* {botData.length > 0 && ( */}
            <div className={classNames("tw-flex tw-flex-col tw-h-full tw-w-full tw-gap-2", {})}>
                {/* <div className={classNames("tw-flex tw-flex-row tw-h-fit tw-my-2", {
                    "tw-flex-col tw-w-full tw-gap-2": isMobile && isPortrait,
                    "tw-self-end tw-w-fit tw-gap-2": isMobile && isLandscape,
                    "tw-gap-4 tw-self-end tw-w-fit": !isMobile,
                })}>
                    <Button
                        className={classNames("tw-self-center tw-text-blue-600 tw-border-blue-600 tw-border-2 tw-bg-white tw-drop-shadow-md hover:tw-bg-blue-600 hover:tw-border-black hover:tw-text-white", {
                            "tw-w-full": isMobile && isPortrait,
                        })}
                    >
                        ดาวน์โหลด Format
                    </Button>
                    <input
                        type="file"
                        style={{ display: 'none' }}
                    />
                    <Button
                        className={classNames("tw-self-center tw-text-blue-600 tw-border-blue-600 tw-border-2 tw-bg-white tw-drop-shadow-md hover:tw-bg-blue-600 hover:tw-border-black hover:tw-text-white", {
                            "tw-w-full": isMobile && isPortrait,
                        })}
                    >
                        เพิ่มบัญชี Excel
                    </Button>
                    <Button
                        className={classNames("tw-self-center tw-text-blue-600 tw-border-blue-600 tw-border-2 tw-bg-white tw-drop-shadow-md hover:tw-bg-blue-600 hover:tw-border-black hover:tw-text-white", {
                            "tw-w-full": isMobile && isPortrait,
                        })}
                    // onClick={() => showAddModal()}
                    >
                        เพิ่มบัญชีใหม่
                    </Button>
                </div> */}
                <div
                    className={classNames("tw-border-2 tw-rounded-md", {
                        "tw-overflow-auto tw-min-h-fit": isTabletOrMobile && isPortrait,
                    })}
                >
                    <DataTable
                        columns={columns}
                        data={botStatus}
                        setPageSize={botStatus.length}
                        keyName={"id"}
                    />
                    {/* {modalToggle && (
                                <EditUserModal
                                    fetch={fetchAcc}
                                    token={token}
                                    modalToggle={modalToggle}
                                    handleCancel={handleCancel}
                                    modalData={modalData}
                                    sentOwner={ownerGroup}
                                />
                            )}
                            {addModalToggle && (
                                <AddUserModal
                                    fetch={fetchAcc}
                                    token={token}
                                    modalToggle={addModalToggle}
                                    handleCancel={handleAddCancel}
                                    sentOwner={ownerGroup}
                                />
                            )} */}
                </div>
            </div>
            {/* )} */}

        </div >

    );
};

export default StatusTable;
