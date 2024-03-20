import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable, SearchBar, Loading } from "../../utilities";
import { useResponsive } from "../../hooks";
import { Button, Input, Switch, Tooltip, InputNumber, Select, Cascader } from "antd";
import {
    ColumnHeightOutlined,
    VerticalAlignMiddleOutlined,
    FileTextOutlined,
    MinusOutlined,
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
    const [displayTag, setDisplayTag] = useState([]);
    const [searchTag, setSearchTag] = useState([]);
    const [searchDate, setSearchDate] = useState([]);
    const [searchPlatform, setSearchPlatform] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [advancedSearch, setAdvancedSearch] = useState(false);
    const [includeWord, setIncludeWord] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [excludeWord, setExcludeWord] = useState([]);
    const [engagement, setEngagement] = useState();
    const [displayFBid, setDisplayFBid] = useState([]);
    const [searchFBid, setSearchFBid] = useState([]);
    const [displayData, setDisplayData] = useState([]);
    const [showLoading, setShowLoading] = useState(false);
    const [pageIndex, setPageIndex] = useState({ current: 1, pageSize: 10 });

    const navigate = useNavigate();

    const token = useSelector((state) => getLogin(state).token);

    const { isTabletOrMobile, isPortrait } = useResponsive();

    const fetchTags = async () => {

        try {
            // setShowLoading(true);
            const data = await postReportAPI.getTags();
            setDisplayTag(data);
        } catch (error) {
            console.error('Error fetching bot config:', error);
        }
        // finally {
        //     setShowLoading(false);
        // }
    }

    const fetchFBid = async () => {

        try {
            // setShowLoading(true);
            const data = await postReportAPI.getFB();
            setDisplayFBid(data);
        } catch (error) {
            console.error('Error fetching bot config:', error);
        }
        // finally {
        //     setShowLoading(false);
        // }
    }

    const fetchPost = async () => {
        let searchPayLoad = {
            search: searchVal ? searchVal : null,
            platform: searchPlatform.length > 0 ? searchPlatform[0] : "facebook",
            topic: searchTag.length > 0 ? searchTag : null,
            date: searchDate.length > 0 ? [dayjs(searchDate[0]).format('YYYY-MM-DD'), dayjs(searchDate[1]).format('YYYY-MM-DD')] : null,
            include: includeWord.length > 0 ? includeWord.map((word) => word.value) : null,
            exclude: excludeWord.length > 0 ? excludeWord.map((word) => word.value) : null,
            engagement: engagement ? [engagement?.min, engagement?.max] : null,
            id: searchFBid.length > 0 ? searchFBid : null,
            limit: [pageIndex.pageSize, pageIndex.current]
        }
        try {
            setShowLoading(true);
            const data = await postReportAPI.getTagetPost(searchPayLoad);
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
    }, [pageIndex])

    useEffect(() => {
        fetchTags()
        fetchFBid()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const addWord = async (word, setData) => {

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
            title: 'ลำดับ',
            dataIndex: 'id',
            key: 'id',
            align: "center",
            width: 50,
            className: 'tw-truncate',
            render: (text, record, index) => (
                <p>
                    {index + 1}
                </p>
            ),
        },
        {
            title: 'วันที่',
            dataIndex: 'postime',
            key: 'postime',
            align: "center",
            width: 150,
            className: 'tw-text-lime-600',
        },
        {
            title: 'รายละเอียด',
            dataIndex: 'post',
            key: 'post',
            align: "center",
            width: 150,
            className: 'tw-truncate',
        },
        {
            title: 'HashTags',
            dataIndex: 'hashtags',
            key: 'hashtags',
            align: "center",
            width: 200,
            className: 'tw-text-violet-600',
            render: (text, record) => (
                <div className="tw-grid tw-grid-cols-2 tw-gap-1 tw-w-full tw-h-full tw-content-start">
                    {record?.hashtags.map((hashtags, i) => (
                        <Tooltip key={i} title={hashtags}>
                            <div
                                className="tw-rounded-md tw-p-2 tw-border-2 tw-border-black tw-w-full tw-text-center tw-text-white tw-bg-violet-600 tw-truncate"
                            >
                                {hashtags}
                            </div>
                        </Tooltip>
                    ))}
                </div>
            ),
        },
        {
            title: ' ผู้โพสต์',
            dataIndex: 'poster_name',
            key: 'poster_name',
            align: "center",
            width: 150,
            className: 'tw-text-amber-600',
        },
        {
            title: 'หมวดหมู่',
            dataIndex: 'class',
            key: 'class',
            align: "center",
            width: 100,
            className: 'tw-text-amber-600',
            render: (text, record) => (
                <div className="tw-flex tw-flex-row tw-gap-1 tw-justify-center">
                    {record?.class.map((bot_class, i) =>
                        <Tooltip title={bot_class} key={i}>
                            <div className={
                                classNames("tw-rounded-md tw-border-2 tw-border-black tw-w-max tw-text-center tw-text-white tw-p-2 tw-bg-blue-600", {
                                })} >
                                {bot_class}
                            </div>
                        </Tooltip>
                    )}
                </div>
            ),
        },
        {
            title: 'Link',
            dataIndex: 'post_url',
            key: 'post_url',
            align: "center",
            width: 50,
            className: 'tw-truncate tw-text-sky-700',
            render: (text, record) => (
                <div className="tw-flex tw-justify-center">
                    <Tooltip title="กดเพื่อไปที่โพสต์">
                        <a href={record?.post_url} target="blank">
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
        console.log(data.map(obj => obj._id));
        // navigate("/postlog/report", { state: data[0]?._id })
        navigate("/postlog/report", { state: data.map(obj => obj._id) })
    }

    const genReport = async () => {
        console.log(selectedRows);
        toReport(selectedRows);
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div className={classNames('tw-flex tw-flex-col tw-max-w-full tw-max-h-full tw-overflow-y-auto', {})}>
            <Loading isShown={showLoading} />
            <div className="tw-flex tw-flex-col tw-justify-center tw-w-full">
                <div className={classNames("tw-w-full", {})}>
                    <p className="tw-text-lg">ค้นหา:</p>
                    <SearchBar
                        useTextSearch={true}
                        data={displayData.data}
                        onChangeSearch={setSearchVal}
                    />
                </div>
                <div className='tw-flex tw-flex-row tw-justify-center tw-w-full tw-gap-6'>
                    <div className={classNames("tw-w-full", {})}>
                        <p className="tw-text-lg">แพลตฟอร์ม:</p>
                        <SearchBar
                            useTagSearch={true}
                            data={[{ platform: "facebook" }]}
                            onChangeFilter={setSearchPlatform}
                            keyName={"platform"}
                        />
                    </div>

                    {displayTag.length > 0 &&
                        <div className={classNames("tw-w-full", {})}>
                            <p className="tw-text-lg">Tag:</p>
                            <SearchBar
                                useTagSearch={true}
                                data={displayTag}
                                onChangeFilter={setSearchTag}
                                useOwnData={true}
                                ownKeyNameLabel={"name"}
                                ownKeyNameValue={"id"}
                            />
                        </div>
                    }

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
                            <Cascader
                                multiple
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
                            <Cascader
                                multiple
                                allowClear
                                className='tw-w-full'
                                placeholder="Please select"
                                onFocus={() => setInputValue(null)}
                                onDeselect={(value) => deleteWord(value, setExcludeWord)}
                                options={excludeWord.length > 0 ? excludeWord : false}
                                optionRender={(option) => (
                                    <div className='tw-flex tw-flex-row tw-justify-between'>
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
                                        onChange={(value) => setEngagement(prevState => ({
                                            ...prevState,
                                            min: value,
                                        }))}
                                        className='tw-border-2 tw-rounded-lg tw-border-sky-400 tw-drop-shadow-md hover:tw-border-sky-700 tw-w-full'
                                    />
                                    <MinusOutlined className="tw-text-lg" />
                                    <InputNumber
                                        type="number"
                                        onChange={(value) => setEngagement(prevState => ({
                                            ...prevState,
                                            max: value,
                                        }))}
                                        className='tw-border-2 tw-rounded-lg tw-border-sky-400 tw-drop-shadow-md hover:tw-border-sky-700 tw-w-full'
                                    />
                                </div>
                            </div>
                            <div className='tw-flex tw-flex-col tw-justify-center tw-w-full'>
                                <p className="tw-text-lg">ชื่อบัญชี:</p>
                                <Select
                                    mode="multiple"
                                    allowClear
                                    className='tw-w-full'
                                    placeholder="Please select"
                                    options={displayFBid.length > 0 ? displayFBid.map((profile) => ({
                                        label: profile.profile_title,
                                        value: profile.profile_url,
                                    })) : []}
                                    onChange={setSearchFBid}
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
                <div className="tw-w-full tw-h-fit tw-my-2">
                    <Button
                        className="tw-w-full tw-text-blue-600 tw-border-blue-600 tw-border-2 tw-bg-white tw-drop-shadow-md hover:tw-bg-blue-600 hover:tw-border-black hover:tw-text-white"
                        onClick={() => fetchPost()}
                    >
                        <p className="tw-text-lg">ค้นหา</p>
                    </Button>
                </div>
            </div>
            <div className={classNames("tw-rounded-md tw-h-fit", {
                "tw-overflow-auto": isTabletOrMobile && isPortrait,
            })}>
                <DataTable
                    data={displayData.data?.length > 0 ? displayData.data : []}
                    columns={columns}
                    setPageSize={pageSize}
                    onRowsSelected={setSelectedRows}
                    useRowSelection={true}
                    keyName={displayData.data?.length > 0 ? "_id" : ""}
                    totalPages={displayData.data?.length > 0 ? displayData.total : 0}
                    sendPages={setPageIndex}
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
                            onClick={() => setPageSize(10)}
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