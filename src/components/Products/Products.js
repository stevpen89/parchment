import React, { Component } from 'react'
import Filters from './Filters/Filters'
import ProductMap from './ProductMap/ProductMap'
// import BabyBlanket from './BabyBlanket/BabyBlanket'
// import CrazyBlanket from './CrazyBlanket/CrazyBlanket'
// import BinaryBlanket from './BinaryBlanket/BinaryBlanket'
// import SingleBlanket from './SingleBlanket/SingleBlanket'

class Products extends Component {
	constructor(){
		super()
		this.state={
			
		}
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
