import { DataTable } from "../../utilities";
import { useResponsive } from "../../hooks";
import WordClouds from "../../assets/WordClouds";
import classNames from "classnames";
import { Tooltip } from 'antd';
import { recmock } from "../../mock";

const Trending = () => {

  const {
    isTabletOrMobile,
    isMobile,
    isTablet,
    isLandscape,
    isPortrait,
  } = useResponsive();

  const { ภาพรวม } = WordClouds;
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
        className={classNames("tw-flex tw-flex-row tw-border-2 tw-gap-4 tw-p-6 tw-my-4 ", {
          "tw-overflow-auto": isTabletOrMobile && isPortrait,
          "tw-flex-col": isTabletOrMobile,
        })} >
        <div className={classNames("tw-flex tw-flex-col tw-text-center tw-gap-y-6 tw-border-white tw-shadow-xl tw-border-4 tw-rounded-lg tw-p-4", {
          "tw-w-full": isTabletOrMobile,
          "tw-w-1/2": !isTabletOrMobile,
        })}>
          <p className="tw-text-lg">กลุ่มคำ</p>
          <div className={classNames("", {
            "tw-h-[16rem]": isMobile && isPortrait,
            "tw-h-full": !isMobile || (isMobile && isLandscape),
          })}>
            <img className="tw-object-fill tw-h-full tw-w-full" src={ภาพรวม} />
          </div>
        </div>
        <div className="tw-flex tw-flex-col tw-w-full tw-text-center tw-gap-y-6 tw-border-white tw-shadow-xl tw-border-4 tw-rounded-lg tw-p-4">
          <p className="tw-text-lg">แฮชเเท็กที่ถูกใช้งานมากที่สุด</p>
          <div className={classNames("tw-grid tw-w-full tw-h-full tw-justify-around tw-items-center tw-self-center tw-gap-4 tw-font-bold tw-text-blue-400", {
            "tw-grid-cols-3 tw-text-xl": !(isMobile && isPortrait),
            "tw-grid-cols-2 tw-text-md": isMobile && isPortrait,
          })}>
            <p >#แอมมี่{ }</p>
            <p >#คบกันตอนไหน{ }</p>
            <p >#แบงค์ศุภณัฐ{ }</p>
            <p >#แม่แตงโม</p>
            <p >#สมุดหนังหมาHayDay{ }</p>
            <p >#dek67{ }</p>
            <p >#กรรมกรข่าวคุยนอกจอ{ }</p>
            <p >#BuildJakapan{ }</p>
            <p>#엔시티존{ }</p>
            <p >#ทาลอนเก่งอะ{ }</p>
            <p >#ตํานานวินเมธวิน</p>
            <p >#อิงฟ้ามหาชน</p>
            <p >#cnfact</p>
            <p >#ชาล็อตออสติน</p>
            <p >#นิทานพันดาว</p>
            <p >#30บาทรักษาทุกที่</p>
            <p >#เงินเฟ้อ</p>
            <p >#ขอแจมอีกที</p>
          </div>
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

export default Trending;
