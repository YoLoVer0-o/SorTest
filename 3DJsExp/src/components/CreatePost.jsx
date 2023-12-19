import { useState } from "react";
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
    <div className="tw-w-screen tw-h-full tw-max-h-full  tw-p-4 tw-overflow-auto tw-flex tw-flex-col tw-items-center">
      <div className="tw-flex tw-justify-center ">Createpost</div>
      <SelectPlatform onPlatformSelect={handlePlatformSelect} />
      <hr className="tw-h-px tw-my-8 tw-bg-gray-200 tw-border-0 dark:tw-bg-gray-700"></hr>
      <div className="tw-flex tw-h-full tw-w-[55%] tw-justify-center tw-items-center tw-justify-self-center">
        {selectedComponent}
      </div>
    </div>
  );
};

export default CreatePost;
