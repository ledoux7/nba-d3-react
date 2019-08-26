import React, { Component } from 'react'
// import './App.css'
import { scaleLinear } from "d3-scale"
import { max } from 'd3-array'
import { select } from 'd3-selection'

class BarChart extends Component {
   constructor(props){
      super(props)
      this.createBarChart = this.createBarChart.bind(this)
   }
   componentDidMount() {
      this.createBarChart()
   }
   componentDidUpdate() {
      this.createBarChart()
   }
   createBarChart() {
      const data = this.props.data
      const node = this.node
      const names = data.map(p => p.player)
      const dataMax = max(data.map(p => p.sumPlayer))
      const yScale = scaleLinear()
         .domain([0, dataMax])
         .range([0, this.props.size[1]-15])

      // const yScaleText = scaleLinear()
      //    .domain([0, dataMax ])
      //    .range([0, this.props.size[1]+ 16])


   select(node)
      .selectAll('rect')
      .data(data.map(p => p.sumPlayer))
      .enter()
      .append('rect')
   
   select(node)
      .selectAll('rect')
      .data(data.map(p => p.sumPlayer))
      .exit()
      .remove()

      select(node)      
      .selectAll('text')
      // .data(this.props.data)
      // .exit()
      .remove()


   
   select(node)
      .selectAll('rect')
      .data(data.map(p => p.sumPlayer))
      .style('fill', '#fe9922')
      .attr('x', (d,i) => i * 38)
      .attr('y', d => this.props.size[1] - yScale(d))
      .attr('height', d => yScale(d))
      .attr('width', 34)




   select(node)
      .selectAll('text')

         .data(data,d=> d)
         .enter()
         .append("text")
         .text((d) =>d.player[0]+d.player[1])// + d.player[0])
         .attr("x", (d, i) => i * 38)
         .attr("y", (d, i) => this.props.size[1] - yScale(d.sumPlayer) -3 )
         // .attr("y", (d, i) => this.props.size[1] +10 )


    

   }
render() {
      return <svg ref={node => this.node = node}
      width={this.props.size[0]+100} height={this.props.size[1]+100}>
      </svg>
   }
}
export default BarChart