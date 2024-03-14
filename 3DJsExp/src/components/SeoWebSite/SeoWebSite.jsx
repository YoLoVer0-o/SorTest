import { useState, useEffect } from "react";
import { Select } from "antd";
import { IoIosInformationCircleOutline } from "react-icons/io";
import seoWebSiteAPI from "../../service/seoWebSiteAPI";
import { useDropzone } from "react-dropzone";
import {
  PlusOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import { ImBin } from "react-icons/im";
import Swal from "sweetalert2";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Lightbox } from "react-modal-image";
import ModalImage from "react-modal-image";

const SeoWebSite = () => {
  const [webPosition, setWebPosition] = useState([]);
  const [positionOfWeb, setPositionOfWeb] = useState([]);
  const [webPositionResult, setWebPositionResult] = useState([]);
  const [webIndex, setWebIndex] = useState();
  const [textContent, setTextContent] = useState([]);
  const [filePic, setFilePic] = useState([]);
  const [videoFile, setVideoFile] = useState([]);
  const [handelWebPositionResult, setHandelWebPositionResult] = useState();
  const [handelWebNameResult, setHandelWebNameResult] = useState();
  const [countImg, setCountImg] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalImg, setModalImg] = useState("");
  const [contentTextArray, setContentTextArray] = useState({
    web_id: "",
    web_position: "",
    web_content: "",
  });

  const [imagePost, setImagePost] = useState({
    web_id: "สนับสนุนกองทัพ",
    web_position: "หมายเหตุ 1",
    files: "",
  });
  console.log(imagePost);
  const handleChangeWeb = (value, e) => {
    const indexOfWeb = e.index;
    // console.log(`selected ${value} `);
    setWebIndex(indexOfWeb);
    setHandelWebNameResult(value);
  };

  const handleChangePosi = (value) => {
    // console.log(`selected ${value}`);
    setHandelWebPositionResult(value);
  };

  const handeltext = (e) => {
    const text = e.target.value;
    setTextContent(text);
  };
  // console.log(handelWebNameResult);
  // console.log(handelWebPositionResult);
  // console.log(textContent);
  // console.log(filePic);
  // console.log(videoFile);
  useEffect(() => {
    const getWebSiteData = async () => {
      try {
        const data = await seoWebSiteAPI.getWebPosition();
        const sortedData = data.sort((a, b) => a.image.length - b.image.length);
        console.log(sortedData);
        setWebPosition(sortedData);
      } catch (error) {
        console.error("Error", error);
      }
    };
    getWebSiteData();
  }, []);
  const [picPreview, setPicPreview] = useState([]);
  console.log(webPosition);
  useEffect(() => {
    const indexMatch = () => {
      webPosition.map((data, index) => {
        if (webIndex === index) {
          setWebPositionResult(data.web_position);
          setPicPreview(data.image);
        } else {
          return null;
        }
      });
    };

    indexMatch();
  }, [webPosition, webIndex]);
  console.log(
    webPosition.map((e) => {
      return e.web_position;
    })
  );

  useEffect(() => {
    setContentTextArray({
      web_id: handelWebNameResult,
      web_position: handelWebPositionResult,
      web_content: textContent,
    });
    setImagePost({
      web_id: handelWebNameResult,
      web_position: handelWebPositionResult,
    });
  }, [handelWebNameResult, handelWebPositionResult, textContent, filePic]);

  // useEffect(() => {
  //   // console.log(formData);
  //   // formData.append("files", filePic);

  //   console.log(filePic);
  // }, [filePic]);
  console.log(filePic);
  const webOptions = webPosition.map((e, i) => {
    return {
      index: i,
      value: e.web_id,
      label: e.web_id,
    };
  });
  const positionOptions = webPositionResult.map((e) => {
    return {
      value: e,
      label: e,
    };
  });

  const onDrop = (acceptedFiles, inputType) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    if (inputType === "image") {
      setFilePic((prevFiles) => [...prevFiles, ...newFiles]);
    } else if (inputType === "video") {
      setVideoFile((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };
  console.log(videoFile);
  const ImageUpload = () => {
    const { getRootProps, getInputProps } = useDropzone({
      accept: { "image/jpeg": [], "image/png": [] },
      onDrop: (acceptedFiles) => onDrop(acceptedFiles, "image"),
    });
    const deleteImg = () => {
      setFilePic([]);
    };

    return (
      <div className="tw-relative tw-border-dashed tw-border-2 tw-w-full tw-h-full tw-overflow-y-auto tw-z-10 tw-border-blue-700  tw-rounded-md">
        <section className=" tw-w-full tw-h-full tw-relative">
          {filePic.length > 0 && (
            <button
              onClick={deleteImg}
              className=" tw-absolute tw-right-0 tw-w-max tw-h-max tw-z-50"
            >
              <ImBin className="tw-w-6 tw-h-6 tw-text-red-500" />
            </button>
          )}
          <div className="tw-w-full tw-h-full tw-z-10" {...getRootProps()}>
            <input {...getInputProps()} />

            {filePic.length === 0 && (
              <p className="tw-flex tw-justify-center tw-items-center tw-text-center tw-w-full tw-h-full">
                คลิ๊กหรือลากไฟล์เพื่ออัปโหลดรูปภาพ
              </p>
            )}
            {filePic.length > 0 && (
              <div className="tw-w-max tw-h-max tw-sticky tw-z-30">
                <button
                  onClick={getInputProps}
                  className="tw-sticky tw-right-0 tw-bottom-0 tw-flex tw-items-center tw-justify-center tw-rounded-full tw-border-[1px] tw-border-black tw-bg-white tw-z-20 tw-h-8 tw-w-8 "
                >
                  <PlusOutlined />
                </button>
              </div>
            )}
          </div>
          <div className="tw-absolute tw-top-0 tw-flex tw-justify-center  tw-flex-col tw-w-full">
            {filePic.map((uploadedFile, index) => (
              <div
                key={index}
                className="tw-flex tw-justify-center tw-items-center tw-justify-self-center tw-w-full tw-h-full tw-gap-5 tw-z-10  tw-top-0 "
              >
                {uploadedFile.file.type.startsWith("video/") ? (
                  <video className="tw-h-[30rem] tw-w-[80%]" controls>
                    <source
                      src={uploadedFile.previewUrl}
                      type={uploadedFile.file.type}
                    />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div
                    className="tw-z-20 tw-flex-col tw-flex tw-items-center tw-justify-center tw-h-full] tw-w-[80%] tw-gap-y-5"
                    // onClick={() => setSelectedFile(uploadedFile)}
                  >
                    <img
                      className="tw-h-[30rem] tw-w-[80%]"
                      src={uploadedFile.previewUrl}
                      alt={`Preview ${index}`}
                    />

                    <p className="tw-w-full tw-h-10 tw-overflow-x-auto">
                      {uploadedFile.description}{" "}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  };

  const VideoUpload = () => {
    const { getRootProps, getInputProps } = useDropzone({
      accept: { "video/mp4": [] },
      onDrop: (acceptedFiles) => onDrop(acceptedFiles, "video"),
    });
    const deleteImg = () => {
      setVideoFile([]);
    };
    return (
      <div className="tw-relative tw-border-dashed tw-border-2 tw-w-full tw-h-full tw-overflow-y-auto tw-z-10  tw-border-blue-700  tw-rounded-md">
        <section className=" tw-w-full tw-h-full tw-relative">
          {videoFile.length > 0 && (
            <button
              onClick={deleteImg}
              className=" tw-absolute tw-right-0 tw-w-max tw-h-max tw-z-50"
            >
              <ImBin className="tw-w-6 tw-h-6 tw-text-red-500 " />
            </button>
          )}
          <div className="tw-w-full tw-h-full tw-z-10" {...getRootProps(2)}>
            <input {...getInputProps(2)} />
            {videoFile.length === 0 && (
              <p className="tw-flex tw-justify-center tw-items-center tw-text-center tw-w-full tw-h-full">
                คลิ๊กหรือลากไฟล์เพื่ออัปโหลดวิดีโอ
              </p>
            )}
            {videoFile.length > 0 && (
              <div className="tw-w-max tw-h-max tw-sticky tw-z-30">
                <button
                  onClick={getInputProps}
                  className="tw-sticky tw-right-0 tw-bottom-0 tw-flex tw-items-center tw-justify-center tw-rounded-full tw-border-[1px] tw-border-black tw-bg-white tw-z-20 tw-h-8 tw-w-8 "
                >
                  <PlusOutlined />
                </button>
              </div>
            )}
          </div>
          <div className="tw-absolute tw-top-0 tw-flex tw-justify-center  tw-flex-col tw-w-full">
            {videoFile.map((uploadedFile, index) => (
              <div
                key={index}
                className="tw-flex tw-justify-center tw-items-center tw-justify-self-center tw-w-full tw-h-full tw-gap-5 tw-z-10  tw-top-0 "
              >
                {uploadedFile.file.type.startsWith("video/") ? (
                  <video className="tw-h-[30rem] tw-w-[80%]" controls>
                    <source
                      src={uploadedFile.previewUrl}
                      type={uploadedFile.file.type}
                    />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div
                    className="tw-z-20 tw-flex-col tw-flex tw-items-center tw-justify-center tw-h-full] tw-w-[80%] tw-gap-y-5"
                    // onClick={() => setSelectedFile(uploadedFile)}
                  >
                    <img
                      className="tw-h-[30rem] tw-w-[80%]"
                      src={uploadedFile.previewUrl}
                      alt={`Preview ${index}`}
                    />

                    <p className="tw-w-full tw-h-10 tw-overflow-x-auto">
                      {uploadedFile.description}{" "}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  };

  const submitData = async () => {
    // setPicture(pic);
    // console.log(pic);
    try {
      if (filePic.length > 0 || videoFile.length > 0) {
        const formData = new FormData();
        filePic.map((file) => {
          formData.append("files", file.file);
        });
        videoFile.map((video) => {
          formData.append("files", video.file);
        });
        await seoWebSiteAPI.webSiteUploadFile(formData, imagePost);
      }
      if (contentTextArray.web_content.length !== 0) {
        await seoWebSiteAPI.seoWebSiteContent(contentTextArray);
      }
      Swal.fire({
        title: "โพสต์สําเร็จ ",
        text: contentTextArray.web_content,
        icon: "none",
      });
    } catch (e) {
      Swal.fire({
        title: "เกิดข้อผิดพลาด",
        text: e.message,
        icon: "error",
      });
      console.error("Error posting data:", e);
    }
  };

  const arrowStyles = {
    position: "absolute",
    zIndex: 2,
    top: "calc(50% - 15px)",
    width: 40,
    height: 40,
    cursor: "pointer",
  };
  ///////////////////////////////////////////////////////////////
  const setModal = (e) => {
    setModalImg(e);
    closeLightbox();
  };
  console.log(modalImg);
  const closeLightbox = () => {
    if (open === true) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <div className="tw-w-full tw-h-full tw-flex tw-flex-col tw-items-center ">
      <div className="tw-flex tw-w-full tw-flex-row tw-gap-4 tw-self-center tw-mb-4 ">
        <div className="tw-flex tw-flex-col tw-w-full tw-text-lg ">
          <p className="tw-flex">เลือกหน้าเว็บ:</p>
          <Select
            defaultActiveFirstOption={true}
            className="tw-w-full tw-outline-blue-500 tw-outline tw-rounded-md"
            defaultValue={webPosition[0]}
            onChange={handleChangeWeb}
            options={webOptions}
          />
        </div>
        <div className="tw-w-full tw-flex tw-flex-col tw-text-lg">
          <p className="tw-flex">เลือกตําแหน่ง:</p>
          <div className="tw-flex-row tw-flex tw-w-full tw-relative">
            <Select
              placeholder="กรุณาเลือกหน้าเว็บก่อน"
              className="tw-w-full tw-outline-blue-500 tw-outline tw-rounded-md"
              // defaultValue={positionOptions}
              onChange={handleChangePosi}
              options={positionOptions}
            />
          </div>
        </div>
      </div>

      <div className="tw-relative tw-w-full tw-h-full tw-flex tw-flex-col tw-items-center">
        <IoIosInformationCircleOutline className="tw-w-8 tw-h-8 tw-absolute tw-right-0 tw-text-blue-500" />
        <div className="tw-h-[60%] tw-w-full tw-items-center tw-flex tw-flex-col tw-gap-2">
          <Carousel
            // centerMode={true}
            showThumbs={false}
            className="tw-w-[40%] tw-z-0"
            renderArrowPrev={(onClickHandler, hasPrev, label) =>
              hasPrev && (
                <button
                  className="tw-bg-blue-300 hover:tw-bg-blue-600 tw-rounded-full"
                  type="button"
                  onClick={onClickHandler}
                  title={label}
                  style={{ ...arrowStyles, left: 15 }}
                >
                  <CaretLeftOutlined />
                </button>
              )
            }
            renderArrowNext={(onClickHandler, hasNext, label) =>
              hasNext && (
                <button
                  className="tw-bg-blue-300 hover:tw-bg-blue-600 tw-rounded-full"
                  type="button"
                  onClick={onClickHandler}
                  title={label}
                  style={{ ...arrowStyles, right: 15 }}
                >
                  <CaretRightOutlined />
                </button>
              )
            }
          >
            {picPreview.map((item, index) => (
              <div key={index}>
                <button className="" onClick={() => setModal(item)}>
                  <ModalImage
                    className="tw-w-max tw-h-36 tw-object-contain tw-z-50 "
                    small={`http://192.168.10.113:8000/SEO/website_position_image/?web_id=${handelWebNameResult}&web_position=${handelWebPositionResult}&web_image=${item}`}
                    large={`http://192.168.10.113:8000/SEO/website_position_image/?web_id=${handelWebNameResult}&web_position=${handelWebPositionResult}&web_image=${item}`}
                    // onClick={closeLightbox}
                  />
                </button>
              </div>
            ))}
          </Carousel>
          <textarea
            onChange={handeltext}
            className=" tw-border-solid tw-border-2 tw-w-[50%] tw-h-[40%] tw-outline-blue-300 tw-outline tw-rounded-md"
          ></textarea>
        </div>

        <div className="tw-w-[50%] tw-h-full tw-items-center tw-flex tw-my-3 tw-flex-col tw-gap-4">
          <ImageUpload />
          <VideoUpload />
        </div>
        <button
          onClick={submitData}
          className="tw-bg-green-500  hover:tw-bg-green-400 tw-h-16 tw-w-24 tw-rounded-md tw-text-white"
        >
          Submit
        </button>
        {open === true && (
          <Lightbox
            medium={`http://192.168.10.113:8000/SEO/website_position_image/?web_id=${handelWebNameResult}&web_position=${handelWebPositionResult}&web_image=${modalImg}`}
            large={`http://192.168.10.113:8000/SEO/website_position_image/?web_id=${handelWebNameResult}&web_position=${handelWebPositionResult}&web_image=${modalImg}`}
            hideDownload={true}
            onClose={closeLightbox}
          />
        )}
      </div>
    </div>
  );
};

export default SeoWebSite;
