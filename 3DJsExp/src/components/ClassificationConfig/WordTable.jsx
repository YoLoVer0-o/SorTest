import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { DataTable } from "../../utilities";
import { AddWordModal, InfoModal } from "..";
import { useResponsive } from "../../hooks";
import { Button, Input, InputNumber, Switch, Tooltip } from "antd";
import { PlusOutlined, MinusOutlined, DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import classNames from "classnames";
import classificationAPI from "../../service/classificationAPI";

const WordTable = () => {

    const category = useLocation().state;

    const [modalToggle, setModalToggle] = useState(false);
    const [infoModalToggle, setInfoModalToggle] = useState(false);
    const [payload, setPayload] = useState();
    const [pageIndex, setPageIndex] = useState({ current: 1, pageSize: 5 });

    const { isTabletOrMobile, isMobile, isPortrait } = useResponsive();

    const fetchWord = async () => {
        // console.log(category._id);
        const data = await classificationAPI.getCatWord(category._id, pageIndex.current, pageIndex.pageSize);
        setPayload(data);
    }

    const updateWord = async (keyword, wordObj) => {
        await classificationAPI.editKeyWord(category._id, keyword, wordObj).then(() => fetchWord());
    }


    ////////////////////////////////////////modal toggle logic//////////////////////////////////////////////////////////////////
    const showModal = () => {
        setModalToggle(true);
    };

    const handleCancel = () => {
        setModalToggle(false);
    };

    const showInfoModal = () => {
        setInfoModalToggle(true);
    };

    const handleInfoCancel = () => {
        setInfoModalToggle(false);
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////sweetalert and delete function///////////////////////////////////////////////////////////////
    const MySwal = withReactContent(Swal)

    const handleDelete = (value) => {
        // console.log(value);

        MySwal.fire({
            title: "ต้องการลบหมวดหมู่?",
            text: "คุณจะไม่สามารถกู้คืนได้ เมื่อกดตกลง",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ตกลง",
            cancelButtonText: "ยกเลิก",
        }).then((result) => {
            if (result.isConfirmed) {
                classificationAPI.removeKeyWord(category._id, value.keyword);
                MySwal.fire({
                    title: "เรียบร้อย!",
                    text: "หมวดหมู่ถูกลบแล้ว",
                    icon: "success"
                });
                fetchWord()
            }
        });
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////update logic//////////////////////////////////////////////////////////////
    const updateChecked = (checked, keyword) => {

        const newState = payload.keywords.map(payload => {
            if (payload.keyword === keyword) {
                // console.log("updateChecked");
                return { ...payload, actual: checked };
            }
            return payload;
        });
        // setPayload(newState);
        const wordPayLoad = (({ score, actual }) => ({ score, actual }))(newState.find((newState) => newState.keyword == keyword));
        // console.log(wordPayLoad);
        updateWord(keyword, wordPayLoad)
        // fetchWord()
    };

    const handleWeight = (keyword, operator) => {

        const newState = payload.keywords.map(payload => {
            if (payload.keyword === keyword) {
                // console.log("updateChecked");
                if (operator === "+" && payload.score < 10)
                    return { ...payload, score: payload.score + 1 };
                else if (operator === "-" && payload.score > 1)
                    return { ...payload, score: payload.score - 1 };
            }
            return payload;
        });
        // setPayload(newState);
        const wordPayLoad = (({ score, actual }) => ({ score, actual }))(newState.find((newState) => newState.keyword == keyword));
        // console.log(wordPayLoad);
        updateWord(keyword, wordPayLoad)
        // fetchWord()

    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////table////////////////////////////////////////////////////////////
    const columns = [
        {
            title: 'คำคัดกรอง',
            dataIndex: 'keyword',
            key: 'keyword',
            align: "center",
            width: 100,
            className: 'tw-text-amber-600',
        }, {
            title: 'น้ำหนัก(1-10)',
            dataIndex: 'score',
            key: 'score',
            align: "center",
            width: isTabletOrMobile ? 300 : 100,
            className: 'tw-text-amber-600',
            render: (text, record) => (
                <div className="tw-flex tw-flex-row tw-w-full tw-justify-center">
                    <InputNumber
                        disabled={payload.keywords.find((payload) => payload.keyword === record?.keyword).actual}
                        addonBefore={
                            <Tooltip title="ลดจำนวน">
                                <Button
                                    className="tw-w-full tw-h-full tw-flex tw-border-2 tw-rounded-full tw-bg-red-500 hover:tw-border-red-500 hover:tw-text-red-500 hover:tw-bg-white"
                                    onClick={() => handleWeight(record?.keyword, "-")}
                                    disabled={record?.score > 1 && !payload.keywords.find((payload) => payload.keyword === record?.keyword).actual ? false : true}>
                                    <MinusOutlined />
                                </Button>
                            </Tooltip>}
                        addonAfter={
                            <Tooltip title="เพิ่มจำนวน">
                                <Button
                                    className="tw-w-full tw-h-full tw-flex tw-border-2 tw-rounded-full tw-bg-green-500 hover:tw-border-green-500 hover:tw-text-green-500 hover:tw-bg-white"
                                    onClick={() => handleWeight(record?.keyword, "+")}
                                    disabled={record?.score < 10  && !payload.keywords.find((payload) => payload.keyword === record?.keyword).actual ? false : true}
                                >
                                    <PlusOutlined />
                                </Button>
                            </Tooltip>}
                        value={payload.keywords.find((payload) => payload.keyword === record?.keyword).score}
                        min={1}
                        max={10}
                        readOnly
                        className="tw-w-full"
                    />
                </div>
            ),
        },
        {
            title: "หมวดนี้แน่นอน",
            dataIndex: "",
            key: "",
            align: "center",
            width: 100,
            className: "tw-text-amber-600",
            render: (text, record) => (
                <Tooltip title="กดเพื่อเปลี่ยนค่า">
                    <div className="tw-flex tw-flex-row tw-justify-center">
                        <Switch className={classNames("", {
                            "tw-bg-black": payload.keywords.find((payload) => payload.keyword === record?.keyword).actual === false,
                            "tw-bg-blue-400": payload.keywords.find((payload) => payload.keyword === record?.keyword).actual === true,
                        })} defaultChecked={payload.keywords.find((payload) => payload.keyword === record?.keyword).actual}
                            onChange={(checked) => updateChecked(checked, record?.keyword)} />
                    </div>
                </Tooltip>
            ),
        },
        {
            title: "",
            dataIndex: "",
            key: "",
            align: "center",
            width: 100,
            className: "tw-text-amber-600",
            render: (text, record) => (
                <div className="tw-flex tw-flex-row tw-justify-center">
                    <Tooltip title="ลบคำคัดกรอง">
                        <div className="tw-text-3xl tw-text-red-600"><DeleteOutlined onClick={() => handleDelete(record)} /></div>
                    </Tooltip>
                </div>
            ),
        },
    ];
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        fetchWord()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, pageIndex])

    return (
        <div className={classNames('tw-flex tw-flex-col tw-max-w-full tw-max-h-full tw-overflow-y-auto', {})}>
            <p className="tw-self-center tw-font-bold tw-text-xl tw-my-4">WordTable</p>
            <div className="tw-flex tw-flex-col tw-justify-center tw-w-full tw-px-4">
                <p className="tw-text-lg">ชื่อหมวดหมู่:</p>
                <Input value={category.category_name} />
            </div>
            <div className="tw-flex tw-flex-col tw-w-full tw-h-full tw-gap-4 tw-py-2">
                <div className="tw-flex tw-flex-row tw-w-full tw-h-fit tw-justify-end tw-gap-4 tw-px-8">
                    <Button
                        className={classNames("tw-flex tw-flex-row tw-items-center tw-self-center tw-text-yellow-600 tw-border-yellow-600 tw-border-2 tw-bg-white tw-drop-shadow-md hover:tw-bg-yellow-600 hover:tw-border-black hover:tw-text-white", {
                            "tw-w-full": isMobile && isPortrait,
                        })}
                        onClick={() => showInfoModal()}>
                        <QuestionCircleOutlined className="tw-text-xl" />ช่วยเหลือ
                    </Button>
                    <Button
                        className={classNames("tw-self-center tw-text-blue-600 tw-border-blue-600 tw-border-2 tw-bg-white tw-drop-shadow-md hover:tw-bg-blue-600 hover:tw-border-black hover:tw-text-white", {
                            "tw-w-full": isMobile && isPortrait,
                        })}
                        onClick={() => showModal()}>
                        เพิ่มคำคัดกรอง
                    </Button>
                </div>
                <div className={classNames("tw-border-2 tw-rounded-md", {
                    "tw-overflow-auto": isTabletOrMobile && isPortrait,
                })}>
                    {payload && (
                        <DataTable
                            data={payload.keywords}
                            columns={columns}
                            setPageSize={5}
                            keyName={"keyword"}
                            totalPages={payload.total_keywords}
                            sendPages={setPageIndex}
                        />
                    )}
                </div>
            </div>
            {infoModalToggle && (
                <InfoModal
                    modalToggle={infoModalToggle}
                    handleCancel={handleInfoCancel}
                />
            )}
            {modalToggle && (
                <AddWordModal
                    category={category._id}
                    modalToggle={modalToggle}
                    fetchWord={fetchWord}
                    handleCancel={handleCancel}
                />
            )}
        </div>
    );
};

export default WordTable;