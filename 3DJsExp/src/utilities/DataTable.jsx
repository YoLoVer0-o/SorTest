import { Table } from 'antd';
import PropTypes from 'prop-types';

const DataTable = props => {
  const columns = props.columns;
  const receviedData = props.data;
  const onRowClick = props.onRowClick;
  const pageSize = props.setPageSize;
  const sendRows = props.onRowsSelected;

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
      sendRows(selectedRows)
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
      sendRows(selectedRows)
    },
  };

  return (
    <div className='tw-max-w-max tw-max-h-max tw-overflow-y-auto'>
      <Table
        rowClassName={"tw-max-w-md tw-max-h-2.5"}
        // scroll={{ y: "16.5rem" }}
        // onWheel={(e) => e.preventDefault()}
        tableLayout={'fixed'}
        columns={columns}
        dataSource={receviedData}
        onChange={onChange}
        pagination={{
          defaultPageSize: 5,
          pageSize: pageSize,
        }}
        className={"tw-max-w-max tw-max-h-max tw-overflow-y-auto"}
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
  onRowsSelected: PropTypes.func,
  setPageSize: PropTypes.number,
}

export default DataTable;