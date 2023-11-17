import { SearchBar, VerticalBarChart, HorizontalBarChart, PieChart } from "../utilities";
import { newSentiment, sentimentAll, sentimentPos, socialPlatform } from "../mock";
import profile from "../assets/profile.png";
import carouselPic from "../assets/carouselPic.jpg";
import { useState } from "react";

import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore)
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import classNames from "classnames";
dayjs.extend(isSameOrAfter)
import { useResponsive } from "../hooks";

const Dashboard = () => {

    const [searchTag, setSearchTag] = useState([]);
    const [searchDate, setSearchDate] = useState([]);

    const { isTabletOrMobile, isPortrait } = useResponsive();

    const colorSet = (data) => {
        if (data == "positive") {
            return "#22c55e";
        }
        else if (data == "negative") {
            return "#ef4444";
        }
        else {
            return "#0284c7";
        }
    };


    return (
        <div className={classNames('tw-flex tw-flex-col tw-max-w-full tw-max-h-full tw-overflow-auto', {})}>
            <p className="tw-self-center tw-font-bold tw-text-xl tw-my-4">DashBoard</p>
            <div className={classNames("tw-flex tw-flex-row  tw-max-w-full tw-bg-white tw-justify-center tw-gap-2 tw-border-stone-400 tw-border-4 tw-rounded-lg tw-p-4", {
                "tw-flex-col": isTabletOrMobile && isPortrait,
                "tw-sticky tw-top-0 tw-z-60": !isTabletOrMobile,
            })}>
                <div className={classNames("tw-w-full", {})}>
                    <p className="tw-text-lg">ประเด็น:</p>
                    <SearchBar
                        useTagSearch={true}
                        data={newSentiment}
                        onChangeFilter={setSearchTag}
                        keyName={"tag"}
                    />
                </div>
                <div className={classNames("tw-w-full", {})}>
                    <p className="tw-text-lg">ห้วงเวลา:</p>
                    <SearchBar
                        useDateSearch={true}
                        onChangeDate={setSearchDate}
                    />
                </div>
            </div>

            <div className={classNames("tw-flex tw-flex-col tw-justify-center tw-my-4 ", {})}>
                <div className={classNames("tw-flex tw-flex-row tw-justify-around tw-my-2", {
                    "tw-flex-col": isTabletOrMobile
                })}>
                    <div className={classNames("tw-flex tw-flex-col tw-gap-4", {})}>
                        <div className="tw-text-center tw-gap-y-6 tw-border-stone-400 tw-border-4 tw-rounded-lg tw-p-4">
                            <p className="tw-text-lg">จำนวนโพสต์</p>
                            <p className="tw-text-xl tw-font-bold tw-text-blue-400">xxxxxx{ }</p>
                        </div>
                        <div className="tw-text-center tw-gap-y-6 tw-border-stone-400 tw-border-4 tw-rounded-lg tw-p-4">
                            <p className="tw-text-lg">การมีส่วนร่วมทั้งหมด</p>
                            <p className="tw-text-xl tw-font-bold tw-text-blue-400">xxxxxx{ }</p>
                        </div>
                        <div className="tw-flex tw-flex-col tw-overflow-auto tw-justify-center tw-text-center tw-gap-y-6 tw-border-stone-400 tw-border-4 tw-rounded-lg tw-p-4">
                            <p className="tw-text-center tw-text-lg">จำนวนโพสต์รายวัน</p>
                            <div className="tw-flex tw-w-max tw-h-max tw-justify-center">
                                <VerticalBarChart
                                    className={"tw-flex tw-w-max tw-h-max "}
                                    data={sentimentPos}
                                    width={640}
                                    height={isTabletOrMobile ? 280 : 310}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={classNames("tw-flex tw-flex-col tw-gap-4", {})}>
                        <div className="tw-text-center tw-gap-y-6 tw-border-stone-400 tw-border-4 tw-rounded-lg tw-p-4">
                            <p className="tw-text-lg">จำนวนผู้ใช้งาน</p>
                            <p className="tw-text-xl tw-font-bold tw-text-blue-400">xxxxxx{ }</p>
                        </div>
                        <div className="tw-text-center tw-gap-y-6 tw-border-stone-400 tw-border-4 tw-rounded-lg tw-p-4">
                            <p className="tw-text-lg">การมีส่วนร่วมเฉลี่ย/โพสต์</p>
                            <p className="tw-text-xl tw-font-bold tw-text-blue-400">xxxxxx{ }</p>
                        </div>
                        <div className="tw-text-center tw-flex tw-flex-col tw-justify-center tw-gap-y-6 tw-border-stone-400 tw-border-4 tw-rounded-lg tw-p-4">
                            <p className="tw-text-center tw-text-lg">ความรู้สึกเชิงบวก-ลบ</p>
                            <div className=" tw-flex tw-flex-row tw-justify-center tw-gap-3">
                                <div className=" tw-flex tw-flex-row tw-gap-1 ">
                                    <div className="tw-w-6 tw-h-6 tw-border-2 tw-border-black tw-rounded-full tw-bg-green-500">
                                    </div>
                                    <p>เชิงบวก</p>
                                </div>
                                <div className="tw-flex tw-flex-row tw-gap-1">
                                    <div className="tw-w-6 tw-h-6 tw-border-2 tw-border-black tw-rounded-full tw-bg-sky-600">
                                    </div>
                                    <p>เป็นกลาง</p>
                                </div>
                                <div className="tw-flex tw-flex-row tw-gap-1">
                                    <div className="tw-w-6 tw-h-6 tw-border-2 tw-border-black tw-rounded-full tw-bg-red-500">
                                    </div>
                                    <p>เชิงลบ</p>
                                </div>
                            </div>
                            <div className={classNames("tw-justify-center", {
                                "tw-flex tw-justify-center": isTabletOrMobile,
                            })}>
                                <PieChart
                                    data={sentimentAll}
                                    keyName={"value"}
                                    displayText={"name"}
                                    width={isTabletOrMobile ? 240 : 240}
                                    height={isTabletOrMobile ? 240 : 260}
                                    innerRadius={isTabletOrMobile ? 30 : 60}
                                    outerRadius={isTabletOrMobile ? 120 : 120}
                                    calColor={colorSet}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={classNames("tw-flex tw-flex-col tw-gap-4", {})}>
                        <div className="tw-flex tw-flex-col  tw-gap-y-6 tw-border-stone-400 tw-border-4 tw-rounded-lg tw-p-4">
                            <p className="tw-text-center tw-text-lg">ช่องทางสื่อออนไลน์</p>
                            <div className="tw-flex tw-justify-center">
                                <HorizontalBarChart
                                    className={"tw-flex tw-h-fit tw-w-fit tw-max-w-fit tw-max-h-fit"}
                                    data={socialPlatform}
                                    width={640}
                                    barHeight={isTabletOrMobile ? 70 : 35}
                                    keyNameX={"usage"}
                                    keyNameY={"platform"}
                                    keyNameColor={"positive"}
                                    calColor={colorSet}
                                />
                            </div>
                        </div>
                        <div className="tw-flex tw-flex-col tw-text-center tw-gap-y-6 tw-border-stone-400 tw-border-4 tw-rounded-lg tw-p-4">
                            <p className="tw-text-lg">แฮชเเท็กที่ถูกใช้งานมากที่สุด</p>
                            <p className="tw-text-xl tw-font-bold tw-text-blue-400">xxxxxx{ }</p>
                            <p className="tw-text-xl tw-font-bold tw-text-blue-400">xxxxxx{ }</p>
                            <p className="tw-text-xl tw-font-bold tw-text-blue-400">xxxxxx{ }</p>
                        </div>
                    </div>
                </div>
                <div className={classNames("tw-flex tw-flex-row tw-justify-around tw-gap-4 tw-my-2", {
                    "tw-flex-col": isTabletOrMobile,
                })}>
                    <div className={classNames("tw-flex tw-flex-col tw-h-full tw-text-center tw-gap-y-6 tw-border-stone-400 tw-border-4 tw-rounded-lg tw-p-4", {
                        "tw-w-full": isTabletOrMobile,
                        "tw-w-1/2": !isTabletOrMobile,
                    })}>
                        <p className="tw-text-lg">กลุ่มคำ</p>
                        <div className="tw-h-full">
                            <img className="tw-object-cover tw-h-full tw-w-full" src={carouselPic} />
                        </div>
                    </div>
                    <div className={classNames("tw-flex tw-flex-col tw-h-full tw-object-contain tw-gap-y-6 tw-border-stone-400 tw-border-4 tw-rounded-lg tw-p-4", {
                        "tw-w-full": isTabletOrMobile,
                        "tw-w-1/2": !isTabletOrMobile,
                    })}>
                        <p className="tw-text-lg tw-text-center">โพสต์ที่มีส่วนร่วมสูงสด</p>
                        <div>
                            <div className="tw-flex tw-flex-row tw-gap-2">
                                <div className="tw-w-max tw-h-max tw-border-2 tw-border-black tw-rounded-full">
                                    <img className="tw-rounded-full tw-h-12 tw-w-12" src={profile} />
                                </div>
                                <div className="tw-flex tw-flex-col">
                                    <p>ชื่อผู้โพสต์</p>
                                    <p>dd.mm.yy</p>
                                </div>
                            </div>
                            <div className="">
                                <p>
                                    Lorem ipsum dolor sit amet,
                                    consectetur adipiscing elit.
                                    Vivamus odio quam,
                                    convallis et pretium consectetur,
                                    vestibulum nec tellus.
                                    Nulla fringilla sem eu lacinia mollis.
                                    Fusce a molestie enim.
                                    Duis pellentesque turpis scelerisque efficitur condimentum.
                                    Sed pellentesque odio efficitur interdum scelerisque.
                                    Nulla euismod erat porta neque mattis lobortis.
                                    Praesent consequat mi at pharetra venenatis.
                                    Donec leo sapien, blandit porttitor justo nec,
                                    sagittis sagittis diam. Nunc elementum neque quis laoreet maximus.
                                    Donec dignissim lectus tortor,
                                    condimentum egestas lorem volutpat et. Nulla leo orci,
                                    euismod et rutrum ut, aliquam non tellus. Proin lectus nulla,
                                    finibus eu tortor in, maximus euismod ligula.
                                </p>
                                <div>
                                    <img src={carouselPic} />
                                </div>
                            </div>
                            <div className="tw-flex tw-flex-row tw-min-w-full tw-justify-between">
                                <p className="tw-flex tw-self-start tw-w-max">150{ } like</p>
                                <div className="tw-flex tw-flex-row tw-gap-2 tw-w-max tw-self-end">
                                    <p>2.1k { } comments</p>
                                    <p>8.5k { } shares</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;