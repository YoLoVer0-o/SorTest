import { useState, useEffect } from "react";
import { DataTable, Loading } from "../../utilities";
import { useResponsive } from "../../hooks";
import classNames from "classnames";
import { Tooltip } from 'antd';
import recommendAPI from "../../service/recommendAPI";
import { useSelector } from 'react-redux'
import { getLogin } from '../../libs/loginSlice'
import dayjs from 'dayjs';

const Trending = () => {

  const [displayData, setDisplayData] = useState([]);
  const [dailyWordCloud, setDailyWordCloud] = useState("");
  const [showLoading, setShowLoading] = useState(false);
  const [dailyHashTag, setDailyHashTag] = useState({});


  const {
    isTabletOrMobile,
    isMobile,
    isLandscape,
    isPortrait,
  } = useResponsive();

  const token = useSelector((state) => getLogin(state).token);

  const fetchWordCloud = async () => {
    try {
      // setShowLoading(true);
      const data = await recommendAPI.getWordCloud(dayjs().format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD'), "overall");
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

  const fetchHashTag = async () => {
    try {
      // setShowLoading(true);
      const data = await recommendAPI.getHashTag();
      setDailyHashTag(data);
    } catch (error) {
      console.error('Error fetching bot config:', error);
    }
    // finally {
    //     setShowLoading(false);
    // }
  }

  const fetchEngagement = async () => {
    try {
      setShowLoading(true);
      const data = await recommendAPI.engagement(10);
      setDisplayData(data);
    } catch (error) {
      console.error('Error fetching bot config:', error);
    } finally {
      setShowLoading(false);
    }
  }

  useEffect(() => {
    fetchEngagement();
    fetchWordCloud();
    fetchHashTag();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  ///////////////////////////////////////////table///////////////////////////////////////////////////////////////
  const columns = [
    {
      title: 'วันที่โพสต์',
      dataIndex: 'post_collect_time',
      key: 'post_collect_time',
      align: "center",
      width: 150,
      className: 'tw-text-lime-600',
    },
    // {
    //   title: 'platform',
    //   dataIndex: 'platform',
    //   key: 'platform',
    //   align: "center",
    //   width: 150,
    //   className: 'tw-truncate',
    // },
    // {
    //   title: 'group',
    //   dataIndex: 'group',
    //   key: 'group',
    //   align: "center",
    //   width: 150,
    //   className: 'tw-text-amber-600',
    //   render: (text, record) => (
    //     <div className="tw-flex tw-flex-row tw-gap-1 tw-justify-center">
    //       {/* {record?.group.map(group => ( */}
    //       <Tooltip key={record?.group} title={record?.group}>
    //         <div className="tw-rounded-md tw-border-2 tw-p-2 tw-border-black tw-w-max tw-text-center tw-text-white tw-bg-yellow-600" >
    //           {record?.group}
    //         </div>
    //       </Tooltip>
    //       {/* ))} */}
    //     </div>
    //   ),
    // },
    {
      title: 'ผู้โพสต์',
      dataIndex: 'post_author_name',
      key: 'post_author_name',
      align: "center",
      width: 150,
      className: 'tw-text-amber-600',
    },
    {
      title: 'รายละเอียด',
      dataIndex: 'post_content',
      key: 'post_content',
      align: "center",
      width: 150,
      className: 'tw-truncate',
    },
    {
      title: 'Hashtags',
      dataIndex: 'post_hashtags',
      key: 'post_hashtags',
      align: "center",
      width: 150,
      className: 'tw-text-amber-600',
      render: (text, record) => (
        <div className="tw-grid tw-grid-cols-2 tw-gap-1 tw-w-full tw-h-full tw-content-start">
            {record?.post_hashtags.map((hashtags, i) => (
                <Tooltip key={i} title={hashtags}>
                    <div
                        className="tw-rounded-md tw-p-2 tw-border-2 tw-border-black tw-w-full tw-text-center tw-text-white tw-bg-violet-600 tw-truncate"
                    >
                        {hashtags}
                    </div>
                </Tooltip>
            ))}
        </div>
    ),
    },
    {
      title: 'การมีส่วนร่วม',
      dataIndex: 'post_engagement',
      key: 'post_engagement',
      align: "center",
      width: 150,
      className: 'tw-truncate',
    },
    {
      title: 'หมวดหมู่',
      dataIndex: 'post_class',
      key: 'post_class',
      align: "center",
      width: 100,
      className: 'tw-text-amber-600',
      render: (text, record) => (
        <div className="tw-flex tw-flex-row tw-gap-1 tw-justify-center">
          {record?.post_class.map((post, i) => (
            <Tooltip key={i} title={post}>
              <div className="tw-rounded-md tw-border-2 tw-p-2 tw-border-black tw-w-full tw-text-center tw-text-white tw-bg-blue-600 tw-truncate" >
                {post}
              </div>
            </Tooltip>
          ))}
        </div>
      ),
    },
    {
      title: 'ความรู้สึก',
      dataIndex: 'post_sentiment',
      key: 'post_sentiment',
      align: "center",
      width: 150,
      className: 'tw-text-violet-600',
      render: (text, record) => (
        <div className="tw-flex tw-flex-row tw-gap-1 tw-justify-center">
          <Tooltip title={record?.post_sentiment}>
            <div className={
              classNames("tw-rounded-md tw-border-2 tw-border-black tw-w-max tw-text-center tw-text-white tw-p-2", {
                "tw-bg-green-600": record?.post_sentiment == "positive",
                "tw-bg-red-600": record?.post_sentiment == "negative",
                "tw-bg-sky-600": record?.post_sentiment == "neutral",
              })} >
              {record?.post_sentiment}
            </div>
          </Tooltip>
        </div>
      ),
    },
    {
      title: 'Link',
      dataIndex: 'post_url',
      key: 'post_url',
      align: "center",
      width: 150,
      className: 'tw-truncate tw-text-sky-700',
      render: (text, record) => (
        <div className="tw-flex tw-justify-center">
          <Tooltip title="กดเพื่อไปที่โพสต์">
            <a href={record?.post_url} target="blank">
              <div className="tw-rounded-md tw-w-full tw-border-2 tw-border-black tw-text-center tw-text-white tw-bg-sky-600" >
                <p className="tw-m-2">Link</p>
              </div>
            </a>
          </Tooltip>
        </div>
      ),
    },
  ];
  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="tw-w-screen tw-h-full tw-p-2 tw-overflow-auto">
      <Loading isShown={showLoading} />
      <div
        className={classNames("tw-flex tw-flex-row tw-border-2 tw-gap-4 tw-p-6 tw-my-4 ", {
          // "tw-overflow-auto": isTabletOrMobile && isPortrait,
          "tw-flex-col": isTabletOrMobile,
          "tw-h-4/5": !isMobile,
        })} >
        <div className={classNames("tw-flex tw-flex-col tw-text-center tw-gap-y-6 tw-border-white tw-shadow-xl tw-border-4 tw-rounded-lg tw-p-2", {
          "tw-w-full": isTabletOrMobile,
          "tw-w-1/2": !isTabletOrMobile,
        })}>
          <p className="tw-text-lg">กลุ่มคำ</p>
          <div className={classNames("tw-w-fit", {
            "tw-h-fit": isMobile && isPortrait,
            "tw-h-full": !isMobile || (isMobile && isLandscape),
          })}>
            {dailyWordCloud && (
              <img className="tw-h-full tw-object-contain"
                src={dailyWordCloud}
              />
            )}
            {!dailyWordCloud && <div className="tw-w-full tw-h-full">
              <p className="tw-text-xl tw-font-bold">ไม่พบข้อมูล</p>
            </div>
            }
          </div>
        </div>
        <div
          className={classNames("tw-flex tw-flex-col tw-text-center tw-gap-y-6 tw-border-white tw-shadow-xl tw-border-4 tw-rounded-lg tw-p-4",
            {
              "tw-w-full tw-h-1/2": isMobile && isPortrait,
              "tw-w-1/2 tw-h-full": !isMobile,
            })}>
          <p className="tw-text-lg">แฮชเเท็กที่ถูกใช้งานมากที่สุด</p>
          <div className={classNames("tw-grid tw-h-full tw-w-full tw-justify-around tw-items-center tw-self-center tw-overflow-auto tw-gap-2", {
            "tw-grid-cols-2": isMobile && isPortrait,
            "tw-grid-cols-3": !isMobile || (isMobile && isLandscape),
          })}>
            {dailyHashTag?.hashtag?.length > 0 && dailyHashTag.hashtag.map((hashtag, i) =>
              <p key={i} className="tw-text-lg tw-w-full tw-h-full tw-font-bold tw-text-blue-400">{hashtag}</p>
            )}
          </div>
          {dailyHashTag?.length < 1 && <div className="tw-w-full tw-h-full tw-items-center">
            <p className="tw-text-xl tw-font-bold">ไม่พบข้อมูล</p>
          </div>
          }
        </div>
      </div>

      <div className={classNames("tw-h-full", {
        "tw-overflow-auto": isTabletOrMobile && isPortrait,
      })}>
        <DataTable
          data={displayData}
          columns={columns}
          keyName={"post_id"}
        />
      </div>
    </div>
  );
};

export default Trending;
