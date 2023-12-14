import { DatePicker, ConfigProvider } from "antd"
import classNames from "classnames"
import PropTypes from "prop-types";
import { useResponsive } from "../hooks";

const DataLog = props => {

    const dataType = props.dataType;

    console.log(dataType);

    const { isMobile, isPortrait } = useResponsive();

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
                <div className={classNames("tw-flex tw-flex-col tw-w-full tw-h-full tw-p-4 tw-gap-8 ", {})}>
                    <div className={classNames("tw-flex tw-flex-col tw-w-full tw-h-fit tw-p-4 tw-border-4 tw-border-black tw-rounded-lg", {})}>
                        <p className="tw-text-xl tw-font-bold tw-text-center">Time Filter</p>
                        <div className={classNames("tw-flex tw-flex-row tw-w-full tw-h-full tw-gap-2", {})}>
                            <div className={classNames("tw-flex tw-flex-col tw-w-full tw-h-full", {})}>
                                <p>จาก:</p>
                                <DatePicker showTime placement={"bottomLeft"} />
                            </div>
                            <div className={classNames("tw-flex tw-flex-col tw-w-full tw-h-full", {})}>
                                <p>ถึง:</p>
                                <DatePicker showTime placement={"bottomLeft"} />
                            </div>
                        </div>
                    </div>
                    <div className={classNames("tw-flex tw-flex-col tw-w-full tw-h-full tw-p-4 tw-gap-2 tw-border-4 tw-border-black tw-rounded-lg", {})}>
                        <p className="tw-text-xl tw-font-bold tw-text-center">{dataType === "error" ? "Error Log" : "Active Log"}</p>
                        <div className={classNames("tw-flex tw-flex-col tw-w-full tw-h-full tw-border-4 tw-border-black tw-rounded-lg", {})}>
                        </div>
                    </div>
                </div>
                <div className={classNames("tw-flex tw-flex-col tw-w-full tw-h-full tw-p-4 tw-gap-2", {})}>
                    <p className="tw-text-xl tw-font-bold tw-text-center">Detail</p>
                    <div className={classNames("tw-flex tw-flex-col tw-w-full tw-h-full tw-overflow-y-auto tw-border-4 tw-border-black tw-rounded-lg tw-gap-8 tw-p-4", {})}>
                        <div className={classNames("tw-flex tw-flex-col tw-w-fit tw-h-fit", {})}>
                            <div className={classNames("tw-flex tw-flex-row tw-w-fit tw-h-fit", {})}>
                                <p>Task:</p>
                                <p>xxxxxxxxxxxxxxxxxxxxx</p>
                            </div>
                            <div className={classNames("tw-flex tw-flex-row tw-w-fit tw-h-fit", {})}>
                                <p>Error:</p>
                                <p>xxxxxxxxxxxxxxxxxxxxx</p>
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