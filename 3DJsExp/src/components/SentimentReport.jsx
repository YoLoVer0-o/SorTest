import { useState, useRef } from "react";
import { HorizontalBarChart, PieChart, ToTopButton, DataTable } from "../utilities";
import { Button, FloatButton, Tooltip } from "antd";
import classNames from "classnames";
import { useResponsive } from "../hooks";
import { FeedbackModal } from "../components";
import { MoreOutlined, FilePdfOutlined } from "@ant-design/icons";
import { sentimentAll, sentimentNega, sentimentPos } from "../mock";
import { ColumnHeightOutlined, VerticalAlignMiddleOutlined } from '@ant-design/icons';

const SentimentReport = () => {
    const [details, setDetails] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const [modalToggle, setModalToggle] = useState(false);
    const [message, setMessage] = useState({});
    const [displayComments, setDisplayComments] = useState("");
    const topRef = useRef(null);

    const {
        isDesktopOrLaptop,
        isBigScreen,
        isTabletOrMobile,
        isTablet,
        isMobile,
        isPortrait,
    } = useResponsive();

    const showModal = (data) => {
        console.log(data);
        setMessage(data);
        setModalToggle(true);
    };

    const handleCancel = () => {
        setModalToggle(false);
    };

    const redirect = (data) => {
        console.log(data);
        setDisplayComments(data);
        setDetails(data.Comment);
    };

    const colorSet = (data) => {
        if (data == "positive") {
            return "#22c55e";
        }
        else if (data == "negative") {
            return "#ef4444";
        }
        else {
            return "#0284c7";
        }
    };

    const columns = [
        {
            title: 'ลำดับ',
            dataIndex: 'key',
            key: 'key',
            align: "center",
            width: 100,
            className: 'tw-text-white tw-bg-[#303c6c]',
        },
        {
            title: 'วันที่',
            dataIndex: 'timestamp',
            key: 'timestamp',
            align: "center",
            width: 100,
            className: 'tw-text-white tw-bg-[#303c6c]',
        },
        {
            title: 'เนื้อหา',
            dataIndex: 'message',
            key: 'message',
            align: "center",
            width: 250,
            className: 'tw-text-white tw-text-sky-700 tw-bg-[#303c6c]',
        },
        {
            title: 'ผู้โพสต์',
            dataIndex: 'userName',
            key: 'userName',
            align: "center",
            width: 100,
            className: 'tw-text-white tw-bg-[#303c6c]',
        },
    ];

    return (
        <div className="tw-w-screen tw-h-full tw-p-2 tw-overflow-auto">

            <div
                ref={topRef}
                tabIndex={0}
                className={classNames("", {
                    "tw-overflow-auto": isTabletOrMobile && isPortrait,
                })} >
                <div className={classNames("tw-flex tw-flex-row tw-mb-4 tw-w-full tw-h-full", {
                    "tw-flex-col": isTabletOrMobile && isPortrait,
                })}>
                    <div className={classNames("tw-flex tw-flex-row tw-justify-around tw-w-full tw-border-stone-400 tw-py-4 tw-border-4 tw-rounded-lg tw-text-md tw-font-bold", {
                        "tw-grid tw-grid-cols-2 tw-gap-1": isTabletOrMobile && isPortrait,
                    })}>
                        <div>
                            Tag :
                            <div className={classNames("tw-flex	tw-items-center tw-border-2 tw-rounded-md tw-h-8 tw-border-solid tw-border-black", {
                                "tw-w-28": isMobile && isPortrait,
                                "tw-w-34": isTablet && isPortrait,
                                "tw-w-44": isDesktopOrLaptop || isBigScreen,
                            })}>
                                {" "}
                                TestTag
                            </div>
                        </div>
                        <div>
                            ชื่อเล่น :
                            <div className={classNames("tw-flex	tw-items-center tw-border-2 tw-rounded-md tw-h-8 tw-border-solid tw-border-black", {
                                "tw-w-28": isMobile && isPortrait,
                                "tw-w-34": isTablet && isPortrait,
                                "tw-w-44": isDesktopOrLaptop || isBigScreen,
                            })}>
                                {" "}
                                Test
                            </div>
                        </div>
                        <div>
                            วันที่โพสต์ :
                            <div className={classNames("tw-flex	tw-items-center tw-border-2 tw-rounded-md tw-h-8 tw-border-solid tw-border-black", {
                                "tw-w-28": isMobile && isPortrait,
                                "tw-w-34": isTablet && isPortrait,
                                "tw-w-44": isDesktopOrLaptop || isBigScreen,
                            })}>
                                {" "}
                                YYYY/MM/DD
                            </div>
                        </div>
                        <div>
                            Bot :
                            <div className={classNames("tw-flex	tw-items-center tw-border-2 tw-rounded-md tw-h-8 tw-border-solid tw-border-black", {
                                "tw-w-28": isMobile && isPortrait,
                                "tw-w-34": isTablet && isPortrait,
                                "tw-w-44": isDesktopOrLaptop || isBigScreen,
                            })}>
                                {" "}
                                group A
                            </div>
                        </div>
                    </div>
                </div>

                <div className={classNames("tw-flex tw-flex-row tw-justify-around tw-my-4", {
                    "tw-flex-col": isTabletOrMobile,
                })}>
                    <div className="tw-flex tw-flex-col tw-justify-center tw-gap-y-6 tw-border-stone-400 tw-border-4 tw-rounded-lg tw-p-4">
                        <p className="tw-text-center tw-text-lg">ความรู้สึกเชิงบวก-ลบ</p>
                        <div className="tw-flex tw-flex-row tw-justify-center tw-gap-3">
                            <div className="tw-flex tw-flex-row tw-gap-1 ">
                                <div className="tw-w-6 tw-h-6 tw-border-2 tw-border-black tw-rounded-full tw-bg-green-500">
                                </div>
                                <p>เชิงบวก</p>
                            </div>
                            <div className="tw-flex tw-flex-row tw-gap-1">
                                <div className="tw-w-6 tw-h-6 tw-border-2 tw-border-black tw-rounded-full tw-bg-sky-600">
                                </div>
                                <p>เป็นกลาง</p>
                            </div>
                            <div className="tw-flex tw-flex-row tw-gap-1">
                                <div className="tw-w-6 tw-h-6 tw-border-2 tw-border-black tw-rounded-full tw-bg-red-500">
                                </div>
                                <p>เชิงลบ</p>
                            </div>
                        </div>
                        <div className={classNames("", {
                            "tw-flex tw-justify-center": isTabletOrMobile,
                        })}>
                            <PieChart
                                data={sentimentAll}
                                keyName={"value"}
                                displayText={"name"}
                                width={isTabletOrMobile ? 240 : 360}
                                height={isTabletOrMobile ? 240 : 360}
                                innerRadius={isTabletOrMobile ? 30 : 60}
                                outerRadius={isTabletOrMobile ? 120 : 180}
                                calColor={colorSet}
                            />
                        </div>
                    </div>
                    <div className="tw-flex tw-flex-col tw-gap-y-6 tw-border-stone-400 tw-border-4 tw-rounded-lg tw-p-4">
                        <p className="tw-text-center tw-text-lg">ข้อความเชิงบวกสูงสุด</p>
                        <div className="">
                            <HorizontalBarChart
                                className={"tw-flex tw-h-fit tw-w-fit tw-max-w-fit tw-max-h-fit"}
                                data={sentimentPos}
                                width={640}
                                barHeight={isTabletOrMobile ? 70 : 35}
                                keyNameX={"value"}
                                keyNameY={"name"}
                                keyNameColor={"positive"}
                                calColor={colorSet}
                                onBarClick={redirect}
                            />
                        </div>
                    </div>
                    <div className="tw-flex tw-flex-col tw-gap-y-6 tw-border-stone-400 tw-border-4 tw-rounded-lg tw-p-4">
                        <p className="tw-text-center tw-text-lg">ข้อความเชิงลบสูงสุด</p>
                        <div className="">
                            <HorizontalBarChart
                                className={"tw-flex tw-h-fit tw-w-fit tw-max-w-fit tw-max-h-fit"}
                                data={sentimentNega}
                                width={640}
                                barHeight={isTabletOrMobile ? 70 : 35}
                                keyNameX={"value"}
                                keyNameY={"name"}
                                keyNameColor={"negative"}
                                calColor={colorSet}
                                onBarClick={redirect}
                            />
                        </div>
                    </div>
                </div>

            </div>

            <div className={classNames("tw-my-12 tw-border-stone-400 tw-border-4 tw-rounded-lg tw-p-4", {
                "tw-overflow-auto": isTabletOrMobile && isPortrait,
            })}>
                {displayComments !== "" && (
                    <p className="tw-text-2xl tw-text-center tw-my-4">แสดงความคิดเห็น {displayComments.commentType == "positive" ? "แง่บวก" : "แง่ลบ"} ของ {displayComments.name} </p>
                )}
                <div className={classNames("", {
                    "tw-overflow-auto": isTabletOrMobile && isPortrait,
                })}>
                    <DataTable
                        columns={columns}
                        data={details}
                        setPageSize={pageSize}
                        useRowClick={true}
                        onRowClick={(selectedRows) => showModal(selectedRows)}
                    />
                </div>
                <FeedbackModal
                    modalToggle={modalToggle}
                    handleCancel={handleCancel}
                    modalData={message}
                />
                {displayComments !== "" && (<div className=" tw-flex tw-flex-row tw-my-6 tw-gap-4">
                    {pageSize < 20 && (
                        <Tooltip title="แสดงเพิ่มเติม">
                            <Button
                                className="tw-border-black tw-border-2 tw-bg-green-400 tw-drop-shadow-md hover:tw-bg-white hover:tw-border-green-600 hover:tw-text-green-600"
                                onClick={() => setPageSize(20)}
                                icon={<ColumnHeightOutlined />}
                            >
                                show more
                            </Button>
                        </Tooltip>
                    )}
                    {pageSize >= 20 && (
                        <Tooltip title="แสดงน้อยลง">
                            <Button
                                className="tw-border-black tw-border-2 tw-bg-yellow-400 tw-drop-shadow-md hover:tw-bg-white hover:tw-border-yellow-600 hover:tw-text-yellow-600"
                                onClick={() => setPageSize(5)}
                                icon={<VerticalAlignMiddleOutlined />}
                            >
                                show less
                            </Button>
                        </Tooltip>
                    )}
                </div>)}

            </div>

            <Tooltip placement="left" title={"เพิ่มเติม"} color="blue">
                <FloatButton.Group
                    trigger="click"
                    type="primary"
                    className="tw-right-10"
                    icon={<MoreOutlined />}
                >
                    <Tooltip placement="left" title={"สร้างรายงานPDF"} color="blue">
                        <FloatButton
                            className="tw-flex tw-right-2 tw-bottom-32 tw-z-10 tw-bg-red-400"
                            icon={<FilePdfOutlined />}
                        />
                    </Tooltip>
                    <ToTopButton topRef={topRef} />
                </FloatButton.Group>
            </Tooltip>
        </div>

    )
}

export default SentimentReport