import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './ProductCard.css'

class ProductCard extends Component {

	productDetailsSwitch(){
		let {product_type, product_sku} = this.props
		
		switch (product_type) {
			case 'blanket_inverted'   : return `/product/${product_sku}/inverted`
			case 'blanket_binary'     : return `/product/${product_sku}/binary`
			case 'blanket_single'     : return `/product/${product_sku}/single`
			case 'print_inverted'     : return `/product/${product_sku}/printInverted`
			case 'print_binary'       : return `/product/${product_sku}/printBinary`
			case 'print_single'       : return `/product/${product_sku}/printSingle`
			case 'blanket_baby'       : return `/product/${product_sku}/baby`
			case 'blanket_holiday'    : return `/product/${product_sku}/journal`
			case 'journal_missionary' : return `/product/${product_sku}/journal`
			case 'journal_everyday'   : return `/product/${product_sku}/journal`
			default                   : return `/`
		}
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


