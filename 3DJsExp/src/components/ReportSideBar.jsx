import classNames from "classnames";
import logo from "../assets/logo.jpg";
import PropTypes from "prop-types";
import { useResponsive } from "../hooks";

const ReportSideBar = (props) => {
  const focusSummarize = props.focusSummarize;
  const handleClick = props.handleClick;
  const {
    isDesktopOrLaptop,
    isBigScreen,
    isTabletOrMobile,
    isPortrait,
    isRetina,
  } = useResponsive();
  return (
    <div
      className={classNames(
        "tw-flex tw-max-h-full tw-h-full tw-w-max tw-object-contain ",
        {
          "tw-absolute tw-h-full tw-overflow-y-auto tw-z-20  tw-w-screen ":
            isTabletOrMobile && isPortrait,
        }
      )}
    >
      <div className="tw-flex tw-flex-col tw-bg-[#7dcbb7]/90 tw-max-h-max tw-h-full tw-w-full">
        <div className="tw-flex tw-flex-col   ">
          <div className="tw-flex tw-bg-[#163881] tw-self-center	 tw-rounded-b-full tw-w-max tw-h-max tw-p-2">
            <img
              className="tw-rounded-full tw-border-[6px]  tw-border-black tw-w-24 tw-h-24 "
              src={logo}
            />
          </div>
          <div className="tw-flex tw-self-center tw-mt-8">
            <button
              className="tw-bg-white tw-h-8 tw-w-32 tw-rounded-lg"
              onClick={focusSummarize}
            >
              สรุปความเคลื่อนไหว
            </button>
          </div>
          <div className="tw-flex tw-self-center tw-mt-4">
            <button
              className="tw-bg-white tw-h-8 tw-w-32 tw-rounded-lg"
              onClick={handleClick}
            >
              สรุปวิเคราะห์
            </button>
          </div>
        </div>
        <div className="tw-flex tw-h-full tw-self-end tw-pb-4 tw-pr-4 ">
          <button className="tw-bg-white tw-h-8 tw-w-24 tw-rounded-lg tw-self-end">
            SAVE PDF
          </button>
        </div>
      </div>
    </div>
  );
};

ReportSideBar.propTypes = {
  focusSummarize: PropTypes.func,
  handleClick: PropTypes.func,
};

export default ReportSideBar;
