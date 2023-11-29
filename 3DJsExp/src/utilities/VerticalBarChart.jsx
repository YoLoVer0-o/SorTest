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
import PropTypes from 'prop-types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const VerticalBarChart = props => {

  const options = props.chartOptions;
  const data = props.chartData;

  return <Bar
    options={options}
    data={data}
    redraw={props.redraw}
  />
}

VerticalBarChart.propTypes = {
  chartOptions: PropTypes.object,
  chartData: PropTypes.object,
  redraw: PropTypes.bool,
  plugins: PropTypes.array,
}

export default VerticalBarChart;
