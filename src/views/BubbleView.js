
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

import {Container,Col,Row,Table} from 'react-bootstrap'


// import FeatureFour from "../graphs/Bubble1"
import Pie from "../graphs/PieChart"
import DonutChart from "../graphs/DonutChart"


// import AnimatedPieHooks from "./AnimatedPieHooks";


const ResponsiveReactGridLayout = WidthProvider(ResponsiveGridLayout );
const originalLayouts = getFromLS("layouts") || {};


function amount(item)
{
    return item.Amount;
  }
  
function sum(prev, next)
{
    return prev + next;
}



class Main1 extends Component {

	constructor(props) {
		super(props)
		this.state = {
			players: [],
			uniqList: [],
			wholePts: [],
			wholeAst: [],
			test: [],
			response: [],
            bardata: [12, 25, 6, 6, 9, 10],
            
            bardata: [
                        {
                            index:0,
                            value:30
                        },
                        {
                            index:1,
                            value:30
                        },
                        {
                            index:2,
                            value:40
                        }

            ],

			id: "root",
			error: null,
			isLoaded: false,
			fnames: [],
			// data: d3.range(100).map(_ => [Math.random(), Math.random()]),
			data: [[0.1, 0.2], [0.3, 0.2], [4, 2], [4, 1]],
			minCount: 2,
			// chartType: 'scatter' ,//'hexbin', // 'scatter'
			chartType: 'hexbin', // 'scatter'

			displayToolTips: true,

			isToggleOn: true,


			left: 0,
			right: 35,

			distL: 0,
			distR: 35,

			dist2L: 0,
            dist2R: 35,
            
            sumFGA: [],

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

		// players.map(i => i.firstname = "Nepal");
		players.map(i => i.key = "players");

		// players.map((p, i) => {
		// 	if (p.PLAYER_NAME === "Stephen Curry") { p["selectedP1"] = true; }
		// })
		// players.map((p, i) => {
		// 	if (p.PLAYER_NAME === "Giannis") { p["selectedP2"] = true; }
        // })
        
        // players.map((p, i) => p.selectedP1 = true);
        players.map((p, i) => p.selectedP1 = false);
		players.map((p, i) => p.selectedP2 = true);
        

		players.map((p, i) => p.id = p.PLAYER_ID);
		players.map((p, i) => p.shotid = i);

        const uniqNames = [...new Set(players.map(d => d.PLAYER_NAME))]

		this.setState({ players: players })



		//
		var uniqIds = [...new Set(players.map(d => d.PLAYER_ID))]
		var uniqList = players.map((p, index) => ({
			option: p["PLAYER_NAME"],
			id: p["PLAYER_ID"],
			// selectedP1: true,
            selectedP2: true,
            selectedP1: false,
			// selectedP2: false,
			key: "players"
		}))

		uniqList = uniqList.filter((item, index) => uniqIds.includes(item.id))
		// uniqList = uniqList.filter((item,index)=> uniqList.id.indexOf(item.id)===index)                                           
		uniqList = uniqList.filter((uniqList, index, self) =>
			index === self.findIndex((t) => (t.id === uniqList.id)))

		uniqList.map((p, i) => p.listid = i);

        this.setState({ uniqList: uniqList })


        var agg = []
        uniqList.forEach(function myFunction(item, index, arr) 
        {
            // arr[index] = item * 10;
		    // uniqList = uniqList.filter((item, index) => uniqIds.includes(item.id))

            var p = players.filter((player, index) => player.id === item.id)

            var sumplayer = p.map(item => item.FGM).reduce((prev, next) => prev + next);
            agg[index] = {pid: item.id,player: item.option, sumPlayer: sumplayer}
        
        })

        this.setState({ sumFGA: agg})
        


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


	toggleSelected = (id, key,uniqList,listid,selCol) => {


		let temp = JSON.parse(JSON.stringify(this.state[key]))

		temp.forEach(function myFunction(item, index, arr) {
			// arr[index] = item * 10;
			if (arr[index].id === id) {
				// temp[index].selected = !temp[index].selected
				temp[index][selCol]= !temp[index][selCol]

			}

		})


		uniqList[listid][selCol] = !uniqList[listid][selCol]
		this.setState({
			[key]: temp
		})
	}

	handleDistChange(x, y) {
		this.setState({
			distL: x,
			distR: y

		})
	}
	handleDistChange2(x, y) {
		this.setState({
			dist2L: x,
			dist2R: y

		})
	}
	handleChangeYear1(year1, year2) {
		this.setState({
			left2: year1,
			right2: year2,

		})
	}

	// handleDistChange1(year1, year2) {
	// 	this.setState({
	// 		left: year1,
	// 		right: year2,

	// 	})
	// }


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
		const { fnames, players, uniqList , sumFGA} = this.state

		// var uniqIds = [...new Set(players.map(d => d.PLAYER_ID))]
		// var uniqList = players.map((p, index) => ({
		// 	option: p["PLAYER_NAME"],
		// 	id: p["PLAYER_ID"],
		// 	selected: false,
		// 	key: "players"
		// }))

		// uniqList = uniqList.filter((item, index) => uniqIds.includes(item.id))
		// // uniqList = uniqList.filter((item,index)=> uniqList.id.indexOf(item.id)===index)                                           
		// uniqList = uniqList.filter((uniqList, index, self) =>
		// 	index === self.findIndex((t) => (t.id === uniqList.id)))

		// uniqList.map((p, i) => p.listid = i);




		var ab = players.filter((p) => (p["selectedP1"] === true))


		ab = ab.filter((p) => (p.SHOT_DIST >= this.state.distL) && (p.SHOT_DIST <= this.state.distR))

		// ab = ab.filter((p) => (((p.LOC_X+250)/10) >= this.state.distL) && (((p.LOC_X+250)/10) <= this.state.right1))
		// ab = ab.filter((p) => (((p.LOC_Y+50)/10) >= this.state.left2) && (((p.LOC_Y+50)/10) <= this.state.right2))



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
  
		
		deff = players.filter((p) => (p["selectedP2"] === true))
		deff = deff.filter((p) => (p.SHOT_DIST >= this.state.dist2L) && (p.SHOT_DIST <= this.state.dist2R))
		

        var deff = deff.map((shot, index) => ({
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
		// deff = deff.filter((p) => (p.player === "Kevin Durant"))

		

		var binrange = [1, 20]

		var testt = [0,124,300]

		
		var r1h = 8
		var r2h = 10
		var fullwidth = 10
		var halfwidth = fullwidth/2


        var gh = ab.map(post => (post.id))
        var piedata = sumFGA.filter((p) => gh.includes(p.pid) )
        
        var piecopy = JSON.parse(JSON.stringify(piedata));

        // piecopy.map((p, i) => p.player = "ds2");

        // piecopy = ["da","ea"]

		// var layout = [
        //     {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
        //     {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
        //     {i: 'c', x: 4, y: 0, w: 1, h: 2}
        //   ];
          return (
            <div style={{ background: '#57667B',color:"white" }}> 
            {/* // <div >  */}

				{/* <h1>Hello bugs </h1> */}


				
				<div>
				<button onClick={this.handleClick} className="white" style={{ "margin-left":"10px"}} >
							{this.state.isToggleOn ? 'Scatter' : 'Hexbin'}
						</button>
					
				</div>




              {/* <button onClick={() => this.resetLayout()}>Reset Layout</button> */}
				<ResponsiveReactGridLayout
					className="layout"
					breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
					// cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
					cols={{ lg: 10, md: 10, sm: 10, xs: 10, xxs: 10 }}
					
					rowHeight={30}
					layouts={this.state.layouts}
					onLayoutChange={(layout, layouts) =>
					this.onLayoutChange(layout, layouts)
					}
              	>
                <div key="1" style={{ background: '#455162' }} data-grid={{ w: 5, h: r1h, x: 0, y: 0, minW: 2, minH: 3, static: true  }}>
					
					
					<h2 style={{ display: 'flex', justifyContent: "flex-start", "margin-left": "10px" }}>
						Player
					</h2>
					<div className="asd" style={{ display: 'flex', justifyContent: "flex-start", "margin-left": "10px", "margin-top": "10px"  }}>  
						<div style={{color:"black" }}>

						<MultiDropdown
							titleHelper="Player"
							title="Select Players"
							col="PLAYER_NAME"
							uid="PLAYER_ID"
							selCol={"selectedP1"}

							list={this.state.players}
							uniqList={uniqList}
							toggleItem={this.toggleSelected}
						/>
						</div>
						
						{/* {wholePts} */}
					</div>
					<h2 style={{ display: 'flex', justifyContent: "flex-start", "margin-left": "10px", "margin-top": "10px"  }}>
						Distance
					</h2>
					<div className="asd" style={{ display: 'flex', justifyContent: "flex-start", "margin-left": "-10px" }}>  
						<div>

						<RangeSlider onChangeYear={this.handleDistChange.bind(this)}
						data={dist} 
						handle1={"handle3"}
						handle2={"handle4"}
						sGroup={"test"}
						label={"Distance"}

						left={this.state.distL}
						right={this.state.distR}
						width={500}
						height={150}
					/>
						</div>
						
						{/* {wholePts} */}
					</div>

                </div>
      
      
      
                <div key="2" style={{ background: '#455162' }} data-grid={{ w: 5, h: r1h, x: 5, y: 0, minW: 2, minH: 1, static: true  }}>
                {
						piedata.map(post => (
						// this.state.players.slice(0, 15).map(post => (

							<li align="start">
								<div>
									{/* <p>{post.SHOT_DIST} : {post.SHOT_PTS} </p> */}
									<p>
                                        {post.player}
                                        {post.sumPlayer}

                                    </p>

								</div>
							</li>


						))
					}

      


      			</div>

				<div  key="3" style={{ background: '#455162' }} data-grid={{ w: 3, h:12 , x: 0, y: r1h, minW: 2, minH: 1, static: true  }}>
					{/* <h2>P1</h2> */}

                    {/* <FeatureFour data={[5,10,1,3]} size={[500,500]}/>  */}
                    {/* <div  style={{ "margin-left":"20px","margin-top":"20px",  "font-family": "sans-serif", "text-align": "center"  }}> */}
                    {/* <div  style={{ "margin-left":"20px","margin-top":"20px",  "font-family": "sans-serif", "text-align": "center"  }}> */}
                    <div>

                        {/* {piedata} */}
                        {/* <span className="label">Animated Pie Hooks (D3 animations)</span> */}
                        {/* <Pie
                        data={piedata}
                        fake={piecopy}
                        width={200}
                        height={200}
                        innerRadius={60}
                        outerRadius={100}
                        /> */}


                        {/* <Table striped bordered hover variant="dark"> */}
                        {/* <Table striped bordered hover > */}
                        <Table borderless striped style={{color:"white"}}>


                            <thead>
                                <tr>
                                {/* <th>#</th> */}
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                {/* <td>1</td> */}
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                </tr>
                                <tr>
                                {/* <td>2</td> */}
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                </tr>
                                <tr>
                                {/* <td>3</td> */}
                                <td colSpan="2">Larry the Bird</td>
                                <td>@twitter</td>
                                </tr>
                            </tbody>
                            </Table>




                    </div>


				</div>
				<div  key="4" style={{ background: '#455162' }} data-grid={{ w: 2.5, h:12 , x: 5, y: r1h, minW: 2, minH: 1, static: true  }}>
					<h2>P2</h2>
                    {/* <BarChart  data={piedata} size={[200, 200] }/> */}
                    <DonutChart 
                    
                    data={piedata}
                    // data={[5, 2, 1, 3, 4, 9]}
                    // data={piedata}
                    
                    />,
					


				</div>

      
   
                

              </ResponsiveReactGridLayout>

			  <div>
					{
						piecopy.map(post => (
						// this.state.players.slice(0, 15).map(post => (

							<li align="start">
								<div>
									{/* <p>{post.SHOT_DIST} : {post.SHOT_PTS} </p> */}
									<p>
                                        {post.player}
                                        {post.sumPlayer}

                                    </p>

								</div>
							</li>


						))
					}
				</div>

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