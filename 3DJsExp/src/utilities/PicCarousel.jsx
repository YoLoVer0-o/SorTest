import { Carousel } from "antd";
import carouselPic from "../assets/carouselPic.jpg";
import poster from "../assets/poster.jpg";
import PropTypes from "prop-types";

const PicCarousel = (props) => {

  const showAll = props.onClick

  return (
    <div className=" tw-relative tw-flex tw-flex-col">
      <button onClick={showAll} className="tw-absolute tw-mt-1 tw-mr-1 tw-justify-center tw-items-center tw-flex tw-self-end tw-bg-gray-100/80 tw-rounded-md tw-h-8 tw-text-lg tw-z-10">รูปภาพทั้งหมด</button>
      <Carousel
        autoplay
        className="tw-flex  tw-w-[30rem] tw-justify-self-center tw-content-center tw-justify-center  tw-bg-red-900 tw-z-0"
      >
        <div className="tw-flex tw-justify-center tw-object-center  tw-max-w-80 tw-max-h-80 	">
          <img
            className="tw-flex tw-justify-center tw-w-[30rem] tw-h-[20rem] tw-max-w-[inherit] object-contain tw-max-h-[inherit]"
            src={carouselPic}
          />
        </div>
        <div className=" tw-flex tw-justify-center tw-object-center  tw-max-w-80 tw-max-h-80">
          <img
            src={poster}
            className="tw-flex tw-justify-center tw-w-[30rem] tw-h-[20rem] tw-max-w-[inherit] object-contain tw-max-h-[inherit]"
          />
        </div>
        {/* <div className="tw-flex tw-justify-center tw-w-[20rem] tw-h-[20rem]">
    <img 
  //   style={contentStyle} 
    src={carouselPic} 
    className="tw-max-w-[inherit] tw-max-h-[inherit]"
    />
  </div>
  <div className="tw-flex tw-justify-center tw-w-[20rem] tw-h-[20rem]">
    <img 
  //   style={contentStyle} 
    src={carouselPic}
    className="tw-max-w-[inherit] tw-max-h-[inherit]"
    />
  </div> */}
      </Carousel>
    </div>
  );
};

PicCarousel.propTypes = {
  onClick: PropTypes.func
}

export default PicCarousel;
