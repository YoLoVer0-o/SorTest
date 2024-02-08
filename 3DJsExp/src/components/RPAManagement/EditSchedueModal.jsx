import { useState, useEffect } from 'react';
import { useResponsive } from "../../hooks";
import { Form, Modal, Button, Input, Select, ConfigProvider, TimePicker, Switch, InputNumber } from 'antd';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import dayjs from 'dayjs';
import RPASchedueAPI from "../../service/RPASchedueAPI";
import { Loading } from "../../utilities";

const EditSchedueModal = props => {
    ///////////////////////////////////////////props declaration///////////////////////////////////////////////////////////////
    const modalToggle = props.modalToggle;
    const handleCancel = props.handleCancel;
    const modalData = props.modalData;
    const token = props.token;
    const fetch = props.fetch;
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    const [isModalOpen, setIsModalOpen] = useState(modalToggle);
    const [taskConfig, setTaskConfig] = useState();
    const [formData, setFormData] = useState({});
    const [showLoading, setShowLoading] = useState(false);
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    const { isMobile } = useResponsive();

    //////////////////////////////////////////form////////////////////////////////////////////////////////////////
    const [form] = Form.useForm();

    const handleTimeChange = (value) => {
        console.log(dayjs(value).format('HH:mm'));
    }

    const onFinish = (values) => {
        console.log(modalData);
        console.log(values);
        setFormData(values);
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
                try {
                    setShowLoading(true);
                    RPASchedueAPI.fbUpdateSchedule(token, modalData.task_id, formData).then(() => {
                        MySwal.fire({
                            title: "เรียบร้อย!",
                            text: "บันทึกข้อมูลแล้ว!",
                            icon: "success"
                        });
                    })
                } catch (error) {
                    console.error('Error fetching bot config:', error);
                } finally {
                    fetch()
                    setShowLoading(false);
                }
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
                try {
                    setShowLoading(true);
                    RPASchedueAPI.fbDeleteSchedule(token, modalData.botname).then(() => {
                        MySwal.fire({
                            title: "เรียบร้อย!",
                            text: "งานประจำถูกลบแล้ว",
                            icon: "success"
                        });
                    })
                } catch (error) {
                    console.error('Error fetching bot config:', error);
                } finally {
                    fetch()
                    setShowLoading(false);
                }
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
            className='tw-max-h-full tw-max-w-full'
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
                // initialValues={modalData}
                initialValues={taskConfig ?
                    {
                        modalData,
                        task_config: {
                            post_configures: {
                                limit_comment: 300,
                                need_reaction: true,
                                need_comment: true,
                                need_comment_posttime: false,
                                need_comment_reaction: false,
                                need_subcomment: false,
                                need_subcomment_posttime: false,
                                need_subcomment_reaction: false,
                                need_reply_subcomment: false,
                                need_reply_subcomment_posttime: false,
                                need_reply_subcomment_reaction: false,
                                comment_type: "ความคิดเห็นทั้งหมด"
                            }
                        }
                    }
                    :
                    modalData
                }
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
                                        options={[{ label: "วันละครั้ง", value: "Once a day" }, { label: "ชั่วโมงละครั้ง", value: "Hourly" }]}
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
                                <Switch
                                    onChange={(checked) => setTaskConfig(checked)}
                                    className='tw-w-fit'
                                />
                                {taskConfig && (
                                    <div className='tw-flex tw-flex-col tw-w-full'>
                                        <div className='tw-flex tw-flex-col tw-w-full tw-gap-4'>
                                            <p>post_configures</p>
                                            <div className='tw-flex tw-flex-row tw-w-full'>
                                                <p>limit_comment:</p>
                                                <Form.Item name={["task_config", "post_configures", "limit_comment"]}>
                                                    <InputNumber
                                                        type="number"
                                                        className='tw-border-2 tw-rounded-lg tw-border-sky-400 tw-drop-shadow-md hover:tw-border-sky-700 tw-w-full'
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className='tw-flex tw-flex-row tw-w-full'>
                                                <p>need_reaction:</p>
                                                <Form.Item name={["task_config", "post_configures", "need_reaction"]}>
                                                    <Switch
                                                        className='tw-w-fit'
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className='tw-flex tw-flex-row tw-w-full'>
                                                <p>need_comment:</p>
                                                <Form.Item name={["task_config", "post_configures", "need_comment"]}>
                                                    <Switch
                                                        className='tw-w-fit'
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className='tw-flex tw-flex-row tw-w-full'>
                                                <p>need_comment_posttime:</p>
                                                <Form.Item name={["task_config", "post_configures", "need_comment_posttime"]}>
                                                    <Switch
                                                        className='tw-w-fit'
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className='tw-flex tw-flex-row tw-w-full'>
                                                <p>need_comment_reaction:</p>
                                                <Form.Item name={["task_config", "post_configures", "need_comment_reaction"]}>
                                                    <Switch
                                                        className='tw-w-fit'
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className='tw-flex tw-flex-row tw-w-full'>
                                                <p>need_subcomment:</p>
                                                <Form.Item name={["task_config", "post_configures", "need_subcomment"]}>
                                                    <Switch
                                                        className='tw-w-fit'
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className='tw-flex tw-flex-row tw-w-full'>
                                                <p>need_subcomment_posttime:</p>
                                                <Form.Item name={["task_config", "post_configures", "need_subcomment_posttime"]}>
                                                    <Switch
                                                        className='tw-w-fit'
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className='tw-flex tw-flex-row tw-w-full'>
                                                <p>need_subcomment_reaction:</p>
                                                <Form.Item name={["task_config", "post_configures", "need_subcomment_reaction"]}>
                                                    <Switch
                                                        className='tw-w-fit'
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className='tw-flex tw-flex-row tw-w-full'>
                                                <p>need_reply_subcomment:</p>
                                                <Form.Item name={["task_config", "post_configures", "need_reply_subcomment"]}>
                                                    <Switch
                                                        className='tw-w-fit'
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className='tw-flex tw-flex-row tw-w-full'>
                                                <p>need_reply_subcomment_posttime:</p>
                                                <Form.Item name={["task_config", "post_configures", "need_reply_subcomment_posttime"]}>
                                                    <Switch
                                                        className='tw-w-fit'
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className='tw-flex tw-flex-row tw-w-full'>
                                                <p>need_reply_subcomment_reaction:</p>
                                                <Form.Item name={["task_config", "post_configures", "need_reply_subcomment_reaction"]}>
                                                    <Switch
                                                        className='tw-w-fit'
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className='tw-flex tw-flex-row tw-w-full'>
                                                <p>comment_type:</p>
                                                <Form.Item name={["task_config", "post_configures", "comment_type"]}>
                                                    <Select
                                                        allowClear
                                                        className='tw-w-full'
                                                        placeholder="Please select"
                                                        options={[{ label: "ความคิดเห็นทั้งหมด", value: "ความคิดเห็นทั้งหมด" }]}
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
            <Loading isShown={showLoading} />
        </Modal >

    );
};

EditSchedueModal.propTypes = {
    modalToggle: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
    modalData: PropTypes.any.isRequired,
    token: PropTypes.string,
    fetch: PropTypes.func,
}

export default EditSchedueModal;