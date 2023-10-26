import { DataTable, SearchBar } from "../utilities";
import { postMock } from "../mock";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Tooltip } from "antd";
import {
    ColumnHeightOutlined,
    VerticalAlignMiddleOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore)
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import classNames from "classnames";
dayjs.extend(isSameOrAfter)
import { useResponsive } from "../hooks";

const BotTable = () => {
    const [searchTag, setSearchTag] = useState([]);
    const [searchBot, setSearchBot] = useState([]);
    const [searchDate, setSearchDate] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [pageSize, setPageSize] = useState(5);

    const navigate = useNavigate();

    const { isDesktopOrLaptop, isBigScreen, isTabletOrMobile, isPortrait, isLandscape } = useResponsive();

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
                            <div className="tw-rounded-md tw-border-2 tw-border-black tw-w-6 tw-text-center tw-text-white tw-bg-violet-600" >
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

    return (
        <div className={classNames('tw-flex tw-flex-col tw-max-w-full tw-max-h-full tw-overflow-auto', {})}>
            <p className="tw-self-center tw-font-bold tw-text-xl tw-my-4">BotTable</p>
            <div className={classNames("tw-flex tw-flex-row tw-max-w-full tw-justify-center tw-gap-2", {
                "tw-flex-col": isTabletOrMobile,
            })}>
                <div className={classNames("tw-w-full", {
                })}>
                    <p className="tw-text-lg">หัวข้อ:</p>
                    <SearchBar
                        useTagSearch={true}
                        data={postMock}
                        onChangeFilter={setSearchTag}
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
                <div className={classNames("tw-w-full", {

                })}>
                    <p className="tw-text-lg">Bot:</p>
                    <SearchBar
                        useTagSearch={true}
                        data={postMock}
                        onChangeFilter={setSearchBot}
                    />
                </div>
            </div>
            <div className={classNames("", {
                "tw-overflow-auto": isTabletOrMobile && isPortrait,
            })}>
                <DataTable
                    data={postMock}
                    columns={columns}
                    setPageSize={pageSize}
                    onRowsSelected={setSelectedRows}
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
            </div>
        </div>
    );
}

export default BotTable