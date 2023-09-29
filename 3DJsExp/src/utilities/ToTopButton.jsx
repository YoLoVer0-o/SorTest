import { FloatButton } from "antd";
import { UpCircleOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const ToTopButton = props => {

  const clickHandler = props.onClick;

  return (
    <button onClick={() => clickHandler()}>
      <FloatButton
        className="tw-flex justify-end tw-mb-6 tw-mr-4"
        icon={<UpCircleOutlined />}
      />
    </button>
  );
};

ToTopButton.propTypes = {
  onClick: PropTypes.func
}

export default ToTopButton;
