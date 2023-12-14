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

  const openPicUpload = () => {
    setOpenUpLoad(true);
  };
  const closePicUpload = () => {
    setOpenUpLoad(false);
  };

  return (
    <div
      className={classNames(
        "tw-w-full tw-border-[#0874c4] tw-h-[70%] tw-border-solid tw-border-2 tw-flex tw-justify-center tw-overflow-auto",
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
          "tw-grid tw-justify-center tw-justify-self-center tw-w-max tw-grid-cols-12 tw-grid-rows-8 ",
          {
            "tw-grid-cols-12 tw-grid-rows-8 ": isDesktopOrLaptop,
            "tw-grid-cols-8 tw-grid-rows-6 ":
              (isTablet && isPortrait) || (isTablet && isLandscape),
            "tw-grid-cols-6 tw-grid-rows-6 ":
              (isMobile && isPortrait) || (isMobile && isLandscape),
          }
        )}
      >
        <div
          className={classNames("tw-grid tw-h-max tw-grid-cols-3 tw-grid-rows-1 tw-col-span-4 tw-row-span-1 tw-row-start-1 tw-col-start-5  ", {
            "tw-grid-cols-3 tw-grid-rows-1 tw-col-span-4 tw-row-span-1 tw-row-start-1 tw-col-start-5 ":
              isDesktopOrLaptop,
            "tw-grid-cols-3 tw-grid-rows-1 tw-col-span-4  tw-row-span-1 tw-col-start-3  ":
              (isTablet && isPortrait) || (isTablet && isLandscape),
            "tw-grid-cols-4 tw-grid-rows-1 tw-col-span-6  tw-row-span-1 tw-col-start-1":
              (isMobile && isPortrait) || (isMobile && isLandscape),
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
            " tw-text-xl tw-w-full tw-h-full tw-border-none tw-resize-none tw-outline-none tw-col-start-5 tw-row-start-2 tw-row-span-2 tw-col-span-4",
            {
              "tw-col-start-5 tw-row-start-2 tw-row-span-2 tw-col-span-4":
                isDesktopOrLaptop,
              "tw-col-start-3 tw-row-start-2 tw-row-span-1 tw-col-span-4":
                (isTablet && isPortrait) || (isTablet && isLandscape),
              "tw-col-start-2 tw-row-start-2 tw-row-span-1 tw-col-span-4 ":
                (isMobile && isPortrait) || (isMobile && isLandscape),
            }
          )}
        />

        <BsEmojiSmile
          className={classNames(
            " tw-text-3xl tw-self-end  tw-text-gray-700 hover:tw-bg-gray-300 tw-rounded-full tw-flex tw-col-start-9 tw-row-start-3 tw-justify-self-end",
            {
              "tw-col-start-9 tw-row-start-3 tw-justify-self-end":
                isDesktopOrLaptop,
              "tw-col-start-7 tw-row-start-2 tw-justify-self-end":
                (isTablet && isPortrait) || (isTablet && isLandscape),
              "tw-col-start-6 tw-row-start-2 tw-justify-self-end":
                (isMobile && isPortrait) || (isMobile && isLandscape),
            }
          )}
          onClick={toggleEmoji}
        />
        <div
          className={classNames("tw-flex tw-w-full tw-h-full tw-col-span-6 tw-row-span-4 tw-col-start-4 tw-row-start-4 ", {
            "tw-col-span-6 tw-row-span-4 tw-col-start-4 tw-row-start-4 ":
              isDesktopOrLaptop,
            "tw-col-span-6 tw-row-span-3 tw-col-start-2 tw-row-start-3  ":
              (isTablet && isPortrait) || (isTablet && isLandscape),
            "tw-col-span-4 tw-row-span-3 tw-col-start-2 tw-row-start-3 ":
              (isMobile && isPortrait) || (isMobile && isLandscape),
          })}
        >  
          <FileUpLoader isOpen={openUpload} isClose={closePicUpload} />
        </div>

        <div
          className={classNames(
            "tw-grid  tw-border-[1px] tw-h-12 tw-border-gray-300 tw-rounded-md tw-items-center tw-p-4 tw-self-center tw-col-start-4 tw-row-start-8 tw-col-span-6 tw-grid-cols-8 tw-grid-rows-1",
            {
              "tw-col-start-4 tw-row-start-8 tw-col-span-6 tw-grid-cols-8 tw-grid-rows-1":
                isDesktopOrLaptop,
              "tw-col-start-2 tw-row-start-6 tw-col-span-6 tw-grid-cols-8 tw-grid-rows-1  ":
                (isTablet && isPortrait) || (isTablet && isLandscape),
              "tw-col-start-1 tw-row-start-6 tw-col-span-6 tw-grid-cols-8 tw-grid-rows-1 ":
                (isMobile && isPortrait) || (isMobile && isLandscape),
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
