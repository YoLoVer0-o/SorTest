import { useState } from "react";
import { DataTable, SearchBar } from "../../utilities";
import { testAcc } from "../../mock";
import { useResponsive } from "../../hooks";
import { EditSchedueModal } from "..";
import { Button, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(isSameOrAfter);
import classNames from "classnames";

const SchedueTable = () => {

    const [searchAccount, setSearchAccout] = useState("");
    const [searchTarget, setSearchTarget] = useState([]);
    const [searchFrequency, setSearchFrequency] = useState([]);
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

    //////////////////////////////////////////////////table////////////////////////////////////////////////////////
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
            dataIndex: "acc_name",
            key: "acc_name",
            align: "center",
            width: 150,
            className: "tw-truncate",
            filteredValue: [searchAccount],
            onFilter: (value, record) =>
                String(record?.acc_name).toLowerCase().includes(value.toLowerCase()),
        },
        {
            title: "target",
            dataIndex: "target",
            key: "target",
            align: "center",
            width: 150,
            className: "tw-text-violet-600 tw-truncate",
            filteredValue: [searchTarget],
            onFilter: (value, record) =>
                value
                    .split(",")
                    .every((target) => String(record?.target).includes(target)),
        },
        {
            title: "frequency",
            dataIndex: "frequency",
            key: "frequency",
            align: "center",
            width: 150,
            className: "tw-text-amber-600",
            filteredValue: [searchFrequency],
            onFilter: (value, record) =>
                value
                    .split(",")
                    .some((frequency) => String(record?.frequency).includes(frequency)),
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
                SchedueTable
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
                        data={testAcc}
                        onChangeSearch={setSearchAccout}
                    />
                </div>
                <div className={classNames("tw-w-full", {})}>
                    <p className="tw-text-lg">เป้าหมาย:</p>
                    <SearchBar
                        useTagSearch={true}
                        data={testAcc}
                        onChangeFilter={setSearchTarget}
                        keyName={"target"}
                    />
                </div>
                <div className={classNames("tw-w-full", {})}>
                    <p className="tw-text-lg">ความถี่:</p>
                    <SearchBar
                        useTagSearch={true}
                        data={testAcc}
                        onChangeFilter={setSearchFrequency}
                        keyName={"frequency"}
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
                        เพิ่มงานประจำจาก Excel
                    </Button>
                    <Button
                        className={classNames("tw-self-center tw-text-blue-600 tw-border-blue-600 tw-border-2 tw-bg-white tw-drop-shadow-md hover:tw-bg-blue-600 hover:tw-border-black hover:tw-text-white", {
                            "tw-w-full": isMobile && isPortrait,
                        })}>
                        เพิ่มงานประจำใหม่
                    </Button>
                </div>
                <div
                    className={classNames("tw-border-2 tw-rounded-md", {
                        "tw-overflow-auto tw-min-h-fit": isTabletOrMobile && isPortrait,
                    })}
                >
                    <DataTable
                        columns={columns}
                        data={testAcc}
                        setPageSize={testAcc.length}
                        keyName={"id"}
                    />
                    {modalToggle && (
                        <EditSchedueModal
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

export default SchedueTable;
