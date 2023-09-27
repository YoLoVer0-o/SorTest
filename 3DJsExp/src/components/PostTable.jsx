import { DataTable, SearchBar } from "../utilities";
import { postMock } from "../mock";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore)
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { Button, Tooltip } from "antd";
dayjs.extend(isSameOrAfter)

const PostTable = () => {

    const [searchVal, setSearchVal] = useState('');
    const [searchTag, setSearchTag] = useState([]);
    const [searchDate, setSearchDate] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [pageSize, setPageSize] = useState(5);

    const navigate = useNavigate();

    const columns = [
        {
            title: 'ID',
            dataIndex: 'key',
            key: 'key',
            className: 'tw-w-[10%] tw-text-red-600 tw-font-bold',
            filteredValue: [searchVal],
            onFilter: (value, record) => (
                String(record?.key).toLowerCase().includes(value.toLowerCase())
                || String(record?.post).toLowerCase().includes(value.toLowerCase())
                || String(record?.creator).toLowerCase().includes(value.toLowerCase())
                || String(record?.update).toLowerCase().includes(value.toLowerCase())
            ),
        },
        {
            title: 'post',
            dataIndex: 'post',
            key: 'post',
            className: 'tw-truncate tw-w-[30%]',
            filteredValue: [searchTag],
            onFilter: (value, record) => (
                (value.split(",")).every(tag => String(record?.tag).includes(tag))
            ),
        },
        {
            title: 'creator',
            dataIndex: 'creator',
            key: 'creator',
            className: 'tw-w-[15%] tw-text-amber-600',
        },
        {
            title: 'tag',
            dataIndex: 'tag',
            key: 'tag',
            className: 'tw-w-[15%] tw-text-violet-600',
            render: (text, record) => (
                <div className="tw-flex tw-flex-row tw-gap-1">
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
            className: 'tw-w-[30%] tw-h-[10%] tw-truncate tw-text-sky-700',
        },
        {
            title: 'update',
            dataIndex: 'update',
            key: 'update',
            className: 'tw-w-[15%] tw-text-lime-600',
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
    ];

    const toReport = (data) => {
        navigate("/postlog/report", { state: data })
    }

    const downloadPDF = (rows) => {
        console.log("get:", rows);
    }
    return (
        <div className='tw-flex tw-flex-col tw-max-w-full tw-max-h-full tw-flex-nowrap'>
            <p className="tw-self-center tw-font-bold tw-text-xl tw-my-4">PostTable</p>
            <SearchBar
                data={postMock}
                onChangeSearch={setSearchVal}
                onChangeFilter={setSearchTag}
                onChangeDate={setSearchDate}
            />
            <DataTable
                data={postMock}
                columns={columns}
                onRowClick={toReport}
                setPageSize={pageSize}
                onRowsSelected={setSelectedRows}
            />
            <div className=" tw-flex tw-flex-row tw-my-6 tw-gap-4">
                <Tooltip title="แสดงเพิ่มเติม">
                    <Button className="tw-border-black tw-border-2 tw-bg-green-400 tw-drop-shadow-md hover:tw-bg-white hover:tw-border-green-600 hover:tw-text-green-600"
                        onClick={() => setPageSize(20)} >
                        show more
                    </Button>
                </Tooltip>
                <Tooltip title="แสดงน้อยลง">
                    <Button className="tw-border-black tw-border-2 tw-bg-yellow-400 tw-drop-shadow-md hover:tw-bg-white hover:tw-border-yellow-600 hover:tw-text-yellow-600"
                        onClick={() => setPageSize(5)} >
                        show less
                    </Button>
                </Tooltip>
                <Tooltip title="ดาวน์โหลดรายงาน(.PDF)">
                    <Button className="tw-border-black tw-border-2 tw-bg-red-400 tw-drop-shadow-md hover:tw-bg-white hover:tw-border-red-600 hover:tw-text-red-600"
                        onClick={() => downloadPDF(selectedRows)} >
                        download PDF
                    </Button>
                </Tooltip>
            </div>
        </div>
    );
};

export default PostTable;