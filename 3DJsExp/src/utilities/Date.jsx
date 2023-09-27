import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";

dayjs.extend(buddhistEra);

function DateDisplay() {
  const DateLongTH = () => {
    const date = new Date();
    dayjs.locale("th");
    const logDay = dayjs(date).format("DD MMMM BBBB");
    console.log(logDay);
    return logDay;
  };
  return (
    <div  className="tw-text-xl">
        สถานการณ์ล่าสุดใน <DateLongTH />
    </div>
  );
}

export default DateDisplay;
