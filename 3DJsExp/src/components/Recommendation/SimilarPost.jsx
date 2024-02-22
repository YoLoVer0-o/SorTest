import { useState, useEffect } from "react";
import { DataTable, Loading } from "../../utilities";
import { useResponsive } from "../../hooks";
import classNames from "classnames";
import { Button, Input, Tooltip } from 'antd';
import { recmock } from "../../mock";
import recommendAPI from "../../service/recommendAPI";
import { useSelector } from 'react-redux'
import { getLogin } from '../../libs/loginSlice'

const SimilarPost = () => {

  const [displayData, setDisplayData] = useState([]);
  const [postText, setPostText] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  const {
    isTabletOrMobile,
    isPortrait,
  } = useResponsive();

  const { TextArea } = Input;

  const token = useSelector((state) => getLogin(state).token);

  const fetchRecommend = async () => {
    try {
      setShowLoading(true);
      const data = await recommendAPI.recommend({ query: postText, top: 10 });
      setDisplayData(data);
    } catch (error) {
      console.error('Error fetching bot config:', error);
    } finally {
      setShowLoading(false);
    }
  }

  useEffect(() => {
    console.log(displayData);
  }, [displayData])

  ////////////////////////////////////////////////table//////////////////////////////////////////////////////////
  ///////////////////////////////////////////table///////////////////////////////////////////////////////////////
  const columns = [
    {
      title: 'update',
      dataIndex: 'post_collect_time',
      key: 'post_collect_time',
      align: "center",
      width: 150,
      className: 'tw-text-lime-600',
    },
    {
      title: 'platform',
      dataIndex: 'platform',
      key: 'platform',
      align: "center",
      width: 150,
      className: 'tw-truncate',
    },
    {
      title: 'group',
      dataIndex: 'group',
      key: 'group',
      align: "center",
      width: 150,
      className: 'tw-text-amber-600',
      render: (text, record) => (
        <div className="tw-flex tw-flex-row tw-gap-1 tw-justify-center">
          {/* {record?.group.map(group => ( */}
          <Tooltip key={record?.group} title={record?.group}>
            <div className="tw-rounded-md tw-border-2 tw-p-2 tw-border-black tw-w-max tw-text-center tw-text-white tw-bg-yellow-600" >
              {record?.group}
            </div>
          </Tooltip>
          {/* ))} */}
        </div>

        // <div className="tw-flex tw-flex-row tw-gap-1 tw-justify-center">
        //   {record?.group.map(group => (
        //     <Tooltip key={group} title={group}>
        //       <div className="tw-rounded-md tw-border-2 tw-p-2 tw-border-black tw-w-max tw-text-center tw-text-white tw-bg-yellow-600" >
        //         {group}
        //       </div>
        //     </Tooltip>
        //   ))}
        // </div>

      ),
    },
    {
      title: 'creator',
      dataIndex: 'post_author_name',
      key: 'post_author_name',
      align: "center",
      width: 150,
      className: 'tw-text-amber-600',
    },
    {
      title: 'post',
      dataIndex: 'post_content',
      key: 'post_content',
      align: "center",
      width: 150,
      className: 'tw-truncate',
    },
    {
      title: 'sentimentType',
      dataIndex: 'post_comment_sentiment',
      key: 'post_comment_sentiment',
      align: "center",
      width: 150,
      className: 'tw-text-violet-600',
      render: (text, record) => (
        <div className="tw-flex tw-flex-row tw-gap-1 tw-justify-center">
          <Tooltip title={record?.post_comment_sentiment}>
            <div className={
              classNames("tw-rounded-md tw-border-2 tw-border-black tw-w-max tw-text-center tw-text-white tw-p-2", {
                "tw-bg-green-600": record?.post_comment_sentiment == "positive",
                "tw-bg-red-600": record?.post_comment_sentiment == "negative",
                "tw-bg-sky-600": record?.post_comment_sentiment == "neutral",
              })} >
              {record?.post_comment_sentiment}
            </div>
          </Tooltip>
        </div>
      ),
    },
    {
      title: 'engagement',
      dataIndex: 'post_engagement',
      key: 'post_engagement',
      align: "center",
      width: 150,
      className: 'tw-truncate',
    },
    {
      title: 'link',
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
        className={classNames("tw-flex tw-flex-col tw-border-2 tw-gap-4 tw-p-6 tw-my-4 ", {
          "tw-overflow-auto": isTabletOrMobile && isPortrait,
        })} >
        <p className="tw-text-lg">เนื้อหาที่จะโพสต์:</p>
        <TextArea rows={4} onChange={(e) => setPostText(e.target.value)} value={postText} />
        <div className="tw-flex tw-flex-row tw-w-full tw-justify-center tw-gap-6">
          <Button className="tw-h-full tw-w-fit tw-border-2 tw-border-blue-400 tw-text-blue-400" onClick={() => setPostText("")} >ล้าง</Button>
          <Button className="tw-h-full tw-w-fit tw-border-2 tw-border-blue-400 tw-text-white tw-bg-blue-400"
            onClick={() => fetchRecommend()}
          >ตรวจสอบ</Button>
        </div>
      </div>

      <div className={classNames("", {
        "tw-overflow-auto": isTabletOrMobile && isPortrait,
      })}>
        <DataTable
          data={displayData}
          columns={columns}
          keyName={"post_time"}
        />
      </div>
    </div>
  );
};

export default SimilarPost;
