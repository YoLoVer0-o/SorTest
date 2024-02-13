import { useState, useEffect } from "react";
import { useResponsive } from "../../hooks";
import { Modal, Button, Input, Tooltip, InputNumber, Switch } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import classNames from "classnames";
import PropTypes from "prop-types";
import classificationAPI from "../../service/classificationAPI";

const AddCatModal = (props) => {
    /////////////////////////////////////props declaration/////////////////////////////////////////////////////////////////////
    const modalToggle = props.modalToggle;
    const handleCancel = props.handleCancel;
    const fetchData = props.fetchData;
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    const [isModalOpen, setIsModalOpen] = useState(modalToggle);
    const [formData, setFormData] = useState({
        category: "",
        keywords: [],
    });

    const { isMobile, isPortrait } = useResponsive();

    ///////////////////////////////////sweetalert and save logic///////////////////////////////////////////////////////////////////////
    const MySwal = withReactContent(Swal);

    const handleSave = async () => {
        // console.log(formData);
        if (formData.category !== "" && !(formData.keywords.some(keyword => keyword.keyword === ""))) {
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
                    classificationAPI.createCat(formData).then(() => {
                        fetchData()
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
        else if (formData.category == "") {
            MySwal.fire({
                title: "ล้มเหลว!",
                text: "กรุณากรอกชื่อกลุ่มคำ",
            })
        }
        else if (formData.keywords.some(keyword => keyword.keyword === "")) {
            MySwal.fire({
                title: "ล้มเหลว!",
                text: "กรุณากรอกคำ",
            })
        }
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////field update logic/////////////////////////////////////////////////////////////////

    const addKeyword = () => {
        setFormData(prevState => ({
            ...prevState,
            keywords: [...prevState.keywords, { keyword: "", score: 0, actual: false }],
        }));
    };

    const deleteKeyword = (index) => {
        setFormData(prevState => {
            const updatedKeywords = [...prevState.keywords];
            updatedKeywords.splice(index, 1);

            return {
                ...prevState,
                keywords: updatedKeywords,
            };
        });
    };

    const handleCat = (e) => {
        if (e.target.value !== null && e.target.value !== undefined) {
            setFormData({ ...formData, category: e.target.value });
        }
    };

    const handleText = (e, i) => {
        if (e.target.value !== null && e.target.value !== undefined) {
            setFormData(prevState => {
                const updatedKeywords = [...prevState.keywords];
                updatedKeywords[i].keyword = e.target.value;

                return {
                    ...prevState,
                    keywords: updatedKeywords,
                };
            });
        }
    }

    const handleChecked = (checked, i) => {
        if (checked !== null && checked !== undefined) {
            setFormData(prevState => {
                const updatedKeywords = [...prevState.keywords];
                updatedKeywords[i].actual = checked;

                return {
                    ...prevState,
                    keywords: updatedKeywords,
                };
            });
        }
    };

    const handleWeight = (operator, i) => {
        if (operator) {
            if (formData.keywords[i].score) {
                if (operator === "+") {
                    // console.log("plus");
                    setFormData(prevState => {
                        const updatedKeywords = [...prevState.keywords];
                        updatedKeywords[i].score = updatedKeywords[i].score + 1;

                        return {
                            ...prevState,
                            keywords: updatedKeywords,
                        };
                    });

                } else if (operator === "-") {
                    // console.log("minus");
                    setFormData(prevState => {
                        const updatedKeywords = [...prevState.keywords];
                        updatedKeywords[i].score = updatedKeywords[i].score - 1;

                        return {
                            ...prevState,
                            keywords: updatedKeywords,
                        };
                    });
                }
            } else {
                // console.log("none");
                setFormData(prevState => {
                    const updatedKeywords = [...prevState.keywords];
                    updatedKeywords[i].score = 1;

                    return {
                        ...prevState,
                        keywords: updatedKeywords,
                    };
                });
            }
        }
    };


    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        setIsModalOpen(modalToggle);
    }, [modalToggle]);

    // useEffect(() => {
    //     console.log(formData);
    // }, [formData])

    return (
        <Modal
            className="tw-max-h-full tw-max-w-full"
            title={"เพิ่มกลุ่มคำ"}
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
            <div className="tw-h-full tw-w-full tw-border-black tw-border-2 tw-p-2 tw-rounded-md tw-flex tw-flex-col tw-items-center tw-overflow-y-auto">
                <div
                    className={classNames("tw-flex tw-flex-col tw-h-16", {
                        "tw-w-56": isMobile && isPortrait,
                        "tw-w-full": !isMobile
                    })}
                >
                    <p>กลุ่มคำ:</p>
                    <Input
                        className="tw-h-full tw-w-full"
                        placeholder="กลุ่มคำ"
                        autoComplete="none"
                        onChange={(e) => handleCat(e)}
                    />
                </div>
                {formData.keywords.map((keyword, i) => (
                    <div key={i} className={classNames("tw-flex tw-flex-col tw-w-full tw-items-center tw-h-full tw-p-4 tw-gap-4 tw-border-2 tw-rounded-md tw-my-2 tw-border-blue-200", {})}>
                        <div
                            className={classNames("tw-flex tw-flex-col tw-h-16", {
                                "tw-w-56": isMobile && isPortrait,
                                "tw-w-full": !isMobile
                            })}
                        >
                            <p>คำคัดกรอง:</p>
                            <Input
                                className="tw-h-full tw-w-full"
                                placeholder="คำคัดกรอง"
                                autoComplete="none"
                                onChange={(e) => handleText(e, i)}
                                value={keyword.keyword}
                            />
                        </div>
                        <div className="tw-flex tw-flex-row">
                            <div
                                className={classNames("tw-flex tw-flex-col tw-h-16", {
                                    "tw-w-full": isMobile && isPortrait,
                                    "tw-w-fit": !isMobile
                                })}
                            >
                                <p>น้ำหนัก(1-10):</p>
                                <InputNumber
                                    addonBefore={
                                        <Tooltip title="ลดจำนวน">
                                            <Button
                                                className="tw-w-full tw-h-full tw-flex tw-border-2 tw-rounded-full tw-bg-red-500 hover:tw-border-red-500 hover:tw-text-red-500 hover:tw-bg-white"
                                                onClick={() => handleWeight("-", i)}
                                                disabled={keyword.score > 1 ? false : true}
                                            >
                                                <MinusOutlined />
                                            </Button>
                                        </Tooltip>
                                    }
                                    addonAfter={
                                        <Tooltip title="เพิ่มจำนวน">
                                            <Button
                                                className="tw-w-full tw-h-full tw-flex tw-border-2 tw-rounded-full tw-bg-green-500 hover:tw-border-green-500 hover:tw-text-green-500 hover:tw-bg-white"
                                                onClick={() => handleWeight("+", i)}
                                                disabled={keyword.score < 10 ? false : true}
                                            >
                                                <PlusOutlined />
                                            </Button>
                                        </Tooltip>
                                    }
                                    value={keyword.score}
                                    readOnly
                                    min={1}
                                    max={10}
                                />
                            </div>
                            <div
                                className={classNames("tw-flex tw-flex-col tw-h-16", {
                                    "tw-w-full": isMobile && isPortrait,
                                    "tw-w-fit": !isMobile
                                })}
                            >
                                <p>หมวดนี้แน่นอน:</p>
                                <Tooltip title="กดเพื่อเปลี่ยนค่า">
                                    <div className="tw-flex tw-w-full tw-h-full tw-flex-row tw-justify-center">
                                        <Switch
                                            className={classNames("", {
                                                "tw-bg-black":
                                                    keyword?.actual === false ||
                                                    keyword?.actual === null ||
                                                    keyword?.actual === undefined,
                                                "tw-bg-blue-400": keyword?.actual === true,
                                            })}
                                            checked={keyword?.actual}
                                            onChange={(checked) => handleChecked(checked, i)}
                                        />
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                        <Button className="tw-w-fit tw-h-fit tw-flex tw-border-2 tw-rounded-full tw-bg-red-500 hover:tw-border-red-500 hover:tw-text-red-500 hover:tw-bg-white"
                            onClick={() => deleteKeyword(i)}
                        >ลบคำคัดกรอง {i}</Button>
                    </div>
                ))
                }
                <Button className="tw-w-fit tw-h-fit tw-flex tw-border-2 tw-rounded-full tw-bg-green-500 hover:tw-border-green-500 hover:tw-text-green-500 hover:tw-bg-white"
                    onClick={() => addKeyword()}
                >เพิ่มคำคัดกรอง</Button>
            </div>
        </Modal>
    );
};

AddCatModal.propTypes = {
    modalToggle: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
    category: PropTypes.string || PropTypes.number,
    fetchData: PropTypes.func,
};

export default AddCatModal;
