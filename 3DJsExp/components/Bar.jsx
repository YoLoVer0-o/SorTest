import { useEffect, useRef } from "react";
import * as d3 from "d3";

const BarChart = () => {
  const svgRef = useRef(null);
  //////////////////////////Data///////////////////////////////////////
  useEffect(() => {
    const data = [
      { name: "A", value: 1 },
      { name: "B", value: 5 },
      { name: "C", value: 3 },
      { name: "D", value: 7 },
      { name: "E", value: 2 },
      { name: "F", value: 4 },
    ];
    ///////////////////////Width Height Bar//////////////////////////////
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 740 - margin.left - margin.right;
    const height = 460 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
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

    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => x(d.name))
      .attr("y", (d) => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.value))
      .style("fill", "steelblue")
      .on("mouseover", function () {
        d3.select(this).style("fill", "orange");
      })
      .on("mouseout", function () {
        d3.select(this).style("fill", "steelblue");
      });

    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append("g").attr("class", "y-axis").call(d3.axisLeft(y));


  }, []);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default BarChart;
