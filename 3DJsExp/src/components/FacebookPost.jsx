import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import DropDownPostTarget from "./DropDownPostTarget";
import profile from "../assets/profile.png";
import { BsEmojiSmile } from "react-icons/bs";
import { LiaWindowClose } from "react-icons/lia";
import { useResponsive } from "../hooks";
import classNames from "classnames";
import { useState } from "react";
import Image from "../assets/PostImage";
import FileUpLoader from "../utilities/FileUpLoader";

const FacebookPost = () => {
  const [message, setMessage] = useState("");
  const [showEmojiInput, setShowEmojiInput] = useState(false);
  const [openUpload, setOpenUpLoad] = useState(false);
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

  const openPicUpload = () => {
    setOpenUpLoad(true);
  };
  const closePicUpload = () => {
    setOpenUpLoad(false);
  };

  return (
    <div
      className={classNames(
        "tw-w-full tw-h-full tw-bg-white tw-rounded-md tw-flex tw-justify-center tw-justify-self-center tw-overflow-auto tw-shadow-[0_3px_10px_rgb(0,0,0,0.2)]",
        {
          // "tw-h-[80%]": isBigScreen,
          // "tw-h-[70%]": isDesktopOrLaptop,
          // "tw-h-[80%] ": isTablet && isPortrait,
          // "tw-h-[70%]  ": isTablet && isLandscape,
          "tw-h-screen tw-relative": isMobile && isLandscape,
        }
      )}
    >
      <div
        className={classNames(
          "tw-grid tw-justify-center tw-justify-self-center tw-w-max  ",
          {
            "tw-grid-cols-6 tw-grid-rows-6 ":
              (isMobile && isPortrait) ||
              (isMobile && isLandscape) ||
              (isTabletOrMobile && !isTablet),
            "tw-grid-cols-8 tw-grid-rows-6 ":
              (isTablet && isPortrait) ||
              (isTablet && isLandscape) ||
              (isTabletOrMobile && !isDesktopOrLaptop && !isMobile),
            "tw-grid-cols-8 tw-grid-rows-8 ": isDesktopOrLaptop && !isTablet,
          }
        )}
      >
        <div
          className={classNames("tw-grid tw-h-max  ", {
            "tw-grid-cols-4 tw-grid-rows-1 tw-col-span-6  tw-row-span-1 tw-col-start-1":
              (isMobile && isPortrait) || (isMobile && isLandscape),
            "tw-grid-cols-3 tw-grid-rows-1 tw-col-span-4  tw-row-span-1 tw-col-start-1  ":
              (isTablet && isPortrait) ||
              (isTablet && isLandscape) ||
              (isTabletOrMobile && !isMobile),
            "tw-grid-cols-3 tw-grid-rows-1 tw-col-span-4 tw-row-span-1 tw-row-start-1 tw-col-start-1 ":
              isDesktopOrLaptop && !isTablet,
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
            " tw-text-xl tw-z-10 tw-w-full tw-h-full tw-border-none tw-resize-none tw-outline-none ",
            {
              "tw-col-start-1 tw-row-start-2 tw-row-span-1 tw-col-span-6 ":
                (isMobile && isPortrait) || (isMobile && isLandscape),
                "tw-col-start-1 tw-row-start-2 tw-row-span-4 tw-col-span-6 ":
                (isMobile && isPortrait) && openUpload === false || (isMobile && isLandscape) && openUpload === false ,

              "tw-col-start-1 tw-row-start-2 tw-row-span-1 tw-col-span-8":
                isTablet && isPortrait ||
                isTablet && isLandscape ||
                isTabletOrMobile && !isMobile,
                "tw-col-start-1 tw-row-start-2 tw-row-span-4 tw-col-span-8":
                isTablet && isPortrait && openUpload === false||
                isTablet && isLandscape && openUpload === false ||
                isTabletOrMobile && !isMobile  && openUpload === false,

              "tw-col-start-1 tw-row-start-2 tw-row-span-2 tw-col-span-8":
                isDesktopOrLaptop && !isTablet,
                "tw-col-start-1 tw-row-start-2 tw-row-span-6 tw-col-span-8":
                isDesktopOrLaptop && !isTablet && openUpload === false ,
            }
          )}
        />

        <BsEmojiSmile
          className={classNames(
            " tw-text-3xl tw-self-end tw-z-10 tw-text-gray-700 hover:tw-bg-gray-300 tw-rounded-full tw-flex  tw-justify-self-end",
            {
              "tw-col-start-6 tw-row-start-2 tw-justify-self-end":
                (isMobile && isPortrait) || (isMobile && isLandscape),
                "tw-col-start-6 tw-row-start-5 tw-justify-self-end ":
                (isMobile && isPortrait)  && openUpload === false  || (isMobile && isLandscape)  && openUpload === false,
              "tw-col-start-7 tw-row-start-2 tw-justify-self-end":
                (isTablet && isPortrait) ||
                (isTablet && isLandscape) ||
                (isTabletOrMobile && !isMobile),
                "tw-col-start-8 tw-row-start-5 tw-justify-self-end":
                isTablet && isPortrait && openUpload === false ||
                isTablet && isLandscape && openUpload === false ||
                isTabletOrMobile && !isMobile && openUpload === false,
              "tw-col-start-8 tw-row-start-3 tw-justify-self-end":
                isDesktopOrLaptop && !isTablet,
                "tw-col-start-8 tw-row-start-7 tw-justify-self-end":
                isDesktopOrLaptop && !isTablet && openUpload === false ,
            }
          )}
          onClick={toggleEmoji}
        />
        <div  className={classNames("tw-flex tw-w-full tw-h-full ", {
            "tw-col-span-6 tw-row-span-3 tw-col-start-1 tw-row-start-3 ":
              (isMobile && isPortrait) || (isMobile && isLandscape),
            "tw-col-span-6 tw-row-span-3 tw-col-start-2 tw-row-start-3  ":
              (isTablet && isPortrait) ||
              (isTablet && isLandscape) ||
              (isTabletOrMobile && !isMobile),
              
            "tw-col-span-10 tw-row-span-4 tw-col-start-1 tw-row-start-4  ":
              isDesktopOrLaptop && !isTablet,
        
          })}
          
        >
          <FileUpLoader isOpen={openUpload} isClose={closePicUpload} />
        </div>

        <div
          className={classNames(
            "tw-grid  tw-border-[1px] tw-h-12 tw-border-gray-300 tw-rounded-md tw-items-center tw-p-4 tw-self-center ",
            {
              "tw-col-start-1 tw-row-start-6 tw-col-span-6 tw-grid-cols-8 tw-grid-rows-1 ":
                (isMobile && isPortrait) || (isMobile && isLandscape),
              "tw-col-start-2 tw-row-start-6 tw-col-span-6 tw-grid-cols-8 tw-grid-rows-1  ":
                (isTablet && isPortrait) ||
                (isTablet && isLandscape) ||
                (isTabletOrMobile && !isMobile),
              "tw-col-start-2 tw-row-start-8 tw-col-span-6 tw-grid-cols-8 tw-grid-rows-1":
                isDesktopOrLaptop && !isTablet,
            }
          )}
        >
          <p className="tw-col-span-2">Add to your post</p>
          <button
            className=" tw-rounded-full tw-w-max tw-h-max tw-justify-self-center hover:tw-bg-gray-300"
            onClick={openPicUpload}
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
        <button
          className={classNames(
            "tw-flex tw-h-10  tw-items-center tw-justify-center tw-p-4 tw-rounded-md tw-bg-green-500  hover:tw-bg-green-400",
            {
              "tw-col-start-1 tw-row-start-7 tw-col-span-6 tw-grid-cols-8 tw-grid-rows-1 ":
                (isMobile && isPortrait) || (isMobile && isLandscape),
              "tw-col-start-2 tw-row-start-7 tw-col-span-6 tw-grid-cols-8 tw-grid-rows-1  ":
                (isTablet && isPortrait) ||
                (isTablet && isLandscape) ||
                (isTabletOrMobile && !isMobile),
              "tw-col-start-3 tw-row-start-9 tw-col-span-4 tw-grid-cols-8 tw-grid-rows-1":
                isDesktopOrLaptop && !isTablet,
            }
          )}
        > Post
         
        </button>
       
      </div>
      {showEmojiInput && (
        <div
          className={classNames(
            "tw-absolute tw-flex tw-w-full  tw-items-center tw-justify-center",
            {
              "tw-h-[40%]":
                (isMobile && isPortrait) || (isMobile && isLandscape),
              "tw-h-[60%]":
                (isTablet && isLandscape) || (isTabletOrMobile && !isMobile),
              "tw-h-[50%]":
                (isTablet && isPortrait) || (isTabletOrMobile && !isMobile),
              "tw-h-[70% ]": isDesktopOrLaptop && !isTablet,
            }
          )}
        >
          <div className=" tw-relative  tw-flex tw-justify-center tw-mt-24 tw-z-20">
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
        </div>
      )}
    </div>
  );
};

export default FacebookPost;
