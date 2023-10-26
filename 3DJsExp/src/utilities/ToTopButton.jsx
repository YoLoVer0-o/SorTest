import { FloatButton, Tooltip } from "antd";
import { UpCircleOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const ToTopButton = (props) => {
  const topRef = props.topRef
  const scrollToTop = () => {
    topRef?.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <Tooltip placement="topLeft" title={"กลับขึ้นด้านบน"} color="blue">
      <FloatButton
        className="tw-flex tw-mr-2 tw-mb-14 tw-z-10"
        icon={<UpCircleOutlined />}
        onClick={() => scrollToTop()}
      />
    </Tooltip>
  );
};

ToTopButton.propTypes = {
  topRef: PropTypes.object,
};

export default ToTopButton;
