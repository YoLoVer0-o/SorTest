import { Table } from 'antd';
import PropTypes from 'prop-types';

const DataTable = props => {
  const columns = props.columns;
  const receviedData = props.data;

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div className='tw-w-full tw-max-h-96 tw-mb-28'>
      <Table
        rowClassName={"tw-max-h-2.5"}
        scroll={{ y: "25em" }}
        tableLayout={'fixed'}
        columns={columns}
        dataSource={receviedData}
        onChange={onChange}
        className={"tw-max-w-full tw-max-h-96"}
      />
    </div>
  );
};

DataTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
}

export default DataTable;