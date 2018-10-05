import React, { Component } from 'react'
import './Menu.css'

class Menu extends Component {
	constructor(){
		super()
		this.state={}
	}
	
	render() {
		const {menuOpen} = this.props
		return (
			<div className={menuOpen ? `menu menu-open` : `menu`}>
				<ul>
					<li>Home</li>
					<li>Products</li>
					<li>About</li>
					<li>Contact</li>
				</ul>
			</div>
		)
	}
}

export default Menu