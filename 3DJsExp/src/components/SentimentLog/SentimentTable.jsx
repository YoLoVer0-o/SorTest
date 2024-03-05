import { useState, useEffect } from "react";
import { DataTable, SearchBar, Loading } from "../../utilities";
import { useResponsive } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { Button, Tooltip } from "antd";
import { ColumnHeightOutlined, VerticalAlignMiddleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore)
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrAfter)
import classNames from "classnames";
import botPostReportAPI from "../../service/botPostReportAPI";
// import { useSelector } from 'react-redux'
// import { getLogin } from '../../libs/loginSlice'

const SentimentTable = () => {

    const [searchText, setSearchText] = useState("");
    // const [searchBot, setSearchBot] = useState([]);
    const [searchDate, setSearchDate] = useState([]);
    const [searchType, setSearchType] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [displayData, setDisplayData] = useState([]);
    const [showLoading, setShowLoading] = useState(false);
    const [pageIndex, setPageIndex] = useState({ current: 1, pageSize: 10 });

    // const token = useSelector((state) => getLogin(state).token);

    const navigate = useNavigate();

    const fetchBotPost = async () => {
        try {
            setShowLoading(true);
            const data = await botPostReportAPI.getBotPost(pageIndex.current,
                searchType?.length > 0 ? searchType[0] : "",
                searchDate?.length > 0 ? dayjs(searchDate[0]).format('YYYY-MM-DD') : "",
                searchDate?.length > 0 ? dayjs(searchDate[1]).format('YYYY-MM-DD') : "",
                searchText);
            setDisplayData(data);
        } catch (error) {
            console.error('Error fetching bot config:', error);
        } finally {
            setShowLoading(false);
        }
    }

    useEffect(() => {
        console.log(pageIndex);
        fetchBotPost()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, searchType, searchText, searchDate])


    const { isTabletOrMobile, isPortrait } = useResponsive();

    /////////////////////////////////////////////table/////////////////////////////////////////////////////////////
    const columns = [
        // {
        //     title: 'ลำดับ',
        //     dataIndex: 'id',
        //     key: 'id',
        //     align: "center",
        //     width: 50,
        //     className: 'tw-truncate',
        //     render: (text, record, index) => (
        //         <p>
        //             {index + 1}
        //         </p>
        //     ),
        // },
        {
            title: 'วันที่',
            dataIndex: 'timestamp',
            key: 'timestamp',
            align: "center",
            width: 100,
            className: 'tw-text-lime-600',

        },
        {
            title: 'รายละเอียด',
            dataIndex: 'message',
            key: 'message',
            align: "center",
            width: 150,
            className: 'tw-truncate',
        },
        {
            title: 'HashTag',
            dataIndex: 'tag',
            key: 'tag',
            align: "center",
            width: 250,
            className: 'tw-text-violet-600',

        },
        {
            title: 'ผู้โพสต์',
            dataIndex: 'nickName',
            key: 'nickName',
            align: "center",
            width: 100,
            className: 'tw-truncate',
        },
        {
            title: 'หมวดหมู่',
            dataIndex: 'group',
            key: 'group',
            align: "center",
            width: 100,
            className: 'tw-text-amber-600',
        },
        {
            title: 'ความรู้สึก',
            dataIndex: 'sentimentType',
            key: 'sentimentType',
            align: "center",
            width: 100,
            className: 'tw-text-violet-600',
            render: (text, record) => (
                <div className="tw-flex tw-flex-row tw-gap-1 tw-justify-center">
                    <Tooltip title={record?.sentimentType}>
                        <div className={
                            classNames("tw-rounded-md tw-border-2 tw-border-black tw-w-max tw-text-center tw-text-white tw-p-2", {
                                "tw-bg-green-600": record?.sentimentType == "positive",
                                "tw-bg-red-600": record?.sentimentType == "negative",
                                "tw-bg-sky-600": record?.sentimentType == "neutral",
                            })} >
                            {record?.sentimentType}
                        </div>
                    </Tooltip>
                </div>
            ),
        },
        {
            title: 'link',
            dataIndex: 'url',
            key: 'url',
            align: "center",
            width: 100,
            className: 'tw-truncate tw-text-sky-700',
            render: (text, record) => (
                <div className="tw-flex tw-justify-center">
                    <Tooltip title="กดเพื่อไปที่โพสต์">
                        <a href={record?.url}
                            target="blank"
                            onClick={(e) => {
                                e.stopPropagation();
                            }}>
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

    ///////////////////////////////////////////to report///////////////////////////////////////////////////////////////
    const toReport = async (data) => {
        navigate(`/sentiment/report/${data.id}`, { state: data.id })
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <div className={classNames('tw-flex tw-flex-col tw-max-w-full tw-max-h-full tw-overflow-auto', {})}>
            <Loading isShown={showLoading} />
            {displayData?.posts && (
                <div className={classNames("tw-flex tw-flex-row tw-max-w-full tw-justify-center tw-gap-2", {
                    "tw-flex-col": isTabletOrMobile && isPortrait,
                })}>
                    <div className={classNames("tw-w-full", {
                    })}>
                        <p className="tw-text-lg">หัวข้อ:</p>
                        <SearchBar
                            useTextSearch={true}
                            // data={postMock}
                            onChangeSearch={setSearchText}
                        />
                    </div>
                    <div className={classNames("tw-w-full", {

                    })}>
                        <p className="tw-text-lg">เวลา:</p>
                        <SearchBar
                            useDateSearch={true}
                            onChangeDate={setSearchDate}
                        />
                    </div>
                    {/* <div className={classNames("tw-w-full", {
                    })}>
                        <p className="tw-text-lg">Bot:</p>
                        <SearchBar
                            useTagSearch={true}
                            // data={newSentiment}
                            data={displayData.posts}
                            onChangeFilter={setSearchBot}
                            keyName={"group"}
                        />
                    </div> */}

                    <div className={classNames("tw-w-full", {
                    })}>
                        <p className="tw-text-lg">ประเภท:</p>
                        <SearchBar
                            useTagSearch={true}
                            // data={newSentiment}
                            data={[{ label: "โพสของฝ่ายเรา", type: 'true' }, { label: "โพสทั่วไป", type: 'false' }]}
                            onChangeFilter={setSearchType}
                            useOwnData={true}
                            ownKeyNameLabel={"label"}
                            ownKeyNameValue={"type"}
                        />
                    </div>

                </div>
            )}

            {displayData?.posts && (
                <div className={classNames("tw-border-2 tw-rounded-md", {})}>
                    <DataTable
                        columns={columns}
                        // data={newSentiment}
                        data={displayData.posts}
                        setPageSize={pageSize}
                        useRowClick={true}
                        onRowClick={(selectedRows) => toReport(selectedRows)}
                        keyName={"id"}
                        totalPages={displayData.total_data}
                        sendPages={setPageIndex}
                    />
                </div>
            )}
            <div className="tw-flex tw-flex-row tw-my-6 tw-gap-4">
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
            </div>
        </div>
    );
}

export default SentimentTable