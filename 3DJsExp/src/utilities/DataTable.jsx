import { Table } from 'antd';
import PropTypes from 'prop-types';

const DataTable = props => {
  const columns = props.columns;
  const receviedData = props.data;
  const onRowClick = props.onRowClick;

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const handleRowClick = (record, index) => {
    console.log("row clicked");
    console.log(record, index);
    onRowClick(record)
  }

  const handleRowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
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
        onRow={(record, rowIndex) => ({
          onClick: () => {
            handleRowClick(record, rowIndex)
          }
        })}
        rowSelection={handleRowSelection}
      />
    </div>
  );
};

DataTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  onRowClick: PropTypes.func,
}

export default DataTable;