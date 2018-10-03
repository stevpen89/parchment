import React, { Component } from 'react'
import Menu from '../Menu/Menu'

class Nav extends Component {
	constructor(){
		super()
		this.state={}
	}
	render() {
		return (
			<div>
				This is Nav
				<Menu/>
			</div>
		)
	}
}

export default Nav