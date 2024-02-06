import { useState, useEffect } from "react";
import { useResponsive } from "../../hooks";
import { newSentiment } from "../../mock";
import { DatePicker, ConfigProvider } from "antd"
import classNames from "classnames"
import PropTypes from "prop-types";
import RPALogAPI from "../../service/RPALogAPI";
import dayjs from "dayjs";
import { useSelector } from 'react-redux'
import { getLogin } from '../../libs/loginSlice'


const DataLog = props => {

    ///////////////////////////////////////////props declaration///////////////////////////////////////////////////////////////
    const dataType = props.dataType;
    //////////////////////////////////////////////////////////////////////////////////////////////////////////


    const [startDate, setStartDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState(dayjs().format('YYYY-MM-DD'));
    const [displayData, setDisplayData] = useState([]);

    const token = useSelector((state) => getLogin(state).token);

    const { isMobile, isPortrait, isLandscape } = useResponsive();

    const addStartTime = (value) => {
        const times = dayjs(value).format('YYYY-MM-DD');
        console.log(times);
        setStartDate(times)
    };

    const addEndTime = (value) => {
        const times = dayjs(value).format('YYYY-MM-DD');
        console.log(times);
        setEndDate(times)
    };

    const fetchLog = async () => {

        if (dataType === "error") {
            await RPALogAPI.fbErrlog(token, startDate, endDate).then((response) => setDisplayData(response))
        }
        else if (dataType === "active") {
            await RPALogAPI.fbInfolog(token, startDate, endDate).then((response) => setDisplayData(response))
        }

    }

    useEffect(() => {
        fetchLog();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate, endDate])


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
                <div className={classNames("tw-flex tw-flex-col tw-w-full tw-h-full tw-gap-8 ", {})}>
                    <div className={classNames("tw-flex tw-flex-col tw-w-full tw-h-fit tw-p-4 tw-border-4 tw-border-blue-800 tw-shadow-xl tw-rounded-lg", {})}>
                        <p className="tw-text-xl tw-font-bold tw-text-center">Time Filter</p>
                        <div className={classNames("tw-flex tw-flex-row tw-w-full tw-h-full tw-gap-2", {})}>
                            <div className={classNames("tw-flex tw-flex-col tw-w-full tw-h-full", {})}>
                                <p>จาก:</p>
                                <DatePicker onChange={addStartTime} placement={"bottomLeft"} />
                            </div>
                            <div className={classNames("tw-flex tw-flex-col tw-w-full tw-h-full", {})}>
                                <p>ถึง:</p>
                                <DatePicker onChange={addEndTime} placement={"bottomLeft"} />
                            </div>
                        </div>
                    </div>
                    <div className={classNames("tw-flex tw-flex-col tw-w-full tw-h-full tw-p-4 tw-gap-2 tw-border-4 tw-border-blue-800 tw-shadow-xl tw-rounded-lg", {})}>
                        <p className="tw-text-xl tw-font-bold tw-text-center">{dataType === "error" ? "Error Log" : "Active Log"}</p>
                        <div className={classNames("tw-flex tw-flex-col tw-overflow-y-auto tw-w-full tw-h-full tw-p-1 tw-border-2 tw-border-[#d9d9d9] tw-shadow-xl tw-rounded-lg tw-bg-[#d9d9d9]", {})}>
                            {newSentiment.map((data) =>
                                // {displayData.map((data) =>
                                <div className="tw-flex tw-flex-col tw-w-full tw-h-full tw-items-center tw-align-middle tw-border-2 tw-border-blue-800 tw-shadow-xl tw-my-1 tw-bg-white hover:tw-bg-blue-400" key={data.id}>
                                    <p className="tw-w-fit tw-h-full tw-text-xl tw-font-bold">{data.timestamp}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className={classNames("tw-flex tw-flex-col tw-w-full tw-min-h-full tw-p-4 tw-gap-2 tw-border-4 tw-border-blue-800 tw-shadow-xl tw-rounded-lg", {
                    "tw-min-h-screen tw-h-screen": isMobile && isLandscape,
                })}>
                    <p className="tw-text-xl tw-font-bold tw-text-center">Detail</p>
                    <div className={classNames("tw-flex tw-flex-col tw-w-full tw-h-full tw-overflow-y-auto tw-border-2 tw-border-[#d9d9d9] tw-shadow-xl tw-rounded-lg tw-bg-[#d9d9d9] tw-gap-8 tw-p-4", {})}>
                        <div className={classNames("tw-flex tw-flex-col tw-w-fit tw-h-fit", {})}>
                            <div className={classNames("tw-flex tw-flex-row tw-w-fit tw-h-fit tw-gap-2", {})}>
                                <p className="tw-text-lg tw-font-bold">Task:</p>
                                <p className="tw-text-lg ">xxxxxxxxxxxxxxxxxxxxx</p>
                            </div>
                            <div className={classNames("tw-flex tw-flex-row tw-w-fit tw-h-fit tw-gap-2", {})}>
                                <p className="tw-text-lg tw-font-bold">Error:</p>
                                <p className="tw-text-lg ">xxxxxxxxxxxxxxxxxxxxx</p>
                            </div>
                        </div>
                        <p>
                            Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit.
                            Praesent vitae urna libero.
                            Sed placerat tempus justo,
                            quis ultricies massa dictum at.
                            Nullam sed nisi pharetra mauris ultrices viverra vitae sit amet diam.
                            Morbi nec elit sit amet turpis dignissim fringilla at ac sapien.
                        </p>
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