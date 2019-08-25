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
			timeOut: null
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

	static getDerivedStateFromProps(nextProps) {

		const uniqNames = [...new Set(nextProps.list.filter(function (a) { return a.selected; }).map(d => d.PLAYER_NAME))]
		// const selcetedids = [...new Set(nextProps.list.filter(function (a) { return a.selected; }).map(d => d.PLAYER_ID))]

        // nextProps.uniqList= nextProps.uniqList.filter((person) => selcetedids.includes(person.id))


		// const names = nextProps.list.filter(function(a) { return a.selected; }).map(d => d.PLAYER_NAME)
		const count = uniqNames.length;

		// nextProps.list

		if (count === 0) {
			return { headerTitle: nextProps.title }
		}
		else if (count === 1) {
			return { headerTitle: `${uniqNames.join(" | ")}` }
		}
		else if (count > 1) {
			return { headerTitle: `${uniqNames.join(" | ")}` }
			// return {headerTitle: `${count} ${nextProps.titleHelper}s`}
		}
	}

	toggleList() {
		this.setState(prevState => ({
			listOpen: !prevState.listOpen
		}))
	}

	render() {
		const { list, toggleItem, uniqList } = this.props
		const { listOpen, headerTitle } = this.state


		const selcetedids = [...new Set(list.filter(function (a) { return a.selected; }).map(d => d.PLAYER_ID))]

		// uniqList= uniqList.filter((person) => selcetedids.includes(person.id))

		uniqList.forEach( function myFunction(item, index, arr) {
			// arr[index] = item * 10;
			if (selcetedids.includes(arr[index].id))
			{
				arr[index].selected = true ;
				// !arr[index].selected
			}
			
		  })


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

						<li className="dd-list-item" key={item.key} onClick={() => toggleItem(item.id, item.key,uniqList, item.listid)}>

							{item["option"]} {item.selected && <FontAwesomeIcon icon="check" size="sm" color="#ccc" />}

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