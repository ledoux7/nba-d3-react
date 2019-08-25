import React from 'react'
// import nba from 'nba'
import * as d3 from 'd3'
import { hexbin } from 'd3-hexbin'
// import d3_hexbin from 'd3-hexbin';
import { court, shots } from 'd3-shotchart'
import PropTypes from 'prop-types'

import sc from '../css/ShotChart.css'

window.d3_hexbin = {hexbin: hexbin} // workaround library problem

export class ShotChart extends React.Component {
  static propTypes = {
    playerId: PropTypes.number,
    minCount: PropTypes.number,
    chartType: PropTypes.string,
    displayToolTips: PropTypes.bool,
  }

  componentDidUpdate() {
	console.log("ShotChart ToolTips: ", this.props.displayToolTips)
	
		var final_shots =[ 
			{
			"x": (226+ 250) / 10,
			"y": (90 + 50) / 10,
			"action_type": "Jump Shot",
			"shot_distance": 24,
			"shot_made_flag":1
			},
			{
	
				"x": (-166+ 250) / 10,
				"y": (231 + 50) / 10,
				"action_type": "Jump Shot",
				"shot_distance": 28,
				"shot_made_flag":1
				},
				{
					"x": (-2+ 250) / 10,
					"y":  (63 + 50) / 10,
					"action_type": "Jump Shot",
					"shot_distance": 6,
					"shot_made_flag":1
					}
		]
	
	final_shots = this.props.data
	
		// this.props.data

	const courtSelection = d3.select("#shot-chart")
	// without this line, all updates on court would be ineffect only after changing chartType
	courtSelection.html('')
	const chart_court = court().width(500)
	const chart_shots = shots()
						.shotRenderThreshold(this.props.minCount)
						.displayToolTips(this.props.displayToolTips)
						.displayType(this.props.chartType)
	// selection.call always return the selection and not the return value of function passed in
	courtSelection.call(chart_court)
	courtSelection.datum(final_shots).call(chart_shots)
    
  }
  render() {
    return (
      <div id="shot-chart" className="sc"></div>
    );
  }
}
export default ShotChart