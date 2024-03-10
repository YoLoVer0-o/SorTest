import { Select } from "antd";
import { DataTable } from "../../utilities";
const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log("search:", value);
};

// Filter `option.label` match the user type `input`
const filterOption = (input, option) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const columns = [
    {
        title: 'ประเภท',
        dataIndex: 'type',
        key: 'type',
        align: "center",
        width: 50,
        className: 'tw-truncate',
       
    },
    {
        title: 'ชื่อ',
        dataIndex: 'name',
        key: 'name',
        align: "center",
        width: 150,
        className: 'tw-text-lime-600',
    },
    {
        title: 'กลุ่ม',
        dataIndex: 'group',
        key: 'group',
        align: "center",
        width: 150,
        className: 'tw-truncate',
    },
    {
        title: 'รายละเอียด',
        dataIndex: 'detail',
        key: 'detail',
        align: "center",
        width: 200,
        className: 'tw-text-violet-600',
      
    },
    {
        title: 'Link',
        dataIndex: 'link',
        key: 'link',
        align: "center",
        width: 150,
        className: 'tw-text-amber-600',
    },
   
];

function AccountManage() {
  return (
    <div className="tw-w-full tw-h-full tw-flex tw-flex-col tw-items-center ">
      <div className=" tw-w-[80%] tw-max-h-full tw-flex-row tw-flex tw-gap-4 tw-justify-center">
        <Select
          className="tw-w-full "
          showSearch
          placeholder="ชื่อ"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={filterOption}
          options={[
            {
              value: "jack",
              label: "Jack",
            },
            {
              value: "lucy",
              label: "Lucy",
            },
            {
              value: "tom",
              label: "Tom",
            },
          ]}
        />
        <Select
          className="tw-w-full "
          showSearch
          placeholder="กลุ่ม"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={filterOption}
          options={[
            {
              value: "A",
              label: "A",
            },
            {
              value: "B",
              label: "B",
            },
            {
              value: "C",
              label: "C",
            },
          ]}
        />
        <button className="tw-w-full tw-h-8 tw-bg-green-500 tw-rounded-lg tw-items-center tw-text-white">
          เพิ่มเป้าหมายใหม่
        </button>
      </div>
      <DataTable columns={columns}/>
    </div>
  );
}

export default AccountManage;
