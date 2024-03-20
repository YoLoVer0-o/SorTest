import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SearchBar, VerticalBarChart, DoughnutChart, Loading } from "../../utilities";
import { dashboardMock } from "../../mock";
import { useResponsive } from "../../hooks";
import { Button, Tooltip } from "antd";
import { FilePdfOutlined, SendOutlined } from "@ant-design/icons";
import classNames from "classnames";
import ChartDataLabels from 'chartjs-plugin-datalabels';
// import ReadMoreReact from 'read-more-react';
import ClampLines from "react-clamp-line";
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

const SubDashboard = () => {

  // const [searchTag, setSearchTag] = useState([]);

  const [searchDate, setSearchDate] = useState([dayjs().subtract(14, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')]);

  const { isTabletOrMobile, isTablet, isMobile, isPortrait, isLandscape } = useResponsive();

  const [dailyPosts, setDailyPosts] = useState([]);

  const [dailySentiment, setDailySentiment] = useState([]);

  const [dailyWordCloud, setDailyWordCloud] = useState("");

  const [dailyHashTag, setDailyHashTag] = useState({});

  const [postImage, setPostImage] = useState([]);

  const [dailyStat, setDailyStat] = useState({});

  const [dailyMaxEngagement, setDailyMaxEngagement] = useState({});

  const [showLoading, setShowLoading] = useState(false);

  const token = useSelector((state) => getLogin(state).token);

  const param = useParams();

  const displayTopic = () => {

    if (param.topic == "Army") {
      return "กองทัพ"
    }
    else if (param.topic == "Government") {
      return "รัฐบาล"
    }
    else if (param.topic == "Rally") {
      return "ชุมนุม"
    }
    else if (param.topic == "Royal") {
      return "สถาบัน"
    }
  };


  const fetchPost = async (start, end) => {
    try {
      // setShowLoading(true);
      const data = await dashBoardAPI.getTopicDailyPost(start, end, param.topic.toLowerCase());
      setDailyPosts(data);
    } catch (error) {
      console.error('Error fetching bot config:', error);
    }
    // finally {
    //   setShowLoading(false);
    // }
  }

  const fetchSentiment = async (start, end) => {
    try {
      // setShowLoading(true);
      const data = await dashBoardAPI.getTopicSentiment(start, end, param.topic.toLowerCase());
      setDailySentiment(data);
    } catch (error) {
      console.error('Error fetching bot config:', error);
    }
    // finally {
    //   setShowLoading(false);
    // }
  }

  const fetchWordCloud = async (start, end) => {
    try {
      // setShowLoading(true);
      const data = await dashBoardAPI.getWordCloud(start, end, param.topic.toLowerCase());
      const blob = new Blob([data], { type: 'image/png' });
      const url = URL.createObjectURL(blob);
      setDailyWordCloud(url);
    } catch (error) {
      console.error('Error fetching bot config:', error);
    }
    // finally {
    //   setShowLoading(false);
    // }
  }

  const fetchStat = async (start, end) => {
    try {
      // setShowLoading(true);
      const payload = {
        date: [
          start,
          end
        ],
        topic: displayTopic()
      }
      const data = await dashBoardAPI.getStat(payload);
      setDailyStat(data);
    } catch (error) {
      console.error('Error fetching bot config:', error);
    }
    // finally {
    //   setShowLoading(false);
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
    //   setShowLoading(false);
    // }
  }

  const fetchMaxEngagement = async (start, end) => {
    try {
      // setShowLoading(true);
      const payload = {
        platform: "facebook",
        topic: [displayTopic()],
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
    } finally {
      // setShowLoading(false);
    }
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
    //   setShowLoading(false);
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
        fetchMaxEngagement(searchDate[0], searchDate[1]),
        fetchHashTag(searchDate[0], searchDate[1])
      ]).then(() => {
        setShowLoading(false);
      }).catch((error) => {
        console.error('Error during fetch:', error);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDate, param])


  ///////////////////////////////////WordClouds logic///////////////////////////////////////////////////////////////////////


  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dashboardData = dashboardMock.filter(data => data.topic == (param.topic))[0];

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
        backgroundColor: dailyPosts.map(item => colorSet(item.name)),
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



  return (
    <div className={classNames('tw-flex tw-flex-col tw-w-full tw-max-w-full tw-max-h-full tw-overflow-auto', {})}>
      <Loading isShown={showLoading} />
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
              <div className={classNames("tw-flex tw-justify-center tw-h-full tw-w-full", {
              })}>
                {dailySentiment.length > 0 && dailySentiment.some((Sentiment) => Sentiment.value > 0) &&
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
                }
                {dailySentiment.length == 0 || dailySentiment.every((Sentiment) => Sentiment.value == 0) && <div className="tw-w-full tw-h-full">
                  <p className="tw-text-xl tw-font-bold">ไม่พบข้อมูล</p>
                </div>
                }
              </div>
            </div>
          </div>
          <div className={classNames("tw-flex tw-flex-col tw-gap-4 tw-h-[46rem]", {
            "tw-w-full": isTabletOrMobile || isTablet,
            "tw-w-1/3": !isTabletOrMobile && !isTablet,
          })}>
            <div className="tw-flex tw-flex-col tw-h-full tw-text-center tw-gap-y-6 tw-border-white tw-shadow-xl tw-border-4 tw-rounded-lg tw-p-4">
              <p className="tw-text-lg">แฮชเเท็กที่ถูกใช้งานมากที่สุด</p>
              <div className="tw-grid tw-grid-cols-2 tw-w-full tw-h-full tw-justify-around tw-items-center tw-self-center tw-gap-2">
                {dailyHashTag?.trending?.length > 0 && dailyHashTag?.trending.map((hashtag, i) =>
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
          <div className={classNames("tw-flex tw-flex-col tw-h-full tw-object-contain tw-gap-y-6 tw-border-white tw-shadow-xl tw-border-4 tw-rounded-lg tw-p-4", {
            "tw-w-full": isTabletOrMobile,
            "tw-w-1/2": !isTabletOrMobile,
          })}>
            <p className="tw-text-lg tw-text-center">โพสต์ที่มีส่วนร่วมสูงสด</p>
            {dailyMaxEngagement &&
              <div>
                <div className="tw-flex tw-flex-row tw-justify-between">
                  <div className="tw-flex tw-flex-row tw-gap-2">
                    <div className="tw-w-max tw-h-max tw-border-2 tw-border-black tw-rounded-full">
                      <img className="tw-rounded-full tw-h-10 tw-w-10" src={dashboardData.profile} />
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
    </div>
  );
}

export default SubDashboard;