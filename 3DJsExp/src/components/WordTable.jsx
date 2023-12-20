import { DataTable } from "../utilities";
import classNames from "classnames";
import { useResponsive } from "../hooks";
import { PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Input, InputNumber, Switch, Tooltip } from "antd";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useLocation } from 'react-router-dom';
import { useState } from "react";
import { AddWordModal } from "../components";

const WordTable = () => {

    const [modalToggle, setModalToggle] = useState(false);

    const showModal = () => {
        setModalToggle(true);
    };

    const handleCancel = () => {
        setModalToggle(false);
    };

    const data = useLocation().state;

    const { isTabletOrMobile, isMobile, isPortrait } = useResponsive();

    const MySwal = withReactContent(Swal)

    const handleDelete = (value) => {
        console.log(value);

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
                MySwal.fire({
                    title: "เรียบร้อย!",
                    text: "หมวดหมู่ถูกลบแล้ว",
                    icon: "success"
                });
            }
        });
    }

    const [payload, setPayload] = useState(data.words);

    const updateChecked = (checked, id) => {
        const newState = payload.map(payload => {
            // 👇️ if id equals 2, update country property
            if (payload.id === id) {
                console.log("updateChecked");
                return { ...payload, absolute: checked };
            }
            // 👇️ otherwise return the object as is
            console.log("none");
            return payload;
        });

        setPayload(newState);
    };

    const handleWeight = (id, operator) => {
        console.log(payload.find((payload) => payload.id == id));
        const newState = payload.map(payload => {
            // 👇️ if id equals 2, update country property
            if (payload.id === id) {
                console.log("updateChecked");
                if (operator === "+")
                    return { ...payload, weight: payload.weight + 1 };
                else if (operator === "-")
                    return { ...payload, weight: payload.weight - 1 };
            }
            // 👇️ otherwise return the object as is
            console.log("none");
            return payload;
        });

        setPayload(newState);
        // payload.find((payload) => payload.id == id)
    }

    const columns = [
        {
            title: 'คำคัดกรอง',
            dataIndex: 'word',
            key: 'word',
            align: "center",
            width: 100,
            className: 'tw-text-amber-600',
        }, {
            title: 'น้ำหนัก(1-10)',
            dataIndex: 'weight',
            key: 'weight',
            align: "center",
            width: 100,
            className: 'tw-text-amber-600',
            render: (text, record) => (
                <div className="tw-flex tw-flex-row tw-justify-center">
                    <InputNumber
                        addonBefore={
                            <Tooltip title="ลดจำนวน">
                                <Button
                                    className="tw-w-full tw-h-full tw-flex tw-border-2 tw-rounded-full tw-bg-red-500 hover:tw-border-red-500 hover:tw-text-red-500 hover:tw-bg-white"
                                    onClick={() => handleWeight(record?.id, "-")}>
                                    <MinusOutlined />
                                </Button>
                            </Tooltip>}
                        addonAfter={
                            <Tooltip title="เพิ่มจำนวน">
                                <Button
                                    className="tw-w-full tw-h-full tw-flex tw-border-2 tw-rounded-full tw-bg-green-500 hover:tw-border-green-500 hover:tw-text-green-500 hover:tw-bg-white"
                                    onClick={() => handleWeight(record?.id, "+")}>
                                    <PlusOutlined />
                                </Button>
                            </Tooltip>}
                        value={payload.find((payload) => payload.id === record?.id).weight}
                        min={1}
                        max={10}
                        readOnly
                    />
                </div>
            ),
        },
        {
            title: "หมวดนี้แน่นอน",
            dataIndex: "id",
            key: "id",
            align: "center",
            width: 100,
            className: "tw-text-amber-600",
            render: (text, record) => (
                <Tooltip title="กดเพื่อเปลี่ยนค่า">
                    <div className="tw-flex tw-flex-row tw-justify-center">
                        <Switch className={classNames("", {
                            "tw-bg-black": payload.find((payload) => payload.id === record?.id).absolute === false,
                            "tw-bg-blue-400": payload.find((payload) => payload.id === record?.id).absolute === true,
                        })} defaultChecked={payload.find((payload) => payload.id === record?.id).absolute}
                            onChange={(checked) => updateChecked(checked, record?.id)} />
                    </div>
                </Tooltip>
            ),
        },
        {
            title: "",
            dataIndex: "id",
            key: "id",
            align: "center",
            width: 100,
            className: "tw-text-amber-600",
            render: (text, record) => (
                <div className="tw-flex tw-flex-row tw-justify-center">
                    <Tooltip title="ลบคำคัดกรอง">
                        <div className="tw-text-3xl tw-text-red-600"><DeleteOutlined onClick={() => handleDelete("wow")} /></div>
                    </Tooltip>
                </div>
            ),
        },
    ];

    return (
        <div className={classNames('tw-flex tw-flex-col tw-max-w-full tw-max-h-full tw-overflow-y-auto', {})}>
            <p className="tw-self-center tw-font-bold tw-text-xl tw-my-4">WordTable</p>
            <div className="tw-flex tw-flex-col tw-justify-center tw-w-full tw-px-4">
                <p className="tw-text-lg">ชื่อหมวดหมู่:</p>
                <Input value={data.category} />
            </div>
            <div className="tw-flex tw-flex-col tw-w-full tw-h-full tw-gap-4 tw-py-2">
                <div className="tw-flex tw-w-full tw-h-fit tw-justify-end tw-px-8">
                    <Button
                        className={classNames("tw-self-center tw-text-blue-600 tw-border-blue-600 tw-border-2 tw-bg-white tw-drop-shadow-md hover:tw-bg-blue-600 hover:tw-border-black hover:tw-text-white", {
                            "tw-w-full": isMobile && isPortrait,
                        })}
                        onClick={() => showModal({})}>
                        เพิ่มคำคัดกรอง
                    </Button>
                </div>
                <div className={classNames("tw-border-2 tw-rounded-md", {
                    "tw-overflow-auto": isTabletOrMobile && isPortrait,
                })}>
                    <DataTable
                        data={data.words}
                        columns={columns}
                        setPageSize={data.words.length}
                    />
                </div>
            </div>
            {modalToggle && (
                <AddWordModal
                    modalToggle={modalToggle}
                    handleCancel={handleCancel}
                />
            )}
        </div>
    );
};

export default WordTable;