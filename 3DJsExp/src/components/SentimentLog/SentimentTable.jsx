import { useState, useEffect } from "react";
import { DataTable, SearchBar, Loading } from "../../utilities";
import { newSentiment } from "../../mock";
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
import { useSelector } from 'react-redux'
import { getLogin } from '../../libs/loginSlice'

const SentimentTable = () => {

    const [searchTag, setSearchTag] = useState([]);
    const [searchBot, setSearchBot] = useState([]);
    const [searchDate, setSearchDate] = useState([]);
    const [pageSize, setPageSize] = useState(5);
    const [displayData, setDisplayData] = useState([]);
    const [showLoading, setShowLoading] = useState(false);

    const token = useSelector((state) => getLogin(state).token);

    const navigate = useNavigate();

    const fetchBotPost = async () => {
        try {
            setShowLoading(true);
            const data = await botPostReportAPI.getBotPost();
            setDisplayData(data);
        } catch (error) {
            console.error('Error fetching bot config:', error);
        } finally {
            setShowLoading(false);
        }
    }

    useEffect(() => {
        fetchBotPost()
    }, [])


    const { isTabletOrMobile, isPortrait } = useResponsive();

    /////////////////////////////////////////////table/////////////////////////////////////////////////////////////
    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            align: "center",
            width: 150,
            className: 'tw-truncate',
        },
        {
            title: 'tag',
            dataIndex: 'tag',
            key: 'tag',
            align: "center",
            width: 150,
            className: 'tw-text-violet-600',
            filteredValue: [searchTag],
            onFilter: (value, record) => (
                (value.split(",")).every(tag => String(record?.tag).includes(tag))
            ),
            render: (text, record) => (
                <div className="tw-flex tw-flex-row tw-gap-1 tw-justify-center">
                    {record?.tag.map(tag => (
                        <Tooltip key={tag} title={tag}>
                            <div className=" tw-w-max tw-rounded-md tw-p-2 tw-border-2 tw-border-black tw-text-center tw-text-white tw-bg-violet-600" >
                                {tag}
                            </div>
                        </Tooltip>
                    ))}
                </div>
            ),
        },
        {
            title: 'nickName',
            dataIndex: 'nickName',
            key: 'nickName',
            align: "center",
            width: 150,
            className: 'tw-truncate',
        },
        {
            title: 'URL',
            dataIndex: 'url',
            key: 'url',
            align: "center",
            width: 150,
            className: 'tw-truncate tw-text-sky-700',
        },
        {
            title: 'update',
            dataIndex: 'timestamp',
            key: 'timestamp',
            align: "center",
            width: 150,
            className: 'tw-text-lime-600',
            filteredValue: [searchDate],
            onFilter: (value, record) => {
                if (value != undefined && value != null && value != "" && value != 'undefined') {
                    let startDate = String(value?.split(",")[0])
                    let endDate = String(value?.split(",")[1])
                    let recordDate = dayjs(record?.timestamp).format('YYYY-MM-DD')
                    if (dayjs(recordDate).isSameOrBefore(endDate) && dayjs(recordDate).isSameOrAfter(startDate)) {
                        return record?.timestamp
                    }
                } else {
                    return record?.timestamp
                }
            },
        },
        {
            title: 'group',
            dataIndex: 'group',
            key: 'group',
            align: "center",
            width: 150,
            className: 'tw-text-amber-600',
            filteredValue: [searchBot],
            onFilter: (value, record) => (
                (value.split(",")).some(group => String(record?.group).includes(group))
            ),
            render: (text, record) => (
                <div className="tw-flex tw-flex-row tw-gap-1 tw-justify-center">
                    {record?.group.map(group => (
                        <Tooltip key={group} title={group}>
                            <div className="tw-rounded-md tw-border-2 tw-p-2 tw-border-black tw-w-max tw-text-center tw-text-white tw-bg-yellow-600" >
                                {group}
                            </div>
                        </Tooltip>
                    ))}
                </div>
            ),
        },
        {
            title: 'sentimentType',
            dataIndex: 'sentimentType',
            key: 'sentimentType',
            align: "center",
            width: 150,
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
            <p className="tw-self-center tw-font-bold tw-text-xl tw-my-4">BotTable</p>
            {/* {displayData.length > 0 && ( */}
            <div className={classNames("tw-flex tw-flex-row tw-max-w-full tw-justify-center tw-gap-2", {
                "tw-flex-col": isTabletOrMobile && isPortrait,
            })}>
                <div className={classNames("tw-w-full", {
                })}>
                    <p className="tw-text-lg">หัวข้อ:</p>
                    <SearchBar
                        useTagSearch={true}
                        data={newSentiment}
                        // data={displayData}
                        onChangeFilter={setSearchTag}
                        keyName={"tag"}
                    />
                </div>
                <div className={classNames("tw-w-full", {

                })}>
                    <p className="tw-text-lg">เวลา:</p>
                    <SearchBar
                        useDateSearch={true}
                        onChangeDate={setSearchDate}
                        keyName={"tag"}
                    />
                </div>
                <div className={classNames("tw-w-full", {

                })}>
                    <p className="tw-text-lg">Bot:</p>
                    <SearchBar
                        useTagSearch={true}
                        data={newSentiment}
                        // data={displayData}
                        onChangeFilter={setSearchBot}
                        keyName={"group"}
                    />
                </div>

            </div>
            {/* )} */}

            {/* {displayData.length > 0 && ( */}
            <div className={classNames("tw-border-2 tw-rounded-md", {})}>
                <DataTable
                    columns={columns}
                    data={newSentiment}
                    // data={displayData}
                    setPageSize={pageSize}
                    useRowClick={true}
                    onRowClick={(selectedRows) => toReport(selectedRows)}
                    keyName={"id"}
                />
            </div>
            {/* )} */}
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
                            onClick={() => setPageSize(5)}
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