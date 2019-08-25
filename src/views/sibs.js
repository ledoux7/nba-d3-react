
import React, { Component } from 'react'
// import './App.css'
// import { scaleLinear } from "d3-scale"
import { max } from 'd3-array'
import { select } from 'd3-selection'
import * as d3 from "d3";
import { range } from 'd3-array';
import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';

import Axis from "../components/AxisRange"
// import Axis from "../components/AxisScatter"


class Axis1 extends React.Component {
    componentDidMount() {
        this.renderAxis();
    }
    renderAxis() {
        const { svgDimensions, margins, textcolor,data } = this.props
        const xValue = (svgDimensions.width - margins.left - margins.right) / 10;

        const xScale = d3.scaleLinear()
        .domain([0, 40])

        // .domain([d3.min(data),d3.max(data)])

        .range([margins.left, svgDimensions.width - margins.right])

        d3.select(this.axisElement)
            .call(d3.axisBottom()
                .scale(xScale)
                .ticks(10)
                // .tickValues([17,30])
                // .tickFormat(d3.format(""))
                //.styles("d","yellow")
            )
            .selectAll("text")
            .style("font-size", "10px")
            .style("fill", "black")
            .attr("x", xValue)

        d3.select(this.axisElement).selectAll("line").attr("stroke", "black")
        // d3.select(this.axisElement).select("path").style("d", "none")
        d3.select(this.axisElement).select("path").style("stroke","black")


        // var scale = d3.scaleLinear()
        // .range([20, 480])
        // .domain([0, 3]);

        // var axis = d3.axisBottom(scale)
        // .tickValues(d3.range(scale.domain()[0], scale.domain()[1] + 1, 1))
        // .tickFormat(function(d) {
        //     return ~~d;
        // });
        // 


    //     select(node)
    //   .selectAll('text')

    //      .data(this.props.data)
    //      .enter()
    //      .append("text")
    //      .text((d) => d)
    //      .attr("x", (d, i) => i * 38)
    //      .attr("y", (d, i) => this.props.size[1] - yScale(d) -3 )
    }
    render() {
        return (
              <g className="rangeSliderAxis" textcolor="blue" transform="translate(0,10)" ref={el => this.axisElement = el } />

            //   <g className="rangeSliderAxis" textcolor="blue" transform="translate(0,10)" ref={el => axis = el } />

            //   <div>dasda</div>
        )
    }
}







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
    onMouseOver() {
        this.setState({
            handle: this.props.handle

        });
    }
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

        return  <g className={handle} transform={`translate(${xScale(initialValue)},0)`}
                    onMouseOver={this.onMouseOver.bind(this)}>{circle}
                        </g>

        // return <div>
        //             <div> <button onClick={this.handleClick}>
        //                     {this.state.isToggleOn ? 'ON' : 'OFF'}
        //                 </button>  
        //             </div>
                    
                    
        //             {handle}:<br></br>H1: {h1}<br></br> H2: {h2}

        //             <g className={handle} transform={`translate(${xScale(initialValue)},0)`}
        //                     onMouseOver={this.onMouseOver.bind(this)}>{circle}
        //             </g>

        //         </div>
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
        let {handle,margins,data,svgDimensions,onChangeYear,xScale,initialValue, other} = this.props;

        // let { margins,data, svgDimensions, xScale, onChangeYear } = prevProps;


        // const minData = d3.min(data), maxData = d3.max(data)

        if (handle === "handle1")
        {
            // a = other +5
            var h1 = xScale(initialValue);
            var h2 = xScale(other);   
            var tempH1 = xScale(initialValue);
            var tempH2 = xScale(other);   
            var trueH1 = initialValue 
            var trueH2 = other    
        }
        
        else if (handle === "handle2")
        {
            var h1 = xScale(other);   
            var h2 = xScale(initialValue);
            var tempH1 = xScale(other);   
            var tempH2 = xScale(initialValue);
            var trueH1 = other    
            var trueH2 = initialValue 
        }


        let mouseValue, trueMouseValue, self = this;
        // let handle = this.props.handle;
        let minWidth = 10//((window.screen.width/2 - margins.left - margins.right)/5);
        // let minWidth = ((window.screen.width/2 - margins.left - margins.right)/10);


        const drag = d3.drag()
            .on("drag", draged).on("end", dragend);

        d3.select(".rangeSliderGroup").call(drag);

        function draged() {
            mouseValue = d3.mouse(this)[0];
            trueMouseValue = getTrueMouseValue(mouseValue);

            handle === "handle1" ? h1 = mouseValue : h2 = mouseValue;

            if ((h2 - h1) > minWidth && mouseValue > margins.left && mouseValue < (svgDimensions.width - margins.right)) {
                d3.select("." + handle).attr("transform", "translate(" + mouseValue + ",0)");
                if (handle === "handle1") {
                    tempH1 = mouseValue;
                    trueH1 = trueMouseValue;
                } else {
                    tempH2 = mouseValue
                    trueH2 = trueMouseValue;
                }
            }
            else {
                h1 = tempH1;
                h2 = tempH2;
                handle === "handle1" ? trueMouseValue = trueH1 : trueMouseValue = trueH2;
            }
            d3.select(".rangeBarFilled").remove();
            d3.select(".rangeSliderGroup")
                .insert("line", ".rangeSliderAxis")
                .attr("x1", h1)
                .attr("x2", h2)
                .attr("y1", 0)
                .attr("y2", 0)
                .attr("class", "rangeBarFilled")

        }
        function dragend() {
            h1 = xScale(getTrueMouseValue(tempH1));
            h2 = xScale(getTrueMouseValue(tempH2));
            if (self.state.handle === "") {
                
            }
            else {
                d3.select("." + self.state.handle).attr("transform", "translate(" + xScale(trueMouseValue) + ",0)");
                d3.select(".rangeBarFilled").remove();
                d3.select(".rangeSliderGroup")
                    .insert("line", ".rangeSliderAxis")
                    .attr("x1", xScale(trueH1))
                    .attr("x2", xScale(trueH2))
                    .attr("y1", 0)
                    .attr("y2", 0)
                    .attr("class", "rangeBarFilled");

                onChangeYear(trueH1, trueH2);
            }


        }
        function getTrueMouseValue(mouseValue) {
            // const a = xScale.invert(mouseValue) * 10
            // return Math.round(a) / 10;


            const a = xScale.invert(mouseValue) 
            return Math.round(a) ;
        }
    }
}


