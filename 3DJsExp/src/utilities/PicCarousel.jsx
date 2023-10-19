import { Carousel } from "antd";
import carouselPic from "../assets/carouselPic.jpg";
import poster from "../assets/poster.jpg";
import PropTypes from "prop-types";
import { useResponsive } from "../hooks";
import classNames from "classnames";
const PicCarousel = (props) => {
  const showAll = props.onClick;
  const {
    isDesktopOrLaptop,
    isBigScreen,
    isTabletOrMobile,
    isMobile,
    isTablet,
    isPortrait,
    isLandscape,
  } = useResponsive();
  return (
    <div className=" tw-relative tw-flex tw-flex-col  ">
      <button
        onClick={showAll}
        className="tw-absolute tw-mt-1 tw-mr-1 tw-justify-center tw-items-center 
      tw-flex tw-self-end tw-bg-gray-100/80 tw-rounded-md tw-h-8 tw-text-lg tw-z-10"
      >
        รูปภาพทั้งหมด
      </button>
      <Carousel
        autoplay
        className={classNames("tw-flex  tw-w-[30rem] tw-h-[20rem] tw-bg-red-900 tw-z-0",{
          "tw-w-[15rem] tw-h-[20rem]":isMobile && isPortrait ,
        })} 
         
      >
        <img
            className="tw-w-[30rem] tw-h-[20rem] "
            src={carouselPic}
          />
    
        
          <img
            src={poster}
            className=" tw-w-[30rem] tw-h-[20rem] "
          />
        
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
  onClick: PropTypes.func,
};

export default PicCarousel;
