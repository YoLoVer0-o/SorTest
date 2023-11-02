import { useRef } from "react";
import { HorizontalBarChart, PieChart, ToTopButton } from "../utilities";
import { FloatButton, Tooltip } from "antd";
import classNames from "classnames";
import { useResponsive } from "../hooks";
import { DataTable } from "../utilities";
import { MoreOutlined, FilePdfOutlined } from "@ant-design/icons";
import { sentimentAll, sentimentPos } from "../mock";

const SentimentReport = () => {

    const {
        isDesktopOrLaptop,
        isBigScreen,
        isTabletOrMobile,
        isTablet,
        isMobile,
        isPortrait,
        isRetina,
    } = useResponsive();

    const topRef = useRef(null);

    const columns = [
        {
            title: 'ลำดับ',
            dataIndex: 'id',
            key: 'id',
            align: "center",
            width: 150,
            className: 'tw-text-white tw-bg-[#303c6c]',
        },
        {
            title: 'วันที่',
            dataIndex: 'timestamp',
            key: 'timestamp',
            align: "center",
            width: 250,
            className: 'tw-text-white tw-bg-[#303c6c]',
        },
        {
            title: 'เนื้อหา',
            dataIndex: 'message',
            key: 'message',
            align: "center",
            width: 100,
            className: 'tw-text-white tw-text-sky-700 tw-bg-[#303c6c]',
        },
        {
            title: 'ผู้โพสต์',
            dataIndex: 'username',
            key: 'username',
            align: "center",
            width: 100,
            className: 'tw-text-white tw-bg-[#303c6c]',
        },
    ];

    return (
        <div className="tw-w-screen tw-h-full tw-p-2 tw-overflow-auto">

            <div
                ref={topRef}
                tabIndex={0}
                className={classNames("", {
                    "tw-overflow-auto": isTabletOrMobile && isPortrait,
                })} >
                <div className={classNames("tw-flex tw-flex-row tw-mb-4 tw-w-full tw-h-full", {
                    "tw-flex-col": isTabletOrMobile && isPortrait,
                })}>
                    <div className={classNames("tw-flex tw-flex-row tw-justify-around tw-w-full tw-border-stone-400 tw-border-4 tw-rounded-lg", {
                        "tw-grid tw-grid-cols-2 tw-gap-1": isTabletOrMobile && isPortrait,
                    })}>
                        <div>
                            Tag :
                            <div className={classNames("tw-flex	tw-items-center tw-border-2 tw-rounded-md tw-h-8 tw-border-solid tw-border-black", {
                                "tw-w-28": isMobile && isPortrait,
                                "tw-w-34": isTablet && isPortrait,
                                "tw-w-44": isDesktopOrLaptop || isBigScreen,
                            })}>
                                {" "}
                                TestTag
                            </div>
                        </div>
                        <div>
                            ชื่อเล่น :
                            <div className={classNames("tw-flex	tw-items-center tw-border-2 tw-rounded-md tw-h-8 tw-border-solid tw-border-black", {
                                "tw-w-28": isMobile && isPortrait,
                                "tw-w-34": isTablet && isPortrait,
                                "tw-w-44": isDesktopOrLaptop || isBigScreen,
                            })}>
                                {" "}
                                Test
                            </div>
                        </div>
                        <div>
                            วันที่โพสต์ :
                            <div className={classNames("tw-flex	tw-items-center tw-border-2 tw-rounded-md tw-h-8 tw-border-solid tw-border-black", {
                                "tw-w-28": isMobile && isPortrait,
                                "tw-w-34": isTablet && isPortrait,
                                "tw-w-44": isDesktopOrLaptop || isBigScreen,
                            })}>
                                {" "}
                                YYYY/MM/DD
                            </div>
                        </div>
                        <div>
                            Bot :
                            <div className={classNames("tw-flex	tw-items-center tw-border-2 tw-rounded-md tw-h-8 tw-border-solid tw-border-black", {
                                "tw-w-28": isMobile && isPortrait,
                                "tw-w-34": isTablet && isPortrait,
                                "tw-w-44": isDesktopOrLaptop || isBigScreen,
                            })}>
                                {" "}
                                group A
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tw-flex tw-flex-row">
                    <div className="tw-flex tw-flex-col tw-justify-center tw-gap-y-6 tw-border-stone-400 tw-border-4 tw-rounded-lg tw-p-4">
                        <p className="tw-text-center">ความรู้สึกเชิงบวก-ลบ</p>
                        <div className="tw-flex tw-flex-row tw-justify-center tw-gap-3">
                            <div className="tw-flex tw-flex-row tw-gap-1 ">
                                <div className="tw-w-6 tw-h-6 tw-border-2 tw-border-black tw-rounded-full">
                                </div>
                                <p>เชิงบวก</p>
                            </div>
                            <div className="tw-flex tw-flex-row tw-gap-1">
                                <div className="tw-w-6 tw-h-6 tw-border-2 tw-border-black tw-rounded-full">
                                </div>
                                <p>เป็นกลาง</p>
                            </div>
                            <div className="tw-flex tw-flex-row tw-gap-1">
                                <div className="tw-w-6 tw-h-6 tw-border-2 tw-border-black tw-rounded-full">
                                </div>
                                <p>เชิงลบ</p>
                            </div>
                        </div>
                        <div>
                            <PieChart
                                data={sentimentAll}
                                keyName={"value"}
                                displayText={"name"}
                                width={360}
                                height={360}
                                innerRadius={60}
                                outerRadius={180} />
                        </div>
                    </div>
                    <div className="tw-flex tw-flex-col">
                        <p>ข้อความเชิงบวกสูงสุด</p>
                        <div>
                            <HorizontalBarChart
                                className={"tw-flex tw-h-fit tw-w-fit tw-max-w-fit tw-max-h-fit"}
                                data={sentimentPos}
                                width={740}
                                keyNameX={"value"}
                                keyNameY={"name"}
                            />
                        </div>
                    </div>
                    <div></div>
                </div>

            </div>

            <div className={classNames("", {
                "tw-overflow-auto": isTabletOrMobile && isPortrait,
            })}>
                <DataTable
                    columns={columns}
                />
            </div>

            <Tooltip placement="left" title={"เพิ่มเติม"} color="blue">
                <FloatButton.Group
                    trigger="click"
                    type="primary"
                    className="tw-right-10"
                    icon={<MoreOutlined />}
                >
                    <Tooltip placement="left" title={"สร้างรายงานPDF"} color="blue">
                        <FloatButton
                            className="tw-flex tw-right-2 tw-bottom-32 tw-z-10"
                            icon={<FilePdfOutlined />}

                        />
                    </Tooltip>
                    <ToTopButton topRef={topRef} />
                </FloatButton.Group>
            </Tooltip>
        </div>

    )
}

export default SentimentReport