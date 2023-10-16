import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";
import carouselPic from "../assets/carouselPic.jpg";
import poster from "../assets/poster.jpg";
import classNames from "classnames";
import { useResponsive } from "../hooks";
const PicModal = props => {
  const {
    isDesktopOrLaptop,
    isBigScreen,
    isTabletOrMobile,
    isTablet,
    isMobile,
    isPortrait,
    isRetina,
  } = useResponsive();

  const modalToggle = props.modalToggle;
  const handleCancel = props.handleCancel;
  //   const modalData = props.modalData;

  const [isModalOpen, setIsModalOpen] = useState(modalToggle);
  //   const [data, setData] = useState(modalData);

  //   useEffect(() => {
  //     //console.log("data selected");
  //     setData(modalData);
  //   }, [modalData]);

  useEffect(() => {
    setIsModalOpen(modalToggle);
  }, [modalToggle]);

  return (
    <>
      <Modal
        className=" tw-w-[100%] tw-h-[100%] tw-max-h-fit tw-max-w-fit tw-bg-slate-100/0  tw-z-0"
        title="ภาพทั้งหมด"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <div className={classNames(" tw-grid tw-grid-cols-2	 tw-z-10 tw-w-max tw-h-max tw-gap-6 tw-opacity-100",
        {
          "tw-grid tw-grid-cols-1 tw-overflow-y-auto":isMobile && isPortrait
        })}>
          <img className={classNames(" tw-rounded-md tw-w-96 tw-h-72 tw-z-10 tw-opacity-100 tw-drop-shadow-[7px_10px_5px_4px_rgba(0,0,0,0.75)]",
          {
            "tw-w-72 tw-h-64	":isTablet && isPortrait,
            "tw-w-80 tw-h-52	":isMobile && isPortrait
            
          })}
            src={carouselPic}
          />
          <img className={classNames(" tw-rounded-md  tw-w-96 tw-h-72 tw-z-10 tw-opacity-100 tw-drop-shadow-lg",
          {
            "tw-w-72 tw-h-64	":isTablet && isPortrait,
            "tw-w-80 tw-h-52	":isMobile && isPortrait 
          })}
            src={poster}
          />
         
        </div>
      </Modal>
    </>
  );
};

PicModal.propTypes = {
  modalToggle: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default PicModal;
