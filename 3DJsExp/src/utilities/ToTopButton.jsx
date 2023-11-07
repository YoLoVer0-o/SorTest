import { FloatButton, Tooltip } from "antd";
import { UpCircleOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const ToTopButton = (props) => {
  const topRef = props.topRef
  const scrollToTop = () => {
    topRef?.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <Tooltip placement="left" title={"กลับขึ้นด้านบน"} color="blue">
      <FloatButton
        className="tw-flex tw-right-2 tw-bottom-32 tw-z-10 tw-bg-sky-400"
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
