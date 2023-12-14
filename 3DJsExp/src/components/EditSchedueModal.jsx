import { useState, useEffect } from 'react';
import { Form, Modal, Button, Input, Select } from 'antd';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useResponsive } from "../hooks";

const EditSchedueModal = props => {

    const modalToggle = props.modalToggle;
    const handleCancel = props.handleCancel;
    const modalData = props.modalData;

    const [isModalOpen, setIsModalOpen] = useState(modalToggle);
    const [formData, setFormData] = useState({});

    const { isMobile } = useResponsive();

    const [form] = Form.useForm();

    const MySwal = withReactContent(Swal)

    const onFinish = (values) => {
        console.log(values);
        setFormData(values);
    };

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const handleSave = () => {

        MySwal.fire({
            title: "ต้องการบันทึกข้อมูล?",
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
                    text: "บันทึกข้อมูลแล้ว!",
                    icon: "success"
                });
            }
        });
    }

    const handleDelete = (value) => {
        console.log(value);

        MySwal.fire({
            title: "ต้องการลบงานประจำ?",
            text: "คุณจะไม่สามารถกู้คืนได้ เมื่อกดตกลง",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ตกลง",
            cancelButtonText: "ยกเลิก",
        }).then((result) => {
            if (result.isConfirmed) {
                MySwal.fire({
                    title: "เรียบร้อย!",
                    text: "งานประจำถูกลบแล้ว",
                    icon: "success"
                });
            }
        });
    }

    useEffect(() => {
        form.resetFields();
    }, [form, formData]);

    useEffect(() => {
        setIsModalOpen(modalToggle);
    }, [modalToggle]);

    return (
        <Modal
            className='tw-max-h-fit tw-max-w-fit'
            title={'แก้ไขข้อมูลงานประจำ'}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={
                [<Button
                    key="delete"
                    className='tw-bg-red-500 tw-text-white tw-border-white hover:tw-bg-white hover:tw-text-red-500 hover:tw-border-red-500'
                    onClick={() => handleDelete(formData)}
                >
                    ลบ
                </Button>,
                <Button
                    key="submit"
                    htmlType="submit"
                    form="editForm"
                    className='tw-bg-blue-500 tw-text-white tw-border-white hover:tw-bg-white hover:tw-text-blue-500 hover:tw-border-blue-500'
                    onClick={() => handleSave(formData)}
                >
                    บันทึก
                </Button>
                    ,]}
        >
            <Form
                form={form}
                name="editForm"
                id="editForm"
                onFinish={onFinish}
                initialValues={modalData}
            >
                <div className='tw-overflow-y-auto tw-h-full tw-w-full tw-border-black tw-border-2 tw-rounded-md'>
                    <div className='tw-flex tw-flex-col tw-w-full tw-h-full tw-p-4 tw-gap-4'>
                        <div className={classNames('tw-flex tw-flex-col tw-w-96 tw-h-16', {
                            "tw-w-60": isMobile,
                        })}>
                            <p>เลขบัญชี/ชื่อบัญชี:</p>
                            <Form.Item name="acc_name">
                                <Input className='tw-h-full tw-w-full' placeholder="ชื่อบัญชี" autoComplete="username" />
                            </Form.Item>
                        </div>
                        <div className={classNames('tw-flex tw-flex-col tw-w-96 tw-h-16', {
                            "tw-w-60": isMobile,
                        })}>
                            <p>เป้าหมาย:</p>
                            <Form.Item name="target">
                                <Input className='tw-h-full tw-w-full' placeholder="เป้าหมาย" autoComplete="target" />
                            </Form.Item>
                        </div>
                        <div className={classNames('tw-flex tw-flex-row tw-w-96 tw-h-16 tw-gap-4 tw-justify-between', {
                            "tw-w-60": isMobile,
                        })}>
                            <div className='tw-flex tw-flex-col tw-w-full'>
                                <p>ความถี่:</p>
                                <Form.Item name="frequency">
                                    <Select
                                        allowClear
                                        className='tw-w-full'
                                        placeholder="Please select"
                                        onChange={handleChange}
                                        options={[]}
                                    />
                                </Form.Item>
                            </div>
                            <div className='tw-flex tw-flex-col tw-w-full'>
                                <p>เวลา:</p>
                                <Form.Item name="time">
                                    <Select
                                        allowClear
                                        className='tw-w-full'
                                        placeholder="Please select"
                                        onChange={handleChange}
                                        options={[]}
                                    />
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </Modal >

    );
};

EditSchedueModal.propTypes = {
    modalToggle: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
    modalData: PropTypes.any.isRequired,

}

export default EditSchedueModal;