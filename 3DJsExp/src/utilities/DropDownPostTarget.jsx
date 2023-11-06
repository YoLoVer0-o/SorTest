import { useState } from "react";
import { Button, Modal, Radio, Space } from "antd";
import PostTag from "../assets/PostTag"
const DropDownPostTarget = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState(1);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  //   const [number, setNumber] = useState();
  //   const ChangeComp = () => {
  //     switch (number) {
  //       case 1:
  //         return <p>1</p>;
  //       case 2:
  //         return <p>2</p>;
  //       default:
  //         return <p>3</p>;
  //     }
  //   };

  return (
    <div>
      <Button onClick={showModal}>Open Modal</Button>
      <Modal
      centered
        title="กลุ่มเป้าหมายของโพสต์"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
       
      >
        <div className="tw-grid ">
          <Radio.Group onChange={onChange} 
          value={value}
          className="tw-w-full tw-flex">
            <Space direction="vertical"
            className="tw-w-full">
              <Radio value={1} className="tw-flex tw-flex-row hover:tw-bg-gray-200 tw-items-center tw-rounded-sm tw-h-16 tw-w-full">
               <p> สาธารณะ</p><img src={PostTag.publicPost}/>
              </Radio>
              <Radio value={2} className="hover:tw-bg-gray-200 tw-items-center tw-rounded-sm tw-h-16 tw-w-full">
                <p>เพื่อน</p> <img src={PostTag.tagFriend}/> 
              </Radio>
              <Radio value={3} className="hover:tw-bg-gray-200 tw-items-center tw-rounded-sm tw-h-16 tw-w-full">
                <p>เพื่อนยกเว้น ...</p><img src={PostTag.tagExceptFriend}/> 
              </Radio>
              <Radio value={4} className="hover:tw-bg-gray-200 tw-items-center tw-rounded-sm tw-h-16 tw-w-full">
              <p>เฉพาะฉัน</p><img src={PostTag.onlyMe}/> 
              </Radio>
              <Radio value={5} className="hover:tw-bg-gray-200 tw-items-center tw-rounded-sm tw-h-16 tw-w-full">
              <p>เพื่อนที่เจาะจง</p><img src={PostTag.tagSome}/> 
              </Radio>
              <Radio value={6} className="hover:tw-bg-gray-200 tw-items-center tw-rounded-sm tw-h-16 tw-w-full">
              <p>กำหนดเอง</p><img src={PostTag.custom}/> 
              </Radio>
            </Space>
          </Radio.Group>
          <div className="tw-grid tw-grid-cols-2 tw-gap-x-2 tw-items-end tw-w-full ">
            <button className="tw-bg-gray-200 tw-rounded-md">ยกเลิก</button>
            <button className="tw-bg-blue-600 tw-text-white tw-rounded-md">เรียบร้อย</button>
          </div>
        </div>
      </Modal>
      {/* <ChangeComp />
      <button type="button" onClick={() => setNumber(1)}>
        1
      </button>
      <button type="button" onClick={() => setNumber(2)}>
        2
      </button> */}
      {/* <Select
         className='tw-bg-gray-200 tw-rounded-md'
         bordered={false}
        defaultValue="เพื่อน"
        style={{
          width: 120,
        }}
        dropdownMatchSelectWidth={false}
        options={[
          {
            value: 'สาธารณะ',
            label: 'สาธารณะ',
          },
          {
            value: 'เพื่อน',
            label: 'เพื่อน ',
          },
          {
            value: 'เพื่อนยกเว้น ...',
            label: 'เพื่อนยกเว้น ...',
          },
          {
            value: 'เฉพาะฉัน ',
            label: 'เฉพาะฉัน',
          },
          {
            value: 'เพื่อนที่เจาะจง ',
            label: 'เพื่อนที่เจาะจง',
          },
          {
            value: 'กำหนดเอง ',
            label: 'กำหนดเอง',
          },
        ]}
      /> */}
    </div>
  );
};

export default DropDownPostTarget;
