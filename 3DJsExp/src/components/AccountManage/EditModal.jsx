import { useState, useEffect } from "react";
import { Select, Modal, Button, Input } from "antd";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import AccountManageAPI from "../../service/AccountManageAPI";

const EditModal = (props) => {
  const { isopenEdit, iscloseEdit, token, handleData, getType } = props;
  const [openState, setOpenState] = useState(false);
  const [handelLable, setHandelLable] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState([]);
  const [updateContent, setUpdateContent] = useState("");

  const closeModal = () => {
    setOpenState(false);
    if (iscloseEdit) {
      iscloseEdit();
    }
  };

  const handleKeyPress = (event) => {
    // console.log(event.target.value);
    if (event.key === "Enter") {
      let data = { value: event.target.value, label: event.target.value };
      setHandelLable([data]);
    }
  };
  console.log(handelLable);
  const updateLabel = (value) => {
    console.log(`Selected: ${value}`);
    setSelectedLabel(value);
  };

  const LabelOptions = handelLable.map((e) => {
    return {
      value: e.value,
      label: e.label,
    };
  });

  const handleOk = async () => {
    let profileUpdate;
    let groupUpdate;
    try {
      if (getType === "profile") {
        const res = await AccountManageAPI.upDateLabelProfile(
          updateContent,
          token
        );
        profileUpdate = res;
      } else if (getType === "group") {
        const res = await AccountManageAPI.upDateLabelGroupProfile(
          updateContent,
          token
        );
        groupUpdate = res;
      }
      Swal.fire({
        title: "สําเร็จ",
        // text: groupUpdate.message,
        icon: "success",
      });
    } catch (error) {
      console.log(error.message);
      Swal.fire({
        title: "เกิดข้อผิดพลาด",
        text: error.message,
        icon: "error",
      });
    }
    setOpenState(false);
    if (iscloseEdit) {
      iscloseEdit();
    }
  };

  useEffect(() => {
    handleData;
    let currentlabel = handleData
      ? handleData.label.map((label) => ({
          value: label,
          label: label,
        }))
      : [];
    setHandelLable(currentlabel);
    setSelectedLabel(handleData.label);
  }, [handleData]);

  // console.log(handelLable);
  useEffect(() => {
    setUpdateContent({
      url: handleData.url,
      label: selectedLabel,
    });
  }, [handleData, selectedLabel]);

  useEffect(() => {
    setOpenState(isopenEdit);
  }, [isopenEdit]);

  return (
    <Modal
      title="เเก้ไข"
      open={openState}
      // onOk={handleOk}
      onCancel={closeModal}
      centered={true}
      footer={[
        <Button
          key="submit"
          className="tw-bg-blue-500 tw-text-white tw-border-white hover:tw-bg-white hover:tw-text-blue-500 hover:tw-border-blue-500"
          onClick={handleOk}
        >
          บันทึก
        </Button>,
      ]}
    >
      <p>เพิ่มเป้าหมายใหม่:</p>
      <Select
        mode="tags"
        allowClear={true}
        placeholder="เพิ่มกลุ่มเป้าหมาย"
        onChange={updateLabel}
        value={selectedLabel}
        options={LabelOptions}
        onKeyDown={handleKeyPress}
        className="tw-w-full"
      />
      <p>Link:</p>

      <Input
        value={handleData.url}
        disabled={true}
        className="tw-w-full tw-text-black tw-rounded-md "
        placeholder="link"
      ></Input>
    </Modal>
  );
};
EditModal.propTypes = {
  isopenEdit: PropTypes.bool,
  iscloseEdit: PropTypes.func,
  token: PropTypes.object,
  handleData: PropTypes.any,
  getType: PropTypes.string,
};
export default EditModal;
