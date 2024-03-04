import { useState, useRef, useEffect } from "react";
import { DataTable, SearchBar, Loading } from "../../utilities";
// import { testAcc } from "../../mock";
import { useResponsive } from "../../hooks";
import { EditSchedueModal, AddSchedueModal } from "..";
import { Button, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(isSameOrAfter);
import classNames from "classnames";
import RPASchedueAPI from "../../service/RPASchedueAPI";
import { useSelector } from 'react-redux'
import { getLogin } from '../../libs/loginSlice'
import { useParams } from "react-router-dom";


const SchedueTable = () => {

    const [searchAccount, setSearchAccout] = useState("");
    const [searchTarget, setSearchTarget] = useState([]);
    const [searchFrequency, setSearchFrequency] = useState([]);
    const [modalToggle, setModalToggle] = useState(false);
    const [modalData, setModalData] = useState([]);
    const [addModalToggle, setAddModalToggle] = useState(false);
    const [scheduleData, setScheduleData] = useState([]);
    const [showLoading, setShowLoading] = useState(false);

    const { isTabletOrMobile, isMobile, isPortrait, isLandscape } = useResponsive();

    const token = useSelector((state) => getLogin(state).token);

    const param = useParams();

    //////////////////////////////////////////modal toggle logic////////////////////////////////////////////////////////////////
    const showModal = (data) => {
        setModalData(data);
        setModalToggle(true);
    };

    const handleCancel = () => {
        setModalToggle(false);
    };

    const showAddModal = () => {
        setAddModalToggle(true);
    };

    const handleAddCancel = () => {
        setAddModalToggle(false);
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////////////


    const fetchSch = async () => {
        try {
            setShowLoading(true);

            let data

            if (param.platform == "facebook") {
                data = await RPASchedueAPI.fbGetSchedule(token);
                setScheduleData(data);
            } else if (param.platform == "X") {
                data = await RPASchedueAPI.twGetSchedule(token);
                setScheduleData(data);
            }

        } catch (error) {
            console.error('Error fetching bot config:', error);
        } finally {
            setShowLoading(false);
        }
    }

    const downloadFile = async () => {
        try {
            setShowLoading(true);


            if (param.platform == "facebook") {
                await RPASchedueAPI.fbDownloadSchedule().then((response) => {
                    const blobUrl = window.URL.createObjectURL(new Blob([response]));
                    const link = document.createElement('a');
                    link.href = blobUrl;
                    link.setAttribute('download', "schedule_format.xlsx");
                    document.body.appendChild(link);
                    link.click();
                    window.URL.revokeObjectURL(blobUrl);
                })
            } else if (param.platform == "X") {
                await RPASchedueAPI.twDownloadSchedule().then((response) => {
                    const blobUrl = window.URL.createObjectURL(new Blob([response]));
                    const link = document.createElement('a');
                    link.href = blobUrl;
                    link.setAttribute('download', "schedule_format.xlsx");
                    document.body.appendChild(link);
                    link.click();
                    window.URL.revokeObjectURL(blobUrl);
                })
            }

            // await RPASchedueAPI.fbDownloadSchedule().then((response) => {
            //     const blobUrl = window.URL.createObjectURL(new Blob([response]));
            //     const link = document.createElement('a');
            //     link.href = blobUrl;
            //     link.setAttribute('download', "schedule_format.xlsx");
            //     document.body.appendChild(link);
            //     link.click();
            //     window.URL.revokeObjectURL(blobUrl);
            // })



        } catch (error) {
            console.error('Error downloading file:', error);
        }
        finally {
            setShowLoading(false);
        }
    };

    const hiddenFileInput = useRef(null);

    const handleClick = () => {
        hiddenFileInput.current.click();
    };

    const handleChange = async (event) => {
        const fileUploaded = event.target.files[0];
        // console.log(fileUploaded);
        try {
            setShowLoading(true);

            if (param.platform == "facebook") {
                await RPASchedueAPI.fbUploadSchedule(fileUploaded).then((response) => { console.log(response); })
            } else if (param.platform == "X") {
                await RPASchedueAPI.twUploadSchedule(fileUploaded).then((response) => { console.log(response); })
            }

            // await RPASchedueAPI.fbUploadSchedule(fileUploaded).then((response) => { console.log(response); })
        } catch (error) {
            console.error('Error fetching bot config:', error);
        } finally {
            setShowLoading(false);
        }
    };

    //////////////////////////////////////////////////table////////////////////////////////////////////////////////
    const columns = [
        {
            title: "ลำดับ",
            dataIndex: "task_id",
            key: "task_id",
            align: "center",
            width: 150,
            className: "tw-truncate",
        },
        {
            title: "ชื่อบัญชี",
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
            title: "งาน",
            dataIndex: "task",
            key: "task",
            align: "center",
            width: 150,
            className: "tw-text-violet-600 tw-truncate",
            filteredValue: [searchTarget],
            onFilter: (value, record) =>
                value
                    .split(",")
                    .every((target) => String(record?.task).includes(target)),
        },
        {
            title: "ความถี่",
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
            dataIndex: "task_id",
            key: "task_id",
            align: "center",
            width: 50,
            className: "tw-text-blue-500 tw-text-2xl",
            render: (text, record) => (
                <div className="tw-flex tw-flex-row tw-gap-1 tw-justify-center">
                    <Tooltip key={record.task_id} title={"กดเพื่อแก้ไข"}>
                        <EditOutlined onClick={() => showModal(record)} />
                    </Tooltip>
                </div>
            ),
        },
    ];
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        fetchSch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param.platform])

    return (
        <div
            className={classNames(
                "tw-flex tw-flex-col tw-max-w-full tw-max-h-full tw-overflow-auto",
                {}
            )}
        >
            <Loading isShown={showLoading} />
            {scheduleData.length > 0 && (
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
                            data={scheduleData}
                            onChangeSearch={setSearchAccout}
                        />
                    </div>
                    <div className={classNames("tw-w-full", {})}>
                        <p className="tw-text-lg">เป้าหมาย:</p>
                        <SearchBar
                            useTagSearch={true}
                            data={scheduleData}
                            onChangeFilter={setSearchTarget}
                            keyName={"task"}
                        />
                    </div>
                    <div className={classNames("tw-w-full", {})}>
                        <p className="tw-text-lg">ความถี่:</p>
                        <SearchBar
                            useTagSearch={true}
                            data={scheduleData}
                            onChangeFilter={setSearchFrequency}
                            keyName={"frequency"}
                        />
                    </div>
                </div>
            )}


            <div className={classNames("tw-flex tw-flex-col tw-h-full tw-w-full tw-gap-2", {})}>
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
                        เพิ่มงานประจำจาก Excel
                    </Button>
                    <Button
                        className={classNames("tw-self-center tw-text-blue-600 tw-border-blue-600 tw-border-2 tw-bg-white tw-drop-shadow-md hover:tw-bg-blue-600 hover:tw-border-black hover:tw-text-white", {
                            "tw-w-full": isMobile && isPortrait,
                        })}
                        onClick={() => showAddModal()}
                    >
                        เพิ่มงานประจำใหม่
                    </Button>
                </div>
                {scheduleData.length > 0 && (
                    <div
                        className={classNames("tw-border-2 tw-rounded-md", {
                            "tw-overflow-auto tw-min-h-fit": isTabletOrMobile && isPortrait,
                        })}
                    >
                        <DataTable
                            columns={columns}
                            data={scheduleData}
                            setPageSize={scheduleData.length}
                            keyName={"task_id"}
                        />
                        {modalToggle && (
                            <EditSchedueModal
                                fetch={fetchSch}
                                token={token}
                                modalToggle={modalToggle}
                                handleCancel={handleCancel}
                                modalData={modalData}
                            />
                        )}
                        {addModalToggle && (
                            <AddSchedueModal
                                fetch={fetchSch}
                                token={token}
                                modalToggle={addModalToggle}
                                handleCancel={handleAddCancel}
                            />
                        )}
                    </div>
                )}
            </div>

        </div>
    );
};

export default SchedueTable;
