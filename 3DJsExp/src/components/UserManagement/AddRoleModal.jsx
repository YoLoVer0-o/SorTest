import { useState, useEffect } from "react";
import { useResponsive } from "../../hooks";
import { Loading } from "../../utilities";
import { Modal, Button, Input, Form } from "antd";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import classNames from "classnames";
import PropTypes from "prop-types";
import { ReactSortable } from "react-sortablejs";
import UserManageAPI from "../../service/UserManageAPI";

const AddRoleModal = (props) => {
    /////////////////////////////////////props declaration/////////////////////////////////////////////////////////////////////
    const modalToggle = props.modalToggle;
    const handleCancel = props.handleCancel;
    const token = props.token;
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

    const { isMobile } = useResponsive();

    ////////////////////////////////////////form//////////////////////////////////////////////////////////////////
    const [form] = Form.useForm();

    const formData = Form.useWatch([], form);

    useEffect(() => {
        form.resetFields();
    }, [form]);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////



    ///////////////////////////////////sweetalert and save logic///////////////////////////////////////////////////////////////////////
    const MySwal = withReactContent(Swal);

    const handleSave = async () => {

        const payload = {
            role_name: formData.role_name,
            enabled: featureL,
            viewonly: featureC,
            disabled: featureR
        }

        console.log(payload);

        MySwal.fire({
            title: "ต้องการบันทึกบทบาท?",
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

                    await UserManageAPI.addRole(token, payload).then(() => {
                        MySwal.fire({
                            title: "เรียบร้อย!",
                            text: "บันทึกบทบาทแล้ว!",
                            icon: "success"
                        });
                    })

                } catch (error) {
                    console.error('Error fetching bot config:', error);
                } finally {
                    setShowLoading(false);
                    handleCancel();
                }
            }
        });
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        setIsModalOpen(modalToggle);
    }, [modalToggle]);

    return (
        <Modal
            className="tw-max-h-fit tw-max-w-fit tw-w-full tw-h-full"
            title={"เพิ่มบทบาท"}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={[
                <Button
                    key="submit"
                    htmlType="submit"
                    form="editForm"
                    className="tw-bg-blue-500 tw-text-white tw-border-white hover:tw-bg-white hover:tw-text-blue-500 hover:tw-border-blue-500"
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
                    >

                        <div className='tw-flex tw-flex-row tw-w-full tw-h-full tw-gap-4'>
                            <div className={classNames('tw-flex tw-flex-col tw-w-96 tw-h-16', {
                                "tw-w-56": isMobile,
                            })}>
                                <p>ชื่อบทบาทใหม่:</p>
                                <Form.Item name="role_name">
                                    <Input className='tw-h-full tw-w-full' placeholder="ชื่อบทบาทใหม่" required={true} autoComplete='off' />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="tw-flex tw-flex-col tw-w-full tw-h-full tw-gap-2">
                            <p className="tw-text-lg">สิทธิการใช้งาน</p>
                            <hr />
                            <div className="tw-w-full tw-h-full tw-flex tw-flex-row tw-gap-6">
                                <div className="tw-flex tw-flex-col tw-w-full tw-h-full">
                                    <p className="tw-text-lg tw-text-green-500">อนุญาติให้ใช้งาน:</p>
                                    <ReactSortable
                                        list={featureL}
                                        setList={setFeatureL}
                                        group={'shared'}
                                        animation={150}
                                        className="tw-border-2 tw-border-green-500 tw-w-full tw-h-full tw-pb-4"
                                    >
                                        {featureL.map((item) => (
                                            <div className="tw-flex tw-h-full tw-w-full tw-border-2 tw-border-black tw-p-4 tw-justify-center" key={item.id}>
                                                <p className="tw-text-lg">{item.name}</p>
                                            </div>
                                        ))}
                                    </ReactSortable>
                                </div>
                                <div className="tw-flex tw-flex-col tw-w-full tw-h-full">
                                    <p className="tw-text-lg tw-text-red-500">ไม่อนุญาติให้ใช้งาน:</p>
                                    <ReactSortable
                                        list={featureC}
                                        setList={setFeatureC}
                                        group={'shared'}
                                        animation={150}
                                        className="tw-border-2 tw-border-red-500 tw-w-full tw-h-full tw-pb-4"
                                    >
                                        {featureC.map((item) => (
                                            <div className="tw-flex tw-h-full tw-w-full tw-border-2 tw-border-black tw-p-4 tw-justify-center" key={item.id}>
                                                <p className="tw-text-lg">{item.name}</p>
                                            </div>
                                        ))}
                                    </ReactSortable>
                                </div>
                                <div className="tw-flex tw-flex-col tw-w-full tw-h-full">
                                    <p className="tw-text-lg tw-text-blue-500">อนุญาติให้มองเห็น:</p>
                                    <ReactSortable
                                        list={featureR}
                                        setList={setFeatureR}
                                        group={'shared'}
                                        animation={150}
                                        className="tw-border-2 tw-border-blue-500 tw-w-full tw-h-full tw-pb-4"
                                    >
                                        {featureR.map((item) => (
                                            <div className="tw-flex tw-h-full tw-w-full tw-border-2 tw-border-black tw-p-4 tw-justify-center" key={item.id}>
                                                <p className="tw-text-lg">{item.name}</p>
                                            </div>
                                        ))}
                                    </ReactSortable>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
            <Loading isShown={showLoading} />
        </Modal>
    );
};

AddRoleModal.propTypes = {
    modalToggle: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired
};

export default AddRoleModal;
