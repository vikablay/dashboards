import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { getUsersAndMinutes } from "../lib/get-user-and-minutes";
import { d3Data } from "./data";

export const D3Bar = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  const margin = { top: 0, right: 100, bottom: 30, left: 100 };
  const width = 800 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const buildGraph = () => {
    const svg = d3.select(svgRef.current);
    const xScale = d3.scaleBand().domain(names).range([0, width]).padding(0.5);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(getUsersAndMinutes(d3Data), (d) => d.minutes)!])
      .range([height, 0]);

    svg
      .selectAll(".bar")
      .data(getUsersAndMinutes(d3Data))
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.user.name)!)
      .attr("y", (d) => yScale(d.minutes))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(d.minutes))
      .attr("transform", "translate(30, 10)")
      .attr("fill", "steelblue");

    // Create x-axis
    const xAxis = d3.axisBottom(xScale);
    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(30,${height + 10})`)
      .call(xAxis);

    // Create y-axis
    const yAxis = d3.axisLeft(yScale);
    svg
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", "translate(30, 10)")
      .call(yAxis);
  };

  useEffect(() => {
    buildGraph();
  }, []);

  const names = getUsersAndMinutes(d3Data).map((item) => item.user.name);

  return (
    <div style={{ padding: "10px" }}>
      <h5>Списание времени в минутах на codeReview за сентябрь</h5>
      <svg
        ref={svgRef}
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
      />
    </div>
  );
};
