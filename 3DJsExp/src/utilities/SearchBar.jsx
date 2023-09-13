import { Input, Cascader } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const SearchBar = props => {

    const receviedData = props.data;
    const onChangeSearch = props.onChangeSearch;
    // const onChangeFilter = props.onChangeFilter;


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

    // const onTagChange = (value) => {
    //     console.log(value);
    //     onChangeFilter();
    // };

    const onTextChange = (e) => {
        console.log(e.target.value);
        onChangeSearch(e.target.value);
    };


    return (

        <div>
            <Input addonBefore={<SearchOutlined />} placeholder="พิมพ์สิ่งที่ต้องการค้นหา" onChange={onTextChange} />

            <Cascader
                style={{
                    width: '100%',
                }}
                options={uniqueTagsArray}
                // onChange={onTagChange}
                multiple
                maxTagCount="responsive"
            />

        </div>
    );
};

export default SearchBar;