import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useRef } from 'react';
import { Bar, getElementAtEvent } from 'react-chartjs-2';
import PropTypes from 'prop-types';

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
    const handleClick = props.handleClick;
    const useDataProps = props.useDataProps;

    const chartRef = useRef();

    const onClick = (event) => {
        if (handleClick) {
            if (useDataProps) {
                handleClick(getElementAtEvent(chartRef.current, event), useDataProps)
            }
            else {
                handleClick(getElementAtEvent(chartRef.current, event))
            }
        }
        else {
            return
        }
    }

    return <Bar
        ref={chartRef}
        data={data}
        options={options}
        redraw={props.redraw}
        plugins={props.plugins}
        onClick={onClick}
    />

}

HorizontalBarChart.propTypes = {
    chartOptions: PropTypes.object,
    chartData: PropTypes.object,
    redraw: PropTypes.bool,
    plugins: PropTypes.array,
    handleClick: PropTypes.func,
    useDataProps: PropTypes.array,
}

export default HorizontalBarChart;