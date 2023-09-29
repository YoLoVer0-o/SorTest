import { useState } from "react";
import logo from "../assets/logo.jpg";
import PropTypes from "prop-types";
import { FloatButton } from "antd";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useCollapse } from 'react-collapsed';

const ReportSideBar = props => {

    const focusSummarize = props.focusSummarize
    const handleClick = props.handleClick

    const [isExpanded, setExpanded] = useState(true);
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

    function handleOnClick() {
        setExpanded(!isExpanded);
    }

    return (
        <div className="tw-flex tw-flex-row tw-max-h-max tw-h-full tw-w-max">
            <div {...getCollapseProps()}>
                <div className="tw-flex tw-flex-col tw-bg-[#7dcbb7] tw-max-h-max tw-h-full tw-w-full">
                    <div className="tw-flex tw-flex-col tw-w-44 tw-h-[80%]">
                        <div className="tw-flex tw-bg-[#163881] tw-self-center	 tw-rounded-b-full tw-w-max tw-h-max tw-p-2">
                            <img
                                className="tw-rounded-full tw-border-[6px]  tw-border-black tw-w-24 tw-h-24 "
                                src={logo}
                            />
                        </div>
                        <div className="tw-flex tw-self-center tw-mt-8">
                            <button
                                className="tw-bg-white tw-h-8 tw-w-32 tw-rounded-lg"
                                onClick={focusSummarize}
                            >
                                สรุปความเคลื่อนไหว
                            </button>
                        </div>
                        <div className="tw-flex tw-self-center tw-mt-4">
                            <button
                                className="tw-bg-white tw-h-8 tw-w-32 tw-rounded-lg"
                                onClick={handleClick}
                            >
                                สรุปวิเคราะห์
                            </button>
                        </div>
                    </div>
                    <div className="tw-flex tw-h-[20%] tw-self-end tw-pb-4 tw-pr-4 ">
                        <button className="tw-bg-white tw-h-8 tw-w-24 tw-rounded-lg tw-self-end">
                            SAVE PDF
                        </button>
                    </div>
                </div>
            </div>
            {/* <div className="tw-flex tw-flex-row tw-max-h-max tw-h-full tw-w-max"> */}
            <FloatButton
                className="tw-flex tw-mb-6 tw-mr-4 tw-sticky tw-top-2 tw-left-6"
                {...getToggleProps({ onClick: handleOnClick })}
                icon={isExpanded ? < MenuFoldOutlined /> : < MenuUnfoldOutlined />}
            // onClick={() => clickHandler()}
            />
            {/* </div> */}
        </div>
    )
}

ReportSideBar.propTypes = {
    focusSummarize: PropTypes.func,
    handleClick: PropTypes.func,
}

export default ReportSideBar