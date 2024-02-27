import { useState, useEffect } from "react";
import { DataTable, SearchBar } from "../../utilities";
import { userManageMock } from "../../mock";
import { AddRoleModal } from "..";
import { useResponsive } from "../../hooks";
import { Button, Tooltip, Switch } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import classNames from "classnames";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const UserManageTable = () => {

    const [modalToggle, setModalToggle] = useState(false);
    const [searchVal, setSearchVal] = useState('');
    // const [catData, setCatData] = useState([]);
    const [pageIndex, setPageIndex] = useState({ current: 1, pageSize: 5 });

    const { isTabletOrMobile, isMobile, isPortrait } = useResponsive();

    /////////////////////////////////////sweetalert and delete function/////////////////////////////////////////////////////////////////////
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
                // classificationAPI.deleteCat(value).then(() => {
                //     fetchCat()
                // })
                MySwal.fire({
                    title: "เรียบร้อย!",
                    text: "หมวดหมู่ถูกลบแล้ว",
                    icon: "success"
                });
            }
        });
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////modal toggle logic//////////////////////////////////////////////////////////////////
    const showModal = () => {
        setModalToggle(true);
    };

    const handleCancel = () => {
        setModalToggle(false);
    };

    //////////////////////////////////////////////////////////////////////////////////////////////////////////


    /////////////////////////////////////////table/////////////////////////////////////////////////////////////////
    const columns = [
        {
            title: "",
            dataIndex: "id",
            key: "id",
            align: "center",
            width: 50,
            className: "tw-text-amber-600",
            render: (text, record) => (
                <div className="tw-flex tw-flex-row tw-justify-center">
                    <Switch
                        defaultChecked
                    // onChange={onChange}
                    />
                </div>
            ),
        },
        {
            title: 'ชื่อผู้ใช้งาน',
            dataIndex: 'userName',
            key: 'userName',
            align: "center",
            width: 100,
            className: 'tw-text-amber-600',
            // filteredValue: [searchVal],
            // onFilter: (value, record) => (
            //     String(record?.userName).toLowerCase().includes(value.toLowerCase())
            // ),
        },
        {
            title: 'ยศ-ชื่อ-นามสกุล',
            dataIndex: 'name',
            key: 'name',
            align: "center",
            width: 100,
            className: 'tw-text-amber-600',
            filteredValue: [searchVal],
            onFilter: (value, record) => (
                String(record?.name).toLowerCase().includes(value.toLowerCase())
            ),
        },
        {
            title: 'กลุ่ม',
            dataIndex: 'group',
            key: 'group',
            align: "center",
            width: 100,
            className: 'tw-text-violet-600',
            render: (text, record) => (
                <div className="tw-flex tw-flex-row tw-gap-1 tw-justify-center">
                    <div className="tw-text-3xl">
                        {record?.group}
                    </div>
                </div>
            ),
        },
        {
            title: 'บทบาท',
            dataIndex: 'role',
            key: 'role',
            align: "center",
            width: 100,
            className: 'tw-text-violet-600',
            render: (text, record) => (
                <div className="tw-flex tw-flex-row tw-gap-1 tw-justify-center">
                    <div className="tw-text-3xl">
                        {record?.role}
                    </div>
                </div>
            ),
        },
        {
            title: 'อนุญาติให้ใช้งาน',
            dataIndex: 'access',
            key: 'access',
            align: "center",
            width: 200,
            className: 'tw-text-amber-600 tw-w-full tw-h-full',
            // filteredValue: [searchBot],
            // onFilter: (value, record) => (
            //     (value.split(",")).some(group => String(record?.group).includes(group))
            // ),
            render: (text, record) => (
                <div className="tw-grid tw-grid-cols-2 tw-gap-1 tw-w-full tw-h-full">
                    {record?.access.map(access => (
                        <Tooltip key={access} title={access}>
                            <div className="tw-rounded-md tw-border-2 tw-p-2 tw-border-black tw-w-full tw-text-center tw-text-white tw-bg-yellow-600" >
                                {access}
                            </div>
                        </Tooltip>
                    ))}
                </div>
            ),
        },
        {
            title: 'อนุญาติให้มองเห็น',
            dataIndex: 'visible',
            key: 'visible',
            align: "center",
            width: 200,
            className: 'tw-text-amber-600 tw-w-full tw-h-full',
            // filteredValue: [searchBot],
            // onFilter: (value, record) => (
            //     (value.split(",")).some(group => String(record?.group).includes(group))
            // ),
            render: (text, record) => (
                <div className="tw-grid tw-grid-cols-2 tw-gap-1 tw-w-full tw-h-full tw-content-start">
                    {record?.visible.map(visible => (
                        <Tooltip key={visible} title={visible}>
                            <div className="tw-rounded-md tw-border-2 tw-p-2 tw-border-black tw-min-w-max tw-text-center tw-text-white tw-bg-yellow-600" >
                                {visible}
                            </div>
                        </Tooltip>
                    ))}
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
                        <div className="tw-text-3xl tw-text-red-600"><DeleteOutlined onClick={() => handleDelete(record.id)} /></div>
                    </Tooltip>
                    <Tooltip title="แก้ไขหมวดหมู่">
                        <div className="tw-text-3xl tw-text-blue-600"><EditOutlined /></div>
                    </Tooltip>
                </div>
            ),
        },
    ];
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    // const fetchCat = async () => {
    //     const data = await classificationAPI.getAllCat();
    //     setCatData(data);
    // }

    // useEffect(() => {
    //     fetchCat();
    // }, [pageIndex])

    return (
        <div className={classNames('tw-flex tw-flex-col tw-max-w-full tw-max-h-full tw-overflow-y-auto', {})}>
            <div className="tw-flex tw-flex-col tw-justify-center tw-w-full tw-px-4">
                <p className="tw-text-lg">คำค้นหา:</p>
                <SearchBar
                    data={userManageMock}
                    useTextSearch={true}
                    onChangeSearch={setSearchVal}
                    keyName={"userName"}
                />
            </div>
            <div className="tw-flex tw-flex-col tw-w-full tw-h-full tw-gap-4 tw-py-2">
                <div className="tw-flex tw-w-full tw-h-fit tw-justify-end tw-px-8">
                    <Button
                        className={classNames("tw-self-center tw-text-blue-600 tw-border-blue-600 tw-border-2 tw-bg-white tw-drop-shadow-md hover:tw-bg-blue-600 hover:tw-border-black hover:tw-text-white", {
                            "tw-w-full": isMobile && isPortrait,
                        })}
                        onClick={() => showModal()}
                    >
                        สร้างบทบาทใหม่
                    </Button>
                    <Button
                        className={classNames("tw-self-center tw-text-blue-600 tw-border-blue-600 tw-border-2 tw-bg-white tw-drop-shadow-md hover:tw-bg-blue-600 hover:tw-border-black hover:tw-text-white", {
                            "tw-w-full": isMobile && isPortrait,
                        })}
                    // onClick={() => showModal()}
                    >
                        เพิ่มผู้ใช้ใหม่
                    </Button>
                </div>
                <div className={classNames("tw-border-2 tw-rounded-md", {
                    "tw-overflow-auto": isTabletOrMobile && isPortrait,
                })}>
                    <DataTable
                        data={userManageMock}
                        columns={columns}
                        setPageSize={5}
                        keyName={"id"}
                        totalPages={userManageMock?.length}
                        sendPages={setPageIndex}
                    />
                </div>
            </div>
            {modalToggle && (
                <AddRoleModal
                    modalToggle={modalToggle}
                    // fetchData={fetchCat}
                    handleCancel={handleCancel}
                />
            )}
        </div>
    );
};

export default UserManageTable;