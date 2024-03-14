import { useState, useEffect } from "react";
import { Select, Modal, Button, Input, Tooltip } from "antd";
import PropTypes from "prop-types";
import AccountManageAPI from "../../service/AccountManageAPI";

const EditModal = (props) => {
  const { isopenEdit, iscloseEdit,token } = props;
  const [openState, setOpenState] = useState(false);
  const [handleUrl, setHandleUrl] = useState("");
  const [updateContent , setUpdateContent] = useState("")

// console.log(token)
  const closeModal = () => {
    setOpenState(false);
    if (iscloseEdit) {
      iscloseEdit();
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // setGroupName([...groupName, handleUrl]);
    }
  };

  const handleOk = async() => {
    await AccountManageAPI.upDateLabelGroupProfile(updateContent ,token);
    setOpenState(false);

  };
  useEffect(() => {
    setUpdateContent({
      url:handleUrl,

    })
  },[handleUrl])
  useEffect(() => {
    setOpenState(isopenEdit);
  }, [isopenEdit]);
  return (
    <Modal
      title="เพิ่มเป้าหมายใหม่"
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
      <Select
        showSearch
        // onSelect={handleSelectGroup}
        onSearch={(e) =>
          setHandleUrl({
            title: e,
            url: e,
          })
        }
        onKeyDown={handleKeyPress}
        className="tw-w-full"
        placeholder="กรอก Url กลุ่ม"
        optionFilterProp="children"
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        // options={groupOptions}
      />
      <p>Link:</p>
      <Input className="tw-w-full tw-rounded-md " placeholder="กรอก link" />
    </Modal>
  );
};
EditModal.propTypes = {
  isopenEdit: PropTypes.bool,
  iscloseEdit: PropTypes.func,
  token: PropTypes.string,
};
export default EditModal;
