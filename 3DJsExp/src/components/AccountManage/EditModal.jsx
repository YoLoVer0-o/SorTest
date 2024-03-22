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

  // const handleKeyPress = (event) => {
  //   if (event.key === "Enter") {
  //     setHandelLable([...handelLable, handelLable]);
  //   }
  // };
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
  }, [handleData]);

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
        value={handleData.label}
        placeholder="เพิ่มกลุ่มเป้าหมาย"
        onChange={updateLabel}
        options={LabelOptions}
        className="tw-w-full"
      />
      {/* <Select
        showSearch
        // onSelect={handleSelectGroup}
        onSearch={(e) =>
          setHandelLable({
            value: e,
            label: e,
          })
        }
        onKeyDown={handleKeyPress}
        className="tw-w-full"
        placeholder="เพิ่มกลุ่มเป้าหมาย"
        optionFilterProp="children"
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        options={LabelOptions}
      /> */}
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
