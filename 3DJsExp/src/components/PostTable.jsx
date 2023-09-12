import { DataTable, SearchBar } from "../utilities"
import { postMock } from "../mock"

const PostTable = () => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'key',
            key: 'key',
            className: 'tw-w-[60px] tw-text-red-600',
        },
        {
            title: 'post',
            dataIndex: 'post',
            key: 'post',
            className: 'tw-w-[60px]',
        },
        {
            title: 'creator',
            dataIndex: 'creator',
            key: 'creator',
            className: 'tw-w-[60px]',
        },
        {
            title: 'link',
            dataIndex: 'link',
            key: 'link',
            className: 'tw-w-[6px] tw-text-red-600',
        },
        {
            title: 'update',
            dataIndex: 'update',
            key: 'update',
            className: 'tw-w-[60px]',
        },
    ];

    return (
        <div className='tw-flex tw-flex-col tw-max-w-full tw-max-h-full tw-object-contain'>
            PostTable
            <DataTable data={postMock} columns={columns} className={"tw-max-w-full tw-max-h-full"} />
        </div>
    )
}

export default PostTable