import { DataTable, SearchBar } from "../utilities";
import { postMock } from "../mock";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const PostTable = () => {

    const [searchVal, setSearchVal] = useState('');
    const [searchTag, setSearchTag] = useState([]);
    const [searchDate, setSearchDate] = useState([]);

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
            onFilter: (value, record) => (
                new Date(dayjs(searchDate[0]).format('DD/MM/YYYY')) >= new Date(record?.update) <= new Date(dayjs(searchDate[1]).format('DD/MM/YYYY'))
                // time1 <= record <= time2
                //console.log(value.split(","))
            ),
        },
    ];

    const toReport = (data) => {
        navigate("/postlog/report", { state: data })
    }

    return (
        <div className='tw-flex tw-flex-col tw-max-w-full tw-max-h-full'>
            PostTable
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
            />
        </div>
    );
};

export default PostTable;