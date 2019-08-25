
import React, { Component } from 'react';

import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';
import { WidthProvider} from "react-grid-layout";





import BarChart from '../graphs/BarChart'
import { CONFIG } from '../config.js';
import * as d3 from "d3";
import axios from 'axios'
import Dropdown from '../components/Dropdown';
import MultiDropdown from '../components/MultiDropdown';
import Scatterplot from "../graphs/Scatterplot"
// import BarChart from "../graphs/BarChart"

import Datapoint from "../components/Datapoint"
import RangeSlider from "../components/RangeSlider"
import SingleSlider from "../components/singleSlider"
import VertSlider from "../components/VertSlider"

// import Shotchart from "../graphs/Shotchart"
import Shotchart from "../graphs/myShotChart"

import {Container,Col,Row} from 'react-bootstrap'

const ResponsiveReactGridLayout = WidthProvider(ResponsiveGridLayout );
const originalLayouts = getFromLS("layouts") || {};


class Main1 extends Component {

	constructor(props) {
		super(props)
		this.state = {
			players: [],
			// uniqList: [],
			wholePts: [],
			wholeAst: [],
			test: [],
			response: [],
			bardata: [12, 25, 6, 6, 9, 10],

			id: "root",
			error: null,
			isLoaded: false,
			fnames: [],
			// data: d3.range(100).map(_ => [Math.random(), Math.random()]),
			data: [[0.1, 0.2], [0.3, 0.2], [4, 2], [4, 1]],
			minCount: 3,
			// chartType: 'scatter' ,//'hexbin', // 'scatter'
			chartType: 'hexbin', // 'scatter'

			displayToolTips: true,

			isToggleOn: true,


			left: 0,
			right: 35,

			left1: 0,
			right1: 49,

			left2: 0,
			right2: 40,

		};
		this.handleClick = this.handleClick.bind(this);

	}



	componentDidMount() {

		const racesRequest = axios.get(CONFIG.SHOTS)
			.then(response =>
				response.data
			).then(players => this.setDefault(players))

	}

	setDefault = (players) => {

		players.map(i => i.firstname = "Nepal");
		players.map(i => i.key = "players");

		players.map((p, i) => {
			if (p.PLAYER_NAME === "Stephen Curry") { p.selected = true; }
		})
		players.map((p, i) => p.id = p.PLAYER_ID);
		players.map((p, i) => p.shotid = i);

        const uniqNames = [...new Set(players.map(d => d.PLAYER_NAME))]

		this.setState({ players: players })

	}

	resetThenSet = (value, key) => {
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

		temp.forEach(function myFunction(item, index, arr) {
			// arr[index] = item * 10;
			if (arr[index].id === id) {
				temp[index].selected = !temp[index].selected
			}

		})


		// uniqList[listid].selected = !uniqList[listid].selected
		this.setState({
			[key]: temp
		})
	}

	handleChangeYear(year1, year2) {
		this.setState({
			left1: year1,
			right1: year2,

		})
	}
	handleChangeYear1(year1, year2) {
		this.setState({
			left2: year1,
			right2: year2,

		})
	}

	handleDistChange(year1, year2) {
		this.setState({
			left: year1,
			right: year2,

		})
	}


	handleMinDist(x) {
		this.setState({
			left: x,

		})
	}

	handleBinChange(x) {
		this.setState({
			minCount: x
		})
	}
	handleClick() {
		// let {margins,data,svgDimensions,onChangeYear,xScale,initialValue, other} = prevProps;
		// let {margins,data,svgDimensions,onChangeYear,xScale,initialValue, other} = this.props;
		if (this.state.isToggleOn === true) {
			this.setState({
				isToggleOn: !this.state.isToggleOn,
				chartType: 'scatter'
			})
		}
		else if (this.state.isToggleOn === false) {
			this.setState({
				isToggleOn: !this.state.isToggleOn,
				chartType: 'hexbin'

			})
		}




    }
    
    resetLayout() {
        this.setState({ layouts: {} });
      }
    
      onLayoutChange(layout, layouts) {
        saveToLS("layouts", layouts);
        this.setState({ layouts });
      }
    


