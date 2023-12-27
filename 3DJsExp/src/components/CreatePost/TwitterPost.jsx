import profile from "../../assets/profile.png";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import { useState, useRef } from "react";
import classNames from "classnames";
import { useResponsive } from "../../hooks";
import { BsGlobeAsiaAustralia, BsEmojiSmile } from "react-icons/bs";
import { LuUserCheck2 } from "react-icons/lu";
import { MdOutlineVerified } from "react-icons/md";
import { HiOutlineAtSymbol, HiOutlineGif } from "react-icons/hi2";
import { SlPicture } from "react-icons/sl";
import { LiaPollHSolid, LiaWindowClose } from "react-icons/lia";
import { TbCalendarTime } from "react-icons/tb";
import { Select } from "antd";
import FileUpLoader from "../../utilities/FileUpLoader";
import TimeSetPost from "../../utilities/TimeSetPost";
import "./Trainsition.css";
import {
  // Transition,
  CSSTransition,
  SwitchTransition,
  // TransitionGroup,
} from "react-transition-group";

const TwitterPost = () => {
  const [message, setMessage] = useState("");
  const [openUpload, setOpenUpLoad] = useState(false);
  const [openTimeSet, setOpenTimeSet] = useState(false);
  const [showEmojiInput, setShowEmojiInput] = useState(false);
  const [currentId, setCurrentId] = useState(1);

  const {
    isDesktopOrLaptop,
    isBigScreen,
    isTabletOrMobile,
    isMobile,
    isTablet,
    isPortrait,
    isLandscape,
  } = useResponsive();

    const nodeRef = useRef(null);

  const handleMessageChange = (event) => {
    const text = event.target.value;
    if (!text.emoji) {
      setMessage(text);
      console.log(event.target.value);
    } else {
      setMessage(message + text.emoji);
    }
  };

  const toggleEmoji = () => {
    setShowEmojiInput(!showEmojiInput);
  };

  const showEmo = (emo) => {
    setMessage(message + emo.emoji);
    console.log(emo);
  };

  const openPicUpload = () => {
    setOpenUpLoad(true);
    setOpenTimeSet(false);
  };
  const closePicUpload = () => {
    setOpenUpLoad(false);
  };
  
  const closeTimeSet = () => {
    setOpenTimeSet(false);
  };

  const duration = 500;
  const reset = () => {
    setCurrentId(1);
  };

  const switchTimeSet = () => {
    setCurrentId(3);
  };
   const switchToVotePole = () => {
     setCurrentId(2);
   };
  console.log(openTimeSet);
    const contentArray = [
      {
        id: 1,
        content: (
          <div
            className={classNames(
              "tw-grid tw-justify-center tw-justify-self-center tw-w-max ",
              {
                "tw-grid-cols-6 tw-grid-rows-6":
                  (isMobile && isPortrait) || (isMobile && isLandscape),
                "tw-grid-cols-8 tw-grid-rows-6 ":
                  (isTablet && isPortrait) ||
                  (isTablet &&
                    isLandscape &&
                    isTabletOrMobile &&
                    !isDesktopOrLaptop &&
                    !isMobile),
                "tw-grid-cols-8 tw-grid-rows-8 ":
                  isDesktopOrLaptop && isLandscape,
              }
            )}
          >
            {/* <div
          className={classNames("tw-grid ", {
            "tw-grid-cols-3 tw-grid-rows-3 tw-col-span-6  tw-row-span-2 tw-col-start-1":
              (isMobile && isPortrait) || (isMobile && isLandscape),
            "tw-grid-cols-3 tw-grid-rows-4 tw-col-span-8  tw-row-span-2 tw-col-start-1  ":
              (isTablet && isPortrait) ||
              (isTablet &&
                isLandscape &&
                isTabletOrMobile &&
                !isDesktopOrLaptop &&
                !isMobile),
            "tw-grid-cols-3 tw-grid-rows-4 tw-col-span-4  tw-row-span-2 tw-col-start-5 ":
              isDesktopOrLaptop,
          })}
        > */}
            <img
              className="tw-w-12 tw-h-12 tw-col-start-1 tw-row-start-1 tw-rounded-full tw-border-2 tw-border-black tw-flex tw-justify-self-center "
              src={profile}
            />
            <textarea
              value={message}
              onChange={handleMessageChange}
              placeholder="มีอะไรเกิดขึ้นบ้าง"
              className={classNames(
                "tw-text-xl  tw-z-10 tw-w-full tw-border-none tw-resize-none tw-outline-none",
                {
                  "tw-col-start-2 tw-row-start-1 tw-row-span-2  tw-col-span-6 ":
                    (isMobile && isPortrait) || (isMobile && isLandscape),
                  "tw-col-start-2 tw-row-start-1 tw-row-span-4 tw-col-span-6 ":
                    (isMobile && isPortrait && openUpload === false) ||
                    (isMobile && isLandscape && openUpload === false),

                  "tw-col-start-2 tw-row-start-1 tw-row-span-2 tw-col-span-6":
                    (isTablet && isPortrait) ||
                    (isTablet && isLandscape) ||
                    (isTabletOrMobile && !isMobile),
                  "tw-col-start-2 tw-row-start-1 tw-row-span-5 tw-col-span-6":
                    (isTablet && isPortrait && !openUpload) ||
                    (isTablet && isLandscape && !openUpload) ||
                    (isTabletOrMobile && !isMobile && !openUpload),

                  "tw-col-start-2 tw-row-start-1 tw-row-span-2 tw-col-span-6 ":
                    isDesktopOrLaptop && !isTablet,
                  "tw-col-start-2 tw-row-start-1 tw-row-span-6 tw-col-span-4":
                    isDesktopOrLaptop && !isTablet && openUpload === false,
                }
              )}
            />
            {/* </div> */}

            <div
              className={classNames("tw-flex tw-w-full tw-h-full ", {
                "tw-col-span-6 tw-row-span-3 tw-col-start-1  tw-row-start-3":
                  (isMobile && isPortrait) || (isMobile && isLandscape),
                "tw-col-span-8 tw-row-span-3 tw-col-start-1 tw-row-start-3 ":
                  (isTablet && isPortrait) ||
                  (isTablet && isLandscape) ||
                  (isTabletOrMobile && !isMobile),

                "tw-col-span-8 tw-row-span-5 tw-col-start-1 tw-row-start-3 ":
                  isDesktopOrLaptop && !isTablet,
              })}
            >
              {openUpload === true && (
                <FileUpLoader isOpen={openUpload} isClose={closePicUpload} />
              )}
            </div>

            <div
              className={classNames("tw-grid ", {
                "tw-col-start-1 tw-row-start-6 tw-col-span-6":
                  (isMobile && isPortrait) || (isMobile && isLandscape),
                "tw-col-start-1 tw-row-start-6 tw-col-span-8 tw-row-span-2 ":
                  (isTablet && isPortrait) ||
                  (isTablet &&
                    isLandscape &&
                    isTabletOrMobile &&
                    !isDesktopOrLaptop &&
                    !isMobile),
                "tw-col-start-1 tw-row-start-8 tw-col-span-8 tw-row-span-2 ":
                  isDesktopOrLaptop,
              })}
            >
              <Select
                className="hover:tw-bg-sky-200 tw-w-52 tw-h-max tw-rounded-full tw-self-end "
                bordered={false}
                defaultValue="ทุกคน"
                style={{
                  width: 250,
                }}
                options={[
                  {
                    value: "ทุกคน",
                    label: (
                      <i className="tw-flex tw-flex-row tw-items-center tw-text-blue-500">
                        <BsGlobeAsiaAustralia /> <p>ทุกคน</p>
                      </i>
                    ),
                    key: "ทุกคน",
                  },
                  {
                    value: "บัญชีที่คุณติดตาม",
                    label: (
                      <i className="tw-flex tw-flex-row tw-items-center tw-text-blue-500">
                        <LuUserCheck2 />
                        <p>บัญชีที่คุณติดตาม</p>
                      </i>
                    ),
                    key: "บัญชีที่คุณติดตาม",
                  },
                  {
                    value: "บัญชีที่ยืนยันแล้ว",
                    label: (
                      <i className="tw-flex tw-flex-row tw-items-center tw-text-blue-500">
                        <MdOutlineVerified />
                        <p>บัญชีที่ยืนยันแล้ว</p>
                      </i>
                    ),
                    key: "บัญชีที่ยืนยันแล้ว",
                  },
                  {
                    value: "เฉพาะบัญชีที่คุณกล่าวถึงเท่านั้น",
                    label: (
                      <i className="tw-flex tw-flex-row tw-items-center tw-text-blue-500">
                        <HiOutlineAtSymbol />{" "}
                        <p>เฉพาะบัญชีที่คุณกล่าวถึงเท่านั้น</p>
                      </i>
                    ),
                    key: "เฉพาะบัญชีที่คุณกล่าวถึงเท่านั้น",
                  },
                ]}
              />

              <div className="tw-grid tw-grid-flow-col  row-end-auto ">
                <div className="tw-grid tw-grid-flow-col tw-h-max tw-rounded-full">
                  <button className=" tw-rounded-full tw-w-max  hover:tw-bg-sky-200 tw-p-1">
                    <SlPicture
                      className="tw-text-2xl tw-text-blue-500  "
                      onClick={openPicUpload}
                    />
                  </button>
                  <button className=" tw-rounded-full tw-w-max hover:tw-bg-sky-200 tw-p-1">
                    <HiOutlineGif className="tw-text-2xl tw-text-blue-500" />
                  </button>
                  <button
                    onClick={switchToVotePole}
                    className=" tw-rounded-full tw-w-max hover:tw-bg-sky-200 tw-p-1"
                  >
                    <LiaPollHSolid className="tw-text-2xl tw-text-blue-500" />
                  </button>
                  <button className=" tw-rounded-full tw-w-max hover:tw-bg-sky-200 tw-p-1">
                    <BsEmojiSmile
                      className=" tw-text-2xl  tw-text-blue-500  tw-rounded-full tw-flex"
                      onClick={toggleEmoji}
                    />
                  </button>
                  <button className=" tw-rounded-full tw-w-max hover:tw-bg-sky-200 tw-p-1">
                    <TbCalendarTime
                      className="tw-text-2xl tw-text-blue-500"
                      onClick={switchTimeSet}
                    />
                  </button>
                </div>
                <button className="tw-justify-self-end tw-text-white tw-bg-blue-500 hover:tw-bg-blue-600 tw-rounded-full tw-w-16 tw-h-8">
                  โพสต์
                </button>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 2,
        content: (
          <div className="tw-w-full tw-h-full">
            <div className="tw-flex tw-justify-center tw-flex-col ">
              <button className="tw-w-24 tw-h-10" onClick={reset}>
                Back
              </button>
              
            </div>
          </div>
        ),
      },
      {
        id: 3,
        content: (
          <div className="tw-w-full tw-h-full">
            <div className="tw-flex tw-justify-center tw-flex-col ">
              <button className="tw-w-24 tw-h-10" onClick={reset}>
                Back
              </button>
              <TimeSetPost
                isOpenTime={openTimeSet}
                isCloseTime={closeTimeSet}
              />
            </div>
          </div>
        ),
      },
    ];
  return (
    <div
      className={classNames(
        "tw-w-full tw-h-full tw-flex tw-justify-center tw-bg-white tw-rounded-md tw-border-[#0874c4] tw-border-2 tw-p-4",
        {
          // "tw-h-[80%]": isBigScreen,
          // "tw-h-[70%]": isDesktopOrLaptop,
          // "tw-h-[60%] ": isTablet && isPortrait,
          // "tw-h-[70%] ": isTablet && isLandscape,
          // "tw-h-screen": isMobile && isLandscape,
        }
      )}
    >
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={currentId}
          nodeRef={nodeRef}
          timeout={duration}
          classNames="fade"
        >
          <div className="fade " ref={nodeRef}>
            {contentArray.find((item) => item.id === currentId)?.content}
          </div>
        </CSSTransition>
      </SwitchTransition>

      {showEmojiInput && (
        <div
          className={classNames(
            " tw-absolute tw-flex tw-justify-start  tw-z-20",
            {
              " ": isDesktopOrLaptop,
              " tw-mb-96": isMobile && isPortrait,
            }
          )}
        >
          <EmojiPicker
            classNames="tw-relative"
            emojiStyle={EmojiStyle.NATIVE}
            onEmojiClick={(emoji) => showEmo(emoji)}
          />
          <button
            className="tw-absolute tw-top-0 tw-right-0"
            onClick={toggleEmoji}
          >
            <LiaWindowClose className="tw-text-2xl  tw-bg-red-500" />
          </button>
        </div>
      )}
    </div>
  );
};
export default TwitterPost;
