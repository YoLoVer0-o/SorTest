import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import { Radio, Space, Input } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import { FaSortDown } from "react-icons/fa";
import profile from "../../assets/profile.png";
import { BsEmojiSmile } from "react-icons/bs";
import { LiaWindowClose } from "react-icons/lia";
import { useResponsive } from "../../hooks";
import { facebookAcc } from "../../mock";
import classNames from "classnames";
import { useState, useRef,  } from "react";
import Image from "../../assets/PostImage";
import FileUpLoader from "../../utilities/FileUpLoader";
import PostTag from "../../assets/PostTag";
import "./Trainsition.css";
import {
  // Transition,
  CSSTransition,
  SwitchTransition,
  // TransitionGroup,
} from "react-transition-group";

const FacebookPost = () => {
  const [message, setMessage] = useState("");
  const [showEmojiInput, setShowEmojiInput] = useState(false);
  const [openUpload, setOpenUpLoad] = useState(false);
  const [currentId, setCurrentId] = useState(1);
  const [changeLable, setChangeLable] = useState([
    { name: "เพื่อน", icon: PostTag.tagFriend },
  ]);
  const [value, setValue] = useState("เพื่อน");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFacebookAcc, setFilteredFacebookAcc] = useState(facebookAcc);

  const nodeRef = useRef(null);
  const { Search } = Input;

  const reset = () => {
    setCurrentId(1);
    setSearchTerm("");
    setFilteredFacebookAcc(facebookAcc);
  };

  const switchContentPostTaget = () => {
    setCurrentId(2);
  };

  const switchContentTag = () => {
    setCurrentId(3);
  };
   const switchEmotion = () => {
     setCurrentId(4);
   };
     const switchLocationPicker= () => {
       setCurrentId(5);
     };

  const duration = 500;

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

  const openPicUpload = () => {
    setOpenUpLoad(true);
  };
  const closePicUpload = () => {
    setOpenUpLoad(false);
  };
  //////////////////////////PostTargets////////////////////////
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const confirmButton = (name, icon) => {
    // setChangeLable(value);
    setCurrentId(1);
    if (value == "สาธารณะ") {
      name = "สาธารณะ";
      icon = PostTag.publicPost;
    } else if (value == "เพื่อน") {
      name = "เพื่อน";
      icon = PostTag.tagFriend;
    } else if (value == "เพื่อนยกเว้น ...") {
      name = "เพื่อนยกเว้น ...";
      icon = PostTag.tagExceptFriend;
    } else if (value == "เฉพาะฉัน") {
      name = "เฉพาะฉัน";
      icon = PostTag.onlyMe;
    } else if (value == "เพื่อนที่เจาะจง") {
      name = "เพื่อนที่เจาะจง";
      icon = PostTag.tagSome;
    } else if (value == "กำหนดเอง") {
      name = "กำหนดเอง";
      icon = PostTag.custom;
    }
    const updatedLabel = {
      name,
      icon,
    };
    setChangeLable(updatedLabel);
    setCurrentId(1);
  };

  console.log(changeLable);
  // console.log(value);

  ///////////////////////Tags////////////////////////////////////
  const onSearch = (value, _e, info) => {
    console.log(info?.source, value);
    setSearchTerm(value);

    // Filter the facebookAcc array based on the search term
    const filteredArray = facebookAcc.filter(
      (item) =>
        item.first_name.toLowerCase().includes(value.toLowerCase()) ||
        item.last_name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredFacebookAcc(filteredArray);
  };

  // const reset = () => {
  //   setSearchTerm('');
  //   setFilteredFacebookAcc(facebookAcc);
  // };

  
  const contentArray = [
    {
      id: 1,
      content: (
        <div
          className={classNames(
            "tw-grid tw-justify-center tw-justify-self-center tw-w-max  ",
            {
              "tw-grid-cols-6 tw-grid-rows-6 ":
                (isMobile && isPortrait) ||
                (isMobile && isLandscape) ||
                (isTabletOrMobile && !isTablet),
              "tw-grid-cols-8 tw-grid-rows-6 ":
                (isTablet && isPortrait) ||
                (isTablet && isLandscape) ||
                (isTabletOrMobile && !isDesktopOrLaptop && !isMobile),
              "tw-grid-cols-8 tw-grid-rows-8 ": isDesktopOrLaptop && !isTablet,
            }
          )}
        >
          <div
            className={classNames("tw-grid tw-h-max  ", {
              "tw-grid-cols-4 tw-grid-rows-1 tw-col-span-6  tw-row-span-1 tw-col-start-1":
                (isMobile && isPortrait) || (isMobile && isLandscape),
              "tw-grid-cols-3 tw-grid-rows-1 tw-col-span-4  tw-row-span-1 tw-col-start-1  ":
                (isTablet && isPortrait) ||
                (isTablet && isLandscape) ||
                (isTabletOrMobile && !isMobile),
              "tw-grid-cols-3 tw-grid-rows-1 tw-col-span-4 tw-row-span-1 tw-row-start-1 tw-col-start-1 ":
                isDesktopOrLaptop && !isTablet,
            })}
          >
            <img
              className="tw-col-start-1 tw-justify-self-center tw-w-12 tw-h-12 tw-rounded-full tw-border-2 tw-border-black"
              src={profile}
            />
            <div className="tw-col-start-2 tw-col-span-3">
              <p className="  tw-text-xl">Account Name</p>
              <button
                onClick={switchContentPostTaget}
                className="tw-h-max tw-w-28 tw-bg-gray-200 tw-rounded-md tw-justify-center tw-flex tw-flex-row "
              >
                <img
                  className="tw-bg-gray-200 tw-flex tw tw-justify-self-start tw-self-center tw-w-4 tw-h-4 tw-rounded-full "
                  src={changeLable.icon || PostTag.tagFriend}
                />
                {changeLable.name || "เพื่อน"}
                <FaSortDown />
              </button>
            </div>
          </div>
          <textarea
            value={message}
            onChange={handleMessageChange}
            placeholder="คุณกำลังคิดอะไรอยู่"
            className={classNames(
              " tw-text-xl tw-z-10 tw-w-full tw-h-full tw-border-none tw-resize-none tw-outline-none ",
              {
                "tw-col-start-1 tw-row-start-2 tw-row-span-1 tw-col-span-6 ":
                  (isMobile && isPortrait) || (isMobile && isLandscape),
                "tw-col-start-1 tw-row-start-2 tw-row-span-4 tw-col-span-6 ":
                  (isMobile && isPortrait && openUpload === false) ||
                  (isMobile && isLandscape && openUpload === false),

                "tw-col-start-1 tw-row-start-2 tw-row-span-1 tw-col-span-8":
                  (isTablet && isPortrait) ||
                  (isTablet && isLandscape) ||
                  (isTabletOrMobile && !isMobile),
                "tw-col-start-1 tw-row-start-2 tw-row-span-4 tw-col-span-8":
                  (isTablet && isPortrait && openUpload === false) ||
                  (isTablet && isLandscape && openUpload === false) ||
                  (isTabletOrMobile && !isMobile && openUpload === false),

                "tw-col-start-1 tw-row-start-2 tw-row-span-2 tw-col-span-8":
                  isDesktopOrLaptop && !isTablet,
                "tw-col-start-1 tw-row-start-2 tw-row-span-6 tw-col-span-8":
                  isDesktopOrLaptop && !isTablet && openUpload === false,
              }
            )}
          />

          <BsEmojiSmile
            className={classNames(
              " tw-text-3xl tw-self-end tw-z-10 tw-text-gray-700 hover:tw-bg-gray-300 tw-rounded-full tw-flex  tw-justify-self-end",
              {
                "tw-col-start-6 tw-row-start-2 tw-justify-self-end":
                  (isMobile && isPortrait) || (isMobile && isLandscape),
                "tw-col-start-6 tw-row-start-5 tw-justify-self-end ":
                  (isMobile && isPortrait && openUpload === false) ||
                  (isMobile && isLandscape && openUpload === false),
                "tw-col-start-7 tw-row-start-2 tw-justify-self-end":
                  (isTablet && isPortrait) ||
                  (isTablet && isLandscape) ||
                  (isTabletOrMobile && !isMobile),
                "tw-col-start-8 tw-row-start-5 tw-justify-self-end":
                  (isTablet && isPortrait && openUpload === false) ||
                  (isTablet && isLandscape && openUpload === false) ||
                  (isTabletOrMobile && !isMobile && openUpload === false),
                "tw-col-start-8 tw-row-start-3 tw-justify-self-end":
                  isDesktopOrLaptop && !isTablet,
                "tw-col-start-8 tw-row-start-7 tw-justify-self-end":
                  isDesktopOrLaptop && !isTablet && openUpload === false,
              }
            )}
            onClick={toggleEmoji}
          />
          <div
            className={classNames("tw-flex tw-w-full tw-h-full ", {
              "tw-col-span-6 tw-row-span-3 tw-col-start-1 tw-row-start-3 ":
                (isMobile && isPortrait) || (isMobile && isLandscape),
              "tw-col-span-6 tw-row-span-3 tw-col-start-2 tw-row-start-3  ":
                (isTablet && isPortrait) ||
                (isTablet && isLandscape) ||
                (isTabletOrMobile && !isMobile),

              "tw-col-span-10 tw-row-span-4 tw-col-start-1 tw-row-start-4  ":
                isDesktopOrLaptop && !isTablet,
            })}
          >
            {/* <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={10}
              center={center}
            >
              <Marker position={center} />
            </GoogleMap> */}

            <FileUpLoader isOpen={openUpload} isClose={closePicUpload} />
          </div>

          <div
            className={classNames(
              "tw-grid  tw-border-[1px] tw-h-12 tw-border-gray-300 tw-rounded-md tw-items-center tw-p-4 tw-self-center ",
              {
                "tw-col-start-1 tw-row-start-6 tw-col-span-6 tw-grid-cols-8 tw-grid-rows-1 ":
                  (isMobile && isPortrait) || (isMobile && isLandscape),
                "tw-col-start-1 tw-row-start-6 tw-col-span-8 tw-grid-cols-8 tw-grid-rows-1  ":
                  (isTablet && isPortrait) ||
                  (isTablet && isLandscape) ||
                  (isTabletOrMobile && !isMobile),
                "tw-col-start-1 tw-row-start-8 tw-col-span-8 tw-grid-cols-8 tw-grid-rows-1":
                  isDesktopOrLaptop && !isTablet,
              }
            )}
          >
            <p className="tw-col-span-2">Add to your post</p>
            <button
              className=" tw-rounded-full tw-w-max tw-h-max tw-justify-self-center hover:tw-bg-gray-300"
              onClick={openPicUpload}
            >
              <img className="tw-w-6 tw-h-6 " src={Image.selectPic} />
            </button>
            <button
              onClick={switchContentTag}
              className=" tw-rounded-full tw-w-max tw-h-max tw-justify-self-center hover:tw-bg-gray-300"
            >
              <img className="tw-w-6 tw-h-6" src={Image.tagOther} />
            </button>
            <button
              onClick={switchEmotion}
              className=" tw-rounded-full tw-w-max tw-h-max tw-justify-self-center hover:tw-bg-gray-300"
            >
              <img className="tw-w-6 tw-h-6" src={Image.emoji} />
            </button>
            <button
              onClick={switchLocationPicker}
              className=" tw-rounded-full tw-w-max tw-h-max tw-justify-self-center hover:tw-bg-gray-300"
            >
              <img className="tw-w-6 tw-h-6" src={Image.checkIn} />
            </button>
            <button className=" tw-rounded-full tw-w-max tw-h-max tw-justify-self-center hover:tw-bg-gray-300">
              <img className="tw-w-6 tw-h-6" src={Image.Gif} />
            </button>
            <button
              className="tw-rounded-full  tw-justify-self-center
   hover:tw-bg-gray-200 tw-w-6 tw-h-6 "
            >
              ...
            </button>
          </div>
          <button
            className={classNames(
              "tw-flex tw-h-10  tw-items-center tw-justify-center tw-p-4 tw-rounded-md tw-bg-green-500  hover:tw-bg-green-400",
              {
                "tw-col-start-1 tw-row-start-7 tw-col-span-6 tw-grid-cols-8 tw-grid-rows-1 ":
                  (isMobile && isPortrait) || (isMobile && isLandscape),
                "tw-col-start-2 tw-row-start-7 tw-col-span-6 tw-grid-cols-8 tw-grid-rows-1  ":
                  (isTablet && isPortrait) ||
                  (isTablet && isLandscape) ||
                  (isTabletOrMobile && !isMobile),
                "tw-col-start-3 tw-row-start-9 tw-col-span-4 tw-grid-cols-8 tw-grid-rows-1":
                  isDesktopOrLaptop && !isTablet,
              }
            )}
          >
            Post
          </button>
        </div>
      ),
    },
    {
      id: 2,
      content: (
        <div className="tw-flex  tw-flex-col tw-w-full tw-h-full ">
          <Radio.Group
            onChange={(e) => onChange(e)}
            value={value}
            className="tw-w-full tw-flex"
          >
            <Space direction="vertical" className="tw-w-full">
              <Radio
                value={"สาธารณะ"}
                label="สาธารณะ"
                className=" hover:tw-bg-gray-200 tw-items-center tw-rounded-md tw-h-16 tw-w-full"
              >
                <div className="tw-flex tw-flex-row tw-items-center tw-gap-x-2">
                  <img
                    className="tw-bg-gray-200 tw-rounded-full tw-p-3"
                    src={PostTag.publicPost}
                  />
                  <p> สาธารณะ</p>
                </div>
              </Radio>
              <Radio
                value={"เพื่อน"}
                label="เพื่อน"
                className="hover:tw-bg-gray-200 tw-items-center tw-rounded-md tw-h-16 tw-w-full"
              >
                <div className="tw-flex tw-flex-row tw-items-center tw-gap-x-2">
                  <img
                    className="tw-bg-gray-200 tw-rounded-full tw-p-3"
                    src={PostTag.tagFriend}
                  />
                  <p>เพื่อน</p>
                </div>
              </Radio>
              <Radio
                value={"เพื่อนยกเว้น ..."}
                label="เพื่อนยกเว้น ..."
                className="hover:tw-bg-gray-200 tw-items-center tw-rounded-md tw-h-16 tw-w-full"
              >
                <div className="tw-flex tw-flex-row tw-items-center tw-gap-x-2">
                  <img
                    className="tw-bg-gray-200 tw-rounded-full tw-p-3"
                    src={PostTag.tagExceptFriend}
                  />
                  <p>เพื่อนยกเว้น ...</p>
                </div>
              </Radio>
              <Radio
                value={"เฉพาะฉัน"}
                label="เฉพาะฉัน"
                className="hover:tw-bg-gray-200 tw-items-center tw-rounded-md tw-h-16 tw-w-full"
              >
                <div className="tw-flex tw-flex-row tw-items-center tw-gap-x-2">
                  <img
                    className="tw-bg-gray-200 tw-rounded-full tw-p-3"
                    src={PostTag.onlyMe}
                  />
                  <p>เฉพาะฉัน</p>
                </div>
              </Radio>
              <Radio
                value={"เพื่อนที่เจาะจง"}
                label="เพื่อนที่เจาะจง"
                className="hover:tw-bg-gray-200 tw-items-center tw-rounded-md tw-h-16 tw-w-full"
              >
                <div className="tw-flex tw-flex-row tw-items-center tw-gap-x-2">
                  <img
                    className="tw-bg-gray-200 tw-rounded-full tw-p-3"
                    src={PostTag.tagSome}
                  />
                  <p>เพื่อนที่เจาะจง</p>
                </div>
              </Radio>
              <Radio
                value={"กำหนดเอง"}
                label="กำหนดเอง"
                className="hover:tw-bg-gray-200 tw-items-center tw-rounded-md tw-h-16 tw-w-full"
              >
                <div className="tw-flex tw-flex-row tw-items-center tw-gap-x-2">
                  <img
                    className="tw-bg-gray-200 tw-rounded-full tw-p-3"
                    src={PostTag.custom}
                  />
                  <p>กำหนดเอง</p>
                </div>
              </Radio>
            </Space>
          </Radio.Group>
          <div className="tw-grid tw-grid-cols-2 tw-gap-x-2 tw-items-end tw-w-full ">
            <button onClick={reset} className="tw-bg-gray-200 tw-rounded-md">
              ยกเลิก
            </button>
            <button
              onClick={confirmButton}
              className="tw-bg-blue-600 tw-text-white tw-rounded-md"
            >
              เรียบร้อย
            </button>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      content: (
        <div className="tw-w-full tw-h-full tw-flex-col tw-flex ">
          <div className="">
            <button onClick={reset}>Back</button>
            <div className="tw-text-center">เท็กผู้คน</div>
            <Search placeholder="ค้นหา" allowClear onSearch={onSearch} />
          </div>
          <div
            className={classNames(
              "tw-flex tw-overflow-y-auto tw-w-full tw-flex-col tw-p-5 tw-gap-y-2  ",
              {
                "tw-h-[22rem]": isMobile && isPortrait,
                "tw-h-[42rem]": isTablet && isPortrait,
                "tw-h-[25rem]": isDesktopOrLaptop || (isTablet && isLandscape),
              }
            )}
          >
            {filteredFacebookAcc.map((item) => (
              <div
                key={item.id}
                className="tw-flex  tw-flex-row tw-h-max tw-w-full tw-rounded-md tw-gap-5 hover:tw-bg-gray-100 "
              >
                <img
                  src={item.profilePic}
                  className="tw-w-10 tw-h-10 tw-rounded-full tw-self-center tw-object-cover "
                  alt={`Profile-${item.profilePic}`}
                />
                <div className="tw-self-center">
                  {item.first_name} {item.last_name}
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 4,
      content: (
        <div className="tw-w-full tw-h-full tw-flex-col tw-flex ">
          <div>
            <button onClick={reset}>Back</button>
            <div className="tw-text-center">Emotion&Activity</div>
          </div>
        </div>
      ),
    },
    {
      id: 5,
      content: (
        <div className="tw-w-full tw-h-full tw-flex-col tw-flex ">
          <div>
            <button onClick={reset}>Back</button>
            <div className="tw-text-center">Location</div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div
      className={classNames(
        "tw-w-full tw-h-full tw-p-5 tw-bg-white tw-rounded-md tw-flex tw-justify-center tw-justify-self-center tw-overflow-auto tw-shadow-[0_3px_10px_rgb(0,0,0,0.2)]",
        {
          // "tw-h-[80%]": isBigScreen,
          // "tw-h-[70%]": isDesktopOrLaptop,
          // "tw-h-[80%] ": isTablet && isPortrait,00
          // "tw-h-[70%]  ": isTablet && isLandscape,
          "tw-h-screen tw-relative": isMobile && isLandscape,
        }
      )}
    >
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={currentId}
          nodeRef={nodeRef}
          timeout={duration}
          classNames="fade"
        >
          <div className="fade " ref={nodeRef}>
            {contentArray.find((item) => item.id === currentId)?.content}
          </div>
        </CSSTransition>
      </SwitchTransition>

      {showEmojiInput && (
        <div
          className={classNames(
            "tw-absolute tw-flex tw-w-full  tw-items-center tw-justify-center",
            {
              "tw-h-[40%]":
                (isMobile && isPortrait) || (isMobile && isLandscape),
              "tw-h-[60%]":
                (isTablet && isLandscape) || (isTabletOrMobile && !isMobile),
              "tw-h-[50%]":
                (isTablet && isPortrait) || (isTabletOrMobile && !isMobile),
              "tw-h-[70% ]": isDesktopOrLaptop && !isTablet,
            }
          )}
        >
          <div className=" tw-relative  tw-flex tw-justify-center tw-mt-24 tw-z-20">
            <EmojiPicker
              classNames="tw-relative"
              emojiStyle={EmojiStyle.NATIVE}
              onEmojiClick={(emoji) => showEmo(emoji)}
            />
            <button
              className="tw-absolute tw-top-0 tw-right-0"
              onClick={toggleEmoji}
            >
              <LiaWindowClose className="tw-text-2xl  tw-bg-red-500" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacebookPost;
