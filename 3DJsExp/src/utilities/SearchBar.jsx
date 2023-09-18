import { Input, Cascader } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const SearchBar = props => {

    const receviedData = props.data;
    const onChangeSearch = props.onChangeSearch;
    const onChangeFilter = props.onChangeFilter;

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
        </div>
    );
};

SearchBar.propTypes = {
    data: PropTypes.array.isRequired,
    onChangeFilter: PropTypes.func,
    onChangeSearch: PropTypes.func,
}

export default SearchBar;