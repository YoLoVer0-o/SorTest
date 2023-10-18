import { DataTable } from "../utilities";

const ReportTable = () => {
    const columns = [
       
        {
            title: 'สื่อประกอบ',
            dataIndex: 'post',
            key: 'post',
            align: "center",
            width: 150,
            className: 'tw-text-white tw-bg-[#303c6c]',
           
          
        },
        {
            title: 'เนื้อหา',
            dataIndex: 'creator',
            key: 'creator',
            align: "center",
            width: 150,
            className: 'tw-text-white tw-bg-[#303c6c]',
        },
        {
            title: 'วันที่โพสต์ / อัปเดต',
            dataIndex: 'link',
            key: 'link',
            align: "center",
            width: 150,
            className: 'tw-text-white tw-text-sky-700 tw-bg-[#303c6c]',
        },
        {
            title: 'การมีส่วนร่วม',
            dataIndex: 'update',
            key: 'update',
            align: "center",
            width: 150,
            className: 'tw-text-white tw-bg-[#303c6c]',
        
        },
    ];
    return ( 
        <div>
            <DataTable 
            columns={columns}/>
        </div>
    );
}

export default ReportTable;