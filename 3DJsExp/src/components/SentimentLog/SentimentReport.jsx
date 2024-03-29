import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HorizontalBarChart, DoughnutChart, ToTopButton, DataTable, Loading } from "../../utilities";
import { sentimentAll, sentimentNega, sentimentPos } from "../../mock";
import { Button, FloatButton, Tooltip } from "antd";
import { useResponsive } from "../../hooks";
import { FeedbackModal } from "..";
import { MoreOutlined, FilePdfOutlined, ColumnHeightOutlined, VerticalAlignMiddleOutlined } from "@ant-design/icons";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import classNames from "classnames";
import botPostReportAPI from "../../service/botPostReportAPI";
import { useSelector } from 'react-redux'
import { getLogin } from '../../libs/loginSlice'

const SentimentReport = () => {

    const [commentType, setCommentType] = useState("");
    const [displayComments, setDisplayComments] = useState("");
    const [pageSize, setPageSize] = useState(5);
    const [modalToggle, setModalToggle] = useState(false);
    const [message, setMessage] = useState({});
    const [tableComment, setTableComment] = useState({});
    const [displayData, setDisplayData] = useState({});
    const [showLoading, setShowLoading] = useState(false);
    const [pageIndex, setPageIndex] = useState({ current: 1, pageSize: 10 });

    const token = useSelector((state) => getLogin(state).token);

    const location = useLocation();

    let id = location.state;

    const fetchBotPost = async () => {
        try {
            // setShowLoading(true);
            const data = await botPostReportAPI.getBotPostById(id);
            setDisplayData(data);
        } catch (error) {
            console.error('Error fetching bot config:', error);
        } finally {
            // setShowLoading(false);
        }
    }

    const fetchComment = async () => {
        try {
            setShowLoading(true);
            const data = await botPostReportAPI.getComment(commentType, displayComments, id, pageIndex.current);
            setTableComment(data);
        } catch (error) {
            console.error('Error fetching bot config:', error);
        } finally {
            setShowLoading(false);
        }
    }

    useEffect(() => {
        fetchBotPost()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        fetchComment()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, commentType, displayComments])

    useEffect(() => {
        console.log(displayData);
    }, [displayData])



    const topRef = useRef(null);

    const {
        isDesktopOrLaptop,
        isBigScreen,
        isTabletOrMobile,
        isTablet,
        isMobile,
        isPortrait,
    } = useResponsive();

    /////////////////////////////////////////modal toggle/////////////////////////////////////////////////////////////////
    const showModal = (data) => {
        console.log(data);
        setMessage(data);
        setModalToggle(true);
    };

    const handleCancel = () => {
        setModalToggle(false);
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////redirect/////////////////////////////////////////////////////////////
    const redirect = (element, data) => {
        if (!element.length) return;

        const { index } = element[0];

        console.log(data);

        setDisplayComments(data.topComments[index]?.label);
        setCommentType(data.commentType);
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////color render logic//////////////////////////////////////////////////////////////
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
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////sentiment pie/////////////////////////////////////////////////////////////
    const sentimentData = {
        labels: displayData.comment?.map(item => item.commentType),
        datasets: [
            {
                label: 'จำนวนความคิดเห็น',
                data: displayData.comment?.map(item => item.value),
                backgroundColor: displayData.comment?.map(item => colorSet(item.commentType)),
                borderColor: displayData.comment?.map(item => colorSet(item.commentType)),
            },
        ],
    };

    const sentimentOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                display: false,
            },
            title: {
                display: false,
                text: 'Chart.js Doughnut Chart',
            },
            datalabels: {
                color: '#000000',
                font: {
                    size: 24
                },
            },
        },
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////// social Bar////////////////////////////////////////////////////////////////



    const posBarData = displayData.comment && displayData.comment.length > 0 ? {
        labels: displayData?.comment[0]?.topComments?.map(item => item.label),
        datasets: [
            {
                label: 'จำนวนโพสต์',
                data: displayData?.comment[0]?.topComments?.map(item => item.value),
                backgroundColor: colorSet(displayData?.comment[0].commentType),
                barThickness: isMobile ? 20 : 50,
            },
        ],
    } : {};

    const negaBarData = displayData.comment && displayData.comment.length > 0 ? {
        labels: displayData?.comment[2]?.topComments?.map(item => item.label),
        datasets: [
            {
                label: 'จำนวนโพสต์',
                data: displayData?.comment[2]?.topComments?.map(item => item.value),
                backgroundColor: colorSet(displayData?.comment[2].commentType),
                barThickness: isMobile ? 20 : 50,
            },
        ],
    } : {};

    const socialBarOptions = {
        indexAxis: 'y',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                display: false,
            },
            title: {
                display: false,
                text: 'Chart.js Horizontal Bar Chart',
            },
        },
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////table///////////////////////////////////////////////////////////////
    const columns = [
        {
            title: 'ลำดับ',
            dataIndex: 'key',
            key: 'key',
            align: "center",
            width: 100,
            className: '',
            render: (text, record, index) => (
                <p>
                    {index + 1}
                </p>
            ),
        },
        {
            title: 'วันที่',
            dataIndex: 'timestamp',
            key: 'timestamp',
            align: "center",
            width: 100,
            className: '',
        },
        {
            title: 'เนื้อหา',
            dataIndex: 'message',
            key: 'message',
            align: "center",
            width: 250,
            className: '',
        },
        {
            title: 'ผู้โพสต์',
            dataIndex: 'userName',
            key: 'userName',
            align: "center",
            width: 100,
            className: '',
        },
    ];
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div className="tw-w-screen tw-h-full tw-p-2 tw-overflow-auto">
            <Loading isShown={showLoading} />
            <div
                ref={topRef}
                tabIndex={0}
                className={classNames("", {
                    "tw-overflow-auto": isTabletOrMobile && isPortrait,
                })} >
                <div className={classNames("tw-flex tw-flex-row tw-mb-4 tw-w-full tw-h-full", {
                    "tw-flex-col": isTabletOrMobile && isPortrait,
                })}>
                    <div className={classNames("tw-flex tw-flex-row tw-justify-around tw-w-full tw-border-white tw-shadow-xl tw-py-4 tw-border-4 tw-rounded-lg tw-text-md tw-font-bold", {
                        "tw-flex tw-flex-col tw-gap-1": isTabletOrMobile && isPortrait,
                    })}>
                        <div>
                            Tag :
                            <div className={classNames("tw-grid tw-grid-cols-5 tw-gap-1 tw-p-2 tw-w-fit tw-h-fit tw-content-center tw-items-center tw-border-2 tw-rounded-md tw-border-solid tw-border-black", {
                                "tw-w-28": isMobile && isPortrait,
                                "tw-w-34": isTablet && isPortrait,
                                "tw-w-44": isDesktopOrLaptop || isBigScreen,
                            })}>
                                {/* <div className="tw-grid tw-grid-cols-4 tw-gap-1 tw-w-full tw-h-full tw-content-start"> */}
                                {displayData.tag && displayData.tag.length > 0 && displayData?.tag.map(tag => (
                                    <Tooltip key={tag} title={tag}>
                                        <div className=" tw-w-full tw-rounded-md tw-p-2 tw-border-2 tw-border-black tw-text-center tw-text-white tw-bg-violet-600" >
                                            {tag}
                                        </div>
                                    </Tooltip>
                                ))}
                                {/* </div> */}
                                {/* {displayData?.tag}
                                TestTag */}
                            </div>
                        </div>
                        <div>
                            ชื่อเล่น :
                            <div className={classNames("tw-flex	tw-items-center tw-border-2 tw-rounded-md tw-h-8 tw-border-solid tw-border-black", {
                                "tw-w-28": isMobile && isPortrait,
                                "tw-w-34": isTablet && isPortrait,
                                "tw-w-44": isDesktopOrLaptop || isBigScreen,
                            })}>
                                {displayData?.nickName}
                                {/* Test */}
                            </div>
                        </div>
                        <div>
                            วันที่โพสต์ :
                            <div className={classNames("tw-flex	tw-items-center tw-border-2 tw-rounded-md tw-h-8 tw-border-solid tw-border-black", {
                                "tw-w-28": isMobile && isPortrait,
                                "tw-w-34": isTablet && isPortrait,
                                "tw-w-44": isDesktopOrLaptop || isBigScreen,
                            })}>
                                {displayData?.timestamp}
                                {/* YYYY/MM/DD */}
                            </div>
                        </div>
                        <div>
                            Bot :
                            <div className={classNames("tw-flex	tw-items-center tw-border-2 tw-rounded-md tw-h-8 tw-border-solid tw-border-black", {
                                "tw-w-28": isMobile && isPortrait,
                                "tw-w-34": isTablet && isPortrait,
                                "tw-w-44": isDesktopOrLaptop || isBigScreen,
                            })}>
                                {displayData?.group}
                                {/* group A */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={classNames("tw-flex tw-flex-row tw-justify-around tw-my-4 tw-gap-2", {
                    "tw-flex-col": isTabletOrMobile,
                })}>
                    <div className="tw-flex tw-w-full tw-flex-col tw-items-center tw-gap-y-6 tw-border-white tw-shadow-xl tw-border-4 tw-rounded-lg tw-p-4">
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
                        <div className={classNames("tw-flex tw-w-full tw-overflow-auto tw-items-center", {
                            "tw-h-96": isTabletOrMobile || isTablet,
                            "tw-h-full ": !isTabletOrMobile && !isTablet,
                        })}>
                            <DoughnutChart
                                chartData={sentimentData}
                                chartOptions={sentimentOptions}
                                redraw={true}
                                plugins={[ChartDataLabels]}
                            />
                        </div>
                    </div>
                    <div className="tw-flex tw-w-full tw-flex-col tw-gap-y-6 tw-border-white tw-shadow-xl tw-border-4 tw-rounded-lg tw-p-4">
                        <p className="tw-text-center tw-text-lg">ข้อความเชิงบวกสูงสุด</p>
                        {displayData.comment && displayData.comment.length > 0 &&
                            <div className={classNames("tw-w-full tw-h-[38rem]", {
                                "tw-h-96 tw-w-96": isTabletOrMobile,
                            })}>
                                <HorizontalBarChart
                                    chartOptions={socialBarOptions}
                                    chartData={posBarData}
                                    redraw={true}
                                    handleClick={redirect}
                                    useDataProps={displayData.comment[0]}
                                />
                            </div>
                        }
                    </div>
                    <div className="tw-flex tw-w-full tw-flex-col tw-gap-y-6 tw-border-white tw-shadow-xl tw-border-4 tw-rounded-lg tw-p-4">
                        <p className="tw-text-center tw-text-lg">ข้อความเชิงลบสูงสุด</p>
                        {displayData.comment && displayData.comment.length > 0 &&
                            <div className={classNames("tw-w-full tw-h-[38rem]", {
                                "tw-h-96 tw-w-96": isTabletOrMobile,
                            })}>
                                <HorizontalBarChart
                                    chartOptions={socialBarOptions}
                                    chartData={negaBarData}
                                    redraw={true}
                                    handleClick={redirect}
                                    useDataProps={displayData.comment[2]}
                                />
                            </div>
                        }
                    </div>
                </div>

            </div>

            <div className={classNames("tw-my-12 tw-border-white tw-shadow-xl tw-border-4 tw-rounded-lg tw-p-4", {
                "tw-overflow-auto": isTabletOrMobile && isPortrait,
            })}>
                {tableComment && tableComment.Comment?.length > 0 && (
                    <p className="tw-text-2xl tw-text-center tw-my-4">แสดงความคิดเห็นของ {displayComments} </p>
                )}
                {tableComment && tableComment.Comment?.length > 0 &&
                    <div className={classNames("", {
                        "tw-overflow-auto": isTabletOrMobile,
                    })}>
                        <DataTable
                            columns={columns}
                            data={tableComment?.Comment}
                            setPageSize={pageSize}
                            useRowClick={true}
                            onRowClick={(selectedRows) => showModal(selectedRows)}
                            keyName={"id"}
                            totalPages={tableComment?.total_data}
                            sendPages={setPageIndex}
                        />
                    </div>
                }
                <FeedbackModal
                    modalToggle={modalToggle}
                    handleCancel={handleCancel}
                    modalData={message}
                />
                {/* {displayComments !== "" && details.length > 5 && (<div className="tw-flex tw-flex-row tw-my-6 tw-gap-4">
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
                                onClick={() => setPageSize(10)}
                                icon={<VerticalAlignMiddleOutlined />}
                            >
                                show less
                            </Button>
                        </Tooltip>
                    )}
                </div>)} */}

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