// BarChart.js
import * as d3 from 'd3';
import React, { useEffect, useState } from 'react';

function BarChart({ width, height, data }) {


    useEffect(() => {
        // set the dimensions of the canvas
        var margin = { top: 20, right: 20, bottom: 70, left: 40 },
            width = 600 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;
         var color = d3.scaleOrdinal().range(["#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

        let x = d3.scaleBand()
                .range([0, width])
                .padding(0.1)

        let y = d3.scaleLinear()
                .range([height,0])

        // Generate the x and y Axis based on these scales
        let xAxis = d3.axisBottom(x)
        let yAxis = d3.axisLeft(y)

        // add the SVG element
        var svg = d3.select("#barChart2").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
                data.forEach(function(d) {                 
                    d.value = +d.value;
                });
                
              // scale the range of the data
              x.domain(data.map(function(d) { return d.key; }));
              y.domain([0, d3.max(data, function(d) { return d.value; })]);
            
              // add axis
              svg.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + height + ")")
                  .call(xAxis)
                .selectAll("text")
                  .style("text-anchor", "end")
                  .attr("dx", "-.8em")
                  .attr("dy", "-.55em")
                  .attr("transform", "rotate(-90)" );
            
              svg.append("g")
                  .attr("class", "y axis")
                  .call(yAxis)
                .append("text")
                  .attr("transform", "rotate(-90)")
                  .attr("y", 5)
                  .attr("dy", ".71em")
                  .style("text-anchor", "end")
                  .text("Frequency");
            
            
              // Add bar chart
              svg.selectAll("bar")
                  .data(data)
                .enter().append("rect")
                  .attr("class", "bar")
                  .style("fill", function(d, i){
                    return color(i);
                   })
                  .attr("x", function(d) { return x(d.key); })
                  .attr("width", x.bandwidth() -1 )
                  .attr("y", function(d) { return y(d.value); })
                  .attr("height", function(d) { return height - y(d.value); })
                  .text(function(d, i) {
                    return data[i].label;
                  });;



    }, [])


    return (
        <div className="chart">
            {/* <svg id="BarChart" width={350} height={350}><path /></svg> */}


            <div id="barChart2"></div>

        </div>



    )

}

export default BarChart;