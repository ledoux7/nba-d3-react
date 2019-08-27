import React, { Component } from 'react'
// import {FontAwesome} from 'react-fontawesome'
import { fontAwesome } from '@fortawesome/react-fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import onClickOutside from "react-onclickoutside";
import '../css/global.css'

class DropdownMultiple extends Component {
	constructor(props) {
		super(props)
		this.state = {
			listOpen: false,
			headerTitle: this.props.title,
			timeOut: null,
			singleMode: this.props.singleMode
		}
		this.close = this.close.bind(this)
	}

	componentDidUpdate() {
		const { listOpen } = this.state
		setTimeout(() => {
			if (listOpen) {
				window.addEventListener('click', this.close)
			}
			else {
				window.removeEventListener('click', this.close)
			}
		}, 0)



	}

	componentWillUnmount() {
		window.removeEventListener('click', this.close)
	}

	close(timeOut) {
		this.setState({
			listOpen: false
		})
	}

	// static getDerivedStateFromProps(nextProps) {



	toggleList() {
		this.setState(prevState => ({
			listOpen: !prevState.listOpen
		}))
	}

	clickedItem (id, key,uniqList,listid,selCol, isSelected, option)
	{
		// const uniqNames = [...new Set(this.props.list.filter(function (a) { return a[this.props.selCol]; }).map(d => d.PLAYER_NAME))]
		var uniqNames = uniqList.filter(function (a) { return a[selCol]; }).map(d => d.option)

		var count = 0
		if (this.state.singleMode === true)
		{
			uniqNames = [option]
			count =1
		}

		else if (isSelected )
		{
			count = uniqNames.length -1;
			uniqNames = uniqNames.filter(n => n !== option)
		}
		else
		{
			count = uniqNames.length +1 ;
			uniqNames.push(option)
		}
		

		if (count <=0) 
		{
			this.setState({
				headerTitle: this.props.title
				// headerTitle: "ds"

			})
			// return { headerTitle: nextProps.title }
		}
		else if (count === 1) 
		{
			this.setState({
				// headerTitle: `${uniqNames[0]}`
				headerTitle: uniqNames[0]
				// headerTitle: "ds"


			})
			// return { headerTitle: `${uniqNames[0]}` }
			// return { headerTitle: `ge` }

		}
		else if (count > 1) 
		{
			this.setState({
				headerTitle: uniqNames.join(" | ") 
				// headerTitle: "ds"

			})
			// return { headerTitle: `${uniqNames.join(" | ")}` 
		}
		

		this.props.toggleItem(id, key, uniqList, listid,selCol,this.state.singleMode)
	}

	render() {
		const { list, toggleItem, uniqList,selCol } = this.props
		const { listOpen, headerTitle } = this.state


		// const selcetedids = [...new Set(list.filter(function (a) { return a[selCol]; }).map(d => d.PLAYER_ID))]
		// const selcetedids = [...new Set(list.filter(function (a) { return a.selected; }).map(d => d.PLAYER_ID))]
		// const selcetedids = [...new Set(list.filter(function (a) { return a.selected; }).map(d => d.PLAYER_ID))]
		

		// uniqList= uniqList.filter((person) => selcetedids.includes(person.id))

		// uniqList.forEach( function myFunction(item, index, arr) {
		// 	// arr[index] = item * 10;
		// 	if (selcetedids.includes(arr[index].id))
		// 	{
		// 		arr[index][selCol]= true ;
		// 		// arr[index][selCol]= !arr[index].selected ;
		// 		// arr[index].selected = true ;

		// 		// !arr[index].selected
		// 	}
			
		//   })


		// .map((p,index) => ({
		// 	                firstname: p.PLAYER_NAME,
		// 	                lastname: p.lastname,
		// 	            }))


		return (
			<div className="dd-wrapper">
				<div className="dd-header" onClick={() => this.toggleList()}>
					<div className="dd-header-title">{headerTitle}</div>
					{listOpen
						? <fontAwesome name="angle-up" size="2x" />
						: <fontAwesome name="angle-down" size="2x" />
					}
				</div>
				{listOpen && <ul className="dd-list" onClick={e => e.stopPropagation()}>
					{uniqList.map((item) => (

						<li className="dd-list-item" key={item.key} onClick={() => this.clickedItem(item.id, item.key,uniqList,item.listid,selCol,item[selCol], item.option)}>
							{/* toggleItem(item.id, item.key,uniqList, item.listid,selCol) */}

							{item["option"]} {item[selCol] && <FontAwesomeIcon icon="check" size="sm" color="#ccc" />}

						</li>

					))}
					{/* {uniqList.map((item) => (

						<li className="dd-list-item" key={item.key} onClick={() => toggleItem(item.id, item.key)}>

							{item[this.props.col]} {item.selected && <FontAwesomeIcon icon="check" size="sm" color="#ccc" />}

						</li>

					))} */}
				</ul>}
			</div>
		)
	}

}

export default DropdownMultiple