import { useState, useEffect } from 'react';
import { useResponsive } from "../../hooks";
import { Loading } from "../../utilities";
import { Form, Modal, Button, Input, Select, Tooltip } from 'antd';
import { PlusOutlined, CloseCircleOutlined } from "@ant-design/icons";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import RPAUserAPI from "../../service/RPAUserAPI";

const AddUserModal = props => {
    ////////////////////////////////////////////props declaration//////////////////////////////////////////////////////////////
    const modalToggle = props.modalToggle;
    const handleCancel = props.handleCancel;
    // const receviedData = props.data;
    const owner = props.sentOwner;
    const token = props.token;
    const fetch = props.fetch;
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    const [isModalOpen, setIsModalOpen] = useState(modalToggle);
    // const [formData, setFormData] = useState({});
    const [inputValue, setInputValue] = useState('');
    const [availableGroup, setAvailableGroup] = useState([]);
    const [showLoading, setShowLoading] = useState(false);
    const { isMobile } = useResponsive();

    //////////////////////////////////////group////////////////////////////////////////////////////////////////////

    const fetchGroup = async () => {
        try {
            setShowLoading(true);
            await RPAUserAPI.fbGetBotGroup(token)
                .then((response) => setAvailableGroup(response.map((response) => (
                    {
                        label: response.group_name,
                        value: response.group_id,
                    }
                )))
                )
        } catch (error) {
            console.error('Error fetching bot config:', error);
        } finally {
            setShowLoading(false);
        }
    }

    const addGroup = async (group) => {

        const payload = { group_name: group }

        try {
            setShowLoading(true);
            await RPAUserAPI.fbAddBotGroup(token, payload).then(() => {
                MySwal.fire({
                    title: "เรียบร้อย!",
                    text: "เพื่มกลุ่มแล้ว!",
                    icon: "success"
                });
            })

        } catch (error) {
            console.error('Error fetching bot config:', error);
        } finally {
            fetchGroup()
            setShowLoading(false);
        }

    };

    const deleteGroup = async (id) => {
        const payload = { group_id: id }
        MySwal.fire({
            title: "ต้องการลบข้อมูล?",
            text: "กดตกลงเพื่อลบ",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ตกลง",
            cancelButtonText: "ยกเลิก",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setShowLoading(true);
                    await RPAUserAPI.fbDeleteBotGroup(token, payload).then(() => {
                        MySwal.fire({
                            title: "เรียบร้อย!",
                            text: "ลบกลุ่มแล้ว!",
                            icon: "success"
                        });
                    })
                } catch (error) {
                    console.error('Error fetching bot config:', error);
                } finally {
                    fetchGroup()
                    setShowLoading(false);
                }
            }

        });
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////form//////////////////////////////////////////////////////////////////
    const [form] = Form.useForm();

    const formData = Form.useWatch([], form);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////sweetalert and save and delete///////////////////////////////////////////////////////////////
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
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setShowLoading(true);
                    await RPAUserAPI.fbAddUser(token, formData).then(() => {
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
        fetchGroup()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log(availableGroup);
    }, [availableGroup]);

    return (
        <Modal
            className='tw-max-h-full tw-max-w-fit'
            title={'เพิ่มข้อมูลบัญชี'}
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
                autoComplete='off'
            >
                <div className='tw-overflow-y-auto tw-h-full tw-w-full tw-border-black tw-border-2 tw-rounded-md'>
                    <div className='tw-flex tw-flex-col tw-w-full tw-h-full tw-p-4 tw-gap-4'>
                        <div className={classNames('tw-flex tw-flex-col tw-w-96 tw-h-16', {
                            "tw-w-56": isMobile,
                        })}>
                            <p>ชื่อบัญชี:</p>
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
                            <p>ชื่อเล่น:</p>
                            <Form.Item name="botname">
                                <Input className='tw-h-full tw-w-full' placeholder="ชื่อเล่น" required={true} autoComplete='off' />
                            </Form.Item>
                        </div>
                        <div className={classNames('tw-flex tw-flex-col tw-w-96 tw-h-16', {
                            "tw-w-56": isMobile,
                        })}>
                            <p>Group:</p>
                            <Form.Item
                                name="groups"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select an groups!',
                                    },
                                ]}
                            >
                                <Select
                                    mode="multiple"
                                    allowClear
                                    className='tw-w-full'
                                    placeholder="Please select"
                                    options={availableGroup.length > 0 ? availableGroup : false}
                                    optionRender={(option) => (
                                        <div className='tw-flex tw-flex-row tw-justify-between'>
                                            <Tooltip title={"ลบกลุ่มจากระบบ"}>
                                                <CloseCircleOutlined className='tw-text-2xl tw-text-red-500' onClick={() => deleteGroup(option.value)} />
                                            </Tooltip>
                                            <p className='tw-font-bold'>{option.label}</p>
                                        </div>
                                    )}
                                    dropdownRender={(menu) => (
                                        <div className='tw-flex tw-flex-col'>
                                            {menu}
                                            <div className='tw-flex tw-flex-row tw-border-2 tw-border-black tw-rounded-md tw-p-1'>
                                                <Input
                                                    placeholder="สร้างกลุ่มใหม่"
                                                    onKeyDown={(e) => e.stopPropagation()}
                                                    addonAfter={<Tooltip title={"กดเพื่อเพิ่มกลุ่ม(จำเป็นต้องกรอกชื่อกลุ่ม)"}>
                                                        <Button
                                                            icon={<PlusOutlined />}
                                                            className='tw-bg-green-500 tw-text-white tw-border-white hover:tw-bg-white hover:tw-text-green-500 hover:tw-border-green-500'
                                                            onClick={() => addGroup(inputValue)}
                                                        >
                                                            เพิ่มกลุ่ม
                                                        </Button>
                                                    </Tooltip>}
                                                    value={inputValue}
                                                    onChange={(e) => setInputValue(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    )}
                                />
                            </Form.Item>
                        </div>
                        <div className={classNames('tw-flex tw-flex-col tw-w-96 tw-h-16', {
                            "tw-w-56": isMobile,
                        })}>
                            <p>Owner:</p>
                            <Form.Item
                                name="owner"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select an option!',
                                    },
                                ]}
                            >
                                <Select
                                    mode="multiple"
                                    allowClear
                                    className='tw-w-full'
                                    placeholder="Please select"
                                    options={owner?.map((response) => (
                                        {
                                            label: response.role_name,
                                            value: response.role_id,
                                        }
                                    ))}
                                    optionRender={(option) => (
                                        <div className='tw-flex tw-flex-row tw-justify-between'>
                                            <p className='tw-font-bold tw-text-black'>{option.label}</p>
                                            {/* <CloseCircleOutlined className='tw-text-2xl tw-text-red-500' /> */}
                                        </div>
                                    )}
                                />
                            </Form.Item>
                        </div>
                    </div>
                </div>
            </Form>
            <Loading isShown={showLoading} />
        </Modal >
    );
};

AddUserModal.propTypes = {
    modalToggle: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
    data: PropTypes.array,
    token: PropTypes.string,
    fetch: PropTypes.func,
    sentOwner: PropTypes.array,
}

export default AddUserModal;