import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './ProductCard.css'

class ProductCard extends Component {

	productDetailsSwitch(){
		let {product_tags,product_sku} = this.props
			if			(product_tags.tags.includes('inverted')){
				return <Link to={`/products/${product_sku}/inverted`}>	<button>this is an inverted blanket</button>	</Link>}

			else if	(product_tags.tags.includes('binary')){
				return <Link to={`/products/${product_sku}/binary`}>		<button>this is a binary blanket</button>			</Link>}

			else if	(product_tags.tags.includes('single')){
				return <Link to={`/products/${product_sku}/single`}>		<button>this is a single blanket</button>			</Link>}
				
			else if	(product_tags.tags.includes('baby')){
				return <Link to={`/products/${product_sku}/baby`}>			<button>this is a baby blanket</button>				</Link>}
				
			else if	(product_tags.tags.includes('journal')){
				return <Link to={`/products/${product_sku}/journal`}>		<button>this is a journal</button>						</Link>}
			
			else
				<div>internal error...</div>}

	contentRender(){
		const {	product_name, product_image, product_desc, product_price } = this.props
		return(
			<div className="product-card">
				<div style={{background: `url(${product_image}) center`, backgroundSize: `cover`}} className="product-image">
					<div className="product-card-footer">
						<div className="product-name">{product_name}</div>
						<div className="product-desc-price">
							<div>{product_desc}</div><br />
							<div>{product_price}</div>
						</div>
					</div>
					<div className="product-button-holder">{this.productDetailsSwitch()}</div>
				</div>
			</div>)
		
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


