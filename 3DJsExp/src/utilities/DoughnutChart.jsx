import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = props => {

    const options = props.chartOptions;
    const data = props.chartData;

    return <Doughnut
        data={data}
        options={options}
        redraw={props.redraw}
        plugins={props.plugins}
    />;
}

DoughnutChart.propTypes = {
    chartOptions: PropTypes.object,
    chartData: PropTypes.object,
    redraw: PropTypes.bool,
    plugins: PropTypes.array,
}

export default DoughnutChart
