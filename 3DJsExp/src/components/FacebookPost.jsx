import { CloudUploadOutlined, CloseOutlined } from "@ant-design/icons";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import  DropDownPostTarget  from "./DropDownPostTarget";
import profile from "../assets/profile.png";
import { useDropzone } from "react-dropzone";
import { BsEmojiSmile } from "react-icons/bs";
import {LiaWindowClose} from "react-icons/lia";
import { useResponsive } from "../hooks";
import classNames from "classnames";
import React, { useState } from "react";
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
  console.log(images);
  return (
    <div className="tw-flex tw-flex-col tw-w-full tw-items-center tw-h-[80%] tw-max-h-max  ">
      <div>
        <div className="tw-flex tw-justify-center tw-flex-row tw-w-full tw-gap-x-8">
          {" "}
          <img
            className="tw-w-12 tw-h-12 tw-rounded-full tw-border-2 tw-border-black"
            src={profile}
          ></img>
          <div>
          <p className="  tw-text-xl ">Account Name</p>
          <DropDownPostTarget/>
          </div>
        </div>
      </div>
      <div className={classNames("tw-flex tw-flex-col tw-justify-center tw-h-[80%] ",{
        "tw-w-[40%]": isDesktopOrLaptop,
        "tw-w-[40%] ": isTablet && isPortrait,
        "tw-w-full": isMobile && isPortrait
      })}>
      <textarea
        value={message}
        onChange={handleMessageChange}
        placeholder="คุณกำลังคิดอะไรอยู่"
        className=" tw-text-xl  tw-w-full tw-h-full tw-border-none tw-resize-none tw-outline-none"
      />
      <BsEmojiSmile
        className=" tw-text-3xl  tw-self-end tw-text-gray-700 hover:tw-bg-gray-300 tw-rounded-full tw-flex"
        onClick={toggleEmoji}
      />
      </div>
      
      {showEmojiInput && (
        <div className=" tw-absolute tw-flex tw-justify-center   tw-z-20">
          <EmojiPicker
            classNames="tw-relative"
            emojiStyle={EmojiStyle.NATIVE}
            onEmojiClick={(emoji) => showEmo(emoji)}
            // height="20rem"
          />
          <button className="tw-absolute tw-top-0 tw-right-0"
          onClick={toggleEmoji}
          >
            <LiaWindowClose className="tw-text-2xl  tw-bg-red-500"/>
            </button>
        </div>
      )}
      {isShow && (
        <div
          className={classNames("tw-relative tw-z-10 tw-w-[40%]", {
            " tw-w-[40%]": isDesktopOrLaptop,
            "tw-w-full": isTabletOrMobile && isPortrait,
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
              "tw-flex tw-justify-center tw-items-center tw-border-dashed tw-border-2 tw-z-10 tw-w-full tw-flex-col tw-h-64 tw-bg-gray-100  hover:tw-bg-gray-200 tw-border-gray-400 tw-rounded-md",
              {
                " tw-w-full tw-min-w-full": isMobile  && isPortrait,
              }
            )}
          >
            <input {...getInputProps()} className="tw-w-full" />
            <CloudUploadOutlined className="tw-text-4xl" />
            <p>Drop files here </p>
            <div>{images}</div>
          </div>
        </div>
      )}
      
      <div className=" tw-flex tw-h-[50%] tw-w-full tw-items-end tw-justify-center ">
      <div
        className={classNames("tw-flex tw-flex-row tw-h-12  tw-border-[1px]  tw-border-gray-300 tw-rounded-md tw-justify-center tw-items-center tw-gap-x-4 ",{
          "tw-w-[40%]": isDesktopOrLaptop,
          " tw-w-full": isMobile && isPortrait
        })}
      >
        <p className="tw-col-span-2">Add to your post</p>
        <button
          className=" tw-rounded-full tw-w-max  hover:tw-bg-gray-300"
          onClick={() => setIsShow(true)}
        >
          <img className="tw-w-6 tw-h-6 " src={Image.selectPic} />
        </button>
        <img className="tw-w-6 tw-h-6" src={Image.tagOther} />
        <img className="tw-w-6 tw-h-6" src={Image.emoji} />
        <img className="tw-w-6 tw-h-6" src={Image.checkIn} />
        <img className="tw-w-6 tw-h-6" src={Image.Gif} />
        <button
          className="tw-rounded-full tw-flex tw-justify-center
           hover:tw-bg-gray-200 tw-w-6 tw-h-6 tw-items-center tw-text-center"
        >
          {" "}
          ...
        </button>
      </div>
      </div>
     
    </div>
  );
};

export default FacebookPost;
