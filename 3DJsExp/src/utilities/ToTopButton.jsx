import { FloatButton, Tooltip } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const ToTopButton = (props) => {
  const clickHandler = props.onClick;
  const text = <span>สรุปบทวิเคราะห์</span>;
  return (
    <Tooltip placement="topLeft" title={text} color="blue">
      <FloatButton
        className="tw-flex tw-mr-2  tw-mb-8 tw-z-10"
        icon={<FileTextOutlined />}
        onClick={() => clickHandler()}
      />
    </Tooltip>
  );
};

ToTopButton.propTypes = {
  onClick: PropTypes.func,
};

export default ToTopButton;
