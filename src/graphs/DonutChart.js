

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
const format = d3.format(".2f")
const formatPerc = d3.format(".0%")


function translate(x, y) {
	return `translate(${format(x)}, ${format(y)})`;
	// return `translate(${x}, ${y})`;
	
	// return 
  }
  
class Slice extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isHovered: false,
			isClicked: false,
			isSelected: false,


		
		};
		this.onMouseClick = this.onMouseClick.bind(this);

		this.onMouseOver = this.onMouseOver.bind(this);
		this.onMouseOut = this.onMouseOut.bind(this);
	}

	onMouseClick() 
	
	{

		if (this.state.isClicked === true)
		{
			this.setState({
				// isHovered: !this.state.isHovered,
				isClicked: false,
				isSelected: false,
	
	
			
			});

			this.props.func(-this.props.piece)
		}
		else{
			this.setState({
				// isHovered: !this.state.isHovered,
				isClicked: true,
				isSelected: true//!this.state.isSelected,
	
	
			
			});
			if (this.state.isSelected ===false)
			{
				this.props.func(this.props.piece)
			}
			

		}
		
	}

	onMouseOver() 
	{
		if (this.state.isClicked === false)
		{
			this.setState({
				isHovered: true,
				isSelected: true
			});
			this.props.func(+this.props.piece)


		}
		
	}
	onMouseOut() {

		if (this.state.isClicked === false)
		{
			this.setState({
				isHovered: false,
				isSelected: false
			});

			if (this.state.isSelected===true)
			{

				this.props.func(-this.props.piece)
			}


		}
	}

	render() 
	{
		let {value,piece, label, fill, innerRadius = 0, outerRadius, cornerRadius, padAngle, ...props} = this.props;
		if (this.state.isSelected) 
		{
			outerRadius *= 1.1;
		}
		let arc = d3.arc()
		.innerRadius(innerRadius)
		.outerRadius(outerRadius)
		.cornerRadius(cornerRadius)
		.padAngle(padAngle);
		var cords= arc.centroid(value)
		
		return (
		<g 
			onMouseOver={this.onMouseOver}
			onClick={this.onMouseClick}
		   	onMouseOut={this.onMouseOut}
			{...props}>
			<path d={arc(value)} fill={fill} />
			<text fill="black"
				// transform={translate(...arc.centroid(value))}
				// transform={`translate(${cords[0]-40},${cords[1]})rotate(-30)`}
				// transform={`translate(${cords[0]-10},${cords[1]-10})`}
				transform={`translate(${cords[0]-28},${cords[1]-15})rotate(-30)`}


				// transform=""

				dy=".35em"
				className="label">
			{/* {format(arc.centroid(value)[0])} */}
			{/* {translate(...arc.centroid(value))} */}

		<tspan x="0" dy="1.2em">{label.split(" ")[0]}</tspan>
		<tspan x="0" dy="1.2em">{label.split(" ")[1]}</tspan>
		<tspan x="0" dy="1.2em">{d3.format(".1f")(piece)}</tspan>

			
			</text>
		</g>
		);
	}
}
  
class Pie extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sum: 0,
			elements: 0,


		
		};
	//   this.colorScale = d3.scale.category10();
	//   this.colorScale = d3.scale.category10();
		this.colorScale = d3.scaleOrdinal(d3.schemeAccent);


		this.renderSlice = this.renderSlice.bind(this);

	}

	render() {
		let {x, y, data} = this.props;
		let pie = d3.pie()
		.value(d => d.sumPlayer)
		// .sort(null);

		if (data.length <= 0)
		{
			var totalSum=0
		}
		else
		{

			var totalSum = data.map(item => item.sumPlayer).reduce((prev, next) => prev + next);
		}

		
		return (
		<g transform={translate(x, y)}>
			{pie(data).map(this.renderSlice)}
			{/* {format(this.state.totalSum)} */}
			{/* {format(32)} */}
			<g>
				{/* <circle cx="50" cy="55" r="45" fill="none" stroke="#F0CE01" strokeWidth="4" /> */}
   					 <text textAnchor="middle" x="0" y="-40" fill="white" style={{"font-family": 'Roboto, sans-serif',"fontSize":24}}
						 >
							
							<tspan x="0" dy="1.2em"> {this.state.sum} </tspan>
							<tspan x="0" dy="1.2em"> {formatPerc(this.state.sum/totalSum)} </tspan>
							{/* <tspan x="0" dy="1.2em"> {d3.format(".1f")(piece)} </tspan> */}
							
							</text>
				</g>
			
		</g>

		);
	}
	selectedValue(x) {
		this.setState({
			sum: this.state.sum + x
		})

	}


	renderSlice(value, i) {
		let {innerRadius, outerRadius, cornerRadius, padAngle} = this.props;
		return (
			<Slice key={i}
					innerRadius={innerRadius}
					outerRadius={outerRadius}
					cornerRadius={cornerRadius}
					padAngle={padAngle}
					value={value}
					label={value.data.player}
					piece={value.data.sumPlayer}
					index={i}
					fill={this.colorScale(i)} 
					func={this.selectedValue.bind(this)}
					
					/>
			);
	}
}
  
class DonutChart extends React.Component {
    render() {
		//   let width = window.innerWidth;
		//   let height = window.innerHeight;
		let width = 400;
		let height = 400//window.innerHeight;
      
		let minViewportSize = Math.min(width, height);
		let radius = (minViewportSize * .9) / 2;
		let x = width / 2;
		let y = height / 2;
	
		return (
			<div>
			<svg width={width} height={height}>
			{/* <svg width="100%" height="100%"> */}

			<Pie x={x}
				y={y}
				innerRadius={radius * .35}
				outerRadius={radius}
				cornerRadius={7}
				padAngle={.02}
				data={this.props.data} />
				{/* <g>
				<circle cx="50" cy="55" r="45" fill="none" stroke="#F0CE01" strokeWidth="4" />
    <text textAnchor="middle" x="250" y="55" fill="red">Circle Text</text>
				</g> */}
			</svg>
			{/* sad */}
			</div>
			
		);
    }
  }

export default DonutChart;