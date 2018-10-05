import React, { Component } from 'react'
import Nav from '../../components/Nav/Nav'
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
				<Nav/>
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
