import postReportAPI from "../service/postReportAPI";

import { DataTable, SearchBar } from "../utilities";
import { postMock } from "../mock";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Tooltip } from "antd";
import {
    ColumnHeightOutlined,
    VerticalAlignMiddleOutlined,
    FileTextOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore)
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import classNames from "classnames";
dayjs.extend(isSameOrAfter)
import { useResponsive } from "../hooks";

const PostTable = () => {

    const [searchVal, setSearchVal] = useState('');
    const [searchTag, setSearchTag] = useState([]);
    const [searchDate, setSearchDate] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [pageSize, setPageSize] = useState(5);

    const navigate = useNavigate();

    const { isDesktopOrLaptop, isBigScreen, isTabletOrMobile, isPortrait, isLandscape } = useResponsive();

    const columns = [
        {
            title: 'update',
            dataIndex: 'update',
            key: 'update',
            align: "center",
            width: 150,
            className: 'tw-text-lime-600',
            filteredValue: [searchDate],
            onFilter: (value, record) => {
                if (value != undefined && value != null && value != "" && value != 'undefined') {
                    let startDate = String(value?.split(",")[0])
                    let endDate = String(value?.split(",")[1])
                    let recordDate = dayjs(record?.update).format('YYYY-MM-DD')
                    if (dayjs(recordDate).isSameOrBefore(endDate) && dayjs(recordDate).isSameOrAfter(startDate)) {
                        return record?.update
                    }
                } else {
                    return record?.update
                }
            },
        },
        {
            title: 'post',
            dataIndex: 'post',
            key: 'post',
            align: "center",
            width: 150,
            className: 'tw-truncate',
            filteredValue: [searchTag],
            onFilter: (value, record) => (
                (value.split(",")).every(tag => String(record?.tag).includes(tag))
            ),
        },
        {
            title: 'creator',
            dataIndex: 'creator',
            key: 'creator',
            align: "center",
            width: 150,
            className: 'tw-text-amber-600',
            filteredValue: [searchVal],
            onFilter: (value, record) => (
                String(record?.post).toLowerCase().includes(value.toLowerCase())
                || String(record?.creator).toLowerCase().includes(value.toLowerCase())
                || String(record?.update).toLowerCase().includes(value.toLowerCase())
            ),
        },
        {
            title: 'tag',
            dataIndex: 'tag',
            key: 'tag',
            align: "center",
            width: 150,
            className: 'tw-text-violet-600',
            render: (text, record) => (
                <div className="tw-flex tw-flex-row tw-gap-1 tw-justify-center">
                    {record?.tag.map(tag => (
                        <Tooltip key={tag} title={tag}>
                            <div className="tw-rounded-md tw-border-2 tw-border-black tw-w-6 tw-text-center tw-text-white tw-bg-violet-600" >
                                {tag}
                            </div>
                        </Tooltip>
                    ))}
                </div>
            ),
        },
        {
            title: 'link',
            dataIndex: 'link',
            key: 'link',
            align: "center",
            width: 150,
            className: 'tw-truncate tw-text-sky-700',
            render: (text, record) => (
                <div className="tw-flex tw-justify-center">
                    <Tooltip title="กดเพื่อไปที่โพสต์">
                        <a href={record?.link} target="blank">
                            <div className="tw-rounded-md tw-w-full tw-border-2 tw-border-black tw-text-center tw-text-white tw-bg-sky-600" >
                                <p className="tw-m-2">Link</p>
                            </div>
                        </a>
                    </Tooltip>
                </div>
            ),
        },

    ];

    const toReport = (data) => {
        navigate("/postlog/report", { state: data })
    }

    const genReport = async () => {
        // console.log("get:", rows);
        // console.log(selectedRows);
        // const testData = await postReportAPI.getAllPost();
        // console.log(testData);

        toReport(selectedRows);
    }



    return (
        <div className={classNames('tw-flex tw-flex-col tw-max-w-full tw-max-h-full tw-overflow-y-auto', {
            // "tw-min-h-screen": isTabletOrMobile && isLandscape,
        })}>
            <p className="tw-self-center tw-font-bold tw-text-xl tw-my-4">PostTable</p>
            <div className="tw-flex tw-justify-center tw-w-full">
                <SearchBar
                    data={postMock}
                    useTextSearch={true}
                    useTagSearch={true}
                    useDateSearch={true}
                    onChangeSearch={setSearchVal}
                    onChangeFilter={setSearchTag}
                    onChangeDate={setSearchDate}
                    keyName={"tag"}
                />
            </div>
            <div className={classNames("tw-border-2 tw-rounded-md", {
                "tw-overflow-auto": isTabletOrMobile && isPortrait,
            })}>
                <DataTable
                    data={postMock}
                    columns={columns}
                    setPageSize={pageSize}
                    onRowsSelected={setSelectedRows}
                    useRowSelection={true}
                />
            </div>
            <div className=" tw-flex tw-flex-row tw-my-6 tw-gap-4">
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
                {selectedRows.length > 0 && (
                    <Tooltip title="สร้างรายงาน">
                        <Button className="tw-border-black tw-border-2 tw-bg-sky-400 tw-drop-shadow-md hover:tw-bg-white hover:tw-border-sky-600 hover:tw-text-sky-600"
                            onClick={() => genReport(selectedRows)}
                            icon={<FileTextOutlined />}
                        >
                            สร้างรายงาน
                        </Button>
                    </Tooltip>
                )}
            </div>
        </div>
    );
};

export default PostTable;