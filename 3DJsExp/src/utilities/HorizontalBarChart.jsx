import { useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import { useResponsive } from "../hooks";
import * as d3 from "d3";

const HorizontalBarChart = props => {

    const data = props.data;

    const svgRef = useRef(null);

    const {
        isDesktopOrLaptop,
        isBigScreen,
        isTabletOrMobile,
        isTablet,
        isMobile,
        isPortrait,
    } = useResponsive();

    let onBarClick = props.onBarClick;

    useEffect(() => {

        const keyNameX = props.keyNameX;
        const keyNameY = props.keyNameY;

        const barHeight = isTabletOrMobile ? 70 : 35;
        const marginTop = 30;
        const marginRight = 60;
        const marginBottom = 10;
        const marginLeft = 100;
        const width = props.width;
        const height = Math.ceil((data.length + 0.1) * barHeight) + marginTop + marginBottom;

        const x = d3.scaleLinear()
            .domain([0, d3.max(data, d => d[`${keyNameX}`])])
            .range([marginLeft, width - marginRight])
            ;


        const y = d3.scaleBand()
            .domain(d3.sort(data, d => -d[`${keyNameX}`]).map(d => d[`${keyNameY}`]))
            .rangeRound([marginTop, height - marginBottom])
            .padding(0.1);

        const format = x.tickFormat(20, "");

        const svg = d3
            .select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height])
            .attr("style", "max-width: 100%; height: auto;");

        svg.append("g")
            .attr("fill", "steelblue")
            .selectAll()
            .data(data)
            .join("rect")
            .attr("x", x(0))
            .attr("y", (d) => y(d[`${keyNameY}`]))
            .attr("width", (d) => x(d[`${keyNameX}`]) - x(0))
            .attr("height", y.bandwidth())
            .on("click", function (event, d) {
                onBarClick(d);
            })
            .on("mouseover", function () {
                d3.select(this).style("fill", "orange");
            })
            .on("mouseout", function () {
                d3.select(this).style("fill", function () {
                    return "steelblue";
                });
            });

        svg.append("g")
            .attr("fill", "white")
            .attr("text-anchor", "end")
            .selectAll()
            .data(data)
            .join("text")
            .attr("x", (d) => x(d[`${keyNameX}`]))
            .attr("y", (d) => y(d[`${keyNameY}`]) + y.bandwidth() / 2)
            .attr("dy", "0.35em")
            .attr("dx", -4)
            .text((d) => format(d[`${keyNameX}`]))
            .call((text) => text.filter(d => x(d[`${keyNameX}`]) - x(0) < 20) // short bars
                .attr("dx", +4)
                .attr("fill", "black")
                .attr("text-anchor", "start"));

        svg.append("g")
            .attr("transform", `translate(0,${marginTop})`)
            .call(d3.axisTop(x).ticks(width / 80, ""))
            .call(g => g.select(".domain").remove())
            .selectAll("text") // Select all text elements in the y-axis
            .style("font-size", "1rem"); // Set the desired font size

        svg.append("g")
            .attr("transform", `translate(${marginLeft},0)`)
            .call(d3.axisLeft(y).tickSizeOuter(0))
            .selectAll("text") // Select all text elements in the y-axis
            .style("font-size", "1rem"); // Set the desired font size
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, props.keyNameX, props.keyNameY, props.width])

    return (
        <svg className="tw-text-xl" ref={svgRef}></svg>
    )
}

HorizontalBarChart.propTypes = {
    data: PropTypes.array,
    onBarClick: PropTypes.func,
    width: PropTypes.number,
    keyNameX: PropTypes.string,
    keyNameY: PropTypes.string,
}

export default HorizontalBarChart;