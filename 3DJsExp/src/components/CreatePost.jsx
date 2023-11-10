import React from "react";
import SelectPlatform from "../utilities/SelectPlatform";
import CreatePostUtil from "./CreatePostUtil";
import TwitterPost from "./TwitterPost";

const CreatePost = () => {
  return (
    <div className="tw-w-screen tw-h-full tw-p-4">
        <div className="tw-flex tw-justify-center ">Createpost</div>
        <SelectPlatform  />
        <hr className="tw-h-px tw-my-8 tw-bg-gray-200 tw-border-0 dark:tw-bg-gray-700"></hr>
       <CreatePostUtil />
       <TwitterPost />

    </div>
  );
};

export default CreatePost;
