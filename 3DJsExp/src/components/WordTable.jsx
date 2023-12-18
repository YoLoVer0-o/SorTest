import { DataTable } from "../utilities";
import classNames from "classnames";
import { useResponsive } from "../hooks";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Input, InputNumber, Switch, Tooltip } from "antd";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useLocation } from 'react-router-dom';
import { useState } from "react";

const WordTable = () => {

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

    const handlePlus = (id) => {
        console.log(payload.find((payload) => payload.id == id));
        // payload.find((payload) => payload.id == id)
    }

    const handleMinus = (id) => {
        console.log(payload.find((payload) => payload.id == id));
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
            title: 'น้ำหนัก',
            dataIndex: 'weight',
            key: 'weight',
            align: "center",
            width: 100,
            className: 'tw-text-amber-600',
            render: (text, record) => (
                <div className="tw-flex tw-flex-row tw-justify-center">
                    <InputNumber
                        addonBefore={<p onClick={() => handleMinus(record?.id)}>-</p>}
                        addonAfter={<p onClick={() => handlePlus(record?.id)}>+</p>}
                        defaultValue={record?.weight}
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
                <div className="tw-flex tw-flex-row tw-justify-center">
                    <Switch className={classNames("", {
                        "tw-bg-black": record?.absolute === false,
                    })} defaultChecked={record?.absolute} />
                </div>
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
                        })}>
                        เพิ่มหมวดหมู่
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
            {/* <div className=" tw-flex tw-flex-row tw-my-6 tw-gap-4">
                {pageSize < 20 && (
                    <Tooltip title="แสดงเพิ่มเติม">
                        <Button className="tw-border-black tw-border-2 tw-bg-green-400 tw-drop-shadow-md hover:tw-bg-white hover:tw-border-green-600 hover:tw-text-green-600"
                            onClick={() => setPageSize(20)}
                            icon={<ColumnHeightOutlined />}
                        >
                            show more
                        </Button>
                    </Tooltip>
                )}
                {pageSize >= 20 && (
                    <Tooltip title="แสดงน้อยลง">
                        <Button className="tw-border-black tw-border-2 tw-bg-yellow-400 tw-drop-shadow-md hover:tw-bg-white hover:tw-border-yellow-600 hover:tw-text-yellow-600"
                            onClick={() => setPageSize(5)}
                            icon={<VerticalAlignMiddleOutlined />}
                        >
                            show less
                        </Button>
                    </Tooltip>
                )}
            </div> */}
        </div>
    );
};

export default WordTable;