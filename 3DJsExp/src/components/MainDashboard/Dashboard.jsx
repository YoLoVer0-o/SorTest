import { useState } from "react";
import { SearchBar, VerticalBarChart, HorizontalBarChart, DoughnutChart } from "../../utilities";
import { newSentiment, sentimentAll, sentimentPos, socialPlatform } from "../../mock";
import { useResponsive } from "../../hooks";
import { Button, Tooltip } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";
import classNames from "classnames";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import ReadMoreReact from 'read-more-react';
import profile from "../../assets/profile.png";
import carouselPic from "../../assets/carouselPic.jpg";
import SocialIcons from "../../assets/SocialIcons";
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore)
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrAfter)

const Dashboard = () => {

    const [searchTag, setSearchTag] = useState([]);
    const [searchDate, setSearchDate] = useState([]);

    const { isTabletOrMobile, isTablet, isMobile, isPortrait } = useResponsive();

    ///////////////////////////////////icons render logic///////////////////////////////////////////////////////////////////////
    const { facebook, instagram, twitter, tiktok, youtube, social_media } = SocialIcons;
    const sentIcons = (value) => {
        if (value == "facebook") {
            return facebook
        }
        else if (value == "instagram") {
            return instagram
        }
        else if (value == "twitter") {
            return twitter
        }
        else if (value == "tiktok") {
            return tiktok
        }
        else if (value == "youtube") {
            return youtube
        }
        else {
            return social_media
        }
    };

    const socialBarColor = (value) => {
        if (value == "facebook") {
            return "#1974ec"
        }
        else if (value == "instagram") {
            return "#833AB4"
        }
        else if (value == "twitter") {
            return "#1DA1F2"
        }
        else if (value == "tiktok") {
            return "#ff0050"
        }
        else if (value == "youtube") {
            return "#FF0000"
        }
        else {
            return "#282828"
        }
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////image reder//////////////////////////////////////////////////////////////
    const imageSettings = {
        barSize: isMobile ? 30 : 50,
        imageWidth: isMobile ? 30 : 50,
        imageHeight: isMobile ? 30 : 50,
        imageHalfHeight: isMobile ? 30 / 2 : 50 / 2,
        imageBarOffset: 0,
    };

    const handleDrawImage = (chart, data) => {
        const { ctx } = chart;

        const chartHeight = chart.chartArea?.height;
        const dataLength = data.labels.length;

        const step = (chartHeight - imageSettings.barSize * dataLength) / dataLength;
        const yOffset = step / 2 + imageSettings.imageBarOffset;

        ctx.save();

        data.labels.forEach((element, i) => {

            const imageY = i * (imageSettings.barSize + step) + yOffset;

            const image = new Image();
            image.src = sentIcons(element);

            ctx.drawImage(
                image,
                0,
                imageY,
                imageSettings.imageWidth,
                imageSettings.imageHeight
            );

            ctx.restore();
        });
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

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
    const testText = "Lorem ipsum dolor sit amet,consectetur adipiscing elit.Vivamus odio quam,convallis et pretium consectetur,vestibulum nec tellus.Nulla fringilla sem eu lacinia mollis.Fusce a molestie enim.Duis pellentesque turpis scelerisque efficitur condimentum.Sed pellentesque odio efficitur interdum scelerisque.Nulla euismod erat porta neque mattis lobortis.Praesent consequat mi at pharetra venenatis.Donec leo sapien, blandit porttitor justo nec,sagittis sagittis diam.Nunc elementum neque quis laoreet maximus.Donec dignissim lectus tortor,condimentum egestas lorem volutpat et.Nulla leo orci,euismod et rutrum ut, aliquam non tellus.Proin lectus nulla,finibus eu tortor in, maximus euismod ligula."
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

    /////////////////////////////////////////////socialBar/////////////////////////////////////////////////////////////
    const socialBarData = {
        labels: socialPlatform.map(item => item.platform),
        datasets: [
            {
                label: 'จำนวนความเคลื่อนไหว',
                data: socialPlatform.map(item => item.usage),
                borderColor: socialPlatform.map(item => socialBarColor(item.platform)),
                backgroundColor: socialPlatform.map(item => socialBarColor(item.platform)),
                barThickness: isTabletOrMobile ? 30 : 50,
            },
        ],
    };

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
        scales: {
            y: {
                ticks: {
                    display: false,
                },
                grid: {
                    display: false,
                },
                afterFit: (scaleInstance) => {
                    scaleInstance.width = 60;
                },
            },
        },
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div className={classNames('tw-flex tw-flex-col tw-max-w-full tw-max-h-full tw-overflow-auto', {})}>
            <p className="tw-self-center tw-font-bold tw-text-xl tw-my-4">DashBoard</p>
            <div className={classNames("tw-flex tw-flex-row tw-max-w-full tw-bg-white tw-justify-center tw-gap-2 tw-border-stone-300 tw-shadow-xl tw-border-4 tw-rounded-lg tw-p-4", {
                "tw-flex-col": isTabletOrMobile && isPortrait,
                "tw-sticky tw-top-0 tw-z-60": !isTabletOrMobile,
            })}>
                <div className={classNames("tw-w-full", {})}>
                    <p className="tw-text-lg">ประเด็น:</p>
                    <SearchBar
                        useTagSearch={true}
                        data={newSentiment}
                        onChangeFilter={setSearchTag}
                        keyName={"tag"}
                    />
                </div>
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
                    <div className={classNames("tw-flex tw-flex-col tw-gap-4", {
                        "tw-w-full": isTabletOrMobile || isTablet,
                        "tw-w-1/3": !isTabletOrMobile && !isTablet,
                    })}>
                        <div className="tw-flex tw-flex-col tw-gap-y-6 tw-w-full tw-h-full tw-border-white tw-shadow-xl tw-border-4 tw-rounded-lg tw-p-4">
                            <p className="tw-text-center tw-text-lg">ช่องทางสื่อออนไลน์</p>
                            <div className={classNames("tw-w-full tw-h-[38rem]", {
                                "tw-h-96 tw-w-96": isTabletOrMobile,
                            })}>
                                <HorizontalBarChart
                                    chartOptions={socialBarOptions}
                                    chartData={socialBarData}
                                    redraw={true}
                                    imageSettings={imageSettings}
                                    plugins={[
                                        {
                                            id: "sectorBackground",
                                            beforeDraw: (chart) => handleDrawImage(chart, socialBarData),
                                            resize: (chart) => handleDrawImage(chart, socialBarData)
                                        }
                                    ]}
                                />
                            </div>
                        </div>
                        <div className="tw-flex tw-flex-col tw-h-full tw-text-center tw-gap-y-6 tw-border-white tw-shadow-xl tw-border-4 tw-rounded-lg tw-p-4">
                            <p className="tw-text-lg">แฮชเเท็กที่ถูกใช้งานมากที่สุด</p>
                            <div className="tw-flex tw-flex-col tw-w-full tw-h-full tw-justify-around tw-items-center tw-self-center tw-gap-4">
                                <p className="tw-text-6xl tw-font-bold tw-text-blue-400">xxxxxx{ }</p>
                                <p className="tw-text-6xl tw-font-bold tw-text-blue-400">xxxxxx{ }</p>
                                <p className="tw-text-6xl tw-font-bold tw-text-blue-400">xxxxxx{ }</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classNames("tw-flex tw-flex-row tw-justify-around tw-gap-4 tw-my-2", {
                    "tw-flex-col": isTabletOrMobile,
                })}>
                    <div className={classNames("tw-flex tw-flex-col tw-h-full tw-text-center tw-gap-y-6 tw-border-white tw-shadow-xl tw-border-4 tw-rounded-lg tw-p-4", {
                        "tw-w-full": isTabletOrMobile,
                        "tw-w-1/2": !isTabletOrMobile,
                    })}>
                        <p className="tw-text-lg">กลุ่มคำ</p>
                        <div className="tw-h-full">
                            <img className="tw-object-cover tw-h-full tw-w-full" src={carouselPic} />
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
                                    <img className="tw-rounded-full tw-h-12 tw-w-12" src={profile} />
                                </div>
                                <div className="tw-flex tw-flex-col">
                                    <p className="tw-text-2xl">ชื่อผู้โพสต์</p>
                                    <p className="tw-text-lg tw-font-thin">dd.mm.yy</p>
                                </div>
                            </div>
                            <div className="tw-text-lg">
                                <ReadMoreReact
                                    text={testText}
                                    min={80}
                                    ideal={100}
                                    max={200}
                                    readMoreText={readMore}
                                />
                                <div>
                                    <img src={carouselPic} />
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

export default Dashboard;