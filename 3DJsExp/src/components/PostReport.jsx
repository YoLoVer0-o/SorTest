import { useRef } from "react";
import { ListInput, ToTopButton } from "../utilities";
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);
import iLaw from "../assets/iLaw.png";
import { FloatButton, Tooltip } from "antd";
import classNames from "classnames";
import { useResponsive } from "../hooks";
import { DataTable } from "../utilities";
import { FormOutlined, MoreOutlined, FilePdfOutlined } from "@ant-design/icons";

const PostReport = () => {

  const {
    isDesktopOrLaptop,
    isBigScreen,
    isTabletOrMobile,
    isTablet,
    isMobile,
    isPortrait,
  } = useResponsive();

  const topRef = useRef(null);
  const summarizeContent = useRef(null);

  const focusSummarize = () => {
    if (summarizeContent.current) {
      summarizeContent.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const columns = [
    {
      title: 'สื่อประกอบ',
      dataIndex: 'post',
      key: 'post',
      align: "center",
      width: 150,
      className: 'tw-text-white tw-bg-[#303c6c]',
    },
    {
      title: 'เนื้อหา',
      dataIndex: 'creator',
      key: 'creator',
      align: "center",
      width: 250,
      className: 'tw-text-white tw-bg-[#303c6c]',
    },
    {
      title: 'วันที่โพสต์ / อัปเดต',
      dataIndex: 'link',
      key: 'link',
      align: "center",
      width: 100,
      className: 'tw-text-white tw-text-sky-700 tw-bg-[#303c6c]',
    },
    {
      title: 'การมีส่วนร่วม',
      dataIndex: 'update',
      key: 'update',
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
        <p>สรุปรายงานจากโพสต์:</p>
        <div className={classNames("tw-flex tw-flex-row tw-mb-4 tw-w-full tw-h-full", {
          "tw-flex-col": isTabletOrMobile && isPortrait,
        })}>
          <div className="tw-w-20 tw-h-20 tw-border-2 tw-border-black tw-rounded-full">
            <a>
              <img className="tw-rounded-full" src={iLaw} />
            </a>
          </div>
          <div className={classNames("tw-flex tw-flex-row tw-justify-around tw-w-full", {
            "tw-grid tw-grid-cols-2 tw-gap-1": isTabletOrMobile && isPortrait,
          })}>
            <a>
              กลุ่ม :
              <div className={classNames("tw-flex	tw-items-center tw-border-2 tw-rounded-md tw-h-8 tw-border-solid tw-border-black", {
                "tw-w-28": isMobile && isPortrait,
                "tw-w-34": isTablet && isPortrait,
                "tw-w-44": isDesktopOrLaptop || isBigScreen,
              })}>
                {" "}
                NGO
              </div>
            </a>
            <a>
              ชื่อกลุ่ม :
              <div className={classNames("tw-flex	tw-items-center tw-border-2 tw-rounded-md tw-h-8 tw-border-solid tw-border-black", {
                "tw-w-28": isMobile && isPortrait,
                "tw-w-34": isTablet && isPortrait,
                "tw-w-44": isDesktopOrLaptop || isBigScreen,
              })}>
                {" "}
                iLawFX
              </div>
            </a>
            <div>
              ช่องทาง :
              <div className={classNames("tw-flex	tw-items-center tw-border-2 tw-rounded-md tw-h-8 tw-border-solid tw-border-black", {
                "tw-w-28": isMobile && isPortrait,
                "tw-w-34": isTablet && isPortrait,
                "tw-w-44": isDesktopOrLaptop || isBigScreen,
              })}>
                {" "}
                Facebook
              </div>
            </div>
            <div>
              ผู้ติดตาม :
              <div className={classNames("tw-flex	tw-items-center tw-border-2 tw-rounded-md tw-h-8 tw-border-solid tw-border-black", {
                "tw-w-28": isMobile && isPortrait,
                "tw-w-34": isTablet && isPortrait,
                "tw-w-44": isDesktopOrLaptop || isBigScreen,
              })}>
                {" "}
                460,000
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={classNames("", {
        "tw-overflow-auto": isTabletOrMobile && isPortrait,
      })}>
        <DataTable
          columns={columns}
        />
      </div>

      <div className="tw-p-4"
        ref={summarizeContent}
        tabIndex={0}
      >
        <div>บทวิเคราะห์ :</div>
        <div className="tw-border-solid tw-border-gray-300 tw-border-2 tw-p-2">
          <div> จําเป็นต้องติดตามความเคลื่อนไหวอย่างใกล้ชิด</div>
          <div className="">
            <ListInput />
          </div>
          <div> สถานการณ์ในห้วงต่อไป</div>
          <div className="">
            <ListInput />
          </div>
        </div>
      </div>
      <Tooltip placement="left" title={"เพิ่มเติม"} color="blue">
        <FloatButton.Group
          trigger="click"
          type="primary"
          className="tw-right-10"
          icon={<MoreOutlined />}
        >
          <Tooltip placement="left" title={"สร้างรายงานPDF"} color5="blue">
            <FloatButton
              className="tw-flex tw-right-2 tw-bottom-32 tw-z-10 tw-bg-red-400"
              icon={<FilePdfOutlined />}

            />
          </Tooltip>
          <Tooltip placement="left" title={"ไปยังสรุป"} color="blue">
            <FloatButton
              className="tw-flex tw-right-2 tw-bottom-32 tw-z-10"
              icon={<FormOutlined />}
              onClick={() => focusSummarize()}
            />
          </Tooltip>
          <ToTopButton topRef={topRef} />
        </FloatButton.Group>
      </Tooltip>
    </div>
  );
};

PostReport.propTypes = {};

export default PostReport;
