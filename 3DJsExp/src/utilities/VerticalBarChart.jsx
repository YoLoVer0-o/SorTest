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

const VerticalBarChart = props => {

  const chartOptions = props.chartOptions;
  const chartData = props.chartData;

  return <Bar options={chartOptions} data={chartData} />;
}
export default VerticalBarChart;
