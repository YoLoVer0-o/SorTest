import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable, SearchBar, Loading } from "../../utilities";
import { postMock } from "../../mock";
import { useResponsive } from "../../hooks";
import { Button, Input, Switch, Tooltip, InputNumber, Select } from "antd";
import {
    ColumnHeightOutlined,
    VerticalAlignMiddleOutlined,
    FileTextOutlined,
    SearchOutlined,
    MinusOutlined,
    CloseCircleOutlined,
    PlusOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore)
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrAfter)
import classNames from "classnames";
import postReportAPI from "../../service/postReportAPI";
import { useSelector } from 'react-redux'
import { getLogin } from '../../libs/loginSlice'

const PostTable = () => {

    const [searchVal, setSearchVal] = useState('');
    const [searchTag, setSearchTag] = useState([]);
    const [searchDate, setSearchDate] = useState([]);
    const [searchPlatform, setSearchPlatform] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const [advancedSearch, setAdvancedSearch] = useState(false);
    const [includeWord, setIncludeWord] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [excludeWord, setExcludeWord] = useState([]);
    const [displayData, setDisplayData] = useState([]);
    const [showLoading, setShowLoading] = useState(false);

    const navigate = useNavigate();

    const token = useSelector((state) => getLogin(state).token);

    const { isTabletOrMobile, isPortrait } = useResponsive();

    const fetchPost = async () => {
        try {
            setShowLoading(true);
            const data = await postReportAPI.getTagetPost();
            setDisplayData(data);
        } catch (error) {
            console.error('Error fetching bot config:', error);
        } finally {
            setShowLoading(false);
        }
    }

    useEffect(() => {
        fetchPost()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const addWord = async (word, setData) => {

        // const payload = { group_name: group }
        setData(prevItems => [...prevItems, {
            label: word,
            value: word,
        }])
        setInputValue(null)
    };

    const deleteWord = async (word, setData) => {


        setData(prevItems => {
            const indexToRemove = prevItems.findIndex(item => item.label === word);

            // If the item is found
            if (indexToRemove !== -1) {
                // Create a copy of the current items array
                const newItems = [...prevItems];
                // Remove the item from the copied array
                newItems.splice(indexToRemove, 1);
                // Update the state with the new array
                return newItems
            }
        })

    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////table///////////////////////////////////////////////////////////////
    const columns = [
        {
            title: 'update',
            dataIndex: 'update',
            key: 'update',
            align: "center",
            width: 150,
            className: 'tw-text-lime-600',
            filteredValue: [searchDate],
            onFilter: (value, record) => {
                if (value != undefined && value != null && value != "" && value != 'undefined') {
                    let startDate = String(value?.split(",")[0])
                    let endDate = String(value?.split(",")[1])
                    let recordDate = dayjs(record?.update).format('YYYY-MM-DD')
                    if (dayjs(recordDate).isSameOrBefore(endDate) && dayjs(recordDate).isSameOrAfter(startDate)) {
                        return record?.update
                    }
                } else {
                    return record?.update
                }
            },
        },
        {
            title: 'platform',
            dataIndex: 'platform',
            key: 'platform',
            align: "center",
            width: 150,
            className: 'tw-truncate',
            filteredValue: [searchPlatform],
            onFilter: (value, record) => (
                (value.split(",")).every(platform => String(record?.platform).includes(platform))
            ),
        },
        {
            title: 'post',
            dataIndex: 'post',
            key: 'post',
            align: "center",
            width: 150,
            className: 'tw-truncate',
            filteredValue: [searchTag],
            onFilter: (value, record) => (
                (value.split(",")).every(tag => String(record?.tag).includes(tag))
            ),
        },
        {
            title: 'creator',
            dataIndex: 'creator',
            key: 'creator',
            align: "center",
            width: 150,
            className: 'tw-text-amber-600',
            filteredValue: [searchVal],
            onFilter: (value, record) => (
                String(record?.post).toLowerCase().includes(value.toLowerCase())
                || String(record?.creator).toLowerCase().includes(value.toLowerCase())
                || String(record?.update).toLowerCase().includes(value.toLowerCase())
            ),
        },
        {
            title: 'tag',
            dataIndex: 'tag',
            key: 'tag',
            align: "center",
            width: 150,
            className: 'tw-text-violet-600',
            render: (text, record) => (
                <div className="tw-flex tw-flex-row tw-gap-1 tw-justify-center">
                    {record?.tag.map(tag => (
                        <Tooltip key={tag} title={tag}>
                            <div className="tw-rounded-md tw-p-2 tw-border-2 tw-border-black tw-w-fit tw-text-center tw-text-white tw-bg-violet-600" >
                                {tag}
                            </div>
                        </Tooltip>
                    ))}
                </div>
            ),
        },
        {
            title: 'link',
            dataIndex: 'link',
            key: 'link',
            align: "center",
            width: 150,
            className: 'tw-truncate tw-text-sky-700',
            render: (text, record) => (
                <div className="tw-flex tw-justify-center">
                    <Tooltip title="กดเพื่อไปที่โพสต์">
                        <a href={record?.link} target="blank">
                            <div className="tw-rounded-md tw-w-full tw-border-2 tw-border-black tw-text-center tw-text-white tw-bg-sky-600" >
                                <p className="tw-m-2">Link</p>
                            </div>
                        </a>
                    </Tooltip>
                </div>
            ),
        },
    ];
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////to repot and gen report//////////////////////////////////////////////////////////////////
    const toReport = (data) => {
        navigate("/postlog/report", { state: data })
    }

    const genReport = async () => {
        toReport(selectedRows);
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div className={classNames('tw-flex tw-flex-col tw-max-w-full tw-max-h-full tw-overflow-y-auto', {})}>
            <Loading isShown={showLoading} />
            <p className="tw-self-center tw-font-bold tw-text-xl tw-my-4">PostTable</p>
            <div className="tw-flex tw-flex-col tw-justify-center tw-w-full">
                <div className={classNames("tw-w-full", {})}>
                    <p className="tw-text-lg">ค้นหา:</p>
                    <SearchBar
                        useTextSearch={true}
                        data={postMock}
                        onChangeSearch={setSearchVal}
                    />
                </div>
                <div className='tw-flex tw-flex-row tw-justify-center tw-w-full tw-gap-6'>
                    <div className={classNames("tw-w-full", {})}>
                        <p className="tw-text-lg">แพลตฟอร์ม:</p>
                        <SearchBar
                            useTagSearch={true}
                            data={postMock}
                            onChangeFilter={setSearchPlatform}
                            keyName={"platform"}
                        />
                    </div>
                    <div className={classNames("tw-w-full", {})}>
                        <p className="tw-text-lg">Tag:</p>
                        <SearchBar
                            useTagSearch={true}
                            data={postMock}
                            onChangeFilter={setSearchTag}
                            keyName={"tag"}
                        />
                    </div>
                    <div className={classNames("tw-w-full", {})}>
                        <p className="tw-text-lg">เวลา:</p>
                        <SearchBar
                            useDateSearch={true}
                            onChangeDate={setSearchDate}
                        // keyName={"tag"}
                        />
                    </div>
                </div>
                {advancedSearch && (
                    <div className="tw-flex tw-flex-col tw-justify-center tw-w-full tw-gap-6">
                        <div className='tw-flex tw-flex-col tw-justify-center tw-w-full'>
                            <p className="tw-text-lg">มีคำเหล่านี้:</p>
                            <Select
                                mode="multiple"
                                allowClear
                                className='tw-w-full'
                                placeholder="Please select"
                                onFocus={() => setInputValue(null)}
                                onDeselect={(value) => deleteWord(value, setIncludeWord)}
                                options={includeWord.length > 0 ? includeWord : false}
                                optionRender={(option) => (
                                    <div className='tw-flex tw-flex-row tw-justify-between'>
                                        {/* <CloseCircleOutlined className='tw-text-2xl tw-text-red-500' onClick={() => deleteWord(option.value, setIncludeWord)} /> */}
                                        <p className='tw-font-bold'>{option.label}</p>
                                    </div>
                                )}
                                dropdownRender={(menu) => (
                                    <div className='tw-flex tw-flex-col'>
                                        {menu}
                                        <div className='tw-flex tw-flex-row tw-border-2 tw-border-black tw-rounded-md tw-p-1'>
                                            <Input
                                                placeholder="เพิ่มคำใหม่"
                                                onKeyDown={(e) => e.stopPropagation()}
                                                addonAfter={<Tooltip title={"กดเพื่อเพิ่ม(จำเป็นต้องกรอก)"}>
                                                    <Button
                                                        icon={<PlusOutlined />}
                                                        className='tw-bg-green-500 tw-text-white tw-border-white hover:tw-bg-white hover:tw-text-green-500 hover:tw-border-green-500'
                                                        onClick={() => addWord(inputValue, setIncludeWord)}
                                                    >
                                                        เพิ่มกลุ่ม
                                                    </Button>
                                                </Tooltip>}
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                )}
                            />
                        </div>
                        <div className='tw-flex tw-flex-col tw-justify-center tw-w-full'>
                            <p className="tw-text-lg">ไม่มีคำเหล่านี้:</p>
                            <Select
                                mode="multiple"
                                allowClear
                                className='tw-w-full'
                                placeholder="Please select"
                                onFocus={() => setInputValue(null)}
                                onDeselect={(value) => deleteWord(value, setExcludeWord)}
                                options={excludeWord.length > 0 ? excludeWord : false}
                                optionRender={(option) => (
                                    <div className='tw-flex tw-flex-row tw-justify-between'>

                                        {/* <CloseCircleOutlined className='tw-text-2xl tw-text-red-500' onClick={() => deleteWord(option.value, setExcludeWord)} /> */}

                                        <p className='tw-font-bold'>{option.label}</p>
                                    </div>
                                )}
                                dropdownRender={(menu) => (
                                    <div className='tw-flex tw-flex-col'>
                                        {menu}
                                        <div className='tw-flex tw-flex-row tw-border-2 tw-border-black tw-rounded-md tw-p-1'>
                                            <Input
                                                placeholder="เพิ่มคำใหม่"
                                                onKeyDown={(e) => e.stopPropagation()}
                                                addonAfter={<Tooltip title={"กดเพื่อเพิ่ม(จำเป็นต้องกรอก)"}>
                                                    <Button
                                                        icon={<PlusOutlined />}
                                                        className='tw-bg-green-500 tw-text-white tw-border-white hover:tw-bg-white hover:tw-text-green-500 hover:tw-border-green-500'
                                                        onClick={() => addWord(inputValue, setExcludeWord)}
                                                    >
                                                        เพิ่มกลุ่ม
                                                    </Button>
                                                </Tooltip>}
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                )}
                            />
                        </div>
                        <div className='tw-flex tw-flex-row tw-justify-center tw-w-full tw-gap-6'>
                            <div className='tw-flex tw-flex-col tw-justify-center tw-w-full'>
                                <p className="tw-text-lg">จำนวนการมีส่วนร่วม:</p>
                                <div className='tw-flex tw-flex-row tw-w-full tw-gap-4'>
                                    <InputNumber
                                        type="number"
                                        // onChange={onTextChange}
                                        className='tw-border-2 tw-rounded-lg tw-border-sky-400 tw-drop-shadow-md hover:tw-border-sky-700 tw-w-full'
                                    />
                                    <MinusOutlined className="tw-text-lg" />
                                    <InputNumber
                                        type="number"
                                        // onChange={onTextChange}
                                        className='tw-border-2 tw-rounded-lg tw-border-sky-400 tw-drop-shadow-md hover:tw-border-sky-700 tw-w-full'
                                    />
                                </div>
                            </div>
                            <div className='tw-flex tw-flex-col tw-justify-center tw-w-full'>
                                <p className="tw-text-lg">Facebook ID:</p>
                                <Input
                                    addonBefore={<SearchOutlined />}
                                    // placeholder="พิมพ์สิ่งที่ต้องการค้นหา"
                                    // onChange={onTextChange}
                                    className='tw-border-2 tw-rounded-lg tw-border-sky-400 tw-drop-shadow-md hover:tw-border-sky-700 tw-w-full'
                                />
                            </div>
                        </div>
                    </div>
                )}

                <div className={classNames("tw-flex tw-flex-row tw-w-full", {
                })}>
                    <Switch
                        className={classNames("", {
                            "tw-bg-blue-500": advancedSearch,
                            "tw-bg-slate-500": !advancedSearch,
                        })}
                        defaultChecked={false}
                        onChange={() => setAdvancedSearch(!advancedSearch)}
                    />
                    <p className="tw-text-lg">เปิดใช้การค้นหาขั้นสูง</p>
                </div>
            </div>
            <div className={classNames("tw-rounded-md", {
                "tw-overflow-auto": isTabletOrMobile && isPortrait,
            })}>
                <DataTable
                    data={postMock}
                    columns={columns}
                    setPageSize={pageSize}
                    onRowsSelected={setSelectedRows}
                    useRowSelection={true}
                    keyName={"id"}
                />
            </div>
            <div className=" tw-flex tw-flex-row tw-my-6 tw-gap-4">
                {pageSize < 20 && (
                    <Tooltip title="แสดงเพิ่มเติม">
                        <Button className="tw-border-black tw-border-2 tw-bg-green-400 tw-drop-shadow-md hover:tw-bg-white hover:tw-border-green-600 hover:tw-text-green-600"
                            onClick={() => setPageSize(20)}
                            icon={<ColumnHeightOutlined />}
                        >
                            show more

                        </Button>
                    </Tooltip>
                )}
                {pageSize >= 20 && (
                    <Tooltip title="แสดงน้อยลง">
                        <Button className="tw-border-black tw-border-2 tw-bg-yellow-400 tw-drop-shadow-md hover:tw-bg-white hover:tw-border-yellow-600 hover:tw-text-yellow-600"
                            onClick={() => setPageSize(5)}
                            icon={<VerticalAlignMiddleOutlined />}
                        >
                            show less
                        </Button>
                    </Tooltip>
                )}
                {selectedRows.length > 0 && (
                    <Tooltip title="สร้างรายงาน">
                        <Button className="tw-border-black tw-border-2 tw-bg-sky-400 tw-drop-shadow-md hover:tw-bg-white hover:tw-border-sky-600 hover:tw-text-sky-600"
                            onClick={() => genReport(selectedRows)}
                            icon={<FileTextOutlined />}
                        >
                            สร้างรายงาน
                        </Button>
                    </Tooltip>
                )}
            </div>
        </div>
    );
};

export default PostTable;