import PropTypes from "prop-types";
// import { useLocation } from "react-router-dom";
import { useRef } from "react";
import logo from "../assets/logo.jpg";
import CarouselReport from "../utilities/Carousel";
import FButton from "../utilities/FolatButton";
import DateDisplay from "../utilities/Date";
import InputCol from "../utilities/InputCol";
import PicModal from "../utilities/PicModal";
import { useState } from "react";
import { Layout, Button } from "antd"
import { MenuFoldOutlined, MenuUnfoldOutlined, } from '@ant-design/icons';

const { Sider } = Layout;

const PostReport = (props) => {



  // const location = useLocation();
  // const postData = location.state;
  const [modalToggle, setModalToggle] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const topRef = useRef(null);
  const scrollToTop = () => {
    topRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const summarizeContent = useRef(null);
  const focusSummarize = () => {
    if (summarizeContent.current) {
      summarizeContent.current.focus();
    }
  };

  const inputRef = useRef(null);
  function handleClick() {
    inputRef.current.focus();
  }

  const showModal = () => {
    setModalToggle(true);
  };

  const handleCancel = () => {
    setModalToggle(false);
  };

  return (
    <div className="tw-flex tw-h-[100%] tw-w-full ">

      {/* <Sider trigger={null} collapsible collapsed={collapsed}> */}
      <div className="tw-flex tw-flex-col tw-bg-[#7dcbb7] tw-max-h-max tw-h-full tw-w-[15%]  ">
        <div className="tw-flex tw-flex-col   tw-h-[80%]">
          <div className="tw-flex tw-bg-[#163881] tw-self-center	 tw-rounded-b-full tw-w-max tw-h-max tw-p-2">
            <img
              className="tw-rounded-full tw-border-[6px]  tw-border-black tw-w-24 tw-h-24 "
              src={logo}
            />
          </div>
          <div className="tw-flex tw-self-center tw-mt-8">
            <button
              className="tw-bg-white tw-h-8 tw-w-32 tw-rounded-lg"
              onClick={focusSummarize}
            >
              สรุปความเคลื่อนไหว
            </button>
          </div>
          <div className="tw-flex tw-self-center tw-mt-4">
            <button
              className="tw-bg-white tw-h-8 tw-w-32 tw-rounded-lg"
              onClick={handleClick}
            >
              สรุปวิเคราะห์
            </button>
          </div>
        </div>
        <div className="tw-flex tw-h-[20%] tw-self-end tw-pb-4 tw-pr-4 ">
          <button className="tw-bg-white tw-h-8 tw-w-24 tw-rounded-lg tw-self-end">
            SAVE PDF
          </button>
        </div>
      </div>
      {/* </Sider> */}

      {/* <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: '16px',
          width: '4rem',
          height: '4rem',
        }}
      /> */}

      <div className="tw-flex tw-flex-col tw-w-[85%] tw-h-[100%] tw-pl-10 tw-overflow-y-auto">
        <div
          ref={topRef}
          tabIndex={0}
          className="tw-flex tw-text-center tw-self-center tw-text-2xl tw-text-red-500"
        >
          ลับมาก
        </div>
        <div className="tw-flex tw-flex-row tw-justify-center tw-gap-12 ">
          <div className="tw-flex tw-flex-col tw-w-40 tw-border-[2px] tw-border-black tw-rounded-xl tw-p-2  ">
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
            <div className="tw-flex">
              อัพเดทข้อมูล FB:5 มิ.ย.2023 เวลา 15.45น.
            </div>
          </div>
        </div>
        <div>

        </div>
        <div className="tw-flex  tw-mt-4 tw-justify-center tw-items-center">
          {/* <button onClick={showModal} className=" tw-flex tw-bg-gray-100/90 tw-rounded-md tw-h-8 tw-text-xl tw-m-6 tw-w-max">รูปภาพทั้งหมด</button> */}
          <CarouselReport onClick={showModal} className="" />
          <PicModal modalToggle={modalToggle} handleCancel={handleCancel} />
        </div>
        <div
          className="tw-flex  tw-justify-start tw-self-start tw-text-3xl tw-bg-gradient-to-r 
        tw-from-indigo-500 tw-from-10% tw-via-sky-500 tw-via-30% tw-to-white 
        tw-text-white tw-w-72 tw-h-max"
        >
          <p>สรุปความเคลื่อนไหว</p>
        </div>
        <div
          className="tw-flex tw-h-max tw-w-[100%] tw-p-6"
          ref={summarizeContent}
          tabIndex={0}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          volutpat dolor eu ex ornare sodales. Phasellus dapibus vitae tortor ut
          posuere. Donec ipsum arcu, ultricies faucibus nisl nec, aliquet dictum
          est. Proin eget justo et augue blandit viverra. Donec quam tellus,
          rhoncus quis gravida vitae, rutrum vitae mi. Ut et dolor sed risus
          pellentesque faucibus at in massa. Mauris porttitor, arcu et gravida
          commodo, ligula sem venenatis libero, vel elementum nulla lectus eu
          purus. Phasellus sed fringilla ipsum. Maecenas cursus odio sit amet
          magna fringilla, a euismod purus egestas. In cursus tristique
          vulputate. Nullam vestibulum, tellus sodales aliquet tincidunt, metus
          augue faucibus ante, a tempor mi nunc sed arcu. Nulla in ex purus.
          Mauris luctus turpis lacinia odio vehicula, ac tempor arcu finibus.
          Vestibulum viverra odio dignissim finibus congue. Sed et elit leo.
          Etiam scelerisque ultricies urna eget venenatis. Nunc pharetra nisi
          non lorem tincidunt, sed porttitor erat ultricies. Vestibulum a
          elementum dui. Quisque at sem quis dolor molestie ornare. Proin
          convallis libero nunc, ut finibus augue pharetra vel. Fusce fermentum
          nisi vitae magna auctor eleifend. Donec id mauris odio. Aenean non
          lorem mi. Nunc posuere congue rutrum. Integer rhoncus massa luctus
          sapien facilisis ultricies. Sed mi leo, scelerisque sit amet imperdiet
          porta, viverra a sem. Sed in diam sit amet turpis fermentum ultrices
          et ac lectus. Fusce vel egestas elit, sit amet facilisis lectus.
          Aenean congue molestie dui eget mattis. Cras mattis, purus et
          hendrerit porttitor, quam augue cursus urna, eget pharetra magna eros
          molestie purus. Maecenas eu libero ut neque sollicitudin sagittis. Nam
          nec odio turpis. Suspendisse tincidunt aliquam metus, a tincidunt
          metus ullamcorper non. Nam accumsan urna a purus commodo, et vehicula
          sapien dictum. Integer suscipit felis non lectus eleifend tristique.
          Nunc sem sapien, accumsan et volutpat in, interdum et nulla. Proin at
          pretium felis, quis iaculis justo. Mauris sit amet ex eu ligula
          posuere gravida. Fusce nec nulla lobortis, dignissim nisi in,
          ultricies orci. Donec non ullamcorper ligula. Fusce ultrices euismod
          ex, nec pellentesque erat cursus a. Nunc scelerisque justo vel purus
          dictum sodales. Cras dictum urna aliquam consectetur auctor. Donec
          feugiat leo varius turpis faucibus, ac dignissim nibh tempus. Integer
          faucibus, enim non cursus laoreet, nisi risus aliquam lectus, non
          egestas lacus turpis quis tortor. Nam blandit congue diam at auctor.
          Nunc eu tortor sodales, condimentum urna egestas, auctor libero. Morbi
          tincidunt non mauris in tristique. Sed ut metus risus. Mauris
          tincidunt nibh in tellus sagittis finibus. In maximus, nisi et
          vehicula ultrices, leo enim hendrerit ligula, eu vehicula mauris
          tellus sit amet mauris. In ullamcorper posuere tellus id semper.
          Praesent mauris metus, elementum ac finibus vel, aliquam in turpis.
          Donec luctus lobortis velit, et laoreet nibh auctor sed. Nam dignissim
          ligula ex, sit amet euismod quam fermentum et.
        </div>

        <div
          className="tw-flex  tw-justify-start tw-self-start tw-text-3xl tw-bg-gradient-to-r 
        tw-from-indigo-500 tw-from-10% tw-via-sky-500 tw-via-30% tw-to-white 
        tw-text-white tw-w-72 tw-h-max"
        >
          <p>สรุปวิเคราะห์</p>
        </div>
        <div className="tw-flex tw-h-full tw-w-[100%] tw-p-6">
          <textarea
            type="text"
            className="tw-w-[100%] tw-h-40 tw-rounded-md tw-bg-gray-100 tw-p-2 tw-border-solid tw-border-neutral-400 tw-border-2 "
            ref={inputRef}
            rows={5}
          ></textarea>
        </div>
        <div className=" tw-flex tw-flex-col tw-p-6">
          <DateDisplay />
          <InputCol />
          <div className="tw-text-xl">สถานการณ์ในห้วงต่อไป</div>
          <InputCol />
          <FButton onClick={scrollToTop} />
        </div>
      </div>
    </div>
  );
};

PostReport.propTypes = {

};

export default PostReport;
