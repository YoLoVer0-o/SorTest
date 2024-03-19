import { useState, useEffect } from "react";
import { SearchBar, VerticalBarChart, HorizontalBarChart, DoughnutChart, Loading } from "../../utilities";
import { useResponsive } from "../../hooks";
import { Button, Tooltip } from "antd";
import { FilePdfOutlined, SendOutlined } from "@ant-design/icons";
import classNames from "classnames";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import ClampLines from "react-clamp-line";
import overallP from "../../assets/PostPic/overallP.jpg";
import SocialIcons from "../../assets/SocialIcons";
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore)
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrAfter)
import dashBoardAPI from "../../service/dashBoardAPI";
import { useSelector } from 'react-redux'
import { getLogin } from '../../libs/loginSlice'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const Dashboard = () => {

    // const [searchTag, setSearchTag] = useState([]);

    const [searchDate, setSearchDate] = useState([dayjs().subtract(14, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')]);

    const [dailyPosts, setDailyPosts] = useState([]);

    const [dailySentiment, setDailySentiment] = useState([]);

    const [postImage, setPostImage] = useState([]);

    const [dailyStat, setDailyStat] = useState({});

    const [dailyHashTag, setDailyHashTag] = useState({});

    const [dailyMaxEngagement, setDailyMaxEngagement] = useState({});

    const [dailyWordCloud, setDailyWordCloud] = useState("");

    const [dailySocial, setDailySocial] = useState([]);

    const [showLoading, setShowLoading] = useState(false);

    const token = useSelector((state) => getLogin(state).token);

    const fetchPost = async (start, end) => {
        try {
            // setShowLoading(true);
            const data = await dashBoardAPI.getAllDailyPost(start, end);
            setDailyPosts(data);
        } catch (error) {
            console.error('Error fetching bot config:', error);
        }
        // finally {
        //     setShowLoading(false);
        // }
    }

    const fetchSentiment = async (start, end) => {
        try {
            // setShowLoading(true);
            const data = await dashBoardAPI.getAllSentiment(start, end);
            setDailySentiment(data);
        } catch (error) {
            console.error('Error fetching bot config:', error);
        }
        // finally {
        //     setShowLoading(false);
        // }
    }

    const fetchStat = async (start, end) => {
        try {
            // setShowLoading(true);
            const payload = {
                date: [
                    start,
                    end
                ]
            }
            const data = await dashBoardAPI.getStat(payload);
            setDailyStat(data);
        } catch (error) {
            console.error('Error fetching bot config:', error);
        }
        // finally {
        //     setShowLoading(false);
        // }
    }

    const fetchHashTag = async (start, end) => {
        try {
            // setShowLoading(true);
            const payload = {
                date: [
                    start,
                    end
                ]
            }
            const data = await dashBoardAPI.getHashTag(payload);
            setDailyHashTag(data);
        } catch (error) {
            console.error('Error fetching bot config:', error);
        }
        // finally {
        //     setShowLoading(false);
        // }
    }

    const fetchSocial = async (start, end) => {
        try {
            // setShowLoading(true);
            const payload = {
                date: [
                    start,
                    end
                ]
            }
            const data = await dashBoardAPI.getSocial(payload);
            setDailySocial(Object.entries(data).map(([key, value]) => ({ key, value })).sort((a, b) => b.value - a.value));
        } catch (error) {
            console.error('Error fetching bot config:', error);
        }
        // finally {
        //     setShowLoading(false);
        // }
    }

    const fetchWordCloud = async (start, end) => {
        try {
            // setShowLoading(true);
            const data = await dashBoardAPI.getWordCloud(start, end, "overall");
            const blob = new Blob([data], { type: 'image/png' });
            const url = URL.createObjectURL(blob);
            setDailyWordCloud(url);
        } catch (error) {
            console.error('Error fetching bot config:', error);
        }
        // finally {
        //     setShowLoading(false);
        // }
    }

    const fetchMaxEngagement = async (start, end) => {
        try {
            // setShowLoading(true);
            const payload = {
                platform: "facebook",
                date: [
                    start,
                    end
                ]
            }
            const data = await dashBoardAPI.getMaxEngagement(payload);
            setDailyMaxEngagement(data[0]);
            if (data[0]?.pictures) {
                fetchPostImage({ id: data[0].pictures })
            }
        } catch (error) {
            console.error('Error fetching bot config:', error);
        }
        // finally {
        //     setShowLoading(false);
        // }
    }

    const fetchPostImage = async (id) => {
        try {
            // setShowLoading(true);
            const data = await dashBoardAPI.getPostImage(id);
            setPostImage(data);
        } catch (error) {
            console.error('Error fetching bot config:', error);
        }
        // finally {
        //     setShowLoading(false);
        // }
    }



    useEffect(() => {
        if (searchDate?.length > 0) {
            setShowLoading(true);
            Promise.all([
                fetchPost(searchDate[0], searchDate[1]),
                fetchSentiment(searchDate[0], searchDate[1]),
                fetchWordCloud(searchDate[0], searchDate[1]),
                fetchStat(searchDate[0], searchDate[1]),
                fetchHashTag(searchDate[0], searchDate[1]),
                fetchSocial(searchDate[0], searchDate[1]),
                fetchMaxEngagement(searchDate[0], searchDate[1])
            ]).then(() => {
                setShowLoading(false);
            }).catch((error) => {
                console.error('Error during fetch:', error);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchDate])

    // useEffect(() => {
    //     console.log(dailyMaxEngagement);
    //     if (dailyMaxEngagement?.pictures) {
    //         fetchPostImage(dailyMaxEngagement.pictures)
    //     }
    // }, [dailyMaxEngagement])

    const { isTabletOrMobile, isTablet, isMobile, isPortrait, isLandscape } = useResponsive();

    ///////////////////////////////////icons render logic///////////////////////////////////////////////////////////////////////
    const { facebook, instagram, twitter, tiktok, youtube, social_media } = SocialIcons;
    const sentIcons = (value) => {
        if (value == "facebook") {
            return facebook
        }
        else if (value == "instagram") {
            return instagram
        }
        else if (value == "X") {
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
        else if (value == "X") {
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

    //////////////////////////////////////////postBar////////////////////////////////////////////////////////////////
    const postBarData = {
        labels: dailyPosts.map(item => item.name),
        datasets: [
            {
                label: 'จำนวนโพสต์',
                data: dailyPosts.map(item => item.value),
                backgroundColor: dailyPosts.map(item => colorSet(item.commentType)),
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
        labels: dailySentiment.map(item => item.commentType),
        datasets: [
            {
                label: 'จำนวนความคิดเห็น',
                data: dailySentiment.map(item => item.value),
                backgroundColor: dailySentiment.map(item => colorSet(item.commentType)),
                borderColor: dailySentiment.map(item => colorSet(item.commentType)),
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
        labels: dailySocial?.map(item => item.key),
        datasets: [
            {
                label: 'จำนวนความเคลื่อนไหว',
                data: dailySocial?.map(item => item.value),
                borderColor: dailySocial?.map(item => socialBarColor(item.key)),
                backgroundColor: dailySocial?.map(item => socialBarColor(item.key)),
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

    useEffect(() => {
        console.log(searchDate);
    }, [searchDate])


    return (
        <div className={classNames('tw-flex tw-flex-col tw-w-full tw-max-w-full tw-max-h-full tw-overflow-auto', {})}>
            <Loading isShown={showLoading} />
            <p className="tw-self-center tw-font-bold tw-text-xl tw-my-4">DashBoard</p>
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
                {/* <Tooltip placement="top" title={"สร้างรายงานPDF"} color="blue">
                    <Button className="tw-h-max tw-flex tw-flex-row tw-self-end tw-m-3 tw-bg-white tw-border-2 tw-border-blue-300">
                        <FilePdfOutlined />
                        <p>สร้างรายงานPDF</p>
                    </Button>
                </Tooltip> */}
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
                            <p className="tw-text-6xl tw-font-bold tw-text-blue-400">{dailyStat?.post}</p>
                        </div>
                        <div className="tw-text-center tw-gap-y-6 tw-border-white tw-shadow-xl tw-border-4 tw-rounded-lg tw-p-4">
                            <p className="tw-text-lg">การมีส่วนร่วมทั้งหมด</p>
                            <p className="tw-text-6xl tw-font-bold tw-text-blue-400">{dailyStat?.engagement}</p>
                        </div>
                        <div className="tw-flex tw-flex-col tw-h-full tw-w-full tw-text-center tw-gap-y-6 tw-border-white tw-shadow-xl tw-border-4 tw-rounded-lg tw-p-4">
                            <p className="tw-text-center tw-text-lg">จำนวนโพสต์รายวัน</p>
                            {dailyPosts.length > 0 && dailyPosts.some((post) => post.value > 0) &&
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
                            }
                            {dailyPosts.length == 0 || dailyPosts.every((post) => post.value == 0) && <div className="tw-w-full tw-h-full">
                                <p className="tw-text-xl tw-font-bold">ไม่พบข้อมูล</p>
                            </div>
                            }
                        </div>
                    </div>
                    <div className={classNames("tw-flex tw-flex-col tw-gap-4", {
                        "tw-w-full": isTabletOrMobile || isTablet,
                        "tw-w-1/3": !isTabletOrMobile && !isTablet,
                    })}>
                        <div className="tw-text-center tw-gap-y-6 tw-border-white tw-shadow-xl tw-border-4 tw-rounded-lg tw-p-4">
                            <p className="tw-text-lg">จำนวนผู้ใช้งาน</p>
                            <p className="tw-text-6xl tw-font-bold tw-text-blue-400">{dailyStat?.user}</p>
                        </div>
                        <div className="tw-text-center tw-gap-y-6 tw-border-white tw-shadow-xl tw-border-4 tw-rounded-lg tw-p-4">
                            <p className="tw-text-lg">การมีส่วนร่วมเฉลี่ย/โพสต์</p>
                            <p className="tw-text-6xl tw-font-bold tw-text-blue-400">{dailyStat?.engagementperpost}</p>
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
                            {dailySentiment.length > 0 && dailySentiment.some((post) => post.value > 0) &&
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
                            }
                            {dailySentiment.length == 0 || dailySentiment.every((Sentiment) => Sentiment.value == 0) && <div className="tw-w-full tw-h-full">
                                <p className="tw-text-xl tw-font-bold">ไม่พบข้อมูล</p>
                            </div>
                            }
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
                            <div className="tw-grid tw-grid-cols-2 tw-w-full tw-h-full tw-justify-around tw-items-center tw-self-center tw-gap-2">
                                {dailyHashTag?.trending?.length > 0 && dailyHashTag?.trending?.map((hashtag, i) =>
                                    <p key={i} className="tw-text-md tw-font-bold tw-text-blue-400">{hashtag.hashtag}</p>
                                )}
                            </div>
                            {dailyHashTag?.trending?.length < 1 && <div className="tw-w-full tw-h-full tw-items-center">
                                <p className="tw-text-xl tw-font-bold">ไม่พบข้อมูล</p>
                            </div>
                            }
                        </div>
                    </div>
                </div>
                <div className={classNames("tw-flex tw-flex-row tw-justify-around tw-h-full tw-gap-4 tw-my-2", {
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
                            {dailyWordCloud && (
                                <img className="tw-object-fill tw-h-full tw-w-full"
                                    src={dailyWordCloud}
                                />
                            )}
                            {!dailyWordCloud && <div className="tw-w-full tw-h-full">
                                <p className="tw-text-xl tw-font-bold">ไม่พบข้อมูล</p>
                            </div>
                            }
                        </div>
                    </div>
                    <div className={classNames("tw-flex tw-flex-col tw-h-fit tw-object-contain tw-gap-y-6 tw-border-white tw-shadow-xl tw-border-4 tw-rounded-lg tw-p-4", {
                        "tw-w-full": isTabletOrMobile,
                        "tw-w-1/2": !isTabletOrMobile,
                    })}>
                        <p className="tw-text-lg tw-text-center">โพสต์ที่มีส่วนร่วมสูงสด</p>
                        {dailyMaxEngagement &&
                            <div>
                                <div className="tw-flex tw-flex-row tw-justify-between">
                                    <div className="tw-flex tw-flex-row tw-gap-2">
                                        <div className="tw-w-max tw-h-max tw-border-2 tw-border-black tw-rounded-full">
                                            <img className="tw-rounded-full tw-h-10 tw-w-10" src={overallP} />
                                        </div>
                                        <div className="tw-flex tw-flex-col">
                                            <p className="tw-text-xl">{dailyMaxEngagement?.poster_name}</p>
                                            <p className="tw-text-lg tw-font-thin">{dailyMaxEngagement?.postime} </p>
                                        </div>
                                    </div>
                                    <a className="tw-w-fit tw-mx-4 tw-text-lg" target="blank"
                                        href={dailyMaxEngagement?.post_url} >
                                        <SendOutlined />ไปที่โพสต์
                                    </a>
                                </div>
                                <div className="tw-text-lg">
                                    {dailyMaxEngagement?.post &&
                                        <ClampLines
                                            text={dailyMaxEngagement?.post ? dailyMaxEngagement?.post : ""}
                                            id='really-unique-id'
                                            type='html'
                                            lines={1}
                                            ellipsis='...'
                                            moreText={<p className="tw-text-blue-500">เพิ่มเติม</p>}
                                            lessText={<p className="tw-text-blue-500">น้อยลง</p>}
                                        />
                                    }
                                    <div className={classNames("tw-flex tw-justify-center tw-h-96", {
                                    })}>
                                        {postImage.length > 0 &&
                                            <Carousel
                                                className="tw-h-fit tw-w-fit"
                                                showThumbs={false}
                                            >
                                                {postImage.map((image, i) =>
                                                    <img key={i} className="tw-object-scale-down" src={image} />
                                                )}
                                            </Carousel>
                                        }
                                    </div>
                                </div>
                                {dailyMaxEngagement?.reactions && dailyMaxEngagement?.reactions?.length > 0 &&
                                    <div className="tw-flex tw-flex-row tw-min-w-full tw-justify-between">
                                        <p className="tw-flex tw-text-lg tw-self-start tw-w-max">{dailyMaxEngagement?.reactions[0].reaction_stat.ถูกใจ} likes</p>
                                        <div className="tw-flex tw-flex-row tw-gap-2 tw-w-max tw-text-lg tw-self-end">
                                            <p> {dailyMaxEngagement?.reactions[0].comment_stat} comments</p>
                                            <p> {dailyMaxEngagement?.reactions[0].share_stat} shares</p>
                                        </div>
                                    </div>
                                }
                            </div>
                        }
                        {!dailyMaxEngagement && <div className="tw-w-full tw-h-full tw-text-center">
                            <p className="tw-text-xl tw-font-bold">ไม่พบข้อมูล</p>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Dashboard;