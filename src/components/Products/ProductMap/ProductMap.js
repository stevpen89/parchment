import React, { Component } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard/ProductCard'

export default class ProductMap extends Component {
	constructor(){
		super()
		this.state={
			matchArr:[]
		}
	}

	componentDidMount(){
		axios.get(`/products`)
	}



	render() {
		return (
			<div style={{display:"flex",}}>
				{this.state.matchArr.map(x=><ProductCard {...x}/>)}
			</div>
		)
	}
}
