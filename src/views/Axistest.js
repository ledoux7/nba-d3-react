// import React from "react";
import * as d3 from "d3";

import Axis from "../components/AxisScatter";

import React, { Component } from 'react';
import BarChart from '../graphs/BarChart'
import { CONFIG } from '../config.js';
// import Scatter from './views/ScatterView'
// import * as d3 from "d3";
import axios from 'axios'
import Dropdown from '../components/Dropdown';
import MultiDropdown from '../components/MultiDropdown';
// import RangeSlider from "./sibs"
import RangeSlider from "../components/RangeSlider"

// import Scatterplot from "../graphs/Scatterplot"
import Datapoint from "../components/Datapoint"



class Scatterplot extends React.PureComponent {
  state = {
    xScale: d3
      .scaleLinear()
      .domain([0, d3.max(this.props.data.map(function(x) { return x[0];}))])
      .range([this.props.width, 0]),

    yScale: d3
      .scaleLinear()
      .domain([0, d3.max(this.props.data.map(function(x) { return x[1];}))])
      .range([this.props.height, 0])
    //   .range([ 0,this.props.height])

  };
  

  static getDerivedStateFromProps(props, state) {
    const { yScale, xScale } = state;

    xScale.range([0, props.width]);
    yScale.range([props.height, 0]);

    return {
      ...state,
      yScale,
      xScale
    };
  }

  render() {
    const { x, y, data, height, datapoint } = this.props,
      { yScale, xScale } = this.state;

    return (
      <g transform={`translate(${x}, ${y})`}>
        {data.map(([x, y]) => datapoint({ x: xScale(x), y: yScale(y) }))}
        <Axis x={0} y={0} scale={yScale} type="Left" />
        <Axis x={0} y={height} scale={xScale} type="Bottom" />


      </g>
    );
  }
}

// export default Scatterplot;


class Main1 extends Component {

    constructor(props) {
        super(props)
        this.state = {
            players: [],
            test: [],
            response: [],
            bardata: [12,25,6,6,9,10],
            width: 600,
            height: 320,
            id: "root",
            error : null,
            isLoaded : false,
            fnames : []   ,
            // data: d3.range(100).map(_ => [Math.random(), Math.random()]),
            data: [[0.1,0.2],[0.3,0.2],[4,2],[3,1]],

            left: 0,
            right: 30,
            location: [
                {
                  id: 0,
                  title: 'New York',
                  selected: false,
                  key: 'location'
                },
                {
                  id: 1,
                  title: 'Dublin',
                  selected: false,
                  key: 'location'
                }
                
              ],

              fruit: [
                {
                  id: 0,
                  title: 'Apple',
                  selected: false,
                  key: 'fruit'
                },
                {
                  id: 1,
                  title: 'Orange',
                  selected: false,
                  key: 'fruit'
                }
              ]
        };
    }



    componentDidMount() {

    const racesRequest = axios.get(CONFIG.API_BASE_URL)
       .then(response =>
           response.data.map((player,index) => ({
               firstname: player.firstname,
               lastname: player.lastname,
               PTS: player.PTS,
               key: 'players',
               selected: true,
               id: index
           }))
            ).then(players => this.setDefault(players))
       
        //


     }

     setDefault = (players) => {
            const uniqFNames = [...new Set(players.map(d => d.firstname))]
            const uniqRaces = [...new Set(players.map(d => d.lastname))]
            // players = uniqRaces.map((y, index) => ({ id: index, raceName: y, selected: false, key: 'races' }))
            // const fnames = uniqFNames.map((y, index) => ({ id: index, firstname: y, selected: false, key: 'fnames' }))
            // seasons[0].selected = true;
            players[0].selected = true;
            // fnames[0].selected = true;

            // this.setState({ players: players, fnames:fnames })
            this.setState({ players: players})

        }

     resetThenSet = (value, key) => 
     {
		let data = [...this.state[key]];
		data.forEach(item => item.selected = false);
        data[value].selected = true;
        

        this.setState({ key: data });
        
    }
    
    filterAndSort_Laps = (selectedRace, selectedSeason, laptimes, filtQ) => {

		var filtered = laptimes.filter(d => (d.raceName === selectedRace.raceName && d.season === selectedSeason.season))
        return filtered

    }
    

    toggleSelected = (id, key) => {
        let temp = JSON.parse(JSON.stringify(this.state[key]))
        temp[id].selected = !temp[id].selected
        this.setState({
          [key]: temp
        })
      }

      handleChangeYear(year1,year2){
        this.setState({
            left: year1,
            right: year2,
            
        })
    }


    render() {

        const names = this.state.players.map(post => post.firstname)
        const {fnames, players} = this.state


        var ab = players.filter((p) => (p.selected == true))

        
        ab = ab.filter((p) => (p.PTS >= this.state.left) && (p.PTS <= this.state.right))
        
        const pts = ab.map(post => (post.PTS))
        var wholePts = players.map(post => (post.PTS))

        wholePts.unshift(0)
        wholePts.unshift(50)


        wholePts = wholePts.sort(function(a, b){return a-b})
        

       
        return (
            // <div className="hmmw" style={{background: '#666699'}}>
            <div className="hmmw" >

              <h1>Hello world</h1>
              <div style={{background: '#666699'}}>

              {/* <svg width={300} height={50} > */}
              {/* {this.state.data} */}
                    
                    <RangeSlider onChangeYear={this.handleChangeYear.bind(this)}
                     data={wholePts} 
                     left={this.state.left}
                      right={this.state.right}
                      width={700}
                      height={150}
                      />
                      
                {/* </svg> */}
                {this.state.left}
                </div>
                left {this.state.left}
                <br></br>
                right {this.state.right }
                <div>
                <svg width={800} height={500} >
                {/* onClick={this.onClick} */}
                <Scatterplot
                    x={150}
                    y={50}
                    width={200}
                    height={200}
                    data={this.state.data}
                    datapoint={({ x, y }) => <Datapoint x={x} y={y} />}
                />
                </svg>

              </div>
              
               
            </div>
        );

    }

}

export default Main1;