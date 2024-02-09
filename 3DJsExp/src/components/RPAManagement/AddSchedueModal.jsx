import { useState, useEffect } from 'react';
import { useResponsive } from "../../hooks";
import { Form, Modal, Button, Input, Select, Switch, TimePicker, ConfigProvider, InputNumber } from 'antd';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import RPASchedueAPI from "../../service/RPASchedueAPI";
import dayjs from 'dayjs';
import { Loading } from "../../utilities";

const AddSchedueModal = props => {
    ///////////////////////////////////////////props declaration///////////////////////////////////////////////////////////////
    const modalToggle = props.modalToggle;
    const handleCancel = props.handleCancel;
    const token = props.token;
    const fetch = props.fetch;
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    const [isModalOpen, setIsModalOpen] = useState(modalToggle);
    const [taskConfig, setTaskConfig] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [defaultData, setDefaultData] = useState({
        botname: "",
        task: "",
        frequency: "",
        execution_time: "",
        task_config: {}
    });
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    const { isMobile } = useResponsive();

    //////////////////////////////////////////form////////////////////////////////////////////////////////////////
    const [form] = Form.useForm();

    const formData = Form.useWatch([], form);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////sweetalert and save and delete logic///////////////////////////////////////////////////////////////
    const MySwal = withReactContent(Swal)

    const handleSave = async () => {
        // console.log(formData);
        let payLoad
        if (!taskConfig) {
            payLoad = { ...formData, execution_time: dayjs(formData.execution_time).format('HH:mm'), task_config: {} }

        } else {
            payLoad = { ...formData, execution_time: dayjs(formData.execution_time).format('HH:mm') }
        }
        console.log(payLoad);
        MySwal.fire({
            title: "ต้องการบันทึกข้อมูล?",
            text: "กดตกลงเพื่อบันทึก",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ตกลง",
            cancelButtonText: "ยกเลิก",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setShowLoading(true);
                    await RPASchedueAPI.fbAddSchedule(token, payLoad).then(() => {
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
                    handleCancel();
                }
            }
        });
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        form.resetFields();
    }, [form]);

    useEffect(() => {
        setIsModalOpen(modalToggle);
    }, [modalToggle]);

    useEffect(() => {
        if (taskConfig) {
            setDefaultData({
                botname: "",
                task: "",
                frequency: "",
                execution_time: "",
                task_config: {
                    post_configures: {
                        "limit_comment": 300,
                        "need_reaction": true,
                        "need_comment": true,
                        "need_comment_posttime": false,
                        "need_comment_reaction": false,
                        "need_subcomment": false,
                        "need_subcomment_posttime": false,
                        "need_subcomment_reaction": false,
                        "need_reply_subcomment": false,
                        "need_reply_subcomment_posttime": false,
                        "need_reply_subcomment_reaction": false,
                        "comment_type": "ความคิดเห็นทั้งหมด"
                    }
                }
            })

            form.setFieldsValue({
                task_config: {
                    post_configures: {
                        "limit_comment": 300,
                        "need_reaction": true,
                        "need_comment": true,
                        "need_comment_posttime": false,
                        "need_comment_reaction": false,
                        "need_subcomment": false,
                        "need_subcomment_posttime": false,
                        "need_subcomment_reaction": false,
                        "need_reply_subcomment": false,
                        "need_reply_subcomment_posttime": false,
                        "need_reply_subcomment_reaction": false,
                        "comment_type": "ความคิดเห็นทั้งหมด"
                    }
                }
            })

        }
        else if (!taskConfig) {
            setDefaultData({
                botname: "",
                task: "",
                frequency: "",
                execution_time: "",
                task_config: {}
            })

            form.setFieldsValue({ task_config: {} })

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [taskConfig]);


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
                    // onClick={() => handleSave()}
                    >
                        บันทึก
                    </Button>
                    ,]}
        >
            <Form
                form={form}
                name="editForm"
                id="editForm"
                onFinish={() => handleSave()}
                initialValues={defaultData}
            >
                <div className='tw-overflow-y-auto tw-h-full tw-w-full tw-border-black tw-border-2 tw-rounded-md'>
                    <div className='tw-flex tw-flex-col tw-w-full tw-h-full tw-p-4 tw-gap-4'>
                        <div className={classNames('tw-flex tw-flex-col tw-w-96 tw-h-16', {
                            "tw-w-56": isMobile,
                        })}>
                            <p>เลขบัญชี/ชื่อบัญชี:</p>
                            <Form.Item name="botname">
                                <Input className='tw-h-full tw-w-full' placeholder="ชื่อบัญชี" required={true} autoComplete="off" />
                            </Form.Item>
                        </div>
                        <div className={classNames('tw-flex tw-flex-col tw-w-96 tw-h-16', {
                            "tw-w-56": isMobile,
                        })}>
                            <p>เป้าหมาย:</p>
                            <Form.Item name="task">
                                <Input className='tw-h-full tw-w-full' placeholder="เป้าหมาย" required={true} autoComplete="off" />
                            </Form.Item>
                        </div>
                        <div className={classNames('tw-flex tw-flex-row tw-w-96 tw-h-16 tw-gap-4 tw-justify-between', {
                            "tw-w-56": isMobile,
                        })}>
                            <div className='tw-flex tw-flex-col tw-w-full'>
                                <p>ความถี่:</p>
                                <Form.Item
                                    name="frequency"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select an frequency!',
                                        },
                                    ]}
                                >
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

                                <ConfigProvider
                                    theme={{
                                        token: {
                                            colorTextLightSolid: '#000'
                                        },
                                    }}
                                >
                                    <Form.Item
                                        name="execution_time"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please select an execution time!',
                                            },
                                        ]}
                                    >
                                        <TimePicker
                                            className='tw-w-full'
                                            placeholder="Please select"
                                            format={'HH:mm'}
                                        // onChange={handleTimeChange}
                                        />
                                    </Form.Item>
                                </ConfigProvider>
                            </div>
                        </div>
                        <div className='tw-flex tw-flex-col tw-w-full'>
                            <div className='tw-flex tw-flex-row tw-w-full tw-gap-2'>
                                <p>task_config:</p>
                                <Switch
                                    defaultChecked={taskConfig}
                                    onChange={(checked) => setTaskConfig(checked)}
                                    className='tw-w-fit'
                                />
                            </div>
                            {taskConfig && (
                                <div className='tw-flex tw-flex-col tw-w-full tw-my-2 tw-border-2 tw-p-4'>
                                    <div className='tw-w-full tw-h-full'>
                                        <p className='tw-text-lg'>post_configures</p>
                                        <div className='tw-flex tw-flex-col tw-w-full tw-gap-2 tw-border-y-2 tw-py-2'>
                                            <div className='tw-flex tw-flex-row tw-w-full tw-gap-2 tw-items-baseline tw-justify-center'>
                                                <p>limit_comment:</p>
                                                <Form.Item
                                                    name={["task_config", "post_configures", "limit_comment"]}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please input limit comment!',
                                                        },
                                                    ]}
                                                >
                                                    <InputNumber
                                                        type="number"
                                                        className='tw-border-2 tw-rounded-lg tw-border-sky-400 tw-drop-shadow-md tw-w-fit hover:tw-border-sky-700'
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className='tw-flex tw-flex-row tw-w-full tw-gap-2 tw-items-baseline tw-justify-center'>
                                                <p>need_reaction:</p>
                                                <Form.Item name={["task_config", "post_configures", "need_reaction"]}>
                                                    <Switch
                                                        className='tw-w-fit'
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className='tw-flex tw-flex-row tw-w-full tw-gap-2 tw-items-baseline tw-justify-center'>
                                                <p>need_comment:</p>
                                                <Form.Item name={["task_config", "post_configures", "need_comment"]}>
                                                    <Switch
                                                        className='tw-w-fit'
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className='tw-flex tw-flex-row tw-w-full tw-gap-2 tw-items-baseline tw-justify-center'>
                                                <p>need_comment_posttime:</p>
                                                <Form.Item name={["task_config", "post_configures", "need_comment_posttime"]}>
                                                    <Switch
                                                        className='tw-w-fit'
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className='tw-flex tw-flex-row tw-w-full tw-gap-2 tw-items-baseline tw-justify-center'>
                                                <p>need_comment_reaction:</p>
                                                <Form.Item name={["task_config", "post_configures", "need_comment_reaction"]}>
                                                    <Switch
                                                        className='tw-w-fit'
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className='tw-flex tw-flex-row tw-w-full tw-gap-2 tw-items-baseline tw-justify-center'>
                                                <p>need_subcomment:</p>
                                                <Form.Item name={["task_config", "post_configures", "need_subcomment"]}>
                                                    <Switch
                                                        className='tw-w-fit'
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className='tw-flex tw-flex-row tw-w-full tw-gap-2 tw-items-baseline tw-justify-center'>
                                                <p>need_subcomment_posttime:</p>
                                                <Form.Item name={["task_config", "post_configures", "need_subcomment_posttime"]}>
                                                    <Switch
                                                        className='tw-w-fit'
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className='tw-flex tw-flex-row tw-w-full tw-gap-2 tw-items-baseline tw-justify-center'>
                                                <p>need_subcomment_reaction:</p>
                                                <Form.Item name={["task_config", "post_configures", "need_subcomment_reaction"]}>
                                                    <Switch
                                                        className='tw-w-fit'
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className='tw-flex tw-flex-row tw-w-full tw-gap-2 tw-items-baseline tw-justify-center'>
                                                <p>need_reply_subcomment:</p>
                                                <Form.Item name={["task_config", "post_configures", "need_reply_subcomment"]}>
                                                    <Switch
                                                        className='tw-w-fit'
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className='tw-flex tw-flex-row tw-w-full tw-gap-2 tw-items-baseline tw-justify-center'>
                                                <p>need_reply_subcomment_posttime:</p>
                                                <Form.Item name={["task_config", "post_configures", "need_reply_subcomment_posttime"]}>
                                                    <Switch
                                                        className='tw-w-fit'
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className='tw-flex tw-flex-row tw-w-full tw-gap-2 tw-items-baseline tw-justify-center'>
                                                <p>need_reply_subcomment_reaction:</p>
                                                <Form.Item name={["task_config", "post_configures", "need_reply_subcomment_reaction"]}>
                                                    <Switch
                                                        className='tw-w-fit'
                                                    />
                                                </Form.Item>
                                            </div>
                                            <div className='tw-flex tw-flex-row tw-w-full tw-gap-2 tw-items-baseline tw-justify-center'>
                                                <p>comment_type:</p>
                                                <Form.Item
                                                    name={["task_config", "post_configures", "comment_type"]}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please select an comment type!',
                                                        },
                                                    ]}
                                                >
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
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Form>
            <Loading isShown={showLoading} />
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