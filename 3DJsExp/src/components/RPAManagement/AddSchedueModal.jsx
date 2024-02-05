import { useState, useEffect } from 'react';
import { useResponsive } from "../../hooks";
import { Form, Modal, Button, Input, Select, TimePicker, ConfigProvider } from 'antd';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import RPASchedueAPI from "../../service/RPASchedueAPI";
import dayjs from 'dayjs';

const AddSchedueModal = props => {
    ///////////////////////////////////////////props declaration///////////////////////////////////////////////////////////////
    const modalToggle = props.modalToggle;
    const handleCancel = props.handleCancel;
    const token = props.token;
    const fetch = props.fetch;
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    const [isModalOpen, setIsModalOpen] = useState(modalToggle);
    // const [formData, setFormData] = useState({});
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    const { isMobile } = useResponsive();

    //////////////////////////////////////////form////////////////////////////////////////////////////////////////
    const [form] = Form.useForm();

    const formData = Form.useWatch([], form);

    const handleTimeChange = (value) => {
        console.log(dayjs(value).format('HH:mm'));
    }

    const onFinish = (values) => {
        console.log(values);

        // setFormData(values);
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////sweetalert and save and delete logic///////////////////////////////////////////////////////////////
    const MySwal = withReactContent(Swal)

    const handleSave = async () => {
        console.log(formData);
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
                RPASchedueAPI.fbAddSchedule(token, formData).then(() => {
                    MySwal.fire({
                        title: "เรียบร้อย!",
                        text: "บันทึกข้อมูลแล้ว!",
                        icon: "success"
                    });
                })
            }
            fetch()
        });
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        form.resetFields();
    }, [form]);

    useEffect(() => {
        setIsModalOpen(modalToggle);
    }, [modalToggle]);

    return (
        <Modal
            className='tw-max-h-full tw-max-w-full'
            title={'เพิ่มข้อมูลงานประจำ'}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={
                [
                    <Button
                        key="submit"
                        htmlType="submit"
                        form="editForm"
                        className='tw-bg-blue-500 tw-text-white tw-border-white hover:tw-bg-white hover:tw-text-blue-500 hover:tw-border-blue-500'
                        onClick={() => handleSave()}
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
            >
                <div className='tw-overflow-y-auto tw-h-full tw-w-full tw-border-black tw-border-2 tw-rounded-md'>
                    <div className='tw-flex tw-flex-col tw-w-full tw-h-full tw-p-4 tw-gap-4'>
                        <div className={classNames('tw-flex tw-flex-col tw-w-96 tw-h-16', {
                            "tw-w-56": isMobile,
                        })}>
                            <p>เลขบัญชี/ชื่อบัญชี:</p>
                            <Form.Item name="botname">
                                <Input className='tw-h-full tw-w-full' placeholder="ชื่อบัญชี" autoComplete="off" />
                            </Form.Item>
                        </div>
                        <div className={classNames('tw-flex tw-flex-col tw-w-96 tw-h-16', {
                            "tw-w-56": isMobile,
                        })}>
                            <p>เป้าหมาย:</p>
                            <Form.Item name="task">
                                <Input className='tw-h-full tw-w-full' placeholder="เป้าหมาย" autoComplete="off" />
                            </Form.Item>
                        </div>
                        <div className={classNames('tw-flex tw-flex-row tw-w-96 tw-h-16 tw-gap-4 tw-justify-between', {
                            "tw-w-56": isMobile,
                        })}>
                            <div className='tw-flex tw-flex-col tw-w-full'>
                                <p>ความถี่:</p>
                                <Form.Item name="frequency">
                                    <Select
                                        allowClear
                                        className='tw-w-full'
                                        placeholder="Please select"
                                        options={[{ label: "test", value: "test" }]}
                                    />
                                </Form.Item>
                            </div>
                            <div className='tw-flex tw-flex-col tw-w-full'>
                                <p>เวลา:</p>
                                <Form.Item name="execution_time">
                                    <ConfigProvider
                                        theme={{
                                            token: {
                                                colorTextLightSolid: '#000'
                                            },
                                        }}
                                    >
                                        <TimePicker
                                            className='tw-w-full'
                                            placeholder="Please select"
                                            format={'HH:mm'}
                                            onChange={handleTimeChange}
                                        />
                                    </ConfigProvider>
                                </Form.Item>
                            </div>
                            <div className='tw-flex tw-flex-col tw-w-full'>
                                <p>task_config:</p>
                                <Form.Item name="task_config">
                                    <Select
                                        allowClear
                                        className='tw-w-full'
                                        placeholder="Please select"
                                        options={[{ label: "test", value: "test" }]}
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

AddSchedueModal.propTypes = {
    modalToggle: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
    token: PropTypes.string,
    fetch: PropTypes.func,
}

export default AddSchedueModal;