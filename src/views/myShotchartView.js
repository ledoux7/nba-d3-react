
import React, { Component } from 'react';
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
			minCount: 1,
			// chartType: 'scatter' ,//'hexbin', // 'scatter'
			chartType: 'hexbin', // 'scatter'

			displayToolTips: true,

			isToggleOn: true,


			left: 0,
			right: 35,

			left1: 0,
			right1: 15,

			left2: 0,
			right2: 40,
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
		this.handleClick = this.handleClick.bind(this);

	}



	componentDidMount() {

		const racesRequest = axios.get(CONFIG.SHOTS)
			.then(response =>
				response.data
			).then(players => this.setDefault(players))

		// const racesRequest1 = axios.get(CONFIG.API_BASE_URL)
		//         .then(response =>
		//             response.data.map((p,index) => ({
		//                 firstname: p.PLAYER_NAME,
		//                 lastname: p.lastname,
		//                 PTS: p.PTS,
		//                 AST: p.PTS + Math.random() -10,

		//                 key: 'players',
		//                 selected: true,
		//                 id: index
		//             }))
		//              ).then(players => this.setDefault(players))

		//


	}

	setDefault = (players) => {

		players.map(i => i.firstname = "Nepal");
		players.map(i => i.key = "players");

		players.map((p, i) => {
			if (p.PLAYER_NAME === "Stephen Curry") { p.selected = true; }
		})
		players.map((p, i) => p.id = p.PLAYER_ID);
		players.map((p, i) => p.shotid = i);
		// players.map((p, i) => p.SHOT_DIST  = p.SHOT_DIST *1.5);


		// const wholePts1 = players.map(post => (post.SHOT_DIST))
		// const wholeAst1 = players.map(post => (post.HOME_PTS))




		const uniqNames = [...new Set(players.map(d => d.PLAYER_NAME))]
		// const uniqRaces = [...new Set(players.map(d => d.lastname))]
		// players = uniqRaces.map((y, index) => ({ id: index, raceName: y, selected: false, key: 'races' }))
		// const fnames = uniqFNames.map((y, index) => ({ id: index, firstname: y, selected: false, key: 'fnames' }))
		// seasons[0].selected = true;
		// players[0].SHOT_DIST = 100;
		// players[1].selected = true;
		// players[0].selected = true;


		// this.setState({ players: players, fnames:fnames })
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

		var binrange = [1, 20]

		var testt = [0,124,300]

		

		return (
			// <div className="hmmw" style={{ background: '#57667B' }}>

			<div className="hmmw" >

				<h1>Hello bugs </h1>
				<div className="asd" style={{ display: 'flex', justifyContent: "flex-start", "margin-left": "200px" }}>

					<MultiDropdown
						titleHelper="Player"
						title="Select Players"
						col="PLAYER_NAME"
						uid="PLAYER_ID"

						list={this.state.players}
						uniqList={uniqList}
						toggleItem={this.toggleSelected}
					/>
					{/* {wholePts} */}
				</div>



				<div><br></br></div>

				<div style={{ display: 'flex', justifyContent: "flex-start", "margin-left": "200px" }}>

					{/* <RangeSlider onChangeYear={this.handleDistChange.bind(this)}
                      data={dist} 
					  handle1={"handle1"}
					  handle2={"handle2"}
					  sGroup={"dist"}
					  label={"Dist"}
					  

                      left={this.state.left}
                        right={this.state.right}
                        width={500}
                        height={150}
						/>  */}




				</div>
				<div><br></br></div>

				<div style={{ display: 'flex', justifyContent: "flex-start", "margin-left": "200px", background: '#57667B' }}>

					{/* <SingleSlider onChangeYear={this.handleBinChange.bind(this)}
						data={binrange}
						handle={"handle3"}

						left={this.state.minCount}
						// right={this.state.minCount}
						width={500}
						height={150}
					/>

					*/}

					<RangeSlider onChangeYear={this.handleChangeYear.bind(this)}
						data={wholeAst} 
						handle1={"handle3"}
						handle2={"handle4"}
						sGroup={"test"}


						left={this.state.left1}
						right={this.state.right1}
						width={500}
						height={150}
					/>




					{this.state.left1}:{this.state.right1} 




				</div>

				<div style={{ display: 'flex', justifyContent: "center" }}>

					<button onClick={this.handleClick}>
						{this.state.isToggleOn ? 'Hexbin' : 'Scatter'}
					</button>
				</div>

				<div>

				<Container>
					<Col>
					<VertSlider onChangeYear={this.handleChangeYear1.bind(this)}
						data={wholePts} 
						// data={testt} 
						
						handle1={"handle8"}
						handle2={"handle9"}
						sGroup={"test2"}


						left={this.state.left2}
						right={this.state.right2}
						width={210}
						height={600}
					/> {this.state.right2} 
					</Col>

					<Shotchart 
                                data={abc}
                                //  xdata={xloc} ydata={yloc}
                                playerId={this.props.playerId}
                                minCount={this.state.minCount}
                                chartType={this.state.chartType}
                                displayToolTips={this.state.displayToolTips}
                                />
					<Col>
					
					
					</Col>

				</Container>
				
				


				
				
				
				</div>
				<div><br></br><br></br></div>



				<div>
			

					{/* <Shotchart data={abc} xdata={xloc} ydata={yloc} size={[600, 450] }/>  */}

					

				</div>
				{/* <SingleSlider onChangeYear={this.handleMinDist.bind(this)}
					  data={dist} 
					  handle={"handle4"}
					  label={"left"}

                      left={this.state.left}
                        // right={this.state.minCount}
                        width={500}
                        height={150}
						/>  */}

				{this.state.left}




				<div>
					{
						// this.state.players.map(post => (
						this.state.players.slice(0, 15).map(post => (

							<li align="start">
								<div>
									{/* <p>{post.SHOT_DIST} : {post.SHOT_PTS} </p> */}
									<p></p>

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

