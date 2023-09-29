import { FloatButton } from "antd";
import { UpCircleOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const ToTopButton = props => {

  const clickHandler = props.onClick;

  return (
    <FloatButton
      className="tw-flex tw-mb-6 tw-mr-4 tw-bottom-14"
      icon={<UpCircleOutlined />}
      onClick={() => clickHandler()}
    />
  );
};

ToTopButton.propTypes = {
  onClick: PropTypes.func
}

export default ToTopButton;
