import profile from "../assets/profile.png";
import {useDropzone} from "react-dropzone"
import { InboxOutlined } from "@ant-design/icons";
import React, { useState } from "react";

const CreatePostUtil = () => {

  const [files ,setFiles] = useState([])
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles.map((file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })))
      )
    }
  })

const images = files.map((file) => (
  <div key={file.name}>
    <div>
      <img src={file.preview} className=" tw-w-40 " alt="preview"/>
    </div>
  </div>
))

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

        <div {...getRootProps()} className=" tw-border-2 tw-w-[50%] tw-h-64">
          <input {...getInputProps()} />
          <p>Drop files here </p>
        </div>
        <div>{images}</div>
      </div>
    </div>
  );
};

export default CreatePostUtil;
