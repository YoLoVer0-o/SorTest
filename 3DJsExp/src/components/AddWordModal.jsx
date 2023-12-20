import { useState, useEffect } from 'react';
import { Modal, Button, Input, Tooltip, InputNumber, Switch } from 'antd';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useResponsive } from "../hooks";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

const AddWordModal = props => {

    const modalToggle = props.modalToggle;
    const handleCancel = props.handleCancel;

    const [isModalOpen, setIsModalOpen] = useState(modalToggle);
    const [formData, setFormData] = useState({});

    const { isMobile } = useResponsive();

    const MySwal = withReactContent(Swal)

    // const [payload, setPayload] = useState({ id: 1, word: "", weight: 0, absolute: false });

    const handleText = (e) => {
        // console.log(e.target.value);
        if (e.target.value !== null && e.target.value !== undefined) {
            // console.log(formData);
            setFormData({ ...formData, word: e.target.value });
        }
    };

    const handleChecked = (checked) => {
        // 👇️ if id equals 2, update country property
        if (checked !== null && checked !== undefined) {
            // console.log(formData);
            setFormData({ ...formData, absolute: checked });
        }
        // 👇️ otherwise return the object as is
    };

    const handleWeight = (operator) => {
        // 👇️ if id equals 2, update country property
        if (operator) {
            // console.log(formData);
            if (formData.weight) {
                if (operator === "+") {
                    setFormData({ ...formData, weight: formData.weight + 1 });
                }

                else if (operator === "-") {
                    setFormData({ ...formData, weight: formData.weight - 1 });
                }
            } else {
                setFormData({ ...formData, weight: 1 });
            }


        }
        // 👇️ otherwise return the object as is
    }

    const handleSave = () => {
        console.log(formData);
        MySwal.fire({
            title: "ต้องการบันทึกคำคัดกรอง?",
            text: "กดตกลงเพื่อบันทึก",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ตกลง",
            cancelButtonText: "ยกเลิก",
        }).then((result) => {
            if (result.isConfirmed) {
                MySwal.fire({
                    title: "เรียบร้อย!",
                    text: "บันทึกคำคัดกรองแล้ว!",
                    icon: "success"
                });
                handleCancel();
            }
        });
    }

    useEffect(() => {
        setIsModalOpen(modalToggle);
    }, [modalToggle]);

    return (
        <Modal
            className='tw-max-h-fit tw-max-w-fit'
            title={'เพิ่มคำคัดกรอง'}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={
                [
                    <Button
                        key="submit"
                        className='tw-bg-blue-500 tw-text-white tw-border-white hover:tw-bg-white hover:tw-text-blue-500 hover:tw-border-blue-500'
                        onClick={() => handleSave(formData)}
                    >
                        บันทึก
                    </Button>
                    ,]}
        >
            <div className='tw-overflow-y-auto tw-h-full tw-w-full tw-border-black tw-border-2 tw-rounded-md'>
                <div className='tw-flex tw-flex-col tw-w-full tw-h-full tw-p-4 tw-gap-4'>
                    <div className={classNames('tw-flex tw-flex-col tw-w-96 tw-h-16', {
                        "tw-w-60": isMobile,
                    })}>
                        <p>คำคัดกรอง:</p>

                        <Input className='tw-h-full tw-w-full' placeholder="คำคัดกรอง" autoComplete="none" onChange={(e) => handleText(e)} />
                    </div>
                    <div className={classNames('tw-flex tw-flex-col tw-w-96 tw-h-16', {
                        "tw-w-60": isMobile,
                    })}>
                        <p>น้ำหนัก(1-10):</p>
                        <InputNumber
                            addonBefore={
                                <Tooltip title="ลดจำนวน">
                                    <Button
                                        className="tw-w-full tw-h-full tw-flex tw-border-2 tw-rounded-full tw-bg-red-500 hover:tw-border-red-500 hover:tw-text-red-500 hover:tw-bg-white"
                                        onClick={() => handleWeight("-")}
                                    >
                                        <MinusOutlined />
                                    </Button>
                                </Tooltip>}
                            addonAfter={
                                <Tooltip title="เพิ่มจำนวน">
                                    <Button
                                        className="tw-w-full tw-h-full tw-flex tw-border-2 tw-rounded-full tw-bg-green-500 hover:tw-border-green-500 hover:tw-text-green-500 hover:tw-bg-white"
                                        onClick={() => handleWeight("+")}
                                    >
                                        <PlusOutlined />
                                    </Button>
                                </Tooltip>}
                            value={formData.weight}
                            min={1}
                            max={10}
                        />

                    </div>
                    <div className={classNames('tw-flex tw-flex-col tw-w-96 tw-h-16', {
                        "tw-w-60": isMobile,
                    })}>
                        <p>หมวดนี้แน่นอน:</p>
                        <Tooltip title="กดเพื่อเปลี่ยนค่า">
                            <div className="tw-flex tw-flex-row tw-justify-center">
                                <Switch className={classNames("", {
                                    "tw-bg-black": formData?.absolute === false || formData?.absolute === null || formData?.absolute === undefined,
                                    "tw-bg-blue-400": formData?.absolute === true,
                                })}
                                    checked={formData?.absolute}
                                    onChange={(checked) => handleChecked(checked)}
                                />
                            </div>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </Modal >

    );
};

AddWordModal.propTypes = {
    modalToggle: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,

}

export default AddWordModal;