	render() {

		// const names = this.state.players.map(post => post.firstname)
		const { fnames, players } = this.state

		var uniqIds = [...new Set(players.map(d => d.PLAYER_ID))]
		var uniqList = players.map((p, index) => ({
			option: p["PLAYER_NAME"],
			id: p["PLAYER_ID"],
			selected: false,
			key: "players"
		}))

		uniqList = uniqList.filter((item, index) => uniqIds.includes(item.id))
		// uniqList = uniqList.filter((item,index)=> uniqList.id.indexOf(item.id)===index)                                           
		uniqList = uniqList.filter((uniqList, index, self) =>
			index === self.findIndex((t) => (t.id === uniqList.id)))

		uniqList.map((p, i) => p.listid = i);




		var ab = players.filter((p) => (p.selected == true))


		ab = ab.filter((p) => (p.SHOT_DIST >= this.state.left) && (p.SHOT_DIST <= this.state.right))

		ab = ab.filter((p) => (((p.LOC_X+250)/10) >= this.state.left1) && (((p.LOC_X+250)/10) <= this.state.right1))
		ab = ab.filter((p) => (((p.LOC_Y+50)/10) >= this.state.left2) && (((p.LOC_Y+50)/10) <= this.state.right2))



		// const pts = ab.map(post => (post.SHOT_DIST))

		var dist = players.map(post => (post.SHOT_DIST))
		var wholeAst = players.map(p => ((p.LOC_X+250)/10))
		var wholePts = players.map(p => (p.LOC_Y+50)/10)


		var xloc = ab.map(post => (post.LOC_X))
		var yloc = ab.map(post => (post.LOC_Y))


		// xloc.unshift(20)
		// xloc.unshift(300)
		// yloc.unshift(20)
		// yloc.unshift(300)


		var abc = ab.map((shot, index) => ({
			player: shot.PLAYER_NAME,
			x: (shot.LOC_X + 250) / 10,
			y: (shot.LOC_Y + 50) / 10,
			action_type: shot.SHOT_TYPE,
			shot_distance: shot.SHOT_DIST,
			shot_made_flag: shot.FGM,
			shot_value: shot.SHOT_VALUE,
			shot_pts: shot.SHOT_PTS,
			shot_zone: shot.SHOT_ZONE,
			shot_area: shot.SHOT_AREA,
			score_margin: shot.SCORE_DIFF

        }))
  
        
        var deff = players.map((shot, index) => ({
			player: shot.PLAYER_NAME,
			x: (shot.LOC_X + 250) / 10,
			y: (shot.LOC_Y + 50) / 10,
			action_type: shot.SHOT_TYPE,
			shot_distance: shot.SHOT_DIST,
			shot_made_flag: shot.FGM,
			shot_value: shot.SHOT_VALUE,
			shot_pts: shot.SHOT_PTS,
			shot_zone: shot.SHOT_ZONE,
			shot_area: shot.SHOT_AREA,
			score_margin: shot.SCORE_DIFF

        }))
        
        // deff.map((p, i) => (p.PLAYER_NAME === "Kevin Durant" 	))	
		deff = deff.filter((p) => (p.player === "Kevin Durant"))
		

		var binrange = [1, 20]

		var testt = [0,124,300]

		


		// var layout = [
        //     {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
        //     {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
        //     {i: 'c', x: 4, y: 0, w: 1, h: 2}
        //   ];
          return (
            // <div style={{ background: '#57667B' }}> 
            <div > 

              {/* <button onClick={() => this.resetLayout()}>Reset Layout</button> */}
              <ResponsiveReactGridLayout
                className="layout"
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                rowHeight={30}
                layouts={this.state.layouts}
                onLayoutChange={(layout, layouts) =>
                  this.onLayoutChange(layout, layouts)
                }
              >
                <div key="1" style={{ background: '#57667B' }} data-grid={{ w: 3, h: 13, x: 0, y: 0, minW: 2, minH: 3 }}>
      
                <Shotchart 
									data={abc}
									//  xdata={xloc} ydata={yloc}
									playerId={this.props.playerId}
									minCount={this.state.minCount}
									chartType={this.state.chartType}
                                    displayToolTips={this.state.displayToolTips}
                                    namee={"test23"}
									/>
      
                </div>
      
      
      
                <div key="2" style={{ background: '#57667B' }} data-grid={{ w: 3, h: 13, x: 0, y: 1, minW: 2, minH: 1 }}>
      

                <RangeSlider onChangeYear={this.handleChangeYear.bind(this)}
						data={wholeAst} 
						handle1={"handle3"}
						handle2={"handle4"}
						sGroup={"test"}
						label={"x"}

						left={this.state.left1}
						right={this.state.right1}
						width={500}
						height={150}
					/>
            
      


      </div>
                <div key="3" style={{ background: '#57667B' }} data-grid={{ w: 1, h: 5, x:3, y: 6, minW: 1, minH: 3 }}>
                    
                <VertSlider onChangeYear={this.handleChangeYear1.bind(this)}
						data={wholePts} 
						// data={testt} 
						
						handle1={"handle8"}
						handle2={"handle9"}
						sGroup={"test2"}


						left={this.state.left2}
						right={this.state.right2}
						width={100}
						height={500}
					/> 

                


                </div>

                <div key="4" style={{ background: '#57667B' }} data-grid={{ w: 6, h: 1, x: 4, y: 7, minW: 2, minH: 3 }}>

                <MultiDropdown
						titleHelper="Player"
						title="Select Players"
						col="PLAYER_NAME"
						uid="PLAYER_ID"

						list={this.state.players}
						uniqList={uniqList}
						toggleItem={this.toggleSelected}
					/>




                </div>
                <div key="5" style={{ background: '#57667B' }} data-grid={{ w: 3, h: 13, x: 6, y: 10, minW: 2, minH: 3 }}>
      
                                <Shotchart 
									data={deff}
									//  xdata={xloc} ydata={yloc}
									playerId={this.props.playerId}
									minCount={this.state.minCount}
									chartType={this.state.chartType}
                                    displayToolTips={this.state.displayToolTips}
                                    namee={"test"}
                                    />
      
                </div>
                

              </ResponsiveReactGridLayout>
            </div>
          );


	}

}

export default Main1;

function getFromLS(key) {
    let ls = {};
    if (global.localStorage) {
      try {
        ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
      } catch (e) {
        /*Ignore*/
      }
    }
    return ls[key];
  }
  
  function saveToLS(key, value) {
    if (global.localStorage) {
      global.localStorage.setItem(
        "rgl-8",
        JSON.stringify({
          [key]: value
        })
      );
    }
  }