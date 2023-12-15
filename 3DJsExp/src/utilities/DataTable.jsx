import { Table } from 'antd';
import PropTypes from 'prop-types';
import classNames from "classnames";

const DataTable = props => {

  const columns = props.columns;
  const receviedData = props.data;
  const onRowClick = props.onRowClick;
  const pageSize = props.setPageSize;
  const sendRows = props.onRowsSelected;
  const useRowSelection = props.useRowSelection;
  const useRowClick = props.useRowClick;


  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const handleRowClick = (record, index) => {
    // console.log("row clicked");
    // console.log(record, index);
    onRowClick(record)
  }

  const handleRowSelection = {
    // onChange: (selectedRowKeys, selectedRows) => {
    //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    // },
    onSelect: (record, selected, selectedRows) => {
      console.log(selectedRows);
      sendRows(selectedRows)
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
      sendRows(selectedRows)
    },
  };

  return (
    <div className={classNames("tw-min-h-fit tw-min-w-full tw-overflow-auto", {
      // "tw-min-h-screen": isMobile && isLandscape,
    })}>
      <Table
        rowClassName={"tw-min-h-fit tw-min-w-fit"}
        tableLayout={'fixed'}
        columns={columns}
        // sticky={{ offsetScroll: 4, }}
        dataSource={receviedData ? receviedData.map(item => ({ ...item, key: item.id })) : []}
        onChange={onChange}
        pagination={{
          defaultPageSize: 5,
          pageSize: pageSize,
        }}
        onRow={(record, rowIndex) => ({
          onClick: () => {
            useRowClick ? handleRowClick(record, rowIndex) : false
          }
        })}
        rowSelection={useRowSelection ? handleRowSelection : false}
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
  useRowSelection: PropTypes.bool,
  useRowClick: PropTypes.bool,
}

export default DataTable;