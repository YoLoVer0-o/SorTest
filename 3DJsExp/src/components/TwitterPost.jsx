import profile from "../assets/profile.png";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import { useState } from "react";
import classNames from "classnames";
import { useDropzone } from "react-dropzone";
import { useResponsive } from "../hooks";
import { BsGlobeAsiaAustralia, BsEmojiSmile } from "react-icons/bs";
import { LuUserCheck2 } from "react-icons/lu";
import { MdOutlineVerified } from "react-icons/md";
import { HiOutlineAtSymbol, HiOutlineGif } from "react-icons/hi2";
import { SlPicture } from "react-icons/sl";
import { LiaPollHSolid, LiaWindowClose } from "react-icons/lia";
import { CloseOutlined, CloudUploadOutlined } from "@ant-design/icons";
import { Select, Button } from "antd";

const TwitterPost = () => {
  const [message, setMessage] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [showEmojiInput, setShowEmojiInput] = useState(false);
  const [files, setFiles] = useState([]);

  const {
    isDesktopOrLaptop,
    isBigScreen,
    isTabletOrMobile,
    isMobile,
    isTablet,
    isPortrait,
    isLandscape,
  } = useResponsive();

  const toggleEmoji = () => {
    setShowEmojiInput(!showEmojiInput);
  };

  const handleMessageChange = (event) => {
    const text = event.target.value;
    if (!text.emoji) {
      setMessage(text);
      console.log(event.target.value);
    } else {
      setMessage(message + text.emoji);
    }
  };

  const showEmo = (emo) => {
    setMessage(message + emo.emoji);
    console.log(emo);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: true,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const images = files.map((file) => (
    <div key={file.name}>
      <div>
        <img src={file.preview} className=" tw-w-40 " alt="preview" />
      </div>
    </div>
  ));

  return (
    // <div
    //   className={classNames("tw-flex tw-justify-center  tw-w-full", {
    //     "tw-h-[80%]": isDesktopOrLaptop,
    //     "tw-h-[70%] ": isTablet && isPortrait,
    //     "tw-h-[60%]": isMobile && isPortrait,
    //   })}
    // >
    //   <div
    //     className={classNames(
    //       "tw-flex tw-items-center tw-w-[80%] tw-h-full tw-flex-col tw-bg-white tw-border-gray-200 tw-border-[1px] ",
    //       {
    //         "tw-w-full": isTablet && isPortrait,
    //         "tw-w-full ": isMobile && isPortrait,
    //       }
    //     )}
    //   >
    //     <div
    //       className={classNames("tw-flex tw-gap-x-8  ", {
    //         "tw-w-[50%] tw-h-[50%]": isDesktopOrLaptop,
    //         "tw-w-[50%] tw-h-[50%] ": isTablet && isPortrait,
    //         "tw-w-full tw-h-full": isMobile && isPortrait,
    //       })}
    //     >
    //       <img
    //         className="tw-w-12 tw-h-12 tw-rounded-full tw-border-2 tw-border-black"
    //         src={profile}
    //       />

    //       <textarea
    //         value={message}
    //         onChange={handleMessageChange}
    //         placeholder="มีอะไรเกิดขึ้นบ้าง"
    //         className=" tw-text-xl tw-w-full tw-border-none tw-resize-none tw-outline-none"
    //       />

    //       {showEmojiInput && (
    //         <div className=" tw-absolute tw-flex tw-justify-center   tw-z-20">
    //           <EmojiPicker
    //             classNames="tw-relative"
    //             emojiStyle={EmojiStyle.NATIVE}
    //             onEmojiClick={(emoji) => showEmo(emoji)}
    //           />
    //           <button
    //             className="tw-absolute tw-top-0 tw-right-0"
    //             onClick={toggleEmoji}
    //           >
    //             <LiaWindowClose className="tw-text-2xl  tw-bg-red-500" />
    //           </button>
    //         </div>
    //       )}
    //     </div>

    //     {isShow && (
    //       <div
    //         className={classNames("tw-relative tw-z-10 tw-w-[40%]", {
    //           " tw-w-[40%]": isDesktopOrLaptop,
    //           "tw-w-full": isTabletOrMobile && isPortrait,
    //         })}
    //       >
    //         <Button
    //           className="tw-text-black tw-absolute tw-border-black tw-flex tw-right-1 tw-bg-red-500 tw-top-1 tw-z-40 tw-justify-center
    //         tw-items-center tw-justify-self-end  "
    //           icon={<CloseOutlined />}
    //           onClick={() => setIsShow(!isShow)}
    //           shape="circle"
    //         ></Button>
    //         <div
    //           {...getRootProps()}
    //           className={classNames(
    //             "tw-flex tw-justify-center tw-items-center tw-border-dashed tw-border-2 tw-z-10 tw-w-full tw-flex-col tw-h-64 tw-bg-gray-100  hover:tw-bg-gray-200 tw-border-gray-400 tw-rounded-md",
    //             {
    //               " tw-w-full tw-min-w-full": isMobile && isPortrait,
    //             }
    //           )}
    //         >
    //           <input {...getInputProps()} className="tw-w-full" />
    //           {images.length === 0 && (
    //             <div className="tw-flex tw-flex-col tw-items-center">
    //               <CloudUploadOutlined className="tw-text-4xl" />
    //               <p>Drop files here </p>
    //             </div>
    //           )}
    //           <div>{images}</div>
    //         </div>
    //       </div>
    //     )}

    //     <div>
    //       <Select
    //         className="hover:tw-bg-sky-200 tw-rounded-full "
    //         bordered={false}
    //         defaultValue="ทุกคน"
    //         style={{
    //           width: 250,
    //         }}
    //         options={[
    //           {
    //             value: "ทุกคน",
    //             label: (
    //               <i className="tw-flex tw-flex-row tw-items-center tw-text-blue-500">
    //                 <BsGlobeAsiaAustralia /> <p>ทุกคน</p>
    //               </i>
    //             ),
    //             key: "ทุกคน",
    //           },
    //           {
    //             value: "บัญชีที่คุณติดตาม",
    //             label: (
    //               <i className="tw-flex tw-flex-row tw-items-center tw-text-blue-500">
    //                 <LuUserCheck2 />
    //                 <p>บัญชีที่คุณติดตาม</p>
    //               </i>
    //             ),
    //             key: "บัญชีที่คุณติดตาม",
    //           },
    //           {
    //             value: "บัญชีที่ยืนยันแล้ว",
    //             label: (
    //               <i className="tw-flex tw-flex-row tw-items-center tw-text-blue-500">
    //                 <MdOutlineVerified />
    //                 <p>บัญชีที่ยืนยันแล้ว</p>
    //               </i>
    //             ),
    //             key: "บัญชีที่ยืนยันแล้ว",
    //           },
    //           {
    //             value: "เฉพาะบัญชีที่คุณกล่าวถึงเท่านั้น",
    //             label: (
    //               <i className="tw-flex tw-flex-row tw-items-center tw-text-blue-500">
    //                 <HiOutlineAtSymbol />{" "}
    //                 <p>เฉพาะบัญชีที่คุณกล่าวถึงเท่านั้น</p>
    //               </i>
    //             ),
    //             key: "เฉพาะบัญชีที่คุณกล่าวถึงเท่านั้น",
    //           },
    //         ]}
    //       />
    //     </div>
    //     <hr className="tw-h-px tw-my-4 tw-bg-gray-200 tw-border-0 dark:tw-bg-gray-700 tw-w-full"></hr>
    //     <div className="tw-flex tw-flex-row tw-w-full  tw-justify-center ">
    //       <div
    //         className={classNames("tw-flex tw-flex-row  ", {
    //           "tw-w-[40%] tw-gap-x-8": isDesktopOrLaptop,
    //           "tw-w-[60%] tw-gap-x-8": isTablet && isPortrait,
    //           "tw-w-full tw-gap-x-4": isMobile && isPortrait,
    //         })}
    //       >
    //         <button className=" tw-rounded-full  hover:tw-bg-sky-200 tw-p-1">
    //           <SlPicture
    //             className="tw-text-2xl tw-text-blue-500  "
    //             onClick={() => setIsShow(true)}
    //           />
    //         </button>
    //         <button className=" tw-rounded-full  hover:tw-bg-sky-200 tw-p-1">
    //           <HiOutlineGif className="tw-text-2xl tw-text-blue-500" />
    //         </button>
    //         <button className=" tw-rounded-full  hover:tw-bg-sky-200 tw-p-1">
    //           <LiaPollHSolid className="tw-text-2xl tw-text-blue-500" />
    //         </button>
    //         <button className=" tw-rounded-full  hover:tw-bg-sky-200 tw-p-1">
    //           <BsEmojiSmile
    //             className=" tw-text-2xl  tw-text-blue-500  tw-rounded-full tw-flex"
    //             onClick={toggleEmoji}
    //           />
    //         </button>
    //       </div>
    //       <button className="tw-justify-self-end tw-text-white tw-bg-blue-500 hover:tw-bg-blue-600 tw-rounded-full tw-w-16 tw-h-8">
    //         โพสต์
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <div
      className={classNames("tw-w-full  tw-flex tw-justify-center", {
        "tw-h-[80%]": isBigScreen,
        "tw-h-[70%]": isDesktopOrLaptop,
        "tw-h-[60%] ": isTablet && isPortrait,
        "tw-h-[70%]  ": isTablet && isLandscape,
        "tw-h-[60%]": isMobile && isPortrait,
        "tw-h-screen": isMobile && isLandscape,
      })}
    >
      <div
        className={classNames(
          "tw-grid tw-justify-center tw-justify-self-center tw-w-max ",
          {
            "tw-grid-cols-12 tw-grid-rows-6 ": isDesktopOrLaptop,
            "tw-grid-cols-8 tw-grid-rows-6 ":
              (isTablet && isPortrait) || (isTablet && isLandscape),
            "tw-grid-cols-6 tw-grid-rows-6":
              (isMobile && isPortrait) || (isMobile && isLandscape),
          }
        )}
      >
        <div
          className={classNames("tw-grid   ", {
            "tw-grid-cols-3 tw-grid-rows-4 tw-col-span-4  tw-row-span-2 tw-col-start-5 ":
              isDesktopOrLaptop,
            "tw-grid-cols-3 tw-grid-rows-4 tw-col-span-4  tw-row-span-2 tw-col-start-3  ":
              (isTablet && isPortrait) || (isTablet && isLandscape),
            "tw-grid-cols-3 tw-grid-rows-3 tw-col-span-4  tw-row-span-2 tw-col-start-2":
              (isMobile && isPortrait) || (isMobile && isLandscape),
          })}
        >
          <img
            className="tw-w-12 tw-h-12 tw-rounded-full tw-border-2 tw-border-black tw-flex tw-justify-self-center "
            src={profile}
          />
          <textarea
            value={message}
            onChange={handleMessageChange}
            placeholder="มีอะไรเกิดขึ้นบ้าง"
            className="tw-text-xl tw-col-span-2 tw-row-span-6  tw-w-full tw-border-none tw-resize-none tw-outline-none"
          />
        </div>

        {isShow && (
          <div
            className={classNames("tw-relative tw-z-10 ", {
              "tw-col-span-4 tw-row-span-3 tw-col-start-5 ": isDesktopOrLaptop,
              "tw-col-span-6 tw-row-span-3 tw-col-start-2 ":
                (isTablet && isPortrait) || (isTablet && isLandscape),
              "tw-col-span-4 tw-row-span-3 tw-col-start-2 ":
                (isMobile && isPortrait) || (isMobile && isLandscape),
            })}
          >
            <Button
              className="tw-text-black tw-absolute tw-border-black tw-flex tw-right-1 tw-bg-red-500 tw-top-1 tw-z-40 tw-justify-center
            tw-items-center tw-justify-self-end  "
              icon={<CloseOutlined />}
              onClick={() => setIsShow(!isShow)}
              shape="circle"
            ></Button>
            <div
              {...getRootProps()}
              className={classNames(
                "tw-flex tw-justify-center tw-items-center tw-border-dashed tw-border-2 tw-z-10 tw-w-full tw-h-full tw-flex-col  tw-bg-gray-100  hover:tw-bg-gray-200 tw-border-gray-400 tw-rounded-md",
                {
                  " tw-w-full tw-min-w-full":
                    (isMobile && isPortrait) || (isMobile && isLandscape),
                }
              )}
            >
              <input {...getInputProps()} className="tw-w-full" />
              {images.length === 0 && (
                <div className="tw-flex tw-flex-col tw-items-center">
                  <CloudUploadOutlined className="tw-text-4xl" />
                  <p>Drop files here </p>
                </div>
              )}
              <div>{images}</div>
            </div>
          </div>
        )}

        <div
          className={classNames("tw-grid ", {
            "tw-col-start-5 tw-row-start-6 tw-col-span-4 tw-row-span-2 ":
              isDesktopOrLaptop,
            "tw-col-start-3 tw-row-start-6 tw-col-span-4 tw-row-span-2 ":
              (isTablet && isPortrait) || (isTablet && isLandscape),
            "tw-col-start-2 tw-row-start-6":
              (isMobile && isPortrait) || (isMobile && isLandscape),
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
                  onClick={() => setIsShow(true)}
                />
              </button>
              <button className=" tw-rounded-full tw-w-max hover:tw-bg-sky-200 tw-p-1">
                <HiOutlineGif className="tw-text-2xl tw-text-blue-500" />
              </button>
              <button className=" tw-rounded-full tw-w-max hover:tw-bg-sky-200 tw-p-1">
                <LiaPollHSolid className="tw-text-2xl tw-text-blue-500" />
              </button>
              <button className=" tw-rounded-full tw-w-max hover:tw-bg-sky-200 tw-p-1">
                <BsEmojiSmile
                  className=" tw-text-2xl  tw-text-blue-500  tw-rounded-full tw-flex"
                  onClick={toggleEmoji}
                />
              </button>
            </div>
            <button className="tw-justify-self-end tw-text-white tw-bg-blue-500 hover:tw-bg-blue-600 tw-rounded-full tw-w-16 tw-h-8">
              โพสต์
            </button>
          </div>
        </div>
      </div>
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
