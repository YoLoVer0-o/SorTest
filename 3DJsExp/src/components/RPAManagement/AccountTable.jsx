import { useState, useEffect, useRef } from "react";
import { DataTable, SearchBar, Loading } from "../../utilities";
import { botStatus } from "../../mock";
import { useResponsive } from "../../hooks";
import { AddUserModal, EditUserModal } from "..";
import { Button, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(isSameOrAfter);
import classNames from "classnames";
import RPAUserAPI from "../../service/RPAUserAPI";
import { useSelector } from 'react-redux'
import { getLogin } from '../../libs/loginSlice'
import { getUser } from "../../libs/userSlice";

const AccountTable = () => {

    const [botData, setBotData] = useState([]);
    const [botGroup, setBotGroup] = useState([]);
    const [searchAccount, setSearchAccout] = useState("");
    const [searchGroup, setSearchGroup] = useState([]);
    const [searchStatus, setSearchStatus] = useState([]);
    const [modalToggle, setModalToggle] = useState(false);
    const [addModalToggle, setAddModalToggle] = useState(false);
    const [modalData, setModalData] = useState([]);

    const [showLoading, setShowLoading] = useState(false);

    const { isTabletOrMobile, isMobile, isPortrait, isLandscape } = useResponsive();

    //////////////////////////////////////////modal toggle logic////////////////////////////////////////////////////////////////
    const showModal = (data) => {
        setModalData(data);
        setModalToggle(true);
    };

    const handleCancel = () => {
        setModalToggle(false);
    };

    const showAddModal = () => {
        setAddModalToggle(true);
    };

    const handleAddCancel = () => {
        setAddModalToggle(false);
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    const token = useSelector((state) => getLogin(state).token);

    const ownerGroup = useSelector((state) => getUser(state)[0].owner);

    useEffect(() => {
        console.log('user', ownerGroup);
    }, [ownerGroup])


    const fetchAcc = async () => {
        try {
            setShowLoading(true);
            const data = await RPAUserAPI.fbGetBotConfig(token);
            setBotData(data);
        } catch (error) {
            console.error('Error fetching bot config:', error);
        } finally {
            setShowLoading(false);
        }
    }

    const fetchGroup = async () => {
        try {
            setShowLoading(true);
            await RPAUserAPI.fbGetBotGroup(token).then((response) => setBotGroup(response));
        } catch (error) {
            console.error('Error fetching bot config:', error);
        } finally {
            setShowLoading(false);
        }
    }

    useEffect(() => {
        fetchAcc();
        fetchGroup();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const downloadFile = async () => {
        try {
            await RPAUserAPI.fbDownloadUser().then((response) => {
                const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = blobUrl;
                link.setAttribute('download', "user_format.xlsx");
                document.body.appendChild(link);
                link.click();
                window.URL.revokeObjectURL(blobUrl);
            })

        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    const hiddenFileInput = useRef(null);

    const handleClick = () => {
        hiddenFileInput.current.click();
    };

    const handleChange = async (event) => {
        const fileUploaded = event.target.files[0];
        // console.log(fileUploaded);
        await RPAUserAPI.fbUploadUser(fileUploaded).then((response) => { console.log(response); })
    };

    ////////////////////////////////////////////table//////////////////////////////////////////////////////////////
    const columns = [
        {
            title: "name",
            dataIndex: "botname",
            key: "botname",
            align: "center",
            width: 150,
            className: "tw-truncate",
            filteredValue: [searchAccount],
            onFilter: (value, record) =>
                String(record?.botname).toLowerCase().includes(value.toLowerCase()),
        },
        {
            title: "accName",
            dataIndex: "username",
            key: "username",
            align: "center",
            width: 150,
            className: "tw-truncate",
            filteredValue: [searchAccount],
            onFilter: (value, record) =>
                String(record?.username).toLowerCase().includes(value.toLowerCase()),
        },
        {
            title: "groups",
            dataIndex: "groups",
            key: "groups",
            align: "center",
            width: 150,
            className: "tw-text-violet-600",
            filteredValue: [searchGroup],
            onFilter: (value, record) =>
                value
                    .split(",")
                    .every((groups) => String(record?.groups).includes(groups)),
            render: (text, record) => (
                <div className="tw-flex tw-flex-row tw-gap-1 tw-justify-center">
                    {record?.groups.map((groups) => (
                        <Tooltip key={groups} title={botGroup?.find((botGroup) => botGroup.group_id == groups) ? botGroup?.find((botGroup) => botGroup.group_id == groups)?.group_name : "ไม่ระบุ"}>
                            <div className="tw-w-max tw-rounded-md tw-p-2 tw-border-2 tw-border-black tw-text-center tw-text-white tw-bg-violet-600">
                                {botGroup?.find((botGroup) => botGroup.group_id == groups) ? botGroup?.find((botGroup) => botGroup.group_id == groups)?.group_name : "ไม่ระบุ"}
                            </div>
                        </Tooltip>
                    ))}
                </div>
            ),
        },
        {
            title: "status",
            dataIndex: "status",
            key: "status",
            align: "center",
            width: 150,
            className: "tw-text-amber-600",
            filteredValue: [searchStatus],
            onFilter: (value, record) =>
                value
                    .split(",")
                    .some((status) => String(record?.status).includes(status)),
            render: (text, record) => (
                <div className="tw-flex tw-flex-row tw-gap-1 tw-justify-center">
                    <Tooltip title={record?.status}>
                        <div
                            className={classNames(
                                "tw-rounded-md tw-border-2 tw-border-black tw-w-max tw-text-center tw-text-white tw-p-2",
                                {
                                    "tw-bg-green-600": record?.status == "Running",
                                    "tw-bg-red-600": record?.status == "Not start",
                                    "tw-bg-yellow-600": record?.status == "standby",
                                }
                            )}
                        >
                            {record?.status}
                        </div>
                    </Tooltip>
                </div>
            ),
        },
        {
            title: "details",
            dataIndex: "job",
            key: "job",
            align: "center",
            width: 150,
            className: "tw-text-lime-600 tw-truncate",
        },
        {
            title: "",
            dataIndex: "botname",
            key: "botname",
            align: "center",
            width: 50,
            className: "tw-text-blue-500 tw-text-2xl",
            render: (text, record) => (
                <div className="tw-flex tw-flex-row tw-gap-1 tw-justify-center">
                    <Tooltip key={record.botname} title={"กดเพื่อแก้ไข"}>
                        <EditOutlined onClick={() => showModal(record)} />
                    </Tooltip>
                </div>
            ),
        },
    ];
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div
            className={
                classNames(
                    "tw-flex tw-flex-col tw-max-w-full tw-max-h-full tw-overflow-auto",
                    {}
                )
            }
        >
            <Loading isShown={showLoading} />
            <p className="tw-self-center tw-font-bold tw-text-xl tw-my-4">
                AccountTable
            </p>
            {
                botData.length > 0 && botGroup.length > 0 && (<div
                    className={classNames(
                        "tw-flex tw-flex-row tw-max-w-full tw-justify-center tw-gap-2",
                        {
                            "tw-flex-col": isTabletOrMobile,
                        }
                    )}
                >
                    <div className={classNames("tw-w-full", {})}>
                        <p className="tw-text-lg">เลขบัญชี/ชื่อบัญชี:</p>
                        <SearchBar
                            useTextSearch={true}
                            data={botStatus}
                            onChangeSearch={setSearchAccout}
                        />
                    </div>
                    <div className={classNames("tw-w-full", {})}>
                        <p className="tw-text-lg">กลุ่ม:</p>
                        <SearchBar
                            useTagSearch={true}
                            data={botGroup}
                            onChangeFilter={setSearchGroup}
                            keyName={"group_name"}
                        />
                    </div>
                    <div className={classNames("tw-w-full", {})}>
                        <p className="tw-text-lg">สถานะ:</p>
                        <SearchBar
                            useTagSearch={true}
                            data={botData}
                            onChangeFilter={setSearchStatus}
                            keyName={"status"}
                        />
                    </div>
                </div>)
            }

            {
                botData.length > 0 && (
                    <div className={classNames("tw-flex tw-flex-col tw-h-full tw-w-full tw-gap-2", {})}>
                        <div className={classNames("tw-flex tw-flex-row tw-h-fit tw-my-2", {
                            "tw-flex-col tw-w-full tw-gap-2": isMobile && isPortrait,
                            "tw-self-end tw-w-fit tw-gap-2": isMobile && isLandscape,
                            "tw-gap-4 tw-self-end tw-w-fit": !isMobile,
                        })}>
                            <Button
                                className={classNames("tw-self-center tw-text-blue-600 tw-border-blue-600 tw-border-2 tw-bg-white tw-drop-shadow-md hover:tw-bg-blue-600 hover:tw-border-black hover:tw-text-white", {
                                    "tw-w-full": isMobile && isPortrait,
                                })}
                                onClick={() => downloadFile()}>
                                ดาวน์โหลด Format
                            </Button>
                            <input
                                type="file"
                                onChange={handleChange}
                                ref={hiddenFileInput}
                                style={{ display: 'none' }}
                            />
                            <Button
                                className={classNames("tw-self-center tw-text-blue-600 tw-border-blue-600 tw-border-2 tw-bg-white tw-drop-shadow-md hover:tw-bg-blue-600 hover:tw-border-black hover:tw-text-white", {
                                    "tw-w-full": isMobile && isPortrait,
                                })}
                                onClick={() => handleClick()}>
                                เพิ่มบัญชี Excel
                            </Button>
                            <Button
                                className={classNames("tw-self-center tw-text-blue-600 tw-border-blue-600 tw-border-2 tw-bg-white tw-drop-shadow-md hover:tw-bg-blue-600 hover:tw-border-black hover:tw-text-white", {
                                    "tw-w-full": isMobile && isPortrait,
                                })}
                                onClick={() => showAddModal()}
                            >
                                เพิ่มบัญชีใหม่
                            </Button>
                        </div>
                        <div
                            className={classNames("tw-border-2 tw-rounded-md", {
                                "tw-overflow-auto tw-min-h-fit": isTabletOrMobile && isPortrait,
                            })}
                        >
                            <DataTable
                                columns={columns}
                                data={botData}
                                setPageSize={botData.length}
                                keyName={"botname"}
                            />
                            {modalToggle && (
                                <EditUserModal
                                    fetch={fetchAcc}
                                    token={token}
                                    modalToggle={modalToggle}
                                    handleCancel={handleCancel}
                                    modalData={modalData}
                                    sentOwner={ownerGroup}
                                />
                            )}
                            {addModalToggle && (
                                <AddUserModal
                                    fetch={fetchAcc}
                                    token={token}
                                    modalToggle={addModalToggle}
                                    handleCancel={handleAddCancel}
                                    sentOwner={ownerGroup}
                                />
                            )}
                        </div>
                    </div>
                )}
        </div >

    );
};

export default AccountTable;
