import { Input, Cascader, DatePicker, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import classNames from "classnames";
import { useResponsive } from "../hooks";

const SearchBar = props => {
    const useTextSearch = props.useTextSearch;
    const useTagSearch = props.useTagSearch;
    const useDateSearch = props.useDateSearch;
    const receviedData = props.data;
    const onChangeSearch = props.onChangeSearch;
    const onChangeFilter = props.onChangeFilter;
    const onChangeDate = props.onChangeDate;
    const keyName = props.keyName;

    const {
        isDesktopOrLaptop,
        isBigScreen,
        isTabletOrMobile,
        isPortrait,
        isLandscape,
    } = useResponsive();

    const { RangePicker } = DatePicker;
    const dateFormat = 'DD/MM/YYYY';
    const uniqueTagsSet = new Set();

    {
        useTagSearch && (receviedData.forEach((receviedData) => {
            receviedData[`${keyName}`].forEach((tag) => {
                uniqueTagsSet.add(tag);
            });
        }))
    }

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
        <div className={classNames('tw-flex tw-flex-row tw-my-2 tw-gap-2 tw-w-full', {
            "tw-flex-col tw-self-center": isTabletOrMobile && isPortrait,
        })}>
            {useTextSearch && (<Tooltip title="พิมพ์สิ่งที่ต้องการค้นหา">
                <div className='tw-w-full'>
                    <Input
                        addonBefore={<SearchOutlined />}
                        placeholder="พิมพ์สิ่งที่ต้องการค้นหา"
                        onChange={onTextChange}
                        className='tw-border-2 tw-rounded-lg tw-border-sky-400 tw-drop-shadow-md hover:tw-border-sky-700 tw-w-full'
                    />
                </div>
            </Tooltip>)}

            {useTagSearch && (<Tooltip title="เลือกหมวดหมู่ที่ต้องการค้นหา">
                <div className='tw-w-full'>
                    <Cascader
                        options={uniqueTagsArray}
                        onChange={onTagChange}
                        multiple
                        maxTagCount="responsive"
                        placeholder="เลือกหมวดหมู่ที่ต้องการค้นหา"
                        className='tw-border-2 tw-rounded-lg tw-border-sky-400 tw-drop-shadow-md hover:tw-border-sky-700 tw-w-full'
                    />
                </div>
            </Tooltip>)}

            {useDateSearch && (<Tooltip title="เลือกช่วงเวลาที่ต้องการค้นหา">
                <div className='tw-w-full'>
                    <RangePicker
                        onChange={onTimeChange}
                        format={dateFormat}
                        className='tw-border-2 tw-rounded-lg tw-border-sky-400 tw-drop-shadow-md hover:tw-border-sky-700 tw-w-full'
                    />
                </div>
            </Tooltip>)}

        </div>
    );
};

SearchBar.propTypes = {
    useTextSearch: PropTypes.bool,
    useTagSearch: PropTypes.bool,
    useDateSearch: PropTypes.bool,
    data: PropTypes.array,
    onChangeFilter: PropTypes.func,
    onChangeSearch: PropTypes.func,
    onChangeDate: PropTypes.func,
    keyName: PropTypes.string,
}

export default SearchBar;