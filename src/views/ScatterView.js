
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


class Main1 extends Component {

	constructor(props) {
		super(props)
		this.state = {
			players: [],
			// uniqList: [],
			wholePts:[],
			wholeAst:[],
			test: [],
			response: [],
			bardata: [12, 25, 6, 6, 9, 10],
			width: 600,
			height: 170,
			id: "root",
			error: null,
			isLoaded: false,
			fnames: [],
			// data: d3.range(100).map(_ => [Math.random(), Math.random()]),
			data: [[0.1, 0.2], [0.3, 0.2], [4, 2], [4, 1]],

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

		players.map(i => i.selected = true);
		players.map((p, i) => p.id = p.PLAYER_ID);
		players.map((p, i) => p.shotid = i);
		// players.map((p, i) => p.SHOT_DIST  = p.SHOT_DIST *1.5);


		const wholePts1 = players.map(post => (post.SHOT_DIST))
		const wholeAst1 = players.map(post => (post.HOME_PTS))




		const uniqNames = [...new Set(players.map(d => d.PLAYER_NAME))]
		// const uniqRaces = [...new Set(players.map(d => d.lastname))]
		// players = uniqRaces.map((y, index) => ({ id: index, raceName: y, selected: false, key: 'races' }))
		// const fnames = uniqFNames.map((y, index) => ({ id: index, firstname: y, selected: false, key: 'fnames' }))
		// seasons[0].selected = true;
		// players[0].SHOT_DIST = 100;
		// players[0].selected = true;

		// this.setState({ players: players, fnames:fnames })
		this.setState({ players: players, wholePts:wholePts1, wholeAst:wholeAst1 })

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
			left: year1,
			right: year2,

		})
	}


	render() {

		// const names = this.state.players.map(post => post.firstname)
		const { fnames, players} = this.state

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


		// ab = ab.filter((p) => (p.PTS >= this.state.left) && (p.PTS <= this.state.right))

		// const pts = ab.map(post => (post.SHOT_DIST))

		// var wholePts = players.map(post => (post.SHOT_DIST))
		// var wholeAst = players.map(post => (post.HOME_PTS))

		var wholePts = ab.map(post => (post.SHOT_DIST))
		var wholeAst = ab.map(post => (post.SHOT_PTS))


		// wholePts.unshift(10)
		// wholePts.unshift(50)
		// wholeAst.unshift(5)
		// wholeAst.unshift(7)


		// wholePts = wholePts.map(Number);
		// wholeAst= wholeAst.map(Number);

		// var value = +record[year];
		// wholeAst = [111,72,46,10]
		// wholePts = [1,242,61,10]


		// var abc = [50].concat(wholePts)
		// var def = [4].concat(wholeAst)

		var abc = []
		var def = []


		wholePts.forEach(function myFunction(item, index, arr) {
				// arr[index] = item * 10;
					abc.push(+item);

				})
		wholeAst.forEach(function myFunction(item, index, arr) {
			// arr[index] = item * 10;
				def.push(+item);

			})

		// const abc = [...wholeAst];
		// const def = [...wholePts];



		// const abc = wholePts.sort(function (a, b) { return a - b })
		// const def = wholeAst.sort(function (a, b) { return a - b })

		// abc = [210].concat(abc)
		// def = [16].concat(def)
		// const abc = wholePts
		// const def = wholeAst


		// var ab = players.filter((person) => pnames.includes(person.id))

		var xmax = parseFloat(d3.max(abc))
		var ymax = parseFloat(d3.max(def))

		// var xmin = d3.min(abc)
		// var ymin = d3.min(def)

		// abc.unshift(xmax)
		// wholePts.unshift(50)
		// def.unshift(ymax)

		// abc.unshift(100)
		// wholePts.unshift(50)
		// def.unshift(100)

		// abc = [20].concat(abc)
		// def = [10].concat(def)
		// var gg = [23,123,1]

        // return <div className="hmmw" style={{ background: '#57667B' }}></div>

		return (
			<div className="hmmw" style={{ background: '#666699' }}>
				<h1>Hello bugs</h1>
				<div className="asd" style={{ display: 'flex', justifyContent: "flex-start", "margin-left": "100px" }}>

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

					{/* <RangeSlider onChangeYear={this.handleChangeYear.bind(this)}
                      data={wholePts} 

                      left={this.state.left}
                        right={this.state.right}
                        width={500}
                        height={150}
						/> */}
						

						{/* <BarChart  data={wholeAst} size={[600, 350] }/> */}

				</div>

				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<svg width="800" height="400" >
						{/* onClick={this.onClick} */}
						<Scatterplot
							x={50}
							y={50}
							xdata={abc}
							ydata={def}
							xmax={xmax}
							ymax={ymax}

							width={this.state.width}
							height={this.state.height}
							// data={this.state.data}
							datapoint={({ x, y }) => <Datapoint x={x} y={y} />}
						/>
					</svg>


					{/* <BarChart  data={pts} size={[250, 250] }/> */}

					{/* {data={pts}}  data={[31,32,25]}*/}
				</div>
				<div>
						{/* {xmax}::::: {ymax}
						<br></br>
						{xmin}::::: {ymin}

						{typeof abc[4]}::dsa: {typeof def[4]} sda {typeof gg[1]} */}


					
				</div>

				<div>
					{
						// this.state.players.map(post => (
						this.state.players.map(post => (

							<li align="start">
								<div>
									<p>{post.SHOT_DIST} : {post.SHOT_PTS} </p>
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

