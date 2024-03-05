import { useState, useEffect } from 'react';
import { useResponsive } from "../../hooks";
import { Form, Modal, Button, Input, Select } from 'antd';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

const EditWorkModal = props => {

    //////////////////////////////////////////props declaration////////////////////////////////////////////////////////////////
    const modalToggle = props.modalToggle;
    const handleCancel = props.handleCancel;
    const modalData = props.modalData;
    const token = props.token;
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    const [isModalOpen, setIsModalOpen] = useState(modalToggle);
    const [formData, setFormData] = useState({});

    const { isMobile } = useResponsive();
    const param = useParams();

    ////////////////////////////////////////////////////form//////////////////////////////////////////////////////
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log(values);
        setFormData(values);
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////sweetalert and save and delete///////////////////////////////////////////////////////////////
    const MySwal = withReactContent(Swal)

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
            title: "ต้องการลบงาน?",
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
                    text: "งานถูกลบแล้ว",
                    icon: "success"
                });
            }
        });
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        form.resetFields();
    }, [form, formData]);

    useEffect(() => {
        setIsModalOpen(modalToggle);
    }, [modalToggle]);

    return (
        <Modal
            className='tw-max-h-full tw-max-w-fit'
            title={'แก้ไขข้อมูลงาน'}
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
                            "tw-w-56": isMobile,
                        })}>
                            <p>เลขบัญชี/ชื่อบัญชี:</p>
                            <Form.Item name="acc_name">
                                <Input className='tw-h-full tw-w-full' placeholder="ชื่อบัญชี" autoComplete="username" />
                            </Form.Item>
                        </div>
                        <div className={classNames('tw-flex tw-flex-col tw-w-96 tw-h-16', {
                            "tw-w-56": isMobile,
                        })}>
                            <p>งาน:</p>
                            <Form.Item name="work">
                                <Select
                                    allowClear
                                    className='tw-w-full'
                                    placeholder="Please select"
                                    options={[]}
                                />
                            </Form.Item>
                        </div>
                        <div className={classNames('tw-flex tw-flex-col tw-w-96 tw-h-16', {
                            "tw-w-56": isMobile,
                        })}>
                            <p>เป้าหมาย:</p>
                            <Form.Item name="target">
                                <Input className='tw-h-full tw-w-full' placeholder="เป้าหมาย" autoComplete="target" />
                            </Form.Item>
                        </div>
                    </div>
                </div>
            </Form>
        </Modal >
    );
};

EditWorkModal.propTypes = {
    modalToggle: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
    modalData: PropTypes.any.isRequired,
    token: PropTypes.string,
}

export default EditWorkModal;