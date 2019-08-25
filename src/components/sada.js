class Handle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            handle: '',
            h1: null,
            
        }
    }
    onMouseOver() {
        this.setState({
            handle: this.props.handle
        });
    }
    render() {
        const { initialValue, xScale, handle } = this.props;
        const circle = <circle r="10px" fill="#fa7070" />

        return <g className={handle} transform={`translate(${xScale(initialValue)},0)`}
            onMouseOver={this.onMouseOver.bind(this)}>{circle}</g>
    }



    componentDidUpdate(prevProps, prevState) {
        // let {margins,data,svgDimensions,onChangeYear,initialValue} = prevProps;
        let {margins,data,svgDimensions,onChangeYear,xScale,initialValue} = prevProps;

        // let { margins,data, svgDimensions, xScale, onChangeYear } = prevProps;


        const minData = d3.min(data), maxData = d3.max(data)

        // const xScale = d3.scaleLinear()
        // .domain([minData, maxData])
        // .range([50,window.screen.width/2 - 50])
        // .clamp(true);


        if (this.state.h1 === null  )
        {
            var h1 = xScale(initialValue);
            
            var tempH1 =xScale(initialValue);

            var trueYear1 = initialValue;

            this.state.h1 = xScale(initialValue);

            var h2 = xScale(initialValue+30);

            var tempH2 = xScale(initialValue+30);
            var trueYear2 = initialValue+30;

            this.state.h2 = xScale(initialValue+30);

        }

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

            handle === "handle1" ? h1 = mouseValue : h2 = mouseValue;

            if ((h2 - h1) > minWidth && mouseValue > margins.left && mouseValue < (svgDimensions.width - margins.right)) {
                d3.select("." + self.state.handle).attr("transform", "translate(" + mouseValue + ",0)");
                if (handle === "handle1") {
                    tempH1 = mouseValue;
                    trueYear1 = trueMouseValue;
                } else {
                    tempH2 = mouseValue
                    trueYear2 = trueMouseValue;
                }
            }
            else {
                h1 = tempH1;
                h2 = tempH2;
                handle === "handle1" ? trueMouseValue = trueYear1 : trueMouseValue = trueYear2;
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
                    .attr("x1", xScale(trueYear1))
                    .attr("x2", xScale(trueYear2))
                    .attr("y1", 0)
                    .attr("y2", 0)
                    .attr("class", "rangeBarFilled");

                onChangeYear(trueYear1, trueYear2);
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