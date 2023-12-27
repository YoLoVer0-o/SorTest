import { useState } from "react";
import SelectPlatform from "../../utilities/SelectPlatform";
import FacebookPost from "./FacebookPost";
// import InstagramPost from "./InstagramPost";
import TwitterPost from "./TwitterPost";
import { useResponsive } from "../../hooks";
import classNames from "classnames";
const CreatePost = () => {
  const {
    isDesktopOrLaptop,
    isBigScreen,
    isTabletOrMobile,
    isMobile,
    isTablet,
    isPortrait,
    isLandscape,
  } = useResponsive();
  const [selectedPlatform, setSelectedPlatform] = useState("");

  const handlePlatformSelect = (platform) => {
    setSelectedPlatform(platform);
  };

  let selectedComponent;

  if (selectedPlatform === "Twitter") {
    selectedComponent = <TwitterPost />;
  } else if(selectedPlatform === "Facebook") {
    selectedComponent = <FacebookPost />;
  } else {
    selectedComponent = <FacebookPost />;
  }

  return (
    <div className="tw-w-screen tw-h-full tw-max-h-full tw-gap-y-5 tw-p-4 tw-overflow-auto tw-flex tw-flex-col tw-items-center">
      <div className="tw-flex tw-justify-center ">Createpost</div>
      <SelectPlatform onPlatformSelect={handlePlatformSelect} />

      <div
        className={classNames(
          "tw-flex tw-h-full  tw-justify-center tw-items-center tw-justify-self-center",
          {
            "tw-w-full ": isMobile,
            "tw-w-[80%] tw-h-[80%]": isTablet && isPortrait || isLandscape && !isDesktopOrLaptop && !isMobile,
            
            "tw-w-[40%] ": isDesktopOrLaptop,
          }
        )}
      >
        {selectedComponent}
      </div>
    </div>
  );
};

export default CreatePost;
