import { Input, Cascader, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

const SearchBar = props => {

    const receviedData = props.data;
    const onChangeSearch = props.onChangeSearch;
    const onChangeFilter = props.onChangeFilter;
    const onChangeDate = props.onChangeDate;

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

        const times = value?.map((e) => {
            return (dayjs(e).format('YYYY-MM-DD'));
        })

        onChangeDate(times);
    };

    return (
        <div className='tw-flex tw-flex-row tw-my-2'>
            <Input
                style={{
                    width: '100%',
                }}
                addonBefore={<SearchOutlined />}
                placeholder="พิมพ์สิ่งที่ต้องการค้นหา"
                onChange={onTextChange}
                className='tw-border-2 tw-rounded-lg tw-border-sky-500 tw-mx-2 tw-drop-shadow-md'
            />
            <Cascader
                style={{
                    width: '100%',
                }}
                options={uniqueTagsArray}
                onChange={onTagChange}
                multiple
                maxTagCount="responsive"
                placeholder="เลือกหมวดหมู่ที่ต้องการค้นหา"
                className='tw-border-2 tw-rounded-lg tw-border-sky-500 tw-mx-2 tw-drop-shadow-md'
            />
            <RangePicker
                style={{
                    width: '100%',
                }}
                onChange={onTimeChange}
                format={dateFormat}
                className='tw-border-2 tw-rounded-lg tw-border-sky-500 tw-mx-2 tw-drop-shadow-md'
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