import { Input, Cascader, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import dayjs from 'dayjs'; 

const SearchBar = props => {

    const receviedData = props.data;
    const onChangeSearch = props.onChangeSearch;
    const onChangeFilter = props.onChangeFilter;
    const onChangeDate = props.onChangeDate;

    // const options = [
    //     {
    //         label: 'Light',
    //         value: 'light',
    //         children: new Array(20).fill(null).map((_, index) => ({
    //             label: `Number ${index}`,
    //             value: index,
    //         })),
    //     },
    //     {
    //         label: 'Bamboo',
    //         value: 'bamboo',
    //         children: [
    //             {
    //                 label: 'Little',
    //                 value: 'little',
    //                 children: [
    //                     {
    //                         label: 'Toy Fish',
    //                         value: 'fish',
    //                         disableCheckbox: true,
    //                     },
    //                     {
    //                         label: 'Toy Cards',
    //                         value: 'cards',
    //                     },
    //                     {
    //                         label: 'Toy Bird',
    //                         value: 'bird',
    //                     },
    //                 ],
    //             },
    //         ],
    //     },
    // ];

    const { RangePicker } = DatePicker;
    const dateFormat = 'DD/MM/YYYY';

    const uniqueTagsSet = new Set();

    receviedData.forEach((receviedData) => {
        receviedData.tag.forEach((tag) => {
            uniqueTagsSet.add(tag);
        });
    });

    const uniqueTagsArray = [...uniqueTagsSet].map((tag) => ({
        label: tag,
        value: tag,
    }));

    const onTextChange = (e) => {
        onChangeSearch(e.target.value);
    };

    const onTagChange = (value) => {
        const searchTag = value.map((e) => {
            return e;
        })
        onChangeFilter(searchTag);
    };

    const onTimeChange = (value) => {
        // console.log(dayjs(value[0]).format('DD/MM/YYYY'));
        // console.log(dayjs(value[1]).format('DD/MM/YYYY'));
        const times = value.map((e) =>{
            return (dayjs(e).format('DD/MM/YYYY'));
        })
        // console.log(times)
        onChangeDate(times);
    };

    return (
        <div>
            <Input
                addonBefore={<SearchOutlined />}
                placeholder="พิมพ์สิ่งที่ต้องการค้นหา"
                onChange={onTextChange}
            /> 
            <Cascader
                style={{
                    width: '100%',
                }}
                options={uniqueTagsArray}
                onChange={onTagChange}
                multiple
                maxTagCount="responsive"
            />
            <RangePicker
                // allowClear
                onChange={onTimeChange}
                format={dateFormat}
            />
        </div>
    );
};

SearchBar.propTypes = {
    data: PropTypes.array.isRequired,
    onChangeFilter: PropTypes.func,
    onChangeSearch: PropTypes.func,
    onChangeDate: PropTypes.func,
}

export default SearchBar;