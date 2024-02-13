import { useState, useEffect } from "react";
import { useResponsive } from "../../hooks";
import { DatePicker, ConfigProvider } from "antd"
import classNames from "classnames"
import PropTypes from "prop-types";
import RPALogAPI from "../../service/RPALogAPI";
import dayjs from "dayjs";
import { useSelector } from 'react-redux'
import { getLogin } from '../../libs/loginSlice'
import { Loading } from "../../utilities";

const DataLog = props => {

    ///////////////////////////////////////////props declaration///////////////////////////////////////////////////////////////
    const dataType = props.dataType;
    //////////////////////////////////////////////////////////////////////////////////////////////////////////


    const [startDate, setStartDate] = useState(dayjs().format('YYYY-MM-DD HH:mm:ss'));
    const [endDate, setEndDate] = useState(dayjs().format('YYYY-MM-DD HH:mm:ss'));
    const [displayData, setDisplayData] = useState([]);
    const [logData, setLogData] = useState({});
    const [showLoading, setShowLoading] = useState(false);

    const token = useSelector((state) => getLogin(state).token);

    const { isMobile, isPortrait, isLandscape } = useResponsive();

    const addStartTime = (value) => {
        const times = dayjs(value).format('YYYY-MM-DD HH:mm:ss');
        console.log(times);
        setStartDate(times)
    };

    const addEndTime = (value) => {
        const times = dayjs(value).format('YYYY-MM-DD HH:mm:ss');
        console.log(times);
        setEndDate(times)
    };

    const fetchLog = async () => {

        if (dataType === "error") {
            try {
                setShowLoading(true);
                await RPALogAPI.fbErrlog(token, startDate, endDate).then((response) => setDisplayData(response))
            } catch (error) {
                console.error('Error fetching bot config:', error);
            } finally {
                fetch()
                setShowLoading(false);
            }
        }
        else if (dataType === "active") {
            try {
                setShowLoading(true);
                await RPALogAPI.fbInfolog(token, startDate, endDate).then((response) => setDisplayData(response))
            } catch (error) {
                console.error('Error fetching bot config:', error);
            } finally {
                fetch()
                setShowLoading(false);
            }
        }

    }

    useEffect(() => {
        fetchLog();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate, endDate])

    useEffect(() => {
        console.log(displayData);
    }, [displayData])

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorTextLightSolid: "rgba(0, 0, 0, 0.88)"
                },
            }}
        >
            <div className={classNames("tw-flex tw-flex-row tw-w-full tw-h-full tw-overflow-auto tw-gap-4", {
                "tw-flex-col": isMobile && isPortrait,
            })}>
                <Loading isShown={showLoading} />
                <div className={classNames("tw-flex tw-flex-col tw-gap-8 ", {
                    "tw-min-h-screen tw-h-screen": isMobile && isLandscape,
                    "tw-h-full tw-w-1/2": !isMobile,
                    "tw-w-full": isMobile && isPortrait,
                })}>
                    <div className={classNames("tw-flex tw-flex-col tw-w-full tw-h-fit tw-p-4 tw-border-4 tw-border-blue-800 tw-shadow-xl tw-rounded-lg", {})}>
                        <p className="tw-text-xl tw-font-bold tw-text-center">Time Filter</p>
                        <div className={classNames("tw-flex tw-flex-row tw-w-full tw-h-full tw-gap-2", {})}>
                            <div className={classNames("tw-flex tw-flex-col tw-w-full tw-h-full", {})}>
                                <p>จาก:</p>
                                <DatePicker showTime onChange={addStartTime} placement={"bottomLeft"} />
                            </div>
                            <div className={classNames("tw-flex tw-flex-col tw-w-full tw-h-full", {})}>
                                <p>ถึง:</p>
                                <DatePicker showTime onChange={addEndTime} placement={"bottomLeft"} />
                            </div>
                        </div>
                    </div>
                    <div className={classNames("tw-flex tw-flex-col tw-w-full tw-h-full tw-p-4 tw-gap-2 tw-border-4 tw-border-blue-800 tw-shadow-xl tw-rounded-lg", {
                    })}>
                        <p className="tw-text-xl tw-font-bold tw-text-center">{dataType === "error" ? "Error Log" : "Active Log"}</p>
                        <div className={classNames("tw-flex tw-flex-col tw-overflow-y-auto tw-w-full tw-h-full tw-p-1 tw-border-2 tw-border-[#d9d9d9] tw-shadow-xl tw-rounded-lg tw-bg-[#d9d9d9]", {})}>
                            {displayData.map((data) =>
                                // {displayData.map((data) =>
                                <div className="tw-flex tw-flex-col tw-w-full tw-h-fit tw-items-center tw-align-middle tw-border-2 tw-border-blue-800 tw-shadow-xl tw-my-1 tw-bg-white hover:tw-bg-blue-400"
                                    key={data.tstamp}
                                    onClick={() => setLogData(data)}
                                >
                                    <p className="tw-w-fit tw-h-full tw-text-xl tw-font-bold">{data.tstamp}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className={classNames("tw-flex tw-flex-col tw-min-h-full tw-p-4 tw-gap-2 tw-border-4 tw-border-blue-800 tw-shadow-xl tw-rounded-lg", {
                    "tw-min-h-fit tw-h-screen tw-w-1/2": isMobile && isLandscape,
                    "tw-w-full": isMobile && !isLandscape,
                    "tw-w-1/2": !isMobile,
                })}>
                    <p className="tw-text-xl tw-font-bold tw-text-center">Detail</p>
                    <div className={classNames("tw-flex tw-flex-col tw-w-full tw-h-full tw-overflow-y-auto tw-border-2 tw-border-[#d9d9d9] tw-shadow-xl tw-rounded-lg tw-bg-[#d9d9d9] tw-gap-8 tw-p-4", {})}>
                        <div className={classNames("tw-flex tw-flex-col tw-w-fit tw-h-fit", {})}>
                            <div className={classNames("tw-flex tw-flex-row tw-w-fit tw-h-fit tw-gap-2", {})}>
                                <p className="tw-text-lg tw-font-bold">BotName:</p>
                                {/* <p className="tw-text-lg ">xxxxxxxxxxxxxxxxxxxxx</p> */}
                                <p className="tw-text-lg ">{logData?.botname}</p>
                            </div>
                            <div className={classNames("tw-flex tw-flex-row tw-w-fit tw-h-fit tw-gap-2", {})}>
                                <p className="tw-text-lg tw-font-bold">Status:</p>
                                <p className="tw-text-lg ">{logData?.log_level}</p>
                            </div>
                        </div>
                        <div className="tw-w-full tw-overflow-auto">
                            <p className="tw-w-fit tw-h-fit">
                                {logData?.activity}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ConfigProvider>
    )
}

DataLog.propTypes = {
    dataType: PropTypes.string,
};

export default DataLog