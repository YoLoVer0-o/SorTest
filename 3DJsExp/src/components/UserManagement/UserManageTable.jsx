import { useState, useEffect } from "react";
import { DataTable, SearchBar, Loading } from "../../utilities";
import { userManageMock } from "../../mock";
import { AddRoleModal, AddUserRoleModal, EditUserRoleModal } from "..";
import { useResponsive } from "../../hooks";
import { Button, Tooltip, Switch } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import classNames from "classnames";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import UserManageAPI from "../../service/UserManageAPI";
import { useSelector } from 'react-redux'
import { getLogin } from '../../libs/loginSlice'

const UserManageTable = () => {

    const [modalToggle, setModalToggle] = useState(false);
    const [userModalToggle, setUserModalToggle] = useState(false);
    const [editUserModalToggle, setEditUserModalToggle] = useState(false);
    const [searchVal, setSearchVal] = useState('');
    const [userData, setUserData] = useState([]);
    const [editUser, setEditUser] = useState({});
    const [allRoles, setAllRoles] = useState([]);
    const [searchRoles, setSearchRoles] = useState([]);
    const [pageIndex, setPageIndex] = useState({ current: 1, pageSize: 5 });
    const [showLoading, setShowLoading] = useState(false);

    const { isTabletOrMobile, isMobile, isPortrait } = useResponsive();

    const token = useSelector((state) => getLogin(state).token);


    const fetchUser = async () => {
        try {
            setShowLoading(true);

            const data = await UserManageAPI.getAllUser(token)
            setUserData(data);

        } catch (error) {
            console.error('Error fetching bot config:', error);
        } finally {
            setShowLoading(false);
        }
    }

    const fetchRole = async () => {
        try {
            // setShowLoading(true);

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
            // setShowLoading(false);
        }
    }

    /////////////////////////////////////sweetalert and delete function/////////////////////////////////////////////////////////////////////
    const MySwal = withReactContent(Swal)

    const handleDelete = async (value) => {
        console.log(value);

        const user = {
            username: value,
        }

        MySwal.fire({
            title: "ต้องการลบผู้ใช้?",
            text: "คุณจะไม่สามารถกู้คืนได้ เมื่อกดตกลง",
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
                    await UserManageAPI.deleteUser(token, user).then(() => {
                        MySwal.fire({
                            title: "เรียบร้อย!",
                            text: "ผู้ใช้ถูกลบแล้ว",
                            icon: "success"
                        });
                    })
                }
                catch (error) {
                    console.error('Error fetching bot config:', error);
                } finally {
                    fetchUser()
                    setShowLoading(false);
                }

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

    const showUserModal = () => {
        setUserModalToggle(true);
    };

    const handleUserCancel = () => {
        setUserModalToggle(false);
    };


    const showEditUserModal = (value) => {
        setEditUser(value)
        setEditUserModalToggle(true);
    };

    const handleEditUserCancel = () => {
        setEditUser({})
        setEditUserModalToggle(false);
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////////////


    /////////////////////////////////////////table/////////////////////////////////////////////////////////////////
    const columns = [
        {
            title: "",
            dataIndex: "",
            key: "",
            align: "center",
            width: 50,
            className: "tw-text-amber-600",
            render: (record) => (
                <div className="tw-flex tw-flex-row tw-justify-center">
                    <Switch
                        defaultChecked={record?.disabled}
                    // onChange={onChange}
                    />
                </div>
            ),
        },
        {
            title: 'ชื่อผู้ใช้งาน',
            dataIndex: 'username',
            key: 'username',
            align: "center",
            width: 100,
            className: 'tw-text-amber-600',
        },
        {
            title: 'ยศ-ชื่อ-นามสกุล',
            dataIndex: 'firstname',
            key: 'firstname',
            align: "center",
            width: 100,
            className: 'tw-text-amber-600',
            filteredValue: [searchVal],
            onFilter: (value, record) => (
                String(record?.firstname).toLowerCase().includes(value.toLowerCase()) ||
                String(record?.lastname).toLowerCase().includes(value.toLowerCase()) ||
                String(record?.username).toLowerCase().includes(value.toLowerCase())
            ),
            render: (text, record) => (
                <p className="">
                    {record?.firstname} {record?.lastname}
                </p>
            ),
        },
        // {
        //     title: 'กลุ่ม',
        //     dataIndex: 'group',
        //     key: 'group',
        //     align: "center",
        //     width: 100,
        //     className: 'tw-text-violet-600',
        //     render: (text, record) => (
        //         <div className="tw-flex tw-flex-row tw-gap-1 tw-justify-center">
        //             <div className="tw-text-3xl">
        //                 {record?.group}
        //             </div>
        //         </div>
        //     ),
        // },
        {
            title: 'บทบาท',
            dataIndex: 'roles_name',
            key: 'roles_name',
            align: "center",
            width: 100,
            className: 'tw-text-violet-600',
            filteredValue: [searchRoles],
            onFilter: (value, record) => (
                value.split(`,`).some((roles) => String(record?.roles_name).toLowerCase().includes(roles.toLowerCase()))
                // console.log(value)
            ),
            render: (text, record) => (
                <div className="tw-flex tw-flex-row tw-gap-1 tw-justify-center">
                    <div className="tw-text-3xl">
                        {record?.roles_name}
                    </div>
                </div>
            ),

        },
        // {
        //     title: 'อนุญาติให้ใช้งาน',
        //     dataIndex: 'access',
        //     key: 'access',
        //     align: "center",
        //     width: 200,
        //     className: 'tw-text-amber-600 tw-w-full tw-h-full',
        //     render: (text, record) => (
        //         <div className="tw-grid tw-grid-cols-2 tw-gap-1 tw-w-full tw-h-full">
        //             {record?.access.map(access => (
        //                 <Tooltip key={access} title={access}>
        //                     <div className="tw-rounded-md tw-border-2 tw-p-2 tw-border-black tw-w-full tw-text-center tw-text-white tw-bg-yellow-600" >
        //                         {access}
        //                     </div>
        //                 </Tooltip>
        //             ))}
        //         </div>
        //     ),
        // },
        // {
        //     title: 'อนุญาติให้มองเห็น',
        //     dataIndex: 'visible',
        //     key: 'visible',
        //     align: "center",
        //     width: 200,
        //     className: 'tw-text-amber-600 tw-w-full tw-h-full',
        //     render: (text, record) => (
        //         <div className="tw-grid tw-grid-cols-2 tw-gap-1 tw-w-full tw-h-full tw-content-start">
        //             {record?.visible.map(visible => (
        //                 <Tooltip key={visible} title={visible}>
        //                     <div className="tw-rounded-md tw-border-2 tw-p-2 tw-border-black tw-min-w-max tw-text-center tw-text-white tw-bg-yellow-600" >
        //                         {visible}
        //                     </div>
        //                 </Tooltip>
        //             ))}
        //         </div>
        //     ),
        // },
        {
            title: "",
            dataIndex: "",
            key: "",
            align: "center",
            width: 100,
            className: "tw-text-amber-600",
            render: (text, record) => (
                <div className="tw-flex tw-flex-row tw-gap-8 tw-justify-center">
                    <Tooltip title="ลบหมวดหมู่">
                        <div className="tw-text-3xl tw-text-red-600"><DeleteOutlined onClick={() => handleDelete(record?.username)} /></div>
                    </Tooltip>
                    <Tooltip title="แก้ไขหมวดหมู่">
                        <div className="tw-text-3xl tw-text-blue-600"
                            onClick={() => showEditUserModal(record)}>
                            <EditOutlined />
                        </div>
                    </Tooltip>
                </div>
            ),
        },
    ];
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        fetchUser();
        fetchRole();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={classNames('tw-flex tw-flex-col tw-max-w-full tw-max-h-full tw-overflow-y-auto', {})}>
            <Loading isShown={showLoading} />
            <div
                className={classNames(
                    "tw-flex tw-flex-row tw-max-w-full tw-justify-center tw-gap-2",
                    {
                        "tw-flex-col": isTabletOrMobile,
                    }
                )}
            >
                <div className="tw-flex tw-flex-col tw-justify-center tw-w-full tw-px-4">
                    <p className="tw-text-lg">คำค้นหา:</p>
                    <SearchBar
                        data={userData}
                        useTextSearch={true}
                        onChangeSearch={setSearchVal}
                        keyName={"userName"}
                    />
                </div>
                <div className="tw-flex tw-flex-col tw-justify-center tw-w-full tw-px-4">
                    <p className="tw-text-lg">บทบาท:</p>
                    <SearchBar
                        useTagSearch={true}
                        data={allRoles}
                        onChangeFilter={setSearchRoles}
                        useOwnData={true}
                        ownKeyNameLabel={"label"}
                        ownKeyNameValue={"label"}
                    />
                </div>
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
                        onClick={() => showUserModal()}
                    >
                        เพิ่มผู้ใช้ใหม่
                    </Button>
                </div>
                <div className={classNames("tw-border-2 tw-rounded-md", {
                    "tw-overflow-auto": isTabletOrMobile && isPortrait,
                })}>
                    <DataTable
                        data={userData}
                        columns={columns}
                        setPageSize={5}
                        keyName={"id"}
                        totalPages={userData?.length}
                        sendPages={setPageIndex}
                    />
                </div>
            </div>
            {modalToggle && (
                <AddRoleModal
                    modalToggle={modalToggle}
                    handleCancel={handleCancel}
                    token={token}
                />
            )}
            {userModalToggle && (
                <AddUserRoleModal
                    modalToggle={userModalToggle}
                    fetchData={fetchUser}
                    handleCancel={handleUserCancel}
                    token={token}
                />
            )}
            {editUserModalToggle && (
                <EditUserRoleModal
                    modalToggle={editUserModalToggle}
                    fetchData={fetchUser}
                    handleCancel={handleEditUserCancel}
                    token={token}
                    user={editUser}
                />
            )}
        </div>
    );
};

export default UserManageTable;