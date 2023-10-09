import { FloatButton } from "antd";
import { UpCircleOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const ToTopButton = props => {

  const clickHandler = props.onClick;

  return (
    <FloatButton
      className="tw-flex tw-mr-2 tw-mb-14 tw-z-10"
      icon={<UpCircleOutlined />}
      onClick={() => clickHandler()}
    />
  );
};

ToTopButton.propTypes = {
  onClick: PropTypes.func
}

export default ToTopButton;
