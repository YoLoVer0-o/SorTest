import { Spin } from 'antd';
import PropTypes from 'prop-types';

const Loading = props => {

    const isShown = props.isShown;

    return (
        <>
            {isShown && (
                <Spin spinning={true} fullscreen>
                    <div className="tw-p-[50px] tw-bg-[rgba(0, 0, 0, 0.05)] tw-border-4" />
                </Spin>
            )}
        </>
    )
};

Loading.propTypes = {
    isShown: PropTypes.bool,
}

export default Loading;