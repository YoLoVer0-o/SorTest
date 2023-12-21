import { useState } from "react";
import { DataTable, SearchBar } from "../../utilities";
import { botStatus } from "../../mock";
import { useResponsive } from "../../hooks";
import { EditUserModal } from "..";
import { Button, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(isSameOrAfter);
import classNames from "classnames";

const AccountTable = () => {
    const [searchAccount, setSearchAccout] = useState("");
    const [searchGroup, setSearchGroup] = useState([]);
    const [searchStatus, setSearchStatus] = useState([]);
    const [modalToggle, setModalToggle] = useState(false);
    const [modalData, setModalData] = useState([]);

    const { isTabletOrMobile, isMobile, isPortrait, isLandscape } = useResponsive();

    //////////////////////////////////////////modal toggle logic////////////////////////////////////////////////////////////////
    const showModal = (data) => {
        setModalData(data);
        setModalToggle(true);
    };

    const handleCancel = () => {
        setModalToggle(false);
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////table//////////////////////////////////////////////////////////////
    const columns = [
        {
            title: "id",
            dataIndex: "id",
            key: "id",
            align: "center",
            width: 150,
            className: "tw-truncate",
        },
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
            title: "group",
            dataIndex: "group",
            key: "group",
            align: "center",
            width: 150,
            className: "tw-text-violet-600",
            filteredValue: [searchGroup],
            onFilter: (value, record) =>
                value
                    .split(",")
                    .every((group) => String(record?.group).includes(group)),
            render: (text, record) => (
                <div className="tw-flex tw-flex-row tw-gap-1 tw-justify-center">
                    {record?.group.map((group) => (
                        <Tooltip key={group} title={group}>
                            <div className=" tw-w-max tw-rounded-md tw-p-2 tw-border-2 tw-border-black tw-text-center tw-text-white tw-bg-violet-600">
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
            width: 150,
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
                                    "tw-bg-green-600": record?.status == "online",
                                    "tw-bg-red-600": record?.status == "offline",
                                    "tw-bg-yellow-600": record?.status == "standby",
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
            title: "details",
            dataIndex: "details",
            key: "details",
            align: "center",
            width: 150,
            className: "tw-text-lime-600 tw-truncate",
        },
        {
            title: "",
            dataIndex: "id",
            key: "id",
            align: "center",
            width: 50,
            className: "tw-text-blue-500 tw-text-2xl",
            render: (text, record) => (
                <div className="tw-flex tw-flex-row tw-gap-1 tw-justify-center">
                    <Tooltip key={record.id} title={"กดเพื่อแก้ไข"}>
                        <EditOutlined onClick={() => showModal(record)} />
                    </Tooltip>
                </div>
            ),
        },
    ];
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div
            className={classNames(
                "tw-flex tw-flex-col tw-max-w-full tw-max-h-full tw-overflow-auto",
                {}
            )}
        >
            <p className="tw-self-center tw-font-bold tw-text-xl tw-my-4">
                AccountTable
            </p>
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
                    <p className="tw-text-lg">กลุ่ม:</p>
                    <SearchBar
                        useTagSearch={true}
                        data={botStatus}
                        onChangeFilter={setSearchGroup}
                        keyName={"group"}
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
            <div className={classNames("tw-flex tw-flex-col tw-h-full tw-w-full tw-gap-2", {})}>
                <div className={classNames("tw-flex tw-flex-row tw-h-fit tw-my-2", {
                    "tw-flex-col tw-w-full tw-gap-2": isMobile && isPortrait,
                    "tw-self-end tw-w-fit tw-gap-2": isMobile && isLandscape,
                    "tw-gap-4 tw-self-end tw-w-fit": !isMobile,
                })}>
                    <Button
                        className={classNames("tw-self-center tw-text-blue-600 tw-border-blue-600 tw-border-2 tw-bg-white tw-drop-shadow-md hover:tw-bg-blue-600 hover:tw-border-black hover:tw-text-white", {
                            "tw-w-full": isMobile && isPortrait,
                        })}>
                        ดาวน์โหลด Format
                    </Button>
                    <Button
                        className={classNames("tw-self-center tw-text-blue-600 tw-border-blue-600 tw-border-2 tw-bg-white tw-drop-shadow-md hover:tw-bg-blue-600 hover:tw-border-black hover:tw-text-white", {
                            "tw-w-full": isMobile && isPortrait,
                        })}>
                        เพิ่มบัญชี Excel
                    </Button>
                    <Button
                        className={classNames("tw-self-center tw-text-blue-600 tw-border-blue-600 tw-border-2 tw-bg-white tw-drop-shadow-md hover:tw-bg-blue-600 hover:tw-border-black hover:tw-text-white", {
                            "tw-w-full": isMobile && isPortrait,
                        })}>
                        เพิ่มบัญชีใหม่
                    </Button>
                </div>
                <div
                    className={classNames("tw-border-2 tw-rounded-md", {
                        "tw-overflow-auto tw-min-h-fit": isTabletOrMobile && isPortrait,
                    })}
                >
                    <DataTable
                        columns={columns}
                        data={botStatus}
                        setPageSize={botStatus.length}
                    />
                    {modalToggle && (
                        <EditUserModal
                            modalToggle={modalToggle}
                            handleCancel={handleCancel}
                            modalData={modalData}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AccountTable;
