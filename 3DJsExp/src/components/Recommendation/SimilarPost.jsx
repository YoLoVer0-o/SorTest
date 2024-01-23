import { DataTable } from "../../utilities";
import { useResponsive } from "../../hooks";
import classNames from "classnames";
import { Button, Input, Tooltip } from 'antd';
import { recmock } from "../../mock";

const SimilarPost = () => {

  const {
    isTabletOrMobile,
    isPortrait,
  } = useResponsive();

  const { TextArea } = Input;

  ////////////////////////////////////////////////table//////////////////////////////////////////////////////////
  ///////////////////////////////////////////table///////////////////////////////////////////////////////////////
  const columns = [
    {
      title: 'update',
      dataIndex: 'update',
      key: 'update',
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
          {record?.group.map(group => (
            <Tooltip key={group} title={group}>
              <div className="tw-rounded-md tw-border-2 tw-p-2 tw-border-black tw-w-max tw-text-center tw-text-white tw-bg-yellow-600" >
                {group}
              </div>
            </Tooltip>
          ))}
        </div>
      ),
    },
    {
      title: 'creator',
      dataIndex: 'creator',
      key: 'creator',
      align: "center",
      width: 150,
      className: 'tw-text-amber-600',
    },
    {
      title: 'post',
      dataIndex: 'post',
      key: 'post',
      align: "center",
      width: 150,
      className: 'tw-truncate',
    },
    {
      title: 'sentimentType',
      dataIndex: 'sentimentType',
      key: 'sentimentType',
      align: "center",
      width: 150,
      className: 'tw-text-violet-600',
      render: (text, record) => (
        <div className="tw-flex tw-flex-row tw-gap-1 tw-justify-center">
          <Tooltip title={record?.sentimentType}>
            <div className={
              classNames("tw-rounded-md tw-border-2 tw-border-black tw-w-max tw-text-center tw-text-white tw-p-2", {
                "tw-bg-green-600": record?.sentimentType == "positive",
                "tw-bg-red-600": record?.sentimentType == "negative",
                "tw-bg-sky-600": record?.sentimentType == "neutral",
              })} >
              {record?.sentimentType}
            </div>
          </Tooltip>
        </div>
      ),
    },
    {
      title: 'link',
      dataIndex: 'link',
      key: 'link',
      align: "center",
      width: 150,
      className: 'tw-truncate tw-text-sky-700',
      render: (text, record) => (
        <div className="tw-flex tw-justify-center">
          <Tooltip title="กดเพื่อไปที่โพสต์">
            <a href={record?.link} target="blank">
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
      <div
        className={classNames("tw-flex tw-flex-col tw-border-2 tw-gap-4 tw-p-6 tw-my-4 ", {
          "tw-overflow-auto": isTabletOrMobile && isPortrait,
        })} >
        <p className="tw-text-lg">เนื้อหาที่จะโพสต์:</p>
        <TextArea rows={4} />
        <div className="tw-flex tw-flex-row tw-w-full tw-justify-center tw-gap-6">
          <Button className="tw-h-full tw-w-fit tw-border-2 tw-border-blue-400 tw-text-blue-400" >ล้าง</Button>
          <Button className="tw-h-full tw-w-fit tw-border-2 tw-border-blue-400 tw-text-white tw-bg-blue-400 " >ตรวจสอบ</Button>
        </div>
      </div>

      <div className={classNames("", {
        "tw-overflow-auto": isTabletOrMobile && isPortrait,
      })}>
        <DataTable
          data={recmock}
          columns={columns}
          keyName={"id"}
        />
      </div>
    </div>
  );
};

export default SimilarPost;
