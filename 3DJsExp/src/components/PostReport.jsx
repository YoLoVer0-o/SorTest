import { useState, useRef } from "react";
import { ReportSideBar } from "../components";
import { ListInput, PicCarousel, PicModal, ToTopButton } from "../utilities";
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

import { FloatButton } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useCollapse } from 'react-collapsed';

const PostReport = () => {

  const [modalToggle, setModalToggle] = useState(false);

  const topRef = useRef(null);
  const summarizeContent = useRef(null);
  const inputRef = useRef(null);

  const [isExpanded, setExpanded] = useState(true);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

  function handleOnClick() {
    setExpanded(!isExpanded);
  }

  const scrollToTop = () => {
    topRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const focusSummarize = () => {
    if (summarizeContent.current) {
      summarizeContent.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  function handleClick() {
    inputRef.current.scrollIntoView({ behavior: "smooth" });
  }

  const showModal = () => {
    setModalToggle(true);
  };

  const handleCancel = () => {
    setModalToggle(false);
  };

  const THDate = () => {
    const date = new Date();
    dayjs.locale("th");
    const logDay = dayjs(date).format("DD MMMM BBBB");
    return logDay;
  };

  return (
    <div className="tw-flex tw-flex-row tw-h-full tw-w-full">
      <div {...getCollapseProps()}>
        <ReportSideBar handleClick={handleClick} focusSummarize={focusSummarize} />
      </div>
      <div className="tw-flex tw-flex-row">
        <FloatButton
          className="tw-flex tw-mb-6 tw-ml-4 tw-sticky "
          {...getToggleProps({ onClick: handleOnClick })}
          icon={isExpanded ? < MenuFoldOutlined /> : < MenuUnfoldOutlined />}
        />
        <div className="tw-flex tw-flex-col tw-w-full tw-h-full tw-overflow-y-auto tw-px-10">
          <div
            className="tw-flex tw-text-center tw-self-center tw-text-2xl tw-text-red-500"
          >
            ลับมาก
          </div>
          <div className="tw-flex tw-flex-col tw-justify-center tw-my-6 tw-p-6"
            ref={topRef}
            tabIndex={0}
          >
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
            <div className="tw-flex  tw-mt-4 tw-justify-center tw-items-center">
              <PicCarousel onClick={showModal} className="" />
              <PicModal modalToggle={modalToggle} handleCancel={handleCancel} />
            </div>
          </div>

          <div className="tw-flex tw-flex-col tw-justify-center tw-my-6 "
            ref={summarizeContent}
            tabIndex={1}
          >
            <div
              className="tw-flex  tw-justify-start tw-self-start tw-text-3xl tw-bg-gradient-to-r 
        tw-from-indigo-500 tw-from-10% tw-via-sky-500 tw-via-30% tw-to-white 
        tw-text-white tw-w-72 tw-h-max"
            >
              <p>สรุปความเคลื่อนไหว</p>
            </div>
            <div className="tw-flex tw-h-max tw-w-full tw-p-6">
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
          </div>
          <div className="tw-flex tw-flex-col tw-justify-center tw-my-6"
            ref={inputRef}
            tabIndex={2}>
            <div
              className="tw-flex  tw-justify-start tw-self-start tw-text-3xl tw-bg-gradient-to-r 
        tw-from-indigo-500 tw-from-10% tw-via-sky-500 tw-via-30% tw-to-white 
        tw-text-white tw-w-72 tw-h-max"
            >
              <p>สรุปวิเคราะห์</p>
            </div>
            <div className="tw-flex tw-h-full tw-w-full tw-p-6"
            >
              <textarea
                type="text"
                className="tw-w-full tw-h-40 tw-rounded-md tw-bg-gray-100 tw-p-2 tw-border-solid tw-border-neutral-400 tw-border-2 "
                rows={5}
              ></textarea>
            </div>
            <div className=" tw-flex tw-flex-col tw-p-6"
            >
              <div className="tw-text-xl">
                สถานการณ์ล่าสุดใน <THDate />
              </div>
              <ListInput />
              <div className="tw-text-xl">สถานการณ์ในห้วงต่อไป</div>
              <ListInput />
            </div>
          </div>
        </div>
        <ToTopButton onClick={scrollToTop} />
      </div>
    </div>
  );
};

PostReport.propTypes = {};

export default PostReport;
