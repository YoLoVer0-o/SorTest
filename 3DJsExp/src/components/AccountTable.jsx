import { DataTable, SearchBar } from "../utilities";
import { botStatus } from "../mock";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Tooltip } from "antd";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import classNames from "classnames";
dayjs.extend(isSameOrAfter);
import { useResponsive } from "../hooks";

const AccountTable = () => {
    const [searchAccount, setSearchAccout] = useState("");
    const [searchGroup, setSearchGroup] = useState([]);
    const [searchStatus, setSearchStatus] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    // const navigate = useNavigate();

    const { isTabletOrMobile, isPortrait } = useResponsive();

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
    ];

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
            <div
                className={classNames("", {
                    "tw-overflow-auto tw-min-h-full": isTabletOrMobile && isPortrait,
                })}
            >
                <DataTable
                    columns={columns}
                    data={botStatus}
                    setPageSize={5}
                    onRowsSelected={setSelectedRows}
                    useRowClick={true}
                // onRowClick={() => toReport(selectedRows)}
                />
            </div>
        </div>
    );
};

export default AccountTable;
