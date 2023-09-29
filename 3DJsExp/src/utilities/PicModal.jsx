import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";
import carouselPic from "../assets/carouselPic.jpg";
import poster from "../assets/poster.jpg";

const PicModal = props => {
  
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
        className=" tw-w-max tw-h-max tw-max-h-fit tw-max-w-fit tw-bg-slate-100/0  tw-z-0"
        title="ภาพทั้งหมด"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <div className=" tw-flex  tw-flex-row tw-z-10 tw-w-max tw-h-max tw-gap-6 tw-opacity-100">
          <img className=" tw-rounded-md tw-w-96 tw-h-72 tw-z-10 tw-opacity-100 tw-drop-shadow-[7px_10px_5px_4px_rgba(0,0,0,0.75)]"
            src={carouselPic}
          />
          <img className=" tw-rounded-md  tw-w-96 tw-h-72 tw-z-10 tw-opacity-100 tw-drop-shadow-lg"
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
