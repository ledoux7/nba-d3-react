import React from "react";
import * as d3 from "d3";

import Axis from "../components/AxisScatter";

class Scatterplot extends React.PureComponent {
  
  
  
  // var xmax = d3.max(this.props.xdata)
  
  state = {
    xScale: d3
      .scaleLinear()
      .domain([0, d3.max(this.props.xdata)])
      .range([0,this.props.width ]),
    yScale: d3
      .scaleLinear()
      .domain([0, d3.max(this.props.ydata)])
      .range([this.props.height, 0])
  };
  

  static getDerivedStateFromProps(props, state) {
    const { yScale, xScale } = state;

    // yScale.range([props.height, 0]);
    // xScale.range([0, props.width]);

    return {
      ...state,
      yScale,
      xScale
    };
  }

  render() {
    const { x, y, data, height, datapoint,xdata,ydata, } = this.props,
      { yScale, xScale } = this.state;

    if (ydata.length === xdata.length)
    {
        var i, out = [];//literal new array
        for(i=0;i<xdata.length;i++)
        {
            out.push([xdata[i],ydata[i]]);
        }
      }
      else if (ydata.length > xdata.length){
        var i, out = [];//literal new array
        for(i=0;i<xdata.length;i++)
        {
            out.push([0,ydata[i]]);
        }

      }
      else if (ydata.length < xdata.length){

        var i, out = [];//literal new array
        for(i=0;i<xdata.length;i++)
        {
          out.push([xdata[i],0]);
        }

      }

        return (
            <g transform={`translate(${x}, ${y})`}>
              {out.map(([x, y]) => datapoint({ x: xScale(x), y: yScale(y) }))}
              <Axis x={0} y={0} scale={yScale} type="Left" />
              <Axis x={0} y={height} scale={xScale} type="Bottom" />
            </g>
          );
    

    
  }
}

export default Scatterplot;