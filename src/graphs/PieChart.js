import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Pie = props => {
    const ref = useRef(null);
    const cache = useRef(props.data);
    const createPie = d3
        .pie()
        .value(d => d.sumPlayer)
        .sort(null);
    const createArc = d3
        .arc()
        .innerRadius(props.innerRadius)
        .outerRadius(props.outerRadius);
    const colors = d3.scaleOrdinal(d3.schemeAccent);
    const format = d3.format(".2f");

    useEffect(
        () => {
            const fake = props.fake
            const rawdata = props.data
            const data = createPie(props.data);
            const prevData = createPie(cache.current);
            const group = d3.select(ref.current);
            const groupWithData = group.selectAll("g.arc").data(data);

            groupWithData.exit().remove();
            //   groupWithData.order()

            // text
            // groupWithData.selectAll('g')
            // .exit()
            // .remove()


            //   d3.select()      
            //         .selectAll('legend')
            //         // .data(data)
            //         // .exit()
            //         .remove()
            //     d3.select()      
            //     .selectAll('rect')
            //     // .data(data)
            //     // .exit()
            //     .remove()

            // groupWithData   
            // .selectAll('text')
            // .attr("class", "update")
            // .attr("y", 0)
            // .style("fill-opacity", 1)
            // .transition(t)
            // .attr("x", function(d, i) { return i * 32; })

            const groupWithUpdate = groupWithData
                .enter()
                .append("g")
                .attr("class", "arc");

            const path = groupWithUpdate
                .append("path")
                .merge(groupWithData.select("path.arc"));

            const arcTween = (d, i) => 
            {
                const interpolator = d3.interpolate(prevData[i], d);

                return t => createArc(interpolator(t));
            };

            path
                .attr("class", "arc")
                .attr("fill", (d, i) => colors(i))
                .transition()
                .attrTween("d", arcTween);

            const text = groupWithUpdate
                .append("text")
                .merge(groupWithData.select("text"));

            text
                .attr("text-anchor", "middle")
                .attr("alignment-baseline", "middle")
                .style("fill", "white")
                .style("font-size", 10)
                .transition()
                .attr("transform", d => `translate(${createArc.centroid(d)})`)
                .tween("text", (d, i, nodes) => {
                    const interpolator = d3.interpolate(prevData[i], d);
            

                    // groupWithData
                    // .selectAll('text2')
                    // // .append("text2")
              
                    //    .data(data,d=> d)
                    //    .enter()
                    //    .append("text")
                    //    .text((d) =>d.player)// + d.player[0])
                    //    .attr("x", (d, i) => 200 )
                    // //    .attr("y", (d, i) => this.props.size[1]  -3 )
                    //    .attr("y", (d, i) => i *23 )
            
            // var legend = groupWithUpdate
            //         .append("text")
            //         .merge(groupWithData.select("text"));


            var legend = groupWithUpdate.append("g")
                .attr("class", "legend")
                .attr("x", 200 - 65)
                .attr("y", 0)
                .attr("height", 100)
                .attr("width", 100);

            legend.selectAll('g').exit().remove()

            // legend.selectAll('g').data(fake, d => d.player)
                legend.selectAll('g').data(data)

                // .exit()
                // .remove()
                .enter()
                // .merge(groupWithData.select("text"))
                // .order()
                .append('g')
                .each(function (d, i) {
                    var g = d3.select(this);
                    g.append("rect")
                        .attr("x", 200 - 65)
                        .attr("y", i * 25)
                        .attr("width", 10)
                        .attr("height", 10)
                        // .style("fill", color_hash[String(i)][1]);
                        // .attr("fill", (d, i) => colors(i))
                        .style("fill", colors(i))

                    g.append("text")
                        .attr("x", 200 - 50)
                        .attr("y", i * 25 + 8)
                        .attr("height", 30)
                        .attr("width", 200)
                        // .style("fill", color_hash[String(i)][1])
                        .style("fill", colors(i))

                        // .attr("fill", (d, i) => colors(i))
                        // .attr("fill", (d, i) => colors(d))

                        // .text(format(d.player));
                        .text(d.data.player);

            })


                        // groupWithData.exit().remove();


                    return t => d3.select(nodes[i]).text(format(interpolator(t).value));
                    //   return t => d3.select(nodes[i]).text("dsa: "+format(interpolator(t).value));

                });




            cache.current = props.data;
        },
        [props.data]
    );

    return (
        <svg width={props.width + 200} height={props.height + 200}>
            <g
                ref={ref}
                transform={`translate(${props.outerRadius} ${props.outerRadius})`}
            />
        </svg>
    );
};

export default Pie;
