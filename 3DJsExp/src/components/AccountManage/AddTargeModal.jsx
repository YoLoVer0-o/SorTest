import { useState, useEffect } from "react";
import { Select, Modal, Button, Input, Tooltip } from "antd";
import PropTypes from "prop-types";
import TextArea from "antd/es/input/TextArea";
import AccountManageAPI from "../../service/AccountManageAPI";

const AddTargetModal = (props) => {
  const { isopen, isclose, token } = props;
  const [handleName, setHandleName] = useState("");
  const [handleDetail, setHandleDetail] = useState("");
  const [handleUrl, setHandleUrl] = useState("");
  const [handleUserType, setHandleUserType] = useState("");
  const [handleLabel, setHandleLabel] = useState([]);
  const [addContent, setAddContent] = useState("");
  const [openState, setOpenState] = useState(false);

  const selectUserType = (value) => {
    console.log(value);
    setHandleUserType(value);
  };
  const handleUrlFunc = (value) => {
    setHandleUrl(value);
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
  const handleSelectedLabel = (value) => {
    setHandleLabel((prevLabels) => [...prevLabels, value]);
  };

  const submit = async () => {
    await AccountManageAPI.upDateLabelProfile(addContent, token);

    if (isclose) {
      isclose();
    }
  };

  useEffect(() => {
    setAddContent([{
      type: handleUserType,
      url: handleUrl,
      title: handleName,
      information: handleDetail,
      label: handleLabel,
    }]);
  }, [handleUserType, handleUrl, handleName, handleDetail, handleLabel]);
  // console.log(addContent);
  useEffect(() => {
    setOpenState(isopen);
  }, [isopen, isclose]);

  const handleNameInput = (event) => {
    const inputValue = event.target.value;
    setHandleName(inputValue);
  };

  const handleDetailInput = (event) => {
    const inputValue = event.target.value;
    setHandleDetail(inputValue);
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
      onCancel={closeModal}
      centered={true}
      footer={[
        <Button
          key="submit"
          className="tw-bg-blue-500 tw-text-white tw-border-white hover:tw-bg-white hover:tw-text-blue-500 hover:tw-border-blue-500"
          onClick={submit}
        >
          บันทึก
        </Button>,
      ]}
    >
      <p>ประเภท:</p>
      <Select
        className="tw-w-full  tw-rounded-md "
        // showSearch
        placeholder="ประเภท"
        optionFilterProp="children"
        onChange={selectUserType}
        // onSearch={onSearch}
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
            value: "profile",
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
        onSelect={handleSelectedLabel}
        // onSearch={(e) =>
        //   setHandleUrl({
        //     title: e,
        //     url: e,
        //   })
        // }
        onKeyDown={handleKeyPress}
        mode="tags"
        className="tw-w-full"
        placeholder="เพิ่มกลุ่มเป้าหมาย"
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
      <Input
        onChange={handleUrlFunc}
        className="tw-w-full tw-rounded-md "
        placeholder="กรอก link"
        required
      />
    </Modal>
  );
};
AddTargetModal.propTypes = {
  isopen: PropTypes.bool,
  isclose: PropTypes.func,
  token: PropTypes.object,
};
export default AddTargetModal;
