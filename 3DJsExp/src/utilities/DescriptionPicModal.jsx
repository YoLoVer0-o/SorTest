import {  Modal,Input } from "antd";
import PropTypes from "prop-types";
import { useState } from "react";
const DescriptionPicModal = ({ modalOpen, onRequestClose, onSave, mediaContent}) => {
  const [description, setDescription] = useState("");

  const handleSave = () => {
    onSave(description);
    setDescription(""); // Clear description after saving
    onRequestClose();
  };

//   const thumbs = mediaContent.map((file) => {
//     let media;

//     if (file.type.startsWith("image/")) {
//       media = (
//         <div>
//           {" "}
//           <img
//             src={file.preview}
//             onLoad={() => {
//               URL.revokeObjectURL(file.preview);
//             }}
//             alt={`Preview of ${file.name}`}
//           />
//         </div>
//       );
//     } else if (file.type.startsWith("video/")) {
//       media = (
//         <div>
//           {" "}
//           <video src={file.preview} controls alt={`Preview of ${file.name}`} />
//         </div>
//       );
//     }
//     console.log(file);
   
    
//     return (
//       <div key={file.id} >
//         <div className=" tw-z-10">
//           {media}
//         </div>
//       </div>
//     );
//   });

  return (
    <Modal
      title="Add Description"
      open={modalOpen}
      onCancel={onRequestClose}
      centered={true}
      footer={null}
    >
      <div>
        {/* <div className="">{thumbs}</div> */}
        <Input.TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value , console.log(e)) }
          placeholder="Add description..."
          
        />
        <div className="tw-flex tw-flex-row tw-justify-end tw-gap-x-5 tw-mt-5">
          <button
            onClick={onRequestClose}
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
   
  );
};

DescriptionPicModal.propTypes = {
  modalOpen: PropTypes.bool,
  onRequestClose: PropTypes.any,
  onSave: PropTypes.any,
  mediaContent: PropTypes.any,
};

export default DescriptionPicModal;
