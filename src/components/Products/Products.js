import React, { Component } from 'react'
import Filters from '../Filters/Filters'
import BabyBlanket from '../BabyBlanket/BabyBlanket'
import CrazyBlanket from '../CrazyBlanket/CrazyBlanket'
import BinaryBlanket from '../BinaryBlanket/BinaryBlanket'

class Products extends Component {
	constructor(){
		super()
		this.state={
			
		}
	}
	render() {
		return (
			<div>
				This is Products
				<Filters/>
				<BabyBlanket/>
				<CrazyBlanket/>
				<BinaryBlanket/>
			</div>
		)
	}
}

export default Products
