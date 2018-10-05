import React, { Component } from 'react'
import Menu from '../Menu/Menu'
import './Nav.css'

class Nav extends Component {
	constructor(){
		super()
		this.state={
			menuOpen: false
		}
		this.openMenu = this.openMenu.bind(this);
	}

	//opens and closes the menu
	openMenu () {this.setState({menuOpen: !this.state.menuOpen})}

	render() {
		const {openMenu} = this
		const {menuOpen} = this.state
		return (
			<div>
				<div className="nav">
					<div onClick={() => openMenu()}><i className="fas fa-bars menu-button"></i></div>
					<div><h1>PARCHMENT</h1></div>
					<div>
						<a className="menu-button">Login</a>
						<i className="fas fa-shopping-cart menu-button"></i>
					</div>
				</div>
				<Menu menuOpen={menuOpen}/>
			</div>
		)
	}
}

export default Nav