const RangeSlider = ({ data, onChangeYear, left, right }) => {
    const margins = { top: 20, right: 50, bottom: 20, left: 50 },
        svgDimensions = { width: 400, height: 150 };

    const minData = d3.min(data), maxData = d3.max(data)

    const xScale = d3.scaleLinear()
        .domain([minData, maxData])
        .range([margins.left, svgDimensions.width - margins.right])
        .clamp(true);

    const i1 = left, i2 = right

    const RangeBar = <line x1={margins.left} y1="0" x2={svgDimensions.width - margins.right} y2="0" className="rangeBar" />
    const RangeBarFilled = <line x1={xScale(i1)} y1="0" x2={xScale(i2)} y2="0" className="rangeBarFilled" />

    // return (
    //     <div>   

    //         {/* <Handle onChangeYear={onChangeYear} handle="handle1" initialValue={i1} other={i2}  /> */}
    //         <Handle onChangeYear={onChangeYear} handle="handle1" initialValue={i1} other={i2} data={data} xScale={xScale} margins={margins} svgDimensions={svgDimensions} />
    //         <br></br>
    //         {/* <Handle onChangeYear={onChangeYear} handle="handle2" initialValue={i2} other={i1}  /> */}
    //     </div>
    // )

    const xScale12 = d3.scaleLinear()
    .domain([minData, maxData])
    .range([margins.left, svgDimensions.width - margins.right])
    // .clamp(true);
    // data = data.splice(0, 1, 1);
    
    var sorted = data.map(d => d).sort(function(a, b){return a-b})
    const xScale1 = scaleBand()
                    .domain(sorted)
                    // .domain([0,40])

                    // .range([margins.left, svgDimensions.width])
                    .range([margins.left, svgDimensions.width - margins.right])


    // const yScale1 = this.yscale
    //     .domain([0, max(data, d => d.position)])
    //     .range([svgDimensions.height, margins.top])
    const bandSize = xScale1.bandwidth()

    const xProps = {
        orient: 'Bottom',
        scale: xScale1,
        // translate: `translate(-${bandSize/2}, ${svgDimensions.height-100})`,
        translate: `translate(-${bandSize/2-110}, ${8})`,

        tickSize: svgDimensions.height-margins.top,
        tickValues: xScale.domain().filter(function(d,i){ return !(i%4)})
        
      }
    return  <svg className="rangeSliderSvg" width={svgDimensions.width} height={svgDimensions.height}>
    {/* <svg width={500} height={500}> */}

    <g className="rangeSliderGroup" transform={`translate(0,${svgDimensions.height - margins.bottom - 110})`}>
                    <Axis {...xProps} />
                    {RangeBar}{RangeBarFilled}

                    <Handle onChangeYear={onChangeYear} handle="handle1" initialValue={i1} other={i2} data={data} xScale={xScale} margins={margins} svgDimensions={svgDimensions} />
                    <Handle onChangeYear={onChangeYear} handle="handle2" initialValue={i2} other={i1}  data={data} xScale={xScale} margins={margins} svgDimensions={svgDimensions} />
                    </g>
                </svg>
                





//     <svg className="rangeSliderSvg" width={svgDimensions.width} height={svgDimensions.height}>
//     <g className="rangeSliderGroup" transform={`translate(0,${svgDimensions.height - margins.bottom - 40})`}>
//        {/* {RangeBar}{RangeBarFilled} */}
//        {/* <Axis margins={margins} svgDimensions={svgDimensions} xScale={xScale} data={data}/> */}

//         <Axis {...yProps}/>
//         {/* <Handle onChangeYear={onChangeYear} handle="handle1" initialValue={i1} other={i2} data={data} xScale={xScale} margins={margins} svgDimensions={svgDimensions} /> */}
//         {/* <Handle onChangeYear={onChangeYear} handle="handle2" initialValue={i2} other={i1}  data={data} xScale={xScale} margins={margins} svgDimensions={svgDimensions} /> */}
//     </g>
// </svg>;
            
    // return 
    //         <svg className="rangeSliderSvg" width={svgDimensions.width} height={svgDimensions.height}>
    //             <g className="rangeSliderGroup" transform={`translate(0,${svgDimensions.height - margins.bottom - 40})`}>
    //                 {/* {RangeBar}{RangeBarFilled} */}
    //                 {/* <Axis margins={margins} svgDimensions={svgDimensions} xScale={xScale} /> */}
    //                 {/* <Handle handle="handle1" initialValue={i1} other={i2}  />
    //                 <Handle handle="handle2" initialValue={i2} other={i1}  /> */}

    //                 <Handle onChangeYear={onChangeYear} handle="handle1" initialValue={i1} other={i2} data={data} xScale={xScale} margins={margins} svgDimensions={svgDimensions} />
    //                 <Handle onChangeYear={onChangeYear} handle="handle2" initialValue={i2} other={i1}  data={data} xScale={xScale} margins={margins} svgDimensions={svgDimensions} />
    //             </g>
    //         </svg>;
}
/********************* RangeSlider end ***************************/
export default RangeSlider;