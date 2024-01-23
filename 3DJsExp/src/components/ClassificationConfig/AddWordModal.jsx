import { useState, useEffect } from "react";
import { useResponsive } from "../../hooks";
import { Modal, Button, Input, Tooltip, InputNumber, Switch } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import classNames from "classnames";
import PropTypes from "prop-types";
import classificationAPI from "../../service/classificationAPI";

const AddWordModal = (props) => {
    /////////////////////////////////////props declaration/////////////////////////////////////////////////////////////////////
    const modalToggle = props.modalToggle;
    const handleCancel = props.handleCancel;
    const category = props.category;
    const fetchWord = props.fetchWord;
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    const [isModalOpen, setIsModalOpen] = useState(modalToggle);
    const [formData, setFormData] = useState({
        keyword: "",
        score: 0,
        actual: false,
    });

    const { isMobile,isPortrait } = useResponsive();

    ///////////////////////////////////sweetalert and save logic///////////////////////////////////////////////////////////////////////
    const MySwal = withReactContent(Swal);

    const handleSave = async () => {
        console.log(formData);
        if (formData.keyword !== "") {
            MySwal.fire({
                title: "ต้องการบันทึกคำคัดกรอง?",
                text: "กดตกลงเพื่อบันทึก",
                icon: "info",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "ตกลง",
                cancelButtonText: "ยกเลิก",
            }).then((result) => {
                if (result.isConfirmed) {
                    classificationAPI.addKeyWord(category, formData).then(() => {
                        fetchWord()
                    })
                    MySwal.fire({
                        title: "เรียบร้อย!",
                        text: "บันทึกคำคัดกรองแล้ว!",
                        icon: "success",
                    });
                    handleCancel();
                }
            })
        }
        else if (formData.keyword == "") {
            MySwal.fire({
                title: "ล้มเหลว!",
                text: "กรุณากรอกคำ",
            })
        }
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////field update logic/////////////////////////////////////////////////////////////////
    const handleText = (e) => {
        if (e.target.value !== null && e.target.value !== undefined) {
            setFormData({ ...formData, keyword: e.target.value });
        }
    };

    const handleChecked = (checked) => {
        if (checked !== null && checked !== undefined) {
            setFormData({ ...formData, actual: checked });
        }
    };

    const handleWeight = (operator) => {
        if (operator) {
            if (formData.score) {
                if (operator === "+") {
                    setFormData({ ...formData, score: formData.score + 1 });
                } else if (operator === "-") {
                    setFormData({ ...formData, score: formData.score - 1 });
                }
            } else {
                setFormData({ ...formData, score: 1 });
            }
        }
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        setIsModalOpen(modalToggle);
    }, [modalToggle]);

    return (
        <Modal
            className="tw-max-h-full tw-max-w-fit"
            title={"เพิ่มคำคัดกรอง"}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={[
                <Button
                    key="submit"
                    className="tw-bg-blue-500 tw-text-white tw-border-white hover:tw-bg-white hover:tw-text-blue-500 hover:tw-border-blue-500"
                    onClick={() => handleSave(formData)}
                >
                    บันทึก
                </Button>,
            ]}
        >
            <div className="tw-overflow-y-auto tw-h-full tw-w-full tw-border-black tw-border-2 tw-rounded-md">
                <div className="tw-flex tw-flex-col tw-w-full tw-h-full tw-p-4 tw-gap-4">
                    <div
                        className={classNames("tw-flex tw-flex-col tw-h-16", {
                            "tw-w-56": isMobile&& isPortrait,
                            "tw-w-96": !isMobile
                        })}
                    >
                        <p>คำคัดกรอง:</p>
                        <Input
                            className="tw-h-full tw-w-full"
                            placeholder="คำคัดกรอง"
                            autoComplete="none"
                            onChange={(e) => handleText(e)}
                        />
                    </div>
                    <div
                        className={classNames("tw-flex tw-flex-col tw-h-16", {
                            "tw-w-56": isMobile&& isPortrait,
                            "tw-w-96": !isMobile
                        })}
                    >
                        <p>น้ำหนัก(1-10):</p>
                        <InputNumber
                            addonBefore={
                                <Tooltip title="ลดจำนวน">
                                    <Button
                                        className="tw-w-full tw-h-full tw-flex tw-border-2 tw-rounded-full tw-bg-red-500 hover:tw-border-red-500 hover:tw-text-red-500 hover:tw-bg-white"
                                        onClick={() => handleWeight("-")}
                                        disabled={formData.score > 1 ? false : true}
                                    >
                                        <MinusOutlined />
                                    </Button>
                                </Tooltip>
                            }
                            addonAfter={
                                <Tooltip title="เพิ่มจำนวน">
                                    <Button
                                        className="tw-w-full tw-h-full tw-flex tw-border-2 tw-rounded-full tw-bg-green-500 hover:tw-border-green-500 hover:tw-text-green-500 hover:tw-bg-white"
                                        onClick={() => handleWeight("+")}
                                        disabled={formData.score < 10 ? false : true}
                                    >
                                        <PlusOutlined />
                                    </Button>
                                </Tooltip>
                            }
                            value={formData.score}
                            readOnly
                            min={1}
                            max={10}
                        />
                    </div>
                    <div
                        className={classNames("tw-flex tw-flex-col tw-h-16", {
                            "tw-w-56": isMobile&& isPortrait,

                        })}
                    >
                        <p>หมวดนี้แน่นอน:</p>
                        <Tooltip title="กดเพื่อเปลี่ยนค่า">
                            <div className="tw-flex tw-flex-row tw-justify-center">
                                <Switch
                                    className={classNames("", {
                                        "tw-bg-black":
                                            formData?.actual === false ||
                                            formData?.actual === null ||
                                            formData?.actual === undefined,
                                        "tw-bg-blue-400": formData?.actual === true,
                                    })}
                                    checked={formData?.actual}
                                    onChange={(checked) => handleChecked(checked)}
                                />
                            </div>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

AddWordModal.propTypes = {
    modalToggle: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
    category: PropTypes.string || PropTypes.number,
    fetchWord: PropTypes.func,
};

export default AddWordModal;
