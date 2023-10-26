import profile from "../assets/profile.png";
import { InboxOutlined } from "@ant-design/icons";
import React, { useState } from "react";
const CreatePostUtil = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
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
        {/* <div className="image-upload-slot ">
          <label htmlFor="file-upload" className="upload-button">
            Upload Image
          </label>
          <input
            type="file"
            id="file-upload"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            
          />
          {selectedImage && (
            <div className="image-preview">
              <img src={selectedImage} 
               alt="Selected" 
               className="tw-w-32 tw-h-32"
               />
            </div>
          )}
        </div> */}
        <input onDrag={}>
        </input>
      </div>
    </div>
  );
};

export default CreatePostUtil;
