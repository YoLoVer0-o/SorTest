import { useState, useRef, useEffect } from "react";
import { DataTable, SearchBar, Loading } from "../../utilities";
import { workMock } from "../../mock";
import { useResponsive } from "../../hooks";
import { AddWorkModal, EditWorkModal } from "..";
import { Button, Tooltip } from "antd";
import { EditOutlined, CheckCircleOutlined, PlayCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(isSameOrAfter);
import classNames from "classnames";
import RPAWorkAPI from "../../service/RPAWorkAPI";
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux'
import { getLogin } from '../../libs/loginSlice'

const WorkTable = () => {

    const [searchAccount, setSearchAccout] = useState("");
    const [searchTarget, setSearchTarget] = useState([]);
    const [searchWork, setSearchWork] = useState([]);
    const [modalToggle, setModalToggle] = useState(false);
    const [addModalToggle, setAddModalToggle] = useState(false);
    const [modalData, setModalData] = useState([]);
    const [workData, setWorkData] = useState([]);

    const [showLoading, setShowLoading] = useState(false);

    const { isTabletOrMobile, isMobile, isPortrait, isLandscape } = useResponsive();

    const token = useSelector((state) => getLogin(state).token);

    //////////////////////////////////////////modal toggle logic////////////////////////////////////////////////////////////////
    const showModal = (data) => {
        setModalData(data);
        setModalToggle(true);
    };

    const handleCancel = () => {
        setModalToggle(false);
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////modal toggle logic////////////////////////////////////////////////////////////////
    const showAddModal = () => {
        setAddModalToggle(true);
    };

    const handleAddCancel = () => {
        setAddModalToggle(false);
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    const param = useParams();

    const fetchWork = async () => {
        try {
            setShowLoading(true);

            let data
            if (param.platform == "facebook") {
                data = await RPAWorkAPI.fbGetActionLog(token)
                setWorkData(data);
            }
            else if (param.platform == "X") {
                data = await RPAWorkAPI.fbGetActionLog(token)
                setWorkData(data);
            }

            // setBotData(data);

        } catch (error) {
            console.error('Error fetching bot config:', error);
        } finally {
            setShowLoading(false);
        }
    }

    useEffect(() => {
        fetchWork()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    const downloadFile = async () => {
        try {

            if (param.platform == "facebook") {
                await RPAWorkAPI.fbDownloadWork().then((response) => {
                    const blobUrl = window.URL.createObjectURL(new Blob([response]));
                    const link = document.createElement('a');
                    link.href = blobUrl;
                    link.setAttribute('download', "work_format.xlsx");
                    document.body.appendChild(link);
                    link.click();
                    window.URL.revokeObjectURL(blobUrl);
                    // console.log(response);
                })
            }
            else if (param.platform == "X") {
                await RPAWorkAPI.twDownloadWork().then((response) => {
                    const blobUrl = window.URL.createObjectURL(new Blob([response]));
                    const link = document.createElement('a');
                    link.href = blobUrl;
                    link.setAttribute('download', "work_format.xlsx");
                    document.body.appendChild(link);
                    link.click();
                    window.URL.revokeObjectURL(blobUrl);
                    // console.log(response);
                })
            }

            // await RPAWorkAPI.fbDownloadWork().then((response) => {
            //     const blobUrl = window.URL.createObjectURL(new Blob([response]));
            //     const link = document.createElement('a');
            //     link.href = blobUrl;
            //     link.setAttribute('download', "work_format.xlsx");
            //     document.body.appendChild(link);
            //     link.click();
            //     window.URL.revokeObjectURL(blobUrl);
            //     // console.log(response);
            // })

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
        if (param.platform == "facebook") {
            await RPAWorkAPI.fbUploadWork(fileUploaded).then((response) => { console.log(response); })
        }
        else if (param.platform == "X") {
            await RPAWorkAPI.twUploadWork(fileUploaded).then((response) => { console.log(response); })
        }
        // await RPAWorkAPI.fbUploadWork(fileUploaded).then((response) => { console.log(response); })
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
                            {record.status == "Done" ? <CheckCircleOutlined className="tw-text-green-600" /> : record.status == "Waiting" ? <PlayCircleOutlined className="tw-text-yellow-600" /> : <ExclamationCircleOutlined className="tw-text-red-600" />}
                        </div>
                    </Tooltip>
                </div>
            ),
        },
        // {
        //     title: "id",
        //     dataIndex: "id",
        //     key: "id",
        //     align: "center",
        //     width: 50,
        //     className: "tw-truncate",
        // },
        {
            title: "botname",
            dataIndex: "botname",
            key: "botname",
            align: "center",
            width: 150,
            className: "tw-truncate",
            filteredValue: [searchAccount],
            onFilter: (value, record) =>
                String(record?.botname).toLowerCase().includes(value.toLowerCase()),
        },
        {
            title: "actiontype",
            dataIndex: "actiontype",
            key: "actiontype",
            align: "center",
            width: 150,
            className: "tw-text-amber-600",
            filteredValue: [searchWork],
            onFilter: (value, record) =>
                value
                    .split(",")
                    .some((actiontype) => String(record?.actiontype).includes(actiontype)),
        },
        {
            title: "post_url",
            dataIndex: "post_url",
            key: "post_url",
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
            title: "timestamp",
            dataIndex: "timestamp",
            key: "timestamp",
            align: "center",
            width: 150,
            className: "tw-truncate",
        },
        {
            title: "",
            dataIndex: "",
            key: "",
            align: "center",
            width: 50,
            className: "tw-text-blue-500 tw-text-2xl",
            render: (text, record) => (
                <div className="tw-flex tw-flex-row tw-gap-1 tw-justify-center">
                    {
                        param.platform !== "instagram" && param.platform !== "youtube" && param.platform !== "tiktok" &&
                        <Tooltip key={record.botname} title={"กดเพื่อแก้ไข"}>
                            <EditOutlined onClick={() => showModal(record)} />
                        </Tooltip>
                    }
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
            <Loading isShown={showLoading} />
            {workData.length > 0 &&
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
                            data={workData}
                            onChangeSearch={setSearchAccout}
                        />
                    </div>
                    <div className={classNames("tw-w-full", {})}>
                        <p className="tw-text-lg">งาน:</p>
                        <SearchBar
                            useTagSearch={true}
                            data={workData}
                            onChangeFilter={setSearchWork}
                            keyName={"actiontype"}
                        />
                    </div>
                    <div className={classNames("tw-w-full", {})}>
                        <p className="tw-text-lg">เป้าหมาย:</p>
                        <SearchBar
                            useTagSearch={true}
                            data={workData}
                            onChangeFilter={setSearchTarget}
                            keyName={"post_url"}
                        />
                    </div>
                </div>
            }
            <div className={classNames("tw-flex tw-flex-col tw-h-full tw-w-full tw-gap-2", {})}>
                <div className={classNames("tw-flex tw-flex-row tw-h-fit tw-w-full tw-justify-between", {
                })}>
                    {/* <Button
                        className={classNames("tw-self-center tw-text-white tw-border-black tw-border-2 tw-bg-blue-600 tw-drop-shadow-md hover:tw-bg-white hover:tw-border-blue-600 hover:tw-text-blue-600", {
                            "tw-w-full": isMobile && isPortrait,
                        })}>
                        ทำงานทั้งหมด
                    </Button> */}
                    {param.platform !== "instagram" && param.platform !== "youtube" && param.platform !== "tiktok" &&
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
                                })}
                                onClick={() => showAddModal()}
                            >
                                เพิ่มงานใหม่
                            </Button>
                        </div>
                    }
                </div>
                <div
                    className={classNames("tw-border-2 tw-rounded-md", {
                        "tw-overflow-auto tw-min-h-fit": isTabletOrMobile && isPortrait,
                    })}
                >
                    {workData.length > 0 &&
                        <DataTable
                            columns={columns}
                            data={workData}
                            setPageSize={workMock.length}
                            keyName={"timestamp"}
                        />
                    }
                    {/* {modalToggle && (
                        <EditWorkModal
                            modalToggle={modalToggle}
                            handleCancel={handleCancel}
                            modalData={modalData}
                            token={token}
                        />
                    )} */}
                    {addModalToggle && (
                        <AddWorkModal
                            modalToggle={addModalToggle}
                            handleCancel={handleAddCancel}
                            token={token}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default WorkTable;
