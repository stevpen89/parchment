import React, { Component } from 'react'
import Filters from '../Filters/Filters'

class Products extends Component {
	constructor(){
		super()
		this.state={}
	}
	render() {
		return (
			<div>
				This is Products
				<Filters/>
			</div>
		)
	}
}

export default Products
