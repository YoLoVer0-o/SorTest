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

    const { isMobile } = useResponsive();
    const param = useParams();

    ////////////////////////////////////////////////////form//////////////////////////////////////////////////////
    const [form] = Form.useForm();
    const formData = Form.useWatch([], form);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////sweetalert and save and delete///////////////////////////////////////////////////////////////
    const MySwal = withReactContent(Swal)

    const handleSave = () => {
        console.log(formData);

        let payload = {
            botname: formData.botname,
            task: formData.task,
        }

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




                } else if (param.platform == "X") {
                    // let twFormdata = {
                    //     username: formData.username,
                    //     password: formData.password,
                    //     groups: [
                    //         formData
                    //     ],
                    //     botname: formData.botname
                    // }
                    await RPAWorkAPI.twAddUser(token, formData).then(() => {
                        MySwal.fire({
                            title: "เรียบร้อย!",
                            text: "บันทึกข้อมูลแล้ว!",
                            icon: "success"
                        });
                    })
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
                onFinish={() => handleSave()}
            >
                <div className='tw-overflow-y-auto tw-h-full tw-w-full tw-border-black tw-border-2 tw-rounded-md'>
                    <div className='tw-flex tw-flex-col tw-w-full tw-h-full tw-p-4 tw-gap-4'>
                        <div className={classNames('tw-flex tw-flex-col tw-w-96 tw-h-16', {
                            "tw-w-56": isMobile,
                        })}>
                            <p>เลขบัญชี/ชื่อบัญชี:</p>
                            <Form.Item name="botname">
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
                                    options={[
                                        { label: "fbScrapTimeLineTask", value: "fbScrapTimeLineTask" },
                                        { label: "fbScrapPostTask", value: "fbScrapPostTask" },
                                        { label: "fbScrapProfileTask", value: "fbScrapProfileTask" },
                                        { label: "fbScrapInteractionTask", value: "fbScrapInteractionTask" }
                                    ]}
                                />
                            </Form.Item>
                        </div>
                        <div className={classNames('tw-flex tw-flex-col tw-w-96 tw-h-16', {
                            "tw-w-56": isMobile,
                        })}>
                            <p>เป้าหมาย:</p>
                            <Form.Item name="task">
                                <Input className='tw-h-full tw-w-full' placeholder="เป้าหมาย" autoComplete="target" />
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