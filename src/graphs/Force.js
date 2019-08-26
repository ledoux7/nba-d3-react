import React, { Component } from 'react'
// import '../css/global.css'
// import { scaleLinear } from "d3-scale"
import { max } from 'd3-array'
import { select } from 'd3-selection'
import * as d3 from "d3";
import { range } from 'd3-array';
import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';

// import Axis from "../components/AxisRange"
import Axis from "../components/AxisScatter"



class Force extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            handle: '',
            h1: 2,
            h2: 3,
            tempH1: null,
            tempH2: null,
            trueYear1: null,
            trueYear2: null
        }
        // this.handleClick = this.handleClick.bind(this);
    }

    
    render() {
        const { initialValue, other, xScale, handle } = this.props;
        // const circle = <circle className="handleCircle" r="10px" fill="#fa7070" />
        const circle = <circle r="10px" />


        return <g className={handle} transform={`translate(${xScale(initialValue)},0)`}
            onMouseOver={this.onMouseOver.bind(this)} style={{ fill: "#fa7070" }}   >

            {circle}

        </g>


    }

    componentDidUpdate(prevProps, prevState) 
    {
        // let {margins,data,svgDimensions,onChangeYear,initialValue} = prevProps;
        let { handle, margins, data, svgDimensions, onChangeYear, xScale, initialValue, other } = this.props;



        const drag = d3.drag()
            .on("drag", draged).on("end", dragend);

        d3.select(".rangeSliderGroup" + handle).call(drag);



        function dragstarted(d) 
        {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }
            
        function dragged(d) 
        {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }
            
        function dragended(d) 
        {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

    }
}


// return     <svg width={width} height={height} >
//                 <g className={"rangeSliderGroup"+handle} transform={`translate(0,${20})`}>
//                 <Axis x={0} y={0} scale={xScale2} label={label} type="Bottom" />
//                 {/* {RangeBar} */}
//                 {/* {RangeBarFilled} */}
//                 {/* <Axis margins={margins} svgDimensions={svgDimensions} xScale={xScale} data={data}/> */}
//                     {/* <Axis {...yProps}/> */}
//                     <Handle onChangeYear={onChangeYear} handle={handle}  initialValue={i1}  data={data} xScale={xScale} margins={margins} svgDimensions={svgDimensions} />
//                     {/* <Handle onChangeYear={onChangeYear} handle="handle2" initialValue={i2} other={i1}  data={data} xScale={xScale} margins={margins} svgDimensions={svgDimensions} /> */}
//                 </g>
//     </svg>;



/********************* RangeSlider end ***************************/
export default Force;

var svg = d3.select("svg"),
width = +svg.attr("width"),
height = +svg.attr("height");

var color = d3.scaleOrdinal(d3.schemeCategory20);

var simulation = d3.forceSimulation()
.force("link", d3.forceLink().id(function(d) { return d.id; }))
.force("charge", d3.forceManyBody())
.force("center", d3.forceCenter(width / 2, height / 2));

d3.json("miserables.json", function(error, graph) {
if (error) throw error;

var link = svg.append("g")
  .attr("class", "links")
.selectAll("line")
.data(graph.links)
.enter().append("line")
  .attr("stroke-width", function(d) { return Math.sqrt(d.value); });

var node = svg.append("g")
  .attr("class", "nodes")
.selectAll("g")
.data(graph.nodes)
.enter().append("g")

var circles = node.append("circle")
  .attr("r", 5)
  .attr("fill", function(d) { return color(d.group); })
  .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

var lables = node.append("text")
  .text(function(d) {
    return d.id;
  })
  .attr('x', 6)
  .attr('y', 3);

node.append("title")
  .text(function(d) { return d.id; });

simulation
  .nodes(graph.nodes)
  .on("tick", ticked);

simulation.force("link")
  .links(graph.links);

function ticked() {
link
    .attr("x1", function(d) { return d.source.x; })
    .attr("y1", function(d) { return d.source.y; })
    .attr("x2", function(d) { return d.target.x; })
    .attr("y2", function(d) { return d.target.y; });

node
    .attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")";
    })
}
});



