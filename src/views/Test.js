import React, { Component } from 'react'
// import './App.css'
import { scaleLinear } from "d3-scale"
import { max } from 'd3-array'
import { select } from 'd3-selection'
import * as d3 from "d3";

/********************* BubbleChart start ***************************/

/********************* BubbleChart end ***************************/


/********************* RangeSlider start ***************************/
const rng = [2000, 2105]

class Axis extends React.Component {
    componentDidMount() {
        this.renderAxis();
    }
    renderAxis() {
        const { svgDimensions, margins, textcolor } = this.props
        const xValue = (svgDimensions.width - margins.left - margins.right) / 10;
        d3.select(this.axisElement)
            .call(d3.axisBottom()
                .scale(this.props.xScale)
                .ticks(6)
                .tickFormat(d3.format(""))
                //.styles("d","yellow")
            )
            .selectAll("text")
            .style("font-size", "10px")
            .style("fill", "black")
            .attr("x", xValue)

        d3.select(this.axisElement).selectAll("line").attr("stroke", "black")
        d3.select(this.axisElement).select("path").style("d", "none")
        // d3.select(this.axisElement).select("path").style("stroke","yellow")
        // 
    }
    render() {
        return (
            //   <g className="rangeSliderAxis" textcolor="blue" transform="translate(0,10)" ref={el => this.axisElement = el } />
            <g></g>
        )
    }
}















// const xScale = d3.scaleLinear()
//     .domain(rng)
//     .range([50,window.screen.width/2 - 50])
//     .clamp(true);


// let h1 = xScale(2013), 
// let h2 = xScale(2015);
// let tempH1 = xScale(2013), tempH2 = xScale(2015);
// let trueYear1 = 2013, trueYear2 = 2015;

