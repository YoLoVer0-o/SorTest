import { CloudUploadOutlined, CloseOutlined } from "@ant-design/icons";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import DropDownPostTarget from "./DropDownPostTarget";
import profile from "../assets/profile.png";
import { useDropzone } from "react-dropzone";
import { BsEmojiSmile } from "react-icons/bs";
import { LiaWindowClose } from "react-icons/lia";
import { useResponsive } from "../hooks";
import classNames from "classnames";
import { useState } from "react";
import Image from "../assets/PostImage";
import { Button } from "antd";

const FacebookPost = () => {
  const [message, setMessage] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [showEmojiInput, setShowEmojiInput] = useState(false);
  const [files, setFiles] = useState([]);

  const {
    isDesktopOrLaptop,
    isBigScreen,
    // isTabletOrMobile,
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
  console.log(images);
  return (
    // <div
    //   className={classNames("tw-flex tw-flex-col tw-items-center tw-h-[60%] tw-w-full  ", {
    //     "tw-h-[80%]": isDesktopOrLaptop,
    //     "tw-h-[80%] ": isTablet && isPortrait,
    //     "tw-h-[70%]  ": isTablet && isLandscape,
    //     "tw-h-[60%]": isMobile && isPortrait,
    //   })}
    // >
    //   <div className=" tw-flex tw-flex-col tw-w-full tw-h-full	tw-items-center">
    //     <div className="tw-flex tw-flex-row tw-gap-x-4">
    //       <img
    //         className="tw-w-12 tw-h-12 tw-rounded-full tw-border-2 tw-border-black"
    //         src={profile}
    //       />
    //       <div>
    //         <p className="  tw-text-xl ">Account Name</p>
    //         <DropDownPostTarget />
    //       </div>
    //     </div>
    //     <div className="tw-flex tw-h-[30%] tw-flex-row">
    //       <textarea
    //         value={message}
    //         onChange={handleMessageChange}
    //         placeholder="คุณกำลังคิดอะไรอยู่"
    //         className=" tw-text-xl tw-w-full tw-h-full  tw-border-none tw-resize-none tw-outline-none"
    //       />
    //       <BsEmojiSmile
    //         className=" tw-text-3xl  tw-self-end tw-text-gray-700 hover:tw-bg-gray-300 tw-rounded-full tw-flex"
    //         onClick={toggleEmoji}
    //       />
    //     </div>

    //     {isShow && (
    //       <div
    //         className={classNames(
    //           "tw-relative tw-flex tw-self-center  tw-z-10  tw-h-[50%]",
    //           {
    //             "tw-w-[30%]": isDesktopOrLaptop,
    //             "tw-w-[70%]": isTablet && isPortrait,
    //             "tw-w-[40%]": isTablet && isLandscape,
    //             "tw-w-full": isMobile && isPortrait,
    //           }
    //         )}
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
    //           className="tw-flex tw-w-full tw-h-full tw-justify-center tw-items-center tw-border-dashed tw-border-2 tw-z-10
    //          tw-bg-gray-100  hover:tw-bg-gray-200 tw-border-gray-400 tw-rounded-md"
    //         >
    //           <input {...getInputProps()} className="tw-w-full tw-h-full" />
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
    //   </div>
    //   {showEmojiInput && (
    //     <div className=" tw-absolute tw-flex tw-justify-center tw-mt-24 tw-z-20">
    //       <EmojiPicker
    //         classNames="tw-relative"
    //         emojiStyle={EmojiStyle.NATIVE}
    //         onEmojiClick={(emoji) => showEmo(emoji)}
    //       />
    //       <button
    //         className="tw-absolute tw-top-0 tw-right-0"
    //         onClick={toggleEmoji}
    //       >
    //         <LiaWindowClose className="tw-text-2xl  tw-bg-red-500" />
    //       </button>
    //     </div>
    //   )}

    //   <div
    //     className={classNames(
    //       "tw-flex tw-flex-row tw-h-12  tw-border-[1px]  tw-border-gray-300 tw-rounded-md tw-justify-center tw-justify-self-end tw-items-center tw-gap-x-4 ",
    //       {
    //         "tw-w-[30%]": isDesktopOrLaptop,
    //         " tw-w-full": isMobile && isPortrait,
    //         " tw-w-[50%]": isMobile && isLandscape,
    //       }
    //     )}
    //   >
    //     <p className="tw-col-span-2">Add to your post</p>
    //     <button
    //       className=" tw-rounded-full tw-w-max  hover:tw-bg-gray-300"
    //       onClick={() => setIsShow(true)}
    //     >
    //       <img className="tw-w-6 tw-h-6 " src={Image.selectPic} />
    //     </button>
    //     <img className="tw-w-6 tw-h-6" src={Image.tagOther} />
    //     <img className="tw-w-6 tw-h-6" src={Image.emoji} />
    //     <img className="tw-w-6 tw-h-6" src={Image.checkIn} />
    //     <img className="tw-w-6 tw-h-6" src={Image.Gif} />
    //     <button
    //       className="tw-rounded-full tw-flex tw-justify-center
    //        hover:tw-bg-gray-200 tw-w-6 tw-h-6 tw-items-center tw-text-center"
    //     >
    //       {" "}
    //       ...
    //     </button>
    //   </div>
    // </div>
    <div
      className={classNames(
        "tw-w-full tw-border-[#0874c4] tw-border-solid tw-border-2 tw-flex tw-justify-center tw-overflow-auto",
        {
          "tw-h-[80%]": isBigScreen,
          "tw-h-[70%]": isDesktopOrLaptop,
          "tw-h-[80%] ": isTablet && isPortrait,
          "tw-h-[70%]  ": isTablet && isLandscape,
          "tw-h-screen tw-relative": isMobile && isLandscape,
        }
      )}
    >
      <div
        className={classNames(
          "tw-grid tw-justify-center tw-justify-self-center tw-w-max ",
          {
            "tw-grid-cols-12 tw-grid-rows-8 ": isDesktopOrLaptop,
            "tw-grid-cols-8 tw-grid-rows-6 ": isTablet && isPortrait || isTablet && isLandscape,
            "tw-grid-cols-6 tw-grid-rows-6 ": isMobile && isPortrait || isMobile && isLandscape,
          }
        )}
      >
        <div
          className={classNames("tw-grid tw-h-max  ", {
            "tw-grid-cols-3 tw-grid-rows-1 tw-col-span-4 tw-row-span-1 tw-row-start-1 tw-col-start-5 ":
              isDesktopOrLaptop,
            "tw-grid-cols-3 tw-grid-rows-1 tw-col-span-4  tw-row-span-1 tw-col-start-3  ":
              isTablet && isPortrait || isTablet && isLandscape,
            "tw-grid-cols-4 tw-grid-rows-1 tw-col-span-6  tw-row-span-1 tw-col-start-1":
              (isMobile && isPortrait) || isMobile && isLandscape,
          })}
        >
          <img
            className="tw-col-start-1 tw-justify-self-center tw-w-12 tw-h-12 tw-rounded-full tw-border-2 tw-border-black"
            src={profile}
          />
          <div className="tw-col-start-2 tw-col-span-3">
            <p className="  tw-text-xl">Account Name</p>
            <DropDownPostTarget />
          </div>
        </div>
        <textarea
          value={message}
          onChange={handleMessageChange}
          placeholder="คุณกำลังคิดอะไรอยู่"
          className={classNames(
            " tw-text-xl tw-w-full tw-h-full tw-border-none tw-resize-none tw-outline-none",
            {
              "tw-col-start-5 tw-row-start-2 tw-row-span-2 tw-col-span-4":
                isDesktopOrLaptop,
              "tw-col-start-3 tw-row-start-2 tw-row-span-1 tw-col-span-4":
                isTablet && isPortrait || isTablet && isLandscape,
              "tw-col-start-2 tw-row-start-2 tw-row-span-1 tw-col-span-4 ":
                (isMobile && isPortrait) || isMobile && isLandscape,
            }
          )}
        />

        <BsEmojiSmile
          className={classNames(
            " tw-text-3xl tw-self-end  tw-text-gray-700 hover:tw-bg-gray-300 tw-rounded-full tw-flex",
            {
              "tw-col-start-9 tw-row-start-3 tw-justify-self-end":
                isDesktopOrLaptop,
              "tw-col-start-7 tw-row-start-2 tw-justify-self-end":
                isTablet && isPortrait || isTablet && isLandscape,
              "tw-col-start-6 tw-row-start-2 tw-justify-self-end":
                (isMobile && isPortrait) || isMobile && isLandscape,
            }
          )}
          onClick={toggleEmoji}
        />

        {isShow && (
          <div
            className={classNames("tw-relative  tw-z-10 ", {
              "tw-col-span-6 tw-row-span-4 tw-col-start-4 tw-row-start-4 ":
                isDesktopOrLaptop,
              "tw-col-span-6 tw-row-span-3 tw-col-start-2 tw-row-start-3  ":
                isTablet && isPortrait || isTablet && isLandscape,
              "tw-col-span-4 tw-row-span-3 tw-col-start-2 tw-row-start-3 ":
                isMobile && isPortrait || isMobile && isLandscape,
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
              className="tw-flex tw-w-full tw-h-full tw-justify-center tw-items-center tw-border-dashed tw-border-2 tw-z-10
             tw-bg-gray-100  hover:tw-bg-gray-200 tw-border-gray-400 tw-rounded-md"
            >
              <input {...getInputProps()} className="tw-w-full tw-h-full" />
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
          className={classNames(
            "tw-grid  tw-border-[1px] tw-h-12 tw-border-gray-300 tw-rounded-md tw-items-center tw-p-4 tw-self-center",
            {
              "tw-col-start-4 tw-row-start-8 tw-col-span-6 tw-grid-cols-8 tw-grid-rows-1":
                isDesktopOrLaptop,
              "tw-col-start-2 tw-row-start-6 tw-col-span-6 tw-grid-cols-8 tw-grid-rows-1  ":
                isTablet && isPortrait || isTablet && isLandscape,
              "tw-col-start-1 tw-row-start-6 tw-col-span-6 tw-grid-cols-8 tw-grid-rows-1 ":
                isMobile && isPortrait || isMobile && isLandscape,
            }
          )}
        >
          <p className="tw-col-span-2">Add to your post</p>
          <button
            className=" tw-rounded-full tw-w-max tw-h-max tw-justify-self-center hover:tw-bg-gray-300"
            onClick={() => setIsShow(true)}
          >
            <img className="tw-w-6 tw-h-6 " src={Image.selectPic} />
          </button>
          <button className=" tw-rounded-full tw-w-max tw-h-max tw-justify-self-center hover:tw-bg-gray-300">
            <img className="tw-w-6 tw-h-6" src={Image.tagOther} />
          </button>
          <button className=" tw-rounded-full tw-w-max tw-h-max tw-justify-self-center hover:tw-bg-gray-300">
            <img className="tw-w-6 tw-h-6" src={Image.emoji} />
          </button>
          <button className=" tw-rounded-full tw-w-max tw-h-max tw-justify-self-center hover:tw-bg-gray-300">
            <img className="tw-w-6 tw-h-6" src={Image.checkIn} />
          </button>
          <button className=" tw-rounded-full tw-w-max tw-h-max tw-justify-self-center hover:tw-bg-gray-300">
            <img className="tw-w-6 tw-h-6" src={Image.Gif} />
          </button>
          <button
            className="tw-rounded-full  tw-justify-self-center
           hover:tw-bg-gray-200 tw-w-6 tw-h-6 "
          >
            ...
          </button>
        </div>
      </div>
      {showEmojiInput && (
        <div className=" tw-absolute tw-top-0 tw-flex tw-justify-center tw-mt-24 tw-z-20">
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

export default FacebookPost;
