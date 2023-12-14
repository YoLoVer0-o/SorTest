import { useState, useEffect } from 'react';
import { Form, Modal, Button, Input, Select, Tooltip } from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useResponsive } from "../hooks";

const EditUserModal = props => {

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
            title: "ต้องการลบผู้ใช้?",
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
                    text: "ผู้ใช้ถูกลบแล้ว",
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
            title={'แก้ไขข้อมูลบัญชี'}
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
                            <p>ชื่อบัญชี:</p>
                            <Form.Item name="accName">
                                <Input className='tw-h-full tw-w-full' placeholder="ชื่อบัญชี" autoComplete="username" />
                            </Form.Item>
                        </div>
                        <div className={classNames('tw-flex tw-flex-col tw-w-96 tw-h-16', {
                            "tw-w-60": isMobile,
                        })}>
                            <p>รหัสผ่าน:</p>
                            <Form.Item name="password">
                                <Input.Password className='tw-h-full tw-w-full' placeholder="รหัสผ่าน" autoComplete="current-password" />
                            </Form.Item>
                        </div>
                        <div className={classNames('tw-flex tw-flex-col tw-w-96 tw-h-16', {
                            "tw-w-60": isMobile,
                        })}>
                            <p>Group:</p>
                            <Form.Item name="group">
                                <Select
                                    mode="multiple"
                                    allowClear
                                    className='tw-w-full'
                                    placeholder="Please select"
                                    onChange={handleChange}
                                    options={[]}
                                    dropdownRender={(menu) => (
                                        <div className='tw-flex tw-flex-col'>
                                            {menu}
                                            <div className='tw-flex tw-flex-row tw-border-2 tw-border-black tw-rounded-md tw-p-1'>
                                                <Input
                                                    placeholder="สร้างกลุ่มใหม่"
                                                    onKeyDown={(e) => e.stopPropagation()}
                                                />
                                                <Tooltip title={"กดเพื่อเพิ่มกลุ่ม(จำเป็นต้องกรอกชื่อกลุ่ม)"}>
                                                    <Button
                                                        icon={<PlusOutlined />}
                                                        className='tw-bg-green-500 tw-text-white tw-border-white hover:tw-bg-white hover:tw-text-green-500 hover:tw-border-green-500'
                                                    >
                                                        เพิ่มกลุ่ม
                                                    </Button>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    )}
                                />
                            </Form.Item>
                        </div>
                    </div>
                </div>
            </Form>
        </Modal >

    );
};

EditUserModal.propTypes = {
    modalToggle: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
    modalData: PropTypes.any.isRequired,

}

export default EditUserModal;