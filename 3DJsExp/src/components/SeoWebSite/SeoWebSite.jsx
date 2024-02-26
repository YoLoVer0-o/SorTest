import { useState, useEffect } from "react";
import { Select } from "antd";
import { IoIosInformationCircleOutline } from "react-icons/io";
import seoWebSiteAPI from "../../service/seoWebSiteAPI";
import { useDropzone } from "react-dropzone";
import { PlusOutlined } from "@ant-design/icons";


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
  

  const handleChangeWeb = (value, e) => {
    const indexOfWeb = e.index;
    console.log(`selected ${value} `);
    setWebIndex(indexOfWeb);
    setHandelWebNameResult(value);
  };

  const handleChangePosi = (value) => {
    console.log(`selected ${value}`);
    setHandelWebPositionResult(value);
  };

  const handeltext = (e) => {
    const text = e.target.value
    setTextContent(text);
  };
console.log(handelWebNameResult);
console.log(handelWebPositionResult);


  useEffect(() => {
    const getWebSiteData = async () => {
      try {
        const data = await seoWebSiteAPI.getWebPosition();
        setWebPosition(data.web_id);
        setPositionOfWeb(data.web_position);
        console.log(data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    getWebSiteData();
  }, []);

  useEffect(() => {
    const indexMatch = () => {
      positionOfWeb.map((data, index) => {
        if (webIndex == index) {
          setWebPositionResult(data);
        } else {
          return null;
        }
      });
    };
    indexMatch();
  }, [webIndex, positionOfWeb]);

  const webOptions = webPosition
    ? webPosition.map((web, index) => ({
        index: index,
        value: web,
        label: web,
      }))
    : [];
  const positionOptions = webPositionResult
    ? webPositionResult.map((posi) => ({
        value: posi,
        label: posi,
      }))
    : [];

      const onDrop = (acceptedFiles) => {
        const newFiles = acceptedFiles.map((file) => ({
          file,
          previewUrl: URL.createObjectURL(file),
        }));
        setFilePic((prevFiles) => [...prevFiles, ...newFiles]);
      };

      const { getRootProps, getInputProps } = useDropzone({
        accept: { "video/mp4": [], "image/jpeg": [], "image/png": [] },
        onDrop,
      });

  return (
    <div className="tw-w-full tw-h-full tw-flex tw-flex-col tw-items-center ">
      <div className="tw-flex tw-w-[40%] tw-flex-col tw-gap-2 tw-self-center ">
        <div className="tw-flex tw-flex-col tw-w-full tw-text-lg ">
          <p className="tw-flex">เลือกหน้าเว็บ:</p>
          <Select
            className="tw-w-full "
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
              className="tw-w-full "
              defaultValue={positionOptions}
              onChange={handleChangePosi}
              options={positionOptions}
            />
            <IoIosInformationCircleOutline className="tw-w-8 tw-h-8 tw-absolute tw-right-0" />
          </div>
        </div>
      </div>
      <div className=" tw-w-full tw-h-full tw-flex tw-flex-col tw-items-center">
        <textarea
          onChange={handeltext}
          className=" tw-border-solid tw-border-2 tw-w-[40%] tw-h-[30%]"
        ></textarea>
        <div className="tw-w-full tw-h-full tw-items-center tw-flex tw-mt-3 tw-flex-col tw-gap-y-4">
          <div className="tw-relative tw-border-dashed tw-border-2 tw-w-[40%] tw-h-[40%] tw-overflow-y-auto tw-z-10">
            <section className=" tw-w-full tw-h-full tw-relative">
              <div className="tw-w-full tw-h-full tw-z-10" {...getRootProps(1)}>
                <input {...getInputProps(1)} />

                {filePic.length === 0 && (
                  <p className="tw-flex tw-justify-center tw-items-center tw-text-center tw-w-full tw-h-full">
                    คลิ๊กหรือลากไฟล์เพื่ออัปโหลด
                  </p>
                )}
                {filePic.length > 0 && (
                  <div className="tw-w-max tw-h-max tw-sticky tw-z-30">
                    <button
                      onClick={getInputProps(1)}
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

          <div className="tw-relative tw-border-dashed tw-border-2 tw-w-[40%] tw-h-[40%] tw-overflow-y-auto tw-z-10">
            <section className=" tw-w-full tw-h-full tw-relative">
              <div className="tw-w-full tw-h-full tw-z-10" {...getRootProps()}>
                <input {...getInputProps()} />

                {videoFile.length === 0 && (
                  <p className="tw-flex tw-justify-center tw-items-center tw-text-center tw-w-full tw-h-full">
                    คลิ๊กหรือลากไฟล์เพื่ออัปโหลด
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
        </div>
        <button className="tw-bg-green-500  hover:tw-bg-green-400 tw-h-12 tw-w-24 tw-rounded-md tw-text-white">
          Submit
        </button>
      </div>
    </div>
  );
};

export default SeoWebSite;
