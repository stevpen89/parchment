import React, { Component } from 'react'
import Filters from './Filters/Filters'
import ProductMap from './ProductMap/ProductMap'


class Products extends Component {
	constructor(){
		super()
		this.state={}
	}
	render() {
		return (
			<div className="content">
				<Filters/>
				<ProductMap/>
			</div>
		)
	}
}

export default Products
