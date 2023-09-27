import { DataTable, SearchBar } from "../utilities";
import { postMock } from "../mock";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore)
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { Button } from "antd";
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
            className: 'tw-w-[10%] tw-text-red-600 ',
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
            className: 'tw-w-[15%]',
        },
        {
            title: 'link',
            dataIndex: 'link',
            key: 'link',
            className: 'tw-w-[30%] tw-h-[10%] tw-truncate tw-text-red-600',
        },
        {
            title: 'update',
            dataIndex: 'update',
            key: 'update',
            className: 'tw-w-[15%]',
            filteredValue: [searchDate],
            onFilter: (value, record) => {
                if (value != undefined && value != null && value != "" && value != 'undefined') {
                    // console.log(value);
                    // console.log("update");
                    let startDate = String(value?.split(",")[0])
                    let endDate = String(value?.split(",")[1])
                    let recordDate = dayjs(record?.update).format('YYYY-MM-DD')
                    if (dayjs(recordDate).isSameOrBefore(endDate) && dayjs(recordDate).isSameOrAfter(startDate)) {
                        // console.log("pass");
                        return record?.update
                    }
                    // else {
                    //     console.log("clean");
                    //     return record?.update
                    // }
                } else {
                    // console.log("reset");
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
        <div className='tw-flex tw-flex-col tw-max-w-[inherit] tw-max-h-[inherit] tw-flex-nowrap'>
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
                <Button className="tw-border-black tw-border-2 tw-bg-green-400 tw-drop-shadow-md hover:tw-bg-white hover:tw-border-green-400 hover:tw-text-green-400" onClick={() => setPageSize(20)} >show more</Button>
                <Button className="tw-border-black tw-border-2 tw-bg-yellow-400 tw-drop-shadow-md hover:tw-bg-white hover:tw-border-yellow-400 hover:tw-text-yellow-400" onClick={() => setPageSize(5)} >show less</Button>
                <Button className="tw-border-black tw-border-2 tw-bg-red-400 tw-drop-shadow-md hover:tw-bg-white hover:tw-border-red-400 hover:tw-text-red-400" onClick={() => downloadPDF(selectedRows)} >download PDF</Button>
            </div>
        </div>
    );
};

export default PostTable;