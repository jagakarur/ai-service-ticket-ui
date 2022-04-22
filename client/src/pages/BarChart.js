// BarChart.js
import * as d3 from 'd3';
import React, { useEffect, useState } from 'react';

function BarChart({ width, height, data }) {


    useEffect(() => {
      d3.select("#barChart2").selectAll("svg").remove();
        // set the dimensions of the canvas
        const width = 500,
        height = 250,
        margin = {
          top: 20,
          left: 100,
          right: 40,
          bottom: 40
        };
      
      // Now, we don't use 0 as a minimum, but get it from the data using d3.extent
      const x = d3.scaleLinear()
        .domain(d3.extent(data.map(d => d.value)))
        .range([0, width]);
      
      const y = d3.scaleBand()
        .domain(data.map(d => d.key))
        .range([height, 0])
        .padding(0.1);
      
      const svg = d3.select("#barChart2").append("svg")
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);
      
      const g = svg
        .append('g')
        .attr('transform', `translate(${margin.left} ${margin.right})`);
      
      const bars = g.append('g')
        .selectAll('rect')
        .data(data);
      
      bars.exit().remove();
      
      bars.enter()
        .append('rect')
        .merge(bars)
        // All the same until here
        // Now, if a bar is positive it starts at x = 0, and has positive width
        // If a bar is negative it starts at x < 0 and ends at x = 0
        .attr('x', d => d.value > 0.0 ? x(0.0) : x(d.value + 0.0))
        .attr('y', d => y(d.key))
        // If the bar is positive it ends at x = v, but that means it's x(v) - x(0) wide
        // If the bar is negative it ends at x = 0, but that means it's x(0) - x(v) wide
        .attr('width', d => d.value + 0.0 > 0.0 ? x(d.value + 0.0) - x(0.0) : x(0.0) - x(d.value + 0.0))
        .attr('height', y.bandwidth())
        // Let's color the bar based on whether the value is positive or negative
        .attr('fill', d => d.value > 0.0 ? 'darkgreen' : 'darkred')
      
      g.append('g')
        .classed('x-axis', true)
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x))
      
      g.append('g')
        .classed('y-axis', true)
        .call(d3.axisLeft(y))


    }, [])


    return (
        <div className="chart">
            {/* <svg id="BarChart" width={350} height={350}><path /></svg> */}


            <div id="barChart2"></div>

        </div>



    )

}

export default BarChart;