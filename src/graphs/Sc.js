import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
// import {axis} from "d3-axis";
// import d3_axis from 'd3-axis'
import * as d3Axis from "d3-axis";
import Axis from "../components/AxisScatter";

// const settings = {
//     width: 500,
//     height: 300,
//     padding: 30,
//     numDataPoints: 50,
//     maxRange: () => Math.random() * 1000
//   };

class Axis1 extends React.Component {
  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    const node = React.findDOMNode(this.refs.axisContainer);
    var axis;
    if (this.props.orient) {
      axis = d3Axis[`axis${this.props.orient}`]()
        // .orient(this.props.orient)
        .ticks(5)
        .scale(this.props.scale);
    } else {
      axis = d3Axis[`axis${this.props.orient}`]()
        // .orient(this.props.orient)
        .ticks(5)
        .scale(this.props.scale);
    }

    d3.select(node).call(axis);
  }

  render() {
    return (
      <g
        className="axis"
        ref="axisContainer"
        transform={this.props.translate}
      />
    );
  }
}

class XYAxis extends React.Component {
  render() {
    // const xScale2 = d3
    // .scaleLinear()
    // .domain([0, 30])
    // .range([0, 200])

    return (
      <g className="xy-axis">
        <Axis
          x={0}
          y={this.props.height - this.props.padding}
          scale={this.props.xScale}
          label={"sd"}
          type="Bottom"
        />
		<Axis
          x={this.props.padding}
          y={0}
          scale={this.props.yScale}
          label={"sd"}
          type="Left"
        />

        {/* <Axis
            translate={`translate(0, ${this.props.height - this.props.padding})`}
            scale={this.props.xScale}
            orient="bottom"
          /> */}
        {/* <Axis
            translate={`translate(${this.props.padding}, 0)`}
            scale={this.props.xScale}
            orient="left"
          /> */}
      </g>
    );
  }
}

class DataCircles extends React.Component {
  renderCircle(coords) {
    return (
      <circle
        cx={this.props.xScale(coords[0])}
        cy={this.props.yScale(coords[1])}
        r={8}
        style={{ fill: "#fa7070" }}
		key={Math.random() * 1}
		onMouseMove = {(e) => {
			d3.select(".bubbleChartTooltip")
			   .style("visibility","visible")
			   .text("" + " (" +coords[0]+","+coords[1]+")")
			   .attr('x',(e.nativeEvent.offsetX -5) + "px")
			   .attr('y',(e.nativeEvent.offsetY - 10) + "px")
		}}

		onMouseOut = {() => {
			d3.select(".bubbleChartTooltip")
				.style("visibility","hidden")
		}}
      />
    );
  }

  render() {
    return <g>{this.props.data.map(this.renderCircle.bind(this))}</g>;
  }
}

class ScatterPlot extends React.Component 
{
  getXScale() 
  {
    const xMax = d3.max(this.props.data, d => d[0]);

    return d3
      .scaleLinear()
      .domain([0, xMax])
      .range([this.props.padding, this.props.width - this.props.padding * 2]);
  }

  getYScale() 
  {
    const yMax = d3.max(this.props.data, d => d[1]);

    return d3
      .scaleLinear()
      .domain([0, yMax])
      .range([this.props.height - this.props.padding, this.props.padding]);
  }

  render() 
  {
    const xScale = this.getXScale();
	const yScale = this.getYScale();
	const tooltip = <text fill="#fff" fontSize="14" className="bubbleChartTooltip" style={{'visibility':'hidden'}}>tooltip</text>
	

    return (
      <svg width={this.props.width} height={this.props.height}>
        <DataCircles xScale={xScale} yScale={yScale} {...this.props} />
        <XYAxis xScale={xScale} yScale={yScale} {...this.props} />
		{tooltip}
      </svg>
    );
  }
}
export default ScatterPlot;
