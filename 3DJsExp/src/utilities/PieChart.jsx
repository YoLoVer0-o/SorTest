import * as d3 from "d3";
import PropTypes from 'prop-types';

const Arc = ({ data, index, createArc, colors, displayText, displayValue }) => {


    return (
        <g key={index} className="arc">
            <path className="arc" d={createArc(data)} fill={colors} />
            <text
                transform={`translate(${createArc.centroid(data)[0]}, ${createArc.centroid(data)[1] + 10})`}
                textAnchor="middle"
                alignmentBaseline="text-after-edge"
                fill="white"
                fontSize="16"
                style={{ zIndex: 1000 }}
            >
                {displayText}
            </text>
            <br />
            <text
                transform={`translate(${createArc.centroid(data)[0]}, ${createArc.centroid(data)[1] + 10})`}
                textAnchor="middle"
                alignmentBaseline="mathematical"
                fill="white"
                fontSize="16"
                style={{ zIndex: 1000 }}
            >
                {displayValue}
            </text>
        </g>
    );
};

const PieChart = props => {

    const keyName = props.keyName;
    const displayText = props.displayText;
    const calColor = props.calColor;

    const createPie = d3
        .pie()
        .value(d => d[`${keyName}`])
        .sort(null);
    const createArc = d3
        .arc()
        .innerRadius(props.innerRadius)
        .outerRadius(props.outerRadius);
    const data = createPie(props.data);

    return (
        <svg width={props.width} height={props.height}>
            <g transform={`translate(${props.outerRadius} ${props.outerRadius})`}>
                {data.map((d, i) => (
                    <Arc
                        key={i}
                        data={d}
                        index={i}
                        createArc={createArc}
                        colors={calColor(d.data[`${displayText}`])}
                        displayText={d.data[`${displayText}`]}
                        displayValue={d.data[`${keyName}`]}
                    />
                ))}
            </g>
        </svg>
    );
};

PieChart.propTypes = {
    data: PropTypes.array,
    innerRadius: PropTypes.number,
    outerRadius: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    keyName: PropTypes.string,
    displayText: PropTypes.string,
    calColor: PropTypes.func,
}

Arc.propTypes = {
    data: PropTypes.object,
    index: PropTypes.number,
    createArc: PropTypes.func,
    colors: PropTypes.func,
    displayText: PropTypes.string,
    displayValue: PropTypes.number,
    centroid: PropTypes.func,
}

export default PieChart;