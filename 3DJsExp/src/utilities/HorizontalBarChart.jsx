import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useMemo, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import profile from "../assets/profile.png";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const HorizontalBarChart = props => {

    const options = props.chartOptions;
    const data = props.chartData;

    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const labelImage = useMemo(() => {
        const image = new Image();
        image.src = profile;

        image.onload = () => {
            setIsImageLoaded(true);
        };

        return image;
    }, []);
    const settings = {
        barSize: 50,
        imageWidth: 130,
        imageHeight: 30,
        imageHalfHeight: 30 / 2,
        imageBarOffset: (50 - 30) / 2,
        textHeight: 15,
        textHalfHeight: 15 / 2,
        textFont: 'normal 20px Arial, sans-serif'
    };

    const handleDrawImage = (chart) => {
        const { ctx } = chart;

        const chartHeight = chart.chartArea?.height;
        const dataLength = data.labels.length;

        const step = (chartHeight - settings.barSize * dataLength) / dataLength;
        const yOffset = step / 2 + settings.imageBarOffset;

        ctx.font = settings.textFont;

        ctx.save();

        data.labels.forEach((element, i) => {

            const imageY = i * (settings.barSize + step) + yOffset;

            ctx.drawImage(
                labelImage,
                10,
                imageY,
                settings.imageWidth,
                settings.imageHeight
            );

            ctx.restore();
        });
    };

    if (!isImageLoaded) {
        return null;
    }

    return <Bar
        data={data}
        options={options}
        redraw={props.redraw}
        plugins={[
            {
                id: "sectorBackground",
                beforeDraw: (chart) => handleDrawImage(chart),
                resize: (chart) => handleDrawImage(chart)
            }
        ]}
    />
}
export default HorizontalBarChart;