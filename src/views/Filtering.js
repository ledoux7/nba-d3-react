
import React, { Component } from 'react';
import BarChart from '../graphs/BarChart'
import { CONFIG } from '../config.js';
import * as d3 from "d3";
import axios from 'axios'
import Dropdown from '../components/Dropdown';
import MultiDropdown from '../components/MultiDropdown';
// import RangeSlider from "./sibs"
import RangeSlider from "../components/RangeSlider"



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
       
        //


     }

     setDefault = (players) => {
          players.map(i => i.key = "players");
      
          players.map(i => i.selected = true);
          players.map((p, i) => p.id = p.PLAYER_ID);
          players.map((p, i) => p.shotid = i);


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

		// if (filtQ) {
		// 	return this.filterQuantile(filteredLapsResults)
		// } else {
		// 	console.log(filteredLapsResults)
		// 	return filteredLapsResults
        // }
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

      handleChangeYear(year1,year2){
        this.setState({
            left: year1,
            right: year2,
            
        })
    }
    
    //   resetThenSet = (id, key) => {
    //     let temp = JSON.parse(JSON.stringify(this.state[key]))
    //     temp.forEach(item => item.selected = false);
    //     temp[id].selected = true;
    //     this.setState({
    //       [key]: temp
    //     })
    //   }

    render() {
        const {fnames, players} = this.state


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

        // const names = this.state.players.map(function (p) {return p.firstname})
        // const pts = this.state.players.map(post => (Math.trunc(post.PTS)))
        // const pts = this.state.test.map(post => (Math.trunc(post.PTS)))
        const names = this.state.players.map(post => post.firstname)

        // var selectedPLayer = fnames.find(d => (d.selected === true))
        // var selPTS = players.find(d => (d.firstname === selectedPLayer.firstname))
        // var selPTS1 = players.find(d => (d.firstname === "Steph"))
        
        // var selectedPLayer = fnames.find(d => (d.selected === true))
        // var selPTS = players.find(d => (d.firstname === selectedPLayer.firstname))
        // var selPTS1 = players.find(d => (d.firstname === "Kevin"))

        // const a =  players[0].PTS
        
        // const pts = selPTS1.map(post => (Math.trunc(post.PTS)))
        // const pts = [a,44]

        // var cool = ["Kevin", "Steph"]

        // var p = players.filter(d => (d.selected === true))
        // const pnames = p.map(function (p) {return p.id})

        var ab = players.filter((p) => (p.selected == true))
        
        // var ab = players.filter((person) => pnames.includes(person.id))
        // const pts = ab.map(post => (post.PTS))
        
        
        ab = ab.filter((p) => (p.SHOT_DIST>= this.state.left) && (p.SHOT_DIST <= this.state.right))
        
        var pts = ab.map(post => (post.SHOT_DIST))
        var wholePts = players.map(post => (post.SHOT_DIST))
        // wholePts = [0].concat(wholePts)
        // wholePts = [100].concat(wholePts)
        // wholePts.sort()
        // wholePts = wholePts.concat(100)
        // wholePts.unshift(0)
        // wholePts.unshift(50)

        // wholePts.push(100)
        wholePts = wholePts.sort(function(a, b){return a-b})
        pts = pts.sort(function(a, b){return a-b})

        

       
        return (
            <div className="hmmw" style={{background: '#666699'}}>
              <h1>Hello world</h1>
                <div className="asd" style={{display: 'flex',  justifyContent:"flex-start", "margin-left": "50px"}}>
                  
                    {/* {Header} */}

                    {/* <Dropdown
                        title="Year"
                        col="firstname"
                        list={this.state.fnames}
                        resetThenSet={this.resetThenSet}
                    /> */}

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
              
             
                {/* style={{background: '#343042'}} */}

                  {/* <div style={{display: 'flex',  justifyContent:"flex-start",background: '#343042', "margin-left": "200px"}}> */}
                  {/* <div style={{display: 'flex',  justifyContent:"flex-start","margin-left": "200px"}}> */}
                    
                  <div><br></br></div>

                  <div style={{display: 'flex',  justifyContent:"flex-start","margin-left": "50px"}}>
                    
                  {/* {this.state.left}<RangeSlider onChangeYear={this.handleChangeYear.bind(this)} data={wholePts} left={this.state.left} right={this.state.right}/>{this.state.right } */}

                    <RangeSlider onChangeYear={this.handleChangeYear.bind(this)}
                      data={wholePts} 
                      left={this.state.left}
                        right={this.state.right}
                        width={500}
                        height={150}
                        />

                  </div>

                  <div style={{display: 'flex',  justifyContent:'center'}}>
                
                       
                        <BarChart  data={pts} size={[850, 250] }/>
                      
                      {/* {data={pts}}  data={[31,32,25]}*/}
                  </div>



                <div>
                    {/* {p} */}
                    {/* <br></br> */}
                    {
                    this.state.players.map(post => (
                        <li  align="start">
                            <div>
                                <p>{post.firstname} {post.lastname}: {post.PTS}</p>                               
                                {/* <p>{post.firstname} </p>              */}
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