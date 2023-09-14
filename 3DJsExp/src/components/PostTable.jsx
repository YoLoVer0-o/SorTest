import { DataTable, SearchBar } from "../utilities";
import { postMock } from "../mock";
import { useState } from "react";

const PostTable = () => {

    const [searchVal, setSearchVal] = useState('');
    const [searchTag, setSearchTag] = useState([]);

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
                || String(record?.link).toLowerCase().includes(value.toLowerCase())
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
                // String(record?.tag).includes((value.split(",")))
                (value.split(",")).every(tag => String(record?.tag).includes(tag))
                // String(record?.tag).toLowerCase().includes(value.toLowerCase())
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
        },
    ];

    return (
        <div className='tw-flex tw-flex-col tw-max-w-full tw-max-h-full tw-object-contain'>
            PostTable
            <SearchBar
                data={postMock}
                onChangeSearch={setSearchVal}
                onChangeFilter={setSearchTag}
            />
            <DataTable
                data={postMock}
                columns={columns}
            />
        </div>
    );
};

export default PostTable;