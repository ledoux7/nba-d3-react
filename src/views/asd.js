
import React, { Component } from 'react'
// import './App.css'
import { scaleLinear } from "d3-scale"
import { max } from 'd3-array'
import { select } from 'd3-selection'
import * as d3 from "d3";

class Handle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            handle: '',
            h1: 2,
            h2: 3,
            tempH1: null,
            tempH2: null,
            trueYear1: null,
            trueYear2:null
        }
        this.handleClick = this.handleClick.bind(this);
    }
    // onMouseOver() {
    //     this.setState({
    //         handle: this.props.handle

    //     });
    // }
    render() {
        const { initialValue,other, xScale, handle } = this.props;
        const circle = <circle r="10px" fill="#fa7070" />

        if (handle === "handle1")
        {
            var h1 = initialValue;
            var h2 = other;

        }
        
        else if (handle === "handle2")
        {
            var h1 = other;
            var h2 = initialValue;
        }

        return <div>
                    <div> <button onClick={this.handleClick}>
                            {this.state.isToggleOn ? 'ON' : 'OFF'}
                        </button>  
                    </div>
                    
                    
                    {handle}:<br></br>H1: {h1}<br></br> H2: {h2}


                </div>
    }

    handleClick(prevProps) {
        // let {margins,data,svgDimensions,onChangeYear,xScale,initialValue, other} = prevProps;
        let {margins,data,svgDimensions,onChangeYear,xScale,initialValue, other} = this.props;

        let handle = this.props.handle;


        // this.setState(state => (
        //     {
        //         isToggleOn: !state.isToggleOn,
        //         // h1: this.props.initialValue,
        //         // h2: this.props.other

        //         h1: initialValue,
        //         h2: other +5


        // }));
        var a =0

        if (handle === "handle1")
        {
            // a = other +5
            var h1 = initialValue +2
            var h2 = other 

            
        }
        
        else if (handle === "handle2")
        {
            var h1 = other +2
            var h2 = initialValue +2
        }

        // onChangeYear(this.state.h1,1);
        onChangeYear(h1,h2 );

      }



    componentDidUpdate(prevProps, prevState) {
        // let {margins,data,svgDimensions,onChangeYear,initialValue} = prevProps;
        let {margins,data,svgDimensions,onChangeYear,xScale,initialValue, other} = prevProps;

    }
}


const RangeSlider = ({ data, onChangeYear, left, right }) => {
    const margins = { top: 20, right: 50, bottom: 20, left: 50 },
        svgDimensions = { width: window.screen.width / 2, height: window.screen.height / 6 };

    // const minData = d3.min(data), maxData = d3.max(data)

    // const xScale = d3.scaleLinear()
    //     .domain([minData, maxData])
    //     .range([margins.left, svgDimensions.width - margins.right])
    //     .clamp(true);

    const i1 = left, i2 = right

    // const RangeBar = <line x1={margins.left} y1="0" x2={svgDimensions.width - margins.right} y2="0" className="rangeBar" />
    // const RangeBarFilled = <line x1={xScale(i1)} y1="0" x2={xScale(i2)} y2="0" className="rangeBarFilled" />

    return (
        <div>   

            <Handle onChangeYear={onChangeYear} handle="handle1" initialValue={i1} other={i2}  />
            <br></br>
            <Handle onChangeYear={onChangeYear} handle="handle2" initialValue={i2} other={i1}  />
        </div>
    )
            
    
    // <svg className="rangeSliderSvg" width={svgDimensions.width} height={svgDimensions.height}>
    //     <g className="rangeSliderGroup" transform={`translate(0,${svgDimensions.height - margins.bottom - 40})`}>
    //         {/* {RangeBar}{RangeBarFilled} */}
    //         {/* <Axis margins={margins} svgDimensions={svgDimensions} xScale={xScale} /> */}
    //         <Handle handle="handle1" initialValue={i1} other={i2}  />
    //         <Handle handle="handle2" initialValue={i2} other={i1}  />

    //         {/* <Handle onChangeYear={onChangeYear} handle="handle1" initialValue={i1} other={i2} data={data} xScale={xScale} margins={margins} svgDimensions={svgDimensions} />
    //         <Handle onChangeYear={onChangeYear} handle="handle2" initialValue={i2} other={i1}  data={data} xScale={xScale} margins={margins} svgDimensions={svgDimensions} /> */}
    //     </g>
    // </svg>;
}
/********************* RangeSlider end ***************************/
export default RangeSlider;