import { useState, useEffect } from "react";
import { useResponsive } from "../../hooks";
import { Modal, Button, Input, Tooltip, InputNumber, Switch, Form, Select } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import classNames from "classnames";
import PropTypes from "prop-types";
import { ReactSortable } from "react-sortablejs";

const AddRoleModal = (props) => {
    /////////////////////////////////////props declaration/////////////////////////////////////////////////////////////////////
    const modalToggle = props.modalToggle;
    const handleCancel = props.handleCancel;
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    const [isModalOpen, setIsModalOpen] = useState(modalToggle);

    const [featureL, setFeatureL] = useState(
        [
            { id: 1, name: "shrek" },
            { id: 2, name: "fiona" },
        ]
    );

    const [featureR, setFeatureR] = useState(
        [
            { id: 3, name: "shesh" },
            { id: 4, name: "flask" },
        ]
    );

    const { isMobile, isPortrait } = useResponsive();

    ////////////////////////////////////////form//////////////////////////////////////////////////////////////////
    const [form] = Form.useForm();

    const formData = Form.useWatch([], form);

    useEffect(() => {
        form.resetFields();
    }, [form]);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////sweetalert and save logic///////////////////////////////////////////////////////////////////////
    const MySwal = withReactContent(Swal);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        setIsModalOpen(modalToggle);
    }, [modalToggle]);

    return (
        <Modal
            className="tw-max-h-full tw-max-w-full tw-w-fit tw-h-fit"
            title={"เพิ่มผู้ใช้"}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={[
                <Button
                    key="submit"
                    className="tw-bg-blue-500 tw-text-white tw-border-white hover:tw-bg-white hover:tw-text-blue-500 hover:tw-border-blue-500"
                // onClick={() => handleSave(formData)}
                >
                    บันทึก
                </Button>,
                <Button
                    key="delete"
                    className="tw-bg-red-500 tw-text-white tw-border-white hover:tw-bg-white hover:tw-text-red-500 hover:tw-border-red-500"
                // onClick={() => handleSave(formData)}
                >
                    ลบ
                </Button>,
            ]}
        >
            <div className="tw-h-full tw-w-full tw-border-black tw-border-2 tw-p-2 tw-rounded-md tw-flex tw-flex-col tw-items-center tw-overflow-y-auto">

                <div className='tw-flex tw-flex-col tw-w-fit tw-h-fit'>
                    <Form
                        form={form}
                        name="editForm"
                        id="editForm"
                        // onFinish={() => handleSave()}
                        autoComplete='off'
                    >

                        <div className='tw-flex tw-flex-row tw-w-full tw-h-full tw-gap-4'>
                            <div className={classNames('tw-flex tw-flex-col tw-w-96 tw-h-16', {
                                "tw-w-56": isMobile,
                            })}>
                                <p>ชื่อผู้ใช้งาน:</p>
                                <Form.Item name="username">
                                    <Input className='tw-h-full tw-w-full' placeholder="ชื่อบัญชี" required={true} autoComplete='off' />
                                </Form.Item>
                            </div>
                            <div className={classNames('tw-flex tw-flex-col tw-w-96 tw-h-16', {
                                "tw-w-56": isMobile,
                            })}>
                                <p>รหัสผ่าน:</p>
                                <Form.Item name="password">
                                    <Input.Password className='tw-h-full tw-w-full' placeholder="รหัสผ่าน" required={true} autoComplete='off' />
                                </Form.Item>
                            </div>
                            <div className={classNames('tw-flex tw-flex-col tw-w-96 tw-h-16', {
                                "tw-w-56": isMobile,
                            })}>
                                <p>Role:</p>
                                <Form.Item
                                    name="role"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select an role!',
                                        },
                                    ]}
                                >
                                    <Select
                                        mode="tags"
                                        allowClear
                                        className='tw-w-full'
                                        placeholder="Please select"
                                        options={[]}
                                    />
                                </Form.Item>
                            </div>
                        </div>

                        <div className='tw-flex tw-flex-row tw-w-full tw-h-full tw-gap-4'>
                            <div className={classNames('tw-flex tw-flex-col tw-w-96 tw-h-16', {
                                "tw-w-56": isMobile,
                            })}>
                                <p>ยศ:</p>
                                <Form.Item
                                    name="rank"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select an rank!',
                                        },
                                    ]}
                                >
                                    <Select
                                        mode="tags"
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
                                <p>ชื่อ-นามสกุล:</p>
                                <Form.Item name="name">
                                    <Input className='tw-h-full tw-w-full' placeholder="ชื่อ-นามสกุล" required={true} autoComplete='off' />
                                </Form.Item>
                            </div>
                            <div className={classNames('tw-flex tw-flex-col tw-w-96 tw-h-16', {
                                "tw-w-56": isMobile,
                            })}>
                                <p>ตำแหน่ง:</p>
                                <Form.Item name="class">
                                    <Input className='tw-h-full tw-w-full' placeholder="ตำแหน่ง" required={true} autoComplete='off' />
                                </Form.Item>
                            </div>
                            <div className={classNames('tw-flex tw-flex-col tw-w-96 tw-h-16', {
                                "tw-w-56": isMobile,
                            })}>
                                <p>กลุ่ม:</p>
                                <Form.Item
                                    name="group"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select an group!',
                                        },
                                    ]}
                                >
                                    <Select
                                        mode="tags"
                                        allowClear
                                        className='tw-w-full'
                                        placeholder="Please select"
                                        options={[]}
                                    />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="tw-w-full tw-h-full tw-flex tw-flex-row">
                            <ReactSortable list={featureL} setList={setFeatureL}
                                group={'shared'}
                                animation={150}
                            >
                                {featureL.map((item) => (
                                    <div key={item.id}>{item.name}</div>
                                ))}
                            </ReactSortable>
                            <ReactSortable list={featureR} setList={setFeatureR}
                                group={'shared'}
                                animation={150}
                            >
                                {featureR.map((item) => (
                                    <div key={item.id}>{item.name}</div>
                                ))}
                            </ReactSortable>
                            {/* {feature.left && feature.left.map((item) => (
                                    <div key={item.id}>{item.name}</div>
                                ))} */}
                        </div>

                    </Form>
                </div>
            </div>
        </Modal>
    );
};

AddRoleModal.propTypes = {
    modalToggle: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
};

export default AddRoleModal;
