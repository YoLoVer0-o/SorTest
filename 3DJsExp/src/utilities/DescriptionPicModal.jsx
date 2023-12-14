import { Modal, Input } from "antd";
import PropTypes from "prop-types";
import { useState } from "react";
const DescriptionPicModal = ({
  modalOpen,
  onRequestClose,
  onSave,
  mediaContent,
}) => {
  const [description, setDescription] = useState("");

  const handleSave = () => {
    onSave(description);
    setDescription("");
    onRequestClose();
  };
  console.log(mediaContent);
  const imgType = () => {
    mediaContent.type === "image/";
  };
  const videoType = () => {
    mediaContent.type === "video/";
  };

  const thumbs = mediaContent.map((file) => {
    let media

     if (imgType) {
      media = (
         <div >
           {" "}
           <div className="tw-flex tw-w-full tw-justify-center">
            <img
             src={file.preview}
             onLoad={() => {
               URL.revokeObjectURL(file.preview);
             }}
             alt={`Preview of ${file.name}`}
             className="tw-flex tw-justify-center tw-w-[200px] tw-h-[200px]"
           /></div>
           
           <p>{file.description}</p>
          
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

    // console.log(file);
    // console.log(media)

    return (
      <div className="tw-w-full " key={file.index} >
        <div className="tw-w-full tw-z-10">
        {media}
        </div>
      </div>
    );
  });

  return (
    <Modal
      title="Add Description"
      open={modalOpen}
      onCancel={onRequestClose}
      centered={true}
      footer={null}
    >
      <div>
        {" "}
        <div className="">{thumbs}</div>
        <Input.TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value, console.log(e))}
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
