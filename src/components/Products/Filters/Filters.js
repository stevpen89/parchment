import React, { Component } from 'react'
import './Filters.css'

class Filters extends Component {
	constructor(){
		super()
		this.state={}
	}
	render() {
		return (
			<div>
				<div className="products-banner"></div>
				{/* <div className="side-bar">
					<input className="product-search" placeholder="Search"/><br />
					<input type="checkbox" value="missionary" /><a>Missionary</a><br />
					<input type="checkbox" value="missionary" /><a>Everyday</a><br />
					<select className="product-select">
						<option>America</option>
						<option>Brazil</option>
						<option>Japan</option>
					</select>
					<select className="product-select">
						<option>Utah</option>
						<option>Texas</option>
						<option>Alabama</option>
					</select><br />
				</div> */}
			</div>
		)
	}
}

export default Filters