import React from "react";
import { Carousel } from "antd";
import carouselPic from "../assets/carouselPic.jpg";
import poster from "../assets/poster.jpg";

// const contentStyle = {
//   height: "360px",
//   width: "720px",
//   color: "#fff",
//   lineHeight: "160px",
//   textAlign: "center",
//   background: "#364d79",
// };
const CarouselReport = () => (
  <Carousel autoplay className="tw-flex tw-justify-center  tw-object-contain tw-bg-red-900 ">
    <div className="tw-flex tw-justify-center tw-object-center  tw-max-w-80 tw-max-h-80	">
      <img
        className="tw-flex tw-justify-center tw-max-w-[inherit] object-contain tw-max-h-[inherit]" 
        // style={contentStyle }
        src={carouselPic}
      />
    </div>
    <div className="tw-flex tw-justify-center tw-object-center  tw-max-w-80 tw-max-h-80">
      <img  src={poster}
            className="tw-flex tw-justify-center tw-max-w-[inherit] object-contain tw-max-h-[inherit]"
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
);
export default CarouselReport;
