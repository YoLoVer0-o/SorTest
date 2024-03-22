import { useState, useEffect, useRef } from "react";
import { DataTable, SearchBar, Loading } from "../../utilities";
import { botStatus } from "../../mock";
import { useResponsive } from "../../hooks";
// import { AddUserModal, EditUserModal } from "..";
import { Button, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined, CheckCircleOutlined, PlayCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(isSameOrAfter);
import classNames from "classnames";
import RPAWorkAPI from "../../service/RPAWorkAPI";

import { useSelector } from 'react-redux'
import { getLogin } from '../../libs/loginSlice'


const StatusTable = () => {

    const [workData, setWorkData] = useState();
    const [searchPlatform, setSearchPlatform] = useState("facebook")
    const [searchAccount, setSearchAccout] = useState("");
    const [searchDate, setSearchDate] = useState([]);
    const [searchStatus, setSearchStatus] = useState([]);
    const [showLoading, setShowLoading] = useState(false);
    const [pageIndex, setPageIndex] = useState({ current: 1, pageSize: 10 });


    const { isTabletOrMobile, isMobile, isPortrait, isLandscape } = useResponsive();

    const token = useSelector((state) => getLogin(state).token);

    const fetchWork = async () => {
        try {
            setShowLoading(true);

            let data
            if (searchPlatform == "facebook") {
                data = await RPAWorkAPI.fbGetActionLog(token)
                setWorkData(data);
            }
            else if (searchPlatform == "X") {
                data = await RPAWorkAPI.fbGetActionLog(token)
                setWorkData(data);
            }
            else if (searchPlatform == "tiktok") {
                data = await RPAWorkAPI.ttGetAllWork(token, pageIndex)
                setWorkData(data);
            }
            else if (searchPlatform == "instagram") {
                data = await RPAWorkAPI.igGetAllWork(token, pageIndex)
                setWorkData(data);
            }
            else if (searchPlatform == "youtube") {
                data = await RPAWorkAPI.ytGetAllWork(token, pageIndex)
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

    ////////////////////////////////////////////table//////////////////////////////////////////////////////////////
    const columns = [
        {
            title: "ผู้ใช้งาน",
            dataIndex: "user",
            key: "user",
            align: "center",
            width: 150,
            className: "tw-truncate",
            filteredValue: [searchAccount],
            onFilter: (value, record) =>
                String(record?.user).toLowerCase().includes(value.toLowerCase()),
        },
        {
            title: "รายละเอียด",
            dataIndex: "text",
            key: "text",
            align: "center",
            width: 150,
            className: "tw-truncate",
        },
        {
            title: "บัญชี",
            dataIndex: "botname",
            key: "botname",
            align: "center",
            width: 150,
            className: "tw-text-violet-600",
            // render: (text, record) => (
            //     <div className="tw-flex tw-flex-row tw-gap-1 tw-justify-center">
            //         <Tooltip title={record?.group}>
            //             <div className="tw-w-max tw-rounded-md tw-p-2 tw-border-2 tw-border-black tw-text-center tw-text-white tw-bg-violet-600">
            //                 {record?.group}
            //             </div>
            //         </Tooltip>
            //     </div>
            // ),
        },
        {
            title: "สถานะ",
            dataIndex: "status",
            key: "status",
            align: "center",
            width: 50,
            className: "tw-text-amber-600",
            filteredValue: [searchStatus],
            onFilter: (value, record) =>
                value
                    .split(",")
                    .some((status) => String(record?.status).includes(status)),
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
        {
            title: "Timestamp",
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
            render: (text, record) => (
                <p className="tw-m-2">{dayjs(record?.timestamp).format('YYYY-MM-DD')}</p>
            ),
        },
        {
            title: "Link",
            dataIndex: "post_url",
            key: "post_url",
            align: "center",
            width: 100,
            className: "tw-text-blue-500 tw-text-2xl",
            render: (text, record) => (
                <Tooltip title="กดเพื่อไปที่โพสต์">
                    <a href={record?.post_url} target="blank">
                        <div className="tw-rounded-md tw-w-full tw-h-fit tw-border-2 tw-border-black tw-text-center tw-text-white tw-bg-sky-600" >
                            <p className="tw-m-2">Link</p>
                        </div>
                    </a>
                </Tooltip>
            ),
        },
        {
            title: "",
            dataIndex: "accName",
            key: "accName",
            align: "center",
            width: 50,
            className: "tw-text-blue-500 tw-text-2xl",
            render: (text, record) => (
                <div className="tw-flex tw-flex-row tw-gap-2">
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
            <Loading isShown={showLoading} />
            <div
                className={classNames(
                    "tw-flex tw-flex-row tw-max-w-full tw-justify-center tw-gap-2",
                    {
                        "tw-flex-col": isTabletOrMobile,
                    }
                )}
            >
                <div className={classNames("tw-w-full", {})}>
                    <p className="tw-text-lg">แพลตฟอร์ม:</p>
                    <SearchBar
                        useTagSearch={true}
                        data={[{ platform: "facebook", }]}
                        onChangeFilter={setSearchPlatform}
                        keyName={"platform"}
                    />
                </div>
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
                        data={workData}
                        onChangeFilter={setSearchStatus}
                        keyName={"status"}
                    />
                </div>
            </div>



            <div className={classNames("tw-flex tw-flex-col tw-h-full tw-w-full tw-gap-2", {})}>

                <div
                    className={classNames("tw-border-2 tw-rounded-md", {
                        "tw-overflow-auto tw-min-h-fit": isTabletOrMobile && isPortrait,
                    })}
                >
                    {workData?.length > 0 &&
                        <DataTable
                            columns={columns}
                            data={workData}
                            setPageSize={workData?.length}
                            keyName={"timestamp"}
                        />
                    }

                </div>
            </div>

        </div >

    );
};

export default StatusTable;
