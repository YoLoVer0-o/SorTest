import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

import logo from "../assets/logo.jpg";
import poster from "../assets/poster.jpg";
import CarouselReport from "../utilities/Carousel";

const PostReport = (props) => {
  const location = useLocation();
  const postData = location.state;

  return (
    // <div className='tw-grid tw-grid-flow-row tw-max-w-full tw-max-h-full tw-w-full tw-h-full tw-overflow-y-auto tw-gap-10'>
    //     <div className='tw-grid tw-grid-flow-row tw-gap-4'>
    //         <div className='tw-grid tw-grid-flow-col tw-justify-between' >
    //             <div className='tw-rounded-full tw-border-8 tw-border-black tw-w-36 tw-h-36 tw-overflow-hidden'>
    //                 <img className='object-scale-down' src={logo} />
    //             </div>
    //             <div className='tw-grid tw-border-4 tw-border-black tw-align-middle tw-items-center tw-justify-start tw-p-4'>
    //                 <p className='tw-text-md'>กลุ่ม:</p>
    //                 <p className='tw-text-md'>ชื่อผู้ใช้:{postData.creator}</p>
    //                 <p className='tw-text-md'>ช่องทาง:</p>
    //             </div>
    //             <div className='tw-grid tw-border-4 tw-border-black tw-align-middle tw-items-center tw-justify-start tw-p-4'>
    //                 <p className='tw-text-md'>ยอดผู้ติดตาม:</p>
    //                 <p className='tw-text-md'>ยอดวิว/รีทวิต:</p>
    //                 <p className='tw-text-md'>คอมเมนต์:</p>
    //             </div>
    //         </div>
    //         <div className='tw-grid tw-grid-flow-col tw-justify-between tw-max-h-fit tw-max-w-fit tw-gap-4'>
    //             <div className='tw-grid tw-border-4 tw-border-black tw-max-h-80'>
    //                 <p>
    //                     {postData.post}
    //                 </p>
    //             </div>
    //             <div className='tw-grid tw-border-4 tw-border-black tw-max-w-sm tw-max-h-80 tw-overflow-hidden'>
    //                 <img className='object-contain tw-max-h-[inherit] tw-max-w-[inherit]' src={poster} />
    //             </div>
    //         </div>
    //     </div>
    //     <div className='tw-grid tw-grid-flow-row tw-max-h-fit tw-max-w-fit'>
    //         <div className='tw-border-4 tw-border-black tw-text-center'>สรุปความเคลื่อนไหว</div>
    //         <div className='tw-grid tw-border-4 tw-border-black tw-max-h-80'>
    //             <p>
    //                 {postData.post}
    //             </p>
    //         </div>
    //     </div>
    //     <div className='tw-grid tw-grid-flow-row tw-max-h-fit tw-max-w-fit'>
    //         <div className='tw-border-4 tw-border-black tw-text-center'>สรุปวิเคราะห์</div>
    //         <div className='tw-grid tw-border-4 tw-border-black tw-max-h-80'>
    //             <p>
    //                 {postData.post}
    //             </p>
    //         </div>
    //     </div>
    // </div>
    <div className="tw-flex  tw-h-[100%] tw-w-full ">
      <div className="tw-flex tw-flex-col tw-bg-[#7dcbb7] tw-max-h-max tw-h-full tw-w-[15%]  tw-flex-wrap ">
        <div className="tw-flex tw-flex-col tw-flex-wrap tw-content-center tw-h-[80%]">
          <div className="tw-flex tw-bg-[#163881] tw-self-center	 tw-rounded-b-full tw-w-max tw-h-max tw-p-2">
            <img
              className="tw-rounded-full tw-border-[6px]  tw-border-black tw-w-24 tw-h-24 "
              src={logo}
            />
          </div>
          <div className="tw-flex tw-content-center tw-mt-8">
            <button className="tw-bg-white tw-h-8 tw-w-32 tw-rounded-lg">
              สรุปความเคลื่อนไหว
            </button>
          </div>
          <div className="tw-flex tw-content-center tw-mt-4">
            <button className="tw-bg-white tw-h-8 tw-w-32 tw-rounded-lg">
              สรุปวิเคราะห์
            </button>
          </div>
        </div>
        <div className="tw-flex tw-h-[20%] tw-content-end tw-flex-wrap tw-pb-4 tw-pr-4 tw-justify-end">
          <button className="tw-bg-white tw-h-8 tw-w-24 tw-rounded-lg">
            SAVE PDF
          </button>
        </div>
      </div>

      <div className="tw-flex tw-flex-col tw-w-[85%] tw-h-[100%] tw-pl-10 tw-overflow-y-auto">
        <div className="tw-flex tw-text-center tw-self-center tw-text-2xl tw-text-red-500">
          ลับมาก
        </div>
        <div className="tw-flex tw-flex-row tw-justify-center tw-gap-12">
          <div className="tw-flex tw-flex-col tw-w-40 tw-border-[2px] tw-border-black tw-rounded-xl tw-p-2">
            <div className="tw-flex">แพลต์ฟอร์ม:Facebook</div>
            <div className="tw-flex">กลุ่ม:NGO</div>
            <div className="tw-flex">ชื่อกลุ่ม:iLaeFX</div>
            <div className="tw-flex">ผู้ติดตาม:460K</div>
            <div className="tw-flex">ช่องทาง FB:iLawClub</div>
          </div>
          <div className="tw-flex tw-flex-col tw-w-64 tw-border-[2px] tw-border-black tw-rounded-xl tw-p-2">
            <div className="tw-flex">ถูกใจ:46K</div>
            <div className="tw-flex">แชร์:403</div>
            <div className="tw-flex">ความคิดเห็น:123</div>
            <div className="tw-flex">สร้างโพส:3 มิ.ย.2023 เวลา 19.45น.</div>
            <div className="tw-flex">อัพเดทข้อมูล FB:5 มิ.ย.2023 เวลา 15.45น.</div>
          </div>
        </div>
        <div className="tw-flex tw-mt-4 tw-justify-center">
          <CarouselReport />
        </div>
        <div  
        className="tw-flex  tw-justify-start tw-self-start tw-text-3xl tw-bg-gradient-to-r 
        tw-from-indigo-500 tw-from-10% tw-via-sky-500 tw-via-30% tw-to-white 
        tw-text-white tw-w-72 tw-h-max">
          <p>สรุปความเคลื่อนไหว</p></div>
      </div>
    </div>
  );
};

PostReport.propTypes = {};

export default PostReport;
