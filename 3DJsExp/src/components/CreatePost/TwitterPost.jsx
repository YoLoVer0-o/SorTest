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
import { Select, Button, Form, Input, DatePicker, TimePicker } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import FileUpLoader from "../../utilities/FileUpLoader";
import TimeSetPost from "../../utilities/TimeSetPost";
import locale from "antd/es/date-picker/locale/th_TH";
import "dayjs/locale/th";
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
  //////////////////////////PoleVotes///////////////////////////
  const getDate = new Date();
  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const dateOptionPole = Array.from({ length: 8 }, (_, index) => ({
    value: index,
    label: index,
  }));
  const hoursOptionPole = Array.from({ length: 24 }, (_, index) => ({
    value: index,
    label: index,
  }));
  const minutesOptionPole = Array.from({ length: 60 }, (_, index) => ({
    value: index,
    label: index,
  }));

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
                {/* <button className=" tw-rounded-full tw-w-max hover:tw-bg-sky-200 tw-p-1">
                    <HiOutlineGif className="tw-text-2xl tw-text-blue-500" />
                  </button> */}
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

            <Form
              name="dynamic_form_item"
              // {...formItemLayoutWithOutLabel}
              onFinish={onFinish}
              className="tw-w-full "
            >
              <Form.List
                name="names"
                initialValue={["", ""]} // Set initial values to have two empty fields
                // rules={[
                //   {
                //     validator: async (_, names) => {
                //       if (!names || names.length < 2) {
                //         return Promise.reject(
                //           new Error("At least 2 passengers")
                //         );
                //       }
                //     },
                //   },
                // ]}
              >
                {(fields, { add, remove }, { errors }) => (
                  <div className="tw-w-full ">
                    {fields.map((field, index) => (
                      <Form.Item
                        // {...(index === 0
                        //   ? formItemLayout
                        //   : formItemLayoutWithOutLabel)}
                        label={`ตัวเลือก ${index + 1}`}
                        required={false}
                        key={field.key}
                      >
                        <div className="tw-w-full tw-flex tw-gap-4">
                          <Form.Item
                            {...field}
                            validateTrigger={["onChange", "onBlur"]}
                            rules={[
                              {
                                required: true,
                                whitespace: true,
                                message:
                                  "Please input passenger's name or delete this field.",
                              },
                            ]}
                            noStyle
                          >
                            <Input
                              placeholder={`ตัวเลือก ${index + 1}`}
                              className="tw-w-[60%]"
                            />
                          </Form.Item>
                          {fields.length > 1 ? (
                            <MinusCircleOutlined
                              className="dynamic-delete-button tw-text-xl tw-flex tw-self-center"
                              onClick={() => remove(field.name)}
                            />
                          ) : null}
                        </div>
                      </Form.Item>
                    ))}
                    <Form.Item>
                      {fields.length < 4 && (
                        <Button
                          type="dashed"
                          onClick={() => {
                            if (fields.length < 4) {
                              add();
                            }
                          }}
                          className="tw-w-[60%]"
                          icon={<PlusOutlined />}
                        >
                          Add field
                        </Button>
                      )}
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </div>
                )}
              </Form.List>
              <Form.Item>
                <Button className="tw-bg-blue-400 tw-text-white">Submit</Button>
              </Form.Item>
              <hr className="tw-h-px tw-my-8 tw-bg-gray-200 tw-border-0 dark:tw-bg-gray-700"></hr>
            </Form>
            <div>ความยาวของโพล</div>
            <div className="tw-w-full tw-flex tw-gap-6 tw-justify-center">
              <Select
                defaultValue={dateOptionPole[1]}
                onChange={handleChange}
                options={dateOptionPole}
                className="tw-w-full"
              />
                
              <Select
                defaultValue={hoursOptionPole[0]}
                onChange={handleChange}
                options={hoursOptionPole}
                className="tw-w-full"
              />
              <Select
                defaultValue={minutesOptionPole[0]}
                onChange={handleChange}
                options={minutesOptionPole}
                className="tw-w-full"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      content: (
        <div className="tw-w-full tw-h-full">
          <div className="tw-flex tw-justify-center tw-flex-col ">
            <button
              className="tw-bg-gray-200 hover:tw-bg-gray-300 tw-w-10 tw-h-6 tw-rounded-md"
              onClick={reset}
            >
              Back
            </button>
            <TimeSetPost isOpenTime={openTimeSet} isCloseTime={closeTimeSet} />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div
      className={classNames(
        " tw-w-full tw-h-full tw-p-5 tw-bg-white tw-rounded-md tw-flex tw-justify-center tw-justify-self-center tw-overflow-auto tw-border-2 tw-border-[#0874c4] tw-shadow-[0_3px_10px_rgb(0,0,0,0.2)]",
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
              "": isDesktopOrLaptop,
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
