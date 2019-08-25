import React, { Component } from 'react'
// import './App.css'
import { scaleLinear } from "d3-scale"
import { max } from 'd3-array'
import { select } from 'd3-selection'
import * as d3 from "d3";

// import RangeSlider from "./Test"
import RangeSlider from "./sibs"


class Charts extends React.Component{
    constructor(){
      super();
      this.state = {
          rangeSliderData : '',
          bubbleChartData : [],
          data: [2000, 2100],
          left: 2010,
          right: 2045

      }
    }
    componentWillMount(){
      this.setState({
          rangeSliderData: {
              initialValue1 : 2013,
              initialValue2 : 2015,
            //   data: [2000, 2200]
          }
          
      });
    }
  
    handleChangeYear(year1,year2){
        this.setState({
            left: year1,
            right: year2,
            
        })
    }
  
    render(){
      const width = window.screen.width/2, height = window.screen.height;
  
      return <div className="charts" style={{width: width , margin: '0 auto'}}>
            <div className="rangeSlider" >
            {/* <div className="rangeSlider" style={{background: '#343042'}}> */}
                <h1>dsasd</h1>
              <RangeSlider onChangeYear={this.handleChangeYear.bind(this)} data={this.state.data} left={this.state.left} right={this.state.right}/>
            </div>
            {/* <div className="bubbleChart" style={{background: '#403c52'}}> */}
            <div className="bubbleChart" >
            <br></br>
            <br></br>
  
              {/* <BubbleChart bubbleChartData={this.state.bubbleChartData}/> */}
              left: {this.state.left}
              <br></br>
              right: {this.state.right }
  
  
            </div>
        </div>;
    }
  }
  export default Charts;