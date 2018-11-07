import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './ProductCard.css'

class ProductCard extends Component {

	productDetailsSwitch(){
		let {product_tags,product_sku} = this.props
			if			(product_tags.tags.includes('inverted')){
				return `/products/${product_sku}/inverted`}

			else if	(product_tags.tags.includes('binary')){
				return `/products/${product_sku}/binary`}

			else if	(product_tags.tags.includes('single')){
				return `/products/${product_sku}/single`}
				
				else if	(product_tags.tags.includes('baby')){
				return `/products/${product_sku}/baby`}
				
				else if	(product_tags.tags.includes('holiday')){
				return `/products/${product_sku}/holiday`}
				
			else if	(product_tags.tags.includes('journal')){
				return `/products/${product_sku}/journal`}
			
			else {return `/`}
	}

	contentRender(){
		const {	product_name, product_image, product_price } = this.props
		return(
			<Link to={this.productDetailsSwitch()}>
				<div className="product-card">
					<div style={{background: `url(${product_image}) center`, backgroundSize: `cover`}} className="product-image">
					</div>
					<div className="product-card-footer">
						<div className="product-name">{product_name}</div>
						<div className="product-desc-price">
							<div>${product_price}</div>
						</div>
					</div>
				</div>
			</Link>)
		
	}

	render() {

		return (
			<div>
				{this.contentRender()}
			</div>
		)
	}
}

export default ProductCard


