import { Table } from 'antd';
import PropTypes from 'prop-types';
import classNames from "classnames";
import { useResponsive } from "../hooks";

const DataTable = props => {

  const columns = props.columns;
  const receviedData = props.data;
  const onRowClick = props.onRowClick;
  const pageSize = props.setPageSize;
  const sendRows = props.onRowsSelected;

  const [isDesktopOrLaptop, isBigScreen, isTabletOrMobile, isPortrait, isRetina] = useResponsive();

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
    // <div className='tw-max-h-max tw-overflow-y-auto tw-overflow-x-auto'>
    <div className={classNames("tw-max-h-full tw-max-w-full tw-overflow-auto", {})}>
      <Table
        rowClassName={"tw-w-full tw-h-full"}
        tableLayout={'fixed'}
        columns={columns}
        dataSource={receviedData}
        onChange={onChange}
        pagination={{
          defaultPageSize: 5,
          pageSize: pageSize,
        }}
        className={classNames("tw-overflow-auto tw-min-h-full tw-min-w-screen", {
          // "tw-max-h-full tw-max-w-full": isDesktopOrLaptop,
          // "tw-min-h-full tw-min-w-full": isTabletOrMobile&&isPortrait,
        })}
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