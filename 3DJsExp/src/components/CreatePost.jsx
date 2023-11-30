import React, { useState } from "react";
import { FloatButton, Tooltip } from "antd";
import SelectPlatform from "../utilities/SelectPlatform";
import FacebookPost from "./FacebookPost";
import InstagramPost from "./InstagramPost";
import TwitterPost from "./TwitterPost";

const CreatePost = () => {
  const [selectedPlatform, setSelectedPlatform] = useState("");

  const handlePlatformSelect = (platform) => {
    setSelectedPlatform(platform);
  };

  let selectedComponent;

  if (selectedPlatform === "Twitter") {
    selectedComponent = <TwitterPost />;
  } else if (selectedPlatform === "Instagram") {
    selectedComponent = <InstagramPost />;
  } else if (selectedPlatform === "Facebook") {
    selectedComponent = <FacebookPost />;
  } else {
    selectedComponent = <FacebookPost />;
  }

  return (
    <div className="tw-w-screen  tw-h-full tw-max-h-full tw-p-4 tw-overflow-auto">
      <div className="tw-flex tw-justify-center ">Createpost</div>
      <SelectPlatform onPlatformSelect={handlePlatformSelect} />
      <hr className="tw-h-px tw-my-8 tw-bg-gray-200 tw-border-0 dark:tw-bg-gray-700"></hr>
      
      {selectedComponent}
    </div>
  );
};

export default CreatePost;
