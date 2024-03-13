import { useState, useEffect } from "react";
import { useResponsive } from "../../hooks";
import { Loading } from "../../utilities";
import { Modal, Button, Input, Tooltip, InputNumber, Switch, Form, Select } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import classNames from "classnames";
import PropTypes from "prop-types";
import { ReactSortable } from "react-sortablejs";
import UserManageAPI from "../../service/UserManageAPI";

const EditUserRoleModal = (props) => {
    /////////////////////////////////////props declaration/////////////////////////////////////////////////////////////////////
    const modalToggle = props.modalToggle;
    const handleCancel = props.handleCancel;
    const token = props.token;
    const fetchUser = props.fetchData;
    const user = props.user;
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    const [isModalOpen, setIsModalOpen] = useState(modalToggle);

    const [featureL, setFeatureL] = useState(
        [
            { id: 1, name: "รายงานสรุป" },
            { id: 2, name: "ประเมินผลตอบรับ" },
            { id: 3, name: "โพสต์และความเคลื่อนไหว" },
        ]
    );

    const [featureC, setFeatureC] = useState(
        [
            { id: 4, name: "เผยแพร่ข้อมูล" },
            { id: 5, name: "RPA Management" },
            { id: 6, name: "Classification Config" },
        ]
    );


    const [featureR, setFeatureR] = useState(
        [
            { id: 7, name: "Recommendation" },
            { id: 8, name: "User Management" },
            { id: 9, name: "SEO WebSite" },
        ]
    );

    const [showLoading, setShowLoading] = useState(false);

    const [allRoles, setAllRoles] = useState([]);

    const { isMobile, isPortrait } = useResponsive();

    ////////////////////////////////////////form//////////////////////////////////////////////////////////////////
    const [form] = Form.useForm();

    const formData = Form.useWatch([], form);

    useEffect(() => {
        form.resetFields();
    }, [form]);

    useEffect(() => {
        console.log(user.permissions[0]);
        if (user.permissions && user.permissions?.length > 0) {
            setFeatureL(user.permissions[0].enabled)
            setFeatureC(user.permissions[1].disabled)
            setFeatureR(user.permissions[2].viewonly)
        }
    }, [user]);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////sweetalert and save logic///////////////////////////////////////////////////////////////////////
    const MySwal = withReactContent(Swal);

    const handleSave = async () => {

        console.log(formData);

        const payload = { ...formData, roles: [formData.roles] }

        MySwal.fire({
            title: "ต้องการบันทึกการแก้ไข?",
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

                    await UserManageAPI.editUser(token, payload).then(() => {
                        MySwal.fire({
                            title: "เรียบร้อย!",
                            text: "บันทึกการแก้ไขแล้ว!",
                            icon: "success"
                        });
                    })

                } catch (error) {
                    console.error('Error fetching bot config:', error);
                } finally {
                    setShowLoading(false);
                    fetchUser();
                    handleCancel();
                }
            }
        });
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    const fetchRole = async () => {
        try {
            setShowLoading(true);

            const data = await UserManageAPI.getAllRole(token)
            setAllRoles(data.map((data) => (
                {
                    label: data.role_name,
                    value: data.role_id,
                }
            )));

        } catch (error) {
            console.error('Error fetching bot config:', error);
        } finally {
            setShowLoading(false);
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        setIsModalOpen(modalToggle);
    }, [modalToggle]);

    useEffect(() => {
        fetchRole()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Modal
            className="tw-max-h-full tw-max-w-full tw-w-fit tw-h-fit"
            title={"เเก้ไขผู้ใช้"}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={[
                <Button
                    key="submit"
                    htmlType="submit"
                    form="editForm"
                    className="tw-bg-blue-500 tw-text-white tw-border-white hover:tw-bg-white hover:tw-text-blue-500 hover:tw-border-blue-500"
                // onClick={() => handleSave(formData)}
                >
                    บันทึก
                </Button>,
            ]}
        >
            <div className="tw-h-full tw-w-full tw-border-black tw-border-2 tw-p-2 tw-rounded-md tw-flex tw-flex-col tw-overflow-y-auto">

                <div className='tw-flex tw-flex-col tw-w-fit tw-h-fit'>
                    <Form
                        form={form}
                        name="editForm"
                        id="editForm"
                        onFinish={() => handleSave()}
                        autoComplete='off'
                        initialValues={user}
                    >

                        <div className='tw-flex tw-flex-row tw-w-full tw-h-full tw-gap-4'>
                            <div className={classNames('tw-flex tw-flex-col tw-w-96 tw-h-16', {
                                "tw-w-56": isMobile,
                            })}>
                                <p>ชื่อผู้ใช้งาน:</p>
                                <Form.Item name="username">
                                    <Input className='tw-h-full tw-w-full' placeholder="ชื่อบัญชี" required={true} autoComplete='off' disabled />
                                </Form.Item>
                            </div>
                            {/* <div className={classNames('tw-flex tw-flex-col tw-w-96 tw-h-16', {
                                "tw-w-56": isMobile,
                            })}>
                                <p>รหัสผ่าน:</p>
                                <Form.Item name="password">
                                    <Input.Password className='tw-h-full tw-w-full' placeholder="รหัสผ่าน" required={true} autoComplete='off' />
                                </Form.Item>
                            </div> */}
                            <div className={classNames('tw-flex tw-flex-col tw-w-96 tw-h-16', {
                                "tw-w-56": isMobile,
                            })}>
                                <p>Role:</p>
                                <Form.Item
                                    name="roles"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select an role!',
                                        },
                                    ]}
                                >
                                    <Select
                                        allowClear
                                        className='tw-w-full'
                                        placeholder="Please select"
                                        options={allRoles}
                                    />
                                </Form.Item>
                            </div>
                        </div>

                        <div className='tw-flex tw-flex-row tw-w-full tw-h-full tw-gap-4'>
                            {/* <div className={classNames('tw-flex tw-flex-col tw-w-96 tw-h-16', {
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
                            </div> */}
                            <div className={classNames('tw-flex tw-flex-col tw-w-96 tw-h-16', {
                                "tw-w-56": isMobile,
                            })}>
                                <p>ชื่อ:</p>
                                <Form.Item name="firstname">
                                    <Input className='tw-h-full tw-w-full' placeholder="ชื่อ" required={true} autoComplete='off' />
                                </Form.Item>
                            </div>
                            <div className={classNames('tw-flex tw-flex-col tw-w-96 tw-h-16', {
                                "tw-w-56": isMobile,
                            })}>
                                <p>นามสกุล:</p>
                                <Form.Item name="lastname">
                                    <Input className='tw-h-full tw-w-full' placeholder="นามสกุล" required={true} autoComplete='off' />
                                </Form.Item>
                            </div>
                            {/* <div className={classNames('tw-flex tw-flex-col tw-w-96 tw-h-16', {
                                "tw-w-56": isMobile,
                            })}>
                                <p>ตำแหน่ง:</p>
                                <Form.Item name="class">
                                    <Input className='tw-h-full tw-w-full' placeholder="ตำแหน่ง" required={true} autoComplete='off' />
                                </Form.Item>
                            </div> */}
                            <div className={classNames('tw-flex tw-flex-col tw-w-96 tw-h-16', {
                                "tw-w-56": isMobile,
                            })}>
                                <p>email:</p>
                                <Form.Item name="email">
                                    <Input className='tw-h-full tw-w-full' placeholder="email" required={true} autoComplete='off' />
                                </Form.Item>
                            </div>
                            {/* <div className={classNames('tw-flex tw-flex-col tw-w-96 tw-h-16', {
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
                            </div> */}
                        </div>

                        <div className="tw-flex tw-flex-col tw-w-full tw-h-full tw-gap-2">
                            <p className="tw-text-lg">สิทธิการใช้งาน</p>
                            <hr />
                            <div className="tw-w-full tw-h-full tw-flex tw-flex-row tw-gap-6">
                                {featureL && featureL.length > 0 &&
                                    <div className="tw-flex tw-flex-col tw-w-full tw-h-full">
                                        <p className="tw-text-lg tw-text-green-500">อนุญาติให้ใช้งาน:</p>
                                        {/* <ReactSortable
                                        list={featureL}
                                        setList={setFeatureL}
                                        group={'shared'}
                                        animation={150}
                                        className="tw-border-2 tw-border-green-500 tw-w-full tw-h-full tw-pb-4"
                                    > */}
                                        <div className="tw-border-2 tw-border-green-500 tw-w-full tw-h-full tw-pb-4">
                                            {featureL.map((item) => (
                                                <div className="tw-flex tw-h-full tw-w-full tw-border-2 tw-border-black tw-p-4 tw-justify-center" key={item.id}>
                                                    <p className="tw-text-lg">{item.name}</p>
                                                </div>
                                            ))}
                                        </div>
                                        {/* </ReactSortable> */}
                                    </div>
                                }
                                {featureC && featureC.length > 0 &&
                                    <div className="tw-flex tw-flex-col tw-w-full tw-h-full">
                                        <p className="tw-text-lg tw-text-red-500">ไม่อนุญาติให้ใช้งาน:</p>
                                        {/* <ReactSortable
                                        list={featureC}
                                        setList={setFeatureC}
                                        group={'shared'}
                                        animation={150}
                                        className="tw-border-2 tw-border-red-500 tw-w-full tw-h-full tw-pb-4"
                                    > */}
                                        <div className="tw-border-2 tw-border-red-500 tw-w-full tw-h-full tw-pb-4">
                                            {featureC.map((item) => (
                                                <div className="tw-flex tw-h-full tw-w-full tw-border-2 tw-border-black tw-p-4 tw-justify-center" key={item.id}>
                                                    <p className="tw-text-lg">{item.name}</p>
                                                </div>
                                            ))}
                                        </div>
                                        {/* </ReactSortable> */}
                                    </div>
                                }
                                {featureR && featureR.length > 0 &&
                                    <div className="tw-flex tw-flex-col tw-w-full tw-h-full">
                                        <p className="tw-text-lg tw-text-blue-500">อนุญาติให้มองเห็น:</p>
                                        {/* <ReactSortable
                                        list={featureR}
                                        setList={setFeatureR}
                                        group={'shared'}
                                        animation={150}
                                        className="tw-border-2 tw-border-blue-500 tw-w-full tw-h-full tw-pb-4"
                                    > */}
                                        <div className="tw-border-2 tw-border-blue-500 tw-w-full tw-h-full tw-pb-4">
                                            {featureR.map((item) => (
                                                <div className="tw-flex tw-h-full tw-w-full tw-border-2 tw-border-black tw-p-4 tw-justify-center" key={item.id}>
                                                    <p className="tw-text-lg">{item.name}</p>
                                                </div>
                                            ))}
                                        </div>
                                        {/* </ReactSortable> */}
                                    </div>
                                }
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
            <Loading isShown={showLoading} />
        </Modal>
    );
};

EditUserRoleModal.propTypes = {
    modalToggle: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    fetchData: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

export default EditUserRoleModal;
