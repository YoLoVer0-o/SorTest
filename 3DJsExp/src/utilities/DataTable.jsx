import { Table } from 'antd';

const DataTable = props => {
  const columns = props.columns;
  const data = props.data;

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div className='tw-w-full tw-h-full tw-object-contain'>
      <Table columns={columns} dataSource={data} onChange={onChange} className={"tw-max-w-full tw-max-h-full tw-object-contain"} />
    </div>
  )
}

export default DataTable