import { useDropzone } from "react-dropzone";
import { useState, useEffect } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { useResponsive } from "../hooks";
import { CloseOutlined } from "@ant-design/icons";
// import DescriptionPicModal from "./DescriptionPicModal";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Input } from "antd";

const FileUpLoader = (props) => {
  const {
    isDesktopOrLaptop,
    // isBigScreen,
    // isTabletOrMobile,
    isMobile,
    isTablet,
    isPortrait,
    isLandscape,
  } = useResponsive();
  const isOpen = props.isOpen;
  const isClose = props.isClose;

  // const [files, setFiles] = useState(null);
  const [selectedFile, setSelectedFile] = useState("");
  const [isOpenState, setIsOpenState] = useState(isOpen);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState("");

  const handleSave = () => {
    saveDescription(description);
    setDescription("");
    closeModal();
  };
  const closeEvent = () => {
    setIsOpenState(false);
    setFiles([]);
    if (isClose) {
      isClose();
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [files, setFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: ["video/*", "image/*"],
    onDrop,
  });


  const saveDescription = (description, type) => {
    const newDescription = files.map((file) =>
      file === selectedFile ? { ...file, description } : file
    );
    const updatedFiles = files.map((file) =>
      file === selectedFile && file.type === type ? { ...file, type } : file
    );
    setFiles(updatedFiles && newDescription);
  };

 
  useEffect(() => {
    setIsOpenState(isOpen);
  }, [isOpen]);

  return (
    <div
      className={classNames("tw-flex tw-w-full tw-h-full  ", {
        "tw-col-span-6 tw-row-span-4 tw-col-start-4 tw-row-start-4 ":
          isDesktopOrLaptop,
        "tw-col-span-6 tw-row-span-3 tw-col-start-2 tw-row-start-3  ":
          (isTablet && isPortrait) || (isTablet && isLandscape),
        "tw-col-span-4 tw-row-span-3 tw-col-start-2 tw-row-start-3 ":
          (isMobile && isPortrait) || (isMobile && isLandscape),
      })}
    >
      {isOpenState && (
        <div className="tw-relative tw-border-dashed tw-border-2 tw-w-full tw-h-full tw-overflow-y-auto tw-z-10">
          <section className=" tw-w-full tw-h-full tw-relative">
            <button
              className="tw-flex tw-right-0 tw-absolute tw-z-30"
              onClick={closeEvent}
            >
              <CloseOutlined className=" tw-items-center tw-justify-center tw-w-8 tw-h-8 tw-border-solid tw-border-[1px] tw-border-black tw-justify-self-center tw-rounded-full tw-bg-red-400" />
            </button>
            <div className="tw-w-full tw-h-full tw-z-10" {...getRootProps()}>
              <input {...getInputProps()} />

              {files.length === 0 && (
                <p className="tw-flex tw-justify-center tw-items-center tw-text-center tw-w-full tw-h-full">
                  คลิ๊กหรือลากไฟล์เพื่ออัปโหลด
                </p>
              )}
              {files.length > 0 && (
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
              {files.map((uploadedFile, index) => (
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
                      onClick={() => setSelectedFile(uploadedFile)}
                    >
                      <img
                        className="tw-h-[30rem] tw-w-[80%]"
                        src={uploadedFile.previewUrl}
                        alt={`Preview ${index}`}
                      />
                      <button
                        onClick={openModal}
                        className="tw-self-start tw-pointer-events-auto tw-z-20 tw-w-24 tw-h-12 hover:tw-text-gray-800"
                      >
                        เพิ่มคําอธิบาย
                      </button>
                      <p className="tw-w-full tw-h-10 tw-overflow-x-auto">
                        {uploadedFile.description}{" "}
                      </p>
                    </div>
                  )}
                  {/* <p>File Name: {uploadedFile.file.name}</p>
                <p>File Size: {formatFileSize(uploadedFile.file.size)}</p> */}
                </div>
              ))}
            </div>

            {selectedFile && (
              <Modal
                title="Add Description"
                open={isModalOpen}
                onCancel={closeModal}
                centered={true}
                footer={null}
              >
                <div>
                  <Input.TextArea
                    value={description}
                    onChange={(e) =>
                      setDescription(e.target.value, console.log(e))
                    }
                    placeholder="Add description..."
                  />
                  <div className="tw-flex tw-flex-row tw-justify-end tw-gap-x-5 tw-mt-5">
                    <button
                      onClick={closeModal}
                      className="tw-bg-red-400 tw-rounded-sm tw-w-16 tw-h-8"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="tw-bg-green-400 tw-rounded-sm tw-w-16 tw-h-8"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </Modal>
            )}
          </section>
        </div>
      )}
    </div>
  );

};

const formatFileSize = (bytes) => {
  const kbSize = bytes / 1024;
  if (kbSize < 1024) {
    return kbSize.toFixed(2) + " KB";
  } else {
    const mbSize = kbSize / 1024;
    return mbSize.toFixed(2) + " MB";
  }
};

FileUpLoader.propTypes = {
  isOpen: PropTypes.bool,
  isClose: PropTypes.func,
};

export default FileUpLoader;
