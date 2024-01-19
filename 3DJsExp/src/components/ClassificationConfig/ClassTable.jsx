import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable, SearchBar } from "../../utilities";
import { cat_word } from "../../mock";
import { useResponsive } from "../../hooks";
import { Button, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import classNames from "classnames";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import classificationAPI from "../../service/classificationAPI";

const ClassTable = () => {

    const [searchVal, setSearchVal] = useState('');
    const [catData, setCatData] = useState([]);

    const navigate = useNavigate();

    const { isTabletOrMobile, isMobile, isPortrait } = useResponsive();




    /////////////////////////////////////sweetalert and delete function/////////////////////////////////////////////////////////////////////
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

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////navigate to edit/////////////////////////////////////////////////////////////////
    const toEdit = async (data) => {
        navigate(`/classconfig/edit/${data.id}`, { state: data })
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////table/////////////////////////////////////////////////////////////////
    const columns = [
        {
            title: 'หมวดหมู่',
            dataIndex: 'category',
            key: 'category',
            align: "center",
            width: 100,
            className: 'tw-text-amber-600',
            filteredValue: [searchVal],
            onFilter: (value, record) => (
                String(record?.category).toLowerCase().includes(value.toLowerCase())
            ),
            render: (text, record) => (
                <div className="tw-flex tw-flex-row tw-gap-1 tw-justify-center">
                    <div className="tw-text-3xl">
                        {record?.category}
                    </div>
                </div>
            ),
        },
        {
            title: 'จำนวนคำคัดกรอง',
            dataIndex: 'words',
            key: 'words',
            align: "center",
            width: 100,
            className: 'tw-text-violet-600',
            render: (text, record) => (
                <div className="tw-flex tw-flex-row tw-gap-1 tw-justify-center">
                    <div className="tw-text-3xl">
                        {record?.words.length}
                    </div>
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
                <div className="tw-flex tw-flex-row tw-gap-8 tw-justify-center">
                    <Tooltip title="ลบหมวดหมู่">
                        <div className="tw-text-3xl tw-text-red-600"><DeleteOutlined onClick={() => handleDelete("wow")} /></div>
                    </Tooltip>
                    <Tooltip title="แก้ไขหมวดหมู่">
                        <div className="tw-text-3xl tw-text-blue-600"><EditOutlined onClick={() => toEdit(record)} /></div>
                    </Tooltip>
                </div>
            ),
        },
    ];
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        setCatData(classificationAPI.getAllCat())
    }, [])

    useEffect(() => {
        console.log(catData);
    }, [catData])



    return (
        <div className={classNames('tw-flex tw-flex-col tw-max-w-full tw-max-h-full tw-overflow-y-auto', {})}>
            <p className="tw-self-center tw-font-bold tw-text-xl tw-my-4">ClassTable</p>
            <div className="tw-flex tw-flex-col tw-justify-center tw-w-full tw-px-4">
                <p className="tw-text-lg">คำค้นหา:</p>
                <SearchBar
                    data={cat_word}
                    useTextSearch={true}
                    onChangeSearch={setSearchVal}
                    keyName={"category"}
                />
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
                        data={cat_word}
                        columns={columns}
                        setPageSize={cat_word.length}
                    />
                </div>
            </div>
        </div>
    );
};

export default ClassTable;