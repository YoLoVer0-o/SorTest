import { useState } from "react";
import { useParams } from "react-router-dom";
import { SearchBar, VerticalBarChart, DoughnutChart } from "../../utilities";
import { sentimentAll, sentimentPos, dashboardMock } from "../../mock";
import { useResponsive } from "../../hooks";
import { Button, Tooltip } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";
import classNames from "classnames";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import ReadMoreReact from 'read-more-react';
import WordClouds from "../../assets/WordClouds";
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore)
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrAfter)

const SubDashboard = () => {

    // const [searchTag, setSearchTag] = useState([]);
    const [searchDate, setSearchDate] = useState([]);

    const { isTabletOrMobile, isTablet, isMobile, isPortrait, isLandscape } = useResponsive();

    ///////////////////////////////////WordClouds logic///////////////////////////////////////////////////////////////////////
    const { กองทัพ, รัฐบาล, ชุมนุม, สถาบัน } = WordClouds;

    const param = useParams();

    const displayTopic = () => {

        if (param.topic == "army") {
            return "กองทัพ"
        }
        else if (param.topic == "government") {
            return "รัฐบาล"
        }
        else if (param.topic == "rally") {
            return "ชุมนุม"
        }
        else if (param.topic == "religion") {
            return "สถาบัน"
        }
    };

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    const dashboardData = dashboardMock.filter(data => data.topic == (param.topic))[0];

    const sentWordClouds = () => {

        if (param.topic == "army") {
            return กองทัพ
        }
        else if (param.topic == "government") {
            return รัฐบาล
        }
        else if (param.topic == "rally") {
            return ชุมนุม
        }
        else if (param.topic == "religion") {
            return สถาบัน
        }
    };


    //////////////////////////////////////////color render////////////////////////////////////////////////////////////////
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

    //////////////////////////////////////////////////read more////////////////////////////////////////////////////////
    const readMore = <p className="tw-text-blue-500 tw-cursor-pointer">อ่านเพิ่มเติม</p>
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////postBar////////////////////////////////////////////////////////////////
    const postBarData = {
        labels: sentimentPos.map(item => item.name),
        datasets: [
            {
                label: 'จำนวนโพสต์',
                data: sentimentPos.map(item => item.value),
                backgroundColor: sentimentPos.map(item => colorSet(item.commentType)),
                barThickness: isMobile ? 20 : 50,
            },
        ],
    };

    const postBarOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                display: false,
            },
            title: {
                display: false,
                text: 'Chart.js Bar Chart',
            },
        },
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////sentimentBar///////////////////////////////////////////////////////////////
    const sentimentData = {
        labels: sentimentAll.map(item => item.name),
        datasets: [
            {
                label: 'จำนวนความคิดเห็น',
                data: sentimentAll.map(item => item.value),
                backgroundColor: sentimentAll.map(item => colorSet(item.commentType)),
                borderColor: sentimentAll.map(item => colorSet(item.commentType)),
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


    return (
        <div className={classNames('tw-flex tw-flex-col tw-max-w-full tw-max-h-full tw-overflow-auto', {})}>
            <p className="tw-self-center tw-font-bold tw-text-xl tw-my-4">DashBoard หวดหมู่: {displayTopic()}</p>
            <div className={classNames("tw-flex tw-flex-row tw-max-w-full tw-bg-white tw-justify-center tw-gap-2 tw-border-stone-300 tw-shadow-xl tw-border-4 tw-rounded-lg tw-p-4", {
                "tw-flex-col": isTabletOrMobile && isPortrait,
                "tw-sticky tw-top-0 tw-z-60": !isTabletOrMobile,
            })}>
                {/* <div className={classNames("tw-w-full", {})}>
                    <p className="tw-text-lg">ประเด็น:</p>
                    <SearchBar
                        useTagSearch={true}
                        data={newSentiment}
                        onChangeFilter={setSearchTag}
                        keyName={"tag"}
                    />
                </div> */}
                <div className={classNames("tw-w-full", {})}>
                    <p className="tw-text-lg">ห้วงเวลา:</p>
                    <SearchBar
                        useDateSearch={true}
                        onChangeDate={setSearchDate}
                    />
                </div>
                <Tooltip placement="top" title={"สร้างรายงานPDF"} color="blue">
                    <Button className="tw-h-max tw-flex tw-flex-row tw-self-end tw-m-3 tw-bg-white tw-border-2 tw-border-blue-300">
                        <FilePdfOutlined />
                        <p>สร้างรายงานPDF</p>
                    </Button>
                </Tooltip>
            </div>

            <div className={classNames("tw-flex tw-flex-col tw-justify-center tw-my-4 ", {})}>
                <div className={classNames("tw-flex tw-flex-row tw-gap-2 tw-my-2", {
                    "tw-flex-col": isTabletOrMobile || isTablet,
                })}>
                    <div className={classNames("tw-flex tw-flex-col tw-gap-4", {
                        "tw-w-full": isTabletOrMobile || isTablet,
                        "tw-w-1/3": !isTabletOrMobile && !isTablet,
                    })}>
                        <div className="tw-text-center tw-gap-y-6 tw-border-white tw-shadow-xl tw-border-4 tw-rounded-lg tw-p-4">
                            <p className="tw-text-lg">จำนวนโพสต์</p>
                            <p className="tw-text-6xl tw-font-bold tw-text-blue-400">xxxxxx{ }</p>
                        </div>
                        <div className="tw-text-center tw-gap-y-6 tw-border-white tw-shadow-xl tw-border-4 tw-rounded-lg tw-p-4">
                            <p className="tw-text-lg">การมีส่วนร่วมทั้งหมด</p>
                            <p className="tw-text-6xl tw-font-bold tw-text-blue-400">xxxxxx{ }</p>
                        </div>
                        <div className="tw-flex tw-flex-col tw-h-full tw-w-full tw-text-center tw-gap-y-6 tw-border-white tw-shadow-xl tw-border-4 tw-rounded-lg tw-p-4">
                            <p className="tw-text-center tw-text-lg">จำนวนโพสต์รายวัน</p>
                            <div className="tw-flex tw-w-full tw-h-full tw-overflow-auto tw-items-center">
                                <div className={classNames("tw-w-full tw-overflow-auto", {
                                    "tw-h-96": isTabletOrMobile || isTablet,
                                    "tw-h-full ": !isTabletOrMobile && !isTablet,
                                })}>
                                    <VerticalBarChart
                                        chartOptions={postBarOptions}
                                        chartData={postBarData}
                                        redraw={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classNames("tw-flex tw-flex-col tw-gap-4", {
                        "tw-w-full": isTabletOrMobile || isTablet,
                        "tw-w-1/3": !isTabletOrMobile && !isTablet,
                    })}>
                        <div className="tw-text-center tw-gap-y-6 tw-border-white tw-shadow-xl tw-border-4 tw-rounded-lg tw-p-4">
                            <p className="tw-text-lg">จำนวนผู้ใช้งาน</p>
                            <p className="tw-text-6xl tw-font-bold tw-text-blue-400">xxxxxx{ }</p>
                        </div>
                        <div className="tw-text-center tw-gap-y-6 tw-border-white tw-shadow-xl tw-border-4 tw-rounded-lg tw-p-4">
                            <p className="tw-text-lg">การมีส่วนร่วมเฉลี่ย/โพสต์</p>
                            <p className="tw-text-6xl tw-font-bold tw-text-blue-400">xxxxxx{ }</p>
                        </div>
                        <div className="tw-text-center tw-flex tw-flex-col tw-h-full tw-items-center tw-gap-y-6 tw-border-white tw-shadow-xl tw-border-4 tw-rounded-lg tw-p-4">
                            <p className="tw-text-center tw-text-lg">ความรู้สึกเชิงบวก-ลบ</p>
                            <div className=" tw-flex tw-flex-row tw-justify-center tw-gap-3">
                                <div className=" tw-flex tw-flex-row tw-gap-1 ">
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
                            <div className={classNames("tw-flex tw-justify-center tw-h-full tw-w-full", {
                            })}>
                                <div className={classNames("tw-w-full tw-overflow-auto", {
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
                        </div>
                    </div>
                    <div className={classNames("tw-flex tw-flex-col tw-gap-4 tw-h-[46rem]", {
                        "tw-w-full": isTabletOrMobile || isTablet,
                        "tw-w-1/3": !isTabletOrMobile && !isTablet,
                    })}>
                        <div className="tw-flex tw-flex-col tw-h-full tw-text-center tw-gap-y-6 tw-border-white tw-shadow-xl tw-border-4 tw-rounded-lg tw-p-4">
                            <p className="tw-text-lg">แฮชเเท็กที่ถูกใช้งานมากที่สุด</p>
                            <div className="tw-grid tw-grid-cols-3 tw-w-full tw-h-full tw-justify-around tw-items-center tw-self-center tw-gap-4">
                                <p className="tw-text-xl tw-font-bold tw-text-blue-400">#แอมมี่{ }</p>
                                <p className="tw-text-xl tw-font-bold tw-text-blue-400">#คบกันตอนไหน{ }</p>
                                <p className="tw-text-xl tw-font-bold tw-text-blue-400">#แบงค์ศุภณัฐ{ }</p>
                                <p className="tw-text-xl tw-font-bold tw-text-blue-400">#แม่แตงโม</p>
                                <p className="tw-text-xl tw-font-bold tw-text-blue-400">#สมุดหนังหมาHayDay{ }</p>
                                <p className="tw-text-xl tw-font-bold tw-text-blue-400">#dek67{ }</p>
                                <p className="tw-text-xl tw-font-bold tw-text-blue-400">#กรรมกรข่าวคุยนอกจอ{ }</p>
                                <p className="tw-text-xl tw-font-bold tw-text-blue-400">#BuildJakapan{ }</p>
                                <p className="tw-text-xl tw-font-bold tw-text-blue-400">#엔시티존{ }</p>
                                <p className="tw-text-xl tw-font-bold tw-text-blue-400">#ทาลอนเก่งอะ{ }</p>
                                <p className="tw-text-xl tw-font-bold tw-text-blue-400">#ตํานานวินเมธวิน</p>
                                <p className="tw-text-xl tw-font-bold tw-text-blue-400">#อิงฟ้ามหาชน</p>
                                <p className="tw-text-xl tw-font-bold tw-text-blue-400">#cnfact</p>
                                <p className="tw-text-xl tw-font-bold tw-text-blue-400">#ชาล็อตออสติน</p>
                                <p className="tw-text-xl tw-font-bold tw-text-blue-400">#นิทานพันดาว</p>
                                <p className="tw-text-xl tw-font-bold tw-text-blue-400">#30บาทรักษาทุกที่</p>
                                <p className="tw-text-xl tw-font-bold tw-text-blue-400">#เงินเฟ้อ</p>
                                <p className="tw-text-xl tw-font-bold tw-text-blue-400">#ขอแจมอีกที</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classNames("tw-flex tw-flex-row tw-justify-around tw-gap-4 tw-my-2", {
                    "tw-flex-col": isTabletOrMobile,
                })}>
                    <div className={classNames("tw-flex tw-flex-col tw-text-center tw-gap-y-6 tw-border-white tw-shadow-xl tw-border-4 tw-rounded-lg tw-p-4", {
                        "tw-w-full": isTabletOrMobile,
                        "tw-w-1/2": !isTabletOrMobile,
                    })}>
                        <p className="tw-text-lg">กลุ่มคำ</p>
                        <div className={classNames("", {
                            "tw-h-[16rem]": isMobile && isPortrait,
                            "tw-h-full": !isMobile || (isMobile && isLandscape),
                        })}>
                            <img className="tw-object-fill tw-h-full tw-w-full" src={sentWordClouds()} />
                        </div>
                    </div>
                    <div className={classNames("tw-flex tw-flex-col tw-h-full tw-object-contain tw-gap-y-6 tw-border-white tw-shadow-xl tw-border-4 tw-rounded-lg tw-p-4", {
                        "tw-w-full": isTabletOrMobile,
                        "tw-w-1/2": !isTabletOrMobile,
                    })}>
                        <p className="tw-text-lg tw-text-center">โพสต์ที่มีส่วนร่วมสูงสด</p>
                        <div>
                            <div className="tw-flex tw-flex-row tw-gap-2">
                                <div className="tw-w-max tw-h-max tw-border-2 tw-border-black tw-rounded-full">
                                    <img className="tw-rounded-full tw-h-12 tw-w-12" src={dashboardData.profile} />
                                </div>
                                <div className="tw-flex tw-flex-col">
                                    <p className="tw-text-2xl">{dashboardData.username}</p>
                                    <p className="tw-text-lg tw-font-thin">{dashboardData.date}</p>
                                </div>
                            </div>
                            <div className="tw-text-lg">
                                <ReadMoreReact
                                    text={dashboardData.text}
                                    min={100}
                                    ideal={180}
                                    max={300}
                                    readMoreText={readMore}
                                />
                                <div className={classNames("tw-flex tw-justify-center tw-h-96", {
                                })}>
                                    <img className="tw-object-scale-down" src={dashboardData.image} />
                                </div>
                            </div>
                            <div className="tw-flex tw-flex-row tw-min-w-full tw-justify-between">
                                <p className="tw-flex tw-text-lg tw-self-start tw-w-max">150{ } likes</p>
                                <div className="tw-flex tw-flex-row tw-gap-2 tw-w-max tw-text-lg tw-self-end">
                                    <p>2.1k { } comments</p>
                                    <p>8.5k { } shares</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SubDashboard;