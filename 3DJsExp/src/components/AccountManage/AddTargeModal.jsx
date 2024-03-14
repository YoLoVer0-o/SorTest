import { useState, useEffect } from "react";
import { Select, Modal, Button, Input, Tooltip } from "antd";
import PropTypes from "prop-types";
import TextArea from "antd/es/input/TextArea";
import AccountManageAPI from "../../service/AccountManageAPI";


const AddTargetModal = (props) => {
  const { isopen, isclose } = props;
  const [editName, setEditName] = useState("");
  const [editDetail, setEditDetail] = useState("");
  const [handleUrl, setHandleUrl] = useState("");
  const [openState, setOpenState] = useState(false);

  const onChange = (value) => {
    console.log(value);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const closeModal = () => {
    setOpenState(false);
    if (isclose) {
      isclose();
    }
  };

  const handleOk = () => {
    if (isclose) {
      isclose();
    }
  };

  useEffect(() => {
    setOpenState(isopen);
  }, [isopen, isclose]);

  const handleNameInput = (event) => {
    const inputValue = event.target.value;
    setEditName(inputValue);
  };

  const handleDetailInput = (event) => {
    const inputValue = event.target.value;
    setEditDetail(inputValue);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // setGroupName([...groupName, handleUrl]);
    }
  };

  return (
    <Modal
      title="เพิ่มเป้าหมายใหม่"
      open={openState}
      onOk={handleOk}
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
      <p>ประเภท:</p>
      <Select
        className="tw-w-full  tw-rounded-md "
        showSearch
        placeholder="ประเภท"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={filterOption}
        options={[
          {
            value: "profile",
            label: "profile",
          },
          {
            value: "group",
            label: "group",
          },
          {
            value: "page",
            label: "page",
          },
        ]}
      />
      <p>ชื่อ:</p>
      <Input
        className="tw-w-full  tw-rounded-md "
        placeholder="กรอกชื่อ"
        onChange={handleNameInput}
      />
      <p>กลุ่ม:</p>
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
        filterOption={(input, option) => (option?.label ?? "").includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        options={[
          {
            value: "A",
            label: "A",
          },
          {
            value: "B",
            label: "B",
          },
          {
            value: "C",
            label: "C",
          },
        ]}
      />
      <p>รายละเอียด:</p>
      <TextArea rows={4} onChange={handleDetailInput} />
      <p>Link:</p>
      <Input className="tw-w-full tw-rounded-md " placeholder="กรอก link" />
    </Modal>
  );
};
AddTargetModal.propTypes = {
  isopen: PropTypes.bool,
  isclose: PropTypes.func,
};
export default AddTargetModal;
