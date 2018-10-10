import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import './Menu.css'

class Menu extends Component {
	constructor(){
		super()
		this.state={}
	}
	
	render() {
		const {menuOpen} = this.props
		return (
				<frosted-glass overlay-color="rgba(255,255,255,.5)" blur-amount=".75rem" class='menu' style={menuOpen ? {width: `300px`} : {width: `0px`}}>
				<div className="menu-container">
					<div className="menu-content">
						<ul>
							<Link to="/"><li>Home</li></Link>
							<Link to="/products"><li>Products</li></Link>
							<Link to="/about"><li>About</li></Link>
							<Link to="/contact"><li>Contact</li></Link>
						</ul>
					</div>
				</div>
				</frosted-glass>
		)
	}
}

export default Menu