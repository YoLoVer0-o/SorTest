import { Input, Cascader } from 'antd';

const { Search } = Input;

const options = [
    {
        label: 'Light',
        value: 'light',
        children: new Array(20).fill(null).map((_, index) => ({
            label: `Number ${index}`,
            value: index,
        })),
    },
    {
        label: 'Bamboo',
        value: 'bamboo',
        children: [
            {
                label: 'Little',
                value: 'little',
                children: [
                    {
                        label: 'Toy Fish',
                        value: 'fish',
                        disableCheckbox: true,
                    },
                    {
                        label: 'Toy Cards',
                        value: 'cards',
                    },
                    {
                        label: 'Toy Bird',
                        value: 'bird',
                    },
                ],
            },
        ],
    },
];
const onChange = (value) => {
    console.log(value);
};

const onSearch = (value, _e, info) => console.log(info?.source, value);

const SearchBar = () => (
    <div>

        <Search placeholder="input search text" onSearch={onSearch} enterButton />

        <Cascader
            style={{
                width: '100%',
            }}
            options={options}
            onChange={onChange}
            multiple
            maxTagCount="responsive"
        />

    </div>



);
export default SearchBar;