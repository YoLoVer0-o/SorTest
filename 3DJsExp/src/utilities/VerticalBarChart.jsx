import { useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import * as d3 from "d3";

const VerticalBarChart = props => {

  const svgRef = useRef(null);

  useEffect(() => {
    const data = props.data;

    // Select the SVG element
    const svg = d3.select(svgRef.current);

    // Remove existing chart elements before rendering the new ones
    svg.selectAll('*').remove();

    // Width, height, margin
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = props.width - margin.left - margin.right;
    const height = props.height - margin.top - margin.bottom;

    const chart = svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, width])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .nice()
      .range([height, 0]);

    chart
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.name))
      .attr("y", (d) => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.value))
      .style("fill", "yellow")
      .on("click", function (event, d) {
        if (props.onBarClick) {
          props.onBarClick(d);
        }
      })
      .on("mouseover", function () {
        d3.select(this).style("fill", "orange");
      })
      .on("mouseout", function () {
        d3.select(this).style("fill", "yellow");
      });

    chart
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    chart.append("g").attr("class", "y-axis").call(d3.axisLeft(y));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data, props.height, props.width]);

  return (
    <svg className="tw-text-xl" ref={svgRef}></svg>
  );
};

VerticalBarChart.propTypes = {
  data: PropTypes.array,
  onBarClick: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
}

export default VerticalBarChart;
