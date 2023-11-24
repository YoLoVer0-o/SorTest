import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

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

    return <Bar
        data={data}
        options={options}
        redraw={props.redraw}
        plugins={props.plugins}
    />

}
export default HorizontalBarChart;