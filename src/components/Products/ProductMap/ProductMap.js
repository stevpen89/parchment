import React, { Component } from 'react'
import axios from 'axios'
import './ProductMap.css'
import ProductCard from './ProductCard/ProductCard'

export default class ProductMap extends Component {
	constructor(){
		super()
		this.state={
			matchArr:[]
		}
	}

	componentDidMount(){
		axios.get(`/products`).then((res)=>{
			console.log(res.data)
			this.setState({matchArr:res.data})
		})
	}



	render() {
		return (
			<div style={{display:"flex"}} className="product-map">
				{this.state.matchArr ? this.state.matchArr.map(x=><ProductCard {...x} key={x.product_sku}/>) : null}
			</div>
		)
	}
}
