import React, { Component } from 'react'
import axios from 'axios'
import './ProductMap.css'
import ProductCard from './ProductCard/ProductCard'
import { connect } from 'react-redux'
import { setProducts } from '../../../ducks/products';

class ProductMap extends Component {
	constructor(){
		super()
		this.state={
			matchArr:[]
		}
	}

	render() {
		return (
			<div className="product-map">
				{this.state.matchArr ? this.props.products.map(x=><ProductCard {...x} key={x.product_sku}/>) : null}
			</div>
		)
	}
}

function mapStateToProps  ( state ) { return { products: state.products.products } };
export default connect ( mapStateToProps, { setProducts } )(ProductMap);