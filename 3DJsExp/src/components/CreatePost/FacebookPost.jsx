import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import {
  Radio,
  Space,
  Input,
  Tag,
  Checkbox,
  Select,
  Tooltip,
  Button,
} from "antd";
import {
  CloseCircleOutlined,
  MinusCircleOutlined,
  CheckCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { FaSortDown } from "react-icons/fa";
import profile from "../../assets/profile.png";
import { BsEmojiSmile } from "react-icons/bs";
import { LiaWindowClose } from "react-icons/lia";
import { ImBin } from "react-icons/im";
import { useResponsive } from "../../hooks";
import { facebookAcc, emotionEmoji } from "../../mock";
import classNames from "classnames";
import { useState, useRef, useEffect } from "react";
import Image from "../../assets/PostImage";
import FileUpLoader from "../../utilities/FileUpLoader";
import PostTag from "../../assets/PostTag";
import "./Trainsition.css";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import postCreateAPI from "../../service/postCreateAPI";
import { getLogin } from "../../libs/loginSlice";

import {
  // Transition,
  CSSTransition,
  SwitchTransition,
  // TransitionGroup,
} from "react-transition-group";

const FacebookPost = ({ handelBotData, selectUser }) => {
  const [message, setMessage] = useState("");
  const [showEmojiInput, setShowEmojiInput] = useState(false);
  const [openUpload, setOpenUpLoad] = useState(false);
  const [currentId, setCurrentId] = useState(1);
  const [changeLable, setChangeLable] = useState([
    { name: "สาธารณะ", icon: PostTag.publicPost },
  ]);
  const [value, setValue] = useState("เพื่อน");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFacebookAcc, setFilteredFacebookAcc] = useState(facebookAcc);
  const [tagFriends, setTagFriends] = useState("");
  const [tagExceptFriends, setTagExceptFriends] = useState("");
  const [tagSpecifictFriends, setTagSpecificFriends] = useState("");
  const [emotionAct, setEmotionAct] = useState([]);
  const [postAction, setPostAction] = useState({
    botname: "string",
    url: "string",
    group: "string",
    text: "string",
    photo_video: "string",
    tag_people: "string",
    feeling: "emotionAct",
    check_in: "string",
    gif: "string",
  });
  const [url, setUrl] = useState("");
  const botData = handelBotData;
  const selectedAcc = selectUser;
  const [receiveFile, setReceiveFile] = useState([]);
  const handelFile = (file) => {
    setReceiveFile(file);
  };
  console.log(receiveFile);

  const handleUrl = (event) => {
    setUrl(event.target.value);
  };

  const deleteUrl = () => {
    setUrl("");
  };

  console.log(url);
  // console.log(tagFriends);
  const nodeRef = useRef(null);
  const { Search } = Input;

  const reset = (clickedFrom) => {
    if (clickedFrom == 1) {
      setCurrentId(2);
      setTagExceptFriends("");
      setSelectedItemsForExceptFriend([]);
    } else {
      setCurrentId(1);
      setSearchTerm("");
      setFilteredFacebookAcc(facebookAcc);
    }
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
  const switchToExceptFriend = () => {
    setCurrentId(5);
  };
  const switchToSpecificFriend = () => {
    setCurrentId(6);
  };
  const switchToCustom = () => {
    setCurrentId(7);
  };
  const switchToLink = () => {
    setCurrentId(8);
  };

  const duration = 500;

  const {
    isDesktopOrLaptop,
    // isBigScreen,
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
  const onCheckBox = (e) => {
    console.log("CheckBox checked", e.target.value);
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

  ///////////////////////Tags////////////////////////////////////
  const displayCount = 1;
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItemsForExceptFriend, setSelectedItemsForExceptFriend] =
    useState([]);
  const [selectedItemsForSpecifictFriend, setSelectedItemsForSpecifictFriend] =
    useState([]);

  const onSearch = (value, _e, info) => {
    console.log(info?.source, value);
    setSearchTerm(value);
    const filteredArray = facebookAcc.filter(
      (item) =>
        item.first_name.toLowerCase().includes(value.toLowerCase()) ||
        item.last_name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredFacebookAcc(filteredArray);
  };

  const handleId = (item, button) => {
    const combineName = `${item.first_name} ${item.last_name}`;
    if (button == 1) {
      if (!selectedItems.some((selectedItem) => selectedItem.id === item.id)) {
        setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item]);
        setTagFriends((prevTag) => [...prevTag, combineName]);
      }
    } else if (button == 2) {
      if (
        !selectedItemsForExceptFriend.some(
          (selectedItem) => selectedItem.id === item.id
        )
      ) {
        setSelectedItemsForExceptFriend((prevSelectedItems) => [
          ...prevSelectedItems,
          item,
        ]);
      }
      setTagExceptFriends((prevTag) => [...prevTag, item]);
    } else if (button == 3) {
      if (
        !selectedItemsForSpecifictFriend.some(
          (selectedItem) => selectedItem.id === item.id
        )
      ) {
        setSelectedItemsForSpecifictFriend((prevSelectedItems) => [
          ...prevSelectedItems,
          item,
        ]);
      }
      setTagSpecificFriends((prevTag) => [...prevTag, item]);
    }
  };
  console.log(tagFriends);
  const handleClose = (removedTag, button) => {
    if (button == 1) {
      const newTags = tagFriends.filter((tag) => tag !== removedTag);
      setTagFriends(newTags);
      setSelectedItems(newTags);
      console.log(newTags);
    } else if (button == 2) {
      const newExceptTags = tagExceptFriends.filter(
        (tag) => tag !== removedTag
      );
      setSelectedItemsForExceptFriend(newExceptTags);
      setTagExceptFriends(newExceptTags);
      console.log(newExceptTags, "TagExceptFriends");
    } else if (button == 3) {
      const newSpecificTags = tagSpecifictFriends.filter(
        (tag) => tag !== removedTag
      );
      setSelectedItemsForSpecifictFriend(newSpecificTags);
      setTagSpecificFriends(newSpecificTags);
    }
  };

  const confirmTagFriends = () => {
    setCurrentId(1);
  };

  const [selectedShare, setSelectedShare] = useState([]);
  const [selectedNotShare, setSelectedNotShare] = useState([]);
  const [selectedTheSame, setSelectedTheSame] = useState([]);
  const handleSelected = (value, button) => {
    const option = facebookAcc.find((acc) => acc.id === value);

    if (button === 1) {
      setSelectedShare(option.id);
      handleCompare();
    } else if (button === 2) {
      setSelectedNotShare(value);
      handleCompare();
    }
  };
  const handleCompare = () => {
    //   // alert("compareHandle");
    let sameData = selectedShare.filter((dataValue) =>
      selectedNotShare.includes(dataValue)
    );
    setSelectedTheSame(sameData);
  };
  const customTagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const option = facebookAcc.find((acc) => acc.id === value);

    return (
      <Tag
        color="blue"
        closable={closable}
        onClose={onClose}
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src={option.profilePic}
          className="tw-w-6 tw-h-6 tw-rounded-full"
          alt={`${option.first_name} ${option.last_name}`}
        />
        <div style={{ marginLeft: 8 }}>
          {option.first_name} {option.last_name}
        </div>
      </Tag>
    );
  };
  /////////////////////////////Emotion&Activity//////////////////////////////
  const handelEmotion = (emotion) => {
    setEmotionAct(emotion);
    setCurrentId(1);
  };
  const cancelEmoAct = () => {
    setEmotionAct("");
    setCurrentId(1);
  };
  //////////////////////////////////API Part/////////////////////////////////
  const getToken = useSelector((state) => getLogin(state));

  // console.log(tagFriends.first_name, tagFriends.last_name);

  useEffect(() => {
    setPostAction({
      botname: selectedAcc,
      url: url,
      group: null, /////////////////////รอ API group bot///////////////////
      text: message,
      photo_video: null, /////////////////////รอ API อัพโหลดไฟล์ แปลงเป็นBinary///////////////////////////////////////////
      tag_people: JSON.stringify(tagFriends), /////////////////เอาเเค่ชื่อfacebook/////////////////////////
      feeling: null,
      check_in: null,
      gif: null,
    });
  }, [message, tagFriends, emotionAct, selectedAcc, receiveFile, url]);
  console.log(postAction);

  const handlePost = async () => {
    try {
      // console.log("Data being sent to API:", dataString);
      await postCreateAPI.fbPostAction(postAction, getToken);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };
  ////////////////////Note Gona use JSON.stringify to convert data and sent back /////////////////////////////
  // console.log(selectedShare);
  // console.log(selectedNotShare);
  // console.log(tagFriends);
  // console.log(tagExceptFriends);
  //  console.log(emotionAct);
  // console.log(selectedItemsForExceptFriend);
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
              "tw-grid-cols-6 tw-grid-rows-1 tw-col-span-6  tw-row-span-1 tw-col-start-1":
                (isMobile && isPortrait) || (isMobile && isLandscape),
              "tw-grid-cols-8 tw-grid-rows-1 tw-col-span-8  tw-row-span-1 tw-col-start-1  ":
                (isTablet && isPortrait) ||
                (isTablet && isLandscape) ||
                (isTabletOrMobile && !isMobile),
              "tw-grid-cols-8 tw-grid-rows-1 tw-col-span-8 tw-row-span-1 tw-row-start-1 tw-col-start-1 ":
                isDesktopOrLaptop && !isTablet,
            })}
          >
            <img
              className="tw-col-start-1 tw-justify-self-center tw-w-12 tw-h-12 tw-rounded-full tw-border-2 tw-border-black"
              src={profile}
            />
            <div className="tw-col-start-2 tw-col-span-2">
              <div className="tw-flex tw-flex-row">
                <p className="tw-text-xl  ">{selectedAcc}</p>
              </div>
              <button
                // onClick={switchContentPostTaget}
                className="tw-h-max tw-w-28 tw-bg-gray-200 tw-rounded-md tw-justify-center tw-flex tw-flex-row "
              >
                <img
                  className="tw-bg-gray-200 tw-flex tw tw-justify-self-start tw-self-center tw-w-4 tw-h-4 tw-rounded-full "
                  src={changeLable.icon || PostTag.publicPost}
                />
                {changeLable.name || "สาธารณะ"}
                <FaSortDown />
              </button>
            </div>
            {emotionAct.length != 0 && (
              <div
                className={classNames(
                  "tw-flex tw-flex-row tw-h-max tw-gap-3 tw-w-max ",
                  {}
                )}
              >
                <p>กำลัง</p>

                <div
                  key={emotionAct.id}
                  className="tw-w-full tw-h-max tw-flex tw-flex-row tw-rounded-md"
                >
                  <p
                    onClick={switchEmotion}
                    className="tw-w-full tw-h-10 tw-flex tw-flex-row tw-gap-2"
                  >
                    <div className="tw-flex tw-text-l tw-rounded-full  ">
                      {emotionAct.emoji}
                    </div>
                    <p> รู้สึก</p>
                    <p className="tw-cursor-pointer hover:tw-underline tw-underline-offset-2">
                      {emotionAct.feeling}
                    </p>
                  </p>
                </div>
              </div>
            )}
            {tagFriends.length != 0 && (
              <div
                className={classNames(
                  "tw-flex tw-flex-row tw-gap-3 tw-w-max tw-ml-16",
                  {}
                )}
              >
                <p>อยู่กับ</p>
                {tagFriends.slice(0, displayCount).map((allTag) => (
                  <p
                    key={allTag.id}
                    className="tw-flex tw-flex-row tw-cursor-pointer hover:tw-underline tw-underline-offset-2"
                    onClick={switchContentTag}
                  >
                    {`${allTag}`}
                  </p>
                ))}

                {tagFriends.length > displayCount && (
                  <p
                    className="tw-cursor-pointer hover:tw-underline tw-underline-offset-2"
                    onClick={switchContentTag}
                  >
                    เเละคนอื่นอีก ({tagFriends.length - displayCount})
                  </p>
                )}
              </div>
            )}
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
            <FileUpLoader
              isOpen={openUpload}
              isClose={closePicUpload}
              sentFiles={handelFile}
            />
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
              className="tw-hidden tw-rounded-full tw-w-max tw-h-max tw-justify-self-center hover:tw-bg-gray-300"
            >
              <img className="tw-w-6 tw-h-6" src={Image.emoji} />
            </button>
            <button
              onClick={switchToLink}
              className=" tw-rounded-full tw-w-max tw-h-max tw-justify-self-center hover:tw-bg-gray-300"
            >
              <img className="tw-w-6 tw-h-6" src={Image.link} />
            </button>
            <button
              // onClick={switchLocationPicker}
              className="tw-hidden tw-rounded-full tw-w-max tw-h-max tw-justify-self-center hover:tw-bg-gray-300"
            >
              <img className="tw-w-6 tw-h-6" src={Image.checkIn} />
            </button>
            <button className="tw-hidden tw-rounded-full tw-w-max tw-h-max tw-justify-self-center hover:tw-bg-gray-300">
              <img className="tw-w-6 tw-h-6" src={Image.Gif} />
            </button>
            <button className="tw-rounded-full  tw-justify-self-center hover:tw-bg-gray-200 tw-w-6 tw-h-6 ">
              ...
            </button>
          </div>
          <button
            onClick={handlePost}
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
            <Space ace direction="vertical" className="tw-w-full">
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
                  <div>
                    <p> สาธารณะ</p>
                    <p className="tw-text-gray-500">
                      {" "}
                      ทุกคนทั้งที่ใช้หรือไม่ใช้ Facebook
                    </p>
                  </div>
                </div>
              </Radio>
              <Radio
                value={"เพื่อน"}
                label="เพื่อน"
                className={classNames(
                  "hover:tw-bg-gray-200 tw-items-center tw-rounded-md tw-h-16 tw-w-full",
                  {
                    "tw-h-32": tagFriends.length != 0,
                  }
                )}
              >
                <div className="tw-flex tw-flex-row tw-items-center tw-gap-x-2">
                  <img
                    className="tw-bg-gray-200 tw-rounded-full tw-p-3"
                    src={PostTag.tagFriend}
                  />
                  <div>
                    <p>เพื่อน</p>
                    <p className="tw-text-gray-500">เพื่อนของคุณบน Facebook</p>
                    {tagFriends.length != 0 && (
                      <div className="tw-flex tw-flex-col ">
                        <Checkbox onChange={onCheckBox}>
                          เพื่อนของผู้ที่อยู่ในเเท็ก
                        </Checkbox>
                        <Checkbox
                          onChange={onCheckBox}
                          disabled={true}
                          defaultChecked={true}
                        >
                          ผู้ที่อยู่ในเเท็ก
                        </Checkbox>
                      </div>
                    )}
                  </div>
                </div>
              </Radio>
              <Radio
                value={"เพื่อนยกเว้น ..."}
                label="เพื่อนยกเว้น ..."
                className={classNames(
                  "hover:tw-bg-gray-200 tw-items-center tw-rounded-md tw-h-16 tw-w-full",
                  {
                    "tw-h-32": tagFriends.length != 0,
                  }
                )}
                onClick={switchToExceptFriend}
              >
                <div className="tw-flex tw-w-full tw-flex-row tw-items-center tw-gap-x-2">
                  <img
                    className="tw-bg-gray-200 tw-rounded-full tw-p-3"
                    src={PostTag.tagExceptFriend}
                  />
                  <div>
                    <p>เพื่อนยกเว้น ...</p>
                    <div className="tw-w-full tw-flex tw-flex-row tw-gap-x-2">
                      {" "}
                      {(tagExceptFriends.length === 0 && (
                        <p className="tw-text-gray-500">
                          ไม่ต้องแสดงให้เพื่อนบางคนเห็น
                        </p>
                      )) ||
                        (tagExceptFriends.length !== 0 && (
                          <p className="tw-text-gray-500">เพื่อน ยกเว้น:</p>
                        ))}
                      {tagExceptFriends.length > 0 &&
                        tagExceptFriends
                          .slice(0, displayCount)
                          .map((showExcept) => (
                            <p
                              key={showExcept.id}
                              className="tw-flex tw-flex-row tw-text-gray-500 "
                            >
                              {showExcept.first_name}
                              {showExcept.last_name}
                            </p>
                          ))}
                      {tagExceptFriends.length > displayCount && (
                        <p className="tw-text-gray-500">
                          อีก ({tagExceptFriends.length - displayCount}) คน
                        </p>
                      )}
                    </div>

                    {tagFriends.length != 0 && (
                      <div className="tw-flex tw-flex-col ">
                        <Checkbox onChange={onCheckBox}>
                          เพื่อนของผู้ที่อยู่ในเเท็ก
                        </Checkbox>
                        <Checkbox
                          onChange={onCheckBox}
                          disabled={true}
                          defaultChecked={true}
                        >
                          ผู้ที่อยู่ในเเท็ก
                        </Checkbox>
                      </div>
                    )}
                  </div>
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
                onClick={switchToSpecificFriend}
              >
                <div className="tw-flex tw-flex-row tw-items-center tw-gap-x-2">
                  <img
                    className="tw-bg-gray-200 tw-rounded-full tw-p-3"
                    src={PostTag.tagSome}
                  />
                  <div>
                    <p>เพื่อนที่เจาะจง</p>
                    <div className="tw-w-full tw-flex tw-flex-row tw-gap-x-2">
                      {" "}
                      {tagSpecifictFriends.length === 0 && (
                        <p className="tw-text-gray-500">
                          แสดงต่อเพื่อนบางคนเท่านั้น
                        </p>
                      )}
                      {tagSpecifictFriends.length > 0 &&
                        tagSpecifictFriends
                          .slice(0, displayCount)
                          .map((showSpecifict) => (
                            <p
                              key={showSpecifict.id}
                              className="tw-flex tw-flex-row tw-text-gray-500 "
                            >
                              {showSpecifict.first_name}
                              {showSpecifict.last_name}
                            </p>
                          ))}
                      {tagSpecifictFriends.length > displayCount && (
                        <p className="tw-text-gray-500">
                          อีก ({tagSpecifictFriends.length - displayCount}) คน
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Radio>
              <Radio
                value={"กำหนดเอง"}
                label="กำหนดเอง"
                className="hover:tw-bg-gray-200 tw-items-center tw-rounded-md tw-h-16 tw-w-full"
                onClick={switchToCustom}
              >
                <div className="tw-flex tw-flex-row tw-items-center tw-gap-x-2">
                  <img
                    className="tw-bg-gray-200 tw-rounded-full tw-p-3"
                    src={PostTag.custom}
                  />
                  <div>
                    <p>กำหนดเอง</p>
                    <p className="tw-text-gray-500">
                      รวมและไม่รวมเพื่อนและรายชื่อ
                    </p>
                  </div>
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
            <div className="tw-w-full tw-flex tw-flex-row tw-gap-x-5  ">
              <Search placeholder="ค้นหา" allowClear onSearch={onSearch} />
              <button
                className=" tw-text-cyan-500 tw-text-base"
                onClick={confirmTagFriends}
              >
                เรียบร้อย
              </button>
            </div>
          </div>
          <div>
            <div
              className={classNames(
                "tw-flex tw-overflow-y-auto tw-w-full tw-flex-col tw-p-5 tw-gap-y-2  ",
                {
                  "tw-h-[22rem]": isMobile && isPortrait,
                  "tw-h-[42rem]": isTablet && isPortrait,
                  "tw-h-[25rem]":
                    isDesktopOrLaptop || (isTablet && isLandscape),
                }
              )}
            >
              {filteredFacebookAcc.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleId(item, 1)}
                  className={`tw-flex tw-flex-row tw-h-max tw-w-full tw-rounded-md tw-gap-5 hover:tw-bg-gray-100 ${
                    selectedItems.some(
                      (selectedItem) => selectedItem.id === item.id
                    )
                      ? "tw-hidden"
                      : ""
                  }`}
                  disabled={selectedItems.some(
                    (selectedItem) => selectedItem.id === item.id
                  )}
                >
                  <img
                    src={item.profilePic}
                    className="tw-w-10 tw-h-10 tw-rounded-full tw-self-center tw-object-cover "
                    alt={`Profile-${item.profilePic}`}
                  />
                  <div className="tw-self-center">
                    {item.first_name} {item.last_name}
                  </div>
                </button>
              ))}
            </div>
            <div className="tw-w-full tw-h-max">
              <p>แท็กแล้ว</p>
              <div className="tw-flex tw-flex-row tw-border-[1px] tw-w-full tw-h-max tw-overflow-y-auto ">
                {tagFriends &&
                  tagFriends.map((allTag) => (
                    <Tag
                      key={allTag.id}
                      color="blue"
                      closeIcon={<CloseCircleOutlined />}
                      className="tw-flex tw-flex-row tw-w-max"
                      onClose={() => handleClose(allTag, 1)}
                    >
                      <div>
                        {allTag.first_name} {allTag.last_name}
                      </div>
                    </Tag>
                  ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      content: (
        <div className="tw-w-full tw-h-full ">
          <div className="tw-w-full tw-h-[90%] tw-flex-col tw-flex ">
            <button
              onClick={reset}
              className="tw-bg-gray-200 hover:tw-bg-gray-300 tw-w-10 tw-h-6 tw-rounded-md"
            >
              Back
            </button>
            <div className="tw-text-center">คุณรู้สึกอย่างไร</div>
            <div className="tw-w-full tw-flex tw-flex-row tw-gap-5">
              <button>คุณรู้สึก</button>
              <button>กิจกรรม</button>
            </div>
            <div className="tw-w-full tw-h-full tw-overflow-y-auto">
              {emotionEmoji.map((emoji) => (
                <div
                  key={emoji.id}
                  className="tw-w-full tw-h-10 tw-flex tw-flex-row tw-items-center tw-rounded-md hover:tw-bg-gray-200 "
                >
                  <button
                    onClick={() => handelEmotion(emoji)}
                    className="tw-w-full tw-h-10 tw-flex tw-flex-row tw-items-center"
                  >
                    <div className="tw-flex tw-items-center tw-text-xl tw-rounded-full tw-bg-gray-300 ">
                      {emoji.emoji}
                    </div>
                    <p>{emoji.feeling}</p>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={cancelEmoAct}
            className="tw-flex tw-bg-red-400 tw-rounded-lg tw-w-12 tw-h-6  t tw-justify-center"
          >
            ยกเลิก
          </button>
        </div>
      ),
    },
    {
      id: 5,
      content: (
        <div className="tw-w-full tw-h-full tw-flex-col tw-flex ">
          <div className="">
            <button
              onClick={switchContentPostTaget}
              className="tw-bg-gray-200 hover:tw-bg-gray-300 tw-w-10 tw-h-6 tw-rounded-md"
            >
              Back
            </button>
            <div className="tw-text-center">เพื่อนยกเว้น...</div>
            <div className="tw-w-full tw-flex tw-flex-row tw-gap-x-5  ">
              <Search placeholder="ค้นหา" allowClear onSearch={onSearch} />
            </div>
          </div>
          <div>
            <div
              className={classNames(
                "tw-flex tw-overflow-y-auto tw-w-full tw-flex-col tw-p-5 tw-gap-y-2  ",
                {
                  "tw-h-[22rem]": isMobile && isPortrait,
                  "tw-h-[42rem]": isTablet && isPortrait,
                  "tw-h-[25rem]":
                    isDesktopOrLaptop || (isTablet && isLandscape),
                }
              )}
            >
              {filteredFacebookAcc.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    const selectedIndex =
                      selectedItemsForExceptFriend.findIndex(
                        (unselect) => unselect.id === item.id
                      );
                    if (selectedIndex === -1) {
                      handleId(item, 2);
                    } else {
                      handleClose(item, 2);
                      // alert("clicked")
                    }
                  }}
                  className="tw-flex tw-flex-row tw-h-max tw-w-full tw-rounded-md tw-gap-5 hover:tw-bg-gray-100 "

                  // disabled={selectedItemsForExceptFriend.some(
                  //   (selectedItemsForExceptFriend) =>
                  //     selectedItemsForExceptFriend.id === item.id
                  // )}
                >
                  <img
                    src={item.profilePic}
                    className="tw-w-10 tw-h-10 tw-rounded-full tw-self-center tw-object-cover "
                    alt={`Profile-${item.profilePic}`}
                  />
                  <div className="tw-flex tw-self-center tw-justify-start tw-w-full">
                    {item.first_name} {item.last_name}
                  </div>
                  <button className="tw-flex  tw-items-center tw-justify-end tw-w-full tw-h-full">
                    <MinusCircleOutlined
                      className={classNames(
                        "tw-text-gray-200 tw-border-[1px]  tw-rounded-full tw-text-2xl",
                        {
                          "tw-text-white tw-border-red-600 tw-bg-red-600":
                            selectedItemsForExceptFriend.some(
                              (selectedItemsForExceptFriend) =>
                                selectedItemsForExceptFriend.id === item.id
                            ),
                        }
                      )}
                    />
                  </button>
                </button>
              ))}
            </div>
            <div className="tw-w-full tw-h-max tw-sticky">
              <p>เพื่อนที่จะไม่เห็นโพสต์ของคุณ</p>
              <div className="tw-flex tw-flex-row tw-border-[1px] tw-w-full tw-h-max tw-overflow-y-auto ">
                {tagExceptFriends &&
                  tagExceptFriends.map((allTag) => (
                    <Tag
                      key={allTag.id}
                      color="blue"
                      closeIcon={<CloseCircleOutlined />}
                      className="tw-flex tw-flex-row tw-w-max"
                      onClose={() => handleClose(allTag, 2)}
                    >
                      <div>
                        {allTag.first_name} {allTag.last_name}
                      </div>
                    </Tag>
                  ))}
              </div>
              <div className="tw-flex tw-justify-end tw-w-full tw-gap-x-4 tw-mt-4 ">
                <button
                  onClick={() => reset(1)}
                  className=" tw-w-12 tw-h-8 tw-rounded-md tw-text-blue-500 hover:tw-bg-gray-200"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={switchContentPostTaget}
                  className=" tw-flex tw-w-max tw-p-2 tw-items-center tw-h-8 tw-rounded-md tw-text-white tw-bg-blue-500 "
                >
                  บันทึกการเปลี่ยนเเปลง
                </button>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 6,
      content: (
        <div className="tw-w-full tw-h-full tw-flex-col tw-flex ">
          <div className="">
            <button
              onClick={switchContentPostTaget}
              className="tw-bg-gray-200 hover:tw-bg-gray-300 tw-w-10 tw-h-6 tw-rounded-md"
            >
              Back
            </button>
            <div className="tw-text-center">เพื่อนที่เจาะจง</div>
            <div className="tw-w-full tw-flex tw-flex-row tw-gap-x-5  ">
              <Search placeholder="ค้นหา" allowClear onSearch={onSearch} />
            </div>
          </div>
          <div>
            <div
              className={classNames(
                "tw-flex tw-overflow-y-auto tw-w-full tw-flex-col tw-p-5 tw-gap-y-2  ",
                {
                  "tw-h-[22rem]": isMobile && isPortrait,
                  "tw-h-[42rem]": isTablet && isPortrait,
                  "tw-h-[25rem]":
                    isDesktopOrLaptop || (isTablet && isLandscape),
                }
              )}
            >
              {filteredFacebookAcc.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    const selectedIndex =
                      selectedItemsForSpecifictFriend.findIndex(
                        (unselect) => unselect.id === item.id
                      );
                    if (selectedIndex === -1) {
                      handleId(item, 3);
                    } else {
                      handleClose(item, 3);
                    }
                  }}
                  className="tw-flex tw-flex-row tw-h-max tw-w-full tw-rounded-md tw-gap-5 hover:tw-bg-gray-100 "

                  // disabled={selectedItemsForExceptFriend.some(
                  //   (selectedItemsForExceptFriend) =>
                  //     selectedItemsForExceptFriend.id === item.id
                  // )}
                >
                  <img
                    src={item.profilePic}
                    className="tw-w-10 tw-h-10 tw-rounded-full tw-self-center tw-object-cover "
                    alt={`Profile-${item.profilePic}`}
                  />
                  <div className="tw-flex tw-self-center tw-justify-start tw-w-full">
                    {item.first_name} {item.last_name}
                  </div>
                  <button className="tw-flex  tw-items-center tw-justify-end tw-w-full tw-h-full">
                    <CheckCircleOutlined
                      className={classNames(
                        "tw-text-gray-200 tw-border-[1px]  tw-rounded-full tw-text-2xl",
                        {
                          "tw-text-white tw-border-blue-600 tw-bg-blue-600":
                            selectedItemsForSpecifictFriend.some(
                              (selected) => selected.id === item.id
                            ),
                        }
                      )}
                    />
                  </button>
                </button>
              ))}
            </div>
            <div className="tw-w-full tw-h-max tw-sticky">
              <p>เพื่อนที่จะเห็นโพสต์ของคุณ</p>
              <div className="tw-flex tw-flex-row tw-border-[1px] tw-w-full tw-h-max tw-overflow-y-auto ">
                {tagSpecifictFriends &&
                  tagSpecifictFriends.map((allTag) => (
                    <Tag
                      key={allTag.id}
                      color="blue"
                      closeIcon={<CloseCircleOutlined />}
                      className="tw-flex tw-flex-row tw-w-max"
                      onClose={() => handleClose(allTag, 3)}
                    >
                      <div>
                        {allTag.first_name} {allTag.last_name}
                      </div>
                    </Tag>
                  ))}
              </div>
              <div className="tw-flex tw-justify-end tw-w-full tw-gap-x-4 tw-mt-4 ">
                <button
                  onClick={() => reset(1)}
                  className=" tw-w-12 tw-h-8 tw-rounded-md tw-text-blue-500 hover:tw-bg-gray-200"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={switchContentPostTaget}
                  className=" tw-flex tw-w-max tw-p-2 tw-items-center tw-h-8 tw-rounded-md tw-text-white tw-bg-blue-500 "
                >
                  บันทึกการเปลี่ยนเเปลง
                </button>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 7,
      content: (
        <div className="tw-w-full tw-h-full tw-flex-col tw-flex ">
          <div className="">
            <button
              onClick={reset}
              className="tw-bg-gray-200 hover:tw-bg-gray-300 tw-w-10 tw-h-6 tw-rounded-md"
            >
              Back
            </button>
            <div className="tw-text-center">ความเป็นส่วนตัวที่กำหนดเอง</div>
            <div className="tw-w-full tw-flex tw-flex-row tw-gap-x-5  ">
              {/* <Search placeholder="ค้นหา" allowClear onSearch={onSearch} /> */}
            </div>
          </div>
          <div className="tw-h-[50%]">
            <p>แชร์ให้</p>
            <Select
              className="tw-w-full"
              mode="multiple"
              placeholder="Select one country"
              defaultValue={selectedShare}
              onChange={(value) => handleSelected(value, 1)}
              onDeselect={handleCompare}
              optionLabelProp="label"
              tagRender={customTagRender}
              options={facebookAcc.map((option) => ({
                label: (
                  <Space>
                    <img
                      src={option.profilePic}
                      className="tw-w-6 tw-h-6 tw-rounded-full"
                    />

                    {option.first_name}
                    {option.last_name}
                  </Space>
                ),
                value: option.id,
              }))}
            />
          </div>
          <Checkbox onChange={onChange}>เพื่อนของผู้ที่อยู่ในแท็ก</Checkbox>
          <p className="tw-text-gray-500">
            ใครก็ตามที่ติดอยู่ในแท็กจะสามารถเห็นโพสต์นี้ได้
          </p>
          <div className="tw-h-[50%] ">
            <p>ไม่ต้องแชร์ให้</p>
            <Select
              className="tw-w-full"
              mode="multiple"
              placeholder="Select one country"
              defaultValue={selectedNotShare}
              onChange={(value) => handleSelected(value, 2)}
              onDeselect={handleCompare}
              optionLabelProp="label"
              tagRender={customTagRender}
              options={facebookAcc.map((option) => ({
                label: (
                  <Space>
                    <img
                      src={option.profilePic}
                      className="tw-w-6 tw-h-6 tw-rounded-full"
                    />

                    {option.first_name}
                    {option.last_name}
                  </Space>
                ),
                value: option.id,
              }))}
            />
          </div>
          <div className="tw-flex tw-justify-end tw-w-full tw-gap-x-4 tw-mt-4 ">
            {" "}
            <button
              onClick={switchContentPostTaget}
              className=" tw-w-12 tw-h-8 tw-rounded-md tw-text-blue-500 hover:tw-bg-gray-200"
            >
              ยกเลิก
            </button>
            <button
              onClick={switchContentPostTaget}
              className=" tw-flex tw-w-max tw-h-8 tw-p-2 tw-items-center tw-rounded-md tw-text-white tw-bg-blue-500 "
            >
              บันทึก
            </button>
          </div>
        </div>
      ),
    },
    {
      id: 8,
      content: (
        <div className="tw-w-full tw-h-full tw-flex-col tw-flex ">
          <div className="tw-h-full">
            <button
              onClick={reset}
              className="tw-bg-gray-200 hover:tw-bg-gray-300 tw-w-10 tw-h-6 tw-rounded-md"
            >
              Back
            </button>
            <div className="tw-text-center">เพิ่มลิงค์</div>
            <div className="tw-w-full tw-flex tw-flex-col tw-gap-5 tw-justify-center ">
              <div className="tw-flex tw-justify-center  tw-flex-row tw-w-full tw-h-full tw-gap-4">
                <div className="tw-flex tw-w-[80%] tw-flex-row">
                  {" "}
                  <Input
                    value={url}
                    onChange={handleUrl}
                    defaultValue="Combine input and button"
                    placeholder="ใส่ Url"
                    type="text"
                    className="tw-w-full tw-rounded-r-none"
                  />
                  <button className=" hover:tw-bg-green-600 tw-bg-green-500 tw-p-3 tw-rounded-r-lg tw-text-white">
                    Submit
                  </button>
                </div>

                <Tooltip title="ลบออกทั้งหมด">
                  <button
                    onClick={deleteUrl}
                    className="tw-rounded-md hover:tw-bg-gray-100 tw-h-10 tw-w-10 tw-flex tw-justify-center tw-items-center"
                  >
                    <ImBin className="tw-w-6 tw-h-6 tw-text-gray-400" />
                  </button>
                </Tooltip>
              </div>

              <div>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tw-w-full tw-flex"
                >
                  {url}
                </a>
              </div>

              {/* <textarea
                type="text"
                value={url}
                onChange={handleUrl}
                placeholder="Enter URL"
                className="tw-w-full tw-flex"
              />
           
              <div>{url && (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tw-w-full tw-flex"
                >
                  {url}
                </a>
              )}</div> */}
            </div>
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

FacebookPost.propTypes = {
  handelBotData: PropTypes.any,
  selectUser: PropTypes.string,
};
export default FacebookPost;
