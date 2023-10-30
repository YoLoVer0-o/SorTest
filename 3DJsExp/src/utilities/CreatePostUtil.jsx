import profile from "../assets/profile.png";
import { useDropzone } from "react-dropzone";
import { CloudUploadOutlined, CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useState } from "react";
import Image from "../assets/PostImage";
import EmojiPicker from "emoji-picker-react";

const CreatePostUtil = () => {
  const [isShow, setIsShow] = useState(true);
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
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
    <div className="tw-w-full tw-flex tw-justify-center  ">
      <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-y-4 tw-w-[80%] tw-border-2">
        <div className="tw-flex tw-flex-row tw-items-center tw-gap-x-8">
          <img
            className="tw-w-12 tw-h-12 tw-rounded-full tw-border-2 tw-border-black"
            src={profile}
          ></img>
          <p className="  tw-text-xl ">Account Name</p>
        </div>
        {/* <textarea
          rows={4}
          cols={40}
          placeholder="คุณกำลังคิดอะไรอยู่"
          className=" tw-text-xl tw-border-none tw-resize-none tw-outline-none"
        /> */}
        {isShow && (
          <div className="tw-relative tw-w-[50%]">
            <Button
              className="tw-text-black tw-absolute tw-border-black tw-flex tw-right-1 tw-bg-red-800 tw-top-1 tw-z-40 tw-justify-center 
            tw-items-center tw-justify-self-end  "
              icon={<CloseOutlined />}
              onClick={() => setIsShow(!isShow)}
              shape="circle"
            ></Button>
            <div
              {...getRootProps()}
              className=" tw-flex  tw-justify-center tw-items-center tw-border-[1px] tw-z-10 tw-w-full
           tw-flex-col tw-h-64 tw-bg-gray-200 tw-border-gray-400 tw-rounded-md hover:tw-bg-gray-300"
            >
              <input {...getInputProps()} />
              <CloudUploadOutlined className="tw-text-4xl" />
              <p>Drop files here </p>
            </div>
          </div>
        )}

        <div>{images}</div>
        <div className="tw-flex tw-flex-row tw-gap-x-8 tw-border-[1px] tw-p-2 tw-items-center tw-rounded-md tw-border-gray-400 tw-h-12">
          <p>Add to your post</p>
          <button onClick={() => setIsShow(true)}>
            <img className="tw-w-6 tw-h-6" src={Image.selectPic} />
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

export default CreatePostUtil;
