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

  const [files, setFiles] = useState([]);
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
    setFiles([])
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

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
      "video/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles((prevFiles) => [
        ...prevFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    },
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

  const imgType = () =>{
    files.type === "image/"
  }
  const videoType = () =>{
    files.type === "video/"
  }

  const thumbs = files.map((file) => {
    let media

     if (imgType) {
      media = (
         <div className="tw-w-full  ">
           {" "}
           <div className="tw-flex tw-w-full tw-justify-center">
            <img
             src={file.preview}
             onLoad={() => {
               URL.revokeObjectURL(file.preview);
             }}
             alt={`Preview of ${file.name}`}
             className="tw-flex tw-justify-center tw-w-[200px] tw-h-[200px]"
           />
           </div>
           <p className="tw-w-full tw-h-10 tw-overflow-x-auto">{file.description}</p>
           <p onClick={openModal} className="tw-pointer-events-auto  hover:tw-text-gray-800">เพิ่มคําอธิบาย</p>
         </div>
       );
     } else if (videoType) {
      (
        media = <div>
        
           <video src={file.preview} controls 
          //  alt={`Preview of ${file.name}`}
            />
           
         </div>
       );
     }

    console.log(files ,"From fileupload");
    // console.log(media)

    return (
      <div className="tw-w-full " key={file.index} onClick={() => setSelectedFile(file)}>
        <div className="tw-w-full tw-z-10">
        {media}
        </div>
      </div>
    );
  });


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
        <div className="tw-relative tw-border-dashed tw-border-2 tw-w-full tw-h-full tw-overflow-y-auto">
          <section className=" tw-w-full tw-h-full">
            <button
              className="tw-flex tw-right-0 tw-absolute tw-z-10"
              onClick={closeEvent}
            >
              <CloseOutlined className=" tw-items-center tw-justify-center tw-w-8 tw-h-8 tw-border-solid tw-border-[1px] tw-border-black tw-justify-self-center tw-rounded-full tw-bg-red-400" />
            </button>
            <div
              className="tw-w-full tw-h-full "
              {...getRootProps({ className: "dropzone tw-h-full" })}
            >
              <input {...getInputProps()} className="tw-w-full tw-h-full" />

              {thumbs.length === 0 && (
                <p className="tw-w-full tw-h-full">
                  Drag drop some files here, or click to select files
                </p>
              )}
            </div>
            <aside className=" tw-absolute tw-w-full tw-top-0 tw-left-0 ">
              {thumbs}
              {thumbs.length !== 0 && (
                <div
                  {...getRootProps({
                    className:
                      "dropzone tw-h-max tw-flex  tw-sticky tw-w-max tw-bottom-0 tw-left-[100vw]",
                  })}
                >
                  <button
                    onClick={getInputProps}
                    className="tw-sticky tw-flex tw-items-center tw-justify-center tw-rounded-full tw-border-[1px] tw-border-black tw-bg-white tw-z-20 tw-h-8 tw-w-8 "
                  >
                    <PlusOutlined />
                  </button>
                </div>
              )}
            </aside>

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
                 onChange={(e) => setDescription(e.target.value, console.log(e))}
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

FileUpLoader.propTypes = {
  isOpen: PropTypes.bool,
  isClose: PropTypes.func,
};

export default FileUpLoader;
