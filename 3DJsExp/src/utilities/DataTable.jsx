import { Table } from 'antd';

const DataTable = props => {
  const columns = props.columns;
  const data = props.data;

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div className=' tw-w-full tw-object-contain tw-max tw-h-full  '>
      <Table 
      rowClassName={"tw-h-[10px] "} 
      scroll={{ x: "content-fit",y: '20em' }}  
      tableLayout={'fixed'} 
      columns={columns} 
      dataSource={data} 
      onChange={onChange} 
      className={"tw-max-w-full  tw-object-contain"} />
    </div>
  )
}

export default DataTable