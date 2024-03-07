import { useState, useEffect } from 'react';
import { useResponsive } from "../../hooks";
import { Form, Modal, Button, Input, Select } from 'antd';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import RPAWorkAPI from "../../service/RPAWorkAPI";
import { useParams } from 'react-router-dom';

const AddWorkModal = props => {
    //////////////////////////////////////////props declaration////////////////////////////////////////////////////////////////
    const modalToggle = props.modalToggle;
    const handleCancel = props.handleCancel;
    const token = props.token;
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    const [isModalOpen, setIsModalOpen] = useState(modalToggle);
    const [allBot, setAllBot] = useState([]);

    const { isMobile } = useResponsive();
    const param = useParams();

    ////////////////////////////////////////////////////form//////////////////////////////////////////////////////
    const [form] = Form.useForm();
    const formData = Form.useWatch([], form);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    const fetchAllBot = async () => {
        try {
            // setShowLoading(true);
            if (param.platform == "facebook") {
                await RPAWorkAPI.fbGetAllBot(token)
                    .then((response) => setAllBot(response.map((response) => (
                        {
                            label: response.botname,
                            value: response.botname,
                        }
                    )))
                    )
            } else if (param.platform == "X") {
                await RPAWorkAPI.twGetAllBot(token)
                    .then((response) => setAllBot(response.map((response) => (
                        {
                            label: response.botname,
                            value: response.botname,
                        }
                    )))
                    )
            }
        } catch (error) {
            console.error('Error fetching bot config:', error);
        } finally {
            // setShowLoading(false);
        }
    }

    useEffect(() => {
        fetchAllBot()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    ///////////////////////////////////////////sweetalert and save and delete///////////////////////////////////////////////////////////////
    const MySwal = withReactContent(Swal)

    const handleSave = () => {
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
        }).then(async (result) => {
            if (result.isConfirmed) {
                if (param.platform == "facebook") {
                    let payload = {
                        botname: formData.botname,
                        task: formData.task,
                    }
                    if (formData.work == "fbScrapTimeLineTask") {
                        await RPAWorkAPI.fbScrapTimeLineTask(token, payload)
                            .then(() => {
                                MySwal.fire({
                                    title: "เรียบร้อย!",
                                    text: "บันทึกข้อมูลแล้ว!",
                                    icon: "success"
                                });
                            })
                    } else if (formData.work == "fbScrapPostTask") {
                        await RPAWorkAPI.fbScrapPostTask(token, payload)
                            .then(() => {
                                MySwal.fire({
                                    title: "เรียบร้อย!",
                                    text: "บันทึกข้อมูลแล้ว!",
                                    icon: "success"
                                });
                            })
                    } else if (formData.work == "fbScrapProfileTask") {
                        await RPAWorkAPI.fbScrapProfileTask(token, payload)
                            .then(() => {
                                MySwal.fire({
                                    title: "เรียบร้อย!",
                                    text: "บันทึกข้อมูลแล้ว!",
                                    icon: "success"
                                });
                            })
                    } else if (formData.work == "fbScrapInteractionTask") {
                        await RPAWorkAPI.fbScrapInteractionTask(token, payload)
                            .then(() => {
                                MySwal.fire({
                                    title: "เรียบร้อย!",
                                    text: "บันทึกข้อมูลแล้ว!",
                                    icon: "success"
                                });
                            })
                    }

                }
                else if (param.platform == "X") {
                    let payload = {
                        botname: formData.botname,
                        search_raw: formData.task,
                    }
                    if (formData.work == "twScrapHastag") {
                        await RPAWorkAPI.twScrapHastag(token, payload)
                            .then(() => {
                                MySwal.fire({
                                    title: "เรียบร้อย!",
                                    text: "บันทึกข้อมูลแล้ว!",
                                    icon: "success"
                                });
                            })
                    }
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

    return (
        <Modal
            className='tw-max-h-full tw-max-w-fit'
            title={'เพิ่มข้อมูลงาน'}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={
                [
                    <Button
                        key="submit"
                        htmlType="submit"
                        form="editForm"
                        className='tw-bg-blue-500 tw-text-white tw-border-white hover:tw-bg-white hover:tw-text-blue-500 hover:tw-border-blue-500'
                    // onClick={() => handleSave(formData)}
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
            >
                <div className='tw-overflow-y-auto tw-h-full tw-w-full tw-border-black tw-border-2 tw-rounded-md'>
                    <div className='tw-flex tw-flex-col tw-w-full tw-h-full tw-p-4 tw-gap-4'>
                        <div className={classNames('tw-flex tw-flex-col tw-w-96 tw-h-16', {
                            "tw-w-56": isMobile,
                        })}>
                            <p>เลขบัญชี/ชื่อบัญชี:</p>
                            <Form.Item name="botname"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select an botname!',
                                    },
                                ]}>
                                {/* <Input className='tw-h-full tw-w-full' placeholder="ชื่อบัญชี" autoComplete="username" /> */}
                                <Select
                                    allowClear
                                    className='tw-w-full'
                                    placeholder="Please select"
                                    options={allBot ? allBot : []}
                                />
                            </Form.Item>
                        </div>
                        <div className={classNames('tw-flex tw-flex-col tw-w-96 tw-h-16', {
                            "tw-w-56": isMobile,
                        })}>
                            <p>งาน:</p>
                            <Form.Item name="work"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select an work!',
                                    },
                                ]}>
                                <Select
                                    allowClear
                                    className='tw-w-full'
                                    placeholder="Please select"
                                    options={param.platform == "facebook" ?
                                        [
                                            { label: "fbScrapTimeLineTask", value: "fbScrapTimeLineTask" },
                                            { label: "fbScrapPostTask", value: "fbScrapPostTask" },
                                            { label: "fbScrapProfileTask", value: "fbScrapProfileTask" },
                                            { label: "fbScrapInteractionTask", value: "fbScrapInteractionTask" }
                                        ] :
                                        param.platform == "X" ?
                                            [
                                                { label: "twScrapHastag", value: "twScrapHastag" }
                                            ] : []}
                                />
                            </Form.Item>
                        </div>
                        <div className={classNames('tw-flex tw-flex-col tw-w-96 tw-h-16', {
                            "tw-w-56": isMobile,
                        })}>
                            <p>เป้าหมาย:</p>
                            <Form.Item name="task">
                                <Input className='tw-h-full tw-w-full' required={true} placeholder="เป้าหมาย" autoComplete="target" />
                            </Form.Item>
                        </div>
                    </div>
                </div>
            </Form>
        </Modal >
    );
};

AddWorkModal.propTypes = {
    modalToggle: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
    token: PropTypes.string,
}

export default AddWorkModal;