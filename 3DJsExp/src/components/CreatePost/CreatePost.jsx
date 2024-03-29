import { useState, useEffect } from "react";
import { Select, } from "antd";
import FacebookPost from "./FacebookPost";
import TwitterPost from "./TwitterPost";
import { useResponsive } from "../../hooks";
import classNames from "classnames";
import { useSelector } from "react-redux";
import postCreateAPI from "../../service/postCreateAPI";
import { getLogin } from "../../libs/loginSlice";
import twitterCreatePostAPI from "../../service/twitterCreatePostAPI";

const CreatePost = () => {
  const {
    isDesktopOrLaptop,
    // isBigScreen,
    // isTabletOrMobile,
    isMobile,
    isTablet,
    isPortrait,
    isLandscape,
  } = useResponsive();

  const [selectedPlatform, setSelectedPlatform] = useState("Facebook");
  // const { selected , sentBotData } = props;
  const [botDataFb, setBotDataFb] = useState("");
  const [botDataTwitter, setBotDataTwitter] = useState("");

  const [selectedBot, setSelectedBot] = useState("");
  // const [selectedGroup , setSelectedGroup] =useState()

  const handlePlatformSelect = (platform) => {
    setSelectedPlatform(platform);
  };
  // console.log(selectedPlatform);
  let selectedComponent;
  if (selectedPlatform === "Twitter") {
    selectedComponent = <TwitterPost selectedUser={selectedBot} />;
  } else if (selectedPlatform === "Facebook") {
    selectedComponent = (
      <FacebookPost
        handelBotData={botDataFb}
        selectUser={selectedBot}
        identifier="CreatePost"
      />
    );
  } else {
    selectedComponent = (
      <FacebookPost
        handelBotData={botDataFb}
        selectUser={selectedBot}
        identifier="CreatePost"
      />
    );
  }

  const selectUser = (selectedOption) => {
    setSelectedBot(selectedOption);
  };

  const getToken = useSelector((state) => getLogin(state));

  useEffect(() => {
    const fetchBotConfig = async () => {
      try {
        const data = await postCreateAPI.fbGetBotConfig(getToken);
        setBotDataFb(data);

        // setSelectedGroup(data[0].groups);
      } catch (error) {
        console.error("Error fetching bot config:", error);
      }
    };
    const fetchBotTwitter = async () => {
      try {
        const data = await twitterCreatePostAPI.twitterGetBot(getToken);
        setBotDataTwitter(data);
      } catch (error) {
        console.error("Error fetching bot config:", error);
      }
    };
    fetchBotTwitter();
    fetchBotConfig();
  }, [getToken]);

  // Format Data into an array of objects with value and label properties
  const userOptions = botDataFb
    ? botDataFb.map((bot) => ({
        value: bot.botname,
        label: bot.botname,
      }))
    : [];
  const userTwitterOptions = botDataTwitter
    ? botDataTwitter.map((bot) => ({
        value: bot.botname,
        label: bot.botname,
      }))
    : [];

  return (
    <div className="tw-w-screen tw-h-full tw-max-h-full tw-gap-y-5 tw-p-4 tw-overflow-auto tw-flex tw-flex-col tw-items-center">
      {/* <div className="tw-flex tw-justify-center ">Createpost</div> */}
      <div
        className={classNames(
          "tw-flex tw-flex-row tw-w-full tw-h-40 tw-justify-center tw-p-6 tw-items-center tw-gap-x-8 tw-bg-white tw-shadow-[0_3px_10px_rgb(0,0,0,0.2)]",
          {
            "tw-flex tw-flex-col tw-w-full tw-p-4 tw-h-36 ":
              isMobile && isPortrait,
          }
        )}
      >
        <div
          className={classNames("tw-w-[30%]", {
            "tw-w-full": isMobile && isPortrait,
          })}
        >
          <p>แพลต์ฟอร์ม :</p>
          <Select
            defaultValue="Facebook"
            onChange={handlePlatformSelect}
            className=" tw-w-full"
            value={selectedPlatform}
            options={[
              {
                value: "Facebook",
                label: "Facebook",
              },
              {
                value: "Twitter",
                label: "Twitter",
              },
            ]}
          />
        </div>

        <div
          className={classNames("tw-w-[30%]", {
            "tw-w-full": isMobile && isPortrait,
          })}
        >
          <p>บัญชีที่ใช้โพสต์ :</p>
          <Select
            showSearch
            // defaultValue={}
            onChange={selectUser}
            className="tw-w-full"
            value={selectedBot}
            options={
              (selectedPlatform === "Facebook" && userOptions) ||
              (selectedPlatform === "Twitter" && userTwitterOptions)
            }
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
          />
        </div>
      </div>

      <div
        className={classNames(
          "tw-flex tw-h-full  tw-justify-center tw-items-center tw-justify-self-center",
          {
            "tw-w-full ": isMobile,
            "tw-w-[80%] tw-h-[80%]":
              (isTablet && isPortrait) ||
              (isLandscape && !isDesktopOrLaptop && !isMobile),

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
