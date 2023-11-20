import { useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import * as d3 from "d3";

const HorizontalBarChart = props => {

    const data = props.data;
    const svgRef = useRef(null);

    let onBarClick = props.onBarClick;

    useEffect(() => {
        const keyNameX = props.keyNameX;
        const keyNameY = props.keyNameY;
        const keyNameColor = props.keyNameColor;
        const calColor = props.calColor;
        const barHeight = props.barHeight;

        const marginTop = 30;
        const marginRight = 60;
        const marginBottom = 10;
        const marginLeft = 100;
        const width = props.width;
        const height = Math.ceil((data.length + 0.1) * barHeight) + marginTop + marginBottom;

        const x = d3.scaleLinear()
            .domain([0, d3.max(data, d => d[`${keyNameX}`])])
            .range([marginLeft, width - marginRight]);

        const y = d3.scaleBand()
            .domain(d3.sort(data, d => -d[`${keyNameX}`])
                .map(d => d[`${keyNameY}`]))
            .rangeRound([marginTop, height - marginBottom])
            .padding(0.1);

        const svg = d3
            .select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height])
            .attr("style", "max-width: 100%; height: auto;");

        svg.selectAll("*").remove();

        svg.append("g")
            .attr("fill", calColor(keyNameColor))
            .selectAll()
            .data(data)
            .join("rect")
            .attr("x", x(0))
            .attr("y", (d) => y(d[`${keyNameY}`]))
            .attr("width", (d) => x(d[`${keyNameX}`]) - x(0))
            .attr("height", y.bandwidth())
            .on("click", function (event, d) {
                if (onBarClick) {
                    onBarClick(d);
                }
            })
            .on("mouseover", function () {
                d3.select(this).style("fill", "orange");
            })
            .on("mouseout", function () {
                d3.select(this).style("fill", function () {
                    return calColor(keyNameColor);
                });
            });

        svg.append("g")
            .attr("fill", "black")
            .selectAll()
            .data(data)
            .join("text")
            .attr("x", (d) => x(d[`${keyNameX}`]) + 10)
            .attr("y", (d) => y(d[`${keyNameY}`]) + y.bandwidth() / 2)
            .attr("dy", "0.35em")
            .attr("dx", -4)
            .text((d) => d[`${keyNameX}`])
            .call((text) => text.filter(d => x(d[`${keyNameX}`]) - x(0) < 20)
                .attr("dx", +4)
                .attr("fill", "black")
                .attr("text-anchor", "start"));

        svg.append("g")
            .attr("transform", `translate(0,${marginTop})`)
            .call(d3.axisTop(x).ticks(width / 80, "").tickFormat(d3.format(".0f")))
            .call(g => g.select(".domain").remove())
            .selectAll("text")
            .style("font-size", "1rem");

        svg.append("g")
            .attr("transform", `translate(${marginLeft},0)`)
            .call(d3.axisLeft(y).tickSizeOuter(0))
            .selectAll("text")
            .style("font-size", "1rem");

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, props.keyNameX, props.keyNameY, props.keyNameColor, props.calColor, props.width, props.barHeight]);

    return (
        <svg className="tw-text-xl" ref={svgRef}></svg>
    )
}

HorizontalBarChart.propTypes = {
    data: PropTypes.array,
    onBarClick: PropTypes.func,
    width: PropTypes.number,
    barHeight: PropTypes.number,
    keyNameX: PropTypes.string,
    keyNameY: PropTypes.string,
    keyNameColor: PropTypes.string,
    calColor: PropTypes.func,
}

export default HorizontalBarChart;
