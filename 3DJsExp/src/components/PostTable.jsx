import { DataTable, SearchBar } from "../utilities";
import { postMock } from "../mock";
import { useState, useMemo } from "react";

const PostTable = () => {

    const [searchVal, setSearchVal] = useState("");

    const columns = [
        {
            title: 'ID',
            dataIndex: 'key',
            key: 'key',
            className: 'tw-w-[10%] tw-text-red-600 ',
            filteredValue: [searchVal],
            onFilter: (value, record) => {
                console.log(record);
                
                // (record.key).toLowerCase().includes(value.toLowerCase())
                //     || (record.post).toLowerCase().includes(value.toLowerCase())
                //     || (record.creator).toLowerCase().includes(value.toLowerCase())
                //     || (record.link).toLowerCase().includes(value.toLowerCase())
                //     || (record.update).toLowerCase().includes(value.toLowerCase())
            }
            ,
        },
        {
            title: 'post',
            dataIndex: 'post',
            key: 'post',
            className: 'tw-truncate tw-w-[30%]',
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
            <SearchBar data={postMock} onChangeSearch={setSearchVal}
            // onChangeFilter={ } 
            />
            <DataTable data={postMock} columns={columns} />
        </div>
    );
};

export default PostTable;