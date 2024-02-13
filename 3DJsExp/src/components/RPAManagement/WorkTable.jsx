import { useState, useRef } from "react";
import { DataTable, SearchBar } from "../../utilities";
import { workMock } from "../../mock";
import { useResponsive } from "../../hooks";
import { EditWorkModal } from "..";
import { Button, Tooltip } from "antd";
import { EditOutlined, CheckCircleOutlined, PlayCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(isSameOrAfter);
import classNames from "classnames";
import RPAWorkAPI from "../../service/RPAWorkAPI";

const WorkTable = () => {

    const [searchAccount, setSearchAccout] = useState("");
    const [searchTarget, setSearchTarget] = useState([]);
    const [searchWork, setSearchWork] = useState([]);
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


    const downloadFile = async () => {
        try {
            await RPAWorkAPI.fbDownloadWork().then((response) => {
                const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = blobUrl;
                link.setAttribute('download', "work_format.xlsx");
                document.body.appendChild(link);
                link.click();
                window.URL.revokeObjectURL(blobUrl);
            })

        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    const hiddenFileInput = useRef(null);

    const handleClick = () => {
        hiddenFileInput.current.click();
    };

    const handleChange = async (event) => {
        const fileUploaded = event.target.files[0];
        // console.log(fileUploaded);
        await RPAWorkAPI.fbUploadWork(fileUploaded).then((response) => { console.log(response); })
    };


    ////////////////////////////////////////////table//////////////////////////////////////////////////////////////
    const columns = [
        {
            title: "",
            dataIndex: "status",
            key: "status",
            align: "center",
            width: 50,
            className: "tw-text-amber-600",
            render: (text, record) => (
                <div className="tw-flex tw-flex-row tw-gap-1 tw-justify-center">
                    <Tooltip title={record?.status}>
                        <div className="tw-text-3xl">
                            {record.status == "succeed" ? <CheckCircleOutlined className="tw-text-green-600" /> : record.status == "in progress" ? <PlayCircleOutlined className="tw-text-blue-600" /> : <ExclamationCircleOutlined className="tw-text-red-600" />}
                        </div>
                    </Tooltip>
                </div>
            ),
        },
        {
            title: "id",
            dataIndex: "id",
            key: "id",
            align: "center",
            width: 50,
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
            title: "work",
            dataIndex: "work",
            key: "work",
            align: "center",
            width: 150,
            className: "tw-text-amber-600",
            filteredValue: [searchWork],
            onFilter: (value, record) =>
                value
                    .split(",")
                    .some((work) => String(record?.work).includes(work)),
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
            title: "succeed",
            dataIndex: "succeed",
            key: "succeed",
            align: "center",
            width: 150,
            className: "tw-truncate",
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
                WorkTable
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
                        data={workMock}
                        onChangeSearch={setSearchAccout}
                    />
                </div>
                <div className={classNames("tw-w-full", {})}>
                    <p className="tw-text-lg">งาน:</p>
                    <SearchBar
                        useTagSearch={true}
                        data={workMock}
                        onChangeFilter={setSearchWork}
                        keyName={"work"}
                    />
                </div>
                <div className={classNames("tw-w-full", {})}>
                    <p className="tw-text-lg">เป้าหมาย:</p>
                    <SearchBar
                        useTagSearch={true}
                        data={workMock}
                        onChangeFilter={setSearchTarget}
                        keyName={"target"}
                    />
                </div>
            </div>
            <div className={classNames("tw-flex tw-flex-col tw-h-full tw-w-full tw-gap-2", {})}>
                <div className={classNames("tw-flex tw-flex-row tw-h-fit tw-w-full tw-justify-between", {
                })}>
                    <Button
                        className={classNames("tw-self-center tw-text-white tw-border-black tw-border-2 tw-bg-blue-600 tw-drop-shadow-md hover:tw-bg-white hover:tw-border-blue-600 hover:tw-text-blue-600", {
                            "tw-w-full": isMobile && isPortrait,
                        })}>
                        ทำงานทั้งหมด
                    </Button>
                    <div className={classNames("tw-flex tw-flex-row tw-h-fit tw-my-2", {
                        "tw-flex-col tw-w-full tw-gap-2": isMobile && isPortrait,
                        "tw-self-end tw-w-fit tw-gap-2": isMobile && isLandscape,
                        "tw-gap-4 tw-self-end tw-w-fit": !isMobile,
                    })}>
                        <Button
                            className={classNames("tw-self-center tw-text-blue-600 tw-border-blue-600 tw-border-2 tw-bg-white tw-drop-shadow-md hover:tw-bg-blue-600 hover:tw-border-black hover:tw-text-white", {
                                "tw-w-full": isMobile && isPortrait,
                            })}
                            onClick={() => downloadFile()}
                        >
                            ดาวน์โหลด Format
                        </Button>
                        <input
                            type="file"
                            onChange={handleChange}
                            ref={hiddenFileInput}
                            style={{ display: 'none' }}
                        />
                        <Button
                            className={classNames("tw-self-center tw-text-blue-600 tw-border-blue-600 tw-border-2 tw-bg-white tw-drop-shadow-md hover:tw-bg-blue-600 hover:tw-border-black hover:tw-text-white", {
                                "tw-w-full": isMobile && isPortrait,
                            })}
                            onClick={() => handleClick()}
                        >
                            เพิ่มงานจาก Excel
                        </Button>
                        <Button
                            className={classNames("tw-self-center tw-text-blue-600 tw-border-blue-600 tw-border-2 tw-bg-white tw-drop-shadow-md hover:tw-bg-blue-600 hover:tw-border-black hover:tw-text-white", {
                                "tw-w-full": isMobile && isPortrait,
                            })}>
                            เพิ่มงานใหม่
                        </Button>
                    </div>
                </div>
                <div
                    className={classNames("tw-border-2 tw-rounded-md", {
                        "tw-overflow-auto tw-min-h-fit": isTabletOrMobile && isPortrait,
                    })}
                >
                    <DataTable
                        columns={columns}
                        data={workMock}
                        setPageSize={workMock.length}
                        keyName={"id"}
                    />
                    {modalToggle && (
                        <EditWorkModal
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

export default WorkTable;
