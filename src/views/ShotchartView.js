
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
import Shotchart from "../graphs/Shotchart"


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

			left: 0,
			right: 20,
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
		this.setState({ players: players})

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


		ab = ab.filter((p) => (p.SHOT_DIST>= this.state.left) && (p.SHOT_DIST <= this.state.right))

		// const pts = ab.map(post => (post.SHOT_DIST))

		var dist = players.map(post => (post.SHOT_DIST))
		// var wholeAst = players.map(post => (post.HOME_PTS))

		var xloc = ab.map(post => (post.LOC_X))
		var yloc = ab.map(post => (post.LOC_Y))


		// xloc.unshift(20)
		// xloc.unshift(300)
		// yloc.unshift(20)
		// yloc.unshift(300)


		var abc = ab.map((shot, index) => ({
                x: (shot.LOC_X + 250) / 10,
                y: (shot.LOC_Y + 50) / 10,
                action_type: shot.SHOT_TYPE,
                shot_distance: shot.SHOT_DIST,
                shot_made_flag: shot.FGM,
		}))



		return (
			<div className="hmmw" style={{ background: '#57667B' }}>
			{/* <div className="hmmw" > */}

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

					<RangeSlider onChangeYear={this.handleChangeYear.bind(this)}
                      data={dist} 

                      left={this.state.left}
                        right={this.state.right}
                        width={500}
                        height={150}
						/> 
						

						

				</div>
                <div><br></br></div>


                    <div>

                        {/* <Shotchart data={abc} xdata={xloc} ydata={yloc} size={[600, 450] }/>  */}

                        <Shotchart 
                                data={abc}
                                //  xdata={xloc} ydata={yloc}
                                playerId={this.props.playerId}
                                minCount={this.state.minCount}
                                chartType={this.state.chartType}
                                displayToolTips={this.state.displayToolTips}
                                />

                    </div>
                

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

