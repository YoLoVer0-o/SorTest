import { DataTable, SearchBar } from "../utilities"
import { postMock } from "../mock"

const PostTable = () => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'key',
            key: 'key',
            className: 'tw-w-[10%] tw-text-red-600 ',
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
            <DataTable data={postMock} columns={columns} />
        </div>
    )
}

export default PostTable