import { useDropzone } from "react-dropzone";
import { useState, useEffect } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { useResponsive } from "../hooks";
import { CloseOutlined } from "@ant-design/icons";
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
  const [isOpenState, setIsOpenState] = useState(isOpen);

  const closeEvent = () => {
    setIsOpenState(false);
    if (isClose) {
      isClose();
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
      "video/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => {
    let media;

    if (file.type.startsWith("image/")) {
      media = (
        <img
          src={file.preview}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
          alt={`Preview of ${file.name}`}
        />
      );
    } else if (file.type.startsWith("video/")) {
      media = (
        <video src={file.preview} controls alt={`Preview of ${file.name}`} />
      );
    } else {
      media = <p>Unsupported file type</p>;
    }

    return (
      <div key={file.name}>
        <div>{media}</div>
      </div>
    );
  });
  // console.log(files);

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

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
        <div className="tw-relative tw-border-dashed tw-border-2 tw-w-full tw-h-full">
          <section className="tw-overflow-y-auto tw-w-full tw-h-full">
            <button className="tw-flex tw-right-0 tw-absolute   " onClick={closeEvent}>
              <CloseOutlined className=" tw-items-center tw-justify-center tw-w-8 tw-h-8 tw-border-solid tw-border-[1px] tw-border-black tw-justify-self-center tw-rounded-full tw-bg-red-400" />
            </button>
            <div
              className="tw-w-full tw-h-full "
              {...getRootProps({ className: "dropzone" })}
            >
              <input {...getInputProps()} className="tw-w-full tw-h-full" />
              <p className="tw-w-full tw-h-full">
                Drag drop some files here, or click to select files
              </p>
            </div>
            <aside>{thumbs}</aside>
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
