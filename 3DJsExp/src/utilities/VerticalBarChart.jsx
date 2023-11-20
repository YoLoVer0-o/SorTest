import { useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import * as d3 from "d3";

const VerticalBarChart = props => {

  const svgRef = useRef(null);

  useEffect(() => {
    const data = props.data;
    const keyNameX = props.keyNameX;
    const keyNameY = props.keyNameY;

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
      .domain(data.map((d) => d[`${keyNameX}`]))
      .range([0, width])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d[`${keyNameY}`])])
      .nice()
      .range([height, 0]);

    chart
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d[`${keyNameX}`]))
      .attr("y", (d) => y(d[`${keyNameY}`]))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d[`${keyNameY}`]))
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

    chart.append("g")
      .attr("fill", "black")
      .selectAll()
      .data(data)
      .join("text")
      .attr("x", (d) => x(d[`${keyNameX}`]) + 15)
      .attr("y", (d) => y(d[`${keyNameY}`]) - 5)
      .text((d) => d[`${keyNameY}`])
      .call((text) => text.filter(d => x(d[`${keyNameX}`]))
        .attr("fill", "black")
        .attr("text-anchor", "start"));

    chart
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("font-size", "1rem");

    chart.append("g")
      .attr("class", "y-axis")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .style("font-size", "1rem");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data, props.height, props.width]);

  return (
    <div className="tw-h-max tw-w-max">
      <svg className="tw-text-xl" ref={svgRef}></svg>
    </div>
  );
};

VerticalBarChart.propTypes = {
  data: PropTypes.array,
  keyNameX: PropTypes.string,
  keyNameY: PropTypes.string,
  onBarClick: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
}

export default VerticalBarChart;