class Handle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            handle: '',
            h1: null,
            h2: null,
            tempH1: null,
            tempH2: null,
            trueYear1: null,
            trueYear2:null
        }
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
            this.state.h1 = xScale(initialValue);
            this.state.tempH1 = xScale(initialValue);
            this.state.trueH1 = initialValue;

            this.state.h2 = xScale(other);
            this.state.tempH2 = xScale(other);
            this.state.trueH2 = other;


        }
        else if (handle === "handle2")
        {
            this.state.h1 = xScale(other);
            this.state.tempH1 = xScale(other);
            this.state.trueH1 = other;

            this.state.h2 = xScale(initialValue);
            this.state.tempH2 = xScale(initialValue);
            this.state.trueH2 = initialValue;
            


        }

        return <g className={handle} transform={`translate(${xScale(initialValue)},0)`}
            onMouseOver={this.onMouseOver.bind(this)}>{circle}</g>
    }



    componentDidUpdate(prevProps, prevState) {
        // let {margins,data,svgDimensions,onChangeYear,initialValue} = prevProps;
        let {margins,data,svgDimensions,onChangeYear,xScale,initialValue, other} = prevProps;

        // let { margins,data, svgDimensions, xScale, onChangeYear } = prevProps;


        const minData = d3.min(data), maxData = d3.max(data)

        // const xScale = d3.scaleLinear()
        // .domain([minData, maxData])
        // .range([50,window.screen.width/2 - 50])
        // .clamp(true);


        // if (this.state.h1 === null  )
        // {
        //     // var h1 = xScale(initialValue);
            
        //     this.state.tempH1 =xScale(initialValue);

        //     this.state.rueYear1 = initialValue;

        //     this.state.h1 = xScale(initialValue);

        //     // this.state.h2 = xScale(other);

        //     this.state.tempH2 = xScale(other);
        //     this.state.trueYear2 = other;

        //     this.state.h2 = xScale(other);

        // }

        // if (this.state.h1 === null &&(this.state.handle === "handle1") )
        // {
        //     var h1 = xScale(initialValue);
            
        //     var tempH1 =xScale(initialValue);

        //     var trueYear1 = initialValue;

        //     this.state.h1 = xScale(initialValue);

        // }
        // else if ((this.state.h2 === null) && (this.state.handle === "handle2")) {

        //     var h2 = xScale(initialValue);

        //     var tempH2 = xScale(initialValue);
        //     var trueYear2 = initialValue;

        //     this.state.h2 = xScale(initialValue);

        // }




        let mouseValue, trueMouseValue, self = this;
        let handle = this.state.handle;
        let minWidth = 2//((window.screen.width/2 - margins.left - margins.right)/5);
        // let minWidth = ((window.screen.width/2 - margins.left - margins.right)/10);


        const drag = d3.drag()
            .on("drag", draged).on("end", dragend);

        d3.select(".rangeSliderGroup").call(drag);

        function draged() {
            mouseValue = d3.mouse(this)[0];
            trueMouseValue = getTrueMouseValue(mouseValue);

            handle === "handle1" ? this.state.h1 = mouseValue : this.state.h2 = mouseValue;

            if ((this.state.h2 - this.state.h1) > minWidth && mouseValue > margins.left && mouseValue < (svgDimensions.width - margins.right)) {
                d3.select("." + self.state.handle).attr("transform", "translate(" + mouseValue + ",0)");
                if (handle === "handle1") {
                    this.state.tempH1 = mouseValue;
                    this.state.trueH1 = trueMouseValue;
                } else {
                    this.state.tempH2 = mouseValue
                    this.state.trueH2 = trueMouseValue;
                }
            }
            else {
                this.state.h1 = this.state.tempH1;
                this.state.h2 = this.state.tempH2;
                handle === "handle1" ? trueMouseValue = this.state.trueH1 : trueMouseValue = this.state.trueH2;
            }
            d3.select(".rangeBarFilled").remove();
            d3.select(".rangeSliderGroup")
                .insert("line", ".rangeSliderAxis")
                .attr("x1", this.state.h1)
                .attr("x2", this.state.h2)
                .attr("y1", 0)
                .attr("y2", 0)
                .attr("class", "rangeBarFilled")

        }
        function dragend() {
            this.state.h1 = xScale(getTrueMouseValue(this.state.tempH1));
            this.state.h2 = xScale(getTrueMouseValue(this.state.tempH2));
            if (self.state.handle === "") {

            }
            else {
                d3.select("." + self.state.handle).attr("transform", "translate(" + xScale(trueMouseValue) + ",0)");
                d3.select(".rangeBarFilled").remove();
                d3.select(".rangeSliderGroup")
                    .insert("line", ".rangeSliderAxis")
                    .attr("x1", xScale(this.state.trueH1))
                    .attr("x2", xScale(this.state.trueH2))
                    .attr("y1", 0)
                    .attr("y2", 0)
                    .attr("class", "rangeBarFilled");

                onChangeYear(this.state.trueH1, this.state.trueH2);
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
        svgDimensions = { width: window.screen.width / 2, height: window.screen.height / 6 };

    const minData = d3.min(data), maxData = d3.max(data)

    const xScale = d3.scaleLinear()
        .domain([minData, maxData])
        .range([margins.left, svgDimensions.width - margins.right])
        .clamp(true);

    const i1 = left, i2 = right

    const RangeBar = <line x1={margins.left} y1="0" x2={svgDimensions.width - margins.right} y2="0" className="rangeBar" />
    const RangeBarFilled = <line x1={xScale(i1)} y1="0" x2={xScale(i2)} y2="0" className="rangeBarFilled" />

    return <svg className="rangeSliderSvg" width={svgDimensions.width} height={svgDimensions.height}>
        <g className="rangeSliderGroup" transform={`translate(0,${svgDimensions.height - margins.bottom - 40})`}>
            {RangeBar}{RangeBarFilled}
            <Axis margins={margins} svgDimensions={svgDimensions} xScale={xScale} />


            <Handle onChangeYear={onChangeYear} handle="handle1" initialValue={i1} other={i2} data={data} xScale={xScale} margins={margins} svgDimensions={svgDimensions} />
            <Handle onChangeYear={onChangeYear} handle="handle2" initialValue={i2} other={i1}  data={data} xScale={xScale} margins={margins} svgDimensions={svgDimensions} />
        </g>
    </svg>;
}
/********************* RangeSlider end ***************************/
export default RangeSlider;


// class Charts extends React.Component{
//   constructor(){
//     super();
//     this.state = {
//         rangeSliderData : '',
//         bubbleChartData : []
//     }
//   }
//   componentWillMount(){
//     this.setState({
//         rangeSliderData: {
//             initialValue1 : 2013,
//             initialValue2 : 2015
//         }
//        
//     });
//   }

//   handleChangeYear(year1,year2){
//       this.setState({
//           left: year1,
//           right: year2
//           
//       })
//   }

//   render(){
//     const width = window.screen.width/2, height = window.screen.height;

//     return <div className="charts" style={{width: width , margin: '0 auto'}}>
//           <div className="rangeSlider" >
//           {/* <div className="rangeSlider" style={{background: '#343042'}}> */}
//               <h1>dsad</h1>
//             <RangeSlider onChangeYear={this.handleChangeYear.bind(this)} data={this.state.rangeSliderData}/>
//           </div>
//           {/* <div className="bubbleChart" style={{background: '#403c52'}}> */}
//           <div className="bubbleChart" >

//             {/* <BubbleChart bubbleChartData={this.state.bubbleChartData}/> */}
//             left: {this.state.left}
//             <br></br>
//             right: {this.state.right}


//           </div>
//       </div>;
//   }
// }
// export default Charts;
// const mountingPoint = document.createElement('div');
// mountingPoint.className = 'react-app';
// document.body.appendChild(mountingPoint);

// ReactDOM.render(
//   <Charts />,
//   mountingPoint
// )
