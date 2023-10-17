import { DataTable } from "../utilities";

const ReportTable = () => {
    const columns = [
       
        {
            title: 'สื่อประกอบ',
            dataIndex: 'post',
            key: 'post',
            align: "center",
            width: 150,
            className: 'tw-truncate',
           
          
        },
        {
            title: 'เนื้อหา',
            dataIndex: 'creator',
            key: 'creator',
            align: "center",
            width: 150,
            className: 'tw-text-amber-600',
        },
        {
            title: 'วันที่โพสต์ / อัปเดต',
            dataIndex: 'link',
            key: 'link',
            align: "center",
            width: 150,
            className: 'tw-truncate tw-text-sky-700',
        },
        {
            title: 'การมีส่วนร่วม',
            dataIndex: 'update',
            key: 'update',
            align: "center",
            width: 150,
            className: 'tw-text-lime-600',
        
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