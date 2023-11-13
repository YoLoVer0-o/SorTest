import React, { useState } from "react";
import SelectPlatform from "../utilities/SelectPlatform";
import CreatePostUtil from "./CreatePostUtil";
import TwitterPost from "./TwitterPost";

const CreatePost = () => {
  const [selectedPlatform, setSelectedPlatform] = useState("");

  const handlePlatformSelect = (platform) => {
    setSelectedPlatform(platform);
  };

  let selectedComponent;

  // Conditionally assign the component based on the selected platform
  if (selectedPlatform === "Twitter") {
    selectedComponent = <TwitterPost />;
  } else if (selectedPlatform === "Instagram") {
    selectedComponent = <CreatePostUtil />;
  } else if (selectedPlatform === "Facebook") {
    selectedComponent = <CreatePostUtil />;
  } else {
    selectedComponent = <CreatePostUtil />;
  }

  return (
    <div className="tw-w-screen tw-h-full tw-p-4">
      <div className="tw-flex tw-justify-center ">Createpost</div>
      <SelectPlatform onPlatformSelect={handlePlatformSelect} />
      <hr className="tw-h-px tw-my-8 tw-bg-gray-200 tw-border-0 dark:tw-bg-gray-700"></hr>
      
      {selectedComponent}
    </div>
  );
};

export default CreatePost;
