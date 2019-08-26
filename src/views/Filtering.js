
import React, { Component } from 'react';
import BarChart from '../graphs/BarChart'
import { CONFIG } from '../config.js';
import * as d3 from "d3";
import axios from 'axios'
import Dropdown from '../components/Dropdown';
import MultiDropdown from '../components/MultiDropdown';
// import RangeSlider from "./sibs"
import RangeSlider from "../components/RangeSlider"

import {Container,Col,Row,Table} from 'react-bootstrap'


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
            data: d3.range(100).map(_ => [Math.random(), Math.random()]),
            left: 0,
            right: 30,

        };
    }



    componentDidMount() {

      const racesRequest = axios.get(CONFIG.SHOTS)
			.then(response =>
				response.data
			).then(players => this.setDefault(players))
       
        //


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
  
  
          var uniqShotTypes = [...new Set(players.map(d => d.SHOT_TYPE))]
          // uniqShotTypes = uniqShotTypes.slice(0,5)
  
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
  
          this.setState({ uniqList: uniqList, uniqShotTypes: uniqShotTypes })
  
  
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



    render() {
        const {fnames, players} = this.state




       
        return (
            <div className="hmmw" style={{background: '#57667B'}}>

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
                <div>
					{
						// t.map(post => (
						this.state.players.slice(0, 30).map(post => (

							<li align="start">
								<div>
									{/* <p>{post.SHOT_DIST} : {post.SHOT_PTS} </p> */}
									<p>
                                        {/* {post.player} */}
                                        {/* {post.sumPlayer} */}

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


// function DisplayCircle({ data, index, title, cost, group }) {
//   const currentColor = getBubbleColor(group);
//   return (
//   <circle
//       key={index}
//       r={data.r}
//       fill={currentColor}
//       strokeWidth="1"
//       stroke={d3.rgb(currentColor).darker()}
//       cx={data.x}
//       cy={data.y}
//   />
//   );}