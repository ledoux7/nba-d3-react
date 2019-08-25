
import React, { Component } from 'react'
// import './App.css'
import { scaleLinear } from "d3-scale"
import { max } from 'd3-array'
import { select } from 'd3-selection'
import * as d3 from "d3";




class BubbleChart extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bubbleChartData: []
        }
    }

  simulation(bubbleChartData){
      let maxRadius = d3.max(bubbleChartData,function (d) {
          return d.count;
      });
      let minRadius = d3.min(bubbleChartData,function (d) {
          return d.count;
      });
      let radiusScale = d3.scaleSqrt().domain([minRadius,maxRadius]).range([5,40]);
      let self = this;

      self.tick = d3.forceSimulation()
          .nodes(bubbleChartData)
          .force("xTowardsTheCenter",d3.forceX(0).strength(0.01))
          .force("yTowardsTheCenter",d3.forceY(100).strength(0.01))
          .force("collide",d3.forceCollide(function(d){
              return radiusScale(d.count);
          }))
          .on("tick",ticked);

// simulation.nodes([nodes]) adds properties to data.
    function ticked(){
        self.setState({
            bubbleChartData: bubbleChartData
        })
    }
    }
//
    componentWillReceiveProps(nextProps){
        this.setState({
            bubbleChartData: nextProps.bubbleChartData
        },function () {
            this.simulation(this.state.bubbleChartData)
        })
    }
    componentWillMount(){
        this.setState({
            bubbleChartData: this.props.bubbleChartData
        },function () {
            this.simulation(this.state.bubbleChartData)
        })
    }

    render() {
      const margins = {top: 20,right: 50,bottom: 20, left: 50},
          svgDimensions = {width: window.screen.width/2, height: window.screen.height/2 };

        const tooltip = <text fill="#fff" fontSize="14" className="bubbleChartTooltip" style={{'visibility':'hidden'}}>tooltip</text>
        return (
              <svg width={svgDimensions.width} height={svgDimensions.height}>
                <g className="bubbleChartGroup" transform={`translate(${svgDimensions.width/2},${svgDimensions.height/2 - 50})`}>
                    {Circle(this.state.bubbleChartData)}
                </g>
                  {tooltip}
              </svg>
        );
    }
}

export default BubbleChart;